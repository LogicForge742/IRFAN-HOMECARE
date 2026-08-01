from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from marshmallow import ValidationError

from app.extensions import limiter
from app.schemas.payment_schema import PaymentSchema
from app.services.payment_service import PaymentService

payment_bp = Blueprint(
    "payments",
    __name__,
    url_prefix="/api/payments",
)

payment_schema = PaymentSchema()


@payment_bp.post("/stk-push")
@jwt_required()
@limiter.limit("10 per hour")
def initiate_stk_push():

    try:
        user_id = get_jwt_identity()

        data = payment_schema.load(request.json)

        result = PaymentService.initiate_payment(
            user_id=user_id,
            appointment_id=data["appointment_id"],
            amount=data["amount"],
            provider=data["provider"],
            phone_number=request.json["phone_number"],
        )

        return (
            jsonify(
                {
                    "message": "STK Push initiated successfully.",
                    "data": result,
                }
            ),
            200,
        )

    except ValidationError as error:
        return (
            jsonify(
                {
                    "errors": error.messages,
                }
            ),
            400,
        )

    except ValueError as error:
        return (
            jsonify(
                {
                    "message": str(error),
                }
            ),
            400,
        )


@payment_bp.post("/mpesa/callback")
def mpesa_callback():
    payload = request.get_json()

    PaymentService.process_mpesa_callback(payload)

    return (
        jsonify(
            {
                "ResultCode": 0,
                "ResultDesc": "Accepted",
            }
        ),
        200,
    )
