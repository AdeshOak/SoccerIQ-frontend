import React, { useState } from "react";
import axios from 'axios';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Autocomplete, 
  TextField, 
  Button, 
  Divider 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LineChart from "../LineChart";
import './TeamAnalysis.css'; 

// Icons
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import TransformIcon from '@mui/icons-material/Transform';
import DangerousIcon from '@mui/icons-material/Dangerous';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Styled components
const HeroSection = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundImage: 'url("/images/stadium-bg-dark.jpg")', // Make sure to add this image to your public folder
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '60vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1,
  },
}));

const SearchContainer = styled(Card)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  width: '100%',
  maxWidth: 800,
  backgroundColor: 'rgba(22, 28, 36, 0.95)',
  backdropFilter: 'blur(6px)',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
}));

const MetricCard = styled(Card)(({ theme, color }) => ({
  backgroundColor: 'rgba(22, 28, 36, 0.95)',
  backdropFilter: 'blur(6px)',
  borderRadius: '16px',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
  height: '100%',
  overflow: 'hidden',
  border: '1px solid rgba(255, 255, 255, 0.05)',
}));

const MetricHeader = styled('div')(({ theme, color }) => ({
  padding: '16px 24px',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  backgroundColor: color,
}));

const ChartContainer = styled('div')({
  padding: '24px',
  height: '300px',
});

const InsightContainer = styled('div')({
  padding: '24px',
  backgroundColor: 'rgba(255, 255, 255, 0.02)',
});

const LoadingOverlay = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
  flexDirection: 'column',
});

const StyledButton = styled(Button)({
  backgroundColor: '#4FC3F7', // Match the blue from the Player search page
  borderRadius: '8px',
  padding: '10px 24px',
  '&:hover': {
    backgroundColor: '#3DB1E8', // Slightly darker on hover
  },
});

const TeamAnalysis = () => {
  const [graph1x, setGraph1x] = useState([]);
  const [graph1y, setGraph1y] = useState([]);
  const [graph2x, setGraph2x] = useState([]);
  const [graph2y, setGraph2y] = useState([]);
  const [graph3x, setGraph3x] = useState([]);
  const [graph3y, setGraph3y] = useState([]);
  const [graph4x, setGraph4x] = useState([]);
  const [graph4y, setGraph4y] = useState([]);
  const [loading, setLoading] = useState(false);
  const [team, setTeam] = useState(null);
  const [displayData, setDisplayData] = useState(false);

  // Team options - kept from original code
  const teams = [
    { name: 'Hamburg SV' },
    { name: 'Borussia Dortmund' },
    { name: 'FC Augsburg' },
    { name: 'SC Freiburg' },
    { name: 'Werder Bremen' },
    { name: 'Kaiserslautern' },
    { name: 'Lorient' },
    { name: 'Paris Saint-Germain' },
    { name: 'Valenciennes' },
    { name: 'Caen' },
    { name: 'Nurnberg' },
    { name: 'Hertha Berlin' },
    { name: 'Brest' },
    { name: 'Evian Thonon Gaillard' },
    { name: 'AC Ajaccio' },
    { name: 'Toulouse' },
    { name: 'Nice' },
    { name: 'Lyon' },
    { name: 'VfL Wolfsburg' },
    { name: 'FC Cologne' },
    { name: 'Lille' },
    { name: 'AS Nancy Lorraine' },
    { name: 'Montpellier' },
    { name: 'AJ Auxerre' },
    { name: 'Schalke 04' },
    { name: 'VfB Stuttgart' },
    { name: 'TSG Hoffenheim' },
    { name: 'Hannover 96' },
    { name: 'Marseille' },
    { name: 'Sochaux' },
    { name: 'Bordeaux' },
    { name: 'St Etienne' },
    { name: 'Dijon FCO' },
    { name: 'Stade Rennes' },
    { name: 'Mainz' },
    { name: 'Bayer Leverkusen' },
    { name: 'Bayern Munich' },
    { name: 'Borussia Monchengladbach' },
    { name: 'Sporting Gijon' },
    { name: 'Real Sociedad' },
    { name: 'Valencia' },
    { name: 'Racing Santander' },
    { name: 'Real Zaragoza' },
    { name: 'Real Madrid' },
    { name: 'Sevilla' },
    { name: 'Malaga' },
    { name: 'Rayo Vallecano' },
    { name: 'Athletic Bilbao' },
    { name: 'Getafe' },
    { name: 'Levante' },
    { name: 'Atletico Madrid' },
    { name: 'Osasuna' },
    { name: 'Mallorca' },
    { name: 'Espanyol' },
    { name: 'Barcelona' },
    { name: 'Villarreal' },
    { name: 'Lazio' },
    { name: 'AC Milan' },
    { name: 'Cesena' },
    { name: 'Napoli' },
    { name: 'Palermo' },
    { name: 'Internazionale' },
    { name: 'Chievo Verona' },
    { name: 'Novara' },
    { name: 'Juventus' },
    { name: 'Parma' },
    { name: 'Real Betis' },
    { name: 'Udinese' },
    { name: 'Lecce' },
    { name: 'Siena' },
    { name: 'Catania' },
    { name: 'AS Roma' },
    { name: 'Cagliari' },
    { name: 'Fiorentina' },
    { name: 'Bologna' },
    { name: 'Atalanta' },
    { name: 'Genoa' },
    { name: 'Granada' },
    { name: 'Stade de Reims' },
    { name: 'Celta Vigo' },
    { name: 'Troyes' },
    { name: 'Bastia' },
    { name: 'Deportivo La Coruna' },
    { name: 'Real Valladolid' },
    { name: 'SpVgg Greuther Furth' },
    { name: 'Fortuna Dusseldorf' },
    { name: 'Eintracht Frankfurt' },
    { name: 'Torino' },
    { name: 'Sampdoria' },
    { name: 'US Pescara' },
    { name: 'AS Monaco' },
    { name: 'Guingamp' },
    { name: 'Nantes' },
    { name: 'Almeria' },
    { name: 'Elche' },
    { name: 'Hellas Verona' },
    { name: 'Sassuolo' },
    { name: 'Livorno' },
    { name: 'TSV Eintracht Braunschweig' },
    { name: 'Aston Villa' },
    { name: 'Hull' },
    { name: 'Fulham' },
    { name: 'Stoke City' },
    { name: 'Sunderland' },
    { name: 'Manchester Utd' },
    { name: 'Liverpool' },
    { name: 'Crystal Palace' },
    { name: 'Manchester City' },
    { name: 'Everton' },
    { name: 'Newcastle' },
    { name: 'Cardiff' },
    { name: 'West Brom' },
    { name: 'Arsenal' },
    { name: 'West Ham' },
    { name: 'Tottenham' },
    { name: 'Chelsea' },
    { name: 'Norwich City' },
    { name: 'Swansea' },
    { name: 'Southampton' },
    { name: 'Metz' },
    { name: 'Lens' },
    { name: 'QPR' },
    { name: 'Leicester City' },
    { name: 'Burnley' },
    { name: 'SC Paderborn' },
    { name: 'Eibar' },
    { name: 'Cordoba' },
    { name: 'Empoli' },
    { name: 'Bournemouth' },
    { name: 'Watford' },
    { name: 'Angers' },
    { name: 'GFC Ajaccio' },
    { name: 'SV Darmstadt 98' },
    { name: 'FC Ingolstadt 04' },
    { name: 'Las Palmas' },
    { name: 'Frosinone' },
    { name: 'Carpi' },
    { name: 'Middlesbrough' },
    { name: 'Alaves' },
    { name: 'Crotone' },
    { name: 'Leganes' },
    { name: 'RB Leipzig' }
  ];

  const handleTeamSelection = (event, value) => {
    setTeam(value);
  };

  const handleClick = async () => {
    if (!team) return;
    
    setLoading(true);
    const data = { 'team': team };
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
    
    try {
      const response = await axios.post(`${backendUrl}/feature1`, data, {
        timeout: 60000 // Set a longer timeout (60 seconds)
      });
      
      setGraph1x(response.data.graph1.data);
      setGraph1y(response.data.graph1.labels);
      setGraph2x(response.data.graph2.data);
      setGraph2y(response.data.graph2.labels);
      setGraph3x(response.data.graph3.data);
      setGraph3y(response.data.graph3.labels);
      setGraph4x(response.data.graph4.data);
      setGraph4y(response.data.graph4.labels);
      setDisplayData(true);
    } catch (error) {
      console.error("Error fetching data from backend:", error);
      alert("There was an error processing your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Generate insights from data (kept from original)
  const generateInsight = (data, label) => {
    if (!Array.isArray(data) || data.length === 0) {
      return `No data available for ${label}.`;
    }
  
    const maxVal = Math.max(...data);
    const minVal = Math.min(...data);
    const maxIndex = data.indexOf(maxVal);
    const minIndex = data.indexOf(minVal);
  
    let insights = [];
    insights.push(`1. Highest: ${label} peaked at ${maxVal} at minute ${maxIndex}.`);
    insights.push(`2. Lowest: ${label} had the lowest value of ${minVal} at minute ${minIndex}.`);
  
    if (label.toLowerCase().includes('red card')) {
      return insights.join('\n');
    }
  
    const totalMinutes = data.length;
    let chunks = [];
  
    if (totalMinutes <= 30) {
      chunks.push({ start: 0, end: totalMinutes - 1 });
    } else if (totalMinutes <= 60) {
      chunks.push({ start: 0, end: 29 });
      chunks.push({ start: 30, end: totalMinutes - 1 });
    } else if (totalMinutes <= 90) {
      chunks.push({ start: 0, end: 29 });
      chunks.push({ start: 30, end: 59 });
      chunks.push({ start: 60, end: totalMinutes - 1 });
    } else {
      const extra = totalMinutes - 90;
      if (extra < 30) {
        chunks.push({ start: 0, end: 29 });
        chunks.push({ start: 30, end: 59 });
        chunks.push({ start: 60, end: totalMinutes - 1 });
      } else {
        chunks.push({ start: 0, end: 29 });
        chunks.push({ start: 30, end: 59 });
        chunks.push({ start: 60, end: 89 });
        chunks.push({ start: 90, end: totalMinutes - 1 });
      }
    }
  
    insights.push("3. Time Chunk Analysis:");
    chunks.forEach((chunk, index) => {
      const segment = data.slice(chunk.start, chunk.end + 1);
      const segMax = Math.max(...segment);
      const segMin = Math.min(...segment);
      insights.push(
        `- Chunk ${index + 1} (Minute ${chunk.start} to Minute ${chunk.end}): ${label} ranged between ${segMin} and ${segMax}.`
      );
    });
  
    return insights.join('\n');
  };

  const content1 = !loading && graph1x.length > 0 ? generateInsight(graph1x, "Goals") : "";
  const content2 = !loading && graph2x.length > 0 ? generateInsight(graph2x, "Substitutions") : "";
  const content3 = !loading && graph3x.length > 0 ? generateInsight(graph3x, "Red Cards") : "";
  const content4 = !loading && graph4x.length > 0 ? generateInsight(graph4x, "Yellow Cards") : "";

  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundColor: '#0A1929',
      color: '#fff',
    }}>
      {/* Hero Section with Search */}
      <HeroSection>
        <SearchContainer>
          <CardContent sx={{ p: 4 }}>
            <Typography 
              variant="h3" 
              component="h1" 
              align="center" 
              gutterBottom 
              sx={{ 
                fontWeight: 700,
                color: '#4FC3F7' // Light blue color to match the Player page
              }}
            >
              Team Analysis
            </Typography>
            <Typography 
            variant="body1" 
            align="center" 
            sx={{ 
              color: '#FFFFFF', // Full white instead of opacity 0.7
              mb: 4 
            }}
          >
            Select a team from the drop-down and analyze its key metrics
          </Typography>
            
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={8}>
                <Autocomplete
                  options={teams.map(team => team.name)}
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      label="Choose team" 
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: '8px',
                          '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: 'rgba(255, 255, 255, 0.7)',
                        },
                        '& .MuiInputBase-input': {
                          color: 'white',
                        },
                      }}
                    />
                  )}
                  onChange={handleTeamSelection}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <StyledButton 
                  fullWidth 
                  variant="contained" 
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  onClick={handleClick}
                >
                  Analyze
                </StyledButton>
              </Grid>
            </Grid>
          </CardContent>
        </SearchContainer>
      </HeroSection>

      {/* Loading Overlay */}
      {loading && (
  <LoadingOverlay>
  <div style={{ 
    border: '8px solid rgba(255, 255, 255, 0.3)',
    borderTop: '8px solid #4FC3F7',
    borderRadius: '50%',
    width: '80px',
    height: '80px',
    animation: 'spin 1.5s linear infinite',
    WebkitAnimation: 'spin 1.5s linear infinite', // Add webkit prefix
    marginBottom: '20px'
  }} />
    <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
      The model is working hard to crunch numbers for you.
    </Typography>
    <Typography variant="body1" sx={{ color: 'white' }}>
      Hang tight to see the visualizations...
    </Typography>
  </LoadingOverlay>
)}

      {/* Charts Section */}
      {displayData && !loading && graph1x.length > 0 && (
        <Container maxWidth="xl" sx={{ py: 6 }}>
          <Grid container spacing={4}>
            {/* Goals Card */}
            <Grid item xs={12}>
              <MetricCard>
                <MetricHeader color="rgba(46, 125, 50, 0.9)">
                  <SportsScoreIcon sx={{ fontSize: 28 }} />
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                    Goals
                  </Typography>
                </MetricHeader>
                <Grid container>
                  <Grid item xs={12} md={6}>
                    <ChartContainer>
                      <LineChart
                        chartLabel={"Goals"}
                        labels={graph1y}
                        data={graph1x}
                        color={'#4CAF50'}
                      />
                    </ChartContainer>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InsightContainer>
                      <Typography
                        component="pre"
                        sx={{
                          whiteSpace: 'pre-wrap',
                          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                          fontSize: '1rem',
                          lineHeight: 1.8,
                          color: 'rgba(255, 255, 255, 0.8)'
                        }}
                      >
                        {content1}
                      </Typography>
                    </InsightContainer>
                  </Grid>
                </Grid>
              </MetricCard>
            </Grid>

            {/* Substitutions Card */}
            <Grid item xs={12}>
              <MetricCard>
                <MetricHeader color="rgba(25, 118, 210, 0.9)">
                  <TransformIcon sx={{ fontSize: 28 }} />
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                    Substitutions
                  </Typography>
                </MetricHeader>
                <Grid container>
                  <Grid item xs={12} md={6}>
                    <InsightContainer>
                      <Typography
                        component="pre"
                        sx={{
                          whiteSpace: 'pre-wrap',
                          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                          fontSize: '1rem',
                          lineHeight: 1.8,
                          color: 'rgba(255, 255, 255, 0.8)'
                        }}
                      >
                        {content2}
                      </Typography>
                    </InsightContainer>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <ChartContainer>
                      <LineChart
                        chartLabel={"Substitutions"}
                        labels={graph2y}
                        data={graph2x}
                        color={'#2196F3'}
                      />
                    </ChartContainer>
                  </Grid>
                </Grid>
              </MetricCard>
            </Grid>

            {/* Red Cards Card */}
            <Grid item xs={12} md={6}>
              <MetricCard>
                <MetricHeader color="rgba(211, 47, 47, 0.9)">
                  <DangerousIcon sx={{ fontSize: 28 }} />
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                    Red Cards
                  </Typography>
                </MetricHeader>
                <ChartContainer>
                  <LineChart
                    chartLabel={"Red Cards"}
                    labels={graph3y}
                    data={graph3x}
                    color={'#F44336'}
                  />
                </ChartContainer>
                <InsightContainer>
                  <Typography
                    component="pre"
                    sx={{
                      whiteSpace: 'pre-wrap',
                      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                      fontSize: '1rem',
                      lineHeight: 1.8,
                      color: 'rgba(255, 255, 255, 0.8)'
                    }}
                  >
                    {content3}
                  </Typography>
                </InsightContainer>
              </MetricCard>
            </Grid>

            {/* Yellow Cards Card */}
            <Grid item xs={12} md={6}>
              <MetricCard>
                <MetricHeader color="rgba(237, 108, 2, 0.9)">
                  <WarningAmberIcon sx={{ fontSize: 28 }} />
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                    Yellow Cards
                  </Typography>
                </MetricHeader>
                <ChartContainer>
                  <LineChart
                    chartLabel={"Yellow Cards"}
                    labels={graph4y}
                    data={graph4x}
                    color={'#FF9800'}
                  />
                </ChartContainer>
                <InsightContainer>
                  <Typography
                    component="pre"
                    sx={{
                      whiteSpace: 'pre-wrap',
                      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                      fontSize: '1rem',
                      lineHeight: 1.8,
                      color: 'rgba(255, 255, 255, 0.8)'
                    }}
                  >
                    {content4}
                  </Typography>
                </InsightContainer>
              </MetricCard>
            </Grid>
          </Grid>
        </Container>
      )}
    </Box>
  );
};

export default TeamAnalysis;
