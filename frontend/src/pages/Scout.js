import React, { useState } from 'react';
import axios from 'axios';

const Scout = () => {
  const [value, setValue] = useState(80);
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleScout = async () => {
    setIsLoading(true);
    setShowResults(false);
    
    // Get the backend URL from environment variables or use default
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
    
    try {
      const response = await axios.post(`${backendUrl}/feature4`, null, {
        params: {
          'intial_overall': value
        }
      });
      
      console.log('Scouting results:', response.data);
      setPlayers(response.data.result);
      console.log(players);
      setShowResults(true);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error state
    } finally {
      setIsLoading(false);
    }
  };

  const handleSlideChange = (direction) => {
    if (direction === 'next') {
      setActiveSlide((prev) => (prev === Math.ceil(players.length / 3) - 1 ? 0 : prev + 1));
    } else {
      setActiveSlide((prev) => (prev === 0 ? Math.ceil(players.length / 3) - 1 : prev - 1));
    }
  };

  const handleSliderChange = (e) => {
    setValue(parseInt(e.target.value));
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value === '' ? 0 : parseInt(e.target.value);
    setValue(newValue > 100 ? 100 : newValue < 0 ? 0 : newValue);
  };

  // Calculate player groups for carousel display - 3 players per slide
  const playerGroups = [];
  if (players.length > 0) {
    for (let i = 0; i < players.length; i += 3) {
      playerGroups.push(players.slice(i, i + 3));
    }
  }

  const getPositionColor = (position) => {
    const positionColors = {
      ST: '#F94144', // Striker - Red
      LW: '#F3722C', // Left Wing - Orange
      RW: '#F3722C', // Right Wing - Orange
      RWB: '#F8961E', // Right Wing Back - Light Orange
      LB: '#F8961E', // Left Back - Light Orange
      CM: '#F9C74F', // Center Mid - Yellow
      CDM: '#90BE6D', // Center Defensive Mid - Light Green
      CB: '#43AA8B', // Center Back - Green
      GK: '#4D908E', // Goalkeeper - Teal
      // Add more positions as needed
    };

    return positionColors[position] || '#577590'; // Default blue if position not found
  };
  console.log(players);

  return (
    
    <div className="relative w-full min-h-screen">
      {/* Stadium Background */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('/stadium-background.jpg')", // You'll need to add this image to public folder
          filter: "brightness(0.7)"
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto p-4">

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center mt-8">
          {/* Scouting Interface */}
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Set Score</h1>
            
            <div className="flex items-center mb-8">
              <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={handleSliderChange}
                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-gray-800">{value}</div>
              <button
                onClick={handleScout}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg flex items-center"
              >
                {isLoading ? (
                  <span>Scouting...</span>
                ) : (
                  <>
                    Scout <span className="ml-2">🔍</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Section */}
          {showResults && (
            <div className="mt-16 w-full">
              <h2 className="text-white text-center text-3xl font-bold mb-6">TOP PROSPECTS</h2>
              
              {/* Carousel Container */}
              <div className="relative w-full mt-8">
                {/* Navigation Arrows */}
                <button 
                  onClick={() => handleSlideChange('prev')}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-red-600 text-white p-2 rounded-full shadow-lg"
                >
                  &lt;
                </button>
                
                <button 
                  onClick={() => handleSlideChange('next')}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-red-600 text-white p-2 rounded-full shadow-lg"
                >
                  &gt;
                </button>
                
                {/* Stadium illustration background */}
                <div className="relative w-full h-96 bg-gray-300 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-center bg-contain"
                       style={{ 
                         backgroundImage: "url('/stadium-illustration.svg')", 
                         opacity: 0.2 
                       }} 
                  />
                  
                  <div className="relative z-10 h-full">
                    {/* The Squad Header */}
                    <div className="absolute top-4 left-0 right-0 flex justify-center">
                      <div className="bg-white px-8 py-2 rounded-md shadow-md">
                        <h3 className="text-2xl font-bold text-red-600">THE SQUAD</h3>
                      </div>
                    </div>
                    
                    {/* Players Display */}
                    <div className="flex justify-center items-center h-full px-16">
                      {playerGroups[activeSlide]?.map((player, index) => (
                        <div key={index} className="relative px-4 flex-1 h-full flex flex-col items-center justify-center">
                          {/* Player Photo */}
                          <div className="w-40 h-40 bg-black rounded-t-xl overflow-hidden">
                            <img 
                              src={player.photo || `/placeholder-player.png`} 
                              alt={player.name || "Player"}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          {/* Player Info Card */}
                          <div className="w-40 bg-white rounded-b-xl p-3 shadow-lg">
                            <h4 className="font-bold text-lg">{player.name || "Unknown Player"}</h4>
                            <div className="text-sm mb-1">Club: <span className="font-medium">{player.club || "N/A"}</span></div>
                            <div className="text-sm mb-1">Age: <span className="font-medium">{player.age || "N/A"}</span></div>
                            
                            <div className="flex justify-between text-sm mb-1">
                              <span>Overall:</span> 
                              <span className="font-medium text-green-600">{player.overall || "N/A"}</span>
                            </div>
                            
                            <div className="flex justify-between text-sm mb-1">
                              <span>Potential:</span>
                              <span className="font-medium text-blue-600">{player.potential || "N/A"}</span>
                            </div>
                            
                            <div className="flex justify-between text-sm">
                              <span>Position:</span>
                              <span 
                                className="font-medium px-2 rounded-sm text-white"
                                style={{ backgroundColor: getPositionColor(player.position) }}
                              >
                                {player.position || "N/A"}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Carousel Indicators */}
                <div className="flex justify-center mt-4">
                  {playerGroups.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveSlide(index)}
                      className={`mx-1 w-3 h-3 rounded-full shadow-sm ${
                        activeSlide === index ? 'bg-red-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scout;