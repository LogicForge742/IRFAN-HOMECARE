def make_fhir_medication_request(prescription):
    return {
        "resourceType": "MedicationRequest",
        "id": str(prescription.id),
        "status": "active",
        "intent": "order",
        "medicationCodeableConcept": {
            "text": getattr(prescription, "medication_name", "Unknown Medication")
        },
        "subject": {
            "reference": f"Patient/{prescription.patient_id}"
        },
        "dosageInstruction": [
            {
                "text": f"Dosage: {getattr(prescription, 'dosage', '')}, Frequency: {getattr(prescription, 'frequency', '')}, Duration: {getattr(prescription, 'duration', '')}"
            }
        ]
    }
