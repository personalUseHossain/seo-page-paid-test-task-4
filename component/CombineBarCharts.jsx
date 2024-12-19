"use client";

import React, { useEffect, useRef, useState } from "react";
import BarChart from "./BarChart";
import Pen from "@/public/pen.svg";
import PenWhite from "@/public/pen_white.svg";
import Image from "next/image";

export default function CombineBarCharts({
  chartData1,
  barColors1,
  chartData2,
  barColors2,
  top_label,
  info = false,
  x_label,
  y_label,
  editButton = true,
  editButtonClass = "",
  chartBg = "white",
  buttonClass = "light_btn",
  chartHeadingClass = "",
  barRounded = false
}) {
  const [editModal, setEditModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [removeModal, setRemoveModal] = useState(false);
  const [selectRangeModal, setSelectRangeModal] = useState(false);
  const [xAxisEditModal, setXAxisEditModal] = useState(false);
  const [yAxisEditModal, setYAxisEditModal] = useState(false);
  const [selectedEditAxisPercentage, setSelectedEditAxisPercentage] =
    useState("");

  const modalRef = useRef(null);
  const addModalRef = useRef(null);
  const removeModalRef = useRef(null);
  const selectRangeModalRef = useRef(null);
  const axisEditModalRef = useRef(null);

  const [infoXOn, setInfoXOn] = useState(false);
  const [infoYOn, setInfoYOn] = useState(false);

  // Detect outside click to close modals
  useEffect(() => {
    function handleOutsideClick(event) {
      if (addModalRef.current && !addModalRef.current.contains(event.target)) {
        setAddModal(false);
        setEditModal(true);
      } else if (
        axisEditModalRef.current &&
        !axisEditModalRef.current.contains(event.target)
      ) {
        setXAxisEditModal(false);
        setYAxisEditModal(false);
        setEditModal(true);
      } else if (
        removeModalRef.current &&
        !removeModalRef.current.contains(event.target)
      ) {
        setRemoveModal(false);
        setEditModal(true);
      } else if (
        selectRangeModalRef.current &&
        !selectRangeModalRef.current.contains(event.target)
      ) {
        setSelectRangeModal(false);
        setEditModal(true);
      } else if (modalRef.current && !modalRef.current.contains(event.target)) {
        setEditModal(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="flex gap-5 flex-wrap mb-5 justify-start overflow-x-scroll hide-scroll">
      <div
        style={{ background: chartBg }}
        className="p-5 rounded-lg min-w-[700px] w-[49%] chart-container"
      >
        <div className="flex justify-between items-center gap-3 flex-wrap">
          <div className="flex gap-2">
            <h2 className={`mb-3 text-sm ${chartHeadingClass}`}>{top_label}</h2>
            {info && (
              <div className="relative">
                <div
                  onMouseEnter={() => setInfoXOn(true)}
                  onMouseLeave={() => setInfoXOn(false)}
                  className="h-4 w-4 flex items-center justify-center rounded-full bg-gray-500 text-white text-sm"
                >
                  i
                </div>
                {infoXOn && (
                  <p className="absolute bg-white p-2 rounded-lg right-[-5rem] top-10 w-[10rem]">
                    Hello world Hello world Hello world Hello world Hello world
                  </p>
                )}
              </div>
            )}
          </div>
          <div className="flex gap-5 flex-wrap">
            {editButton && (
              <button
                onClick={() => setEditModal((prev) => !prev)}
                className={
                  editButtonClass
                    ? `${editButtonClass}`
                    : "light_btn flex gap-2 items-center "
                }
              >
                Edit
                <Image
                  src={editButtonClass ? PenWhite : Pen}
                  height={25}
                  width={25}
                  alt="Pen Icon"
                />
              </button>
            )}
            <button className={buttonClass}>Ideal</button>
          </div>
        </div>{" "}
        {editModal && (
          <div className="fixed inset-0 z-50 grid place-items-center bg-black bg-opacity-50">
            <div
              className="modal overflow-scroll h-[90vh] hide-scroll bg-white w-1/2 shadow-lg rounded-lg max-w-2xl p-6 grid gap-6"
              ref={modalRef}
            >
              <div className="bg-theme text-white text-xl font-bold py-2 px-4 rounded-md flex justify-between items-center">
                <h1>Ideal vs Achieved</h1>
                <h1
                  className="cursor-pointer"
                  onClick={() => setEditModal(false)}
                >
                  X
                </h1>
              </div>
              <p className="text-gray-700 text-sm bg-[#E8F8F1] p-2">
                All the lower limits have been marked as &apos;greater
                than&apos; and upper limits have been marked as &apos;less than
                equal&apos; by the system.
              </p>
              <div className="flex flex-wrap gap-4 justify-between items-center">
                {/* Left Section */}
                <div className="grid gap-4">
                  <div className="flex gap-2 flex-wrap items-center">
                    <button
                      onClick={() => setAddModal(true)}
                      className="active-btn bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => setRemoveModal(true)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                  <button
                    onClick={() => setSelectRangeModal(true)}
                    className="inactive-btn"
                  >
                    Select Range
                  </button>
                </div>

                {/* Right Section */}
                <div className="bg-secondary_background p-4 rounded-md border border-gray-200 shadow-sm bg-secoundary_background">
                  <p className="text-gray-800 text-sm font-medium">
                    Starting point (x axis):{" "}
                    <span className="font-bold">0%</span>
                  </p>
                  <p className="text-gray-800 text-sm font-medium">
                    Ending point (x axis):{" "}
                    <span className="font-bold">100%</span>
                  </p>
                </div>
              </div>
              {/* Range Section with Edit Buttons */}
              <div>
                <div className="flex justify-between items-center gap-3 flex-wrap font-bold border-b-2 border-gray-300 py-2">
                  <div className="flex gap-3 flex-wrap justify-center items-center">
                    <p>X Axis ratio</p>
                  </div>
                  <div className="flex gap-3 flex-wrap justify-center items-center">
                    <p>Y Axis ratio</p>
                  </div>
                </div>

                {/* Range Input Section */}
                {[
                  "0-10%",
                  "11-20%",
                  "21-35%",
                  "36-50%",
                  "51-65%",
                  "66-80%",
                  "81-90%",
                  "91-100%",
                ].map((range, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center gap-3 flex-wrap border-b-2 border-gray-300 py-2"
                  >
                    <div className="flex gap-3 flex-wrap justify-center items-center">
                      <p>{range}</p>
                      <button
                        className="p-2 rounded-lg bg-[whitesmoke] text-black"
                        onClick={() => {
                          setXAxisEditModal(true);
                          setSelectedEditAxisPercentage(range);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                    <div className="flex gap-3 flex-wrap justify-center items-center">
                      <p>100%</p>
                      <button
                        onClick={() => {
                          setYAxisEditModal(true);
                          setSelectedEditAxisPercentage("100%");
                        }}
                        className="p-2 rounded-lg bg-[whitesmoke] text-black"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Save and Do it Later Buttons */}
              <div className="flex gap-4 flex-wrap items-center justify-center">
                <button
                  className="active-btn"
                  onClick={() => setEditModal(false)}
                >
                  Save
                </button>
                <button
                  className="inactive-btn"
                  onClick={() => setEditModal(false)}
                >
                  Do it later
                </button>
              </div>
            </div>
          </div>
        )}
        {addModal && (
          <div
            onFocus={() => setEditModal(true)}
            onClick={() => setEditModal(true)}
            className="fixed inset-0 z-50 grid place-items-center bg-black bg-opacity-50"
          >
            <div
              className="modal bg-white shadow-lg rounded-lg w-1/2 max-w-md p-6 grid gap-6"
              ref={addModalRef}
            >
              {/* Title */}
              <h1 className="text-black text-2xl font-bold text-center">
                Add new Items
              </h1>

              {/* X Axis Ratio Input */}
              <div>
                <label className="block text-gray-600 mb-1">
                  X Axis ratio (Percentage)
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Write here"
                    className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                    type="text"
                    placeholder="Write here"
                    className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>

              {/* Y Axis Ratio Input */}
              <div>
                <label className="block text-gray-600 mb-1">
                  Y Axis ratio (Percentage)
                </label>
                <input
                  type="text"
                  placeholder="Write here"
                  className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-center gap-4">
                <button
                  className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                  onClick={() => {
                    // Add functionality here
                    setAddModal(false);
                    setEditModal(true);
                  }}
                >
                  Add Now
                </button>
                <button
                  className="border-2 border-blue-500 text-blue-500 px-6 py-2 rounded-md hover:bg-blue-100"
                  onClick={() => {
                    setAddModal(false);
                    setEditModal(true);
                  }}
                >
                  Do it later
                </button>
              </div>
            </div>
          </div>
        )}
        {(xAxisEditModal || yAxisEditModal) && (
          <div
            className="fixed inset-0 z-50 grid place-items-center bg-black bg-opacity-50"
            onFocus={() => setEditModal(true)}
            onClick={() => setEditModal(true)}
          >
            <div
              className="modal w-1/2 bg-white shadow-lg rounded-lg max-w-xl p-6 gap-6 flex flex-col justify-center items-center"
              ref={axisEditModalRef}
            >
              <h1 className="text-black text-xl font-bold py-2 px-4 rounded-md">
                Add New Value
              </h1>
              <p className="text-gray-700 text-sm">
                Current Range: <b>{selectedEditAxisPercentage}</b>
              </p>
              <p className="text-gray-700 text-sm">
                New Range Value {xAxisEditModal && "(Percentage)"}
              </p>
              <div className="flex gap-2 flex-wrap items-center justify-center">
                <input
                  type="text"
                  className="border-2 border-gray-300 rounded-lg p-2"
                  placeholder="Write here"
                />
                {xAxisEditModal && (
                  <input
                    type="text"
                    className="border-2 border-gray-300 rounded-lg p-2"
                    placeholder="Write here"
                  />
                )}
              </div>
              <button
                onClick={() => {
                  setXAxisEditModal(false);
                  setYAxisEditModal(false);
                  setEditModal(true);
                }}
                className="active-btn"
              >
                Save
              </button>
            </div>
          </div>
        )}
        {removeModal && (
          <div
            className="fixed inset-0 z-50 grid place-items-center bg-black bg-opacity-50"
            onFocus={() => setEditModal(true)}
            onClick={() => setEditModal(true)}
          >
            <div
              className="modal bg-white shadow-lg rounded-lg w-1/2 max-w-md p-6 grid gap-6"
              ref={removeModalRef}
            >
              {/* Heading */}
              <h1 className="  text-xl font-bold py-2 px-4 rounded-md text-center">
                Remove Items
              </h1>

              {/* Rows with Checkboxes */}
              <div className="grid gap-4">
                <div className="flex justify-between items-center gap-3 flex-wrap border-b-2 border-gray-300 py-2 font-bold">
                  <div className="flex gap-3 items-center ">
                    <input
                      type="checkbox"
                      className="h-5 w-5 text-red-500 focus:ring-red-500 rounded"
                      id={`checkbox`}
                    />
                    <label htmlFor={`checkbox`} className="text-gray-700">
                      X Axis ratio
                    </label>
                  </div>
                  <p className="text-gray-700">Y Axis ratio</p>
                </div>
                {[
                  "0-10%",
                  "11-20%",
                  "21-35%",
                  "36-50%",
                  "51-65%",
                  "66-80%",
                  "81-90%",
                  "91-100%",
                ].map((range, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center gap-3 flex-wrap border-b-2 border-gray-300 py-2"
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
                        {range}
                      </label>
                    </div>
                    <p className="text-gray-700">100%</p>
                  </div>
                ))}
              </div>

              {/* Buttons at the Bottom */}
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={() => {
                    // Add your remove logic here
                    console.log("Remove Selected Items");
                    setRemoveModal(false);
                  }}
                  className="bg-red-500 flex-1 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
                <button
                  onClick={() => setRemoveModal(false)}
                  className="inactive-btn flex-1"
                >
                  Do it later
                </button>
              </div>
            </div>
          </div>
        )}
        {selectRangeModal && (
          <div
            className="fixed inset-0 z-50 grid place-items-center bg-black bg-opacity-50"
            onFocus={() => setEditModal(true)}
            onClick={() => setEditModal(true)}
          >
            <div
              className="modal bg-white shadow-lg rounded-lg w-1/2 max-w-xl p-6 grid gap-6"
              ref={selectRangeModalRef}
            >
              {/* Heading */}
              <h1 className=" text-xl font-bold py-2 px-4 rounded-md text-center">
                Select Range
              </h1>

              {/* Form Section */}
              <div className="grid gap-4">
                {/* Starting Point Input */}
                <div className="flex items-center gap-4">
                  <label className="text-gray-700 font-semibold w-1/3">
                    Starting point (X Axis)
                  </label>
                  <div className="relative flex items-center w-2/3">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                    <span className="absolute right-4 text-gray-500">%</span>
                  </div>
                </div>

                {/* Ending Point Input */}
                <div className="flex items-center gap-4">
                  <label className="text-gray-700 font-semibold w-1/3">
                    Ending point (X Axis)
                  </label>
                  <div className="relative flex items-center w-2/3">
                    <input
                      type="number"
                      placeholder="100"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                    <span className="absolute right-4 text-gray-500">%</span>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <div className="flex justify-center">
                <button
                  onClick={() => setSelectRangeModal(false)}
                  className="active-btn"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
        <BarChart
          chartData={chartData1}
          barColors={barColors1}
          top_label={false}
          x_label={x_label}
          y_label={y_label}
          width="90%"
          height="200px"
          showInsideBarText={false}
          minBarHeight={true}
        />
      </div>

      <div
        style={{ background: chartBg }}
        className="p-5 rounded-lg min-w-[700px] w-[49%] chart-container"
      >
        <div className="flex justify-between items-center gap-3 flex-wrap">
          <div className="flex gap-2 items-start justify-center">
            <h2 className={`mb-3 text-sm ${chartHeadingClass}`}>{top_label}</h2>
            {info && (
              <div className="relative">
                <div
                  onMouseEnter={() => setInfoYOn(true)}
                  onMouseLeave={() => setInfoYOn(false)}
                  className="h-4 w-4 flex items-center justify-center rounded-full bg-gray-500 text-white text-sm"
                >
                  i
                </div>
                {infoYOn && (
                  <p className="absolute bg-white p-2 rounded-lg right-[-5rem] top-10 w-[10rem]">
                    Hello world Hello world Hello world Hello world Hello world
                  </p>
                )}
              </div>
            )}
          </div>
          <button className={buttonClass}>Achieved</button>
        </div>
        <BarChart
          chartData={chartData2}
          barColors={barColors2}
          x_label={x_label}
          y_label={y_label}
          rightText={[
            { value: "Ratio: 22%\nIncentive 50%", color: "red", index: 2 },
          ]}
          top_label={true}
          width="90%"
          height="200px"
          barRounded={barRounded}
          showInsideBarText={false}
        />
        <p className="text-[13px] flex gap-1 justify-center items-center">{x_label}:
            <p style={{color:  barColors2[0][0]}}>{Math.max(...chartData2.datasets[0].data)}%</p></p>
      </div>
    </div>
  );
}
