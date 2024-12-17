import React from "react";
import BarChart from "./BarChart";
import Pen from "@/public/pen.svg";
import Image from "next/image";

export default function CombineBarCharts({
  chartData1,
  barColors1,
  chartData2,
  barColors2,
  top_label,
  x_label,
  y_label,
}) {
  return (
    <div className="flex gap-5 flex-wrap">
      <div className="p-5 bg-white rounded-lg">
        <div className="flex justify-between items-center gap-3 flex-wrap">
          <h2 className="mb-3 text-sm">{top_label}</h2>
          <div className="flex gap-5 flex-wrap">
            <button className="light_btn flex gap-2 items-center">
              Edit
              <Image src={Pen} height={25} width={25} alt="Pen Icon" />
            </button>
            <button className="light_btn">Ideal</button>
          </div>
        </div>{" "}
        <BarChart
          chartData={chartData1}
          barColors={barColors1}
          top_label={top_label}
          x_label={x_label}
          y_label={y_label}
          width="600px"
          height="200px"
        />
      </div>
      <div className="p-5 bg-white rounded-lg">
        <div className="flex justify-between items-center gap-3 flex-wrap">
          <h2 className="mb-3 text-sm">{top_label}</h2>
          <button className="light_btn">Achieved</button>
        </div>
        <BarChart
          chartData={chartData2}
          barColors={barColors2}
          x_label={x_label}
          y_label={y_label}
          topText={[
            {
              value: "22%, 50%",
              color: "red",
              index: 2,
            },
          ]}
          rightText={[
            {
              value: "Ratio: 22%\nIncentive 50%",
              color: "red",
              index: 2,
            },
          ]}
          width="600px"
          height="200px"
        />
      </div>
    </div>
  );
}
