const { test, expect } = require("@playwright/test");

test("login com sucesso redireciona para dashboard", async ({ page }) => {
  await page.goto("http://localhost:3000/login.html");
  await page.fill("#email", "usuario@teste.com");
  await page.fill("#senha", "123456");
  await page.click('button[type="submit"]');

  await expect(page.locator("h1")).toHaveText("Bem-vindo ao dashboard");
});

test("login com erro de credenciais", async ({ page }) => {
  await page.goto("http://localhost:3000/login");

  await page.fill("#email", "email@invalido.com");
  await page.fill("#senha", "senhaerrada");

  await page.click('button[type="submit"]');

  await expect(page).toHaveURL(/\/login\?erro=1/);

  const erroMsg = page.locator(".erro");
  await expect(erroMsg).toBeVisible();
  await expect(erroMsg).toHaveText("E-mail ou senha inválidos");
});
