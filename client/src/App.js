import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './style.css'
import shuriken from './components/images/shuriken.png'
//* Pages
import { Menu, NotFound, Leaderboard, Dashboard, Lobby, Game } from './pages';
import bG from './images/bG.png';
import { useSelector } from 'react-redux';

function App() {

  const navigate = useNavigate();
  const isLogin = localStorage.getItem("isLogin")


  useEffect(() => {
    console.log("isLogin?", isLogin);
  },[])

  useEffect(() => {
    if(isLogin){
      navigate('/dashboard')
    }
  },[isLogin])

  return (
    <div>
      <div className='bGimg'>
        <img src={bG}></img>
      </div>
    <div className="App">
      {/* <div className="circlesContainer">
          {
            Array(10).fill().map((i, index) => (<img key={index} className="circles" src={shuriken} alt="pokeball"></img>))
          }
        </div> */}
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
