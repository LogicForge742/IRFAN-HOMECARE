class SecurityConfig:
    DEFAULT_RATE_LIMITS = ["200 per hour", "50 per minute"]
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16 MB max payload
    ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "doc", "docx"}
    ALLOWED_MIME_TYPES = {
        "application/pdf",
        "image/png",
        "image/jpeg",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    }
