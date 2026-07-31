from flask_jwt_extended import create_access_token

from app.extensions import bcrypt
from app.models.user import User
from app.repositories.user_repository import UserRepository


class AuthService:

    @staticmethod
    def register(data):
        email = data["email"].lower()

        # Check existing user
        if UserRepository.email_exists(email):
            raise ValueError("Email already registered")

        # Hash password
        password_hash = bcrypt.generate_password_hash(
            data["password"]
        ).decode("utf-8")

        # Create user model
        user = User(
            first_name=data["first_name"],
            last_name=data["last_name"],
            email=email,
            password_hash=password_hash,
        )

        # Save user
        UserRepository.create(user)

        # Generate token
        token = create_access_token(
            identity=user.id
        )

        return {
            "user": {
                "id": user.id,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "role": user.role,
            },
            "access_token": token,
        }


    @staticmethod
    def login(email, password):

        email = email.lower()

        user = UserRepository.get_by_email(email)

        if not user:
            raise ValueError(
                "Invalid email or password"
            )

        valid_password = bcrypt.check_password_hash(
            user.password_hash,
            password
        )

        if not valid_password:
            raise ValueError(
                "Invalid email or password"
            )

        token = create_access_token(
            identity=user.id
        )

        return {
            "user": {
                "id": user.id,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "role": user.role,
            },
            "access_token": token,
        }