from flask import Blueprint, request, jsonify
from marshmallow import ValidationError
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.schemas.auth_schema import (
    RegisterSchema,
    LoginSchema,
)

from app.services.auth_service import AuthService
from app.repositories.user_repository import UserRepository


auth_bp = Blueprint(
    "auth",
    __name__,
    url_prefix="/api/auth"
)


register_schema = RegisterSchema()
login_schema = LoginSchema()


@auth_bp.post("/register")
def register():

    try:
        data = register_schema.load(
            request.json
        )

        result = AuthService.register(data)

        return jsonify({
            "message": "Account created successfully",
            "data": result,
        }), 201


    except ValidationError as error:
        return jsonify({
            "errors": error.messages
        }), 400


    except ValueError as error:
        return jsonify({
            "message": str(error)
        }), 409



@auth_bp.post("/login")
def login():

    try:
        data = login_schema.load(
            request.json
        )

        result = AuthService.login(
            data["email"],
            data["password"],
        )

        return jsonify({
            "message": "Login successful",
            "data": result,
        }), 200


    except ValidationError as error:
        return jsonify({
            "errors": error.messages
        }), 400


    except ValueError as error:
        return jsonify({
            "message": str(error)
        }), 401

@auth_bp.get("/me")
@jwt_required()
def get_current_user():

    user_id = get_jwt_identity()

    user = UserRepository.get_by_id(
        user_id
    )

    if not user:
        return jsonify({
            "message": "User not found"
        }), 404


    return jsonify({
        "user": {
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "role": user.role,
        }
    }), 200