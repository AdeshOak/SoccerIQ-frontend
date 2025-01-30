import React from 'react';
import backgroundImage from './homebg.jpeg';
import { FaChartBar, FaBullseye, FaUsersCog, FaSearch } from 'react-icons/fa';

const Home = () => {
  return (
    <div>
      {/* Hero Section with Background and Overlay */}
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
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        ></div>

        {/* Hero Content */}
        <div
          style={{
            position: 'absolute',
            top: '30%',
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
            Unlock the power of soccer data analytics.
          </p>
          <button
            onClick={() => window.location.href = "/about"}
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              padding: '12px 30px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '18px',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
          >
            Explore Features
          </button>
        </div>

        {/* Features Section */}
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
          {/* Feature 1 - Team Analysis */}
          <FeatureCard
            icon={<FaChartBar size={50} color="#28a745" />}
            title="Team Analysis"
            description="Analyze team performance across various metrics."
          />

          {/* Feature 2 - Finding Most Suited Player */}
          <FeatureCard
            icon={<FaBullseye size={50} color="#28a745" />}
            title="Find Best Suited Player"
            description="Using AI-driven gradient boosting models, predict expected goals and compare with actual to identify top performers."
          />

          {/* Feature 3 - Best Team Formation */}
          <FeatureCard
            icon={<FaUsersCog size={50} color="#28a745" />}
            title="Best Team for Formation"
            description="Generate the best possible team lineup for any formation based on data analytics."
          />

          {/* Feature 4 - Player Scouting */}
          <FeatureCard
            icon={<FaSearch size={50} color="#28a745" />}
            title="Scout a Player"
            description="Evaluate player skills and stats to find the best fit for your team."
          />
        </div>
      </div>
    </div>
  );
};

// FeatureCard Component
const FeatureCard = ({ icon, title, description }) => {
  return (
    <div
      style={{
        textAlign: 'center',
        color: 'white',
        width: '250px', // Fixed width
        height: '220px', // Fixed height for consistency
        padding: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark overlay
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly', // Equal spacing for all elements
        transition: 'transform 0.3s ease, background-color 0.3s ease',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
      }}
    >
      <div style={{ fontSize: '40px' }}>{icon}</div> {/* Logo/Icon */}
      <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '10px 0' }}>{title}</h3>
      <p style={{ fontSize: '14px', margin: '0 10px' }}>{description}</p>
    </div>
  );
};



export default Home;




