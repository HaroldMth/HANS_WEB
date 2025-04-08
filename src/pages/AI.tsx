import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Bot } from 'lucide-react';

function AI() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) {
      toast.error('Please enter a message');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`https://apis.davidcyriltech.my.id/ai/deepseek-v3?text=${encodeURIComponent(input)}`);
      const data = await res.json();
      
      if (data.success) {
        setResponse(data.response);
      } else {
        toast.error('Failed to get response');
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
        <h1 className="text-3xl font-bold text-white mb-6">AI Chat Assistant</h1>
        
        <div className="space-y-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="w-full h-32 bg-black/20 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition flex items-center space-x-2"
          >
            <Bot size={20} />
            <span>{loading ? 'Thinking...' : 'Send Message'}</span>
          </button>
        </div>

        {response && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-black/20 p-6 rounded-lg"
          >
            <p className="text-white whitespace-pre-wrap">{response}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default AI