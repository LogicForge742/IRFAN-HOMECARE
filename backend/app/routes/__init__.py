from .auth_routes import auth_bp
from .patient_routes import patient_bp
from .professional_routes import professional_bp
from .appointment_routes import appointment_bp
from .availability_routes import availability_bp
from .scheduling_routes import scheduling_bp
from .dashboard_routes import dashboard_bp


__all__ = [
    "auth_bp",
    "patient_bp",
    "professional_bp",
    "appointment_bp",
    "availability_bp",
    "scheduling_bp",
    "dashboard_bp",
]