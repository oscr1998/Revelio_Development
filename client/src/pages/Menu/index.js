import { React, useState } from "react";
import { Login, Register, ForgotPwd, ResetPwd } from "../../components";
import { Link } from "react-router-dom";
import "./style.css";
import { Zoom, Flip } from "react-reveal";
// import Modal from '../../components/Modal';
import { AnimatePresence } from "framer-motion";

export default function Menu() {
  const [regOpen, setRegOpen] = useState(false);
  const closereg = () => setRegOpen(false);
  const openreg = () => setRegOpen(true);
  const [fpwdOpen, setfPwdOpen] = useState(false);
  const closefpwd = () => setfPwdOpen(false);
  const openfpwd = () => setfPwdOpen(true);
  const [rpwdOpen, setrPwdOpen] = useState(false);
  const closerpwd = () => setrPwdOpen(false);
  const openrpwd = () => setrPwdOpen(true);

  return (
    <div id="menuContainer">
      <h1 id="h1menu">Logo</h1>
      <Zoom>
        <div className="loginContainer nes-container is-centered">
          <Login />

          <Flip>
            <button
              id="registerbtn"
              onClick={() => (regOpen ? closereg() : openreg())}
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
            {regOpen && <Register regOpen={regOpen} handleClose={closereg} />}
          </AnimatePresence>

          <Flip>
            <button className="leaderboardbtn nes-btn">
              <Link id="leaderboardlink" to="/leaderboard">
                Leaderboard
              </Link>
            </button>
          </Flip>

          <div className="pwdcontainer">
            <Link
              className="pwdlink"
              onClick={() => (fpwdOpen ? closefpwd() : openfpwd())}
            >
              Forgot Password
            </Link>

            <AnimatePresence
              initial={false}
              exitBeforeEnter={true}
              onExitComplete={() => null}
            >
              {fpwdOpen && (
                <ForgotPwd fpwdOpen={fpwdOpen} handleClose={closefpwd} />
              )}
            </AnimatePresence>

            <Link
              className="pwdlink"
              onClick={() => (rpwdOpen ? closerpwd() : openrpwd())}
            >
              Reset Password
            </Link>

            <AnimatePresence
              initial={false}
              exitBeforeEnter={true}
              onExitComplete={() => null}
            >
              {rpwdOpen && (
                <ResetPwd rpwdOpen={rpwdOpen} handleClose={closerpwd} />
              )}
            </AnimatePresence>
          </div>
        </div>
      </Zoom>
    </div>
  );
}
