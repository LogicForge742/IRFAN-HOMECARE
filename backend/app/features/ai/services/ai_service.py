import os
from app.features.ai.providers.gemini_provider import GeminiProvider
from app.features.ai.providers.openai_provider import OpenAIProvider

class AIService:
    @staticmethod
    def _read_prompt_template(filename):
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        filepath = os.path.join(base_dir, "prompts", filename)
        if os.path.exists(filepath):
            with open(filepath, "r") as f:
                return f.read()
        return ""

    @classmethod
    def _get_ai_completion(cls, prompt):
        if os.getenv("GEMINI_API_KEY"):
            return GeminiProvider.generate_completion(prompt, "You are a professional healthcare assistant.")
        elif os.getenv("OPENAI_API_KEY"):
            return OpenAIProvider.generate_completion(prompt, "You are a professional healthcare assistant.")
        else:
            return f"Mock AI suggestion for: {prompt[:80]}"

    @classmethod
    def generate_consultation_summary(cls, observations, symptoms, diagnosis):
        template = cls._read_prompt_template("summary_prompt.txt") or "Summary for: {observations}, {symptoms}, {diagnosis}"
        prompt = template.format(observations=observations, symptoms=symptoms, diagnosis=diagnosis)
        return cls._get_ai_completion(prompt)

    @classmethod
    def generate_differential_diagnosis(cls, symptoms, diagnosis):
        template = cls._read_prompt_template("consultation_prompt.txt") or "Diff-diagnosis for: {symptoms}, {diagnosis}"
        prompt = template.format(symptoms=symptoms, diagnosis=diagnosis)
        return cls._get_ai_completion(prompt)

    @classmethod
    def generate_followup(cls, diagnosis):
        template = cls._read_prompt_template("followup_prompt.txt") or "Follow-up for: {diagnosis}"
        prompt = template.format(diagnosis=diagnosis)
        return cls._get_ai_completion(prompt)

    @classmethod
    def generate_patient_instructions(cls, diagnosis):
        prompt = f"Write clear, friendly patient home-care instructions for diagnosis: {diagnosis}."
        return cls._get_ai_completion(prompt)
