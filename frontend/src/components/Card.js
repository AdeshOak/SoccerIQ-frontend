import React from "react";
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import Box from '@mui/joy/Box';
const PlayerCard = ({ player }) => (
    <Card sx ={{width:'250px',height:'auto',marginLeft:'30px',marginRight:'30px',marginTop:'20px',marginBottom:'20px',borderRadius:'20px'}}>
      <CardActionArea>
      <Box
        sx={{
          position: 'relative',
          backgroundColor: 'black',
          height: '140px',
          margin: '0 -24px',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '140px',
            height: '140px',

            overflow: 'hidden',
          }}
        >
          <CardMedia
            component="img"
            image={player.Faceurl}
            alt={player.Name}
            sx={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
            }}
          />
        </Box>
      </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" style={{ fontWeight: 'bold' }}>
            {player.Name}
          </Typography>
          <Typography variant="body2" color="text.secondary" >
          <span style={{ fontWeight: 'bold',marginRight: '8px' }}>Club:</span> 
          <span style={{ color: 'black', fontWeight: 'bold' }}>{player.club_name}</span>
          </Typography>
          <Typography variant="body2" color="text.secondary">
          <span style={{ fontWeight: 'bold',marginRight: '72px'  }}> Age: </span>{player.Age}
          </Typography>
          <Typography variant="body2" color="text.secondary">
  <span style={{ fontWeight: 'bold', marginRight: '53px' }}>Overall:</span>
  <span style={{ color: 'green', fontWeight: 'bold' }}>{player.Overall}</span>
</Typography>
<Typography variant="body2" color="text.secondary">
  <span style={{ fontWeight: 'bold', marginRight: '40px' }}>Potential:</span>
  <span style={{ color: 'blue', fontWeight: 'bold' }}>{player.Potential}</span>
</Typography>

          <Typography variant="body2" color="text.secondary">
          <span style={{ fontWeight: 'bold',marginRight: '40px'  }}>Position:</span> {player.position}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
  
  export default PlayerCard;