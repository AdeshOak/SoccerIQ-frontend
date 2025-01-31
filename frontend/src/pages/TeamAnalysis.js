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






//Import statements

//Import statements

const TeamAnalysis = () => {
  const [graphData, setGraphData] = useState(null);
  const teams = [/*...team names*/];
  const [loading, setLoading] = useState(false);
  const [team, setTeam] = useState('');
  const [insights, setInsights] = useState(null);

  const handleTeamSelection = (event, value) => {
      setTeam(value);
      console.log(value);
  };

  const generateGraphInsights = (graph) => {
      const { x: data, y: labels } = graph;
      let insights = [];

      if (data.length === 0) return "No data available.";

      const maxVal = Math.max(...data);
      const minVal = Math.min(...data);
      const maxIndex = data.indexOf(maxVal);
      const minIndex = data.indexOf(minVal);

      let trend = 'stable';
      for (let i = 1; i < data.length; i++) {
          if (data[i] > data[i - 1]) {
              trend = 'increasing';
          } else if (data[i] < data[i - 1]) {
              trend = 'decreasing';
          }
      }

      insights.push(`${labels[maxIndex]} saw the peak at ${maxVal}.`);
      insights.push(`${labels[minIndex]} had the lowest value at ${minVal}.`);
      insights.push(`The trend appears to be ${trend} over time.`);

      return insights.join(' ');
  };

  const handleClick = async () => {
      console.log("Selected team is:", team);
      const data = { team };
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
      setLoading(true);
      setGraphData(null);
      setInsights(null);

      try {
          const response = await axios.post(`${backendUrl}/feature1`, data);
          console.log(response.data);
          const newGraphData = {
              goals: { x: response.data.graph1.data, y: response.data.graph1.labels },
              substitutions: { x: response.data.graph2.data, y: response.data.graph2.labels },
              redCards: { x: response.data.graph3.data, y: response.data.graph3.labels },
              yellowCards: { x: response.data.graph4.data, y: response.data.graph4.labels }
          };
          setGraphData(newGraphData);
          setInsights(
              Object.fromEntries(
                  Object.entries(newGraphData).map(([key, graph]) => [key, generateGraphInsights(graph)])
              )
          );
      } catch (error) {
          console.error("Error fetching data from backend:", error);
      } finally {
          setLoading(false);
      }
  };

  return (
      <div>
          <div style={{ 
              backgroundImage: `url(${backgroundImage})`, 
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
              height: '50vh'
          }}>
              <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0,0,0,0.5)'
              }}>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', margin: '5rem', marginLeft: '20rem', borderRadius: 10, width: '800px', zIndex: 1, backgroundColor: 'white', boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)', border: '2px solid black' }}>
                      <h1 style={{ marginTop: '1rem', marginLeft: '18rem' }}>Team Analysis</h1>
                      <p style={{ marginTop: '1rem', marginLeft: '10rem' }}>Select a team from the drop-down and analyze its key metrics</p>
                      <Autocomplete
                          placeholder="Choose team"
                          options={teams.map((team) => team.name)}
                          autoHighlight
                          sx={{ width: 300, margin: 4 }}
                          onChange={handleTeamSelection}
                      />
                      <Button variant="soft" endDecorator={<KeyboardArrowRight />} color="success" sx={{ width: 300, margin: 4 }} onClick={handleClick}>Analyze</Button>
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

          {graphData && insights && Object.entries(graphData).map(([key, { x, y }]) => (
              <div key={key} style={{ marginTop: '60px', padding: '10px' }}>
                  <Divider>
                      <Chip color="success" size="medium" startDecorator={<SportsScoreIcon />} sx={{ width: '200px', borderRadius: '30px', fontSize: '1.2rem', padding: '5px' }}>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                      </Chip>
                  </Divider>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'space-between', marginTop: '20px' }}>
                      <LineChart chartLabel={key.charAt(0).toUpperCase() + key.slice(1)} labels={y} data={x} color={'green'} sx={{ width: '48%' }} />
                      {!loading && <div style={{ width: '48%' }}>{insights[key]}</div>}
                  </Box>
              </div>
          ))}
      </div>
  );
}

export default TeamAnalysis;
