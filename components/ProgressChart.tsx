
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { EvolutionData } from '../types';

interface ProgressChartProps {
  data: EvolutionData;
}

export const ProgressChart: React.FC<ProgressChartProps> = ({ data }) => {
  const chartData = data.labels.map((label, index) => ({
    name: label,
    Carga: data.data[index],
  }));

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
          <XAxis dataKey="name" stroke="#a0a0a0" fontSize={12} />
          <YAxis stroke="#a0a0a0" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e1e1e',
              borderColor: '#333333',
              color: '#f5f5f5',
            }}
            labelStyle={{ color: '#D4AF37', fontWeight: 'bold' }}
          />
          <Legend wrapperStyle={{ fontSize: '14px' }} />
          <Line type="monotone" dataKey="Carga" stroke="#D4AF37" strokeWidth={2} activeDot={{ r: 8 }} dot={{r: 4}}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
