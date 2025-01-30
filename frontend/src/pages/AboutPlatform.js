import React from 'react';
import './AboutPlatform.css'; // External stylesheet for styling

const AboutPlatform = () => {
  return (
    <div className="about-container">
      {/* Header Section */}
      <section className="about-header">
        <h1>About the SoccerIQ Platform</h1>
        <p>
          SoccerIQ is a data-driven platform that provides insights into soccer team performance, 
          player stats, and prediction models. Using cutting-edge AI and machine learning models, 
          we help soccer enthusiasts, coaches, and analysts make data-backed decisions.
        </p>
      </section>

      {/* Dataset Information Section */}
      <section className="dataset-info">
        <h2>The Dataset</h2>
        <p>
          SoccerIQ leverages a rich dataset containing detailed soccer match statistics, player data, and 
          team performance metrics. The dataset includes:
        </p>
        <ul>
          <li><strong>Player Metrics:</strong> Goals, assists, shots on target, pass accuracy, etc.</li>
          <li><strong>Team Metrics:</strong> Possession, total goals scored, average goals conceded, etc.</li>
          <li><strong>Match Data:</strong> Historical match data, formations, and player positions.</li>
        </ul>
        <p>
          All data is sourced from publicly available soccer databases. You can access the full dataset 
          at <a href="https://www.exampledataset.com" target="_blank" rel="noopener noreferrer">Dataset Link</a>.
        </p>
      </section>

      {/* Feature 1: Team Analysis */}
      <section className="feature">
        <h2>Team Analysis</h2>
        <p>
          SoccerIQ allows teams to analyze their performance based on various key metrics. By comparing 
          different teams’ statistics, we help coaches identify strengths and weaknesses.
        </p>
      </section>

      {/* Feature 2: Suited Player */}
      <section className="feature">
        <h2>Suited Player</h2>
        <p>
          Using a Gradient Boosting Model, SoccerIQ predicts the best player for a particular role based on 
          their performance metrics. This feature analyzes expected goals (xG) and compares them with actual goals 
          to rank players.
        </p>
      </section>

      {/* Feature 3: Best Team */}
      <section className="feature">
        <h2>Best Team for a Formation</h2>
        <p>
          SoccerIQ recommends the best players to form a dream team based on a given formation. 
          The platform combines player stats and match data to optimize the team setup.
        </p>
      </section>

      {/* Feature 4: Scouting */}
      <section className="feature">
        <h2>Player Scouting</h2>
        <p>
          SoccerIQ scouts players based on their overall performance score. By analyzing key stats, 
          we rank players to help teams identify top talent.
        </p>
      </section>
    </div>
  );
};

export default AboutPlatform;
