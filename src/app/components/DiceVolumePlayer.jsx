"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaDiceOne,
  FaDiceTwo,
  FaDiceThree,
  FaDiceFour,
  FaDiceFive,
  FaDiceSix,
} from "react-icons/fa";

const DiceIcon = ({ value, size = 30 }) => {
  switch (value) {
    case 1:
      return <FaDiceOne size={size} />;
    case 2:
      return <FaDiceTwo size={size} />;
    case 3:
      return <FaDiceThree size={size} />;
    case 4:
      return <FaDiceFour size={size} />;
    case 5:
      return <FaDiceFive size={size} />;
    case 6:
      return <FaDiceSix size={size} />;
    default:
      return null;
  }
};

const DiceVolumePlayer = ({ dice, setDice, onVolumeChange }) => {
  useEffect(() => {
    const total = dice.reduce((acc, d) => acc + d.value, 0);
    const normalizedVolume = (total - 16) / (96 - 16);
    onVolumeChange?.(normalizedVolume);
  }, [dice, onVolumeChange]);

  const total = dice.reduce((acc, d) => acc + d.value, 0);
  const normalizedVolume = (total - 16) / (96 - 16);
  const volumePercent = Math.round(normalizedVolume * 100);

  const handleRoll = () => {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.hold ? die : { ...die, value: Math.floor(Math.random() * 6) + 1 }
      )
    );
  };

  const toggleHold = (index) => {
    setDice((prevDice) =>
      prevDice.map((die, i) =>
        i === index ? { ...die, hold: !die.hold } : die
      )
    );
  };

  const containerVariants = {
    hidden: {
      opacity: 0,
      scaleX: 0,
      scaleY: 0,
      originX: 1, 
      originY: 0, 
    },
    visible: {
      opacity: 1,
      scaleX: 1,
      scaleY: 1,
      transition: {
        scaleX: { duration: 0.2, ease: "easeInOut" },
        scaleY: { delay: 0.2, duration: 0.2, ease: "easeInOut" },
        opacity: { duration: 0.4, ease: "easeInOut" },
        when: "beforeChildren",
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      scaleY: 0,
      scaleX: 0,
      transition: {
        scaleY: { duration: 0.2, ease: "easeInOut" },
        scaleX: { delay: 0.2, duration: 0.2, ease: "easeInOut" },
        opacity: { duration: 0.4, ease: "easeInOut" },
        when: "afterChildren",
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-4 rounded shadow-xl w-64"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className="mb-2 text-center text-sm font-semibold"
        variants={itemVariants}
      >
        Volume: {volumePercent}%
      </motion.div>

      <motion.div
        className="grid grid-cols-4 gap-2 mb-4"
        variants={itemVariants}
      >
        {dice.map((die, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center bg-gray-200 dark:bg-gray-700 p-2 rounded"
            variants={itemVariants}
          >
            <DiceIcon value={die.value} />
            <label className="mt-1 flex items-center space-x-1 text-xs">
              <input
                type="checkbox"
                className="form-checkbox h-3 w-3"
                checked={die.hold}
                onChange={() => toggleHold(index)}
              />
              <span>Hold</span>
            </label>
          </motion.div>
        ))}
      </motion.div>

      <motion.button
        onClick={handleRoll}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
        variants={itemVariants}
      >
        Roll
      </motion.button>
    </motion.div>
  );
};

export default DiceVolumePlayer;
