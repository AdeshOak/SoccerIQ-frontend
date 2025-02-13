import React,{useRef,useEffect, useState} from "react"
import Autocomplete from '@mui/joy/Autocomplete';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Divider from '@mui/joy/Divider';
import Chip from '@mui/joy/Chip';
import Input from '@mui/joy/Input';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Button from '@mui/joy/Button';
import BarChart from "../BarChart";
import LineChart from "../LineChart";
import axios from 'axios'

//icons for chips
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import TransformIcon from '@mui/icons-material/Transform';
import DangerousIcon from '@mui/icons-material/Dangerous';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

//Importing background image
import backgroundImage from './feature1bg.jpeg';

//importing css file 
import "./TeamAnalysis.css";






const TeamAnalysis = () =>{

    const [graph1x, setgraph1x] = useState([])
    const [graph1y, setgraph1y] = useState([])


    const [graph2x, setgraph2x] = useState([])
    const [graph2y, setgraph2y] = useState([])

    const [graph3x, setgraph3x] = useState([])
    const [graph3y, setgraph3y] = useState([])

    const [graph4x, setgraph4x] = useState([])
    const [graph4y, setgraph4y] = useState([])


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







      
      
      
      
      



    const [loading, setLoading] = useState(false); 
    const [team,setTeam] = useState('')
    const handleTeamSelection = (event, value) => {
            setTeam(value)
            console.log(value); // logs the selected value
          }

          const handleClick = async () => {
            console.log("Selected team is:", team);
    
            const data = { 'team': team };
            const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
            console.log(backendUrl);
            setLoading(true);
    
            try {
                const response = await axios.post(`${backendUrl}/feature1`, data);
                console.log(response.data);
                setgraph1x(response.data.graph1.data);
                setgraph1y(response.data.graph1.labels);
                setgraph2x(response.data.graph2.data);
                setgraph2y(response.data.graph2.labels);
                setgraph3x(response.data.graph3.data);
                setgraph3y(response.data.graph3.labels);
                setgraph4x(response.data.graph4.data);
                setgraph4y(response.data.graph4.labels);
            } catch (error) {
                console.error("Error fetching data from backend:", error);
            }
            finally {
              // Set loading state to false once data is fetched or an error occurs
              setLoading(false);
            }
            //console.log("Button clicked!");
        };


        const generateInsight = (graph, label) => {
            // Assume graph.x holds the minute-by-minute data values.
            const data = graph.x;
            if (!data || data.length === 0) return `No data available for ${label}.`;
          
            // Calculate overall max and min values with their corresponding minutes.
            const maxVal = Math.max(...data);
            const minVal = Math.min(...data);
            const maxIndex = data.indexOf(maxVal);
            const minIndex = data.indexOf(minVal);
          
            let insights = [];
            insights.push(`1. Highest: ${label} peaked at ${maxVal} at minute ${maxIndex}.`);
            insights.push(`2. Lowest: ${label} had the lowest value of ${minVal} at minute ${minIndex}.`);
          
            // For red cards, only generate the first two insights.
            if (label.toLowerCase().includes('red card')) {
              return insights.join('\n');
            }
          
            // --- Time Chunk Analysis ---
            // We assume that each index in the data array corresponds to a minute.
            // We divide the game (assumed to be 90 minutes) into chunks of 30 minutes each.
            // If extra minutes after 90 are less than 30, include them in the last chunk.
            // Otherwise, create an additional segment.
            const totalMinutes = data.length;
            let chunks = [];
          
            if (totalMinutes <= 30) {
              // Only one segment available.
              chunks.push({ start: 0, end: totalMinutes - 1 });
            } else if (totalMinutes <= 60) {
              // Two segments: first 30 minutes and the rest.
              chunks.push({ start: 0, end: 29 });
              chunks.push({ start: 30, end: totalMinutes - 1 });
            } else if (totalMinutes <= 90) {
              // Three segments: 0-29, 30-59, and 60 to end.
              chunks.push({ start: 0, end: 29 });
              chunks.push({ start: 30, end: 59 });
              chunks.push({ start: 60, end: totalMinutes - 1 });
            } else {
              // More than 90 minutes.
              const extra = totalMinutes - 90;
              if (extra < 30) {
                // Extra minutes are less than 30: merge with the third chunk.
                chunks.push({ start: 0, end: 29 });
                chunks.push({ start: 30, end: 59 });
                chunks.push({ start: 60, end: totalMinutes - 1 });
              } else {
                // Extra minutes form a new segment.
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
          

  // Compute insights based on the loaded data
  const content1 = !loading && graph1x.length > 0 ? generateInsight("Goals", graph1x) : "";
  const content2 = !loading && graph2x.length > 0 ? generateInsight("Substitutions", graph2x) : "";
  const content3 = !loading && graph3x.length > 0 ? generateInsight("Red Cards", graph3x) : "";
  const content4 = !loading && graph4x.length > 0 ? generateInsight("Yellow Cards", graph4x) : "";


    return(
        <div>

<div style={{ 
    backgroundImage: `url(${backgroundImage})`, 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    height: '50vh',
    }}>
    <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
    }}>


            {/*  THIS IS THE TOP SEARCH BOX */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' , margin: '5rem',marginLeft:'20rem',borderRadius:10,width:'800px',zIndex:1,backgroundColor: 'white', // add white background
    boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)', // add shadow
    border: '2px solid black'}}>
        <h1 style={{marginTop:'1rem',marginLeft:'18rem'}}>Team Analysis</h1>
        <p style={{marginTop:'1rem',marginLeft:'10rem'}}> Select a team from the drop-down and analyze it's key metrics</p>
            <Autocomplete
        placeholder="Choose team"
        options={teams.map((team) => team.name)}
        autoHighlight
        sx={{ width: 300 , margin:4}}
        onChange={handleTeamSelection}
    />
    <Button variant="soft" endDecorator={<KeyboardArrowRight />} color="success"
    sx={{ width: 300 , margin:4}}
    onClick={handleClick}>
        Analyze
</Button>

{loading && (
              <div className="loading-overlay">
                <div className="loading-spinner"></div>
                <div className="loading-text">
                  <p>The model is working hard to crunch numbers for you.</p>
                  <p>Hang tight to see the visualizations...</p>
                </div>
              </div>
            )}
          </Box>
        </div>
      </div>

      {/* Render charts only when loading is complete and data is available */}
      {!loading && graph1x.length > 0 && (
        <>
          {/* First Plot - Goals */}
          <div style={{ marginTop: '20px', padding: '10px' }}>
            <Divider>
              <Chip
                color="success"
                size="medium"
                startDecorator={<SportsScoreIcon />}
                sx={{ width: '200px', borderRadius: '30px', fontSize: '1.2rem', padding: '5px' }}
              >
                Goals
              </Chip>
            </Divider>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                justifyContent: 'space-between',
                marginTop: '20px',
              }}
            >
              <LineChart
                chartLabel={"Goals"}
                labels={graph1y}
                data={graph1x}
                color={'green'}
                sx={{ width: '48%' }}
              />
              <div style={{ width: '48%' }}>
                <p>{content1}</p>
              </div>
            </Box>
          </div>

          {/* Second Plot - Substitutions */}
          <div style={{ marginTop: '60px' }}>
            <Divider>
              <Chip
                color="primary"
                size="medium"
                startDecorator={<TransformIcon />}
                sx={{ width: '200px', borderRadius: '30px', fontSize: '1.2rem', padding: '5px' }}
              >
                Substitutions
              </Chip>
            </Divider>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                justifyContent: 'space-between',
                marginTop: '20px',
              }}
            >
              <div style={{ width: '48%' }}>
                <p>{content2}</p>
              </div>
              <LineChart
                chartLabel={"Substitutions"}
                labels={graph2y}
                data={graph2x}
                color={'blue'}
                sx={{ width: '48%' }}
              />
            </Box>
          </div>

          {/* Third Plot - Red Cards */}
          <div style={{ marginTop: '60px' }}>
            <Divider>
              <Chip
                color="danger"
                size="medium"
                startDecorator={<DangerousIcon />}
                sx={{ width: '200px', borderRadius: '30px', fontSize: '1.2rem', padding: '5px' }}
              >
                Red Cards
              </Chip>
            </Divider>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                justifyContent: 'space-between',
                marginTop: '20px',
              }}
            >
              <LineChart
                chartLabel={"Red Cards"}
                labels={graph3y}
                data={graph3x}
                sx={{ width: '48%' }}
              />
              <div style={{ width: '48%' }}>
                <p>{content3}</p>
              </div>
            </Box>
          </div>

          {/* Fourth Plot - Yellow Cards */}
          <div style={{ marginTop: '60px', marginBottom: '35px' }}>
            <Divider>
              <Chip
                color="warning"
                size="medium"
                startDecorator={<WarningAmberIcon />}
                sx={{ width: '200px', borderRadius: '30px', fontSize: '1.2rem', padding: '5px' }}
              >
                Yellow Cards
              </Chip>
            </Divider>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                justifyContent: 'space-between',
                marginTop: '20px',
              }}
            >
              <div style={{ width: '48%' }}>
                <p>{content4}</p>
              </div>
              <LineChart
                chartLabel={"Yellow Cards"}
                labels={graph4y}
                data={graph4x}
                color={'orange'}
                sx={{ width: '48%' }}
              />
            </Box>
          </div>
        </>
      )}
    </div>
  );
};

export default TeamAnalysis;
