import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, TextField, Box } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useSpring, animated } from 'react-spring';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TeamAnalysis = () => {
  const [data, setData] = useState([]);
  const [team, setTeam] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Animation setup
  const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 1000 } });

  // Fetch data on team selection
  useEffect(() => {
    if (team) {
      setIsLoading(true);
      // Simulating data fetch with a timeout
      setTimeout(() => {
        setData(generateRandomData());  // Replace with your actual data fetching logic
        setIsLoading(false);
      }, 2000);
    }
  }, [team]);

  // Generate random data for demonstration
  const generateRandomData = () => {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const values = Array.from({ length: 7 }, () => Math.floor(Math.random() * 100));

    return {
      labels,
      datasets: [
        {
          label: 'Team Performance',
          data: values,
          borderColor: '#00c6ff',
          backgroundColor: 'rgba(0, 198, 255, 0.2)',
          fill: true,
        },
      ],
    };
  };

  // Graph options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
  };

  return (
    <Box sx={{ backgroundColor: '#f4f6f9', minHeight: '100vh', padding: 4 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
        <Typography variant="h2" sx={{ fontFamily: 'Poppins', fontWeight: 'bold', color: '#333' }}>
          Sports Performance Analyzer
        </Typography>
        <Typography variant="h6" sx={{ color: '#777', fontStyle: 'italic' }}>
          Analyze your team's performance over time with dynamic graphs.
        </Typography>
      </Box>

      {/* Team Selection */}
      <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
        <TextField
          label="Enter Team Name"
          variant="outlined"
          fullWidth
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          sx={{
            maxWidth: 400,
            borderRadius: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
              backgroundColor: 'white',
              boxShadow: 2,
            },
          }}
        />
        <Button
          sx={{
            marginTop: 2,
            borderRadius: '50px',
            padding: '10px 20px',
            fontSize: '1rem',
            background: 'linear-gradient(to right, #00c6ff, #0072ff)',
            color: 'white',
            transition: 'transform 0.3s ease, background-color 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
              backgroundColor: '#0056b3',
            },
          }}
          onClick={() => setTeam(team)}
          disabled={isLoading}
        >
          Analyze
        </Button>
      </Box>

      {/* Chart Section */}
      {isLoading ? (
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ color: '#555' }}>Loading data...</Typography>
        </Box>
      ) : data.length > 0 ? (
        <animated.div style={fadeIn}>
          <Container>
            <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 3, color: '#333' }}>
              Performance Graph for {team}
            </Typography>
            <Line data={data} options={chartOptions} />
          </Container>
        </animated.div>
      ) : (
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ color: '#555' }}>Please enter a team name to get started.</Typography>
        </Box>
      )}

      {/* Footer */}
      <Box sx={{ textAlign: 'center', marginTop: 6, padding: 4, backgroundColor: '#333', color: 'white' }}>
        <Typography variant="body1">
          © 2025 Sports Performance Analyzer. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default TeamAnalysis;
