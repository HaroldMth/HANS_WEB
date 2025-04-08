import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Youtube from './pages/Youtube';
import Tiktok from './pages/Tiktok';
import AI from './pages/AI';
import ImageGen from './pages/ImageGen';
import Soundcloud from './pages/Soundcloud';
import Weather from './pages/Weather';
import URLShortener from './pages/URLShortener';
import RemoveBG from './pages/RemoveBG';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-red-900">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/youtube" element={<Youtube />} />
              <Route path="/tiktok" element={<Tiktok />} />
              <Route path="/ai" element={<AI />} />
              <Route path="/image-gen" element={<ImageGen />} />
              <Route path="/soundcloud" element={<Soundcloud />} />
              <Route path="/weather" element={<Weather />} />
              <Route path="/url-shortener" element={<URLShortener />} />
              <Route path="/remove-bg" element={<RemoveBG />} />
            </Routes>
          </main>
        </div>
        <Toaster position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;