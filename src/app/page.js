"use client";

import React, { useState } from "react";
import DarkModeToggle from "./components/DarkModeToggle";
import MusicPlayer from "./components/MusicPlayer";
import { HiVolumeUp } from "react-icons/hi";
import DiceVolumePlayer from "./components/DiceVolumePlayer";
import { AnimatePresence } from "framer-motion";

const App = () => {
  const [dice, setDice] = useState(() =>
    Array.from({ length: 16 }, () => ({
      value: Math.floor(Math.random() * 6) + 1,
      hold: false,
    }))
  );

  const [showVolumeDropdown, setShowVolumeDropdown] = useState(false);
  const [volume, setVolume] = useState(0);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="w-full flex justify-end items-center p-4 space-x-4">
        <div className="relative z-50">
          <button
            onClick={() => setShowVolumeDropdown(!showVolumeDropdown)}
            className="flex items-center h-8 p-1 bg-gray-200 dark:bg-gray-700 rounded-full shadow-lg"
            aria-label="Toggle Volume"
          >
            <div className="w-6 h-6 rounded-full bg-white dark:bg-gray-900 shadow-md flex items-center justify-center">
              <HiVolumeUp className="text-gray-900 dark:text-white" size={16} />
            </div>
          </button>
          <AnimatePresence>
            {showVolumeDropdown && (
              <div className="absolute right-0 mt-2">
                <DiceVolumePlayer
                  dice={dice}
                  setDice={setDice}
                  onVolumeChange={setVolume}
                />
              </div>
            )}
          </AnimatePresence>
        </div>
        <DarkModeToggle />
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <MusicPlayer volume={volume} />
      </main>
    </div>
  );
};

export default App;
