import os
import requests
from dotenv import load_dotenv

load_dotenv()

url = os.getenv("COGNEE_BASE_URL") + "/api/v1/remember/entry"

headers = {
    "X-Api-Key": os.getenv("COGNEE_API_KEY"),
    "Content-Type": "application/json",
    "Accept": "application/json",
}

payload = {
    "entry": {
        "type": "qa",
        "question": "Test",
        "answer": "Test",
        "context": "Test"
    },
    "dataset_name": "memoryforge",
    "session_id": "memoryforge-session"
}

print("URL:", url)

r = requests.post(url, headers=headers, json=payload)

print("Status:", r.status_code)
print("Body:", r.text)