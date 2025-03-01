const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Server is running!");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Route chính để tải video từ Haokan
app.get("/download", async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: "Thiếu URL" });

    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        // Trích xuất link video từ HTML (cần kiểm tra lại với Haokan)
        const videoUrl = $("video source").attr("src");
        if (!videoUrl) return res.status(404).json({ error: "Không tìm thấy video" });

        res.json({ videoUrl });
    } catch (error) {
        res.status(500).json({ error: "Lỗi tải video", details: error.message });
    }
});
