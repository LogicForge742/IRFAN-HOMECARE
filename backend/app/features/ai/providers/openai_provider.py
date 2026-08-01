import os
import requests

class OpenAIProvider:
    @staticmethod
    def generate_completion(prompt, system_instruction=""):
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            return f"Mock OpenAI Completion for prompt: {prompt[:50]}..."
        
        try:
            res = requests.post(
                "https://api.openai.com/v1/chat/completions",
                headers={"Authorization": f"Bearer {api_key}"},
                json={
                    "model": "gpt-4-turbo",
                    "messages": [
                        {"role": "system", "content": system_instruction},
                        {"role": "user", "content": prompt}
                    ]
                },
                timeout=10
            )
            if res.status_code == 200:
                return res.json()["choices"][0]["message"]["content"]
        except Exception as e:
            print(f"OpenAI Generation Error: {e}")
        return "Failed to generate completion from OpenAI."
