import hashlib
import secrets
from datetime import datetime, timedelta

from flask_jwt_extended import create_access_token

from app.extensions import bcrypt
from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.services.notification_service import NotificationService
from app.tasks.email_tasks import (
    send_email_verification_task,
    send_password_reset_task,
    send_welcome_email_task,
)


def _hash_token(raw_token: str) -> str:
    return hashlib.sha256(raw_token.encode("utf-8")).hexdigest()


class AuthService:

    @staticmethod
    def register(data):
        email = data["email"].lower()

        # Check existing user
        if UserRepository.email_exists(email):
            raise ValueError("Email already registered")

        # Hash password
        password_hash = bcrypt.generate_password_hash(data["password"]).decode("utf-8")

        # Create user model
        user = User(
            first_name=data["first_name"],
            last_name=data["last_name"],
            email=email,
            password_hash=password_hash,
        )

        # Save user
        UserRepository.create(user)

        NotificationService.create_notification(
            user_id=user.id,
            title="Welcome to Irfan HomeCare",
            message=(
                "Your account has been created successfully. "
                "Complete your profile to get started."
            ),
            notification_type="system",
        )

        # Enqueue Welcome Email task
        send_welcome_email_task.delay(user.id)

        # Automatically enqueue verification link
        AuthService.send_email_verification(user.id)

        # Generate token
        token = create_access_token(identity=user.id)

        return {
            "user": {
                "id": user.id,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "role": user.role,
                "email_verified": user.email_verified,
            },
            "access_token": token,
        }

    @staticmethod
    def login(email, password):

        email = email.lower()

        user = UserRepository.get_by_email(email)

        if not user:
            raise ValueError("Invalid email or password")

        valid_password = bcrypt.check_password_hash(user.password_hash, password)

        if not valid_password:
            raise ValueError("Invalid email or password")

        token = create_access_token(identity=user.id)

        return {
            "user": {
                "id": user.id,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "role": user.role,
                "email_verified": user.email_verified,
            },
            "access_token": token,
        }

    @staticmethod
    def send_email_verification(user_id):
        user = UserRepository.get_by_id(user_id)
        if not user:
            raise ValueError("User not found.")

        raw_token = secrets.token_urlsafe(32)
        hashed_token = _hash_token(raw_token)

        user.verification_token = hashed_token
        user.verification_token_expires_at = datetime.utcnow() + timedelta(hours=24)
        UserRepository.update()

        verification_link = f"http://localhost:5173/verify-email?token={raw_token}"
        send_email_verification_task.delay(user.id, verification_link)

        return {"message": "Verification email sent successfully."}

    @staticmethod
    def verify_email(raw_token):
        hashed_token = _hash_token(raw_token)
        user = UserRepository.get_by_verification_token(hashed_token)

        if not user or not user.verification_token_expires_at:
            raise ValueError("Invalid or expired verification token.")

        if datetime.utcnow() > user.verification_token_expires_at:
            raise ValueError("Verification token has expired.")

        user.email_verified = True
        user.verification_token = None
        user.verification_token_expires_at = None
        UserRepository.update()

        return {"message": "Email verified successfully."}

    @staticmethod
    def request_password_reset(email):
        email = email.lower()
        user = UserRepository.get_by_email(email)

        # Always return a generic success message to prevent user enumeration
        if not user:
            return {
                "message": (
                    "If that email address is in our system, "
                    "a password reset link has been sent."
                )
            }

        raw_token = secrets.token_urlsafe(32)
        hashed_token = _hash_token(raw_token)

        user.password_reset_token = hashed_token
        user.password_reset_token_expires_at = datetime.utcnow() + timedelta(hours=1)
        UserRepository.update()

        reset_link = f"http://localhost:5173/reset-password?token={raw_token}"
        send_password_reset_task.delay(user.id, reset_link)

        return {
            "message": (
                "If that email address is in our system, "
                "a password reset link has been sent."
            )
        }

    @staticmethod
    def reset_password(raw_token, new_password):
        hashed_token = _hash_token(raw_token)
        user = UserRepository.get_by_password_reset_token(hashed_token)

        if not user or not user.password_reset_token_expires_at:
            raise ValueError("Invalid or expired password reset token.")

        if datetime.utcnow() > user.password_reset_token_expires_at:
            raise ValueError("Password reset token has expired.")

        new_password_hash = bcrypt.generate_password_hash(new_password).decode("utf-8")
        user.password_hash = new_password_hash
        user.password_reset_token = None
        user.password_reset_token_expires_at = None
        UserRepository.update()

        return {"message": "Password reset successfully."}
