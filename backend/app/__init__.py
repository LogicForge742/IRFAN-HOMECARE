from flask import Flask
from flask_cors import CORS

from app.config import Config
from app.extensions import (
    bcrypt,
    db,
    jwt,
    migrate,
)


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

    @app.get("/")
    def health_check():
        return {
            "message": "Irfan HomeCare API is running",
            "status": "success",
        }

    return app