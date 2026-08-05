from flask import jsonify
from marshmallow import ValidationError

from app.exceptions.exceptions import AppException


def register_error_handlers(app):

    @app.errorhandler(AppException)
    def handle_app_exception(error):
        return jsonify({"message": error.message}), error.status_code

    @app.errorhandler(ValidationError)
    def handle_validation_error(error):
        return jsonify({"errors": error.messages}), 400

    @app.errorhandler(429)
    def handle_rate_limit(error):
        return jsonify({
            "message": "Too many requests. Please wait a moment before trying again.",
            "error": "rate_limit_exceeded",
        }), 429

    @app.errorhandler(405)
    def handle_method_not_allowed(error):
        return jsonify({"message": "Method not allowed."}), 405

    @app.errorhandler(404)
    def handle_not_found(error):
        return jsonify({"message": "Resource not found."}), 404

    @app.errorhandler(Exception)
    def handle_unexpected_error(error):
        # Let werkzeug HTTP exceptions pass through with their own status codes
        from werkzeug.exceptions import HTTPException
        if isinstance(error, HTTPException):
            return jsonify({"message": error.description}), error.code

        app.logger.exception(error)
        return jsonify({"message": "An unexpected error occurred."}), 500
