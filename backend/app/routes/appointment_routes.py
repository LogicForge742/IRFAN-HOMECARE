from flask import Blueprint, request, jsonify
from marshmallow import ValidationError

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
)

from app.schemas.appointment_schema import AppointmentSchema
from app.services.appointment_service import AppointmentService
from app.utils.decorators import roles_required


appointment_bp = Blueprint(
    "appointments",
    __name__,
    url_prefix="/api/appointments",
)

appointment_schema = AppointmentSchema()


@appointment_bp.post("/")
@jwt_required()
def create_appointment():
    try:
        patient_id = get_jwt_identity()

        data = appointment_schema.load(request.json)

        result = AppointmentService.create_appointment(
            patient_id,
            data,
        )

        return jsonify({
            "message": "Appointment created successfully",
            "data": result,
        }), 201

    except ValidationError as error:
        return jsonify({
            "errors": error.messages,
        }), 400

    except ValueError as error:
        message = str(error)

        if "already booked" in message:
            return jsonify({
                "message": message,
            }), 409

        return jsonify({
            "message": message,
        }), 400


@appointment_bp.get("/")
@jwt_required()
def get_my_appointments():
    patient_id = get_jwt_identity()

    appointments = AppointmentService.get_patient_appointments(
        patient_id,
    )

    return jsonify({
        "data": appointments,
    }), 200


@appointment_bp.put("/<appointment_id>/status")
@jwt_required()
@roles_required("professional")
def update_status(appointment_id):
    try:
        data = request.get_json()

        result = AppointmentService.update_status(
            appointment_id,
            data["status"],
        )

        return jsonify({
            "message": "Appointment updated successfully",
            "data": result,
        }), 200

    except ValueError as error:
        return jsonify({
            "message": str(error),
        }), 400