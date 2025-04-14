import React, { useState, useRef } from "react";
import axios from 'axios';

// MUI Components
import { 
  Box, 
  Button, 
  FormControl,
  Typography,
  Container,
  Grid,
  Paper,
  Autocomplete,
  TextField,
  CircularProgress,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Tabs,
  Tab
} from '@mui/material';

// Icons
import SearchIcon from '@mui/icons-material/Search';

// Components
import BarChart from "../BarChart";
import GroupedBarChart from "../components/GroubedBarChart";
import TableData from "../components/Table";

// Custom Hook
import { useTypingEffect } from "../hooks/typing-effect";

// Create a dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00BCD4', // Cyan for primary actions
    },
    secondary: {
      main: '#FF4081', // Pink for accents
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0BEC5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: 500,
          minWidth: 120,
        },
      },
    },
  },
});

const SuitedPlayer = () => {
  // State management
  const [team, setTeam] = useState('');
  const [metric, setMetric] = useState('');
  const [dataList, setDataList] = useState([]);
  const [actual, setActual] = useState([]);
  const [expected, setExpected] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [goaldiff, setGoalDiff] = useState([]);
  const [obshots, setObShots] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  
  const resultRef = useRef(null);
  
  // Available metrics for selection
  const metrics = [
    { name: 'Best Finisher' },
    { name: 'Most Expected Goals' },
    { name: 'Outside The Box' },
  ];

  // Team list data - use your existing large teams array here
  
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

  // Handle team selection
  const handleTeamChange = (event, value) => {
    setTeam(value);
  };

  // Handle metric selection
  const handleMetricChange = (event, value) => {
    setMetric(value);
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Fetch data from backend
  const handleSearch = async () => {
    if (!team || !metric) {
      return; // Don't proceed if either field is empty
    }

    setIsLoading(true);
    setHasSearched(true);
    
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
    
    try {
      const response = await axios.post(`${backendUrl}/feature2`, null, {
        params: {
          team_name: team,
          sub_feature: metric
        }
      });
      
      // Process data based on metric type
      const result = response.data.result;
      
      if (metric === 'Most Expected Goals') {
        setDataList(result.map(item => item.player));
        setExpected(result.map(item => parseFloat(item.expectedGoals)));
        setActual(result.map(item => item.trueGoals));
      } else if (metric === 'Best Finisher') {
        setDataList(result.map(item => item.player));
        setGoalDiff(result.map(item => Math.abs(item.difference)));
      } else if (metric === 'Outside The Box') {
        setDataList(result.map(item => item.player));
        setObShots(result.map(item => item.n_outbox_shots));
      }
      
      // Format data for table display
      const formattedData = result.map(item => ({
        ...item,
        difference: Math.abs(parseFloat(item.difference)).toFixed(2),
        expectedGoals: parseFloat(item.expectedGoals).toFixed(2)
      }));
      
      setTableData(formattedData);
      
      // Scroll to results after small delay to ensure data is loaded
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
      
    } catch (error) {
      console.error('Error fetching data:', error);
      // Error handling could be improved here
    } finally {
      setIsLoading(false);
    }
  };

  // Render the appropriate content based on selected tab and metric
  const renderContent = () => {
    if (isLoading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 500 }}>
          <CircularProgress color="primary" size={60} />
        </Box>
      );
    }
    
    if (!hasSearched) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
          <Typography variant="body1" color="text.secondary">
            Select a team and metric, then click search to view results
          </Typography>
        </Box>
      );
    }
    
    if (activeTab === 0) { // Plot tab
      if (metric === 'Best Finisher') {
        return <BarChart labels={dataList} data={goaldiff} ylabel="Goal Difference" />;
      } else if (metric === 'Most Expected Goals') {
        return <GroupedBarChart labels={dataList} actual={actual} expected={expected} ylabel="No Of Goals" />;
      } else if (metric === 'Outside The Box') {
        return <BarChart labels={dataList} data={obshots} ylabel="Shots Outside The Box" />;
      }
    } else { // Table tab
      return <TableData data={tableData} />;
    }
    
    return null;
  };

  // Animated header text
  const headerText = useTypingEffect('Find The Perfect Players For Your Team', 100);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          backgroundColor: 'background.default',
          color: 'text.primary',
          paddingTop: { xs: 6, md: 12 },
          paddingBottom: { xs: 10, md: 16 },
          overflow: 'hidden'
        }}
      >
        {/* Background gradient overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(0, 188, 212, 0.2) 0%, rgba(18, 18, 18, 0.9) 100%)',
            zIndex: 1
          }}
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={4} alignItems="center">
            {/* Left side: Title and description */}
            <Grid item xs={12} md={6}>
              <Typography variant="h2" sx={{ fontWeight: 700, mb: 2, color: 'primary.main' }}>
                {headerText}
              </Typography>
              <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
                Discover which players excel in specific metrics for any team using advanced analytics
              </Typography>
            </Grid>
            
            {/* Right side: Search panel */}
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={4} 
                sx={{ 
                  padding: 4, 
                  borderRadius: 2,
                  background: 'rgba(30, 30, 30, 0.85)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: 'primary.main' }}>
                  Find Suited Player
                </Typography>
                
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <Autocomplete
                    id="team-select"
                    options={teams.map(t => t.name)}
                    renderInput={(params) => <TextField {...params} label="Select Team" />}
                    onChange={handleTeamChange}
                    value={team}
                    fullWidth
                  />
                </FormControl>
                
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <Autocomplete
                    id="metric-select"
                    options={metrics.map(m => m.name)}
                    renderInput={(params) => <TextField {...params} label="Select Metric" />}
                    onChange={handleMetricChange}
                    value={metric}
                    fullWidth
                  />
                </FormControl>
                
                <Button 
                  variant="contained"
                  startIcon={<SearchIcon />}
                  onClick={handleSearch}
                  disabled={!team || !metric || isLoading}
                  fullWidth
                  sx={{ 
                    py: 1.5, 
                    backgroundColor: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'primary.dark'
                    }
                  }}
                >
                  {isLoading ? 'Searching...' : 'Search'}
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Results Section */}
      <Box 
        ref={resultRef}
        sx={{ 
          py: 8,
          backgroundColor: 'background.default',
          minHeight: '60vh'
        }}
      >
        <Container maxWidth="lg">
          {hasSearched && (
            <>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ mb: 1, fontWeight: 600, color: 'primary.main' }}>
                  Results for {team}: {metric}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {metric === 'Best Finisher' && 'Players who score more goals than expected based on shot quality'}
                  {metric === 'Most Expected Goals' && 'Players with the highest expected goals compared to actual goals scored'}
                  {metric === 'Outside The Box' && 'Players who take the most shots from outside the penalty area'}
                </Typography>
              </Box>
              
              <Paper 
                elevation={3} 
                sx={{ 
                  borderRadius: 2, 
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                {/* Tabs for Plot/Table toggle */}
                <Tabs 
                  value={activeTab} 
                  onChange={handleTabChange}
                  variant="fullWidth"
                  sx={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    '& .MuiTabs-indicator': {
                      backgroundColor: 'primary.main',
                      height: 3
                    }
                  }}
                >
                  <Tab label="Plot" />
                  <Tab label="Table" />
                </Tabs>
                
                {/* Content area */}
                <Box sx={{ p: { xs: 2, md: 4 }, height: activeTab === 0 ? 'auto' : 'auto' }}>
                  {renderContent()}
                </Box>
              </Paper>
            </>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default SuitedPlayer;

