// PieChart.tsx
import React from "react";
import { Pie } from "react-chartjs-2";

interface PieChartProps {
  recovered: number;
  active: number;
  deaths: number;
}

const PieChart: React.FC<PieChartProps> = ({ recovered, active, deaths }) => {
  const chartData = {
    labels: ["Recovered", "Active", "Deaths"],
    datasets: [
      {
        data: [recovered, active, deaths],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
      },
    ],
  };

  return (
    <div>
      <h2>Data Visualization</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;
