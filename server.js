const express = require("express");
const puppeteer = require("puppeteer");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const CHROMIUM_PATH = process.env.CHROMIUM_PATH || "/usr/bin/chromium-browser";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("views"));

// Serve the HTML form (optional)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// ✅ API Endpoint: Generate PDF from URL
app.post("/api/generate-pdf", async (req, res) => {
  const {
    url,
    format = "A4",
    landscape = "false",
    printBackground = "true",
  } = req.body;


  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    console.log("Launching Chromium...");
    const browser = await puppeteer.launch({
      executablePath: CHROMIUM_PATH,
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--single-process",
      ],
    });

    console.log(`Opening page: ${url}`);
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    console.log("Generating PDF...");
    const pdfBuffer = await page.pdf({
      format,
      landscape: landscape === "true",
      printBackground: printBackground === "true",
    });

    await browser.close();
    console.log("PDF generated successfully.");

    // Return PDF as a downloadable response
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="generated.pdf"'
    );
    res.end(pdfBuffer);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res
      .status(500)
      .json({ error: "Failed to generate PDF", details: error.message });
  }
});

// ✅ API Endpoint: Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "API is running", timestamp: new Date() });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
