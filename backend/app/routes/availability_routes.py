from flask import Blueprint, jsonify, request

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
)

from app.schemas.availability_schema import (
    AvailabilitySchema,
)
from app.services.availability_service import (
    AvailabilityService,
)
from app.utils.decorators import roles_required


availability_bp = Blueprint(
    "availability",
    __name__,
    url_prefix="/api/availability",
)

availability_schema = AvailabilitySchema()


@availability_bp.post("/")
@jwt_required()
@roles_required("professional")
def create_availability():

    user_id = get_jwt_identity()

    data = availability_schema.load(
        request.get_json()
    )

    result = AvailabilityService.create_availability(
        user_id,
        data,
    )

    return jsonify({
        "message": "Availability created successfully.",
        "data": result,
    }), 201


@availability_bp.get("/")
@jwt_required()
@roles_required("professional")
def get_my_availability():

    user_id = get_jwt_identity()

    schedules = (
        AvailabilityService.get_my_availability(
            user_id
        )
    )

    return jsonify({
        "data": schedules,
    }), 200