from datetime import datetime
from uuid import uuid4
from app.models.video_session import VideoSession
from app.repositories.video_session_repository import VideoSessionRepository
from app.repositories.appointment_repository import AppointmentRepository

class VideoSessionService:

    @staticmethod
    def create_session(appointment_id):
        appointment = AppointmentRepository.get_by_id(appointment_id)
        if not appointment:
            raise ValueError("Appointment not found")

        # Check if an active/scheduled session already exists for this appointment
        # Using filter_by on the VideoSession model
        existing = VideoSession.query.filter_by(
            appointment_id=appointment_id
        ).filter(VideoSession.status.in_(["scheduled", "active"])).first()
        
        if existing:
            return existing

        # Generate a unique, url-safe room_id
        room_id = f"room-{uuid4().hex}"

        new_session = VideoSession(
            appointment_id=appointment_id,
            room_id=room_id,
            patient_id=appointment.patient_id,
            professional_id=appointment.professional_id,
            status="scheduled",
        )

        return VideoSessionRepository.create(new_session)

    @staticmethod
    def get_session_by_room(room_id):
        session = VideoSessionRepository.get_by_room_id(room_id)
        if not session:
            raise ValueError("Video session not found")
        return session

    @staticmethod
    def join_session(room_id):
        session = VideoSessionRepository.get_by_room_id(room_id)
        if not session:
            raise ValueError("Video session not found")

        if session.status == "scheduled":
            session.status = "active"
            session.started_at = datetime.utcnow()
            VideoSessionRepository.update()

        return session

    @staticmethod
    def end_session(room_id):
        session = VideoSessionRepository.get_by_room_id(room_id)
        if not session:
            raise ValueError("Video session not found")

        if session.status != "completed":
            session.status = "completed"
            session.ended_at = datetime.utcnow()
            
            if session.started_at:
                delta = session.ended_at - session.started_at
                session.duration = int(delta.total_seconds())
            else:
                session.duration = 0
                
            VideoSessionRepository.update()

        return session
