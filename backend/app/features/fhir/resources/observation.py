def make_fhir_observation(record):
    return {
        "resourceType": "Observation",
        "id": str(record.id),
        "status": "final",
        "code": {
            "coding": [
                {
                    "system": "http://loinc.org",
                    "code": "88716-6",
                    "display": "Clinical observations document"
                }
            ],
            "text": "Clinical observations notes"
        },
        "subject": {
            "reference": f"Patient/{record.patient_id}"
        },
        "effectiveDateTime": str(record.created_at) if getattr(record, "created_at", None) else None,
        "valueString": getattr(record, "notes", "")
    }
