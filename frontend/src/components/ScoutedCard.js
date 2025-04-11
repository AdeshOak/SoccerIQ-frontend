import React from "react";

const ScoutedPlayerCard = ({ player }) => {
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
    <div className="w-full max-w-xs rounded-xl bg-slate-800 shadow-lg border border-white/10 overflow-hidden transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl">
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
  );
};

export default ScoutedPlayerCard;