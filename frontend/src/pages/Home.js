import React from 'react';
import backgroundImage from './homebg.jpeg'; // Background image (soccer field, players, etc.)
import { FaChartBar, FaUsers, FaFootballBall } from 'react-icons/fa'; // Soccer Ball Icon

const Home = () => {
  return (
    <div>
      {/* Combined Hero Section with background image and overlay */}
      <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
        <img
          src={backgroundImage}
          alt="Soccer IQ Background"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(50%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for readability
          }}
        ></div>

        {/* Hero Content */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            textAlign: 'center',
            zIndex: 2,
          }}
        >
          <h1 style={{ fontSize: '80px', fontWeight: 'bold', textShadow: '3px 3px 6px rgba(0, 0, 0, 0.6)' }}>
            Soccer IQ
          </h1>
          <p style={{ fontSize: '24px', margin: '20px', fontWeight: 'lighter' }}>
            The Power of Soccer Data Analytics
          </p>
          <button
            onClick={() => window.location.href = "/features"}  // Direct the user to the features page
            style={{
              backgroundColor: '#28a745', // Soccer field green
              color: 'white',
              padding: '12px 30px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '18px',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#218838'} // Hover effect
            onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
          >
            Explore Features
          </button>
        </div>

        {/* Features Section below the Hero Section */}
        <div
          style={{
            position: 'absolute',
            bottom: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            justifyContent: 'center',
            gap: '40px',
            zIndex: 2,
          }}
        >
          {/* Team Analysis */}
          <div style={{ textAlign: 'center', color: 'white', maxWidth: '250px' }}>
            <FaChartBar size={50} color="#28a745" />
            <h3>Team Analysis</h3>
            <p>Analyze team performance across various metrics.</p>
          </div>

          {/* Player Stats */}
          <div style={{ textAlign: 'center', color: 'white', maxWidth: '250px' }}>
            <FaUsers size={50} color="#28a745" />
            <h3>Player Stats</h3>
            <p>Get in-depth player statistics and performance insights.</p>
          </div>

          {/* Prediction Models */}
          <div style={{ textAlign: 'center', color: 'white', maxWidth: '250px' }}>
            <FaFootballBall size={50} color="#28a745" />
            <h3>Prediction Models</h3>
            <p>Predict match outcomes using AI-driven models.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

