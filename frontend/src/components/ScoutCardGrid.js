import React from 'react';
import { Box, Typography } from '@mui/material';
import ScoutedPlayerCard from './ScoutedCard';

const ScoutedCardGrid = ({ tactic, data }) => {
  // If no data is provided
  if (!data || data.length === 0) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          p: 4, 
          color: 'white',
          backgroundColor: 'rgba(17, 25, 40, 0.75)',
          borderRadius: 2,
          backdropFilter: 'blur(16px)',
        }}
      >
        <Typography variant="h6">No players found matching your criteria</Typography>
      </Box>
    );
  }

  // Create visual formation of players
  const rows = [];
  let playerIndex = 0;

  // Process each row according to the tactical formation
  tactic.forEach((playersInRow, rowIndex) => {
    if (playerIndex < data.length) {
      // Get players for this row
      const rowPlayers = data.slice(playerIndex, playerIndex + playersInRow);
      playerIndex += playersInRow;

      rows.push(
        <Box 
          key={`row-${rowIndex}`}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            mb: 3,
            width: '100%',
          }}
        >
          {rowPlayers.map((player, index) => (
            <Box 
              key={`player-${rowIndex}-${index}`}
              sx={{ 
                flex: { xs: '1 1 100%', sm: '1 1 45%', md: '0 1 auto' },
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <ScoutedPlayerCard player={player} />
            </Box>
          ))}
        </Box>
      );
    }
  });

  // If there are remaining players not covered by the formation
  if (playerIndex < data.length) {
    const remainingPlayers = data.slice(playerIndex);
    
    rows.push(
      <Box 
        key="remaining-players"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          width: '100%',
        }}
      >
        {remainingPlayers.map((player, index) => (
          <Box 
            key={`player-extra-${index}`}
            sx={{ 
              flex: { xs: '1 1 100%', sm: '1 1 45%', md: '0 1 auto' },
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <ScoutedPlayerCard player={player} />
          </Box>
        ))}
      </Box>
    );
  }

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '1200px',
        mx: 'auto',
        //backgroundImage: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.4) 0%, rgba(15, 23, 42, 0.7) 100%)',
        //backdropFilter: 'blur(10px)',
        borderRadius: 4,
        p: 3,
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      
      {/* Player cards arranged in formation */}
      {rows}
    </Box>
  );
};

export default ScoutedCardGrid;