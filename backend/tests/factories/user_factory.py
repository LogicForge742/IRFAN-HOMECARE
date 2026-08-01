from app.models.user import User
from app.extensions import db, bcrypt

class UserFactory:
    @staticmethod
    def create(email="fake@test.com", password="Password123!", first_name="Fake", last_name="User", role="patient"):
        user = User(
            email=email,
            first_name=first_name,
            last_name=last_name,
            role=role,
            password_hash=bcrypt.generate_password_hash(password).decode("utf-8"),
        )
        db.session.add(user)
        db.session.commit()
        return user
