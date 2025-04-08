import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Cloud, Sun, Wind, Droplets, Compass } from 'lucide-react';

function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    if (!city.trim()) {
      toast.error('Please enter a city name');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`https://apis.davidcyriltech.my.id/weather?city=${encodeURIComponent(city)}`);
      const data = await res.json();
      
      if (data.success) {
        setWeather(data.data);
        toast.success('Weather data fetched successfully!');
      } else {
        toast.error('Failed to fetch weather data');
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
        <h1 className="text-3xl font-bold text-white mb-6">Weather Information</h1>
        
        <div className="flex space-x-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            className="flex-1 bg-black/20 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={getWeather}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition flex items-center space-x-2"
          >
            <Sun size={20} />
            <span>{loading ? 'Loading...' : 'Get Weather'}</span>
          </button>
        </div>

        {weather && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-black/20 p-6 rounded-lg"
          >
            <div className="flex items-center space-x-4 mb-6">
              <Cloud size={40} className="text-white" />
              <div>
                <h2 className="text-2xl font-bold text-white">{weather.location}, {weather.country}</h2>
                <p className="text-gray-300">{weather.weather} - {weather.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <Sun className="text-yellow-400 w-8 h-8" />
                <div>
                  <p className="text-gray-300">Temperature</p>
                  <p className="text-white font-semibold">{weather.temperature}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Wind className="text-blue-400 w-8 h-8" />
                <div>
                  <p className="text-gray-300">Wind Speed</p>
                  <p className="text-white font-semibold">{weather.wind_speed}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Droplets className="text-blue-300 w-8 h-8" />
                <div>
                  <p className="text-gray-300">Humidity</p>
                  <p className="text-white font-semibold">{weather.humidity}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Sun className="text-orange-400 w-8 h-8" />
                <div>
                  <p className="text-gray-300">Feels Like</p>
                  <p className="text-white font-semibold">{weather.feels_like}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Compass className="text-purple-400 w-8 h-8" />
                <div>
                  <p className="text-gray-300">Coordinates</p>
                  <p className="text-white font-semibold">
                    {weather.coordinates.latitude}, {weather.coordinates.longitude}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Weather;