import json

from openai import OpenAI

from app.core.config import settings
from app.prompts.review_prompt import SYSTEM_PROMPT


class ReviewService:
    def __init__(self):
        self.client = OpenAI(
            api_key=settings.OPENROUTER_API_KEY,
            base_url="https://openrouter.ai/api/v1",
        )

    def review_code(self, code: str, language: str):
        response = self.client.chat.completions.create(
            model=settings.OPENROUTER_MODEL,
            messages=[
                {
                    "role": "system",
                    "content": SYSTEM_PROMPT,
                },
                {
                    "role": "user",
                    "content": f"Language: {language}\n\nCode:\n{code}",
                },
            ],
            temperature=0.2,
            max_tokens=1200,
        )

        content = response.choices[0].message.content

        if content is None:
            return {
                "overall_score": 0,
                "summary": "AI returned an empty response.",
                "strengths": [],
                "issues": [
                    {
                        "severity": "Critical",
                        "description": "No response received from the AI model.",
                    }
                ],
                "big_o": {
                    "time_complexity": "Unknown",
                    "space_complexity": "Unknown",
                    "explanation": "No complexity analysis available.",
                },
                "potential_bugs": [],
                "improved_code": "",
            }

        try:
            data = json.loads(content)

            # ---------- Fallbacks ----------

            data.setdefault("overall_score", 0)
            data.setdefault("summary", "")
            data.setdefault("strengths", [])
            data.setdefault("issues", [])
            data.setdefault("potential_bugs", [])
            data.setdefault("improved_code", "")

            data.setdefault(
                "big_o",
                {
                    "time_complexity": "Unknown",
                    "space_complexity": "Unknown",
                    "explanation": "No complexity analysis available.",
                },
            )

            return data

        except json.JSONDecodeError:
            return {
                "overall_score": 0,
                "summary": "The AI did not return valid JSON.",
                "strengths": [],
                "issues": [
                    {
                        "severity": "High",
                        "description": "Invalid JSON response received from the AI model.",
                    }
                ],
                "big_o": {
                    "time_complexity": "Unknown",
                    "space_complexity": "Unknown",
                    "explanation": "Unable to analyze complexity because the AI response was invalid.",
                },
                "potential_bugs": [],
                "improved_code": content,
            }


review_service = ReviewService()