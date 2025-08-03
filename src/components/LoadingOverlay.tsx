import React from 'react';

interface LoadingOverlayProps {
  message: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message }) => {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/90 p-4 text-center transition-opacity duration-300">
      <div className="w-16 h-16 border-4 border-t-gold border-gray-700 rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-semibold text-white">{message}</p>
    </div>
  );
};
