import React from 'react';
import './App.css';
import Navbar from './components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import TeamAnalysis from './pages/TeamAnalysis'
import SuitedPlayer from './pages/SuitedPlayer'
import Scout from './pages/Scout'
import Details from './pages/Details';
import DreamTeam from './pages/DreamTeam'




function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/about-platform" component={AboutPlatform} />
        <Route path='/feature1' element={<TeamAnalysis/>} />
        <Route path='/feature2' element={<SuitedPlayer/>} />
        <Route path='/details' element={<Details/>} />
        <Route path='/feature3' element ={<DreamTeam/>}/>
        <Route path='/feature4'  element={<Scout/>}/>

      </Routes>
    </Router>
    </>
  );
}

export default App;