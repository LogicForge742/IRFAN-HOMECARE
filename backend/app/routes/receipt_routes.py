import os

from flask import Blueprint, jsonify, send_file
from flask_jwt_extended import get_jwt_identity, jwt_required

from app.repositories.payment_repository import PaymentRepository
from app.services.receipt_service import ReceiptService

receipt_bp = Blueprint(
    "receipts",
    __name__,
    url_prefix="/api/receipts",
)


@receipt_bp.get("/<payment_id>")
@jwt_required()
def get_receipt(payment_id):
    try:
        user_id = get_jwt_identity()

        payment = PaymentRepository.get_by_id(payment_id)

        if not payment:
            return jsonify({"message": "Payment not found."}), 404

        if payment.user_id != user_id:
            return jsonify({"message": "Unauthorized access to this receipt."}), 403

        output_path = ReceiptService.generate_receipt_for_payment(payment_id)
        abs_path = os.path.abspath(output_path)

        return send_file(
            abs_path,
            mimetype="application/pdf",
            as_attachment=True,
            download_name=os.path.basename(output_path),
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
