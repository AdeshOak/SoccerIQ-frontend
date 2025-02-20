import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import styled from '@emotion/styled';
import { alpha } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/joy/Box';
import FormLabel from '@mui/joy/FormLabel';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Sheet from '@mui/joy/Sheet';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Button from '@mui/joy/Button';
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/joy/Autocomplete';
import axios from 'axios';
import backgroundImage from './feature2-bg.png';
import { useTypingEffect } from "../hooks/typing-effect";
import BarChart from "../BarChart";
import GroupedBarChart from "../components/GroubedBarChart";
import TableData from "../components/Table";
import FootballPattern from './football-pattern.svg';

// Styled Components
const GlassCard = styled(Sheet)(({ theme }) => ({
  backdropFilter: 'blur(16px)',
  backgroundColor: alpha(theme.palette.background.paper, 0.8),
  borderRadius: '24px',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  transition: 'all 0.3s ease-in-out',
}));

const ResponsiveGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: theme.spacing(4),
  padding: theme.spacing(4),
}));

// Animation Variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const SuitedPlayer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [team_value, setteam_value] = useState('');
  const [metric, setmetric] = useState('');
  const [dataList, setDataList] = useState([]);
  const [actual, setActual] = useState([]);
  const [expected, setexpected] = useState([]);
  const [justify, setJustify] = useState('Plot');
  const [content, setContent] = useState('Plot');
  const [goaldiff, setgoaldiff] = useState([]);
  const [obshots, setobshots] = useState([]);
  const [items, setItems] = useState([]);
  const ref = useRef(null);
  const text = useTypingEffect('Find Suited Player', 100);

  // Original state and handler functions
  const handleTeamSelection = (event, value) => {
    setteam_value(value);
  };

  const handleMetricSelection = (event, value) => {
    setmetric(value);
  };

  const handleButtonClick = async () => {
    // Original API call logic
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
    try {
      const response = await axios.post(`${backendUrl}/feature2`, null, {
        params: { team_name: team_value, sub_feature: metric }
      });
      
      // Process response data
      const modifiedData = response.data.result.map(item => ({
        ...item,
        difference: Math.abs(item.difference?.toFixed(2)),
        expectedGoals: item.expectedGoals?.toFixed(2)
      }));

      // Update state based on metric
      if (metric === 'Most Expected Goals') {
        setDataList(response.data.result.map(item => item.player));
        setexpected(response.data.result.map(item => parseInt(item.expectedGoals)));
        setActual(response.data.result.map(item => item.trueGoals));
      } else if (metric === 'Best Finisher') {
        setDataList(response.data.result.map(item => item.player));
        setgoaldiff(response.data.result.map(item => Math.abs(item.difference)));
      } else if (metric === 'Outside The Box') {
        setDataList(response.data.result.map(item => item.player));
        setobshots(response.data.result.map(item => item.n_outbox_shots));
      }
      
      setItems(modifiedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContentRadioChange = (event) => {
    setJustify(event.target.value);
    setContent(event.target.value);
  };

  const renderContent = () => {
    if (content === 'Plot') {
      if (metric === 'Best Finisher') {
        return <BarChart labels={dataList} data={goaldiff} ylabel={"Goal Difference"} />;
      } else if (metric === 'Most Expected Goals') {
        return <GroupedBarChart labels={dataList} actual={actual} expected={expected} ylabel="No Of Goals" />;
      } else if (metric === 'Outside The Box') {
        return <BarChart labels={dataList} data={obshots} ylabel={"Shots Outside The Box"} />;
      }
    } else if (content === 'Table') {
      return <TableData data={items} />;
    }
    return null;
  };

  // Team and metric options
  const metrics = [
    { name: 'Best Finisher' },
    { name: 'Most Expected Goals' },
    { name: 'Outside The Box' },
  ];

    const team = [
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
      return (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ 
            background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            minHeight: '100vh',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Animated Background Pattern */}
          <motion.div 
            style={{
              position: 'absolute',
              top: -100,
              left: -100,
              width: '50%',
              height: '50%',
              background: `url(${FootballPattern})`,
              opacity: 0.1,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
    
          <ResponsiveGrid>
            {/* Search Card */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5 }}
            >
              <GlassCard
                sx={{
                  p: 4,
                  position: isMobile ? 'static' : 'absolute',
                  top: isMobile ? 'auto' : '50%',
                  transform: isMobile ? 'none' : 'translateY(-50%)',
                  right: isMobile ? 'auto' : theme.spacing(4),
                  width: isMobile ? '100%' : 375,
                }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h1 style={{ 
                    fontSize: isMobile ? '1.5rem' : '2rem',
                    color: theme.palette.text.primary,
                    marginBottom: theme.spacing(4),
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    {text}
                  </h1>
    
                  <Autocomplete
                    placeholder="Choose team"
                    options={team.map((team) => team.name)}
                    onChange={handleTeamSelection}
                    sx={{ width: '100%', mb: 3 }}
                  />
    
                  <Autocomplete
                    placeholder="Desired Metric..."
                    options={metrics.map((metric) => metric.name)}
                    onChange={handleMetricSelection}
                    sx={{ width: '100%', mb: 3 }}
                  />
    
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      fullWidth
                      startDecorator={<SearchIcon />}
                      variant="gradient"
                      size="lg"
                      onClick={handleButtonClick}
                      sx={{
                        background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                        fontWeight: 'bold',
                        letterSpacing: 1.1,
                      }}
                    >
                      Search Players
                    </Button>
                  </motion.div>
                </motion.div>
              </GlassCard>
            </motion.div>
    
            {/* Results Section */}
            <motion.div
              variants={cardVariants}
              style={{ marginTop: isMobile ? theme.spacing(4) : 0 }}
              ref={ref}
            >
              <GlassCard sx={{ p: 4, mt: isMobile ? 4 : 0 }}>
                <Box sx={{ 
                  width: '100%', 
                  maxWidth: 1200,
                  mx: 'auto',
                  overflowX: 'auto'
                }}>
                  <RadioGroup
                    value={justify}
                    onChange={handleContentRadioChange}
                    sx={{
                      flexDirection: isMobile ? 'column' : 'row',
                      gap: 2,
                      mb: 4,
                      '& .MuiRadio-root': {
                        flex: 1,
                        py: 2,
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
                        '&.Mui-checked': {
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          borderColor: theme.palette.primary.main,
                        }
                      }
                    }}
                  >
                    {['Plot', 'Table'].map((item) => (
                      <Radio
                        key={item}
                        color="neutral"
                        value={item}
                        disableIcon
                        label={item}
                        variant="plain"
                        sx={{ px: 2, width: '200px', textAlign: 'center' }}
                      />
                    ))}
                  </RadioGroup>
    
                  <AnimatePresence mode='wait'>
                    <motion.div
                      key={content}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {renderContent()}
                    </motion.div>
                  </AnimatePresence>
                </Box>
              </GlassCard>
            </motion.div>
          </ResponsiveGrid>
        </motion.div>
      );
    };
    
    export default SuitedPlayer;