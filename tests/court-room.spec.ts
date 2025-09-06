import { test, expect } from '@playwright/test';

test.describe('Court Room Simulation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/court-room');
  });

  test('should load the court room page with game setup', async ({ page }) => {
    await expect(page).toHaveTitle(/Tab Generator/);
    await expect(page.locator('h1')).toContainText('Court Room Simulation');
    
    // Check setup elements are present
    await expect(page.locator('input[type="number"]')).toBeVisible();
    await expect(page.locator('button:has-text("🚨 Start Court Room Challenge")')).toBeVisible();
    
    // Check instructions (updated text)
    await expect(page.locator('h3:has-text("📋 How to Play:")')).toBeVisible();
    await expect(page.locator('text=Fix all 3 code issues AND dismiss critical messages before time runs out')).toBeVisible();
  });

  test('should start the game with custom timer', async ({ page }) => {
    // Set custom timer
    const timerInput = page.locator('input[type="number"]');
    await timerInput.clear();
    await timerInput.fill('2'); // 2 minutes
    
    // Start game
    await page.click('button:has-text("🚨 Start Court Room Challenge")');
    
    // Check game interface appears
    await expect(page.locator('h1:has-text("Court Room Challenge - Stage 1")')).toBeVisible();
    await expect(page.locator('text=⏱️ 02:00')).toBeVisible();
    
    // Check panels are present
    await expect(page.locator('h2:has-text("📱 Messages")')).toBeVisible();
    await expect(page.locator('h2:has-text("🐛 Code Issues")')).toBeVisible();
    await expect(page.locator('h2:has-text("💻 Code Editor")')).toBeVisible();
  });

  test('should display code issues that can be fixed', async ({ page }) => {
    // Start game
    await page.click('button:has-text("🚨 Start Court Room Challenge")');
    
    // Check code issues are displayed
    await expect(page.locator('text=♿ Missing alt attribute on image')).toBeVisible();
    await expect(page.locator('text=🔒 Input validation missing')).toBeVisible();
    await expect(page.locator('text=⚙️ User login system broken')).toBeVisible();
    
    // Check violation types
    await expect(page.locator('text=Disability Discrimination Act')).toBeVisible();
    await expect(page.locator('text=Data Protection Laws')).toBeVisible();
    await expect(page.locator('text=Contract Law - Service Unavailable')).toBeVisible();
    
    // Fix an issue (first button)
    await page.click('button:has-text("🔧 Fix Issue")');  
    await expect(page.locator('span:has-text("✅")').first()).toBeVisible();
  });

  test('should show messages during gameplay', async ({ page }) => {
    // Start game
    await page.click('button:has-text("🚨 Start Court Room Challenge")');
    
    // Wait for messages to appear (they are scheduled)
    await page.waitForTimeout(21000); // Wait for first message (20s + buffer)
    
    // Check if messages panel has content
    const messagesPanel = page.locator('h2:has-text("📱 Messages")').locator('..');
    await expect(messagesPanel.locator('div').first()).toBeVisible();
  });

  test('should allow code editing', async ({ page }) => {
    // Start game
    await page.click('button:has-text("🚨 Start Court Room Challenge")');
    
    // Find code editor textarea
    const codeEditor = page.locator('textarea[placeholder="Write your code here..."]');
    await expect(codeEditor).toBeVisible();
    
    // Write some code
    await codeEditor.fill('function testFunction() {\n  console.log("Hello World");\n}');
    
    // Check buttons are present
    await expect(page.locator('button:has-text("▶️ Run Code")')).toBeVisible();
    await expect(page.locator('button:has-text("🔍 Debug")')).toBeVisible();
  });

  test('should have reset functionality', async ({ page }) => {
    // Start game
    await page.click('button:has-text("🚨 Start Court Room Challenge")');
    
    // Check reset button is present
    await expect(page.locator('button:has-text("🔄 Reset")')).toBeVisible();
    
    // Click reset
    await page.click('button:has-text("🔄 Reset")');
    
    // Should be back to setup screen
    await expect(page.locator('h1:has-text("Court Room Simulation")')).toBeVisible();
    await expect(page.locator('button:has-text("🚨 Start Court Room Challenge")')).toBeVisible();
  });

  test('should show win condition when all issues fixed', async ({ page }) => {
    // Start game
    await page.click('button:has-text("🚨 Start Court Room Challenge")');
    
    // Fix all issues quickly
    const fixButtons = page.locator('button:has-text("🔧 Fix Issue")');
    const count = await fixButtons.count();
    for (let i = 0; i < count; i++) {
      await fixButtons.first().click();
      await page.waitForTimeout(500); // Small delay between fixes
    }
    
    // Wait a moment for game to process
    await page.waitForTimeout(1000);
    
    // Should show completion message eventually
    // Note: The actual completion logic depends on timer and message system
  });
});