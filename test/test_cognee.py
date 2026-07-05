import asyncio
import cognee

async def main():

    await cognee.remember(
        "MemoryForge is an evolving AI memory system."
    )

    result = await cognee.recall(
        "What is MemoryForge?"
    )

    print(result)

asyncio.run(main())