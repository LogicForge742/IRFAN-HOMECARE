from app.extensions import db
from app.models.user import User


class UserRepository:

    @staticmethod
    def get_by_email(email):
        return User.query.filter_by(email=email).first()

    @staticmethod
    def get_by_id(user_id):
        return User.query.filter_by(id=user_id).first()

    @staticmethod
    def get_by_verification_token(hash_token):
        return User.query.filter_by(verification_token=hash_token).first()

    @staticmethod
    def get_by_password_reset_token(hash_token):
        return User.query.filter_by(password_reset_token=hash_token).first()

    @staticmethod
    def email_exists(email):
        return User.query.filter_by(email=email).first() is not None

    @staticmethod
    def create(user):
        db.session.add(user)
        db.session.commit()

        return user

    @staticmethod
    def update():
        db.session.commit()
