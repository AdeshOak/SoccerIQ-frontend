import React from "react";
import { Bar } from "react-chartjs-2";
import { Box } from "@mui/material";

const BarChart = ({ labels = [], data = [], ylabel }) => {
  // Dark theme colors for chart
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "PLAYER NAME",
        backgroundColor: "rgba(0, 188, 212, 0.7)",
        borderColor: "rgba(0, 188, 212, 1)",
        borderWidth: 1,
        borderRadius: 4,
        data: data,
        hoverBackgroundColor: "rgba(0, 188, 212, 0.9)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#FFFFFF",
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: "rgba(30, 30, 30, 0.8)",
        titleColor: "#FFFFFF",
        bodyColor: "#FFFFFF",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
        titleFont: {
          weight: "bold",
          size: 14
        },
        bodyFont: {
          size: 13
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Player",
          color: "#FFFFFF",
          font: {
            weight: "bold",
            size: 14
          },
        },
        ticks: {
          color: "#B0BEC5",
          maxRotation: 45,
          minRotation: 45,
          font: {
            size: 11
          }
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
          borderColor: "rgba(255, 255, 255, 0.15)",
        }
      },
      y: {
        title: {
          display: true,
          text: ylabel,
          color: "#FFFFFF",
          font: {
            weight: "bold",
            size: 14
          },
        },
        ticks: {
          color: "#B0BEC5",
          font: {
            size: 12
          }
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
          borderColor: "rgba(255, 255, 255, 0.15)",
        }
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart'
    }
  };

  return (
    <Box sx={{ 
      width: '100%', 
      height: 500,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 1
    }}>
      <Bar data={chartData} options={chartOptions} />
    </Box>
  );
};

export default BarChart;