import React, { useState, useEffect } from "react";
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
import axios from 'axios';

// Icons for chips
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import TransformIcon from '@mui/icons-material/Transform';
import DangerousIcon from '@mui/icons-material/Dangerous';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

// Importing background image
import backgroundImage from './feature1bg.jpeg';

const TeamAnalysis = () => {
    const [team, setTeam] = useState('');
    const [graphs, setGraphs] = useState({
        graph1x: [],
        graph1y: [],
        graph2x: [],
        graph2y: [],
        graph3x: [],
        graph3y: [],
        graph4x: [],
        graph4y: []
    });

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

    const content1 = "Graph shows most of the goals are scored during the last 5 minutes of the game. Team tries to push aggressively. There is a spike just before halftime.";
    const content2 = "Around halftime, many substitutions happen, with a steady increase towards the end.";
    const content3 = "Aggressive behavior towards the end of the game often results in red cards.";
    const content4 = "Yellow cards show a similar trend to red cards but are more evenly distributed throughout the match.";

    const handleTeamSelection = (event, value) => {
        setTeam(value);
        console.log(value); // logs the selected value
    };

    const handleClick = async () => {
        console.log("Selected team is:", team);

        const data = { 'team': team };
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
        console.log(backendUrl);

        try {
            const response = await axios.post(`${backendUrl}/feature1`, data);
            console.log(response.data);
            setGraphs({
                graph1x: response.data.graph1.data,
                graph1y: response.data.graph1.labels,
                graph2x: response.data.graph2.data,
                graph2y: response.data.graph2.labels,
                graph3x: response.data.graph3.data,
                graph3y: response.data.graph3.labels,
                graph4x: response.data.graph4.data,
                graph4y: response.data.graph4.labels
            });
        } catch (error) {
            console.error("Error fetching data from backend:", error);
        }

        console.log("Button clicked!");
    };

    return (
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
                    {/* This is the top search box */}
                    <Box sx={{
                        display: 'flex', gap: 2, flexWrap: 'wrap', margin: '5rem', marginLeft: '20rem',
                        borderRadius: 10, width: '800px', zIndex: 1, backgroundColor: 'white',
                        boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)', border: '2px solid black'
                    }}>
                        <h1 style={{ marginTop: '1rem', marginLeft: '18rem' }}>Team Analysis</h1>
                        <p style={{ marginTop: '1rem', marginLeft: '10rem' }}>Select a team from the drop-down and analyze its key metrics</p>
                        <Autocomplete
                            placeholder="Choose team"
                            options={teams.map((team) => team.name)}
                            autoHighlight
                            sx={{ width: 300, margin: 4 }}
                            onChange={handleTeamSelection}
                        />
                        <Button variant="soft" endDecorator={<KeyboardArrowRight />} color="success"
                            sx={{ width: 300, margin: 4 }}
                            onClick={handleClick}>
                            Analyze
                        </Button>
                    </Box>
                </div>
            </div>

            {/* First Plot */}
            <div style={{ marginTop: '20px', padding: '10px' }}>
                <Divider>
                    <Chip color="success" size="medium" startDecorator={<SportsScoreIcon />} sx={{
                        width: '200px', borderRadius: '30px', fontSize: '1.2rem', padding: '5px'
                    }}>
                        Goals
                    </Chip>
                </Divider>
                <Box sx={{ marginLeft: '45px', marginTop: '10px', display: 'flex', flexDirection: 'row', gap: 2, width: '1300px', padding: '2em' }}>
                    <LineChart chartLabel={"Goals"} labels={graphs.graph1y} data={graphs.graph1x} color={'green'} sx={{ margin: '50px', width: '50%' }} />
                    <Divider orientation="vertical"></Divider>
                    <div style={{ width: '600px', marginTop: '300px' }}>
                        {content1}
                    </div>
                </Box>
            </div>

            {/* Second Plot */}
            <div style={{ marginTop: '60px' }}>
                <Divider>
                    <Chip color="primary" size="medium" startDecorator={<TransformIcon />} sx={{
                        width: '200px', borderRadius: '30px', fontSize: '1.2rem', padding: '5px'
                    }}>
                        Substitutions
                    </Chip>
                </Divider>
                <Box sx={{ marginLeft: '45px', marginTop: '10px', display: 'flex', flexDirection: 'row', gap: 2, width: '1300px', padding: '2em' }}>
                    <LineChart chartLabel={"Substitutions"} labels={graphs.graph2y} data={graphs.graph2x} color={'blue'} sx={{ margin: '50px', width: '50%' }} />
                    <Divider orientation="vertical"></Divider>
                    <div style={{ width: '600px', marginTop: '300px' }}>
                        {content2}
                    </div>
                </Box>
            </div>
{/* Third Plot */}
<div style={{marginTop: '60px'}}>
  <Divider>
    <Chip color="danger" size="medium" startDecorator={<DangerousIcon />} sx={{ width: '200px', borderRadius: '30px', fontSize: '1.2rem', padding: '5px' }}>
      Red Cards
    </Chip>
  </Divider>
  <Box sx={{ marginLeft: '45px', marginTop: '10px', display: 'flex', flexDirection: 'row', gap: 2, width: '1300px', padding: '2em' }}>
    <LineChart chartLabel={"Red Cards"} labels={graphs.graph3y} data={graphs.graph3x} color={'red'} sx={{ margin: '50px', width: '50%' }} />
    <Divider orientation="vertical"></Divider>
    <div style={{ width: '600px', marginTop: '300px' }}>
      {content3}
    </div>
  </Box>
</div>

{/* Fourth Plot */}
<div style={{marginTop: '60px'}}>
  <Divider>
    <Chip color="warning" size="medium" startDecorator={<WarningAmberIcon />} sx={{ width: '200px', borderRadius: '30px', fontSize: '1.2rem', padding: '5px' }}>
      Yellow Cards
    </Chip>
  </Divider>
  <Box sx={{ marginLeft: '45px', marginTop: '10px', display: 'flex', flexDirection: 'row', gap: 2, width: '1300px', padding: '2em' }}>
    <LineChart chartLabel={"Yellow Cards"} labels={graphs.graph4y} data={graphs.graph4x} color={'yellow'} sx={{ margin: '50px', width: '50%' }} />
    <Divider orientation="vertical"></Divider>
    <div style={{ width: '600px', marginTop: '300px' }}>
      {content4}
    </div>
  </Box>
</div>

        </div>
    );
};

export default TeamAnalysis;


