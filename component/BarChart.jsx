
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

// import ChartDataLabels from 'chartjs-plugin-datalabels';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// const BarChart = ({
//   chartData,
//   barColors = [],
//   chartOptions = {},
//   width = '700px',
//   height = '400px',
//   x_label,
//   y_label,
//   top_label = [], // Array of { index: 'bar index', value: 'text', color: 'color' }
//   showInsideBarText = false, // Toggle for text inside bars
//   minBarHeight = 20,
// }) => {

    
// // Register Chart.js components


// if (showInsideBarText == true) {
//     ChartJS.register(ChartDataLabels); // Register ChartDataLabels only if showInsideBarText is true
//   }


//   const chartRef = useRef(null);
//   const [gradientColors, setGradientColors] = useState([]);

//   // Generate gradients
//   const createGradients = (chart) => {
//     const ctx = chart.ctx;
//     const gradients = barColors.map((colors) => {
//       const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);
//       gradient.addColorStop(0, colors[0]);
//       gradient.addColorStop(1, colors[1]);
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
//         : barColors.map((c) => c[1]),
//       borderRadius: dataset.borderRadius || 10,
//       barThickness: dataset.barThickness || 50,
//     })),
//   };

//   const textInsideBarPlugin = {
//     id: 'textInsideBarPlugin',
//     beforeDraw: (chart) => {
//       if (!showInsideBarText) return; // Do nothing if text display is disabled

//       const ctx = chart.ctx;
//       const datasets = chart.data.datasets;

//       datasets.forEach((dataset, datasetIndex) => {
//         const meta = chart.getDatasetMeta(datasetIndex);
//         meta.data.forEach((bar, index) => {
//           const value = dataset.data[index];
//           const barX = bar.x;
//           const barY = bar.y;

//           // If the value is 0, give it a minimum height to display it
//           const adjustedHeight = value === 0 ? minBarHeight : bar.height;

//           ctx.save();
//           ctx.font = 'bold 12px Arial';
//           ctx.fillStyle = '#FFFFFF'; // White text color
//           ctx.textAlign = 'center';
//           ctx.textBaseline = 'middle';

//           // Render text inside the bar
//           ctx.fillText(`${value}%`, barX, barY + (adjustedHeight / 2));
//           ctx.restore();
//         });
//       });
//     },
//   };

//   // Register the plugin if textInsideBarText is true
//   if (showInsideBarText) {
//     ChartJS.register(textInsideBarPlugin);
//   }

//   const defaultOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { display: false },
//       tooltip: { enabled: true },
//       datalabels: {
//         color: '#FFFFFF',
//         align: "top",
//         formatter: function(value, context) {
//             return value + '%';
//           }
//       }
//     },
//     scales: {
//       x: {
//         stacked: true,
//         grid: { display: false },
//         ticks: { font: { size: 14 } },
//         title: {
//           display: true,
//           text: x_label,
//           color: '#1492E6',
//         },
//       },
//       y: {
//         stacked: true,
//         beginAtZero: true,
//         min: 0,
//         ticks: {
//           stepSize: 25,
//           callback: (value) => value + '%',
//         },
//         grid: {
//           color: '#e5e7eb',
//           borderDash: [5, 5],
//         },
//         title: {
//           display: true,
//           text: y_label,
//           color: '#1492E6',
//         },
//       },
//     },
//     ...chartOptions,
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
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register necessary ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarChart = ({
  chartData,
  barColors = [],
  chartOptions = {},
  width = '700px',
  height = '400px',
  x_label,
  y_label,
  top_label = [],
  showInsideBarText = false,
  barRounded = false,
  minBarHeight = false, // Minimum height for bars with zero value
}) => {
  const chartRef = useRef(null);
  const [gradientColors, setGradientColors] = useState([]);
  
  // Register ChartDataLabels only if showInsideBarText is true
  useEffect(() => {
    if (showInsideBarText) {
      ChartJS.register(ChartDataLabels);
    }
  }, [showInsideBarText]);


  
  // Custom plugin to ensure bars with zero value have a minimum height
  const minHeightPlugin = {
    id: 'minHeightPlugin',
    beforeDraw: (chart) => {
      const ctx = chart.ctx;
      const datasets = chart.data.datasets;
  
      // Only apply minimum height logic if minBarHeight is set and greater than 0
      if (minBarHeight) {
        datasets.forEach((dataset, datasetIndex) => {
          const meta = chart.getDatasetMeta(datasetIndex);
          meta.data.forEach((bar, index) => {
            const value = dataset.data[index];
  
            // If the value is zero, adjust the height to the minimum value
            if (value === 0) {
              bar.height = minBarHeight;
              bar.y = chart.scales['y'].getPixelForValue(0) - bar.height;
            }
          });
        });
      }
    },
  };
  

  // Register the minHeightPlugin only when minBarHeight > 0
  useEffect(() => {
    if (minBarHeight) {
      ChartJS.register(minHeightPlugin);
    }
  }, [minBarHeight]);

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


  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
      datalabels: showInsideBarText && {
        color: '#FFFFFF',
        align: 'center',
        anchor: 'center',
        formatter: function(value) {
          return value + '%';
        },
        font: {
          size: 12,
          weight: 'bold',
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: { display: false },
        ticks: { font: { size: 14 } },
        title: {
          display: true,
          text: x_label,
          color: '#1492E6',
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        min: 0,
        ticks: {
          stepSize: 25,
          callback: (value) => value + '%',
        },
        grid: {
          color: '#e5e7eb',
          borderDash: [5, 5],
        },
        title: {
          display: true,
          text: y_label,
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
