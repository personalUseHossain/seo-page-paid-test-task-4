"use client";

import React, { useRef, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

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
          if (str.includes("-")) {
            // Split the string by '-' and take the first part
            number = parseInt(str.split("-")[0], 10);
          } else {
            // If it's just a single value, directly parse it
            number = parseInt(str, 10);
          }

          // Check for percentage symbol
          if (str.includes("%")) {
            symbol = "%";
          }

          // Check for dollar symbol
          if (str.includes("$")) {
            symbol = "$";
          }

          // Add the symbol in the appropriate position
          if (symbol === "%") {
            return `${number}${symbol}`; // Append % to the number
          } else if (symbol === "$") {
            return `${symbol}${number}`; // Prepend $ to the number
          }

          // Return just the number if there's no symbol
          return number;
        }

        // Draw the horizontal label (above the bar)
        ctx.font = "12px sans-serif";
        ctx.fillStyle = "#1492E6";
        ctx.fillText(
          `${extractNumber(xLabel)}, ${value}%`,
          dataPoint.x - 20,
          dataPoint.y - 10
        );

        const barHeight = dataPoint.height; // Get the height of the bar
        const barCenterY = dataPoint.y + barHeight / 2; // Vertical center of the bar

        ctx.fillStyle = "black";

        // Adjust the text position to center it vertically relative to the bar
        ctx.fillText(
          `Rate: ${extractNumber(xLabel)}`,
          dataPoint.x + 15,
          barCenterY - 10
        ); // -10 to adjust for font size
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

      const top_label = chart.options.top_label;

      if (value === 0 && !top_label) {
        const minBarHeight = 10; // Set the minimum height for zero-value bars
        const originalHeight = bar.height;

        // Adjust bar height to be at least the minimum height
        const newHeight = Math.max(originalHeight, minBarHeight);

        // Calculate new Y position to maintain the visual alignment
        const yDiff = originalHeight - newHeight;
        bar.y += yDiff; // Push bar upwards
        bar.height = newHeight; // Set the new height
        bar.borderRadius = 10;
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
      const top_label = chart.options.top_label;
      // Only draw the label if the value is greater than 0

      if (value > 1 && !top_label) {
        ctx.textAlign = "center";
        ctx.font = "thin 12px sans-serif";
        ctx.fillStyle = "white"; // You can dynamically adjust this based on barColor if needed
        ctx.fillText(`${value}%`, dataPoint.x, dataPoint.y + 15); // -10 to position the text above the bar
      }
    });

    ctx.restore();
  },
};

// const arrowTitlePlugin = {
//     id: 'arrowTitlePlugin',
//     beforeDraw(chart) {
//       const { ctx } = chart;
//       const xAxis = chart.scales['x']; // Get the x-axis
//       const yAxis = chart.scales['y']; // Get the y-axis for positioning

//       // Dimensions and positions
//       const lineThickness = 1; // Thickness of the horizontal line
//       const arrowWidth = 8; // Width of the arrow triangle
//       const arrowHeight = 8; // Height of the arrow triangle
//       const yPosition = yAxis.bottom + 40; // Vertical position of the arrows and line
//       const leftEnd = xAxis.left; // Start of the left stick
//       const rightEnd = xAxis.right; // End of the right stick
//       const label = chart.options.plugins.arrowTitlePlugin.xLabel || 'X-Axis Label';

//       // Length of the sticks before the arrows
//       const stickToArrowOffset = 20; // Space between the arrow tip and label

//       // Calculate arrow positions
//       const leftArrowTipX = xAxis.left + (xAxis.width / 2) - (ctx.measureText(label).width / 2) - stickToArrowOffset;
//       const rightArrowTipX = xAxis.left + (xAxis.width / 2) + (ctx.measureText(label).width / 2) + stickToArrowOffset;

//       // Draw left stick and arrow
//       ctx.beginPath();
//       ctx.lineWidth = lineThickness;
//       ctx.strokeStyle = '#1492E6';
//       ctx.moveTo(leftEnd, yPosition); // Start of the left stick
//       ctx.lineTo(leftArrowTipX, yPosition); // Draw the stick
//       ctx.stroke();

//       // Draw left arrow
//       ctx.beginPath();
//       ctx.moveTo(leftArrowTipX, yPosition - arrowHeight / 2); // Left corner of the arrow
//       ctx.lineTo(leftArrowTipX, yPosition + arrowHeight / 2); // Right corner of the arrow
//       ctx.lineTo(leftArrowTipX + arrowWidth, yPosition); // Tip of the arrow
//       ctx.closePath();
//       ctx.fillStyle = '#1492E6';
//       ctx.fill();

//       // Draw right stick and arrow
//       ctx.beginPath();
//       ctx.moveTo(rightEnd, yPosition); // Start of the right stick
//       ctx.lineTo(rightArrowTipX, yPosition); // Draw the stick
//       ctx.stroke();

//       // Draw right arrow
//       ctx.beginPath();
//       ctx.moveTo(rightArrowTipX, yPosition - arrowHeight / 2); // Right corner of the arrow
//       ctx.lineTo(rightArrowTipX, yPosition + arrowHeight / 2); // Left corner of the arrow
//       ctx.lineTo(rightArrowTipX - arrowWidth, yPosition); // Tip of the arrow
//       ctx.closePath();
//       ctx.fillStyle = '#1492E6';
//       ctx.fill();
//     },
//   };

const arrowTitlePlugin = {
  id: "arrowTitlePlugin",
  beforeDraw(chart) {
    const { ctx } = chart;
    const xAxis = chart.scales["x"]; // Get the x-axis
    const yAxis = chart.scales["y"]; // Get the y-axis

    // Dimensions and positions
    const lineThickness = 1; // Thickness of the horizontal line
    const arrowWidth = 8; // Width of the arrow triangle
    const arrowHeight = 8; // Height of the arrow triangle

    // X-Axis configuration
    const yPosition = yAxis.bottom + 40; // Vertical position of the X-axis arrows and line
    const leftEnd = xAxis.left; // Start of the left stick
    const rightEnd = xAxis.right; // End of the right stick
    const xLabel =
      chart.options.plugins.arrowTitlePlugin.xLabel || "X-Axis Label"; // X-axis label

    // Y-Axis configuration
    const xPosition = xAxis.left - 56; // Horizontal position of the Y-axis arrows and line
    const topEnd = yAxis.top; // Start of the top stick
    const bottomEnd = yAxis.bottom; // End of the bottom stick
    const yLabel =
      chart.options.plugins.arrowTitlePlugin.yLabel || "Y-Axis Label"; // Y-axis label

      

    // Length of the sticks before the arrows
    const stickToArrowOffset = 20; // Space between the arrow tip and label

    // Calculate X-Axis arrow positions
    const leftArrowTipX =
      xAxis.left +
      xAxis.width / 2 -
      ctx.measureText(xLabel).width / 2 -
      stickToArrowOffset;
    const rightArrowTipX =
      xAxis.left +
      xAxis.width / 2 +
      ctx.measureText(xLabel).width / 2 +
      stickToArrowOffset;

    // Calculate Y-Axis arrow positions
    const topArrowTipY =
      yAxis.top +
      yAxis.height / 2 -
      ctx.measureText(yLabel).width / 2 -
      stickToArrowOffset;
    const bottomArrowTipY =
      yAxis.top +
      yAxis.height / 2 +
      ctx.measureText(yLabel).width / 2 +
      stickToArrowOffset;

    // Draw left stick and arrow (X-Axis)
    ctx.beginPath();
    ctx.lineWidth = lineThickness;
    ctx.strokeStyle = "#1492E6";
    ctx.moveTo(leftEnd, yPosition); // Start of the left stick
    ctx.lineTo(leftArrowTipX, yPosition); // Draw the stick
    ctx.stroke();

    // Draw left arrow (X-Axis)
    ctx.beginPath();
    ctx.moveTo(leftArrowTipX, yPosition - arrowHeight / 2); // Left corner of the arrow
    ctx.lineTo(leftArrowTipX, yPosition + arrowHeight / 2); // Right corner of the arrow
    ctx.lineTo(leftArrowTipX + arrowWidth, yPosition); // Tip of the arrow
    ctx.closePath();
    ctx.fillStyle = "#1492E6";
    ctx.fill();

    // Draw right stick and arrow (X-Axis)
    ctx.beginPath();
    ctx.moveTo(rightEnd, yPosition); // Start of the right stick
    ctx.lineTo(rightArrowTipX, yPosition); // Draw the stick
    ctx.stroke();

    // Draw right arrow (X-Axis)
    ctx.beginPath();
    ctx.moveTo(rightArrowTipX, yPosition - arrowHeight / 2); // Right corner of the arrow
    ctx.lineTo(rightArrowTipX, yPosition + arrowHeight / 2); // Left corner of the arrow
    ctx.lineTo(rightArrowTipX - arrowWidth, yPosition); // Tip of the arrow
    ctx.closePath();
    ctx.fillStyle = "#1492E6";
    ctx.fill();

    // Draw top stick and arrow (Y-Axis) - Position it at the top and point downward
    ctx.beginPath();
    ctx.moveTo(xPosition, yAxis.top); // Start of the top stick (position it at the top of the y-axis)
    ctx.lineTo(xPosition, topArrowTipY); // Draw the stick towards the top arrow's position
    ctx.stroke();

    // Draw top arrow (Y-Axis) - Pointing downward
    ctx.beginPath();
    ctx.moveTo(xPosition - arrowWidth / 2, topArrowTipY); // Left corner of the arrow
    ctx.lineTo(xPosition + arrowWidth / 2, topArrowTipY); // Right corner of the arrow
    ctx.lineTo(xPosition, topArrowTipY + arrowHeight); // Tip of the arrow pointing downwards
    ctx.closePath();
    ctx.fillStyle = "#1492E6";
    ctx.fill();

    // Draw bottom stick and arrow (Y-Axis) - Position it at the bottom and point upward
    ctx.beginPath();
    ctx.moveTo(xPosition, yAxis.bottom); // Start of the bottom stick (position it at the bottom of the y-axis)
    ctx.lineTo(xPosition, bottomArrowTipY); // Draw the stick towards the bottom arrow's position
    ctx.stroke();

    // Draw bottom arrow (Y-Axis) - Pointing upwards
    ctx.beginPath();
    ctx.moveTo(xPosition - arrowWidth / 2, bottomArrowTipY); // Left corner of the arrow
    ctx.lineTo(xPosition + arrowWidth / 2, bottomArrowTipY); // Right corner of the arrow
    ctx.lineTo(xPosition, bottomArrowTipY - arrowHeight); // Tip of the arrow pointing upwards
    ctx.closePath();
    ctx.fillStyle = "#1492E6";
    ctx.fill();

    // Draw X-Axis label (Centered between arrows)
    ctx.font = "13px Arial"; // Set font for X-axis label
    ctx.fillStyle = "#1492E6"; // Set the text color to black
    const xLabelXPosition = xAxis.left + xAxis.width / 2 - ctx.measureText(xLabel).width / 2;
    const xLabelYPosition = yPosition + 6;
    ctx.fillText(xLabel, xLabelXPosition, xLabelYPosition); // Position X-axis label

    const yAxisXShift =
    chart.options.plugins.arrowTitlePlugin.yAxisXShift

    const yAxisYShift =
    chart.options.plugins.arrowTitlePlugin.yAxisYShift

    // Draw Y-Axis label (Centered between arrows)
    ctx.save();
    ctx.translate(xPosition + (yAxisXShift && yAxisXShift || 5), yPosition - (yAxisYShift && yAxisYShift || 73)); // Rotate for Y-axis label
    ctx.rotate(-Math.PI / 2); // Rotate label for vertical orientation
    ctx.fillText(yLabel, 0, 0); // Draw Y-axis label
    ctx.restore();


  },
};

// Register necessary ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  doubleLabels,
  topLable,
  minimumBarHeight,
  arrowTitlePlugin
);

const BarChart = ({
  chartData,
  barColors = [],
  chartOptions = {},
  width = "700px",
  height = "400px",
  x_label,
  y_label,
  top_label = false,
  showInsideBarText = false,
  barRounded = false,
  yAxisXShift,
  yAxisYShift,
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
      backgroundColor: gradientColors.length
        ? gradientColors
        : barColors.map((c) => c[1]),
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
      arrowTitlePlugin: {
        xLabel: x_label,
        yLabel: y_label,
        yAxisYShift: yAxisYShift,
        yAxisXShift: yAxisXShift,
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: { display: false },
        ticks: { font: { size: 14 } },
        title: {
          display: true,
        //   text: `${x_label}`,
        //   color: "#1492E6",
        },
      },
      y: {
        grace: 10,
        stacked: true,
        beginAtZero: true,
        min: 0,
        ticks: {
          callback: (value) => value + "%",
        },
        grid: {
          color: "#e5e7eb",
          borderDash: [5, 5],
        },
        title: {
          display: true,
        //   text: `${y_label}`,
        //   color: "#1492E6",
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
