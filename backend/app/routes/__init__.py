from .appointment_routes import appointment_bp
from .auth_routes import auth_bp
from .availability_routes import availability_bp
from .dashboard_routes import dashboard_bp
from .file_routes import file_bp
from .medical_record_routes import medical_record_bp
from .notification_routes import notification_bp
from .patient_routes import patient_bp
from .payment_routes import payment_bp
from .professional_routes import professional_bp
from .receipt_routes import receipt_bp
from .scheduling_routes import scheduling_bp

__all__ = [
    "auth_bp",
    "patient_bp",
    "professional_bp",
    "appointment_bp",
    "availability_bp",
    "scheduling_bp",
    "dashboard_bp",
    "medical_record_bp",
    "notification_bp",
    "file_bp",
    "payment_bp",
    "receipt_bp",
]
