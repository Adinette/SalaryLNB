
import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto("http://localhost:5173")
        await page.locator('input[type="text"]').fill("test@test.com")
        await page.locator('input[type="password"]').fill("password")
        await page.get_by_role("button", name="Connexion").click()
        await page.wait_for_timeout(2000)  # Wait for potential navigation
        await page.screenshot(path="jules-scratch/verification/verification.png")
        await browser.close()

asyncio.run(main())
