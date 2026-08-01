from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from app.schemas.medical_record_schema import MedicalRecordSchema
from app.services.medical_record_service import MedicalRecordService
from app.services.patient_service import PatientService
from app.utils.decorators import roles_required

medical_record_bp = Blueprint(
    "medical_records",
    __name__,
    url_prefix="/api/medical-records",
)

medical_record_schema = MedicalRecordSchema()


@medical_record_bp.post("/")
@jwt_required()
@roles_required("professional")
def create_medical_record():

    user_id = get_jwt_identity()

    data = medical_record_schema.load(request.get_json())

    record = MedicalRecordService.create_medical_record(
        user_id,
        data,
    )

    return (
        jsonify(
            {
                "message": "Medical record created successfully.",
                "data": record,
            }
        ),
        201,
    )


@medical_record_bp.get("/professional")
@jwt_required()
@roles_required("professional")
def get_professional_records():

    user_id = get_jwt_identity()

    records = MedicalRecordService.get_professional_records(user_id)

    return (
        jsonify(
            {
                "data": records,
            }
        ),
        200,
    )


@medical_record_bp.get("/patient")
@jwt_required()
@roles_required("patient")
def get_patient_records():

    user_id = get_jwt_identity()

    patient = PatientService.get_profile(user_id)

    records = MedicalRecordService.get_patient_records(patient["id"])

    return (
        jsonify(
            {
                "data": records,
            }
        ),
        200,
    )
