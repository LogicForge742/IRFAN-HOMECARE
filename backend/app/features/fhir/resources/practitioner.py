def make_fhir_practitioner(user, professional_meta=None):
    meta = professional_meta or {}
    return {
        "resourceType": "Practitioner",
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
        "qualification": [
            {
                "code": {
                    "text": meta.get("specialty", "General Healthcare Professional")
                }
            }
        ]
    }
