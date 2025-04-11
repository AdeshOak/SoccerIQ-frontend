import React, { useState } from 'react';
import ScoutCarousel from '../components/ScoutCarousel'; // Our new carousel component
import axios from 'axios';
import { Search } from 'lucide-react';

const Scout = () => {
  const [value, setValue] = useState(30);
  const [showData, setShowData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [players, setPlayers] = useState([]);

  const handleSliderChange = (e) => {
    setValue(parseInt(e.target.value, 10));
  };

  const handleInputChange = (event) => {
    const newValue = event.target.value === '' ? '' : Number(event.target.value);
    setValue(newValue);
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  const handleSearchClick = async () => {
    setIsLoading(true);
    
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
    
    try {
      const response = await axios.post(`${backendUrl}/feature4`, null, {
        params: {
          'initial_overall': value
        }
      });
      
      setPlayers(response.data.result);
      setShowData(true);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error state
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="w-full min-h-screen pt-4 pb-12"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.85)), url('/stadium-background.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Header Section */}
        <h1 className="text-center text-white font-bold mb-12 mt-8 text-3xl md:text-5xl">
          Scout Talent
        </h1>

        {/* Search Interface */}
        <div className="bg-slate-900/75 backdrop-blur-md rounded-xl border border-white/10 p-6 mb-12 max-w-3xl mx-auto shadow-2xl">
          <h2 className="text-white mb-6 font-semibold text-2xl">
            Set Player Rating
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-9">
              <div className="relative pt-1 px-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={value}
                  onChange={handleSliderChange}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  aria-labelledby="player-rating-slider"
                />
              </div>
            </div>
            
            <div className="md:col-span-3">
              <input
                type="number"
                min="0"
                max="100"
                value={value}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className="w-full bg-black/20 text-white border border-white/20 rounded px-3 py-2 text-center text-xl font-bold focus:border-blue-600 focus:outline-none"
                aria-labelledby="player-rating-slider"
              />
            </div>

            <div className="col-span-full text-center mt-4">
              <button
                onClick={handleSearchClick}
                disabled={isLoading}
                className={`bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-md flex items-center justify-center mx-auto space-x-2 transition-colors ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <span>{isLoading ? 'Scouting...' : 'Scout'}</span>
                <Search size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Results Section - Now using the carousel */}
        {showData && (
          <div className="mt-8 w-full">
            <h2 className="text-white mb-6 font-semibold text-2xl text-center">
              Scout Results
            </h2>
            <ScoutCarousel players={players} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Scout;