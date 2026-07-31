from flask import jsonify
from marshmallow import ValidationError

from app.exceptions.exceptions import AppException


def register_error_handlers(app):

    @app.errorhandler(AppException)
    def handle_app_exception(error):
        return jsonify({
            "message": error.message
        }), error.status_code

    @app.errorhandler(ValidationError)
    def handle_validation_error(error):
        return jsonify({
            "errors": error.messages
        }), 400

    @app.errorhandler(Exception)
    def handle_unexpected_error(error):
        app.logger.exception(error)

        return jsonify({
            "message": "An unexpected error occurred."
        }), 500