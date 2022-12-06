import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './style.css'
//* Pages
import { Menu, NotFound, Leaderboard, Dashboard, Lobby, Game } from './pages';
import bG from './images/bG.png';

function App() {
  return (
    <div>
      <div className='bGimg'>
        <img src={bG}></img>
      </div>
    <div className="App">
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/game" element={<Game />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
    </div>
  );
}

export default App;
