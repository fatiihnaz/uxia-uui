"use client";

import React, { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const MusicPlayer = ({ volume }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = new Audio(window.location.origin + "/rickroll.mp3");

    audioRef.current = audio;
    audio.loop = true;

    const onLoadedMetadata = () => {
      setDuration(audio.duration);
    };
    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      audio.pause();
      audio.src = "";
      audio.load();
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      // Eğer volume değeri undefined veya 0 ise varsayılan olarak 0.2 ata
      const initialVolume = volume === undefined || volume === 0 ? 0.2 : volume;
      audioRef.current.volume = initialVolume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => console.error(err));
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full max-w-sm bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center space-y-4">
      <div className="text-center">
        <h2 className="text-lg text-black dark:text-white font-bold">Never Gonna Give You Up</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Rick Astley</p>
      </div>

      <div className="w-full flex items-center space-x-2">
        <span className="text-xs text-gray-500 dark:text-gray-400">{formatTime(currentTime)}</span>
        <div className="flex-grow h-1 bg-gray-400 dark:bg-gray-600 rounded-full relative">
          <div
            className="absolute h-1 bg-purple-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {formatTime(duration - currentTime)}
        </span>
      </div>

      <button
        onClick={togglePlay}
        className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full text-xl focus:outline-none transition"
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
    </div>
  );
};

export default MusicPlayer;
