import os

import sentry_sdk
from flasgger import Swagger
from flask import Flask
from flask_cors import CORS
from sentry_sdk.integrations.flask import FlaskIntegration

from app.config import Config
from app.config.email import EmailConfig
from app.config.security import SecurityConfig
from app.config.swagger import swagger_config, swagger_template
from app.core.logging import setup_logging
from app.errors import register_error_handlers
from app.extensions import bcrypt, db, jwt, limiter, mail, migrate, talisman
from app.middleware.request_logger import init_request_logger
from app.middleware.tenant_context import init_tenant_context
from app.routes import (
    appointment_bp,
    auth_bp,
    availability_bp,
    dashboard_bp,
    file_bp,
    medical_record_bp,
    notification_bp,
    organization_bp,
    patient_bp,
    payment_bp,
    professional_bp,
    receipt_bp,
    scheduling_bp,
    tenant_bp,
    scheduler_bp,
    video_bp,
)

from app.routes.health_routes import health_bp


def create_app() -> Flask:

    sentry_dsn = os.getenv("SENTRY_DSN")
    if sentry_dsn:
        sentry_sdk.init(
            dsn=sentry_dsn,
            integrations=[FlaskIntegration()],
            traces_sample_rate=1.0,
            profiles_sample_rate=1.0,
        )

    app = Flask(__name__)

    setup_logging(app)
    init_request_logger(app)
    init_tenant_context(app)

    app.config.from_object(Config)
    app.config.from_object(EmailConfig)
    app.config.from_object(SecurityConfig)


    db.init_app(app)
    jwt.init_app(app)
    bcrypt.init_app(app)
    migrate.init_app(app, db)
    mail.init_app(app)
    limiter.init_app(app)

    # Initialize Socket.IO
    from app.socket.socketio import socketio
    from app.socket import events as _events  # Ensure event handlers are registered
    socketio.init_app(app)

    if app.config.get("TESTING") or os.getenv("TESTING") == "True":
        limiter.enabled = False
    else:
        from app.startup.environment_validator import validate_env_vars
        from app.startup.system_checks import run_system_checks
        from app.startup.startup_report import generate_startup_report
        validate_env_vars()
        run_system_checks()
        generate_startup_report()

    talisman.init_app(
        app,
        content_security_policy=None,
        force_https=False,
        strict_transport_security=False,
        frame_options="SAMEORIGIN",
    )

    CORS(
        app,
        origins=["http://localhost:5173", "http://localhost:3000"],
        supports_credentials=True,
        allow_headers=["Content-Type", "Authorization", "X-Tenant-ID", "X-Tenant-Slug"],
        methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        expose_headers=["Content-Type", "Authorization"],
    )

    Swagger(
        app,
        config=swagger_config,
        template=swagger_template,
    )

    app.register_blueprint(health_bp)
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
    app.register_blueprint(video_bp)
    app.register_blueprint(organization_bp)
    app.register_blueprint(tenant_bp)
    app.register_blueprint(scheduler_bp)



    from app.features.analytics.routes.analytics_routes import analytics_bp
    app.register_blueprint(analytics_bp)
    from app.features.audit.routes.audit_routes import audit_bp
    app.register_blueprint(audit_bp, url_prefix="/api/audit")
    from app.features.ai.routes.ai_routes import ai_bp
    app.register_blueprint(ai_bp, url_prefix="/api/ai")
    from app.features.rag.routes.rag_routes import rag_bp
    app.register_blueprint(rag_bp, url_prefix="/api/rag")
    from app.features.fhir.routes.fhir_routes import fhir_bp
    app.register_blueprint(fhir_bp, url_prefix="/api/fhir")
    from app.features.sso.routes.sso_routes import sso_bp
    app.register_blueprint(sso_bp, url_prefix="/api/sso")

    register_error_handlers(app)

    @app.get("/")
    def root_health():
        return {
            "message": "Irfan HomeCare API is running",
            "status": "success",
        }

    return app
