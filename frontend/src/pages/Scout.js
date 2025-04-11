import React, { useState } from 'react';
import { Box, Grid, Typography, Slider, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import Button from '@mui/joy/Button';
import axios from 'axios';
import ScoutedCardGrid from '../components/ScoutCardGrid';
import stadiumBg from './feature4-bg.jpeg'; // Assuming you'll replace with a high-quality stadium image

const Scout = () => {
  const [value, setValue] = useState(30);
  const [showData, setShowData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [players, setPlayers] = useState([]);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
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

  // Formation pattern for player cards [3,3,3,1]
  const integerArray = [3, 3, 3, 1];

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.85)), url(${stadiumBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        pt: 2,
        pb: 8,
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          px: { xs: 2, md: 4 }
        }}
      >
        {/* Header Section */}
        <Typography 
          variant="h2" 
          sx={{ 
            textAlign: 'center', 
            color: 'white', 
            fontWeight: 700,
            mb: 6,
            mt: 4,
            fontSize: { xs: '2rem', md: '3rem' }
          }}
        >
          Scout Talent
        </Typography>

        {/* Search Interface */}
        <Box 
          sx={{
            bgcolor: 'rgba(17, 25, 40, 0.75)',
            backdropFilter: 'blur(16px)',
            borderRadius: 3,
            border: '1px solid rgba(255, 255, 255, 0.125)',
            p: 4,
            mb: 6,
            maxWidth: 800,
            mx: 'auto',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
          }}
        >
          <Typography variant="h4" sx={{ color: 'white', mb: 4, fontWeight: 600 }}>
            Set Player Rating
          </Typography>
          
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={9}>
              <Slider
                value={typeof value === 'number' ? value : 0}
                onChange={handleSliderChange}
                aria-labelledby="player-rating-slider"
                min={0}
                max={100}
                step={1}
                sx={{
                  color: '#3B82F6',
                  height: 8,
                  '& .MuiSlider-thumb': {
                    height: 24,
                    width: 24,
                    backgroundColor: '#fff',
                    border: '2px solid #3B82F6',
                    '&:focus, &:hover, &.Mui-active': {
                      boxShadow: '0 0 0 8px rgba(59, 130, 246, 0.16)',
                    },
                  },
                  '& .MuiSlider-track': {
                    height: 8,
                    borderRadius: 4,
                  },
                  '& .MuiSlider-rail': {
                    height: 8,
                    borderRadius: 4,
                    opacity: 0.28,
                  },
                }}
              />
            </Grid>
            
            <Grid item xs={6} md={3}>
              <TextField
                value={value}
                onChange={handleInputChange}
                onBlur={handleBlur}
                inputProps={{
                  step: 1,
                  min: 0,
                  max: 100,
                  type: 'number',
                  'aria-labelledby': 'player-rating-slider',
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.23)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3B82F6',
                    },
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  },
                  '& .MuiInputBase-input': {
                    textAlign: 'center',
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                  },
                  width: '100%',
                }}
              />
            </Grid>

            <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
              <Button
                onClick={handleSearchClick}
                disabled={isLoading}
                endDecorator={<Search />}
                size="lg"
                sx={{
                  bgcolor: '#3B82F6',
                  color: 'white',
                  px: 6,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  '&:hover': {
                    bgcolor: '#2563EB',
                  },
                  '&.Mui-disabled': {
                    bgcolor: 'rgba(59, 130, 246, 0.5)',
                  },
                  borderRadius: '8px',
                  textTransform: 'none',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                }}
              >
                {isLoading ? 'Scouting...' : 'Scout'}
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Results Section */}
        {showData && (
          <Box sx={{ mt: 4, width: '100%' }}>
            <Typography 
              variant="h4" 
              sx={{ 
                color: 'white', 
                mb: 4, 
                fontWeight: 600,
                textAlign: 'center'
              }}
            >
              Scout Results
            </Typography>
            <ScoutedCardGrid tactic={integerArray} data={players} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Scout;