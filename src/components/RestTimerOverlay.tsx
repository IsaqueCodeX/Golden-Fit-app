
import React, { useState, useEffect } from 'react';

interface RestTimerOverlayProps {
  duration: number;
  nextExerciseName: string;
  onClose: () => void;
  onSkip: () => void;
}

export const RestTimerOverlay: React.FC<RestTimerOverlayProps> = ({ duration, nextExerciseName, onClose, onSkip }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (timeLeft <= 0) {
      onClose();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onClose]);
  
  const handleTimeAdjustment = (amount: number) => {
    setTimeLeft(prev => Math.max(0, prev + amount));
  };

  const progress = (timeLeft / duration) * 100;
  const offset = circumference - (progress / 100) * circumference;

  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 p-4 text-center transition-opacity duration-300">
      <p className="font-header text-3xl text-[#a0a0a0]">DESCANSO</p>
      <div className="relative my-4 flex h-64 w-64 items-center justify-center">
        <svg className="h-full w-full" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} strokeWidth="8" className="stroke-gray-700"></circle>
          <circle
            cx="50"
            cy="50"
            r={radius}
            strokeWidth="8"
            className="stroke-gold"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: offset,
              transform: 'rotate(-90deg)',
              transformOrigin: '50% 50%',
              transition: 'stroke-dashoffset 1s linear',
            }}
          ></circle>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-header text-7xl text-gold">
          {minutes}:{seconds}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button onClick={() => handleTimeAdjustment(-15)} className="h-14 w-14 rounded-full bg-gray-800 text-2xl font-bold">-15s</button>
        <button onClick={onSkip} className="main-button w-auto rounded-xl bg-gold px-8 py-4 text-lg font-bold tracking-wider text-[#121212] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-dark">
          PULAR
        </button>
         <button onClick={() => handleTimeAdjustment(15)} className="h-14 w-14 rounded-full bg-gray-800 text-2xl font-bold">+15s</button>
      </div>
      <p className="mt-6 text-gray-500">Próximo:</p>
      <p className="text-xl font-bold">{nextExerciseName}</p>
    </div>
  );
};
