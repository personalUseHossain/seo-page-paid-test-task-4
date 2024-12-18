import useOutsideClick from "@/hooks/useOutsideClick";
import React, { useRef, useState } from "react";

export default function HeldAmountTable({ payModalOpen, setPayModalOpen }) {
    //static datas
  const data = [
    {
      month: "Feb, 2024",
      title: "Monthly Incentive\n(For the month of January, 2024)",
      totalAmount: "10000 taka",
      disbursedAmount: "8000 taka",
      heldAmount: "2000 taka",
      heldAmountBalance: "10000 taka",
      action: "Pending",
    },
    {
      month: "Feb, 2024",
      title: "Monthly Incentive\n(For the month of January, 2023)",
      totalAmount: "10000 taka",
      disbursedAmount: "8000 taka",
      heldAmount: "2000 taka",
      heldAmountBalance: "10000 taka",
      action: "Pending",
    },
    {
      month: "Jan, 2024",
      title: "Monthly Incentive\n(For the month of dec, 2023)",
      totalAmount: "10000 taka",
      disbursedAmount: "8000 taka",
      heldAmount: "2000 taka",
      heldAmountBalance: "10000 taka",
      action: "Paid",
    },
    {
      month: "Nov, 2023",
      title: "Monthly Incentive\n(For the month of Oct, 2023)",
      totalAmount: "30000 taka",
      disbursedAmount: "16000 taka",
      heldAmount: "4000 taka",
      heldAmountBalance: "3000 taka",
      action: "Paid",
    },
    {
      month: "Oct, 2024",
      title: "Monthly Incentive\n(For the month of Sep, 2023)",
      totalAmount: "20000 taka",
      disbursedAmount: "16000 taka",
      heldAmount: "4000 taka",
      heldAmountBalance: "3000 taka",
      action: "Paid",
    },
    {
      month: "Sep, 2023",
      title: "Monthly Incentive\n(For the month of Aug, 2023)",
      totalAmount: "20000 taka",
      disbursedAmount: "16000 taka",
      heldAmount: "4000 taka",
      heldAmountBalance: "3000 taka",
      action: "Paid",
    },
    {
      month: "Aug, 2023",
      title: "Monthly Incentive\n(For the month of Jul, 2023)",
      totalAmount: "10000 taka",
      disbursedAmount: "16000 taka",
      heldAmount: "4000 taka",
      heldAmountBalance: "3000 taka",
      action: "Paid",
    },
    // Add more data entries here as needed
  ];

  //refs

  const payModalRef = useRef(null)
  const confirmModalRef = useRef(null)

  //states
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)


  //calling custom hooks
  useOutsideClick(payModalRef, setPayModalOpen)
  useOutsideClick(confirmModalRef, setConfirmModalOpen)
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
              Title
            </th>
            <th className="text-white p-4 font-bold border-r-2 border-white">
              Total Amount
            </th>
            <th className="text-white p-4 font-bold border-r-2 border-white">
              Disbursed Amount
            </th>
            <th className="text-white p-4 font-bold border-r-2 border-white">
              Held Amount
            </th>
            <th className="text-white p-4 font-bold border-r-2 border-white">
              Held Amount Balance
            </th>
            <th className="text-white p-4 font-bold border-r-2 border-white rounded-tr-2xl">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => {
            // Calculate Disbursed Amount and Held Amount
            const disbursedAmount = row.totalAmount * 0.8;
            const heldAmount = row.totalAmount * 0.2;
            const heldAmountBalance = heldAmount; // Assuming it's the same as heldAmount, adjust as needed

            return (
              <tr key={idx} className="border-b">
                <td
                  className={`p-4 ${
                    idx == data.length && "border-b-2"
                  } border-r-2 border-gray-300 bg-secoundary_background`}
                >
                  {row.month}
                </td>
                <td
                  className={`p-4 ${
                    idx == data.length && "border-b-2"
                  } border-r-2 border-gray-300 bg-secoundary_background`}
                >
                  {row.title}
                </td>
                <td
                  className={`p-4 ${
                    idx == data.length && "border-b-2"
                  } border-r-2 border-gray-300 bg-secoundary_background`}
                >
                  {row.totalAmount}
                </td>
                <td
                  className={`p-4 ${
                    idx == data.length && "border-b-2"
                  } border-r-2 border-gray-300 bg-secoundary_background`}
                >
                  {row.disbursedAmount}
                </td>
                <td
                  className={`p-4 ${
                    idx == data.length && "border-b-2"
                  } border-r-2 border-gray-300 bg-secoundary_background`}
                >
                  {row.heldAmount}
                </td>
                <td
                  className={`p-4 ${
                    idx == data.length && "border-b-2"
                  } border-l-2 border-gray-300 bg-secoundary_background`}
                >
                  {row.heldAmountBalance}
                </td>
                <div className="bg-secoundary_background h-[5rem] border-l-2 border-gray-300 flex justify-center items-end p-3">
                  <td
                    className={`p-4 ${
                      row.action == "Pending"
                        ? "bg-red-500/40 text-red-600"
                        : "bg-green-500/40 text-green-600"
                    } ${
                      idx == data.length && "border-b-2"
                    } flex-1  p-3 rounded-lg font-bold text-center`}
                  >
                    {row.action}
                  </td>
                </div>
              </tr>
            );
          })}
        </tbody>
      </table>

      {payModalOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black bg-opacity-50">
          <div ref={payModalRef} className="modal bg-white shadow-lg rounded-lg w-1/2 max-w-lg p-6 grid gap-6">
            {/* Heading */}
            <div className="flex justify-between items-center flex-wrap rounded-lg">
              <h1 className="  text-xl font-bold rounded-md text-center">
                Held Incentives Disursement
              </h1>
              <p>Amount: 4000 taka</p>
            </div>

            {/* Rows with Checkboxes */}
            <div className="grid gap-4  overflow-y-scroll h-[30rem] hide-scroll">
              <div className="flex justify-between items-center gap-3 flex-wrap border-b-2 border-gray-300 py-2 font-bold">
                <div className="flex gap-3 items-center ">
                  <label htmlFor={`checkbox`} className="text-gray-700">
                    Year 2023
                  </label>
                </div>
                <p className="text-gray-700">Held Amount</p>
              </div>
              {[
                { month: "January", heldAmount: "1000" },
                { month: "February", heldAmount: "2000" },
                { month: "March", heldAmount: "1000" },
                { month: "April", heldAmount: "5000" },
                { month: "May", heldAmount: "0.00" },
                { month: "June", heldAmount: "0.00" },
                { month: "July", heldAmount: "0.00" },
                { month: "August", heldAmount: "0.00" },
                { month: "September", heldAmount: "0.00" },
                { month: "October", heldAmount: "0.00" },
                { month: "November", heldAmount: "0.00" },
                { month: "December", heldAmount: "0.00" },
              ].map((range, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center gap-3 flex-wrap border-b-2 border-gray-300 py-2 "
                >
                  <div className="flex gap-3 items-center">
                    <input
                      type="checkbox"
                      className="h-5 w-5 text-red-500 focus:ring-red-500 rounded"
                      id={`checkbox-${index}`}
                    />
                    <label
                      htmlFor={`checkbox-${index}`}
                      className="text-gray-700"
                    >
                      {range.month}
                    </label>
                  </div>
                  <p className="text-gray-700">{range.heldAmount}</p>
                  </div>
              ))}
            </div>

            {/* Buttons at the Bottom */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => {
                  // Add your remove logic here
                  setConfirmModalOpen(true)
                }}
                className="active-btn flex-1"
              >
                Pay
              </button>
              <button
                onClick={() => setPayModalOpen(false)}
                className="inactive-btn flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {confirmModalOpen && (
  <div className="fixed inset-0 z-50 grid place-items-center bg-black bg-opacity-50">
    <div ref={confirmModalRef} onFocus={() => setPayModalOpen(true)}
            onClick={() => setPayModalOpen(true)} className="modal bg-white shadow-lg rounded-lg w-1/2 max-w-md p-6 grid">
      {/* Heading */}
      <div className="flex justify-between items-center flex-wrap rounded-lg">
        <h1 className="text-xl font-bold rounded-md text-center w-full">
          Confirmation
        </h1>
      </div>

      {/* Body */}
      <div className="text-center py-4 text-theme">
        <p>Do you want to proceed?</p>
      </div>

      {/* Buttons at the Bottom */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => {
            // Add your confirmation logic here (e.g., proceeding with the action)
            setConfirmModalOpen(false); // close the modal after confirmation
          }}
          className="active-btn flex-1"
        >
          Confirm
        </button>
        <button
          onClick={() => setConfirmModalOpen(false)} // Close the modal if "Do it later" is clicked
          className="inactive-btn flex-1"
        >
          Do it later
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
