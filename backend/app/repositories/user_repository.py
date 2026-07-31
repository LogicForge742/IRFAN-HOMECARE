from app.extensions import db
from app.models.user import User


class UserRepository:

    @staticmethod
    def get_by_email(email):
        return User.query.filter_by(
            email=email
        ).first()


    @staticmethod
    def get_by_id(user_id):
        return User.query.filter_by(
            id=user_id
        ).first()


    @staticmethod
    def email_exists(email):
        return User.query.filter_by(
            email=email
        ).first() is not None


    @staticmethod
    def create(user):
        db.session.add(user)
        db.session.commit()

        return user