import React, { useState } from 'react';
import ScoutCardCarousel from '../components/ScoutCarousel'; // We'll create this new component
import axios from 'axios';
import { Search } from 'lucide-react';

const Scout = () => {
  const [value, setValue] = useState(56); // Changed to match image 3
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
      className="w-full min-h-screen flex flex-col"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('/stadium-background.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        height: '100%' // Ensure background extends fully
      }}
    >
      <div className="flex-grow max-w-6xl mx-auto px-4 md:px-6 py-8">
        {/* Search Interface - Styled like image 3 */}
        <div className="bg-slate-900/80 backdrop-blur-md rounded-xl p-10 mb-12 max-w-2xl mx-auto shadow-2xl">
          <h2 className="text-white text-center mb-10 font-bold text-4xl">
            Set Player Rating
          </h2>
          
          <div className="mb-8">
            <div className="relative pt-1 px-2 mb-6">
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={value}
                onChange={handleSliderChange}
                className="w-full h-2 bg-blue-700/50 rounded-lg appearance-none cursor-pointer accent-blue-600"
                aria-labelledby="player-rating-slider"
              />
            </div>
            
            <div className="flex justify-center">
              <input
                type="number"
                min="0"
                max="100"
                value={value}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className="w-40 bg-black/20 text-white border border-white/20 rounded px-3 py-2 text-center text-3xl font-bold focus:border-blue-600 focus:outline-none"
                aria-labelledby="player-rating-slider"
              />
            </div>
          </div>

          <div className="text-center mt-6">
            <button
              onClick={handleSearchClick}
              disabled={isLoading}
              className={`bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-lg text-lg font-semibold shadow-md flex items-center justify-center mx-auto space-x-2 transition-colors ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <span>{isLoading ? 'Scouting...' : 'Scout'}</span>
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* Results Section */}
        {showData && (
          <div className="mt-12 w-full">
            <h2 className="text-white mb-8 font-bold text-4xl text-center">
              Scout Results
            </h2>
            <ScoutCardCarousel players={players} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Scout;