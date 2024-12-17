"use client";

import Image from "next/image";
// images
import StarImage from "@/public/star.svg";
import TakaImage from "@/public/taka.svg";

import { useState } from "react";
import CombineBarCharts from "@/component/CombineBarCharts";

export default function Home() {
  // State for the first group of buttons
  const [selectedFirstGroup, setSelectedFirstGroup] = useState("Current");

  // State for the second group of buttons
  const [selectedSecondGroup, setSelectedSecondGroup] = useState("Monthly");

  // Data for buttons to make it easier to map through
  const firstGroupButtons = ["Current", "Held amounts", "Incentive factors"];
  const secondGroupButtons = ["Monthly", "Quarterly", "Yearly"];

  const chartData1 = {
    labels: [
      "0-10%",
      "11-20%",
      "21-35%",
      "36-50%",
      "51-65%",
      "66-80%",
      "81-100%",
    ],
    datasets: [
      {
        label: "Incentive Percentage",
        data: [100, 80, 50, 0, 0, 0, 0], // Values
        borderRadius: 10,
        barThickness: 50,
      },
    ],
  };

  const chartData2 = {
    labels: [
      "0%",
      "10%",
      "20%",
      "30%",
      "40%",
      "50%",
      "60%",
      "70%",
      "80%",
      "90%",
      "100%",
    ],
    datasets: [
      {
        label: "Revision Vs Task Ratio",
        data: [0, 0, 50, 0, 0, 0, 0, 0, 0, 0, 0, 100], // Values
        borderRadius: 10,
        barThickness: 10,
      },
    ],
  };

  const barColors1 = [
    ["#17995B", "#68F4AB"],
    ["#0A9DFF", "#C4EBFE"],
    ["#FEC117", "#FFE398"],
    ["#FFA4A4", "#FFA4A4"],
    ["#FFA4A4", "#FFA4A4"],
    ["#FFA4A4", "#FFA4A4"],
    ["#FFA4A4", "#FFA4A4"],
  ];

  const barColors2 = [["#0A9DFF", "#C4EBFE"]];

  return (
    <div className="p-4">
      {/* top button section */}
      <div className="flex justify-between items-center flex-wrap gap-5">
        <div className="flex gap-2 flex-wrap">
          {firstGroupButtons.map((btn) => (
            <button
              key={btn}
              onClick={() => setSelectedFirstGroup(btn)} // Set selected button on click
              className={
                selectedFirstGroup === btn ? "active-btn" : "inactive-btn"
              }
            >
              {btn}
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          {secondGroupButtons.map((btn) => (
            <button
              key={btn}
              onClick={() => setSelectedSecondGroup(btn)} // Set selected button on click
              className={
                selectedSecondGroup === btn ? "active-btn" : "inactive-btn"
              }
            >
              {btn}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 mt-10">
        {/* static button bottom section */}
        <div className="flex justify-between gap-5 bg-secoundary_background p-4 rounded-lg mb-5">
          <button className="active-btn flex items-center justify-center gap-2 flex-1">
            <Image
              className="p-2 bg-white/25 rounded-md"
              src={StarImage}
              height={35}
              width={35}
            />
            Your obtained points: <bold>500 pt</bold>{" "}
          </button>
          <button className="active-btn flex items-center justify-center gap-2 flex-1">
            <Image
              className="p-2 bg-white/25 rounded-md"
              src={TakaImage}
              height={35}
              width={35}
            />
            Cash value for every regular point: <bold>20 Taka</bold>{" "}
          </button>
        </div>

        {/* charts */}
        <div className="p-4 bg-secoundary_background rounded-lg">
          <h1 className="mb-7 text-2xl font-semibold">Ideal vs Achived</h1>
          <CombineBarCharts 
            barColors1={barColors1}
            barColors2={barColors2}
            top_label={"Revision vs Task ratio: "}
            x_label={"Revision Vs Task ratio"}
            y_label={"Incentive percentage "}
            chartData1={chartData1}
            chartData2={chartData2}
          />
        </div>
      </div>
    </div>
  );
}
