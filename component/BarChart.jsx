// 'use client';

// import React, { useRef, useEffect, useState } from 'react';
// import { Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Tooltip,
//   Legend
// } from 'chart.js';

// // Register Chart.js components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// const BarChart = ({ chartData, barColors = [], chartOptions = {}, width = '700px', height = '400px', x_label, y_label }) => {
//   const chartRef = useRef(null); // Reference to the chart
//   const [gradientColors, setGradientColors] = useState([]);

//   // Generate gradients
//   const createGradients = (chart) => {
//     const ctx = chart.ctx;
//     const gradients = barColors.map((colors) => {
//       const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);
//       gradient.addColorStop(0, colors[0]); // Dark color at the top
//       gradient.addColorStop(1, colors[1]); // Light color at the bottom
//       return gradient;
//     });
//     return gradients;
//   };

//   useEffect(() => {
//     if (chartRef.current) {
//       const gradients = createGradients(chartRef.current);
//       setGradientColors(gradients);
//     }
//   }, [barColors]);

//   // Merge dynamic gradients with input data
//   const processedData = {
//     ...chartData,
//     datasets: chartData.datasets.map((dataset, index) => ({
//       ...dataset,
//       backgroundColor: gradientColors.length
//         ? gradientColors
//         : barColors.map((c) => c[1]), // Fallback to solid colors if gradients not ready
//       borderRadius: dataset.borderRadius || 10, // Default rounded corners
//       barThickness: dataset.barThickness || 50, // Default bar width
//     })),
//   };

//   const defaultOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         display: false,
//       },
//       tooltip: {
//         enabled: true,
//       },
//     },
//     scales: {
//       x: {
//         grid: {
//           display: false,
//         },
//         ticks: {
//           font: {
//             size: 14,
//           },
//         },
//         title:{
//             display: true,
//             text: x_label,
//             color: "#1492E6"
//         }
//       },
//       y: {
//         beginAtZero: true,
//         min: 0,
//         ticks: {
//           stepSize: 25,
//           callback: (value) => value + '%',
//         },
//         grid: {
//           color: '#e5e7eb',
//           borderDash: [5, 5], // Default dashed grid lines
//         },
//         title:{
//             display: true,
//             text: y_label,
//             color: "#1492E6"
//         }
//       },
//     },
//     ...chartOptions, // Allow overriding default options
//   };

//   return (
//     <div style={{ width, height }}>
//       <Bar ref={chartRef} data={processedData} options={defaultOptions} />
//     </div>
//   );
// };

// export default BarChart;




'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarChart = ({
  chartData,
  barColors = [],
  chartOptions = {},
  width = '700px',
  height = '400px',
  x_label,
  y_label,
  topText = [], // Array of { index: 'bar index', value: 'text', color: 'color' }
  leftText = [], // Array of { index: 'bar index', value: 'text', color: 'color' }
  rightText = [], // Array of { index: 'bar index', value: 'text', color: 'color' }
}) => {
  const chartRef = useRef(null); // Reference to the chart
  const [gradientColors, setGradientColors] = useState([]);

  // Generate gradients
  const createGradients = (chart) => {
    const ctx = chart.ctx;
    const gradients = barColors.map((colors) => {
      const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);
      gradient.addColorStop(0, colors[0]); // Dark color at the top
      gradient.addColorStop(1, colors[1]); // Light color at the bottom
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
      backgroundColor: gradientColors.length
        ? gradientColors
        : barColors.map((c) => c[1]), // Fallback to solid colors if gradients not ready
      borderRadius: dataset.borderRadius || 10, // Default rounded corners
      barThickness: dataset.barThickness || 50, // Default bar width
    })),
  };

  // Custom plugin to render text on top, left, or right of bars
  const textPlugin = {
    id: 'textPlugin',
    beforeDraw: (chart) => {
      const ctx = chart.ctx;
      const chartArea = chart.chartArea;
      const xAxis = chart.scales['x'];
      const yAxis = chart.scales['y'];

      // Iterate over each dataset and each bar to draw the text
      chart.data.datasets.forEach((dataset, datasetIndex) => {
        dataset.data.forEach((dataValue, index) => {
          const bar = chart.getDatasetMeta(datasetIndex).data[index];
          const barX = bar.x;
          const barY = bar.y;

          ctx.save();
          ctx.font = '14px Arial';

          // Check if there's top text for this bar
          const topTextData = topText.find((item) => item.index === index);
          if (topTextData) {
            ctx.fillStyle = topTextData.color || '#000'; // Default to black if no color
            ctx.fillText(topTextData.value, barX - ctx.measureText(topTextData.value).width / 2, barY - 10); // Above the bar
          }

          // Check if there's left text for this bar
          const leftTextData = leftText.find((item) => item.index === index);
          if (leftTextData) {
            ctx.fillStyle = leftTextData.color || '#000'; // Default to black if no color
            ctx.fillText(leftTextData.value, barX - 20, barY); // Left of the bar
          }

          // Check if there's right text for this bar
          const rightTextData = rightText.find((item) => item.index === index);
          if (rightTextData) {
            ctx.fillStyle = rightTextData.color || '#000'; // Default to black if no color
            ctx.fillText(rightTextData.value, barX + 20, barY); // Right of the bar
          }

          ctx.restore();
        });
      });
    },
  };

  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
      textPlugin, // Add the custom text plugin here
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 14,
          },
        },
        title: {
          display: true,
          text: x_label,
          color: '#1492E6',
        },
      },
      y: {
        beginAtZero: true,
        min: 0,
        ticks: {
          stepSize: 25,
          callback: (value) => value + '%',
        },
        grid: {
          color: '#e5e7eb',
          borderDash: [5, 5], // Default dashed grid lines
        },
        title: {
          display: true,
          text: y_label,
          color: '#1492E6',
        },
      },
    },
    ...chartOptions, // Allow overriding default options
  };

  return (
    <div style={{ width, height }}>
      <Bar ref={chartRef} data={processedData} options={defaultOptions} />
    </div>
  );
};

export default BarChart;
