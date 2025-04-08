import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { ImageOff, Upload } from 'lucide-react';

function RemoveBG() {
  const [imageUrl, setImageUrl] = useState('');
  const [processedImage, setProcessedImage] = useState('');
  const [loading, setLoading] = useState(false);

  const removeBackground = async () => {
    if (!imageUrl.trim()) {
      toast.error('Please enter an image URL');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`https://apis.davidcyriltech.my.id/removebg?url=${encodeURIComponent(imageUrl)}`);
      const imageBlob = await res.blob();
      const url = URL.createObjectURL(imageBlob);
      setProcessedImage(url);
    } catch (error) {
      toast.error('Failed to remove background');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
        <h1 className="text-3xl font-bold text-white mb-6">Remove Background</h1>
        
        <div className="space-y-4">
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL..."
            className="w-full bg-black/20 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={removeBackground}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition flex items-center space-x-2"
          >
            <ImageOff size={20} />
            <span>{loading ? 'Processing...' : 'Remove Background'}</span>
          </button>
        </div>

        {processedImage && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 space-y-4"
          >
            <img 
              src={processedImage} 
              alt="Processed" 
              className="rounded-lg max-w-full h-auto"
            />
            <a
              href={processedImage}
              download="processed-image.png"
              className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
            >
              <Upload size={20} />
              <span>Download Image</span>
            </a>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default RemoveBG