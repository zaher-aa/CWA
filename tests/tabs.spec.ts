import { test, expect } from '@playwright/test';

test.describe('Tabs Generator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tabs');
  });

  test('should load the tabs page with default tabs', async ({ page }) => {
    await expect(page).toHaveTitle(/Tab Generator/);
    await expect(page.locator('h1')).toContainText('HTML5 Tabs Generator');
    
    // Check default tabs are present
    await expect(page.locator('button:has-text("Step 1")')).toBeVisible();
    await expect(page.locator('button:has-text("Step 2")')).toBeVisible();
    await expect(page.locator('button:has-text("Step 3")')).toBeVisible();
  });

  test('should add and remove tabs', async ({ page }) => {
    // Check initial count
    await expect(page.locator('h2:has-text("Tab Builder (3/15)")')).toBeVisible();
    
    // Add a tab
    await page.click('button:has-text("+ Add Tab")');
    await expect(page.locator('h2:has-text("Tab Builder (4/15)")')).toBeVisible();
    await expect(page.locator('button:has-text("Step 4")')).toBeVisible();
    
    // Remove a tab
    await page.click('button:has-text("- Remove Tab")');
    await expect(page.locator('h2:has-text("Tab Builder (3/15)")')).toBeVisible();
  });

  test('should edit tab header and content', async ({ page }) => {
    // Click on Step 1 tab
    await page.click('button:has-text("Step 1")');
    
    // Edit header
    const headerInput = page.locator('input[placeholder="Enter tab header..."]');
    await headerInput.clear();
    await headerInput.fill('Custom Header');
    
    // Check if tab header updated
    await expect(page.locator('button:has-text("Custom Header")')).toBeVisible();
    
    // Edit content
    const contentTextarea = page.locator('textarea[placeholder*="e.g."]');
    await contentTextarea.clear();
    await contentTextarea.fill('<h1>Custom Content</h1>');
    
    // Verify content appears in preview iframe
    const iframe = page.frameLocator('iframe[title="tab-preview"]');
    await expect(iframe.locator('h1')).toContainText('Custom Content');
  });

  test('should generate HTML5 output', async ({ page }) => {
    // Edit a tab first
    await page.click('button:has-text("Step 1")');
    const contentTextarea = page.locator('textarea[placeholder*="e.g."]');
    await contentTextarea.clear();
    await contentTextarea.fill('<h2 style="color: red;">Test Content</h2>');
    
    // Generate output
    await page.click('button:has-text("Generate HTML5 Output")');
    
    // Check modal appears
    await expect(page.locator('h3:has-text("Generated HTML5 Code")')).toBeVisible();
    
    // Check generated code contains our content
    const codeBlock = page.locator('pre');
    await expect(codeBlock).toContainText('<!DOCTYPE html>');
    await expect(codeBlock).toContainText('<h2 style="color: red;">Test Content</h2>');
    await expect(codeBlock).toContainText('function openTab');
    
    // Close modal
    await page.click('button[aria-label="Close output modal"]');
    await expect(page.locator('h3:has-text("Generated HTML5 Code")')).not.toBeVisible();
  });

  test('should save and load configurations', async ({ page }) => {
    // Customize tabs first
    await page.click('button:has-text("Step 1")');
    const headerInput = page.locator('input[placeholder="Enter tab header..."]');
    await headerInput.clear();
    await headerInput.fill('Test Tab');
    
    // Save configuration
    await page.click('button:has-text("💾 Save")');
    await expect(page.locator('h3:has-text("Save Configuration")')).toBeVisible();
    
    const nameInput = page.locator('input[placeholder="Enter a name for this configuration..."]');
    await nameInput.fill('Test Config');
    await page.click('button:has-text("💾 Save"):last-of-type');
    
    // Wait for success message
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('Configuration saved successfully!');
      await dialog.accept();
    });
    
    // Load configuration
    await page.click('button:has-text("📁 Load")');
    await expect(page.locator('h3:has-text("Load Configuration")')).toBeVisible();
    
    // Check if our saved config appears
    await expect(page.locator('h4:has-text("Test Config")')).toBeVisible();
    
    // Close modal
    await page.click('button[aria-label="Close load modal"]');
  });
});