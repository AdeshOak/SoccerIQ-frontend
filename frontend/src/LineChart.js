import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const labels = ["January", "February", "March", "April", "May", "June"];



const LineChart = ({ chartLabel = "", labels=["January", "February", "March", "April", "May", "June"], data=[0, 10, 5, 2, 20, 30, 45],color='red' }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: chartLabel,
        backgroundColor: color,
        borderColor: color,
        data: data,
      },
    ],
  }
   // Define options for the chart
   const chartOptions = {
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Minutes of the Game',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: chartLabel,
        },
      },
    },
  };


  return (
    <div style={{width:'600px',marginLeft:'10px'}}>
      <Line data={chartData} options={chartOptions} style={{height:'600px'}}/>
    </div>
  );
};

export default LineChart;