import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import axios from "axios";

export default function HaokanDownloader() {
  const [url, setUrl] = useState("");
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Thêm trạng thái lỗi
  const API_URL = "https://haokandownloader-production.up.railway.app"; // Kiểm tra API đúng chưa

  const fetchVideo = async () => {
    if (!url.trim()) {
      setError("Vui lòng nhập URL hợp lệ!");
      return;
    }
    setLoading(true);
    setError(null); // Xóa lỗi cũ

    try {
      const response = await axios.get(`${API_URL}/getVideo`, { params: { url } });
      if (!response.data || !response.data.downloadUrl) {
        throw new Error("Không tìm thấy video hoặc API trả về dữ liệu không hợp lệ.");
      }
      setVideo(response.data);
    } catch (error) {
      console.error("Error fetching video:", error);
      setVideo(null);
      setError("Không thể tải video. Vui lòng kiểm tra URL hoặc thử lại sau!");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Haokan Video Downloader</h1>
      <div className="flex gap-2 mb-4 w-full max-w-lg">
        <Input 
          value={url} 
          onChange={(e) => setUrl(e.target.value)} 
          placeholder="Nhập link video Haokan..." 
          className="flex-1 px-4 py-2 border rounded text-black"
        />
        <Button onClick={fetchVideo} disabled={loading} className="bg-blue-500 px-4 py-2 rounded">
          {loading ? "Đang tải..." : "Get Video"}
        </Button>
      </div>

      {error && <p className="text-red-500">{error}</p>} {/* Hiển thị lỗi */}
      
      {video && (
        <Card className="w-full max-w-lg p-4 text-black bg-white rounded shadow">
          <CardContent>
            <h2 className="text-lg font-bold">{video.title || "Video"}</h2>
            {video.thumbnail && <img src={video.thumbnail} alt="Thumbnail" className="w-full rounded mt-2" />}
            <a 
              href={video.downloadUrl} 
              download 
              className="block mt-4 bg-green-500 text-white p-2 rounded text-center"
            >
              Download Video
            </a>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
