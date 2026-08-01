from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.features.fhir.services.fhir_service import FHIRService
from app.features.fhir.schemas.fhir_schema import FHIRValidateSchema, FHIRImportSchema, FHIRExportSchema

fhir_bp = Blueprint("fhir", __name__)

@fhir_bp.route("/patient/<int:id>", methods=["GET"])
@fhir_bp.route("/Patient/<int:id>", methods=["GET"])
@jwt_required()
def get_patient(id):
    res = FHIRService.get_patient_resource(id)
    if not res:
        return jsonify({"status": "error", "message": "Patient resource not found"}), 404
    return jsonify(res), 200

@fhir_bp.route("/appointment/<int:id>", methods=["GET"])
@fhir_bp.route("/Appointment/<int:id>", methods=["GET"])
@jwt_required()
def get_appointment(id):
    res = FHIRService.get_appointment_resource(id)
    if not res:
        return jsonify({"status": "error", "message": "Appointment resource not found"}), 404
    return jsonify(res), 200

@fhir_bp.route("/observation/<int:id>", methods=["GET"])
@fhir_bp.route("/Observation/<int:id>", methods=["GET"])
@jwt_required()
def get_observation(id):
    res = FHIRService.get_observation_resource(id)
    if not res:
        return jsonify({"status": "error", "message": "Observation resource not found"}), 404
    return jsonify(res), 200

@fhir_bp.route("/validate", methods=["POST"])
@jwt_required()
def validate_resource():
    data = request.get_json() or {}
    schema = FHIRValidateSchema()
    errors = schema.validate(data)
    if errors:
        return jsonify({"status": "error", "errors": errors}), 400
    
    loaded = schema.load(data)
    is_valid, validation_errors = FHIRService.validate_fhir_resource(loaded["resource"])
    if not is_valid:
        return jsonify({"status": "invalid", "errors": validation_errors}), 200
    return jsonify({"status": "valid", "message": "Resource successfully validated."}), 200

@fhir_bp.route("/import", methods=["POST"])
@jwt_required()
def import_resource():
    data = request.get_json() or {}
    schema = FHIRImportSchema()
    errors = schema.validate(data)
    if errors:
        return jsonify({"status": "error", "errors": errors}), 400
    
    loaded = schema.load(data)
    success, message = FHIRService.import_fhir_resource(loaded["resource"])
    if not success:
        return jsonify({"status": "error", "message": message}), 400
    return jsonify({"status": "success", "message": message}), 200

@fhir_bp.route("/export", methods=["POST"])
@jwt_required()
def export_bundle():
    data = request.get_json() or {}
    schema = FHIRExportSchema()
    errors = schema.validate(data)
    if errors:
        return jsonify({"status": "error", "errors": errors}), 400
    
    loaded = schema.load(data)
    bundle = FHIRService.export_patient_bundle(loaded["patient_id"])
    if not bundle:
        return jsonify({"status": "error", "message": "Patient not found"}), 404
    return jsonify(bundle), 200
