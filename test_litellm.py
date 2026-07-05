import asyncio
import os
from dotenv import load_dotenv
import litellm

load_dotenv()

async def main():
    response = await litellm.acompletion(
        model="gemini/gemini-2.5-flash",
        api_key=os.getenv("LLM_API_KEY"),
        messages=[{"role": "user", "content": "Say hello"}],
    )
    print(response.choices[0].message.content)

asyncio.run(main())