from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from marshmallow import ValidationError

from app.schemas.professional_schema import ProfessionalProfileSchema
from app.services.professional_service import ProfessionalService
from app.schemas.common.filter_schema import FilterQuerySchema
from app.repositories.professional_repository import ProfessionalRepository
from app.models.user import User

professional_bp = Blueprint(
    "professionals",
    __name__,
    url_prefix="/api/professionals",
)

@professional_bp.before_request
def log_headers():
    import logging
    logger = logging.getLogger("request_logger")
    logger.info(f"Professional BP request headers: {dict(request.headers)}")


professional_schema = ProfessionalProfileSchema()


@professional_bp.post("/profile")
@jwt_required()
def create_profile():

    try:
        user_id = get_jwt_identity()

        data = professional_schema.load(request.json)

        result = ProfessionalService.create_profile(
            user_id,
            data,
        )

        return (
            jsonify(
                {
                    "message": "Professional profile created successfully",
                    "data": result,
                }
            ),
            201,
        )

    except ValidationError as error:
        return jsonify({"errors": error.messages}), 400

    except ValueError as error:
        return jsonify({"message": str(error)}), 409


@professional_bp.get("/profile")
@jwt_required()
def get_profile():

    try:
        user_id = get_jwt_identity()

        result = ProfessionalService.get_profile(user_id)

        return (
            jsonify(
                {
                    "data": result,
                }
            ),
            200,
        )

    except ValueError as error:
        return jsonify({"message": str(error)}), 404


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

        return (
            jsonify(
                {
                    "message": "Professional profile updated successfully",
                    "data": result,
                }
            ),
            200,
        )

    except ValidationError as error:
        return jsonify({"errors": error.messages}), 400

    except ValueError as error:
        return jsonify({"message": str(error)}), 404


filter_query_schema = FilterQuerySchema()


@professional_bp.get("")
def list_professionals():
    try:
        params = filter_query_schema.load(request.args)
        result = ProfessionalRepository.find_all(params)

        serialized_items = []
        for prof in result["items"]:
            user = User.query.get(prof.user_id)
            user_name = f"{user.first_name} {user.last_name}" if user else "Unknown"
            
            serialized_items.append({
                "id": prof.id,
                "user_id": prof.user_id,
                "name": user_name,
                "license_number": prof.license_number,
                "specialization": prof.specialization,
                "qualification": prof.qualification,
                "years_of_experience": prof.years_of_experience,
                "bio": prof.bio,
                "phone_number": prof.phone_number,
                "consultation_fee": prof.consultation_fee,
                "verification_status": prof.verification_status,
                "rating": 4.9,  # Default rating details
                "reviewCount": 34,
                "location": "Nairobi, Westlands", # Default location
            })

        return jsonify({
            "data": serialized_items,
            "metadata": result["metadata"]
        }), 200

    except ValidationError as error:
        return jsonify({"errors": error.messages}), 400

