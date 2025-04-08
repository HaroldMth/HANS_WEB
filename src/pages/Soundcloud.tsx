import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Music } from 'lucide-react';

function Soundcloud() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchTracks = async () => {
    if (!query.trim()) {
      toast.error('Please enter a search term');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`https://apis.davidcyriltech.my.id/search/soundcloud?text=${encodeURIComponent(query)}`);
      const data = await res.json();
      
      if (data.success) {
        setResults(data.result);
      } else {
        toast.error('Failed to search tracks');
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
        <h1 className="text-3xl font-bold text-white mb-6">SoundCloud Search</h1>
        
        <div className="flex space-x-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for tracks..."
            className="flex-1 bg-black/20 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={searchTracks}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition flex items-center space-x-2"
          >
            <Music size={20} />
            <span>{loading ? 'Searching...' : 'Search'}</span>
          </button>
        </div>

        {results.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 space-y-4"
          >
            {results.map((track, index) => (
              <div 
                key={index}
                className="bg-black/20 p-4 rounded-lg flex justify-between items-center"
              >
                <span className="text-white">{track.title}</span>
                <a
                  href={track.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition"
                >
                  Listen
                </a>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Soundcloud