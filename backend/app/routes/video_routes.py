from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from marshmallow import ValidationError

from app.schemas.video_schema import VideoSessionCreateSchema, VideoSessionRoomSchema
from app.services.video_session_service import VideoSessionService

video_bp = Blueprint("video", __name__, url_prefix="/api/video")

create_schema = VideoSessionCreateSchema()
room_schema = VideoSessionRoomSchema()

@video_bp.post("/create-room")
@jwt_required()
def create_room():
    try:
        data = create_schema.load(request.json or {})
        session = VideoSessionService.create_session(data["appointment_id"])
        
        return jsonify({
            "message": "Video session created successfully",
            "data": {
                "id": session.id,
                "appointment_id": session.appointment_id,
                "room_id": session.room_id,
                "patient_id": session.patient_id,
                "professional_id": session.professional_id,
                "status": session.status,
                "created_at": session.created_at.isoformat(),
            }
        }), 201
    except ValidationError as err:
        return jsonify({"errors": err.messages}), 400
    except ValueError as err:
        return jsonify({"message": str(err)}), 404

@video_bp.get("/<room_id>")
@jwt_required()
def get_room(room_id):
    try:
        session = VideoSessionService.get_session_by_room(room_id)
        return jsonify({
            "data": {
                "id": session.id,
                "appointment_id": session.appointment_id,
                "room_id": session.room_id,
                "patient_id": session.patient_id,
                "professional_id": session.professional_id,
                "status": session.status,
                "started_at": session.started_at.isoformat() if session.started_at else None,
                "ended_at": session.ended_at.isoformat() if session.ended_at else None,
                "duration": session.duration,
                "created_at": session.created_at.isoformat(),
            }
        }), 200
    except ValueError as err:
        return jsonify({"message": str(err)}), 404

@video_bp.post("/join")
@jwt_required()
def join_room():
    try:
        data = room_schema.load(request.json or {})
        session = VideoSessionService.join_session(data["room_id"])
        return jsonify({
            "message": "Joined video session successfully",
            "data": {
                "id": session.id,
                "room_id": session.room_id,
                "status": session.status,
                "started_at": session.started_at.isoformat() if session.started_at else None,
            }
        }), 200
    except ValidationError as err:
        return jsonify({"errors": err.messages}), 400
    except ValueError as err:
        return jsonify({"message": str(err)}), 404

@video_bp.post("/end")
@jwt_required()
def end_room():
    try:
        data = room_schema.load(request.json or {})
        session = VideoSessionService.end_session(data["room_id"])
        return jsonify({
            "message": "Video session ended successfully",
            "data": {
                "id": session.id,
                "room_id": session.room_id,
                "status": session.status,
                "started_at": session.started_at.isoformat() if session.started_at else None,
                "ended_at": session.ended_at.isoformat() if session.ended_at else None,
                "duration": session.duration,
            }
        }), 200
    except ValidationError as err:
        return jsonify({"errors": err.messages}), 400
    except ValueError as err:
        return jsonify({"message": str(err)}), 404
