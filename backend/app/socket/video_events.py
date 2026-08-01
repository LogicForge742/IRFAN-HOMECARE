import logging
from flask import request
from flask_socketio import emit, join_room, leave_room
from app.socket.socketio import socketio

logger = logging.getLogger(__name__)

@socketio.on("join_room")
def handle_join_room(data):
    room_id = data.get("room_id")
    if not room_id:
        logger.warning("join_room received without room_id")
        return

    room_name = f"video_{room_id}"
    join_room(room_name)
    logger.info(f"Socket {request.sid} joined video room {room_name}")

    # Notify other users in the room that a new peer has joined
    emit("peer_joined", {"sid": request.sid}, room=room_name, include_self=False)

@socketio.on("leave_room")
def handle_leave_room(data):
    room_id = data.get("room_id")
    if not room_id:
        return

    room_name = f"video_{room_id}"
    leave_room(room_name)
    logger.info(f"Socket {request.sid} left video room {room_name}")

    emit("peer_left", {"sid": request.sid}, room=room_name, include_self=False)

@socketio.on("offer")
def handle_offer(data):
    room_id = data.get("room_id")
    sdp = data.get("sdp")
    target_sid = data.get("target_sid")

    if not room_id or not sdp or not target_sid:
        return

    logger.debug(f"Relaying offer from {request.sid} to {target_sid}")
    emit("offer", {
        "sdp": sdp,
        "sender_sid": request.sid
    }, room=target_sid)

@socketio.on("answer")
def handle_answer(data):
    room_id = data.get("room_id")
    sdp = data.get("sdp")
    target_sid = data.get("target_sid")

    if not room_id or not sdp or not target_sid:
        return

    logger.debug(f"Relaying answer from {request.sid} to {target_sid}")
    emit("answer", {
        "sdp": sdp,
        "sender_sid": request.sid
    }, room=target_sid)

@socketio.on("ice_candidate")
def handle_ice_candidate(data):
    room_id = data.get("room_id")
    candidate = data.get("candidate")
    target_sid = data.get("target_sid")

    if not room_id or not candidate or not target_sid:
        return

    logger.debug(f"Relaying ICE candidate from {request.sid} to {target_sid}")
    emit("ice_candidate", {
        "candidate": candidate,
        "sender_sid": request.sid
    }, room=target_sid)

@socketio.on("end_call")
def handle_end_call(data):
    room_id = data.get("room_id")
    if not room_id:
        return

    room_name = f"video_{room_id}"
    logger.info(f"Call ended in room {room_name} by {request.sid}")
    emit("call_ended", {"sender_sid": request.sid}, room=room_name)
