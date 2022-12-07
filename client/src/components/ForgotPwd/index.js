import { React, useState } from "react";
import { motion } from "framer-motion";
import Backdrop from "../Backdrop";
import './style.css'

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

export default function ForgotPwd({ handleClose }) {
  const [pwdInfo, setPwdInfo] = useState({
    username: "",
    email: "",
  });

  function handleForgotPwd(e) {
    e.preventDefault();
  }

  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <form id="forgotpwdForm" onSubmit={handleForgotPwd}>
          <h1 id="forgoth1">Forgot Password</h1>

          <button onClick={handleClose}>x</button>

          <label>
            Username:
            <input
              required
              type="text"
              placeholder="Username"
              value={pwdInfo.username}
              onChange={(e) => {
                setPwdInfo({ ...pwdInfo, username: e.target.value });
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
              value={pwdInfo.email}
              onChange={(e) => {
                setPwdInfo({ ...pwdInfo, email: e.target.value });
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
