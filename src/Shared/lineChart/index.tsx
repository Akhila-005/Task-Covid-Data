// src/components/LineChart.tsx
import React from "react";
import Plot from "react-plotly.js";

interface LineChartProps {
  historicalData: { date: string; cases: number }[];
}

const LineChart: React.FC<LineChartProps> = ({ historicalData }) => {
  return (
    <Plot
      data={[
        {
          x: historicalData.map((data) => data.date),
          y: historicalData.map((data) => data.cases),
          type: "scatter",
          mode: "lines+markers",
          name: "Cases",
        },
      ]}
      layout={{ title: "COVID-19 Cases Over Time" }}
    />
  );
};

export default LineChart;
