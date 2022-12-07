import { React, useState } from "react";
import { motion } from "framer-motion";
import Backdrop from "../Backdrop";
import "./style.css";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

export default function Register({ handleClose }) {
  const [regInfo, setRegInfo] = useState({
    username: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  function handelRegister(e) {
    e.preventDefault();

    if (regInfo.email !== regInfo.confirmEmail) {
      //todo render an error msg
    } else if (regInfo.password !== regInfo.confirmPassword) {
      //todo render an error msg
    } else {
      //todo Send register detail to backend
      //todo upon successful post request:
      //todo      - render a msg: Registered
      //todo      - setRegOpen(false)
      //todo if failed:
      //todo      - render an error msg
    }
  }

  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="motiondiv"
      >
        <form id="registerForm" onSubmit={handelRegister}>
          <h1 id="registerh1">Register</h1>

          <button className="closebtn"
            onClick={handleClose}
          >
            x
          </button>

          <label>
            Username:
            <input
              required
              type="text"
              placeholder="Username"
              value={regInfo.username}
              onChange={(e) => {
                setRegInfo({ ...regInfo, username: e.target.value });
              }}
            />
            <br />
          </label>

          <label>
            Email:
            <input
              required
              type="email"
              placeholder="Email"
              value={regInfo.email}
              onChange={(e) => {
                setRegInfo({ ...regInfo, email: e.target.value });
              }}
            />
            <br />
          </label>

          <label>
            Confirm Email:
            <input
              required
              type="email"
              placeholder="Confirm Email"
              value={regInfo.confirmEmail}
              onChange={(e) => {
                setRegInfo({ ...regInfo, confirmEmail: e.target.value });
              }}
            />
            <br />
          </label>

          <label>
            Password:
            <input
              required
              type="password"
              minLength="8"
              placeholder="Password"
              value={regInfo.password}
              onChange={(e) => {
                setRegInfo({ ...regInfo, password: e.target.value });
              }}
            />
            <br />
          </label>

          <label>
            Confirm Password:
            <input
              required
              type="password"
              minLength="8"
              placeholder="Confirm Password"
              value={regInfo.confirmPassword}
              onChange={(e) => {
                setRegInfo({ ...regInfo, confirmPassword: e.target.value });
              }}
            />
            <br />
          </label>

          <input type="submit" value="Submit" />
        </form>
      </motion.div>
    </Backdrop>
  );
}
