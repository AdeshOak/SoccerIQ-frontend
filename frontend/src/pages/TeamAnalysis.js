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







      
      
      
      
      
      




      const content1 = `As graph shows most of the goals are scored during the last 5 minutes of the game. Team tries to push aggressively. We can also notice a spike just before the half time.`
      const content2 =`Around the half time there are a lot of substitutions and we start seeing more and more substitution towards the end. `;
      const content3 =`We can see from the graph that team begins to be aggressive towards the end of the game and this results in a red card.`;
      const content4 =`Yellow card have a similar trend like red cards which significantly increases during the end of the match. But unlike red cards yellow card are received during the entire match. They might be relatively less than the onces scored at the end but this helps us in understanding the aggregation of the team.`;


    const [team,setTeam] = useState('')
    const handleTeamSelection = (event, value) => {
            setTeam(value)
            console.log(value); // logs the selected value
          }

    async function handleClick(){
            // Handle button click here
  



            
            console.log("SElected team is :", team)
            
            
            const data={
              'team': team};
            const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';

            
            axios.post('${backendUrl}/feature1', data)
            .then(response => {
              console.log(response.data)
              setgraph1x(response.data.grpah1.data);
              setgraph1y(response.data.grpah1.labels);

              setgraph2x(response.data.graph2.data);
              setgraph2y(response.data.graph2.labels);
            
              setgraph3x(response.data.graph3.data);
              setgraph3y(response.data.graph3.labels);

              setgraph4x(response.data.graph4.data);
              setgraph4y(response.data.graph4.labels);


            })
            .catch(error => {
              console.log(error);
            });









            console.log("Button clicked!");
          }
    

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
      
    </Box >
    </div>
</div>
   

    {/* First Plot*/}
    <div style={{marginTop:'20px',padding:'10px'}}>
    <Divider>
        <Chip color="success" size="medium" startDecorator={<SportsScoreIcon/>} sx={{width:'200px',borderRadius:'30px',fontSize:'1.2rem',padding:'5px'}}>
          Goals
        </Chip>
      </Divider>
  <Box sx={{ marginLeft:'45px',marginTop:'10px',display: 'flex', flexDirection: 'row', gap: 2 ,width:'1300px',padding:'2em'}}>
    <LineChart chartLabel={"Goals"}  labels={graph1y} data={graph1x} color={'green'} sx={{margin:'50px',width:'50%'}}/>
    <Divider orientation="vertical"></Divider>
    <div style={{width:'600px',marginTop:'300px'}}>
  {content1}
  </div>
  </Box>
</div>



{/* Second Plot*/}
<div style={{marginTop:'60px'}}>
<Divider>
        <Chip  color="primary" size="medium" startDecorator={<TransformIcon/>} sx={{width:'200px',borderRadius:'30px',fontSize:'1.2rem',padding:'5px'}}>
          Substitutions
        </Chip>
      </Divider>
  <Box sx={{ marginLeft:'45px',marginTop:'10px',display: 'flex', flexDirection: 'row', gap: 2 ,width:'1300px',padding:'2em'}}>
  <div style={{width:'600px'}}>
  <div style={{width:'600px',marginTop:'100px'}}>
  {content2}
  </div>
  </div>
    <Divider orientation="vertical"></Divider>
    
    <LineChart chartLabel={"Substitutions"}  labels={graph2y} data={graph2x} color={'blue'}sx={{margin:'50px',width:'50%'}}/>
  </Box>
</div>



{/* Third Plot*/}
<div style={{marginTop:'60px'}}>


<Divider>
        <Chip color="danger" size="medium" startDecorator={<DangerousIcon/>} sx={{width:'200px',borderRadius:'30px',fontSize:'1.2rem',padding:'5px'}}>
          Red Cards
        </Chip>
      </Divider>
  <Box sx={{ marginLeft:'45px',marginTop:'10px',display: 'flex', flexDirection: 'row', gap: 2 ,width:'1300px',padding:'2em'}}>
    <LineChart chartLabel={"Red Cards"}  labels={graph3y} data={graph3x}  sx={{margin:'50px',width:'50%'}}/>
    <Divider orientation="vertical"></Divider>
    <div style={{width:'600px',marginTop:'100px'}}>
  {content3}
  </div>
  </Box>
</div>



{/* Fourth Plot*/}
<div style={{marginTop:'60px',marginBottom:'35px'}}>

<Divider>
        <Chip  color="warning" size="medium" startDecorator={<WarningAmberIcon/>} sx={{width:'200px',borderRadius:'30px',fontSize:'1.2rem',padding:'5px'}}>
          Yellow Cards
        </Chip>
      </Divider>
  <Box sx={{ marginLeft:'45px',marginTop:'10px',display: 'flex', flexDirection: 'row', gap: 2 ,width:'1300px',padding:'2em'}}>
    <div style={{width:'600px'}}>
    <div style={{width:'600px',marginTop:'100px'}}>
  {content4}
  </div>
  </div>
    <Divider orientation="vertical"></Divider>
    
    <LineChart chartLabel={"Yellow Cards"}  labels={graph4y} data={graph4x} color={'orange'} sx={{margin:'50px',width:'50%'}}/>
  </Box>
</div>

            
        </div>
        
    )
}

export default TeamAnalysis;