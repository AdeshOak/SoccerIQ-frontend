import React from 'react';
import backgroundImage from './homebg.jpeg';

const Home = () => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '90vh' }}>
      <img
        src={backgroundImage}
        alt="Image description"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    <div
  style={{
    position: 'absolute',
    top: '30%',
    left: '60%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    fontSize: '96px', // Increased font size
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
    letterSpacing: '4px', // Added letter spacing
    padding: '4px', // Added padding
  }}
>
  Soccer IQ
</div>
    </div>
  );
};

export default Home;
