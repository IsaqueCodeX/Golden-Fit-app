
import React from 'react';

interface StatCardProps {
  icon: string;
  value: string | number;
  label: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ icon, value, label, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center rounded-lg border border-[#4a4a4a] bg-transparent p-4 text-center ${className}`}>
      <i className={`fa-solid ${icon} mb-2 text-2xl text-gold`}></i>
      <p className="font-header text-4xl leading-none">{value}</p>
      <p className="mt-1 text-sm text-[#a0a0a0]">{label}</p>
    </div>
  );
};
