const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000; // Sử dụng PORT do Railway cấp

app.use(cors());
app.use(express.json());

// API kiểm tra server
app.get("/", (req, res) => {
    res.send("Haokan Downloader API is running!");
});

// API tải video từ Haokan
app.get("/download", async (req, res) => {
    try {
        const videoUrl = req.query.url;
        if (!videoUrl) {
            return res.status(400).json({ error: "Missing video URL" });
        }

        // Ví dụ: Gửi request đến server Haokan để lấy video
        const response = await axios.get(videoUrl, { responseType: "stream" });

        res.setHeader("Content-Disposition", 'attachment; filename="video.mp4"');
        res.setHeader("Content-Type", "video/mp4");

        response.data.pipe(res);
    } catch (error) {
        console.error("Download error:", error.message);
        res.status(500).json({ error: "Failed to fetch video" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
