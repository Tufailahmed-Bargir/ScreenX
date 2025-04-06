 
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Setup screenshots directory
const screenshotsDir = path.join(__dirname, "tweet_screenshots");
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir);
}

// Function to get the next image number
function getNextImageNumber() {
  const files = fs.readdirSync(screenshotsDir);
  let highestNumber = 0;
  files.forEach(file => {
    const match = file.match(/^img(\d+)\.png$/);
    if (match) {
      const num = parseInt(match[1]);
      if (num > highestNumber) {
        highestNumber = num;
      }
    }
  });
  return highestNumber + 1;
}

// Serve static files from the screenshots folder
app.use("/tweet_screen", express.static(screenshotsDir));

app.get("/", (req, res) => {
  res.send("Tweet Screenshot Server is running!");
});

app.post("/generate-screenshot", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url || (!url.startsWith("https://twitter.com/") && !url.startsWith("https://x.com/"))) {
      return res.status(400).json({ success: false, error: "Invalid tweet URL." });
    }

    const imageNumber = getNextImageNumber();
    const filename = `img${imageNumber}.png`;
    const screenshotPath = path.join(screenshotsDir, filename);

    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(url, { waitUntil: "networkidle2" });

    // Wait for tweet to load
    // await page.waitForTimeout(5000);
    await new Promise(resolve => setTimeout(resolve, 5000));


    // Hide reply section
    await page.evaluate(() => {
      const replyElements = document.querySelectorAll('[data-testid="reply"]');
      replyElements.forEach(el => {
        const replySection = el.closest('div[role="button"]');
        if (replySection) replySection.style.display = 'none';
      });
    });

    const tweetElement = await page.$('article[data-testid="tweet"]');
    if (!tweetElement) {
      await browser.close();
      return res.status(404).json({ success: false, error: "Tweet not found. X HTML structure might have changed." });
    }

    await tweetElement.screenshot({ path: screenshotPath });
    await browser.close();

    return res.status(200).json({
      success: true,
      imageUrl: `/tweet_screen/${filename}`
    });

  } catch (error) {
    console.error("Screenshot error:", error);
    return res.status(500).json({ success: false, error: "Failed to generate screenshot." });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Express server started: http://localhost:${PORT}`);
});
