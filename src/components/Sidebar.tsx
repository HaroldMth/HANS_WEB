import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Youtube, 
  Music, 
  Bot, 
  Image, 
  Cloud, 
  Sun, 
  Link as LinkIcon, 
  ImageOff 
} from 'lucide-react';

const links = [
  { to: '/', icon: Home, label: 'Dashboard' },
  { to: '/youtube', icon: Youtube, label: 'YouTube' },
  { to: '/tiktok', icon: Music, label: 'TikTok' },
  { to: '/ai', icon: Bot, label: 'AI Chat' },
  { to: '/image-gen', icon: Image, label: 'Image Gen' },
  { to: '/soundcloud', icon: Cloud, label: 'SoundCloud' },
  { to: '/weather', icon: Sun, label: 'Weather' },
  { to: '/url-shortener', icon: LinkIcon, label: 'URL Shortener' },
  { to: '/remove-bg', icon: ImageOff, label: 'Remove BG' }
];

function Sidebar() {
  return (
    <div className="w-64 bg-black/30 backdrop-blur-sm min-h-screen p-4">
      <div className="space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-300 hover:bg-purple-600/50'
              }`
            }
          >
            <link.icon className="w-5 h-5" />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;