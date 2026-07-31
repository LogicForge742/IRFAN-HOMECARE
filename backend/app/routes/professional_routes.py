from flask import Blueprint, request, jsonify
from marshmallow import ValidationError

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
)

from app.schemas.professional_schema import (
    ProfessionalProfileSchema,
)
from app.services.professional_service import (
    ProfessionalService,
)


professional_bp = Blueprint(
    "professionals",
    __name__,
    url_prefix="/api/professionals",
)


professional_schema = ProfessionalProfileSchema()


@professional_bp.post("/profile")
@jwt_required()
def create_profile():

    try:
        user_id = get_jwt_identity()

        data = professional_schema.load(
            request.json
        )

        result = ProfessionalService.create_profile(
            user_id,
            data,
        )

        return jsonify({
            "message": "Professional profile created successfully",
            "data": result,
        }), 201

    except ValidationError as error:
        return jsonify({
            "errors": error.messages
        }), 400

    except ValueError as error:
        return jsonify({
            "message": str(error)
        }), 409


@professional_bp.get("/profile")
@jwt_required()
def get_profile():

    try:
        user_id = get_jwt_identity()

        result = ProfessionalService.get_profile(
            user_id
        )

        return jsonify({
            "data": result,
        }), 200

    except ValueError as error:
        return jsonify({
            "message": str(error)
        }), 404


@professional_bp.put("/profile")
@jwt_required()
def update_profile():

    try:
        user_id = get_jwt_identity()

        data = professional_schema.load(
            request.json,
            partial=True,
        )

        result = ProfessionalService.update_profile(
            user_id,
            data,
        )

        return jsonify({
            "message": "Professional profile updated successfully",
            "data": result,
        }), 200

    except ValidationError as error:
        return jsonify({
            "errors": error.messages
        }), 400

    except ValueError as error:
        return jsonify({
            "message": str(error)
        }), 404