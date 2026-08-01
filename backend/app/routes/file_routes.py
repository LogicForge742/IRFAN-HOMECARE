from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from marshmallow import ValidationError

from app.extensions import limiter
from app.repositories.file_repository import FileRepository
from app.schemas.file_schema import FileSchema
from app.services.file_service import FileService

file_bp = Blueprint(
    "files",
    __name__,
    url_prefix="/api/files",
)

file_schema = FileSchema()


@file_bp.post("/upload")
@jwt_required()
@limiter.limit("20 per hour")
def upload_file():

    try:

        user_id = get_jwt_identity()

        data = file_schema.load(request.form)

        if "file" not in request.files:
            return jsonify({"message": "No file uploaded."}), 400

        uploaded_file = request.files["file"]

        result = FileService.upload_file(
            user_id=user_id,
            uploaded_file=uploaded_file,
            category=data["category"],
        )

        return (
            jsonify(
                {
                    "message": "File uploaded successfully.",
                    "data": result,
                }
            ),
            201,
        )

    except ValidationError as error:

        return jsonify({"errors": error.messages}), 400


@file_bp.get("/")
@jwt_required()
def get_my_files():

    user_id = get_jwt_identity()

    files = FileRepository.get_by_user(user_id)

    return (
        jsonify(
            {
                "data": [
                    {
                        "id": file.id,
                        "filename": file.original_filename,
                        "category": file.category,
                        "size": file.file_size,
                        "created_at": file.created_at.isoformat(),
                    }
                    for file in files
                ]
            }
        ),
        200,
    )
