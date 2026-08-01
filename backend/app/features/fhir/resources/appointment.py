def make_fhir_appointment(appointment):
    return {
        "resourceType": "Appointment",
        "id": str(appointment.id),
        "status": getattr(appointment, "status", "booked"),
        "description": "Irfan HomeCare Consultation",
        "start": str(appointment.start_time) if getattr(appointment, "start_time", None) else None,
        "end": str(appointment.end_time) if getattr(appointment, "end_time", None) else None,
        "created": str(appointment.created_at) if getattr(appointment, "created_at", None) else None,
        "participant": [
            {
                "actor": {
                    "reference": f"Patient/{appointment.patient_id}"
                },
                "status": "accepted"
            },
            {
                "actor": {
                    "reference": f"Practitioner/{appointment.professional_id}"
                },
                "status": "accepted"
            }
        ]
    }
