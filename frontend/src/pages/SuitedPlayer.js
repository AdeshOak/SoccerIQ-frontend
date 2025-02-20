import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
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
import { motion } from "framer-motion"; // added for animations

const SuitedPlayer = () => {
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

  const dynamicData = [
    {
      name: 'Player 1',
      stat1: 100,
      stat2: 20,
      stat3: 30,
      stat4: 10,
      stat5: 57
    },
    {
      name: 'Player 2',
      stat1: 150,
      stat2: 15,
      stat3: 20,
      stat4: 5,
      stat5: 0
    },
  ];

  const ref = useRef(null);
  
  const handleTeamSelection = (event, value) => {
    setteam_value(value);
  };

  const handleMetricSelection = (event, value) => {
    setmetric(value);
    console.log("Metric set to ", value);
  };

  const handleButtonClick = async () => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
    console.log(backendUrl);
    try {
      axios.post(`${backendUrl}/feature2`, null, {
        params: {
          team_name: team_value,
          sub_feature: metric
        }
      })
      .then(response => {
        console.log(response.data);
        if (metric === 'Most Expected Goals') {
          const names = response.data.result.map(item => item.player);
          setDataList(names);
          const exp = response.data.result.map(item => parseInt(item.expectedGoals));
          setexpected(exp);
          const act = response.data.result.map(item => item.trueGoals);
          setActual(act);
        } else if (metric === 'Best Finisher') {
          const name = response.data.result.map(item => item.player);
          setDataList(name);
          const gd = response.data.result.map(item => Math.abs(item.difference));
          setgoaldiff(gd);
        } else {
          const name = response.data.result.map(item => item.player);
          setDataList(name);
          const ob = response.data.result.map(item => item.n_outbox_shots);
          setobshots(ob);
        }
        const modifiedData = response.data.result.map(item => ({
          ...item,
          difference: Math.abs(item.difference.toFixed(2)),
          expectedGoals: item.expectedGoals.toFixed(2)
        }));
        setItems(modifiedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    } catch (error) {
      console.error('Error occurred while making the request:', error);
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
        return <BarChart labels={dataList} data={goaldiff} ylabel="Goal Difference" />;
      } else if (metric === 'Most Expected Goals') {
        return <GroupedBarChart labels={dataList} actual={actual} expected={expected} ylabel="No Of Goals" />;
      } else if (metric === 'Outside The Box') {
        return <BarChart labels={dataList} data={obshots} ylabel="Shots Outside The Box" />;
      } else {
        return null;
      }
    } else if (content === 'Table') {
      return <TableData data={items} />;
    }
    return null;
  };

  useEffect(() => {
    console.log('Items updated:', items);
  }, [items]);

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

      const text = useTypingEffect('Find Suited Player', 100);

  return (
    <>
      {/* Background section with overlay */}
      <Box
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          position: 'relative'
        }}
      >
        {/* Overlay to darken background for better contrast */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.4)'
          }}
        />
        {/* Animated card container */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ position: 'relative', zIndex: 2 }}
        >
          <Box
            sx={{
              width: { xs: '90%', sm: '375px' },
              mx: { xs: 'auto', sm: 'auto' },
              my: { xs: 4, sm: 8 },
              p: 4,
              border: '2px solid #fff',
              borderRadius: '30px',
              boxShadow: '0px 3px 3px rgba(0, 0, 0, 0.25)',
              backgroundColor: 'rgba(249,249,249,0.9)',
              position: 'relative'
            }}
          >
            <h1 style={{ textAlign: 'center', color: '#333' }}>{text}</h1>
            <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Autocomplete
                placeholder="Choose team"
                options={team.map(team => team.name)}
                autoHighlight
                sx={{
                  width: '100%',
                  height: 40,
                  '& .MuiInputBase-root': { backgroundColor: '#fff' }
                }}
                onChange={handleTeamSelection}
              />
              <Autocomplete
                placeholder="Desired Metric..."
                options={metrics.map(metric => metric.name)}
                autoHighlight
                sx={{
                  width: '100%',
                  height: 40,
                  '& .MuiInputBase-root': { backgroundColor: '#fff' }
                }}
                onChange={handleMetricSelection}
              />
              <Button
                startDecorator={<SearchIcon />}
                sx={{ mt: 2 }}
                onClick={handleButtonClick}
                variant="solid"
                color="primary"
              >
                Search
              </Button>
            </Box>
          </Box>
        </motion.div>
      </Box>

      {/* Content section with responsive layout */}
      <Box
        ref={ref}
        sx={{
          minHeight: '100vh',
          py: 4,
          px: { xs: 2, sm: 4, md: 8 },
          backgroundImage: 'linear-gradient(to bottom, #ffffff, #f0f0f0)'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <RadioGroup
            orientation="horizontal"
            name="justify"
            value={justify}
            onChange={handleContentRadioChange}
            sx={{
              p: 1,
              borderRadius: 2,
              bgcolor: 'neutral.softBg',
              gap: 1,
              '& .MuiRadio-root': { flex: 1 },
            }}
          >
            {['Plot', 'Table'].map(item => (
              <Radio
                key={item}
                color="neutral"
                value={item}
                disableIcon
                label={item}
                variant="plain"
                sx={{
                  px: 2,
                  flex: 1,
                  textAlign: 'center'
                }}
                slotProps={{
                  action: ({ checked }) => ({
                    sx: {
                      ...(checked && {
                        bgcolor: 'background.surface',
                        boxShadow: 'md',
                        '&:hover': { bgcolor: 'background.surface' }
                      })
                    }
                  })
                }}
              />
            ))}
          </RadioGroup>
        </Box>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Box
            sx={{
              width: { xs: '100%', md: '900px' },
              mx: 'auto',
              p: 2,
              border: '1px solid #ccc',
              borderRadius: 2,
              backgroundColor: '#fff'
            }}
          >
            {renderContent()}
          </Box>
        </motion.div>
      </Box>
    </>
  );
};

export default SuitedPlayer;