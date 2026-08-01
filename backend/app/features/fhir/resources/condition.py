def make_fhir_condition(record):
    return {
        "resourceType": "Condition",
        "id": f"cond_{record.id}",
        "clinicalStatus": {
            "coding": [
                {
                    "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
                    "code": "active"
                }
            ]
        },
        "verificationStatus": {
            "coding": [
                {
                    "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                    "code": "confirmed"
                }
            ]
        },
        "code": {
            "text": getattr(record, "diagnosis", "Unknown Diagnosis")
        },
        "subject": {
            "reference": f"Patient/{record.patient_id}"
        },
        "recordedDate": str(record.created_at) if getattr(record, "created_at", None) else None
    }
