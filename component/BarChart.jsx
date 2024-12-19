

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
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ChartDataLabels);

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
  
//   useEffect(() => {
//     if (showInsideBarText) {
//       // Register the plugin only if it's needed
//       ChartJS.register(ChartDataLabels);
//     }
//     return () => {
//       if (showInsideBarText) {
//         // Unregister the plugin when it's no longer needed
//         ChartJS.unregister(ChartDataLabels);
//       }
//     };
//   }, [showInsideBarText]);


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
