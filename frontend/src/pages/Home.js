import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from './homebg.jpeg';
import { FaChartBar, FaBullseye, FaUsersCog, FaSearch } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="background-container">
          <img
            src={backgroundImage}
            alt="Soccer field"
            className="background-image"
          />
          <div className="overlay"></div>
        </div>

        {/* Content Wrapper */}
        <div className="content-wrapper">
          <div className="hero-content">
            <h1 className="hero-title">Soccer IQ</h1>
            <p className="hero-subtitle">Unlock the power of soccer data analytics.</p>
            <Link to="/features" className="cta-button">
              Explore Features
            </Link>
          </div>

          {/* Features Section */}
          <div class="features-wrapper">
          <div className="features-container">
            <FeatureCard
              icon={<FaChartBar size={isMobile ? 30 : 40} />}
              title="Team Analysis"
              description="Analyze team performance across various metrics."
              linkTo="/team-analysis"
            />
            <FeatureCard
              icon={<FaBullseye size={isMobile ? 30 : 40} />}
              title="Find Best Suited Player"
              description="Using AI-driven models to predict expected goals and identify top performers."
              linkTo="/find-player"
            />
            <FeatureCard
              icon={<FaUsersCog size={isMobile ? 30 : 40} />}
              title="Best Team for Formation"
              description="Generate the best possible team lineup for any formation based on data analytics."
              linkTo="/team-formation"
            />
            <FeatureCard
              icon={<FaSearch size={isMobile ? 30 : 40} />}
              title="Scout a Player"
              description="Evaluate player skills and stats to find the best fit for your team."
              linkTo="/scout-player"
            />
          </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, linkTo }) => {
  return (
    <Link to={linkTo} className="feature-card">
      <div className="card-icon">{icon}</div>
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
    </Link>
  );
};

export default Home;