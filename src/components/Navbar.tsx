import React from 'react';
import { Link } from 'react-router-dom';
import { Github } from 'lucide-react';

function Navbar() {
  return (
    <nav className="bg-black/50 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <img src="https://i.ibb.co/9gCjCwp/OIG4-E-D0-QOU1r4-Ru-CKuf-Nj0o.jpg" 
                 alt="Hans Tech" 
                 className="w-8 h-8 rounded-full" />
            <span className="text-white font-bold text-xl">HANS WEB</span>
          </Link>
          <div className="flex items-center space-x-4">
            <a href="https://github.com/haroldmth/hans_byte" 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-white hover:text-purple-400 transition">
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;