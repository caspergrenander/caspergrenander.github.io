const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  try {
    const templatePath = path.resolve(__dirname, 'story_template.html');

    if (!fs.existsSync(templatePath)) {
      console.error('Template not found at:', templatePath);
      process.exit(2);
    }

    const outputPath = path.resolve(__dirname, '..', 'story.png');

    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630 });

    await page.goto('file://' + templatePath, { waitUntil: 'networkidle0' });
    await page.waitForTimeout(200);

    await page.screenshot({ path: outputPath, fullPage: true });

    await browser.close();
    console.log('Rendered:', outputPath);
    process.exit(0);
  } catch (err) {
    console.error('Rendering failed:', err);
    process.exit(1);
  }
})();