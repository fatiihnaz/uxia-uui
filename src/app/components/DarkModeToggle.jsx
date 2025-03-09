"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RiMoonClearFill } from "react-icons/ri";
import { HiSun } from "react-icons/hi";

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
        setIsDark(true);
      } else {
        document.documentElement.classList.remove("dark");
        setIsDark(false);
      }
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDark((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newMode;
    });
  };

  return (
    <motion.button
      onClick={toggleDarkMode}
      className="flex items-center w-14 h-8 p-1 bg-gray-200 dark:bg-gray-700 rounded-full shadow-lg"
      aria-label="Toggle Dark Mode"
    >
      <motion.div
        className="w-6 h-6 rounded-full bg-white dark:bg-gray-900 shadow-md flex items-center justify-center"
        animate={{ x: isDark ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25, duration: 0.4 }}
      >
        {isDark ? (
          <RiMoonClearFill className="text-xs text-white" />
        ) : (
          <HiSun className="text-s text-gray-900" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default DarkModeToggle;
