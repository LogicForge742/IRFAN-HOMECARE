from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from marshmallow import ValidationError

from app.schemas.tenant.organization_schema import (
    AddMemberSchema,
    OrganizationCreateSchema,
)
from app.services.tenant.organization_service import OrganizationService

organization_bp = Blueprint(
    "organizations",
    __name__,
    url_prefix="/api/organizations",
)

org_create_schema = OrganizationCreateSchema()
add_member_schema = AddMemberSchema()


@organization_bp.post("")
@jwt_required()
def create_organization():
    try:
        data = org_create_schema.load(request.json or {})
        result = OrganizationService.create_organization(data)
        return (
            jsonify(
                {
                    "message": "Organization created successfully",
                    "data": result,
                }
            ),
            201,
        )
    except ValidationError as error:
        return jsonify({"errors": error.messages}), 400
    except ValueError as error:
        return jsonify({"message": str(error)}), 409


@organization_bp.get("")
@jwt_required()
def list_organizations():
    try:
        result = OrganizationService.list_organizations()
        return jsonify({"data": result}), 200
    except Exception as error:
        return jsonify({"message": str(error)}), 500


@organization_bp.get("/<org_id>")
@jwt_required()
def get_organization(org_id):
    try:
        result = OrganizationService.get_organization(org_id)
        return jsonify({"data": result}), 200
    except ValueError as error:
        return jsonify({"message": str(error)}), 404


@organization_bp.get("/slug/<slug>")
def get_organization_by_slug(slug):
    try:
        result = OrganizationService.get_organization_by_slug(slug)
        return jsonify({"data": result}), 200
    except ValueError as error:
        return jsonify({"message": str(error)}), 404


@organization_bp.get("/<org_id>/members")
@jwt_required()
def get_organization_members(org_id):
    try:
        result = OrganizationService.get_members(org_id)
        return jsonify({"data": result}), 200
    except ValueError as error:
        return jsonify({"message": str(error)}), 404


@organization_bp.post("/<org_id>/members")
@jwt_required()
def add_organization_member(org_id):
    try:
        payload = add_member_schema.load(request.json or {})
        user_identifier = payload.get("user_identifier")
        role = payload.get("role", "member")
        result = OrganizationService.add_member(org_id, user_identifier, role)
        return (
            jsonify(
                {
                    "message": "Member added to organization successfully",
                    "data": result,
                }
            ),
            201,
        )
    except ValidationError as error:
        return jsonify({"errors": error.messages}), 400
    except ValueError as error:
        return jsonify({"message": str(error)}), 400


@organization_bp.delete("/<org_id>/members/<user_id>")
@jwt_required()
def remove_organization_member(org_id, user_id):
    try:
        OrganizationService.remove_member(org_id, user_id)
        return jsonify({"message": "Member removed successfully"}), 200
    except ValueError as error:
        return jsonify({"message": str(error)}), 404
