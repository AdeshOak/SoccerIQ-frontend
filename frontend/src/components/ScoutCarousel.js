import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ScoutCarousel({ players }) {
  const [currentPage, setCurrentPage] = useState(0);
  
  // If no data is provided
  if (!players || players.length === 0) {
    return (
      <div className="flex justify-center p-4 bg-opacity-75 bg-gray-900 rounded backdrop-blur-lg">
        <h2 className="text-white text-lg font-semibold">No players found matching your criteria</h2>
      </div>
    );
  }
  
  // Number of cards per page (3 cards per page shows nicely)
  const cardsPerPage = 3;
  const totalPages = Math.ceil(players.length / cardsPerPage);
  
  // Get current page's players
  const currentPlayers = players.slice(
    currentPage * cardsPerPage, 
    Math.min((currentPage + 1) * cardsPerPage, players.length)
  );
  
  // Functions to navigate the carousel
  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };
  
  const prevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };
  
  // Function to determine color based on rating
  const getRatingColor = (rating) => {
    if (rating >= 80) return 'text-green-600'; // green
    if (rating >= 70) return 'text-blue-600'; // blue
    if (rating >= 60) return 'text-yellow-600'; // yellow
    return 'text-white'; // white
  };
  
  const getPotentialColor = (potential) => {
    if (potential >= 85) return 'text-green-600'; // green
    if (potential >= 75) return 'text-blue-600'; // blue
    return 'text-yellow-600'; // yellow
  };

  return (
    <div className="flex flex-col items-center w-full max-w-6xl mx-auto rounded-xl p-6 relative overflow-hidden bg-gradient-to-b from-slate-900/40 to-slate-900/70 backdrop-blur-md">
      {/* Soccer field visual background (can be added with CSS background) */}
      <div className="absolute inset-0 opacity-10 bg-cover bg-center z-0" style={{ backgroundImage: 'url(/field-background.png)' }} />
      
      {/* Carousel navigation */}
      <div className="flex justify-between items-center w-full mb-4 z-10">
        <h3 className="text-white font-semibold">
          Player {currentPage * cardsPerPage + 1}-{Math.min((currentPage + 1) * cardsPerPage, players.length)} of {players.length}
        </h3>
        
        <div>
          <button
            onClick={prevPage}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600/80 text-white mr-3 shadow-md hover:bg-blue-700 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextPage}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600/80 text-white shadow-md hover:bg-blue-700 transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
      
      {/* Player cards carousel */}
      <div className="flex justify-center flex-wrap md:flex-nowrap w-full gap-4 z-10">
        {currentPlayers.map((player, index) => (
          <div 
            key={`player-${currentPage}-${index}`}
            className="flex-1 min-w-0 md:max-w-xs m-1"
          >
            <div className="w-full rounded-xl bg-slate-800 shadow-lg border border-white/10 overflow-hidden transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl h-full">
              {/* Player Image */}
              <div className="w-full h-36 relative overflow-hidden rounded-t-xl bg-black flex justify-center items-start">
                <img 
                  src={player.Faceurl || '/placeholder-player.png'} 
                  alt={player.Name || 'Player'}
                  className="w-full h-full object-contain object-center-top"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = '/placeholder-player.png';
                  }}
                />
              </div>
              
              {/* Player Details */}
              <div className="p-4">
                <h2 className="text-white font-bold mb-3 pb-2 border-b border-white/10 overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {player.Name || 'Unknown Player'}
                </h2>
                
                <div className="flex items-center mb-2">
                  <span className="bg-white/10 text-white text-xs font-semibold px-2 py-1 rounded mr-2">
                    {player.position || '—'}
                  </span>
                  <span className="text-white/70 text-sm">
                    {player.club_name || 'Free Agent'}
                  </span>
                </div>
                
                <div className="mt-4">
                  <div className="flex mb-1">
                    <span className="text-white/70 inline-block w-20 text-sm">Age:</span>
                    <span className="text-white font-semibold text-sm">{player.Age || '—'}</span>
                  </div>
                  
                  <div className="flex mb-1">
                    <span className="text-white/70 inline-block w-20 text-sm">Overall:</span>
                    <span className={`font-bold text-sm ${getRatingColor(player.Overall)}`}>
                      {player.Overall || '—'}
                    </span>
                  </div>
                  
                  <div className="flex mb-1">
                    <span className="text-white/70 inline-block w-20 text-sm">Potential:</span>
                    <span className={`font-bold text-sm ${getPotentialColor(player.Potential)}`}>
                      {player.Potential || '—'}
                    </span>
                  </div>
                  
                  <div className="flex">
                    <span className="text-white/70 inline-block w-20 text-sm">Growth:</span>
                    <span className="text-green-600 font-bold text-sm">
                      +{player.Potential - player.Overall || '—'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination dots */}
      <div className="flex justify-center mt-6 z-10">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={`page-dot-${index}`}
            onClick={() => setCurrentPage(index)}
            className={`w-2.5 h-2.5 rounded-full mx-1 transition-all cursor-pointer ${
              currentPage === index ? 'bg-blue-600' : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}