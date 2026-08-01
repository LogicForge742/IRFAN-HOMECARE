from flask import Blueprint, request, jsonify, Response
from flask_jwt_extended import jwt_required
from app.features.audit.services.audit_service import AuditService
from app.features.audit.schemas.audit_schema import AuditLogSchema, AuditArchiveSchema
from app.utils.decorators import roles_required

audit_bp = Blueprint("audit", __name__)
audit_log_schema = AuditLogSchema()
audit_logs_schema = AuditLogSchema(many=True)

@audit_bp.route("", methods=["GET"])
@jwt_required()
@roles_required("admin")
def get_audit_logs():
    params = request.args.to_dict()
    result = AuditService.get_logs(params)
    return jsonify({
        "status": "success",
        "data": {
            "items": audit_logs_schema.dump(result.get("items", [])),
            "metadata": result.get("metadata", {})
        }
    }), 200

@audit_bp.route("/<string:log_id>", methods=["GET"])
@jwt_required()
@roles_required("admin")
def get_audit_log_by_id(log_id):
    log = AuditService.get_log_by_id(log_id)
    if not log:
        return jsonify({"status": "error", "message": "Audit log not found"}), 404
    return jsonify({
        "status": "success",
        "data": audit_log_schema.dump(log)
    }), 200

@audit_bp.route("/user/<string:user_id>", methods=["GET"])
@jwt_required()
@roles_required("admin")
def get_audit_logs_by_user(user_id):
    params = request.args.to_dict()
    result = AuditService.get_logs_by_user(user_id, params)
    return jsonify({
        "status": "success",
        "data": {
            "items": audit_logs_schema.dump(result.get("items", [])),
            "metadata": result.get("metadata", {})
        }
    }), 200

@audit_bp.route("/export", methods=["GET"])
@jwt_required()
@roles_required("admin")
def export_audit_logs():
    csv_data = AuditService.export_logs_csv()
    return Response(
        csv_data,
        mimetype="text/csv",
        headers={"Content-disposition": "attachment; filename=audit_logs.csv"}
    )

@audit_bp.route("/archive", methods=["DELETE"])
@jwt_required()
@roles_required("admin")
def archive_audit_logs():
    data = request.get_json() or {}
    archive_schema = AuditArchiveSchema()
    errors = archive_schema.validate(data)
    if errors:
        return jsonify({"status": "error", "errors": errors}), 400
        
    before_date = archive_schema.load(data)["before_date"]
    count = AuditService.archive_logs(before_date)
    return jsonify({
        "status": "success",
        "message": f"Successfully archived {count} audit logs."
    }), 200
