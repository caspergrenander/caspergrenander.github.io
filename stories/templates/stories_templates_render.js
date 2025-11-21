const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  try {
    // locate the template relative to this script to avoid path issues
    const templatePath = path.resolve(__dirname, 'story_template.html');
    if (!fs.existsSync(templatePath)) {
      console.error('Template not found at:', templatePath);
      process.exit(2);
    }

    // output path: ../story.png relative to this file -> stories/story.png
    const outputPath = path.resolve(__dirname, '..', 'story.png');

    // Launch Puppeteer with sandbox flags suitable for GitHub Actions
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Set a viewport appropriate for social images / hero images
    await page.setViewport({ width: 1200, height: 630 });

    // Load the HTML template via file:// to avoid network fetch
    await page.goto('file://' + templatePath, { waitUntil: 'networkidle0' });

    // Wait briefly to allow fonts/images to settle (optional)
    await page.waitForTimeout(200);

    // Save screenshot (full page)
    await page.screenshot({ path: outputPath, fullPage: true });

    await browser.close();

    console.log('Rendered story PNG at:', outputPath);
    process.exit(0);
  } catch (err) {
    console.error('Rendering failed:', err);
    process.exit(1);
  }
})();