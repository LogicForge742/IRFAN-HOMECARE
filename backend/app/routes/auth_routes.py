from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from marshmallow import ValidationError

from app.extensions import limiter
from app.repositories.user_repository import UserRepository
from app.schemas.auth_schema import LoginSchema, RegisterSchema
from app.services.auth_service import AuthService

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")


register_schema = RegisterSchema()
login_schema = LoginSchema()


@auth_bp.post("/register")
@limiter.limit("20 per minute")
def register():

    try:
        data = register_schema.load(request.json)

        result = AuthService.register(data)

        return (
            jsonify(
                {
                    "message": "Account created successfully",
                    "data": result,
                }
            ),
            201,
        )

    except ValidationError as error:
        return jsonify({"errors": error.messages}), 400

    except ValueError as error:
        return jsonify({"message": str(error)}), 409


@auth_bp.post("/login")
@limiter.limit("10 per minute")
def login():
    """
    Authenticate user and generate JWT access token
    ---
    tags:
      - Authentication
    parameters:
      - in: body
        name: body
        required: true
        schema:
          type: object
          required:
            - email
            - password
          properties:
            email:
              type: string
              example: user@example.com
            password:
              type: string
              example: SecurePass123!
    responses:
      200:
        description: Login successful
        schema:
          type: object
          properties:
            message:
              type: string
              example: Login successful
            data:
              type: object
              properties:
                user:
                  type: object
                  properties:
                    id:
                      type: string
                    first_name:
                      type: string
                    last_name:
                      type: string
                    email:
                      type: string
                    role:
                      type: string
                    email_verified:
                      type: boolean
                access_token:
                  type: string
      400:
        description: Validation error
      401:
        description: Invalid email or password
    """
    try:
        data = login_schema.load(request.json)

        result = AuthService.login(
            data["email"],
            data["password"],
        )

        return (
            jsonify(
                {
                    "message": "Login successful",
                    "data": result,
                }
            ),
            200,
        )

    except ValidationError as error:
        return jsonify({"errors": error.messages}), 400

    except ValueError as error:
        return jsonify({"message": str(error)}), 401


@auth_bp.get("/me")
@jwt_required()
def get_current_user():

    user_id = get_jwt_identity()

    user = UserRepository.get_by_id(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404

    return (
        jsonify(
            {
                "user": {
                    "id": user.id,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "email": user.email,
                    "role": user.role,
                    "email_verified": user.email_verified,
                }
            }
        ),
        200,
    )


@auth_bp.post("/forgot-password")
@limiter.limit("3 per hour")
def forgot_password():
    data = request.get_json() or {}
    email = data.get("email")

    if not email:
        return jsonify({"message": "Email is required."}), 400

    result = AuthService.request_password_reset(email)
    return jsonify(result), 200


@auth_bp.post("/reset-password")
def reset_password():
    data = request.get_json() or {}
    token = data.get("token")
    new_password = data.get("new_password")

    if not token or not new_password:
        return jsonify({"message": "Token and new_password are required."}), 400

    try:
        result = AuthService.reset_password(token, new_password)
        return jsonify(result), 200
    except ValueError as error:
        return jsonify({"message": str(error)}), 400


@auth_bp.post("/send-verification")
@jwt_required()
def send_verification():
    user_id = get_jwt_identity()

    try:
        result = AuthService.send_email_verification(user_id)
        return jsonify(result), 200
    except ValueError as error:
        return jsonify({"message": str(error)}), 400


@auth_bp.get("/verify-email")
def verify_email():
    token = request.args.get("token")

    if not token:
        return jsonify({"message": "Token is required."}), 400

    try:
        result = AuthService.verify_email(token)
        return jsonify(result), 200
    except ValueError as error:
        return jsonify({"message": str(error)}), 400
