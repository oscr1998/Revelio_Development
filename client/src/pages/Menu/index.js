import { React, useState } from "react";
import { Login, Register } from "../../components";
import { Link } from "react-router-dom";
import "./style.css";
import { Zoom, Flip } from "react-reveal";
// import Modal from '../../components/Modal';
import { AnimatePresence } from "framer-motion";

export default function Menu() {
  const [regOpen, setRegOpen] = useState(false);
  const close = () => setRegOpen(false);
  const open = () => setRegOpen(true);

  return (
    <div id="menuContainer">
      <h1 id="h1menu">Logo</h1>
      <Zoom>
        <div className="loginContainer nes-container is-centered">
          <Login />

          <Flip>
            <button
              id="registerbtn"
              onClick={() => (regOpen ? close() : open())}
              className="nes-btn is-primary"
            >
              Register
            </button>
          </Flip>

          <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={() => null}
          >
            {regOpen && <Register regOpen={regOpen} handleClose={close} />}
          </AnimatePresence>

          <Flip>
            <button className="leaderboardbtn nes-btn">
              <Link id='leaderboardlink' to="/leaderboard">Leaderboard</Link>
            </button>
          </Flip>
        </div>
      </Zoom>
    </div>
  );
}
