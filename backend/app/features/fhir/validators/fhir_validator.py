class FHIRValidator:
    @staticmethod
    def validate_resource(resource):
        if not isinstance(resource, dict):
            return False, ["Resource must be a JSON object"]
        
        resource_type = resource.get("resourceType")
        if not resource_type:
            return False, ["Missing 'resourceType' property"]
        
        allowed_types = {"Patient", "Practitioner", "Appointment", "Observation", "MedicationRequest", "Condition"}
        if resource_type not in allowed_types:
            return False, [f"Unsupported resourceType '{resource_type}'. Supported: {list(allowed_types)}"]
        
        errors = []
        if not resource.get("id"):
            errors.append("Missing resource 'id'")
            
        if resource_type == "Patient":
            if not resource.get("name") or not isinstance(resource.get("name"), list):
                errors.append("Patient resource must contain a 'name' list")
        elif resource_type == "Appointment":
            if not resource.get("participant") or not isinstance(resource.get("participant"), list):
                errors.append("Appointment resource must contain a 'participant' list")

        if errors:
            return False, errors
        return True, []
