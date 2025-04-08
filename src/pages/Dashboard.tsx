import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Dashboard() {
  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-sm rounded-xl p-8"
      >
        <div className="flex items-center space-x-6">
          <img 
            src="https://i.ibb.co/9gCjCwp/OIG4-E-D0-QOU1r4-Ru-CKuf-Nj0o.jpg" 
            alt="Hans Tech" 
            className="w-24 h-24 rounded-full border-4 border-purple-500"
          />
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome to HANS WEB</h1>
            <p className="text-gray-300">
              Created by Hans Tech - Your all-in-one solution for media downloads, AI chat, 
              image generation, and more!
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <a href="https://whatsapp.com/channel/0029VaZDIdxDTkKB4JSWUk1O" 
           target="_blank" 
           rel="noopener noreferrer"
           className="bg-green-600/20 backdrop-blur-sm rounded-xl p-6 hover:bg-green-600/30 transition">
          <h3 className="text-xl font-semibold text-white mb-2">WhatsApp Channel</h3>
          <p className="text-gray-300">Join our WhatsApp channel for updates and support</p>
        </a>

        <a href="https://t.me/HansTech0" 
           target="_blank"
           rel="noopener noreferrer" 
           className="bg-blue-600/20 backdrop-blur-sm rounded-xl p-6 hover:bg-blue-600/30 transition">
          <h3 className="text-xl font-semibold text-white mb-2">Telegram Channel</h3>
          <p className="text-gray-300">Follow our Telegram channel for news and announcements</p>
        </a>

        <a href="https://github.com/haroldmth" 
           target="_blank"
           rel="noopener noreferrer" 
           className="bg-purple-600/20 backdrop-blur-sm rounded-xl p-6 hover:bg-purple-600/30 transition">
          <h3 className="text-xl font-semibold text-white mb-2">GitHub Profile</h3>
          <p className="text-gray-300">Check out our open-source projects and contributions</p>
        </a>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Available Tools</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { name: 'YouTube Downloader', path: '/youtube', color: 'red' },
            { name: 'TikTok Downloader', path: '/tiktok', color: 'pink' },
            { name: 'AI Chat', path: '/ai', color: 'blue' },
            { name: 'Image Generation', path: '/image-gen', color: 'purple' },
            { name: 'SoundCloud Search', path: '/soundcloud', color: 'orange' },
            { name: 'Weather Info', path: '/weather', color: 'cyan' },
            { name: 'URL Shortener', path: '/url-shortener', color: 'green' },
            { name: 'Remove Background', path: '/remove-bg', color: 'indigo' }
          ].map((tool) => (
            <Link
              key={tool.path}
              to={tool.path}
              className={`bg-${tool.color}-600/20 backdrop-blur-sm rounded-lg p-4 hover:bg-${tool.color}-600/30 transition`}
            >
              <h3 className="text-lg font-semibold text-white">{tool.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;