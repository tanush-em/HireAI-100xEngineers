import React from 'react';

export const ChartContainer = ({ children, config, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export const ChartTooltip = ({ children, ...props }) => {
  return (
    <div {...props}>
      {children}
    </div>
  );
};

export const ChartTooltipContent = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 shadow-md rounded-md">
        <p className="font-medium">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm">
            {entry.name}: <span className="font-semibold">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
}; 