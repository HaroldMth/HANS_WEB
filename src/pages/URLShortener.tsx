import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Link } from 'lucide-react';

function URLShortener() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const shortenUrl = async () => {
    if (!url.trim()) {
      toast.error('Please enter a URL');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
      if (!res.ok) throw new Error('Failed to shorten URL');
      
      const shortUrl = await res.text();
      setShortUrl(shortUrl);
      toast.success('URL shortened successfully!');
    } catch (error) {
      console.error('URL Shortener Error:', error);
      toast.error('Failed to shorten URL. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
        <h1 className="text-3xl font-bold text-white mb-6">URL Shortener</h1>
        
        <div className="space-y-4">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter long URL..."
            className="w-full bg-black/20 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={shortenUrl}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition flex items-center space-x-2"
          >
            <Link size={20} />
            <span>{loading ? 'Processing...' : 'Shorten URL'}</span>
          </button>
        </div>

        {shortUrl && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-black/20 p-6 rounded-lg"
          >
            <p className="text-white mb-2">Shortened URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 break-all"
            >
              {shortUrl}
            </a>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default URLShortener