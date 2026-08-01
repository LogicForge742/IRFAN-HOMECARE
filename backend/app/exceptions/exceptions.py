class AppException(Exception):
    status_code = 500

    def __init__(self, message):
        self.message = message
        super().__init__(message)


class BadRequestException(AppException):
    status_code = 400


class UnauthorizedException(AppException):
    status_code = 401


class ForbiddenException(AppException):
    status_code = 403


class NotFoundException(AppException):
    status_code = 404


class ConflictException(AppException):
    status_code = 409
