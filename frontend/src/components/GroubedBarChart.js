import React from "react";
import { Bar } from 'react-chartjs-2'

const GroupedBarChart = ({labels=[],actual=[],expected=[],ylabel}) =>{
  console.log(labels+' actual goals',actual,'expected',expected)
        const data = {
            labels: labels,
            datasets: [{
                label: 'Actual Goals',
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgb(0,0,255,0.9)",
                borderWidth: 1,
                data: actual
              }, {
                label: 'Expected Goals',
                backgroundColor: "rgb(0,255,255,0.9)",
                borderColor: "rgba(0, 123, 255, 1)",
                borderWidth: 1,
                data: expected
              }],
            };              
          
          const options = {
            scales: {
              x: {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Players',
                  color: 'black',
                  font: {
                    weight: 'bold'
                  }
                }
              },
              y: {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: ylabel,
                  color: 'black',
                  font: {
                    weight: 'bold'
                  }
                }
              }},
            plugins: {
              title: {
                display: true,
                text: 'Goals',
                color: 'black',
                font: {
                  size: 20,
                  weight: 'bold'
                }
              },
            }
          };
  





  return (
    <div style={{width:'800px',height:'650px',marginLeft:'20px'}}>
        <Bar data={data} options={options} />
    </div>
  );
};

export default GroupedBarChart;