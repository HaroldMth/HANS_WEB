import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Image } from 'lucide-react';

function ImageGen() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`https://apis.davidcyriltech.my.id/flux?prompt=${encodeURIComponent(prompt)}`);
      const imageBlob = await res.blob();
      const url = URL.createObjectURL(imageBlob);
      setImageUrl(url);
    } catch (error) {
      toast.error('Failed to generate image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
        <h1 className="text-3xl font-bold text-white mb-6">AI Image Generation</h1>
        
        <div className="space-y-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your image prompt..."
            className="w-full bg-black/20 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={generateImage}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition flex items-center space-x-2"
          >
            <Image size={20} />
            <span>{loading ? 'Generating...' : 'Generate Image'}</span>
          </button>
        </div>

        {imageUrl && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8"
          >
            <img 
              src={imageUrl} 
              alt="Generated" 
              className="rounded-lg max-w-full h-auto"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default ImageGen