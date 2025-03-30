import { test } from '@playwright/test';

test.beforeEach('login', async ({ page }) => {
  await page.goto('https://evolved-elk-68.accounts.dev/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2F');
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('jpino@ayesa.com');
  await page.getByRole('textbox', { name: 'Email address' }).press('Enter');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('cacaculocodopis1234@@$$');
  await page.getByRole('button', { name: 'Continue' }).click();
});

test('Crear caso', async ({ page }) => {
  await page.getByRole('link', { name: 'Test cases' }).click();
  await page.getByRole('link', { name: 'Nuevo test' }).click();
  await page.getByRole('combobox', { name: 'Cicle:' }).click();
  await page.getByRole('option', { name: 'Primera semana de marzo' }).click();
  await page.getByRole('combobox', { name: 'User story:' }).click();
  await page.getByRole('option', { name: 'Tramitación de organizaciones' }).click();
  await page.getByRole('combobox', { name: 'Asigned to:' }).click();
  await page.getByRole('option', { name: 'José Pino' }).click();
  await page.getByRole('combobox', { name: 'Environment where it\' ll be' }).click();
  await page.getByRole('option', { name: 'localhost' }).click();
  await page.getByRole('textbox', { name: 'Título del caso' }).click();
  await page.getByRole('textbox', { name: 'Título del caso' }).fill('CASO DE PRUEBA 2');
  await page.getByRole('textbox', { name: 'Título del caso' }).press('Tab');
  await page.getByRole('combobox', { name: 'Estado del test' }).press('Enter');
  await page.getByRole('option', { name: 'pendiente' }).click();
  await page.getByRole('textbox', { name: 'Precondiciones' }).click();
  await page.getByRole('textbox', { name: 'Precondiciones' }).fill('PRECONDICIONES TEST CASO DE PRUEBA 1');
  await page.getByRole('textbox', { name: 'Precondiciones' }).press('Tab');
  await page.getByRole('textbox', { name: 'Add a step description' }).click();
  await page.getByRole('textbox', { name: 'Add a step description' }).fill('PASO DEL CASO 1');
  await page.getByRole('textbox', { name: 'Add a step description' }).press('Tab');
  await page.getByRole('textbox', { name: 'Add a expected result' }).fill('RESULTADO DEL CASO 1');
  await page.getByRole('button', { name: 'Guardar' }).click();
})

test('Crear entorno desde modal', async ({ page }) => {
  await page.getByRole('link', { name: 'Listado de test' }).click();
  await page.getByRole('button', { name: 'Nuevo entorno' }).click();
  await page.getByRole('textbox', { name: 'Nombre del entorno' }).fill('Entorno local 2');
  await page.getByRole('textbox', { name: 'Nombre del entorno' }).press('Tab');
  await page.getByRole('textbox', { name: 'Dirección URL' }).fill('localhost');
  await page.getByRole('button', { name: 'Guardar' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
})

test('Crear épica desde modal', async ({ page }) => {
  await page.getByRole('button', { name: 'Nueva épica' }).click();
  await page.getByRole('textbox', { name: 'Título de la épica de usuario' }).click();
  await page.getByRole('textbox', { name: 'Título de la épica de usuario' }).press('Dead');
  await page.getByRole('textbox', { name: 'Descripción' }).click();
  await page.getByRole('textbox', { name: 'Descripción' }).fill('Descripci');
  await page.getByText('Título de la épica de usuarioNombre descriptivo de la épica de usuarioDescripci').click();
  await page.getByRole('button', { name: 'Guardar' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
})

test('Crear historia de usuario desde modal', async ({ page }) => {
  await page.getByRole('combobox', { name: 'User epic' }).click();
  await page.getByText('No user epic found.').click();
  await page.getByRole('textbox', { name: 'User story title' }).click();
  await page.getByRole('textbox', { name: 'User story title' }).fill('ddd');
  await page.getByRole('textbox', { name: 'Description' }).click();
  await page.getByRole('textbox', { name: 'Description' }).fill('ddd');
  await page.getByRole('button', { name: 'Guardar' }).click();
})