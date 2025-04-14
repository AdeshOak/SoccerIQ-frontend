import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './components/Navbar.css';
import './pages/Home.css';
import Navbar from './components';
import Home from './pages/Home';
import TeamAnalysis from './pages/TeamAnalysis';
import SuitedPlayer from './pages/SuitedPlayer';
import Scout from './pages/Scout';
import Details from './pages/Details';
import DreamTeam from './pages/DreamTeam';
import AboutPlatform from './pages/AboutPlatform';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feature1" element={<TeamAnalysis />} />
        <Route path="/feature2" element={<SuitedPlayer />} />
        <Route path="/feature3" element={<DreamTeam />} />
        <Route path="/feature4" element={<Scout />} />
        <Route path="/details" element={<Details />} />
        <Route path="/about" element={<AboutPlatform />} />
      </Routes>
    </Router>
  );
}

export default App;