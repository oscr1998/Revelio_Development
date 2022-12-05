import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

//* Pages
import { Menu, NotFound, Leaderboard, Dashboard, Lobby } from './pages';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
