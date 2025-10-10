from playwright.sync_api import Page, expect

def test_users_page_style(page: Page):
    """
    Ce test vérifie que la page des utilisateurs et le layout du tableau de bord
    s'affichent correctement avec les styles Vuetify.
    """
    # 1. Naviguer vers la page des utilisateurs.
    page.goto("http://localhost:5173/users")

    # 2. Attendre que la page se charge complètement.
    # On attend que le titre exact "Utilisateurs" soit visible.
    expect(page.get_by_role("heading", name="Utilisateurs", exact=True)).to_be_visible(timeout=15000)

    # 3. Prendre la capture d'écran finale.
    page.screenshot(path="jules-scratch/verification/final_users_page.png")