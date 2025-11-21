const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // Ladda HTML-mall
  const html = fs.readFileSync("./stories/templates/story_template.html", "utf8");
  await page.setContent(html, { waitUntil: "networkidle0" });

  // Storlek 1080x1920 för Instagram Story
  await page.setViewport({ width: 1080, height: 1920 });

  // Rendera PNG
  const outputPath = `story_output.png`;
  await page.screenshot({ path: outputPath });

  console.log("Story rendered:", outputPath);
  await browser.close();
})();
