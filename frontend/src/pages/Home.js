import React from 'react';
import backgroundImage from './homebg.jpeg'; // Background image (soccer field, players, etc.)
import { FaChartBar, FaUsers, FaFootballBall } from 'react-icons/fa'; // Icons for features

const Home = () => {
  return (
    <div>
      {/* Hero Section with background image and overlay */}
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
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
          }}
        ></div>

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
            style={{
              backgroundColor: '#28a745', // Soccer field green
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              fontSize: '18px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Explore Features
          </button>
        </div>
      </div>

      {/* Data Visualizations Section */}
      <div style={{ padding: '50px 0', backgroundColor: '#f8f9fa' }}>
        <h2 style={{ textAlign: 'center', fontSize: '36px', color: '#333' }}>
          Real-Time Data Analytics for Soccer
        </h2>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '40px' }}>
          <div style={{ textAlign: 'center', width: '200px' }}>
            <FaChartBar size={50} color="#28a745" />
            <h3>Team Analysis</h3>
            <p>Analyze team performance across various metrics.</p>
          </div>
          <div style={{ textAlign: 'center', width: '200px' }}>
            <FaUsers size={50} color="#28a745" />
            <h3>Player Stats</h3>
            <p>Get in-depth player statistics and performance insights.</p>
          </div>
          <div style={{ textAlign: 'center', width: '200px' }}>
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
