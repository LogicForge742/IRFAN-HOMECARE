import base64
import os
from datetime import datetime, timedelta

from app.config.payments import MPESA_BASE_URL
from app.integrations.mpesa_client import MpesaClient


class MpesaService:

    _access_token = None
    _expires_at = None

    @classmethod
    def get_access_token(cls):
        """
        Retrieves and caches the Daraja OAuth access token.
        """

        if (
            cls._access_token
            and cls._expires_at
            and datetime.utcnow() < cls._expires_at
        ):
            return cls._access_token

        consumer_key = os.getenv("MPESA_CONSUMER_KEY")

        consumer_secret = os.getenv("MPESA_CONSUMER_SECRET")

        credentials = f"{consumer_key}:{consumer_secret}"

        encoded = base64.b64encode(credentials.encode()).decode()

        headers = {"Authorization": (f"Basic {encoded}")}

        response = MpesaClient.get(
            url=(f"{MPESA_BASE_URL}" "/oauth/v1/generate"),
            headers=headers,
            params={"grant_type": "client_credentials"},
        )

        cls._access_token = response["access_token"]

        expires = int(
            response.get(
                "expires_in",
                3599,
            )
        )

        cls._expires_at = datetime.utcnow() + timedelta(seconds=expires)

        return cls._access_token

    @classmethod
    def initiate_stk_push(
        cls,
        *,
        phone_number,
        amount,
        account_reference,
        transaction_desc="Payment for Appointment",
    ):
        """
        Initiates an M-Pesa STK Push (Lipa Na M-Pesa Online) request.
        """
        access_token = cls.get_access_token()
        shortcode = os.getenv("MPESA_SHORTCODE")
        passkey = os.getenv("MPESA_PASSKEY")
        callback_url = os.getenv("MPESA_CALLBACK_URL")

        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        data_to_encode = f"{shortcode}{passkey}{timestamp}"
        password = base64.b64encode(data_to_encode.encode()).decode("utf-8")

        headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json",
        }

        payload = {
            "BusinessShortCode": shortcode,
            "Password": password,
            "Timestamp": timestamp,
            "TransactionType": "CustomerPayBillOnline",
            "Amount": int(amount),
            "PartyA": phone_number,
            "PartyB": shortcode,
            "PhoneNumber": phone_number,
            "CallBackURL": callback_url,
            "AccountReference": account_reference,
            "TransactionDesc": transaction_desc,
        }

        return MpesaClient.post(
            url=f"{MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest",
            headers=headers,
            json=payload,
        )

    @classmethod
    def process_callback(cls, callback_data):
        """
        Parse the Daraja callback and return a normalized dictionary.
        """
        stk_callback = (
            callback_data.get("Body", {}).get("stkCallback", {})
            if isinstance(callback_data, dict)
            else {}
        )
        merchant_request_id = stk_callback.get("MerchantRequestID")
        checkout_request_id = stk_callback.get("CheckoutRequestID")
        result_code = stk_callback.get("ResultCode")
        result_desc = stk_callback.get("ResultDesc")

        metadata_items = stk_callback.get("CallbackMetadata", {}).get("Item", [])
        metadata = {}
        for item in metadata_items:
            name = item.get("Name")
            value = item.get("Value")
            if name:
                metadata[name] = value

        return {
            "checkout_request_id": checkout_request_id,
            "merchant_request_id": merchant_request_id,
            "result_code": result_code,
            "result_desc": result_desc,
            "receipt_number": metadata.get("MpesaReceiptNumber"),
            "amount": metadata.get("Amount"),
            "phone_number": metadata.get("PhoneNumber"),
            "transaction_date": metadata.get("TransactionDate"),
            "raw_payload": callback_data,
        }
