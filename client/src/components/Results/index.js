import React from "react";
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

export default function Results({ handleClose }) {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="resultscontainer"
      >
        <button className="closebtn" onClick={handleClose}>
          x
        </button>
        <h1>Results</h1>
      </motion.div>
    </Backdrop>
  );
}
