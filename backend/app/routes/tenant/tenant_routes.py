from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from marshmallow import ValidationError

from app.schemas.tenant.tenant_schema import TenantCreateSchema, TenantUpdateSchema
from app.services.tenant.tenant_service import TenantService

tenant_bp = Blueprint(
    "tenants",
    __name__,
    url_prefix="/api/tenants",
)

tenant_create_schema = TenantCreateSchema()
tenant_update_schema = TenantUpdateSchema()


@tenant_bp.post("")
@jwt_required()
def create_tenant():
    try:
        data = tenant_create_schema.load(request.json or {})
        result = TenantService.create_tenant(data)
        return (
            jsonify(
                {
                    "message": "Tenant created successfully",
                    "data": result,
                }
            ),
            201,
        )
    except ValidationError as error:
        return jsonify({"errors": error.messages}), 400
    except ValueError as error:
        return jsonify({"message": str(error)}), 409


@tenant_bp.get("")
@jwt_required()
def list_tenants():
    try:
        result = TenantService.list_tenants()
        return jsonify({"data": result}), 200
    except Exception as error:
        return jsonify({"message": str(error)}), 500


@tenant_bp.get("/<tenant_id>")
@jwt_required()
def get_tenant(tenant_id):
    try:
        result = TenantService.get_tenant(tenant_id)
        return jsonify({"data": result}), 200
    except ValueError as error:
        return jsonify({"message": str(error)}), 404


@tenant_bp.get("/slug/<slug>")
def get_tenant_by_slug(slug):
    try:
        result = TenantService.get_tenant_by_slug(slug)
        return jsonify({"data": result}), 200
    except ValueError as error:
        return jsonify({"message": str(error)}), 404


@tenant_bp.put("/<tenant_id>")
@jwt_required()
def update_tenant(tenant_id):
    try:
        data = tenant_update_schema.load(request.json or {})
        result = TenantService.update_tenant(tenant_id, data)
        return jsonify({"message": "Tenant updated successfully", "data": result}), 200
    except ValidationError as error:
        return jsonify({"errors": error.messages}), 400
    except ValueError as error:
        return jsonify({"message": str(error)}), 404
