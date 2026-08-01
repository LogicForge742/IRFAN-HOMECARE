from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from marshmallow import ValidationError

from app.schemas.patient_schema import PatientProfileSchema
from app.services.patient_service import PatientService

patient_bp = Blueprint(
    "patients",
    __name__,
    url_prefix="/api/patients",
)


patient_schema = PatientProfileSchema()


@patient_bp.post("/profile")
@jwt_required()
def create_profile():

    try:
        user_id = get_jwt_identity()

        data = patient_schema.load(request.json)

        result = PatientService.create_profile(
            user_id,
            data,
        )

        return (
            jsonify(
                {
                    "message": "Patient profile created successfully",
                    "data": result,
                }
            ),
            201,
        )

    except ValidationError as error:
        return jsonify({"errors": error.messages}), 400

    except ValueError as error:
        return jsonify({"message": str(error)}), 409


@patient_bp.get("/profile")
@jwt_required()
def get_profile():

    try:
        user_id = get_jwt_identity()

        result = PatientService.get_profile(user_id)

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


@patient_bp.put("/profile")
@jwt_required()
def update_profile():

    try:
        user_id = get_jwt_identity()

        data = patient_schema.load(
            request.json,
            partial=True,
        )

        result = PatientService.update_profile(
            user_id,
            data,
        )

        return (
            jsonify(
                {
                    "message": "Patient profile updated successfully",
                    "data": result,
                }
            ),
            200,
        )

    except ValidationError as error:
        return jsonify({"errors": error.messages}), 400

    except ValueError as error:
        return jsonify({"message": str(error)}), 404
