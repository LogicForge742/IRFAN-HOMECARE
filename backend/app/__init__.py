import os

from flasgger import Swagger
from flask import Flask
from flask_cors import CORS

from app.config import Config
from app.config.email import EmailConfig
from app.config.security import SecurityConfig
from app.config.swagger import swagger_config, swagger_template
from app.errors import register_error_handlers
from app.extensions import bcrypt, db, jwt, limiter, mail, migrate, talisman
from app.routes import (
    appointment_bp,
    auth_bp,
    availability_bp,
    dashboard_bp,
    file_bp,
    medical_record_bp,
    notification_bp,
    patient_bp,
    payment_bp,
    professional_bp,
    receipt_bp,
    scheduling_bp,
)


def create_app() -> Flask:

    app = Flask(__name__)

    app.config.from_object(Config)
    app.config.from_object(EmailConfig)
    app.config.from_object(SecurityConfig)

    CORS(
        app,
        origins=["http://localhost:5173"],
        supports_credentials=True,
    )

    db.init_app(app)
    jwt.init_app(app)
    bcrypt.init_app(app)
    migrate.init_app(app, db)
    mail.init_app(app)
    limiter.init_app(app)
    if app.config.get("TESTING") or os.getenv("TESTING") == "True":
        limiter.enabled = False
    talisman.init_app(
        app,
        content_security_policy=None,
        force_https=False,
    )

    Swagger(
        app,
        config=swagger_config,
        template=swagger_template,
    )

    app.register_blueprint(auth_bp)
    app.register_blueprint(patient_bp)
    app.register_blueprint(professional_bp)
    app.register_blueprint(appointment_bp)
    app.register_blueprint(availability_bp)
    app.register_blueprint(scheduling_bp)
    app.register_blueprint(dashboard_bp)
    app.register_blueprint(medical_record_bp)
    app.register_blueprint(notification_bp)
    app.register_blueprint(file_bp)
    app.register_blueprint(payment_bp)
    app.register_blueprint(receipt_bp)

    register_error_handlers(app)

    @app.get("/")
    def health_check():
        return {
            "message": "Irfan HomeCare API is running",
            "status": "success",
        }

    return app
