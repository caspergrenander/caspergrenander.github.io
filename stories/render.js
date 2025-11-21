
name: Render HBM Story

on:
  workflow_dispatch:

jobs:
  render:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install Puppeteer dependencies (Chrome)
        run: |
          sudo apt-get update
          sudo apt-get install -y libatk-bridge2.0-0 libgtk-3-0 libnss3 libxss1 libasound2

      - name: Install Puppeteer
        run: npm install puppeteer

      - name: Render Story PNG
        run: |
          npx puppeteer browsers install chrome
          node stories/templates/render.js
        env:
          PUPPETEER_EXECUTABLE_PATH: "/usr/bin/google-chrome"
          PUPPETEER_SKIP_DOWNLOAD: "true"

      - name: Upload result artifact
        uses: actions/upload-artifact@v3
        with:
          name: rendered-story
          path: story_output.png