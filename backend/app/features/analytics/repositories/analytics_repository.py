from datetime import datetime, timedelta
from decimal import Decimal
from sqlalchemy import func
from app.extensions import db
from app.models.payment import Payment
from app.models.appointment import Appointment
from app.models.patient import Patient
from app.models.healthcare_professional import HealthcareProfessional
from app.models.user import User

class AnalyticsRepository:
    def get_totals(self):
        """Get summary totals of the main platform metrics."""
        total_users = db.session.query(func.count(User.id)).scalar() or 0
        total_patients = db.session.query(func.count(Patient.id)).scalar() or 0
        total_professionals = db.session.query(func.count(HealthcareProfessional.id)).scalar() or 0
        
        # Total revenue is sum of completed payments
        total_revenue = db.session.query(func.sum(Payment.amount)).filter(Payment.status == "completed").scalar() or Decimal("0.0")
        total_payments = db.session.query(func.count(Payment.id)).filter(Payment.status == "completed").scalar() or 0
        total_appointments = db.session.query(func.count(Appointment.id)).scalar() or 0

        return {
            "total_users": total_users,
            "total_patients": total_patients,
            "total_professionals": total_professionals,
            "total_revenue": float(total_revenue),
            "total_payments": total_payments,
            "total_appointments": total_appointments,
        }

    def get_revenue_trends(self, start_date: datetime, end_date: datetime):
        """Get monthly completed revenue sum."""
        results = (
            db.session.query(
                func.date_trunc("month", Payment.created_at).label("month"),
                func.sum(Payment.amount).label("total")
            )
            .filter(Payment.status == "completed")
            .filter(Payment.created_at >= start_date)
            .filter(Payment.created_at <= end_date)
            .group_by(func.date_trunc("month", Payment.created_at))
            .order_by("month")
            .all()
        )
        return [{"month": r.month.strftime("%Y-%m"), "amount": float(r.total or 0)} for r in results]

    def get_payment_status_distribution(self):
        """Get counts grouped by payment status."""
        results = (
            db.session.query(Payment.status, func.count(Payment.id))
            .group_by(Payment.status)
            .all()
        )
        return {status: count for status, count in results}

    def get_appointment_status_distribution(self):
        """Get counts grouped by appointment status."""
        results = (
            db.session.query(Appointment.status, func.count(Appointment.id))
            .group_by(Appointment.status)
            .all()
        )
        return {status: count for status, count in results}

    def get_patient_growth(self, start_date: datetime, end_date: datetime):
        """Get count of patient registrations over time."""
        results = (
            db.session.query(
                func.date_trunc("month", Patient.created_at).label("month"),
                func.count(Patient.id).label("count")
            )
            .filter(Patient.created_at >= start_date)
            .filter(Patient.created_at <= end_date)
            .group_by(func.date_trunc("month", Patient.created_at))
            .order_by("month")
            .all()
        )
        return [{"month": r.month.strftime("%Y-%m"), "count": r.count} for r in results]

    def get_top_professionals(self, limit=5):
        """Get professionals with the highest number of appointments."""
        results = (
            db.session.query(
                HealthcareProfessional.id,
                User.first_name,
                User.last_name,
                HealthcareProfessional.specialization,
                func.count(Appointment.id).label("appointment_count")
            )
            .join(User, HealthcareProfessional.user_id == User.id)
            .join(Appointment, HealthcareProfessional.id == Appointment.professional_id)
            .filter(Appointment.status == "completed")
            .group_by(HealthcareProfessional.id, User.first_name, User.last_name, HealthcareProfessional.specialization)
            .order_by(func.count(Appointment.id).desc())
            .limit(limit)
            .all()
        )
        return [
            {
                "id": r.id,
                "name": f"{r.first_name} {r.last_name}",
                "specialization": r.specialization,
                "appointments_count": r.appointment_count,
            }
            for r in results
        ]

    def get_recent_payments(self, limit=10):
        """Get list of recent payment transactions."""
        results = (
            db.session.query(
                Payment.id,
                Payment.reference,
                Payment.amount,
                Payment.status,
                Payment.created_at,
                User.first_name,
                User.last_name
            )
            .join(User, Payment.user_id == User.id)
            .order_by(Payment.created_at.desc())
            .limit(limit)
            .all()
        )
        return [
            {
                "id": r.id,
                "reference": r.reference,
                "amount": float(r.amount),
                "status": r.status,
                "date": r.created_at.isoformat(),
                "patient_name": f"{r.first_name} {r.last_name}",
            }
            for r in results
        ]
