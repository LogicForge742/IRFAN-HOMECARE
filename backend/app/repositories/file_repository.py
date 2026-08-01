from app.extensions import db
from app.models.file import File


class FileRepository:

    @staticmethod
    def create(file):
        db.session.add(file)
        db.session.commit()
        return file

    @staticmethod
    def get_by_id(file_id):
        return File.query.get(file_id)

    @staticmethod
    def get_by_user(user_id):
        return (
            File.query.filter_by(user_id=user_id).order_by(File.created_at.desc()).all()
        )

    @staticmethod
    def delete(file):
        db.session.delete(file)
        db.session.commit()
