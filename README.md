# PDF Generator with Puppeteer & Chromium

## 📌 Overview
This is a **Node.js** application that generates PDFs from web pages using **Puppeteer** and **Chromium**. It provides an API to convert a given URL into a downloadable PDF.

---

## 🚀 Setup Instructions

### 1️⃣ **Clone the Repository**
```bash
git clone https://github.com/your-repo/pdf-generator.git
cd pdf-generator
```

### 2️⃣ **Install Dependencies**
```bash
npm install
```

### 3️⃣ **Install Chromium (if not installed)**
#### 🟢 **Linux (Ubuntu/Debian)**
```bash
sudo apt update && sudo apt install -y chromium-browser
```
#### 🔵 **MacOS**
```bash
brew install chromium
```
#### 🟣 **Windows**
1. Download [Chromium](https://chromium.woolyss.com/) and extract it.
2. Note the path to the `chrome.exe` file.

---

## ⚙️ Configuration

### 4️⃣ **Setup Environment Variables**
Create a `.env` file in the root directory:

```
PORT=3000
CHROMIUM_PATH=/usr/bin/chromium-browser # Change this based on your OS
```

**For Windows:**
```
CHROMIUM_PATH=C:\Path\To\Chromium\chrome.exe
```

---

## 🏃 Run the Application

### 5️⃣ **Start the Server**
```bash
node server.js
```

or using **nodemon** for auto-restart on changes:
```bash
npx nodemon server.js
```

The server will start on:
```
http://localhost:3000
```

---

## 🛠️ API Usage

### **1️⃣ Generate PDF**
- **Endpoint:** `POST /generate-pdf`
- **Request Body:**
  ```json
  {
    "url": "https://example.com"
  }
  ```
- **Response:** A downloadable PDF file.

### **2️⃣ Example cURL Request**
```bash
curl -X POST http://localhost:3000/generate-pdf \
     -H "Content-Type: application/json" \
     -d '{"url": "https://www.example.com"}' --output output.pdf
```

---

## 🐞 Troubleshooting

### 1️⃣ **Chromium Not Launching?**
Try running manually:
```bash
/usr/bin/chromium-browser --headless --no-sandbox --disable-gpu --remote-debugging-port=9222 https://www.google.com
```
If it fails, install missing dependencies:
```bash
sudo apt update && sudo apt install -y libnss3 libatk1.0-0 libx11-xcb1 libxcomposite1 \
    libxdamage1 libxrandr2 libgbm1 libasound2 libpango-1.0-0 libcups2
```

### 2️⃣ **Permission Issues?**
Try running:
```bash
node --no-sandbox server.js
```

---

## 📜 License
This project is open-source and available under the **MIT License**.

---

## ✨ Contributors
Feel free to contribute! Fork the repository, make changes, and submit a pull request.

---

## 📧 Contact
For questions, reach out at **af.arfinfoysal.com**


## 🙌 Credits

