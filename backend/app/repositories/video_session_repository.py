from app.extensions import db
from app.models.video_session import VideoSession

class VideoSessionRepository:

    @staticmethod
    def create(session):
        db.session.add(session)
        db.session.commit()
        return session

    @staticmethod
    def get_by_id(session_id):
        return VideoSession.query.get(session_id)

    @staticmethod
    def get_by_room_id(room_id):
        return VideoSession.query.filter_by(room_id=room_id).first()

    @staticmethod
    def update():
        db.session.commit()

    @staticmethod
    def delete(session):
        db.session.delete(session)
        db.session.commit()
