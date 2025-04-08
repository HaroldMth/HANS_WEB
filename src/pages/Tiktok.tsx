import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Video, Music, Download } from 'lucide-react';

function Tiktok() {
  const [url, setUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchVideoInfo = async () => {
    if (!url) {
      toast.error('Please enter a TikTok URL');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`https://apis.davidcyriltech.my.id/download/tiktok?url=${encodeURIComponent(url)}`);
      const data = await res.json();

      if (data.success) {
        setVideoInfo(data.result);
        toast.success('Video info fetched successfully!');
      } else {
        toast.error('Failed to fetch video information');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
        <h1 className="text-3xl font-bold text-white mb-6">TikTok Downloader</h1>
        
        <div className="space-y-4">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter TikTok video URL..."
            className="w-full bg-black/20 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={fetchVideoInfo}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition flex items-center space-x-2"
          >
            <Video size={20} />
            <span>{loading ? 'Loading...' : 'Get Video Info'}</span>
          </button>
        </div>

        {videoInfo && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 space-y-6"
          >
            <div className="bg-black/20 p-6 rounded-lg">
              <div className="flex items-center space-x-4 mb-4">
                <img 
                  src={videoInfo.author.avatar} 
                  alt={videoInfo.author.nickname}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="text-white font-semibold">{videoInfo.author.nickname}</h3>
                  <p className="text-gray-300 text-sm">{videoInfo.desc}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-purple-400 font-semibold">{videoInfo.statistics.likeCount}</p>
                  <p className="text-gray-400 text-sm">Likes</p>
                </div>
                <div className="text-center">
                  <p className="text-purple-400 font-semibold">{videoInfo.statistics.commentCount}</p>
                  <p className="text-gray-400 text-sm">Comments</p>
                </div>
                <div className="text-center">
                  <p className="text-purple-400 font-semibold">{videoInfo.statistics.shareCount}</p>
                  <p className="text-gray-400 text-sm">Shares</p>
                </div>
              </div>

              <div className="flex space-x-4">
                <a
                  href={videoInfo.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition flex items-center justify-center space-x-2"
                >
                  <Video size={20} />
                  <span>Download Video</span>
                </a>
                <a
                  href={videoInfo.music}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition flex items-center justify-center space-x-2"
                >
                  <Music size={20} />
                  <span>Download Audio</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Tiktok;