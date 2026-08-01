from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.utils.decorators import roles_required
from app.features.ai.services.ai_service import AIService
from app.features.ai.schemas.ai_schema import (
    AIConsultationSummarySchema,
    AIDifferentialDiagnosisSchema,
    AIFollowupSchema,
    AIPatientInstructionsSchema
)

ai_bp = Blueprint("ai", __name__)

@ai_bp.route("/consultation-summary", methods=["POST"])
@jwt_required()
@roles_required("professional")
def consultation_summary():
    data = request.get_json() or {}
    schema = AIConsultationSummarySchema()
    errors = schema.validate(data)
    if errors:
        return jsonify({"status": "error", "errors": errors}), 400
    
    loaded = schema.load(data)
    result = AIService.generate_consultation_summary(
        loaded["observations"],
        loaded["symptoms"],
        loaded["diagnosis"]
    )
    return jsonify({"status": "success", "suggestion": result}), 200

@ai_bp.route("/differential-diagnosis", methods=["POST"])
@jwt_required()
@roles_required("professional")
def differential_diagnosis():
    data = request.get_json() or {}
    schema = AIDifferentialDiagnosisSchema()
    errors = schema.validate(data)
    if errors:
        return jsonify({"status": "error", "errors": errors}), 400
    
    loaded = schema.load(data)
    result = AIService.generate_differential_diagnosis(
        loaded["symptoms"],
        loaded["diagnosis"]
    )
    return jsonify({"status": "success", "suggestion": result}), 200

@ai_bp.route("/follow-up", methods=["POST"])
@jwt_required()
@roles_required("professional")
def follow_up():
    data = request.get_json() or {}
    schema = AIFollowupSchema()
    errors = schema.validate(data)
    if errors:
        return jsonify({"status": "error", "errors": errors}), 400
    
    loaded = schema.load(data)
    result = AIService.generate_followup(loaded["diagnosis"])
    return jsonify({"status": "success", "suggestion": result}), 200

@ai_bp.route("/patient-instructions", methods=["POST"])
@jwt_required()
@roles_required("professional")
def patient_instructions():
    data = request.get_json() or {}
    schema = AIPatientInstructionsSchema()
    errors = schema.validate(data)
    if errors:
        return jsonify({"status": "error", "errors": errors}), 400
    
    loaded = schema.load(data)
    result = AIService.generate_patient_instructions(loaded["diagnosis"])
    return jsonify({"status": "success", "suggestion": result}), 200
