import React,{useState,useRef} from "react";
import Box from '@mui/joy/Box';
import FormLabel from '@mui/joy/FormLabel';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Sheet from '@mui/joy/Sheet';
import Autocomplete from '@mui/joy/Autocomplete';
import Fab from '@mui/material/Fab';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/joy/Button';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";




import PositionSelect from "../components/PositionSelect";
import CardGrid from "../components/CardGrid";



//Typing effect
import { useTypingEffect } from "../hooks/typing-effect";

import backgroundImage from './feature3-bg.jpg'
import pitch from './pitch.jpeg'


const Grid = styled(MuiGrid)(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& [role="separator"]': {
      margin: theme.spacing(0, 2),
    },
  }));

const DreamTeam = () =>{

  

  const data = [
    // Array of player data objects
    {
      Age: 31,
      Faceurl: 'https://cdn.sofifa.net/players/200/724/22_120.png',
      Name: 'Nacho Fernández',
      Overall: 81,
      Potential: 81,
      club_name: 'Real Madrid CF',
      height_cm: 180,
      position: 'CB',
      weight_kg: 76,
    },
    {
      Age: 29,
      Faceurl: 'https://cdn.sofifa.net/players/204/963/22_120.png',
      Name: 'Carvajal',
      Overall: 85,
      Potential: 85,
      club_name: 'Real Madrid CF',
      height_cm: 173,
      position: 'RB',
      weight_kg: 73,
    },
    // More player objects...
  ];

    const ref = useRef(null);
    const text = useTypingEffect('Build Your Dream Team',100)
    const [teams,setTeams] = useState([])
    const [textFieldValue, setTextFieldValue] = useState('');
    const[team,setteam]=useState('All')
    const [tactic, setTactic] = React.useState('');
    const[ccflag,setccflag] = useState(0)
    //0 -club 1-country



    const handleRadioChange = (event) => {

        console.log(event.target.value); 
        if(event.target.value === 'Club')
        {
            setccflag(0)
            setTeams(clubs)
        }else{
            setccflag(1)
            setTeams(countries)
        }
      }

      const handleTeamSelection = (event, value) => {
        setteam(value)
        console.log(value); // logs the selected value
      }

      const handleSearchButtonClick = async ()=>{
        console.log("left search clicked")
        let p ={}
         
        if(ccflag === 0)
        {
          p ={
            tactic:tactic,
            club:team
          }
        }
        else
        {
          p ={
            tactic:tactic,
            country:team
          }
        }
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
        console.log(backendUrl);
        try {
          const response = await axios.post(`${backendUrl}/feature3`, null, { params: p });
          console.log(response.data);
          setPlayers(response.data.result);
        } catch (error) {
          console.error('Error fetching data:', error);
          // Handle error state or display an error message to the user
        }
      }
      //For getting position array in parent element
    const [parentSelectValues, setParentSelectValues] = useState([]);
    const [players,setPlayers]=useState([]);

    const handleSelectValuesChange = (values) => {
      setParentSelectValues(values);
      console.log("In parent element:",parentSelectValues)
    };

      const handleRSearchButtonClick = async ()=>{
        console.log(typeof(parentSelectValues))
        console.log(parentSelectValues)
        setTactic(textFieldValue)

        let p ={}
         
        if(ccflag === 0)
        {
          p ={
            tactic:tactic,
            club:team,
            position:parentSelectValues
          }
        }
        else
        {
          p ={
            tactic:tactic,
            country:team,
            position:parentSelectValues
          }
        }
        console.log(p)
        await axios.post('http://127.0.0.1:5000/feature3', null,
        {params:p})
      .then(response => {
          console.log(typeof(response.data.result));
          setPlayers(response.data.result)
        })
        .catch(error => {
          console.log(error);
        });




        console.log("right search clicked")
      }

      const teamList = ['Paris Saint-Germain',
 'FC Bayern München',
 'Manchester United',
 'Manchester City',
 'Atlético de Madrid',
 'FC Barcelona',
 'Tottenham Hotspur',
 'Chelsea',
 'Real Madrid CF',
 'Liverpool',
 'Borussia Dortmund',
 'Juventus',
 'Lazio',
 'Inter',
 'Villarreal CF',
 'VfL Wolfsburg',
 'Napoli',
 'Leicester City',
 'Sevilla FC',
 'Real Sociedad',
 'Borussia Mönchengladbach',
 'RB Leipzig',
 'Arsenal',
 'AC Milan',
 'RC Celta de Vigo',
 'Ajax',
 'AS Monaco',
 'Everton',
 'Atalanta',
 'Aston Villa',
 'Eintracht Frankfurt',
 'Real Betis Balompié',
 'Los Angeles FC',
 'Olympique Lyonnais',
 'Al Ahli',
 'Athletic Club de Bilbao',
 'Bayer 04 Leverkusen',
 'Roma',
 'Sporting CP',
 'Burnley',
 'Wolverhampton Wanderers',
 'Valencia CF',
 'TSG Hoffenheim',
 'Grêmio',
 'FC Porto',
 'West Ham United',
 'Genoa',
 'Al Shabab',
 'Beşiktaş JK',
 'Shanghai Port FC',
 'PSV',
 'PFC CSKA Moscow',
 'Crystal Palace',
 'Levante Unión Deportiva',
 'SL Benfica',
 'U.S. Sassuolo Calcio',
 'Al Nassr',
 'RB Bragantino',
 'Leeds United',
 'Dinamo Zagreb',
 'LOSC Lille',
 'Orlando City Soccer Club',
 'Tigres U.A.N.L.',
 'Olympique de Marseille',
 'Inter Miami CF',
 '1. FC Union Berlin',
 'Bologna',
 'Shakhtar Donetsk',
 'OGC Nice',
 'Unión Deportiva Las Palmas',
 'Olympiacos CFP',
 'Southampton',
 'Cagliari',
 'İstanbul Başakşehir FK',
 'Torino F.C.',
 'Granada CF',
 'Getafe CF',
 'Newcastle United',
 'Clube Atlético Mineiro',
 'Sport Club Corinthians Paulista',
 'Flamengo',
 'Brighton & Hove Albion',
 'Parma',
 'Club América',
 'Trabzonspor',
 'Club Brugge KV',
 'Fatih Karagümrük S.K.',
 'Royal Antwerp FC',
 'Galatasaray SK',
 'Fiorentina',
 'Boca Juniors',
 'Udinese Calcio',
 'River Plate',
 'Seattle Sounders FC',
 'Beijing Guoan FC',
 'Toronto FC',
 'Montpellier Hérault SC',
 'CF Monterrey',
 'Atlanta United',
 'Spartak Moskva',
 'Stade Rennais FC',
 'Deportivo Alavés',
 'RCD Espanyol de Barcelona',
 'Cruz Azul',
 'Fluminense',
 'Internacional',
 'SV Werder Bremen',
 'Dynamo Kyiv',
 'Vissel Kobe',
 'US Salernitana 1919',
 'FC Girondins de Bordeaux',
 'Al Hilal',
 'Guangzhou City',
 'U.C. Sampdoria',
 'Fenerbahçe SK',
 'Guangzhou FC',
 'Gimnasia y Esgrima La Plata',
 'FC Augsburg',
 'Elche CF',
 'SC Braga',
 'Sport-Club Freiburg',
 'Shenzhen FC',
 'CA Osasuna',
 'KRC Genk',
 'Racing Club',
 'Fortaleza',
 'Santos',
 'Feyenoord',
 'AZ Alkmaar',
 'Cádiz CF',
 'Club Universidad Nacional',
 'Watford',
 'Rayo Vallecano',
 'Hertha BSC',
 'CF Fuenlabrada',
 'FC Metz',
 'RCD Mallorca',
 'Hellas Verona',
 'LA Galaxy',
 'UD Ibiza',
 'Racing Club de Lens',
 'Adana Demirspor',
 'DSC Arminia Bielefeld',
 'Club Atlético Independiente',
 '1. FC Köln',
 'BSC Young Boys',
 'New England Revolution',
 'SK Slavia Praha',
 'RC Strasbourg Alsace',
 'Real Valladolid CF',
 'Club León',
 'Angers SCO',
 'São Paulo',
 'Palmeiras',
 'FC Nantes',
 'VfB Stuttgart',
 'Stade de Reims',
 'Vitória de Guimarães',
 'Rangers FC',
 'Norwich City',
 'Portland Timbers',
 'FC Lokomotiv Moscow',
 'Shanghai Shenhua FC',
 'Stade Brestois 29',
 'Fulham',
 'West Bromwich Albion',
 'Al Ittihad',
 'Club Atlas',
 'Nîmes Olympique',
 'Portimonense SC',
 'Minnesota United FC',
 'Santos Laguna',
 'FC Basel 1893',
 'SC Heerenveen',
 'SD Huesca',
 'Real Sporting de Gijón',
 'Servette FC',
 'Deportivo Toluca',
 'Western United FC',
 'F.C. København',
 'Universidad Católica',
 'FC Red Bull Salzburg',
 'Club Atlético Colón',
 'Club Libertad',
 'Rosario Central',
 'Demir Grup Sivasspor',
 'Girona FC',
 'Unión Deportiva Almería',
 'Barcelona Sporting Club',
 'ESTAC Troyes',
 'AS Saint-Étienne',
 'Pachuca',
 'FC Midtjylland',
 'FC Schalke 04',
 'RSC Anderlecht',
 'Sheffield United',
 'Vitesse',
 'AEK Athens',
 'FC Luzern',
 'AC Sparta Praha',
 'Venezia FC',
 'Brentford',
 'Melbourne City FC',
 'Panathinaikos FC',
 'Columbus Crew',
 'Philadelphia Union',
 'AFC Bournemouth',
 'PAOK',
 'Club Nacional de Football',
 'Dalian Professional Football Club',
 'CD Leganés',
 '1. FSV Mainz 05',
 'Chicago Fire Football Club',
 'SD Eibar',
 'Ceará Sporting Club',
 'Club Athletico Paranaense',
 'Juventude',
 'Aytemiz Alanyaspor',
 'FC Paços de Ferreira',
 'FC Viktoria Plzeň',
 'Club Deportivo Palestino',
 'Club Atlético Lanús',
 'Molde FK',
 'Valenciennes FC',
 'Club Cerro Porteño',
 'Club Tijuana',
 "Newell's Old Boys",
 'KAA Gent',
 'IFK Göteborg',
 'Shandong Taishan',
 'Henan Songshan Longmen FC',
 'New York City FC',
 'Qingdao FC',
 'Moreirense FC',
 'Sporting Kansas City',
 'Antalyaspor',
 'Club de Foot Montréal',
 'Changchun Yatai FC',
 'Macarthur FC',
 'Spezia',
 'AIK',
 'GwangJu FC',
 'Clube Sport Marítimo',
 'Al Raed',
 'D.C. United',
 'Malmö FF',
 'FC Utrecht',
 'Celtic',
 'Lecce',
 'Centro Atlético Fénix',
 'Nottingham Forest',
 'Fútbol Club Juárez',
 'Cerezo Osaka',
 'Ettifaq FC',
 'Hajduk Split',
 'Austin FC',
 'Urawa Red Diamonds',
 'Vancouver Whitecaps FC',
 'Independiente del Valle',
 'Vélez Sarsfield',
 'Reading',
 'Brøndby IF',
 'Ulsan Hyundai FC',
 'FC Lorient',
 'Empoli',
 'Mazatlán Futbol Club',
 'Deportivo Cali',
 'Club Atlético Talleres',
 'VfL Bochum 1848',
 'Club Olimpia',
 'Argentinos Juniors',
 'FC Cincinnati',
 'New York Red Bulls',
 'Defensa y Justicia',
 'Estudiantes de La Plata',
 'Daegu FC',
 'Al Taawoun',
 'Club Atlético Huracán',
 'Al Batin',
 'Go Ahead Eagles',
 'Bahia',
 'Atlético Clube Goianiense',
 'Middlesbrough',
 'Damac FC',
 'Club Atlético Peñarol',
 'Ferencvárosi TC',
 'Aarhus GF',
 'Junior FC',
 'N.E.C. Nijmegen',
 'Çaykur Rizespor',
 'Chongqing Liangjiang Athletic',
 'Birmingham City',
 'Holstein Kiel',
 'Tianjin Jinmen Tiger FC',
 'Real Zaragoza',
 'Perth Glory',
 'Rosenborg BK',
 'Club Deportivo Guadalajara',
 'SpVgg Greuther Fürth',
 'FC Seoul',
 'Sydney FC',
 'Adelaide United',
 'FC Twente',
 'Club Necaxa',
 'Oud-Heverlee Leuven',
 'Hebei FC',
 'Millwall',
 'Club Deportivo Jorge Wilstermann',
 'Real Salt Lake',
 'Al Faisaly',
 'Gazişehir Gaziantep F.K.',
 'Blackburn Rovers',
 'Swansea City',
 'Nashville SC',
 'LASK Linz',
 '1. FC Heidenheim 1846',
 'Cardiff City',
 'Kaizer Chiefs',
 'FK Bodø/Glimt',
 'Hamburger SV',
 'Colorado Rapids',
 'Royal Charleroi S.C.',
 'KAS Eupen',
 'Club Atlético de San Luis',
 'Gil Vicente FC',
 'LDU Quito',
 'San Jose Earthquakes',
 'Al Ain FC',
 'Cuiabá',
 'Lech Poznań',
 'Málaga CF',
 'SV Zulte Waregem',
 'Standard de Liège',
 'Göztepe SK',
 'Gallos Blancos de Querétaro',
 'Orlando Pirates',
 'RZ Pellets Wolfsberger AC',
 'Wisła Kraków',
 'Górnik Zabrze',
 'Yukatel Kayserispor',
 'Shijiazhuang Ever Bright F.C.',
 'Boavista FC',
 'Dijon FCO',
 'Club Atlético Banfield',
 'Yeni Malatyaspor',
 'Santa Clara',
 'San Lorenzo de Almagro',
 'Kasimpaşa SK',
 'FC Erzgebirge Aue',
 'Sheffield Wednesday',
 'Hannover 96',
 'Atakaş Hatayspor',
 'Benevento',
 'Houston Dynamo',
 'Belenenses SAD',
 'Al Fayha',
 'Montevideo City Torque',
 'AJ Auxerre',
 'Queens Park Rangers',
 'FC Tokyo',
 'Real Oviedo',
 'Kawasaki Frontale',
 'Bristol City',
 'AC Monza',
 'FC Dallas',
 'Aalborg BK',
 'K Beerschot VA',
 'CS Emelec',
 'Al Tai',
 'SK Rapid Wien',
 'Wuhan FC',
 'Yokohama F. Marinos',
 'Clermont Foot 63',
 'İttifak Holding Konyaspor',
 'Suwon Samsung Bluewings',
 'Amiens SC',
 'Atlético Nacional',
 'Al Fateh',
 'Unión de Santa Fe',
 'Preston North End',
 'Barnsley',
 'Legia Warszawa',
 'Kashima Antlers',
 'Jeonbuk Hyundai Motors',
 'Futebol Clube de Famalicão',
 'FCSB (Steaua)',
 'Willem II',
 'SK Sturm Graz',
 'Puebla FC',
 'CD Tondela',
 'Associação Chapecoense de Futebol',
 'Hokkaido Consadole Sapporo',
 'Coventry City',
 'SD Ponferradina',
 'Godoy Cruz',
 'FC Lugano',
 'CD Tenerife',
 'Royale Union Saint-Gilloise',
 'Stoke City',
 'Atlético Tucumán',
 'América de Cali',
 'Fortuna Düsseldorf',
 'FC Vizela',
 'SV Sandhausen',
 'Grenoble Foot 38',
 'CFR Cluj',
 'Deportivo La Guaira FC',
 'FC St. Pauli',
 'SV Darmstadt 98',
 'Club Universitario de Deportes',
 'ATK Mohun Bagan FC',
 'IF Elfsborg',
 'KV Kortrijk',
 'Stade Malherbe Caen',
 'PEC Zwolle',
 '1. FC Nürnberg',
 'Toulouse Football Club',
 'Heracles Almelo',
 'Karlsruher SC',
 'Nagoya Grampus',
 'Kashiwa Reysol',
 'Newcastle Jets',
 'FC Cartagena',
 'Piast Gliwice',
 'KV Mechelen',
 'Universitatea Craiova',
 'Seongnam FC',
 'Arsenal de Sarandí',
 'FC Arouca',
 'IFK Norrköping',
 'Patronato',
 'Club Atlético Aldosivi',
 'Al Hazem',
 'Unión La Calera',
 'APOEL Nicosia FC',
 'KSV Cercle Brugge',
 'Pohang Steelers',
 'SC Paderborn 07',
 'Club Bolívar',
 'Incheon United FC',
 'Derby County',
 'Melbourne Victory',
 'FK Austria Wien',
 'FC St. Gallen 1879',
 'Crotone',
 'Club Deportes Tolima',
 'Gamba Osaka',
 'Sint-Truidense VV',
 'FBC Melgar',
 'KV Oostende',
 'FC Nordsjælland',
 'Fortuna Sittard',
 'Abha Club',
 'CD Antofagasta',
 'AD Alcorcón',
 'Club Atlético Central Córdoba',
 'Estoril Praia',
 'Aberdeen',
 'Mumbai City FC',
 'FC Zürich',
 'Platense',
 'Pogoń Szczecin',
 'Huddersfield Town',
 'Jagiellonia Białystok',
 'SD Amorebieta',
 'Club Atlético Rentistas',
 'Wigan Athletic',
 'En Avant de Guingamp',
 'La Equidad',
 'Peterborough United',
 'Odense Boldklub',
 'Hibernian',
 'Shimizu S-Pulse',
 'Djurgårdens IF',
 'Hull City',
 '12 de Octubre FC',
 'Randers FC',
 'Ipswich Town',
 'Altay SK',
 'Raków Częstochowa',
 'Club Sporting Cristal',
 'FC Sion',
 'CD Lugo',
 'Sanfrecce Hiroshima',
 'Yokohama FC',
 'FC Sochaux-Montbéliard',
 'FC Lausanne-Sport',
 'Sparta Rotterdam',
 'Paris FC',
 'Sunderland',
 'Wellington Phoenix',
 'Club River Plate Asunción',
 'Western Sydney Wanderers',
 'Türkgücü München',
 'GZT Giresunspor',
 'Guaireña FC',
 'Burgos CF',
 'Tromsø IL',
 'Avispa Fukuoka',
 'AC Ajaccio',
 'Degerfors IF',
 'AS Nancy Lorraine',
 'Grasshopper Club Zürich',
 'VfL Osnabrück',
 'Odisha FC',
 'Viking FK',
 'Hammarby IF',
 'Dundee FC',
 'Kristiansund BK',
 'Dundee United',
 'Luton Town',
 'FC Groningen',
 'Jeju United FC',
 'Vejle Boldklub',
 'Club The Strongest',
 'F.C. Hansa Rostock',
 'Portsmouth',
 'FC Botoşani',
 'Odds BK',
 'Club Independiente Santa Fe',
 'Club Nacional',
 'Vålerenga Fotball',
 'Sociedad Deportiva Aucas',
 'SSV Jahn Regensburg',
 'Metropolitanos de Caracas FC',
 'CD Mirandés',
 'Heart of Midlothian',
 'Real Sociedad B',
 'FC Dinamo 1948 Bucureşti',
 'Rodez Aveyron Football',
 'Le Havre AC',
 'Wycombe Wanderers',
 'Charlton Athletic',
 'Lechia Gdańsk',
 'RKC Waalwijk',
 'Viktoria Köln',
 'SG Dynamo Dresden',
 'FC Ingolstadt 04',
 'St. Johnstone FC',
 'Chennaiyin FC',
 'Universidad Técnica de Cajamarca',
 'Örebro SK',
 'SV Waldhof Mannheim 07',
 'FK Haugesund',
 'IK Sirius',
 'SønderjyskE',
 'MSV Duisburg',
 'TSV 1860 München',
 'Rotherham United',
 'Eintracht Braunschweig',
 'Blackpool',
 'Chamois Niortais Football Club',
 'Gangwon FC',
 'FC U Craiova 1948',
 'Deportivo Pasto',
 'Kerala Blasters FC',
 'Club Always Ready',
 'SK Brann',
 'Suwon FC',
 'Motherwell',
 'CD Huachipato',
 'Östersunds FK',
 'Vegalta Sendai',
 '1. FC Magdeburg',
 'Rapid București',
 'Club Atlético Sarmiento',
 'FC Farul Constanța',
 'Hyderabad FC',
 'Warta Poznań',
 'BK Häcken',
 'Shonan Bellmare',
 'Lincoln City',
 'Fleetwood Town',
 'Pau FC',
 'Oxford United',
 'Central Coast Mariners',
 'Club Atlético Palmaflor',
 'FC Goa',
 'Bengaluru FC',
 'Tokushima Vortis',
 'Zagłębie Lubin',
 'Club Atlético Nacional Potosí',
 'WSG Tirol',
 'Bolton Wanderers',
 'TSV Egger Glas Hartberg',
 'Strømsgodset IF',
 'St. Mirren',
 'FC Flyeralarm Admira',
 'Hallescher FC',
 'Lillestrøm SK',
 'Dundalk FC',
 'Brisbane Roar',
 'Śląsk Wrocław',
 'Club de Deportes Cobresal',
 'USL Dunkerque',
 'SV Ried',
 'Seraing',
 '1. FC Kaiserslautern',
 'Mjøndalen IF',
 'Gillingham',
 'Sport Huancayo',
 'Mjällby AIF',
 'Shrewsbury Town',
 'Sagan Tosu',
 'Sepsi OSK Sf. Gheorghe',
 'SC Cambuur',
 'Gaz Metan Mediaş',
 'Guayaquil City FC',
 'Club Deportivo Guabirá',
 'Carlos A. Mannucci',
 'Halmstads BK',
 'FC Voluntari',
 'HJK Helsinki',
 'SC Bastia',
 'Doncaster Rovers',
 'FC Würzburger Kickers',
 'Sarpsborg 08 FF',
 'Campionii FC Arges',
 'Stabæk Fotball',
 'Plymouth Argyle',
 'SV Meppen',
 'Swindon Town',
 '1. FC Saarbrücken',
 'US Quevilly Rouen Métropole',
 'Livingston FC',
 'FSV Zwickau',
 'Wisła Płock',
 'Radomiak Radom',
 'Kalmar FF',
 'Wrexham AFC',
 'Jamshedpur FC',
 'Viborg FF',
 'Cracovia',
 'Oldham Athletic',
 'SV Wehen Wiesbaden',
 'Club Social y Deportivo Macará',
 'Oita Trinita',
 'SC Rheindorf Altach',
 'SK Austria Klagenfurt',
 'SC East Bengal FC',
 'AFC UTA Arad',
 'Deportivo Táchira FC',
 'Sportclub Verl',
 'Cambridge United',
 'Burton Albion',
 'Bruk-Bet Termalica Nieciecza',
 'Shamrock Rovers',
 'PGE FKS Stal Mielec',
 'Accrington Stanley',
 'Cheltenham Town',
 'Silkeborg IF',
 'FC Academica Clinceni',
 'NorthEast United FC',
 'AFC Wimbledon',
 "St. Patrick's Athletic",
 'Northampton Town',
 'Salford City',
 'FC Viktoria 1889 Berlin',
 'Exeter City',
 'Sandefjord Fotball',
 'Morecambe',
 'Bohemian FC',
 'Carlisle United',
 'AFC Chindia Târgoviște',
 'Crewe Alexandra',
 'Milton Keynes Dons',
 'Borussia Dortmund II',
 'AC Mineros de Guayana',
 'Aragua Fútbol Club',
 'Bristol Rovers',
 'Cerro Largo Fútbol Club',
 'Colchester United',
 'Port Vale',
 'Tranmere Rovers',
 'Bradford City',
 'Leyton Orient',
 'Rochdale',
 'Newport County',
 'SC Freiburg II',
 'Academia Puerto Cabello',
 'Sligo Rovers',
 'Ross County FC',
 'Górnik Łęczna',
 'Forest Green Rovers',
 'Walsall',
 'CS Mioveni',
 'Crawley Town',
 'Mansfield Town',
 'Stevenage',
 'Harrogate Town',
 'Varbergs BoIS FC',
 'Barrow',
 'Hartlepool United',
 'TSV Havelse',
 'Scunthorpe United',
 'Sutton United',
 'Finn Harps',
 'Waterford FC',
 'Derry City',
 'Drogheda United',
 'Longford Town']

 const clubs = teamList.map((team) => ({ name: team }));
const countryList = ['Argentina', 'Poland', 'Portugal', 'Brazil', 'Belgium', 'Slovenia', 'France', 'Germany', 'England', 'Korea Republic', 'Netherlands', 'Senegal', 'Egypt', 'Italy', 'Spain', 'Uruguay', 'Costa Rica', 'Norway', 'Croatia', 'Scotland', 'Algeria', 'Slovakia', 'Denmark', 'Switzerland', 'Hungary', 'Gabon', 'Serbia', 'Nigeria', 'Morocco', 'Sweden', 'Austria', 'Montenegro', "Côte d'Ivoire", 'Mexico', 'Bosnia and Herzegovina', 'Finland', 'Greece', 'Armenia', 'Colombia', 'Cameroon', 'Ghana', 'Wales', 'Russia', 'Turkey', 'United States', 'Jamaica', 'Canada', 'Czech Republic', 'Chile', 'Ukraine', 'Venezuela', 'Togo', 'Burkina Faso', 'Northern Ireland', 'Congo DR', 'Israel', 'Albania', 'Guinea', 'Iceland', 'China PR', 'New Zealand', 'Central African Republic', 'Peru', 'Mali', 'Japan', 'North Macedonia', 'Ecuador', 'Iran', 'Republic of Ireland', 'Angola', 'Romania', 'Mozambique', 'Cape Verde Islands', 'Australia', 'Paraguay', 'Tunisia', 'Kosovo', 'Zimbabwe', 'Zambia', 'Libya', 'Suriname', 'Saudi Arabia', 'Syria', 'Gambia', 'Kenya', 'Georgia', 'Equatorial Guinea', 'Panama', 'Dominican Republic', 'Trinidad and Tobago', 'Honduras', 'Guinea Bissau', 'Liberia', 'Curacao', 'Tanzania', 'Benin', 'Cyprus', 'South Africa', 'Uzbekistan', 'Congo', 'Madagascar', 'Moldova', 'Cuba', 'Saint Kitts and Nevis', 'Philippines', 'Fiji', 'United Arab Emirates', 'Luxembourg', 'Namibia', 'Chad', 'Lithuania', 'Bolivia', 'Comoros', 'Thailand', 'Bermuda', 'Burundi', 'Antigua and Barbuda', 'Malawi', 'Haiti', 'Bulgaria', 'Sierra Leone', 'Kazakhstan', 'Montserrat', 'Chinese Taipei', 'El Salvador', 'Niger', 'Malta', 'Uganda', 'Belarus', 'Jordan', 'India', 'Iraq', 'Puerto Rico', 'Azerbaijan', 'Mauritania', 'Eritrea', 'Mauritius', 'Lebanon', 'Sudan', 'Grenada', 'Latvia', 'Guam', 'Kyrgyzstan', 'Guyana', 'Faroe Islands', 'Papua New Guinea', 'Ethiopia', 'Andorra', 'Korea DPR', 'Saint Lucia', 'Afghanistan', 'Vietnam', 'Belize', 'Guatemala', 'Palestine', 'Bhutan', 'Barbados', 'Gibraltar', 'Malaysia', 'Estonia', 'South Sudan', 'Hong Kong', 'Indonesia'];

const countries = countryList.map((country) => ({ name: country }));


      const handleTacticChange = (event) => {
           setTactic(event.target.value);

      };

      const handleButtonClick =  () => {
 
        ref.current?.scrollIntoView({behavior: 'smooth'})}


  
        const integerArray = [1];
        Array.prototype.splice.apply(integerArray, [1, 0, ...Array.from(tactic, (char) => parseInt(char, 10))]);
  console.log(integerArray)


    return (
        <>
        <div style={{ width: '100vw' }}>
        <img src = {backgroundImage} alt="Image description" style={{ width: '100%',height:'90vh',objectFit: 'cover' }} />
        <div style={{ position: 'absolute', top: '160px', left: '275px', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'white', fontSize: '2rem',fontWeight:'bold' }}>
    <p>{text}</p>
    
  </div>
  <div style={{ position: 'absolute', top: '92%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'black', fontSize: '2rem',fontWeight:'bold' }}>
  <Fab color="primary" aria-label="add" onClick={handleButtonClick}>
        <KeyboardDoubleArrowDownIcon />
      </Fab>
    
  </div>
  
        </div>
        <div ref={ref}>

        <div style ={{marginTop:'30px' ,marginLeft:'220px',border:'1px black solid',borderRadius:'30px',width:'950px',padding:'20px'}}>
          <Box sx={{display:'flex',alignItems:'center'}}>
            
            <Box sx={{ width: 200,marginLeft:'40px'}}>
            <FormLabel
        id="storage-label"
        sx={{
          mb: 2,
          fontWeight: 'xl',
          textTransform: 'uppercase',
          fontSize: 'xs',
          letterSpacing: '0.15rem',
          paddingTop:'2em'
        
        }}
      >
        Select
      </FormLabel>
      <RadioGroup
        aria-labelledby="storage-label"
        defaultValue="512GB"
        size="lg"
        sx={{ gap: 1.5,display:'flex', flexDirection: 'row' } }
        onChange={handleRadioChange}
      >
        {['Club','Country'].map((value) => (
          <Sheet
            key={value}
            sx={{
              p: 2,
              borderRadius: 'md',
              boxShadow: 'sm',
              bgcolor: 'background.body',
            }}
          >
            <Radio
              label={`${value}`}
              overlay
              disableIcon
              value={value}
              sx = {{width:'80px',textAlign:'center'}}
              slotProps={{
                label: ({ checked }) => ({
                  sx: {
                    fontWeight: 'lg',
                    fontSize: 'md',
                    color: checked ? 'text.primary' : 'text.secondary',
                  },
                }),
                action: ({ checked }) => ({
                  sx: (theme) => ({
                    ...(checked && {
                      '--variant-borderWidth': '2px',
                      '&&': {
                        // && to increase the specificity to win the base :hover styles
                        borderColor: theme.vars.palette.primary[500],
                      },
                    }),
                  }),
                }),
              }}
            />
          </Sheet>
        ))}
      </RadioGroup>
      <Autocomplete
        placeholder="Choose"
        options={teams.map((team) => team.name)}
        autoHighlight
        sx={{ width: 235 , marginTop:'20px',height:30}}
        onChange={handleTeamSelection}
    />
    </Box>
    <Grid container sx={{width:'700px',marginLeft:'120px',paddingTop:'2em'}}>
      <Grid item xs>
      <InputLabel id="demo-simple-select-label">Select Tactic</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={tactic}
          onChange={handleTacticChange}
          sx={{width:'200px'}}
        >
          <MenuItem value={'433'}>4 - 3 - 3</MenuItem>
          <MenuItem value={'442'}>4 - 4 - 2</MenuItem>
          <MenuItem value={'352'}>3 - 5 - 2</MenuItem>
        </Select>
        <Button startDecorator={<SearchIcon/>} sx={{marginTop:'45px',marginLeft:'60px'} }onClick={handleSearchButtonClick}></Button>
      </Grid>
      <Divider orientation="vertical" flexItem>
        OR
      </Divider>
      <Grid item xs>
    <TextField value={textFieldValue}
        onChange={(e) => setTextFieldValue(e.target.value)} id="outlined-basic" label="Tactic" variant="outlined" type="number"/>      <PositionSelect  onSelectValuesChange={handleSelectValuesChange} />

      <Button startDecorator={<SearchIcon/>} sx={{marginTop:'20px',marginLeft:'60px'} }onClick={handleRSearchButtonClick}></Button>
      </Grid>
    </Grid>

    </Box>

    </div>
    <Box sx={{border:'2px black solid',marginTop:'30px',marginLeft:'40px',width:'95vw',height:'210vh'}}>
    <div style={{ position: 'relative',marginTop:'30px',marginLeft:'30px', width: '90vw', height: '200vh',padding:'5px' }}>
  <img src={pitch} alt="Image description" style={{ width: '100%', height: '100%' }} />
  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'black', fontSize: '2rem', fontWeight: 'bold' }}>
    <CardGrid tactic = {integerArray} data ={players}/>
  </div>
</div>
</Box>




        </div>
      
        </>
    )
}
export default DreamTeam;