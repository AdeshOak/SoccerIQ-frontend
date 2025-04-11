import React from "react";
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components
const PlayerAvatar = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '140px',
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '12px 12px 0 0',
  backgroundColor: '#111',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
}));

const PlayerImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  objectPosition: 'center top',
});

const StatLabel = styled(Typography)({
  color: 'rgba(255, 255, 255, 0.7)',
  display: 'inline-block',
  width: '80px',
});

const StatValue = styled(Typography)({
  color: 'white',
  fontWeight: 600,
  display: 'inline-block',
});

const ScoutedPlayerCard = ({ player }) => {
  // Function to determine color based on rating
  const getRatingColor = (rating) => {
    if (rating >= 80) return '#16A34A'; // green
    if (rating >= 70) return '#2563EB'; // blue
    if (rating >= 60) return '#CA8A04'; // yellow
    return '#FFFFFF'; // white
  };
  
  const getPotentialColor = (potential) => {
    if (potential >= 85) return '#16A34A'; // green
    if (potential >= 75) return '#2563EB'; // blue
    return '#CA8A04'; // yellow
  };

  return (
    <Card 
      sx={{
        width: '100%',
        maxWidth: '280px',
        height: '100%',
        borderRadius: '12px',
        backgroundColor: '#1E293B',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
        },
        border: '1px solid rgba(255, 255, 255, 0.08)',
        m: 1.5,
      }}
    >
      <PlayerAvatar>
        <PlayerImage 
          src={player.Faceurl || '/placeholder-player.png'} 
          alt={player.Name}
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = '/placeholder-player.png';
          }}
        />
      </PlayerAvatar>
      
      <CardContent sx={{ p: 2 }}>
        <Typography 
          variant="h6" 
          component="h2" 
          sx={{ 
            color: 'white', 
            fontWeight: 700,
            mb: 1.5,
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            pb: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {player.Name || 'Unknown Player'}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Chip 
            label={player.position || '—'} 
            size="small" 
            sx={{ 
              bgcolor: 'rgba(255, 255, 255, 0.08)', 
              color: '#fff',
              mr: 1,
              fontWeight: 600,
            }}
          />
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.9rem'
            }}
          >
            {player.club_name || 'Free Agent'}
          </Typography>
        </Box>
        
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', mb: 0.75 }}>
            <StatLabel variant="body2">Age:</StatLabel>
            <StatValue variant="body2">{player.Age || '—'}</StatValue>
          </Box>
          
          <Box sx={{ display: 'flex', mb: 0.75 }}>
            <StatLabel variant="body2">Overall:</StatLabel>
            <StatValue 
              variant="body2" 
              sx={{ 
                color: getRatingColor(player.Overall),
                fontWeight: 700
              }}
            >
              {player.Overall || '—'}
            </StatValue>
          </Box>
          
          <Box sx={{ display: 'flex', mb: 0.75 }}>
            <StatLabel variant="body2">Potential:</StatLabel>
            <StatValue 
              variant="body2" 
              sx={{ 
                color: getPotentialColor(player.Potential),
                fontWeight: 700
              }}
            >
              {player.Potential || '—'}
            </StatValue>
          </Box>
          
          <Box sx={{ display: 'flex' }}>
            <StatLabel variant="body2">Growth:</StatLabel>
            <StatValue 
              variant="body2" 
              sx={{ 
                color: '#16A34A',
                fontWeight: 700
              }}
            >
              +{player.Potential - player.Overall || '—'}
            </StatValue>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ScoutedPlayerCard;