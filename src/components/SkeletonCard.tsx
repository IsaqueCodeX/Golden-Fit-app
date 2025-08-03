
import React from 'react';

const Card: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
  <div className={`rounded-2xl border-2 bg-[#1e1e1e] p-6 shadow-lg border-[#333333] ${className}`}>
    {children}
  </div>
);

export const SkeletonCard: React.FC<{ lines?: number }> = ({ lines = 3 }) => {
    return (
        <Card className="animate-pulse">
            <div className="h-6 w-1/2 rounded bg-gray-700 mb-4"></div>
            {Array.from({ length: lines }).map((_, i) => (
                <div key={i} className={`h-4 rounded bg-gray-700 ${i === lines-1 ? 'w-2/3' : 'w-full'} mb-2`}></div>
            ))}
        </Card>
    );
};
