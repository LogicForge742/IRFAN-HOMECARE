def make_fhir_patient(user):
    return {
        "resourceType": "Patient",
        "id": str(user.id),
        "active": True,
        "name": [
            {
                "use": "official",
                "text": user.name,
                "family": user.name.split()[-1] if " " in user.name else user.name,
                "given": user.name.split()[:-1] if " " in user.name else [user.name]
            }
        ],
        "telecom": [
            {
                "system": "phone",
                "value": getattr(user, "phone", "")
            },
            {
                "system": "email",
                "value": user.email
            }
        ],
        "gender": getattr(user, "gender", "unknown"),
        "birthDate": str(getattr(user, "birth_date", "")) if getattr(user, "birth_date", None) else None
    }
