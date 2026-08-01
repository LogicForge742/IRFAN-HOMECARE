import os

from reportlab.pdfgen import canvas


class PDFGenerator:

    @staticmethod
    def generate_receipt(
        output_path,
        receipt_data,
    ):

        os.makedirs(
            os.path.dirname(output_path),
            exist_ok=True,
        )

        pdf = canvas.Canvas(output_path)

        y = 800

        pdf.setFont(
            "Helvetica-Bold",
            18,
        )

        pdf.drawString(
            50,
            y,
            "Irfan HomeCare",
        )

        y -= 40

        pdf.setFont(
            "Helvetica",
            12,
        )

        fields = [
            ("Receipt Reference", receipt_data["reference"]),
            ("Payment Status", receipt_data["status"]),
            ("Amount", f"KES {receipt_data['amount']}"),
            ("Patient", receipt_data["patient"]),
            ("Professional", receipt_data["professional"]),
            ("Appointment Date", receipt_data["appointment_date"]),
            ("Payment Date", receipt_data["payment_date"]),
            ("Provider", receipt_data["provider"]),
            ("Transaction ID", receipt_data["transaction_id"]),
        ]

        for label, value in fields:

            pdf.drawString(
                50,
                y,
                f"{label}: {value}",
            )

            y -= 25

        pdf.save()

        return output_path
