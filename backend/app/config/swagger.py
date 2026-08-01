swagger_config = {
    "headers": [],
    "specs": [
        {
            "endpoint": "apispec",
            "route": "/apispec.json",
            "rule_filter": lambda rule: True,
            "model_filter": lambda tag: True,
        }
    ],
    "swagger_ui": True,
    "specs_route": "/docs/",
}

swagger_template = {
    "swagger": "2.0",
    "info": {
        "title": "Irfan HomeCare API",
        "description": "Healthcare Platform REST API",
        "version": "1.0.0",
    },
    "securityDefinitions": {
        "Bearer": {
            "type": "apiKey",
            "name": "Authorization",
            "in": "header",
            "description": (
                "JWT Authorization header using the Bearer scheme. "
                'Example: "Authorization: Bearer {token}"'
            ),
        }
    },
}
