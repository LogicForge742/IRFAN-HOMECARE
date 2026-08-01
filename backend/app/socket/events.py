import logging
from flask import request
from flask_jwt_extended import decode_token
from flask_socketio import ConnectionRefusedError, join_room
from app.socket.socketio import socketio

logger = logging.getLogger(__name__)

@socketio.on("connect")
def handle_connect(auth=None):
    """
    Handle connection event, authentication using JWT from auth payload or query parameters,
    and associate the socket session with a user-specific room.
    """
    token = None
    if auth and isinstance(auth, dict):
        token = auth.get("token")
    
    if not token:
        # Fallback to query arguments
        token = request.args.get("token")

    if not token:
        logger.warning("WebSocket connection rejected: token missing.")
        raise ConnectionRefusedError("Token missing")

    try:
        # Decode the JWT token to extract the user's identity
        decoded_token = decode_token(token)
        user_id = decoded_token.get("sub")
        
        if not user_id:
            raise ValueError("Token sub claim missing")

        # Place connection in user-specific room
        user_room = f"user_{user_id}"
        join_room(user_room)
        logger.info(f"WebSocket client connected. User: {user_id}, Room: {user_room}")
        
    except Exception as e:
        logger.error(f"WebSocket connection unauthorized: {str(e)}")
        raise ConnectionRefusedError("Unauthorized")

@socketio.on("disconnect")
def handle_disconnect():
    """
    Handle disconnection event.
    """
    logger.info("WebSocket client disconnected")


# Import signaling events to register their event handlers
from app.socket import video_events

