import React from "react";

export default function YearlyTable() {
  const data = [
    {
      month: "Feb, 2024",
      regularPoints: "400",
      actualPoints: "360",
      upsalCrossSalePoints: "200",
      bonusPoints: "150",
      incentiveAmount: 200, // Numerical value instead of string
      cumulativeIncentiveAmount: 65000,
    },
    {
      month: "Jan, 2024",
      regularPoints: "500",
      actualPoints: "400",
      upsalCrossSalePoints: "500",
      bonusPoints: "500",
      incentiveAmount: 500,
      cumulativeIncentiveAmount: 40000,
    },
    {
      month: "Dec, 2023",
      regularPoints: "500",
      actualPoints: "400",
      upsalCrossSalePoints: "500",
      bonusPoints: "500",
      incentiveAmount: 500,
      cumulativeIncentiveAmount: 40000,
    },
    {
      month: "Nov, 2023",
      regularPoints: "500",
      actualPoints: "400",
      upsalCrossSalePoints: "500",
      bonusPoints: "500",
      incentiveAmount: 500,
      cumulativeIncentiveAmount: 40000,
    },
    {
      month: "Oct, 2023",
      regularPoints: "500",
      actualPoints: "400",
      upsalCrossSalePoints: "500",
      bonusPoints: "500",
      incentiveAmount: 500,
      cumulativeIncentiveAmount: 40000,
    },
    {
      month: "Sep, 2023",
      regularPoints: "400",
      actualPoints: "400",
      upsalCrossSalePoints: "500",
      bonusPoints: "500",
      incentiveAmount: 500,
      cumulativeIncentiveAmount: 40000,
    },
    {
      month: "Aug, 2023",
      regularPoints: "300",
      actualPoints: "400",
      upsalCrossSalePoints: "500",
      bonusPoints: "500",
      incentiveAmount: 500,
      cumulativeIncentiveAmount: 40000,
    },
    {
      month: "Jul, 2023",
      regularPoints: "300",
      actualPoints: "400",
      upsalCrossSalePoints: "500",
      bonusPoints: "500",
      incentiveAmount: 500,
      cumulativeIncentiveAmount: 40000,
    },
    {
      month: "Jun, 2023",
      regularPoints: "300",
      actualPoints: "400",
      upsalCrossSalePoints: "500",
      bonusPoints: "500",
      incentiveAmount: 500,
      cumulativeIncentiveAmount: 40000,
    },
  ];

  return (
    <div className="mt-10 rounded-lg mb-10">
      <table className="w-full table-auto border-collapse rounded-lg max-w-[1000px] overflow-x-scroll min-w-[950px]">
        <thead>
          <tr
            style={{ backgroundColor: "#1492E6" }}
            className="rounded-tl-lg rounded-tr-lg"
          >
            <th className="text-white p-4 font-bold border-r-2 border-white rounded-tl-2xl">
              Month
            </th>
            <th className="text-white p-4 font-bold border-r-2 border-white">
              Regular Points
            </th>
            <th className="text-white p-4 font-bold border-r-2 border-white">
              Actual Points
            </th>
            <th className="text-white p-4 font-bold border-r-2 border-white">
              Upsell Cross-Sale Points
            </th>
            <th className="text-white p-4 font-bold border-r-2 border-white">
              Bonus Points
            </th>
            <th className="text-white p-4 font-bold border-r-2 border-white">
              Incentive Amount
            </th>
            <th className="text-white p-4 font-bold border-r-2 border-white">
              Cumulative Incentive Amount
            </th>
            <th className="text-white p-4 font-bold border-r-2 border-white">
              Disbursed Amount
            </th>
            <th className="text-white p-4 font-bold border-r-2 border-white">
              Held Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => {
            // Calculate Disbursed Amount and Held Amount
            const disbursedAmount = row.incentiveAmount * 0.8;
            const heldAmount = row.incentiveAmount * 0.2;

            return (
              <tr key={idx} className="border-b">
                <td className="p-4 border-r-2 border-gray-300 bg-secoundary_background">
                  {row.month}
                </td>
                <td className="p-4 border-r-2 border-gray-300 bg-secoundary_background">
                  {row.regularPoints}
                </td>
                <td className="p-4 border-r-2 border-gray-300 bg-secoundary_background">
                  {row.actualPoints}
                </td>
                <td className="p-4 border-r-2 border-gray-300 bg-secoundary_background">
                  {row.upsalCrossSalePoints}
                </td>
                <td className="p-4 border-r-2 border-gray-300 bg-secoundary_background">
                  {row.bonusPoints}
                </td>
                <td className="p-4 border-r-2 border-gray-300 bg-secoundary_background">
                  {row.incentiveAmount}
                </td>
                <td className="p-4 border-r-2 border-gray-300 bg-secoundary_background">
                  {row.cumulativeIncentiveAmount}
                </td>
                <td className="p-4 border-r-2 border-gray-300 bg-secoundary_background">
                  {disbursedAmount}
                </td>
                <td className="p-4 border-r-2 border-gray-300 bg-secoundary_background">
                  {heldAmount}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      
    </div>
  );
}
