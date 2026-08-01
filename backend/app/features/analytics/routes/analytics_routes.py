from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required
from app.utils.decorators import roles_required
from app.features.analytics.services.analytics_service import AnalyticsService

analytics_bp = Blueprint("analytics", __name__, url_prefix="/api/analytics")
analytics_service = AnalyticsService()

@analytics_bp.get("/dashboard")
@jwt_required()
@roles_required("admin")
def get_dashboard():
    data = analytics_service.get_dashboard_summary()
    return jsonify(data), 200

@analytics_bp.get("/revenue")
@jwt_required()
@roles_required("admin")
def get_revenue():
    data = analytics_service.get_revenue_analytics()
    return jsonify(data), 200

@analytics_bp.get("/payments")
@jwt_required()
@roles_required("admin")
def get_payments():
    data = analytics_service.get_payment_analytics()
    return jsonify(data), 200

@analytics_bp.get("/appointments")
@jwt_required()
@roles_required("admin")
def get_appointments():
    data = analytics_service.get_appointment_analytics()
    return jsonify(data), 200

@analytics_bp.get("/professionals")
@jwt_required()
@roles_required("admin")
def get_professionals():
    data = analytics_service.get_professional_analytics()
    return jsonify(data), 200

@analytics_bp.get("/patients")
@jwt_required()
@roles_required("admin")
def get_patients():
    data = analytics_service.get_patient_analytics()
    return jsonify(data), 200

@analytics_bp.get("/system")
@jwt_required()
@roles_required("admin")
def get_system():
    data = analytics_service.get_system_health()
    return jsonify(data), 200
