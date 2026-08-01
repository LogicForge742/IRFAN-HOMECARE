import os
from uuid import uuid4

from werkzeug.utils import secure_filename

from app.config.security import SecurityConfig
from app.models.file import File
from app.repositories.file_repository import FileRepository


class FileService:

    BASE_UPLOAD_FOLDER = "uploads"

    @staticmethod
    def upload_file(
        *,
        user_id,
        uploaded_file,
        category,
    ):

        filename = secure_filename(uploaded_file.filename)
        if not filename:
            raise ValueError("Invalid filename.")

        ext = os.path.splitext(filename)[1].lstrip(".").lower()
        if ext not in SecurityConfig.ALLOWED_EXTENSIONS:
            raise ValueError(f"File extension '.{ext}' is not permitted.")

        if (
            uploaded_file.mimetype
            and uploaded_file.mimetype not in SecurityConfig.ALLOWED_MIME_TYPES
        ):
            raise ValueError(f"MIME type '{uploaded_file.mimetype}' is not permitted.")

        stored_filename = f"{uuid4()}.{ext}"

        folder = os.path.join(
            FileService.BASE_UPLOAD_FOLDER,
            category,
        )

        os.makedirs(
            folder,
            exist_ok=True,
        )

        storage_path = os.path.join(
            folder,
            stored_filename,
        )

        uploaded_file.save(storage_path)

        file_size = os.path.getsize(storage_path)

        file = File(
            user_id=user_id,
            original_filename=filename,
            stored_filename=stored_filename,
            storage_path=storage_path,
            mime_type=uploaded_file.mimetype or "application/octet-stream",
            file_size=file_size,
            category=category,
        )

        FileRepository.create(file)

        return {
            "id": file.id,
            "filename": file.original_filename,
            "category": file.category,
        }
