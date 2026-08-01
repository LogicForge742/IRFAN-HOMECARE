import os
import requests

class GeminiProvider:
    @staticmethod
    def generate_completion(prompt, system_instruction=""):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            return f"Mock Gemini Completion for prompt: {prompt[:50]}..."
        
        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={api_key}"
            res = requests.post(
                url,
                json={
                    "contents": [{
                        "parts": [{
                            "text": f"{system_instruction}\n\nUser: {prompt}"
                        }]
                    }]
                },
                timeout=10
            )
            if res.status_code == 200:
                return res.json()["candidates"][0]["content"]["parts"][0]["text"]
        except Exception as e:
            print(f"Gemini Generation Error: {e}")
        return "Failed to generate completion from Gemini."
