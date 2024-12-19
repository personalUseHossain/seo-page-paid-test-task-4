'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';


const doubleLabels = {
    id: "doubleLabels",
    afterDatasetsDraw(chart, args, plugins) {
      const { ctx } = chart;
      const top_label = chart.options.top_label; // Get top_label from chart options
      ctx.save();
  
      // Iterate through the data points of the first dataset (index 0)
      chart.getDatasetMeta(0).data.forEach((dataPoint, index) => {
        const value = chart.data.datasets[0].data[index];
        const xLabel = chart.data.labels[index];
  
        // Only draw the label if the value is greater than 0
        if (value > 0 && top_label) {
            function extractNumber(str) {
                let number;
                let symbol = "";
              
                // Check if the string contains a hyphen (range)
                if (str.includes('-')) {
                  // Split the string by '-' and take the first part
                  number = parseInt(str.split('-')[0], 10);
                } else {
                  // If it's just a single value, directly parse it
                  number = parseInt(str, 10);
                }
              
                // Check for percentage symbol
                if (str.includes('%')) {
                  symbol = '%';
                }
                
                // Check for dollar symbol
                if (str.includes('$')) {
                  symbol = '$';
                }
              
                // Add the symbol in the appropriate position
                if (symbol === '%') {
                  return `${number}${symbol}`;  // Append % to the number
                } else if (symbol === '$') {
                  return `${symbol}${number}`;  // Prepend $ to the number
                }
              
                // Return just the number if there's no symbol
                return number;
              }


          // Draw the horizontal label (above the bar)
          ctx.font = "12px sans-serif";
          ctx.fillStyle = "#1492E6";
          ctx.fillText(`${extractNumber(xLabel)}, ${value}%`, dataPoint.x - 20, dataPoint.y - 10);
  
          const barHeight = dataPoint.height; // Get the height of the bar
        const barCenterY = dataPoint.y + barHeight / 2; // Vertical center of the bar

        ctx.fillStyle = "black";

        // Adjust the text position to center it vertically relative to the bar
        ctx.fillText(`Rate: ${extractNumber(xLabel)}`, dataPoint.x + 15, barCenterY - 10); // -10 to adjust for font size
        ctx.fillText(`Incentive ${value}%`, dataPoint.x + 15, barCenterY + 5); 
        }
      });
  
      ctx.restore();
    },
  };

  const minimumBarHeight = {
    id: "minimumBarHeight",
    beforeDatasetsDraw(chart) {
      const { ctx } = chart;
      ctx.save();
  
      chart.getDatasetMeta(0).data.forEach((bar, index) => {
        const value = chart.data.datasets[0].data[index];

        const top_label = chart.options.top_label

        if (value === 0 && !top_label) {
          const minBarHeight = 10; // Set the minimum height for zero-value bars
          const originalHeight = bar.height;
  
          // Adjust bar height to be at least the minimum height
          const newHeight = Math.max(originalHeight, minBarHeight);
  
          // Calculate new Y position to maintain the visual alignment
          const yDiff = originalHeight - newHeight;
          bar.y += yDiff; // Push bar upwards
          bar.height = newHeight; // Set the new height
          bar.borderRadius = 10
        }
      });
  
      ctx.restore();
    },
  };



  
  



const topLable = {
  id: "topLable",
  afterDatasetsDraw(chart, args, plugins) {
    const { ctx, data } = chart;
    ctx.save();

    // Iterate through the data points of the first dataset (index 0)
    chart.getDatasetMeta(0).data.forEach((dataPoint, index) => {
      // Get the value of the current data point from the dataset
      const value = chart.data.datasets[0].data[index];
        const top_label = chart.options.top_label
      // Only draw the label if the value is greater than 0

      if (value > 1 && !top_label) {
        ctx.textAlign = 'center'
        ctx.font = 'thin 12px sans-serif';
        ctx.fillStyle = 'white'; // You can dynamically adjust this based on barColor if needed
        ctx.fillText(`${value}%`, dataPoint.x, dataPoint.y + 15); // -10 to position the text above the bar

      }
    });

    ctx.restore();
  }
};

// Register necessary ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, doubleLabels, topLable, minimumBarHeight);

const BarChart = ({
  chartData,
  barColors = [],
  chartOptions = {},
  width = '700px',
  height = '400px',
  x_label,
  y_label,
  top_label = false,
  showInsideBarText = false,
  barRounded = false,
  minBarHeight = false, // Minimum height for bars with zero value
}) => {
  const chartRef = useRef(null);
  const [gradientColors, setGradientColors] = useState([]);

  // Generate gradients
  const createGradients = (chart) => {
    const ctx = chart.ctx;
    const gradients = barColors.map((colors) => {
      const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);
      gradient.addColorStop(0, colors[0]);
      gradient.addColorStop(1, colors[1]);
      return gradient;
    });
    return gradients;
  };

  useEffect(() => {
    if (chartRef.current) {
      const gradients = createGradients(chartRef.current);
      setGradientColors(gradients);
    }
  }, [barColors]);

  // Merge dynamic gradients with input data
  const processedData = {
    ...chartData,
    datasets: chartData.datasets.map((dataset, index) => ({
      ...dataset,
      backgroundColor: gradientColors.length ? gradientColors : barColors.map((c) => c[1]),
      borderRadius: barRounded ? 100 : dataset.borderRadius || 10,
      barThickness: dataset.barThickness || 50,
    })),
  };

  // Include top_label in chart options
  const defaultOptions = {
    top_label,
    showInsideBarText,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        stacked: true,
        grid: { display: false },
        ticks: { font: { size: 14 } },
        title: {
          display: true,
          text: `----------------------------------------------------------> ${x_label} <-----------------------------------------------------------`,
          color: '#1492E6',
        },
      },
      y: {
        grace: 10,
        stacked: true,
        beginAtZero: true,
        min: 0,
        ticks: {
          callback: (value) => value + '%',
        },
        grid: {
          color: '#e5e7eb',
          borderDash: [5, 5],
        },
        title: {
          display: true,
          text: `--------> ${y_label} <---------------`,
          color: '#1492E6',
        },
      },
    },
    ...chartOptions,
  };

  return (
    <div style={{ width, height }}>
      <Bar ref={chartRef} data={processedData} options={defaultOptions} />
    </div>
  );
};

export default BarChart;
