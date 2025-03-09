const express = require("express");
const puppeteer = require("puppeteer");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const CHROMIUM_PATH = process.env.CHROMIUM_PATH || "/usr/bin/chromium-browser";

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("views"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.post("/generate-pdf", async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).send("URL is required");
    }

    try {
        console.log("Launching Chromium...");
        const browser = await puppeteer.launch({
            executablePath: CHROMIUM_PATH, // Use environment variable
            headless: true,
            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-gpu",
                "--disable-dev-shm-usage",
                "--single-process"
            ]
        });

        console.log("Opening new page...");
        const page = await browser.newPage();

        console.log(`Navigating to URL: ${url}`);
        await page.goto(url, { waitUntil: "networkidle2" });

        console.log("Generating PDF...");
        const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });

        await browser.close();
        console.log("PDF generated successfully.");

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", 'attachment; filename="generated.pdf"');
        res.end(pdfBuffer);
    } catch (error) {
        console.error("Error launching Chromium:", error);
        res.status(500).send("Error generating PDF");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
