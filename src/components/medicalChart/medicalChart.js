import React from 'react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

const MedicalChart = ({data}) => {
  return (
      <LineChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="date"/>
        <YAxis/>
        <Line type="monotone" dataKey="value" stroke="#ff00ff"/>
      </LineChart>
  );
};

export default MedicalChart;