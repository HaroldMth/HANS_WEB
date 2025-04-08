import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

function Youtube() {
  const [url, setUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const getVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const fetchVideoInfo = async () => {
    if (!url) {
      toast.error('Please enter a YouTube URL');
      return;
    }

    const videoId = getVideoId(url);
    if (!videoId) {
      toast.error('Invalid YouTube URL');
      return;
    }

    setLoading(true);
    try {
      const videoInfoResponse = await fetch(`https://apis.davidcyriltech.my.id/download/ytmp4?url=https://youtube.com/watch?v=${videoId}`);
      const videoInfoData = await videoInfoResponse.json();

      if (videoInfoData.success) {
        setVideoInfo({
          title: videoInfoData.result.title,
          thumbnail: videoInfoData.result.thumbnail,
          videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
          downloadUrl: videoInfoData.result.download_url,
          quality: videoInfoData.result.quality,
          type: videoInfoData.result.type
        });
        toast.success('Video information fetched successfully!');
      } else {
        throw new Error('Video not found');
      }
    } catch (error) {
      console.error('API Error:', error);
      toast.error('Failed to fetch video information. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
        <h1 className="text-3xl font-bold text-white mb-6">YouTube Video Info</h1>
        
        <div className="flex space-x-4">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter YouTube URL"
            className="flex-1 bg-black/20 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={fetchVideoInfo}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition"
          >
            {loading ? 'Loading...' : 'Get Info'}
          </button>
        </div>

        {videoInfo && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 space-y-6"
          >
            <div className="flex space-x-6">
              <img 
                src={videoInfo.thumbnail} 
                alt={videoInfo.title}
                className="w-64 rounded-lg"
              />
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white">{videoInfo.title}</h2>
                <p className="text-gray-300">Quality: {videoInfo.quality}</p>
                <p className="text-gray-300">Type: {videoInfo.type}</p>
                <div className="space-x-4">
                  <a
                    href={videoInfo.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                  >
                    Watch on YouTube
                  </a>
                  <a
                    href={videoInfo.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
                  >
                    Download Video
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default Youtube;
