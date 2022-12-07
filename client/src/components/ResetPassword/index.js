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

export default function ResetPwd({ handleClose }) {
  const [pwdInfo, setPwdInfo] = useState({
    username: "",
    otp: "",
    newpwd: "",
  });

  function handleResetPwd(e) {
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
        <form id="resetpwdForm" onSubmit={handleResetPwd}>
          <h1 id="reseth1">Reset Password</h1>

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
            OTP:
            <input
              required
              type="otp"
              placeholder="OTP"
              value={pwdInfo.otp}
              onChange={(e) => {
                setPwdInfo({ ...pwdInfo, otp: e.target.value });
              }}
            />
            <br />
          </label>

          <label>
            New Password:
            <input
              required
              type="newpassword"
              minLength="8"
              placeholder="New Password"
              value={pwdInfo.newpwd}
              onChange={(e) => {
                setPwdInfo({ ...pwdInfo, newpwd: e.target.value });
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
