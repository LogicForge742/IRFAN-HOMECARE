import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
    Home,
    Heart, 
    Activity, 
    Search, 
    Calendar, 
    Stethoscope, 
    User, 
    CreditCard, 
    AlertTriangle, 
    Phone, 
    Users, 
    ShieldAlert,
    Star,
    Clock,
    ShieldCheck,
    ArrowRight,
    Award,
    X,
    CheckCircle2,
    MapPin,
    Send,
    Lock,
    LogIn,
    LogOut
} from "lucide-react";

import { useAuthStore } from "@/features/auth/store/auth.store";
import { PATHS } from "@/routes/paths";
import { getRedirectPath } from "@/features/auth/utils";

// Sample verified doctors list for the Doctor Directory Modal
const DOCTORS_DIRECTORY = [
    {
        id: 1,
        name: "Dr. Sarah Jenkins",
        category: "General Medicine",
        specialty: "Physiotherapist & General Practitioner",
        rating: 4.9,
        reviews: 124,
        experience: "8+ yrs exp",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80",
        availability: "Available Today",
        badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200"
    },
    {
        id: 2,
        name: "Dr. Michael Chen",
        category: "Cardiology",
        specialty: "Consultant Cardiologist",
        rating: 4.95,
        reviews: 98,
        experience: "12+ yrs exp",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80",
        availability: "Available Tomorrow",
        badgeColor: "bg-blue-50 text-blue-700 border-blue-200"
    },
    {
        id: 3,
        name: "Nurse David Miller",
        category: "Nursing",
        specialty: "Registered Senior Home Nurse",
        rating: 4.88,
        reviews: 156,
        experience: "6+ yrs exp",
        image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80",
        availability: "Available Today",
        badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200"
    },
    {
        id: 4,
        name: "Dr. Elena Rostova",
        category: "Pediatrics",
        specialty: "Pediatric Home Care Specialist",
        rating: 4.92,
        reviews: 84,
        experience: "10+ yrs exp",
        image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=300&q=80",
        availability: "Available This Week",
        badgeColor: "bg-amber-50 text-amber-700 border-amber-200"
    }
];

export default function LandingPage() {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const specialtiesRef = useRef<HTMLDivElement>(null);

    // Modal states
    const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);
    const [isBookModalOpen, setIsBookModalOpen] = useState(false);
    const [isPayBillModalOpen, setIsPayBillModalOpen] = useState(false);
    
    // Form submission states
    const [bookingSubmitted, setBookingSubmitted] = useState(false);
    const [paymentSubmitted, setPaymentSubmitted] = useState(false);
    
    // Doctor Modal filters
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Booking form state
    const [bookingForm, setBookingForm] = useState({
        serviceType: "General Care Visit",
        date: "",
        timeSlot: "Morning (9:00 AM - 12:00 PM)",
        patientName: user ? `${user.firstName} ${user.lastName}` : "",
        phone: "",
        address: ""
    });

    // Payment form state
    const [paymentForm, setPaymentForm] = useState({
        invoiceId: "INV-2026-8841",
        patientName: user ? `${user.firstName} ${user.lastName}` : "",
        email: user?.email || "",
        cardNumber: "•••• •••• •••• 4242",
        expiry: "08/28",
        cvc: "123",
        amount: "195.00"
    });

    const handlePatientPortalClick = () => {
        if (user) {
            navigate(getRedirectPath(user));
        } else {
            navigate(PATHS.auth.login);
        }
    };

    const handleFindDoctorClick = () => {
        setIsDoctorModalOpen(true);
    };

    const handleBookAppointmentClick = () => {
        setIsBookModalOpen(true);
        setBookingSubmitted(false);
    };

    const handlePayBillClick = () => {
        setIsPayBillModalOpen(true);
        setPaymentSubmitted(false);
    };

    const handleBookDoctor = (_doctorId: number) => {
        setIsDoctorModalOpen(false);
        setIsBookModalOpen(true);
        setBookingSubmitted(false);
    };

    const handleBookingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const formattedDate = bookingForm.date 
            ? new Date(bookingForm.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
            : "Upcoming Visit";

        const newAppt = {
            id: Date.now(),
            caregiver: "Pending Caregiver Assignment",
            role: bookingForm.serviceType,
            date: formattedDate,
            time: bookingForm.timeSlot,
            status: "Pending Approval"
        };

        localStorage.setItem("irfan_new_appointment", JSON.stringify(newAppt));
        setBookingSubmitted(true);
    };

    const handlePaymentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setPaymentSubmitted(true);
    };

    const handleProceedToPortal = () => {
        setIsBookModalOpen(false);
        setIsPayBillModalOpen(false);
        if (user) {
            if (user.role === "patient") {
                navigate(PATHS.patient.appointments);
            } else {
                navigate(getRedirectPath(user));
            }
        } else {
            navigate(PATHS.auth.login);
        }
    };

    const scrollToSpecialties = () => {
        specialtiesRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Filter doctors by search query and category
    const filteredDoctors = DOCTORS_DIRECTORY.filter(doc => {
        const matchesQuery = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || doc.category === selectedCategory;
        return matchesQuery && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans w-full flex flex-col relative pb-16 md:pb-0 overflow-x-hidden selection:bg-blue-500 selection:text-white">
            
            {/* Header Bar */}
            <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 py-3.5 px-4 md:px-12 flex justify-between items-center sticky top-0 z-50 shadow-xs transition-all">
                <div className="flex items-center gap-3">
                    {/* Glowing Logo Badge */}
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0f2d4a] to-[#1e40af] text-white flex items-center justify-center font-extrabold text-lg flex-shrink-0 shadow-md shadow-blue-900/10">
                        +
                    </div>
                    <div>
                        <span className="font-extrabold text-[#0f2d4a] text-lg md:text-xl tracking-tight block leading-tight">
                            Irfan HomeCare
                        </span>
                        <span className="text-[10px] text-slate-500 font-semibold tracking-wide hidden sm:block">
                            Premium Healthcare at Your Doorstep
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2.5">
                    <div className="hidden sm:flex items-center gap-2 text-[#b91c1c] font-bold text-xs md:text-sm bg-red-50 px-3 py-1.5 rounded-full border border-red-200 shadow-2xs hover:bg-red-100 transition-colors">
                        <Phone className="h-3.5 w-3.5 text-[#b91c1c] animate-pulse" />
                        <span>Emergency: 911</span>
                    </div>

                    {user ? (
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={handlePatientPortalClick}
                                className="flex items-center gap-2 bg-[#0f2d4a] hover:bg-[#1e40af] text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-sm cursor-pointer"
                            >
                                <User className="h-3.5 w-3.5 text-teal-300" />
                                <span>Dashboard</span>
                            </button>

                            <button 
                                onClick={() => logout()}
                                className="flex items-center gap-1.5 bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-700 font-bold text-xs px-3.5 py-2 rounded-xl border border-slate-200 hover:border-red-200 transition-all cursor-pointer"
                                title="Sign Out"
                            >
                                <LogOut className="h-3.5 w-3.5" />
                                <span>Sign Out</span>
                            </button>
                        </div>
                    ) : (
                        <button 
                            onClick={handlePatientPortalClick}
                            className="flex items-center gap-2 bg-[#0f2d4a] hover:bg-[#1e40af] text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-sm cursor-pointer"
                        >
                            <LogIn className="h-3.5 w-3.5 text-teal-300" />
                            <span>Sign In</span>
                        </button>
                    )}
                </div>
            </header>

            {/* Main Hero Banner */}
            <section className="relative min-h-[440px] md:min-h-[520px] w-full overflow-hidden bg-[#0f2d4a] flex items-center">
                {/* Background Healthcare Image */}
                <img 
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80" 
                    alt="Irfan HomeCare Professionals"
                    className="absolute inset-0 w-full h-full object-cover object-center opacity-30 mix-blend-overlay"
                />
                
                {/* Dark Blue & Teal Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f2d4a] via-[#0f2d4a]/90 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f2d4a] via-transparent to-transparent opacity-80" />

                {/* Hero Content */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-12 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-8 space-y-6">
                        
                        {/* Floating Trust Pills */}
                        <div className="flex flex-wrap items-center gap-2.5">
                            <span className="inline-flex items-center gap-1.5 bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md">
                                <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                                <span>4.9/5 Rating (2,500+ Patients)</span>
                            </span>
                            <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md">
                                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                                <span>100% Certified Specialists</span>
                            </span>
                        </div>

                        <div className="space-y-3">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
                                Exceptional Medical Care, <br className="hidden sm:inline" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-200 to-teal-300">
                                    Delivered Right to Your Home.
                                </span>
                            </h1>
                            <p className="text-sm md:text-lg text-slate-300 font-medium max-w-2xl leading-relaxed">
                                Experience world-class healthcare from certified doctors, registered nurses, and dedicated home caregivers—all tailored to your family's comfort.
                            </p>
                        </div>
                        
                        {/* Hero Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-2 max-w-md sm:max-w-none">
                            <button 
                                onClick={handleFindDoctorClick}
                                className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-extrabold text-sm md:text-base px-7 py-3.5 rounded-xl flex items-center justify-center gap-2.5 shadow-lg shadow-teal-900/30 hover:shadow-teal-900/50 hover:-translate-y-0.5 transition-all cursor-pointer"
                            >
                                <Search className="h-4 w-4" />
                                <span>Find a Doctor</span>
                                <ArrowRight className="h-4 w-4 ml-1" />
                            </button>
                            <button 
                                onClick={handleBookAppointmentClick}
                                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white backdrop-blur-md font-extrabold text-sm md:text-base px-7 py-3.5 rounded-xl flex items-center justify-center gap-2.5 shadow-sm hover:-translate-y-0.5 transition-all cursor-pointer"
                            >
                                <Calendar className="h-4 w-4 text-blue-300" />
                                <span>Book Home Visit</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact Stats Banner */}
            <section className="bg-white border-b border-slate-200/80 shadow-2xs py-6">
                <div className="max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div className="space-y-1 p-2">
                        <div className="text-2xl md:text-3xl font-extrabold text-[#0f2d4a]">15,000+</div>
                        <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Patients Treated</div>
                    </div>
                    <div className="space-y-1 p-2 border-l border-slate-100">
                        <div className="text-2xl md:text-3xl font-extrabold text-[#0f2d4a]">500+</div>
                        <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Certified Caregivers</div>
                    </div>
                    <div className="space-y-1 p-2 border-l border-slate-100">
                        <div className="text-2xl md:text-3xl font-extrabold text-[#0f2d4a]">98%</div>
                        <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Satisfaction Rate</div>
                    </div>
                    <div className="space-y-1 p-2 border-l border-slate-100">
                        <div className="text-2xl md:text-3xl font-extrabold text-[#0f2d4a]">24/7</div>
                        <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Urgent Support</div>
                    </div>
                </div>
            </section>

            {/* Quick Action Grid Section */}
            <section className="py-10 md:py-14 px-4 md:px-12 max-w-7xl mx-auto w-full space-y-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
                    <div>
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Quick Services</span>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-[#0f2d4a] tracking-tight">How Can We Help You Today?</h2>
                    </div>
                    <p className="text-xs md:text-sm text-slate-500 max-w-md">Access medical consultations, specialized in-home care, and medical records in just a few clicks.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pt-3">
                    {/* Card 1: Find a Doctor */}
                    <div 
                        onClick={handleFindDoctorClick}
                        className="group cursor-pointer bg-white border border-slate-200/80 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-xs hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                    >
                        <div className="w-13 h-13 rounded-2xl bg-blue-50 text-[#0d4a7e] flex items-center justify-center flex-shrink-0 shadow-xs group-hover:bg-[#0d4a7e] group-hover:text-white transition-colors duration-300">
                            <Search className="h-6 w-6" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="font-bold text-[#0f2d4a] text-base group-hover:text-blue-600 transition-colors">Find a Doctor</h3>
                            <p className="text-xs text-slate-500 leading-relaxed">Search qualified medical doctors, nurses, and home healthcare specialists.</p>
                        </div>
                        <div className="flex items-center text-xs font-bold text-blue-600 gap-1 pt-1">
                            <span>Browse Directory</span>
                            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>

                    {/* Card 2: Our Specialties */}
                    <div 
                        onClick={scrollToSpecialties}
                        className="group cursor-pointer bg-white border border-slate-200/80 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-xs hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                    >
                        <div className="w-13 h-13 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 shadow-xs group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                            <Stethoscope className="h-6 w-6" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="font-bold text-[#0f2d4a] text-base group-hover:text-blue-600 transition-colors">Our Specialties</h3>
                            <p className="text-xs text-slate-500 leading-relaxed">Explore specialized treatments including Cardiology, Pediatrics, & Rehab.</p>
                        </div>
                        <div className="flex items-center text-xs font-bold text-blue-600 gap-1 pt-1">
                            <span>Explore Care</span>
                            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>

                    {/* Card 3: Patient Portal */}
                    <div 
                        onClick={handlePatientPortalClick}
                        className="group cursor-pointer bg-white border border-slate-200/80 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-xs hover:shadow-xl hover:border-teal-300 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                    >
                        <div className="w-13 h-13 rounded-2xl bg-teal-50 text-[#0b3c3b] flex items-center justify-center flex-shrink-0 shadow-xs group-hover:bg-[#0b3c3b] group-hover:text-white transition-colors duration-300">
                            <User className="h-6 w-6" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="font-bold text-[#0f2d4a] text-base group-hover:text-teal-600 transition-colors">Patient Portal</h3>
                            <p className="text-xs text-slate-500 leading-relaxed">Access health records, appointment history, and prescriptions securely.</p>
                        </div>
                        <div className="flex items-center text-xs font-bold text-teal-600 gap-1 pt-1">
                            <span>{user ? "Access Dashboard" : "Sign In / Register Portal"}</span>
                            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>

                    {/* Card 4: Pay a Bill */}
                    <div 
                        onClick={handlePayBillClick}
                        className="group cursor-pointer bg-white border border-slate-200/80 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-xs hover:shadow-xl hover:border-indigo-300 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                    >
                        <div className="w-13 h-13 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 shadow-xs group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                            <CreditCard className="h-6 w-6" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="font-bold text-[#0f2d4a] text-base group-hover:text-indigo-600 transition-colors">Pay a Bill</h3>
                            <p className="text-xs text-slate-500 leading-relaxed">Fast, secure online bill payment and transparent pricing breakdown.</p>
                        </div>
                        <div className="flex items-center text-xs font-bold text-indigo-600 gap-1 pt-1">
                            <span>Make Payment</span>
                            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Urgent Care Emergency Banner */}
            <section className="px-4 md:px-12 max-w-7xl mx-auto w-full my-4">
                <div className="bg-gradient-to-r from-red-50 via-rose-50 to-orange-50 border border-red-200/90 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm relative overflow-hidden">
                    <div className="flex gap-4 items-start z-10">
                        <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-red-600/20">
                            <AlertTriangle className="h-6 w-6 animate-pulse" />
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <h2 className="text-xl md:text-2xl font-extrabold text-red-700">Need Urgent Care?</h2>
                                <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">Emergency</span>
                            </div>
                            <p className="text-xs md:text-sm text-red-950 font-medium max-w-xl leading-relaxed">
                                If this is a life-threatening medical emergency, call 911 or visit your nearest Emergency Room immediately.
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto z-10">
                        <button 
                            onClick={() => window.open("tel:911")}
                            className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs md:text-sm px-6 h-12 rounded-xl shadow-md shadow-red-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <Phone className="h-4 w-4" />
                            <span>Call Emergency (911)</span>
                        </button>
                        <button 
                            onClick={() => window.open("tel:911")}
                            className="bg-white hover:bg-red-50 border border-red-200 text-red-700 font-extrabold text-xs md:text-sm px-6 h-12 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <span>Find Nearest ER</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Specialty Centers Section */}
            <section ref={specialtiesRef} className="py-12 px-4 md:px-12 max-w-7xl mx-auto w-full space-y-6">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Medical Excellence</span>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#0f2d4a] tracking-tight">Our Expert Care Centers</h2>
                    <p className="text-xs md:text-sm text-slate-500">Comprehensive, specialized medical treatments delivered by renowned medical experts in home settings.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-4">
                    {/* Specialty 1 */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-4 shadow-xs hover:shadow-lg transition-all hover:-translate-y-1">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                            <Heart className="h-6 w-6" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-bold text-[#0f2d4a] text-lg">Cardiology</h3>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                Comprehensive heart care, blood pressure monitoring, and cardiac rehabilitation at home.
                            </p>
                        </div>
                    </div>

                    {/* Specialty 2 */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-4 shadow-xs hover:shadow-lg transition-all hover:-translate-y-1">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0">
                            <Activity className="h-6 w-6" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-bold text-[#0f2d4a] text-lg">Orthopedics</h3>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                Advanced joint care, post-surgical physical therapy, and mobility rehabilitation.
                            </p>
                        </div>
                    </div>

                    {/* Specialty 3 */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-4 shadow-xs hover:shadow-lg transition-all hover:-translate-y-1">
                        <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0">
                            <Users className="h-6 w-6" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-bold text-[#0f2d4a] text-lg">Pediatrics</h3>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                Gentle, expert medical support and health checkups tailored for infants and children.
                            </p>
                        </div>
                    </div>

                    {/* Specialty 4 */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-4 shadow-xs hover:shadow-lg transition-all hover:-translate-y-1">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                            <ShieldAlert className="h-6 w-6" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-bold text-[#0f2d4a] text-lg">Geriatric Care</h3>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                Dedicated 24/7 senior care programs focusing on comfort, dignity, and daily wellness.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Highlight Section */}
            <section className="bg-gradient-to-b from-[#0f2d4a] to-[#0a1f33] text-white py-14 px-4 md:px-12 my-6">
                <div className="max-w-7xl mx-auto space-y-10">
                    <div className="text-center max-w-2xl mx-auto space-y-2">
                        <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">Why Irfan HomeCare</span>
                        <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">Healthcare Built Around You</h2>
                        <p className="text-xs md:text-sm text-slate-300">Combining modern clinical technology with compassionate home visits.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3 backdrop-blur-xs">
                            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center">
                                <Award className="h-5 w-5" />
                            </div>
                            <h3 className="font-bold text-lg text-white">Verified Caregivers</h3>
                            <p className="text-xs text-slate-300 leading-relaxed">Every practitioner undergoes rigorous background checks and clinical credentialing.</p>
                        </div>
                        
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3 backdrop-blur-xs">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center">
                                <Clock className="h-5 w-5" />
                            </div>
                            <h3 className="font-bold text-lg text-white">Rapid Response Time</h3>
                            <p className="text-xs text-slate-300 leading-relaxed">Book appointments instantly or request emergency home visits with real-time tracking.</p>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3 backdrop-blur-xs">
                            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center">
                                <ShieldCheck className="h-5 w-5" />
                            </div>
                            <h3 className="font-bold text-lg text-white">Encrypted Patient Data</h3>
                            <p className="text-xs text-slate-300 leading-relaxed">Your medical history and consultation records are protected by enterprise security.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Desktop Footer */}
            <footer className="bg-white border-t border-slate-200 py-10 px-4 md:px-12 w-full mt-auto">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-[#0f2d4a] text-white flex items-center justify-center font-extrabold text-base">
                            +
                        </div>
                        <span className="font-extrabold text-[#0f2d4a] text-lg">
                            Irfan HomeCare
                        </span>
                    </div>

                    <p className="text-xs text-slate-500 text-center">
                        © {new Date().getFullYear()} Irfan HomeCare Platform. All rights reserved. Built with empathy & precision.
                    </p>

                    <div className="flex items-center gap-6 text-xs text-slate-500 font-medium">
                        <button onClick={handleFindDoctorClick} className="hover:text-[#0f2d4a] transition-colors cursor-pointer">Find a Doctor</button>
                        <button onClick={handlePatientPortalClick} className="hover:text-[#0f2d4a] transition-colors cursor-pointer">Patient Portal</button>
                    </div>
                </div>
            </footer>

            {/* Mobile Bottom Navigation Bar */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200/80 py-2.5 px-6 flex justify-around items-center shadow-lg z-50 md:hidden w-full">
                <button 
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="flex flex-col items-center gap-0.5 text-[#3b82f6] font-bold cursor-pointer"
                >
                    <Home className="h-5 w-5" />
                    <span className="text-[9px]">Home</span>
                </button>
                <button 
                    onClick={handleFindDoctorClick}
                    className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-[#3b82f6] transition-colors cursor-pointer"
                >
                    <Search className="h-5 w-5" />
                    <span className="text-[9px]">Find Doctor</span>
                </button>
                <button 
                    onClick={scrollToSpecialties}
                    className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-[#3b82f6] transition-colors cursor-pointer"
                >
                    <Stethoscope className="h-5 w-5" />
                    <span className="text-[9px]">Specialties</span>
                </button>
                <button 
                    onClick={handlePatientPortalClick}
                    className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-[#3b82f6] transition-colors cursor-pointer"
                >
                    <User className="h-5 w-5" />
                    <span className="text-[9px]">Patient Portal</span>
                </button>
            </nav>

            {/* Doctor Directory Search Modal */}
            {isDoctorModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
                        {/* Modal Header */}
                        <div className="p-6 bg-gradient-to-r from-[#0f2d4a] to-[#1e40af] text-white flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <Stethoscope className="h-5 w-5 text-teal-300" />
                                    <span>Find a Doctor & Specialist</span>
                                </h2>
                                <p className="text-xs text-blue-100 mt-0.5">
                                    Browse verified medical caregivers available for home visits
                                </p>
                            </div>
                            <button 
                                onClick={() => setIsDoctorModalOpen(false)}
                                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Search & Filter Bar */}
                        <div className="p-4 border-b border-slate-200 bg-slate-50 space-y-3">
                            <div className="relative">
                                <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                                <input 
                                    type="text"
                                    placeholder="Search by doctor name or specialty (e.g. Cardiologist, Nurse)..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
                                />
                            </div>

                            {/* Category Filter Chips */}
                            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
                                {["All", "General Medicine", "Cardiology", "Pediatrics", "Nursing"].map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex-shrink-0 cursor-pointer ${
                                            selectedCategory === cat 
                                                ? "bg-[#0f2d4a] text-white shadow-xs" 
                                                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Doctor List Results */}
                        <div className="p-6 overflow-y-auto flex-1 space-y-4">
                            {filteredDoctors.length > 0 ? (
                                filteredDoctors.map((doc) => (
                                    <div 
                                        key={doc.id}
                                        className="bg-white border border-slate-200/90 rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-blue-300 hover:shadow-md transition-all"
                                    >
                                        <div className="flex gap-4 items-center">
                                            <img 
                                                src={doc.image} 
                                                alt={doc.name} 
                                                className="w-14 h-14 md:w-16 md:h-16 rounded-2xl object-cover border border-slate-200 shadow-xs flex-shrink-0"
                                            />
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-bold text-[#0f2d4a] text-base">{doc.name}</h3>
                                                    <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0" />
                                                </div>
                                                <p className="text-xs text-slate-500 font-medium">{doc.specialty}</p>
                                                <div className="flex items-center gap-3 text-xs text-slate-500 pt-0.5">
                                                    <span className="flex items-center gap-1 font-bold text-amber-600">
                                                        <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                                                        {doc.rating} ({doc.reviews})
                                                    </span>
                                                    <span>•</span>
                                                    <span className="font-medium text-slate-600">{doc.experience}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto pt-2 sm:pt-0">
                                            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${doc.badgeColor} self-start sm:self-end`}>
                                                {doc.availability}
                                            </span>
                                            <button 
                                                onClick={() => handleBookDoctor(doc.id)}
                                                className="w-full sm:w-auto bg-[#053435] hover:bg-[#084f4e] text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                                            >
                                                <Calendar className="h-3.5 w-3.5" />
                                                <span>Book Visit</span>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10 space-y-2">
                                    <Search className="h-8 w-8 text-slate-300 mx-auto" />
                                    <p className="text-sm font-semibold text-slate-600">No doctors found matching "{searchQuery}"</p>
                                    <p className="text-xs text-slate-400">Try searching for a different specialty or category.</p>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
                            <span>Showing {filteredDoctors.length} verified caregivers</span>
                            <button 
                                onClick={() => setIsDoctorModalOpen(false)}
                                className="font-bold text-[#0f2d4a] hover:underline cursor-pointer"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Schedule Home Visit Modal */}
            {isBookModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white rounded-3xl max-w-xl w-full flex flex-col shadow-2xl overflow-hidden border border-slate-200">
                        {/* Modal Header */}
                        <div className="p-6 bg-gradient-to-r from-[#053435] to-[#0f766e] text-white flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-teal-300" />
                                    <span>Schedule a Home Medical Visit</span>
                                </h2>
                                <p className="text-xs text-teal-100 mt-0.5">
                                    Request a certified practitioner at your home
                                </p>
                            </div>
                            <button 
                                onClick={() => setIsBookModalOpen(false)}
                                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Booking Content */}
                        {!bookingSubmitted ? (
                            <form onSubmit={handleBookingSubmit} className="p-6 space-y-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-700">Select Care Service</label>
                                    <select 
                                        value={bookingForm.serviceType}
                                        onChange={(e) => setBookingForm({...bookingForm, serviceType: e.target.value})}
                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                                    >
                                        <option>General Care Visit & Checkup</option>
                                        <option>Physiotherapy & Mobility Rehab</option>
                                        <option>Registered Nursing & Wound Care</option>
                                        <option>Pediatric Home Care</option>
                                        <option>Senior Geriatric Wellness Visit</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-700">Preferred Date</label>
                                        <input 
                                            type="date"
                                            required
                                            value={bookingForm.date}
                                            onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-700">Time Window</label>
                                        <select 
                                            value={bookingForm.timeSlot}
                                            onChange={(e) => setBookingForm({...bookingForm, timeSlot: e.target.value})}
                                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                                        >
                                            <option>Morning (9:00 AM - 12:00 PM)</option>
                                            <option>Afternoon (1:00 PM - 4:00 PM)</option>
                                            <option>Evening (5:00 PM - 8:00 PM)</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-700">Patient Name</label>
                                        <input 
                                            type="text"
                                            required
                                            placeholder="Full Name"
                                            value={bookingForm.patientName}
                                            onChange={(e) => setBookingForm({...bookingForm, patientName: e.target.value})}
                                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-700">Phone Number</label>
                                        <input 
                                            type="tel"
                                            required
                                            placeholder="+1 (555) 000-0000"
                                            value={bookingForm.phone}
                                            onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-700">Home Address</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                                        <input 
                                            type="text"
                                            required
                                            placeholder="Enter your home address for practitioner visit..."
                                            value={bookingForm.address}
                                            onChange={(e) => setBookingForm({...bookingForm, address: e.target.value})}
                                            className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <button 
                                        type="submit"
                                        className="w-full bg-[#053435] hover:bg-[#084f4e] text-white font-extrabold text-sm py-3.5 rounded-xl transition-all shadow-md shadow-teal-900/20 flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        <Send className="h-4 w-4" />
                                        <span>Confirm Home Visit Request</span>
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="p-8 text-center space-y-6">
                                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
                                    <CheckCircle2 className="h-8 w-8" />
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-2xl font-extrabold text-[#0f2d4a]">Home Visit Request Received!</h3>
                                    <p className="text-xs md:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                                        Thank you, <span className="font-bold text-slate-800">{bookingForm.patientName || "Patient"}</span>. Our medical dispatch coordinator will call you shortly at <span className="font-bold text-slate-800">{bookingForm.phone || "your number"}</span> to confirm practitioner assignment.
                                    </p>
                                </div>

                                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-600 space-y-1 text-left max-w-md mx-auto">
                                    <div className="flex justify-between"><span className="font-bold">Service:</span> <span>{bookingForm.serviceType}</span></div>
                                    <div className="flex justify-between"><span className="font-bold">Window:</span> <span>{bookingForm.timeSlot}</span></div>
                                </div>

                                <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                                    <button 
                                        onClick={handleProceedToPortal}
                                        className="bg-[#0f2d4a] hover:bg-[#1e40af] text-white font-extrabold text-xs md:text-sm px-6 py-3 rounded-xl transition-all shadow-xs cursor-pointer"
                                    >
                                        View in Patient Portal
                                    </button>
                                    <button 
                                        onClick={() => setIsBookModalOpen(false)}
                                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs md:text-sm px-6 py-3 rounded-xl transition-all cursor-pointer"
                                    >
                                        Done
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Quick Online Bill Payment Modal */}
            {isPayBillModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white rounded-3xl max-w-xl w-full flex flex-col shadow-2xl overflow-hidden border border-slate-200">
                        {/* Modal Header */}
                        <div className="p-6 bg-gradient-to-r from-[#1e1b4b] to-[#312e81] text-white flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <CreditCard className="h-5 w-5 text-indigo-300" />
                                    <span>Fast Online Bill Payment</span>
                                </h2>
                                <p className="text-xs text-indigo-200 mt-0.5">
                                    Pay home visit invoices securely via credit card or digital wallet
                                </p>
                            </div>
                            <button 
                                onClick={() => setIsPayBillModalOpen(false)}
                                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Payment Form */}
                        {!paymentSubmitted ? (
                            <form onSubmit={handlePaymentSubmit} className="p-6 space-y-4">
                                <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-2xl flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">Invoice ID</span>
                                        <div className="font-mono font-bold text-[#0f2d4a] text-sm">{paymentForm.invoiceId}</div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">Balance Due</span>
                                        <div className="text-lg font-extrabold text-indigo-900">${paymentForm.amount}</div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-700">Patient Full Name</label>
                                        <input 
                                            type="text"
                                            required
                                            value={paymentForm.patientName}
                                            onChange={(e) => setPaymentForm({...paymentForm, patientName: e.target.value})}
                                            placeholder="Patient Name"
                                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-700">Receipt Email</label>
                                        <input 
                                            type="email"
                                            required
                                            value={paymentForm.email}
                                            onChange={(e) => setPaymentForm({...paymentForm, email: e.target.value})}
                                            placeholder="billing@domain.com"
                                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-700">Card Information</label>
                                    <div className="relative">
                                        <CreditCard className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                                        <input 
                                            type="text"
                                            required
                                            value={paymentForm.cardNumber}
                                            onChange={(e) => setPaymentForm({...paymentForm, cardNumber: e.target.value})}
                                            placeholder="4242 •••• •••• 4242"
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-700">Expiration Date</label>
                                        <input 
                                            type="text"
                                            required
                                            placeholder="MM/YY"
                                            value={paymentForm.expiry}
                                            onChange={(e) => setPaymentForm({...paymentForm, expiry: e.target.value})}
                                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono font-medium text-center"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-700">Security CVC</label>
                                        <input 
                                            type="text"
                                            required
                                            placeholder="CVC"
                                            value={paymentForm.cvc}
                                            onChange={(e) => setPaymentForm({...paymentForm, cvc: e.target.value})}
                                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono font-medium text-center"
                                        />
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <button 
                                        type="submit"
                                        className="w-full bg-[#1e1b4b] hover:bg-[#312e81] text-white font-extrabold text-sm py-3.5 rounded-xl transition-all shadow-md shadow-indigo-950/20 flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        <Lock className="h-4 w-4 text-indigo-300" />
                                        <span>Submit Payment (${paymentForm.amount})</span>
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="p-8 text-center space-y-6">
                                <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center mx-auto animate-bounce">
                                    <CheckCircle2 className="h-8 w-8" />
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-2xl font-extrabold text-[#0f2d4a]">Payment Successful!</h3>
                                    <p className="text-xs md:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                                        Receipt <span className="font-mono font-bold text-slate-800">REC-2026-90812</span> for <span className="font-bold text-indigo-900">${paymentForm.amount}</span> has been processed. A copy was sent to <span className="font-bold text-slate-800">{paymentForm.email || "your email"}</span>.
                                    </p>
                                </div>

                                <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                                    <button 
                                        onClick={handleProceedToPortal}
                                        className="bg-[#0f2d4a] hover:bg-[#1e40af] text-white font-extrabold text-xs md:text-sm px-6 py-3 rounded-xl transition-all shadow-xs cursor-pointer"
                                    >
                                        View Payment History in Portal
                                    </button>
                                    <button 
                                        onClick={() => setIsPayBillModalOpen(false)}
                                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs md:text-sm px-6 py-3 rounded-xl transition-all cursor-pointer"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
}
