import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/joy/Button';
import { blue } from '@mui/material/colors';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';
import CardGrid from '../components/CardGrid';



import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MuiInput from '@mui/material/Input';
import { styled } from '@mui/material/styles';

import bgImage from './feature4-bg.jpeg'


function valuetext(value) {
  return `${value}°C`;
}

const Scout = () => {
  const [sliderValue, setSliderValue] = useState(30); // Initial value of the slider
  const [showData, setShowData] = useState(false); // Flag to show data div
  const [isLoading, setIsLoading] = useState(false); // Flag to indicate loading state
  const [players,setPlayers] = useState([]);

 /* // Define a function to handle the value change
  const handleSliderChange = (event, value) => {
    setSliderValue(value);
  };*/

  const handleSearchClick = async() => {
    setIsLoading(true); // Start loading
    console.log("Clicked sv",value)

    /*await axios.post('http://127.0.0.1:5000/feature4', null,
    {params:{'intial_overall':value}})

    
  .then(response => {
      console.log(response.data)
      setPlayers(response.data.result)

     
    })
    .catch(error => {
      console.log(error);
    });*/

    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
    console.log(backendUrl);

    try {
      const response = await axios.post(`${backendUrl}/feature4`, null, {
        params: {
          'intial_overall': value
        }
      });
    
      console.log(response.data);
      setPlayers(response.data.result);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error state or display an error message to the user
    }






    // Simulating an asynchronous API call
    setTimeout(() => {
      setIsLoading(false); // Stop loading
      setShowData(true); // Show the data div
    }, 2000);
  };
const integerArray = [3,3,3,1]
  const NsliderStyle = {
    marginTop: '50px',
    width: '200px', // Adjust this value to set the desired width
    color:blue[500],
    marginLeft: '30px'
  };





  const Input = styled(MuiInput)`
  width: 42px;
`;
  const [value, setValue] = React.useState(30);

  const handleNSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };



  return (
    <>
    <div style={{
    width: '100%',
    position: 'relative',
    marginTop:'-40px',
    zIndex: 1,
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}>
    
    <Box sx={{ width: '500px', marginLeft: '30px' }}>
    <Box sx={{ width: '500px' }}>
      {/*for the form*/}
      <Box sx={{border:'1px solid black', marginLeft:'450px',marginTop:'40px',width:'600px',padding:'40px',borderRadius:'20px',backgroundColor:'white' }}>
      <Typography id="input-slider" gutterBottom sx={{fontSize:'40px',fontWeight:'bold'}}>
        Set Score
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleNSliderChange}
            aria-labelledby="input-slider"
            styke={NsliderStyle}
          />
        </Grid>
        <Grid item>
          <Input
            value={value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
        <Grid item>
        <Button
          onClick={handleSearchClick}
          disabled={isLoading} // Disable button while loading
          style={{
            marginLeft: '40px',
            width:'100px'
          }}
        >
          {isLoading ? (
            'Scouting...'
          ) : (
            <>
              Scout<SearchIcon style={{ marginLeft: '5px' }} />
            </>
          )}
        </Button>
      
      

        </Grid>
      </Grid>
      </Box>
    </Box>
    </Box>
    {showData && (
        <div style={{ marginTop: '150px',marginLeft:'200px' }}>
         
          {/* Display the fetched data */}
          <CardGrid tactic = {integerArray} data ={players}/>
        </div>
      )}
      </div>
    </>
  );
};

export default Scout;