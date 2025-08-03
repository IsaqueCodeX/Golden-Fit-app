
import React from 'react';
import { NAV_ITEMS } from '../constants';

interface BottomNavProps {
  activeScreen: 'dashboard' | 'progresso' | 'perfil';
  onNavigate: (screen: 'dashboard' | 'progresso' | 'perfil') => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, onNavigate }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#333333] bg-[rgba(30,30,30,0.8)] backdrop-blur-lg" style={{ paddingBottom: 'env(safe-area-inset-bottom)', height: '68px' }}>
      <div className="container mx-auto flex h-full max-w-lg items-center justify-around">
        {NAV_ITEMS.map((item) => {
          const isActive = activeScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as 'dashboard' | 'progresso' | 'perfil')}
              className={`flex h-full flex-1 flex-col items-center justify-center transition-all duration-300 ${isActive ? 'text-gold scale-110' : 'text-[#a0a0a0]'}`}
            >
              <i className={`fa-solid ${item.icon} text-xl`}></i>
              <span className="mt-1 text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};