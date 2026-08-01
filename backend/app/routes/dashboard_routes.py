from flask import Blueprint, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required

from app.services.dashboard_service import DashboardService
from app.utils.decorators import roles_required

dashboard_bp = Blueprint(
    "dashboard",
    __name__,
    url_prefix="/api/dashboard",
)


@dashboard_bp.get("/professional")
@jwt_required()
@roles_required("professional")
def professional_dashboard():

    user_id = get_jwt_identity()

    dashboard = DashboardService.get_professional_dashboard(user_id)

    return jsonify(dashboard), 200
