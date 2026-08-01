import os
from flask import Blueprint, request, jsonify, redirect
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.features.sso.services.sso_service import SSOService
from app.features.sso.schemas.sso_schema import SSOLinkAccountSchema, SSOUnlinkAccountSchema

sso_bp = Blueprint("sso", __name__)

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

@sso_bp.route("/providers", methods=["GET"])
def list_providers():
    providers = SSOService.list_providers()
    return jsonify({"status": "success", "providers": providers}), 200

@sso_bp.route("/login/<provider>", methods=["GET"])
def sso_login(provider):
    redirect_uri = request.args.get(
        "redirect_uri",
        f"{request.host_url.rstrip('/')}/api/sso/callback/{provider}"
    )
    result = SSOService.get_login_url(provider, redirect_uri)
    if not result:
        return jsonify({"status": "error", "message": f"Unknown provider: {provider}"}), 404
    return jsonify({"status": "success", "data": result}), 200

@sso_bp.route("/callback/<provider>", methods=["GET"])
def sso_callback(provider):
    code = request.args.get("code", "")
    state = request.args.get("state", "")
    redirect_uri = f"{request.host_url.rstrip('/')}/api/sso/callback/{provider}"

    result, error = SSOService.handle_callback(provider, code, redirect_uri)
    if error:
        return redirect(f"{FRONTEND_URL}/login?sso_error={error}")

    token = result["access_token"]
    return redirect(f"{FRONTEND_URL}/dashboard?sso_token={token}")

@sso_bp.route("/link-account", methods=["POST"])
@jwt_required()
def link_account():
    data = request.get_json() or {}
    schema = SSOLinkAccountSchema()
    errors = schema.validate(data)
    if errors:
        return jsonify({"status": "error", "errors": errors}), 400

    loaded = schema.load(data)
    user_id = int(get_jwt_identity())
    success, message = SSOService.link_account(user_id, loaded["provider"], loaded["provider_subject_id"])
    if not success:
        return jsonify({"status": "error", "message": message}), 400
    return jsonify({"status": "success", "message": message}), 200

@sso_bp.route("/unlink-account", methods=["POST"])
@jwt_required()
def unlink_account():
    data = request.get_json() or {}
    schema = SSOUnlinkAccountSchema()
    errors = schema.validate(data)
    if errors:
        return jsonify({"status": "error", "errors": errors}), 400

    loaded = schema.load(data)
    if not loaded.get("confirm"):
        return jsonify({"status": "error", "message": "Must confirm unlinking."}), 400

    user_id = int(get_jwt_identity())
    success, message = SSOService.unlink_account(user_id)
    if not success:
        return jsonify({"status": "error", "message": message}), 400
    return jsonify({"status": "success", "message": message}), 200
