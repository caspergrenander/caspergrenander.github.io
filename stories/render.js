const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

(async () => {
  try {
    console.log("🚀 Starting Puppeteer renderer...");

    const browser = await puppeteer.launch({
      headless: "new",
      defaultViewport: { width: 1080, height: 1920 },
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();

    const htmlPath = path.join(__dirname, "story_template.html");
    const html = fs.readFileSync(htmlPath, "utf-8");

    await page.setContent(html, { waitUntil: "networkidle0" });

    await page.screenshot({
      path: "story_output.png",
      fullPage: true
    });

    console.log("🎉 PNG successfully generated: story_output.png");

    await browser.close();
  } catch (err) {
    console.error("❌ Renderer failed:", err);
    process.exit(1);
  }
})();