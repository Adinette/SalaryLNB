from playwright.sync_api import Page, expect

def test_final_login_page_style(page: Page):
    """
    Ce test final vérifie que la page de connexion s'affiche correctement
    avec les styles Vuetify, après avoir résolu le conflit avec Tailwind.
    """
    # 1. Naviguer vers la page de connexion.
    page.goto("http://localhost:5173/authentication/login")

    # 2. Attendre que la page se charge complètement.
    # On attend que le titre "Connecter vous" soit visible.
    expect(page.get_by_role("heading", name="Connecter vous")).to_be_visible(timeout=15000)

    # 3. Prendre la capture d'écran finale.
    page.screenshot(path="jules-scratch/verification/final_solution.png")