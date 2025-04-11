import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ScoutedPlayerCard from './ScoutedCard';

const ScoutCardCarousel = ({ players }) => {
  const [currentPage, setCurrentPage] = useState(0);
  
  // If no data is provided
  if (!players || players.length === 0) {
    return (
      <div className="flex justify-center p-6 bg-slate-900/80 backdrop-blur-md rounded-xl border border-white/10">
        <h2 className="text-white text-xl font-semibold">No players found matching your criteria</h2>
      </div>
    );
  }
  
  // Number of cards per page
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

  return (
    <div className="flex flex-col items-center w-full max-w-6xl mx-auto rounded-xl p-6 relative bg-slate-900/70 backdrop-blur-md border border-white/10 shadow-xl">
      {/* Soccer field visual background */}
      <div className="absolute inset-0 opacity-10 bg-cover bg-center z-0" style={{ backgroundImage: 'url(/field-background.png)' }} />
      
      {/* Carousel navigation */}
      <div className="flex justify-between items-center w-full mb-8 z-10">
        <div className="flex items-center space-x-2">
          <button
            onClick={prevPage}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextPage}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        
        <h3 className="text-white font-semibold">
          Player {currentPage * cardsPerPage + 1}-{Math.min((currentPage + 1) * cardsPerPage, players.length)} of {players.length}
        </h3>
      </div>
      
      {/* Player cards carousel - Using your ScoutedCard component */}
      <div className="flex justify-center gap-6 w-full z-10">
        {currentPlayers.map((player, index) => (
          <div key={`player-${currentPage}-${index}`} className="flex-1">
            <ScoutedPlayerCard player={player} />
          </div>
        ))}
      </div>
      
      {/* Pagination dots */}
      <div className="flex justify-center mt-8 z-10">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={`page-dot-${index}`}
            onClick={() => setCurrentPage(index)}
            className={`w-3 h-3 rounded-full mx-1.5 transition-all cursor-pointer ${
              currentPage === index ? 'bg-blue-600' : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ScoutCardCarousel;