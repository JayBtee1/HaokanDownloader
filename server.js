const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // Cho phép CORS để frontend có thể gọi API

// Kiểm tra route 
app.get("/getVideo", async (req, res) => {
    const videoUrl = req.query.url;
    if (!videoUrl) {
        return res.status(400).json({ error: "Missing video URL" });
    }

    // Trả về dữ liệu giả lập để kiểm tra
    res.json({
        title: "Sample Video",
        thumbnail: "https://via.placeholder.com/150",
        downloadUrl: "https://example.com/video.mp4",
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
