import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({labels=[],data=[],ylabel}) => {
  const datas = {
    labels: labels,
    datasets: [
      {
        label: "PLAYER NAME",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: data,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Player",
          font: {
            weight: "bold",
          },
        },
      },
      y: {
        title: {
          display: true,
          text: ylabel,
          font: {
            weight: "bold",
          },
        },
      },
    },
  };
  return (
<div style={{width:'800px',height:'650px',marginLeft:'20px'}}>
        <Bar data={datas} options={chartOptions}/>
    </div>
  );
};

export default BarChart;