from flask import Flask
from flask_cors import CORS

from app.config import Config
from app.extensions import (
    bcrypt,
    db,
    jwt,
    migrate,
)

from app.models import User

from app.routes import (
    auth_bp,
    patient_bp,
    professional_bp,
    appointment_bp,
    availability_bp,
    scheduling_bp,
    dashboard_bp,
)

from app.errors import register_error_handlers

def create_app() -> Flask:

    app = Flask(__name__)

    app.config.from_object(Config)

    CORS(
        app,
        origins=["http://localhost:5173"],
        supports_credentials=True,
    )

    db.init_app(app)
    jwt.init_app(app)
    bcrypt.init_app(app)
    migrate.init_app(app, db)

    app.register_blueprint(auth_bp)
    app.register_blueprint(patient_bp)
    app.register_blueprint(professional_bp)
    app.register_blueprint(appointment_bp)
    app.register_blueprint(availability_bp)
    app.register_blueprint(scheduling_bp)
    app.register_blueprint(dashboard_bp)

    register_error_handlers(app)

    @app.get("/")
    def health_check():
        return {
            "message": "Irfan HomeCare API is running",
            "status": "success",
        }

    return app