import React from "react";
import { Bar } from 'react-chartjs-2';
import { Box } from "@mui/material";

const GroupedBarChart = ({ labels = [], actual = [], expected = [], ylabel }) => {
  // Dark theme colors for chart
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Actual Goals',
        backgroundColor: "rgba(0, 188, 212, 0.7)", // Primary cyan
        borderColor: "rgba(0, 188, 212, 1)",
        borderWidth: 1,
        borderRadius: 4,
        data: actual,
        hoverBackgroundColor: "rgba(0, 188, 212, 0.9)",
      }, 
      {
        label: 'Expected Goals',
        backgroundColor: "rgba(255, 64, 129, 0.7)", // Secondary pink
        borderColor: "rgba(255, 64, 129, 1)",
        borderWidth: 1,
        borderRadius: 4,
        data: expected,
        hoverBackgroundColor: "rgba(255, 64, 129, 0.9)",
      }
    ],
  };           
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'center',
        labels: {
          boxWidth: 15,
          padding: 15,
          color: "#FFFFFF",
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: 'Actual vs Expected Goals Comparison',
        color: "#FFFFFF",
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 20
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
        },
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y;
            }
            return label;
          }
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
          display: false,
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
      }
    },
    animation: {
      duration: 1200,
      easing: 'easeOutQuart'
    },
    barPercentage: 0.8,
    categoryPercentage: 0.7
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

export default GroupedBarChart;