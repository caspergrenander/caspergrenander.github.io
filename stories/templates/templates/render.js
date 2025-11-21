const puppeteer = require("puppeteer");
const fs = require("fs");

async function renderStory() {
  console.log("🚀 Starting headless rendering...");

  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1920 });

  // Load HTML from templates folder
  const html = fs.readFileSync("./templates/story_template.html", "utf8");
  await page.setContent(html, { waitUntil: "networkidle0" });

  // Output file path
  const path = `./stories/story_${Date.now()}.png`;

  await page.screenshot({ path });
  await browser.close();

  console.log("🖼 Render done → " + path);
}

renderStory();

t