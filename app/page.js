"use client";

// images
import Image from "next/image";
import StarImage from "@/public/star.svg";
import StarImageBlack from "@/public/star_black.svg";
import TakaImage from "@/public/taka.svg";
import MoneyBag from "@/public/bag_of_money_black.svg";
import Pen from "@/public/pen.svg";
import Calendar from "@/public/calendar.svg";
import Employee from "@/public/employee.svg";
import ArrowDown from "@/public/arrow-down.svg";
import Department from "@/public/department.svg";

import { useEffect, useRef, useState } from "react";

// custom component
import CombineBarCharts from "@/component/CombineBarCharts";
import HeldAmountTable from "@/component/HeldAmountTable";
import QuarterlyTable from "@/component/QuarterlyTable";
import YearlyTable from "@/component/YearlyTable";

// chart datas
import {
  bonusPointsData,
  IdealVsAchieved,
  SecondSectionData,
  UnreleasedPaymentAmount,
  upSaleCrossSaleAmount,
} from "@/public/Data";
import useOutsideClick from "@/hooks/useOutsideClick";
import IncentiveSection from "@/component/IncentiveSection";

export default function Home() {
  //states
  const [selectedFirstGroup, setSelectedFirstGroup] = useState("Current");
  const [selectedSecondGroup, setSelectedSecondGroup] = useState("Monthly");
  const firstGroupButtons = ["Current", "Held amounts", "Incentive factors"];
  const secondGroupButtons = ["Monthly", "Quarterly", "Yearly"];
  const [incentivePopup, setIncentivePoints] = useState(false);
  const [upSaleCrossSalePointsPopup, setUpSaleCrossSalePointsPopup] =
    useState(false);
  const [finalPointPopup, setFinalPointPopup] = useState(false);
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [regularPopup, setRegularPopup] = useState(false);
  const [incentiveFactorsModalOpen, setIncentiveFactorsModalOpen] =
    useState(false);
  const [
    cashValueForEveryRegularPointModalOpen,
    setCashValueForEveryRegularPointModalOpen,
  ] = useState(false);
  const [incentivePointInfoOpen, setIncentivePointInfoOpen] = useState(false);
  const [bonusPoint, setBonusPoint] = useState(false)
  const [incentivePercentage, setIncentivePercentage] = useState(false)

  useEffect(() => {
    if (selectedFirstGroup == "Incentive factors") {
      setIncentiveFactorsModalOpen(true);
    }
  }, [selectedFirstGroup]);

  useEffect(() => {
    if (!incentiveFactorsModalOpen) {
      setSelectedFirstGroup("Current");
    }
  }, [incentiveFactorsModalOpen]);

  //refs for modal/popup
  const regularPopupRef = useRef(null);
  const incentivePopupRef = useRef(null);
  const finalPointPopupRef = useRef(null);
  const upSaleCrossSalePointsPopupRef = useRef(null);
  const IncentiveFactorsRef = useRef(null);
  const cashValeForEveryREgularPointRef = useRef(null);

  useOutsideClick(regularPopupRef, setRegularPopup);
  useOutsideClick(incentivePopupRef, setIncentivePoints);
  useOutsideClick(upSaleCrossSalePointsPopupRef, setUpSaleCrossSalePointsPopup);
  useOutsideClick(finalPointPopupRef, setFinalPointPopup);
  useOutsideClick(IncentiveFactorsRef, setIncentiveFactorsModalOpen);
  useOutsideClick(
    cashValeForEveryREgularPointRef,
    setCashValueForEveryRegularPointModalOpen
  );

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between items-center flex-wrap gap-3 mb-8">
          <div className="flex text-sm gap-2">
            <Image src={Calendar} alt="Calender" height={20} width={20} />
            <p>Date: December 1, 2023 to Dece...</p>
          </div>
          <div className="flex text-sm gap-2">
            <Image src={Employee} alt="Employee" height={20} width={20} />
            <p>
              Employee: <span className="text-theme">Faria Abbashi</span>
            </p>
            <Image src={ArrowDown} alt="ArrowDown" height={20} width={20} />
          </div>
          <div className="flex text-sm gap-2">
            <Image src={Department} alt="Department" height={20} width={20} />
            <p>
              Department: <span className="text-theme">Web Development</span>
            </p>
          </div>
        </div>
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
            {(selectedFirstGroup != "Held amounts" &&
              secondGroupButtons.map((btn) => (
                <button
                  key={btn}
                  onClick={() => setSelectedSecondGroup(btn)} // Set selected button on click
                  className={
                    selectedSecondGroup === btn ? "active-btn" : "inactive-btn"
                  }
                >
                  {btn}
                </button>
              ))) || (
              <button
                className="rounded-lg bg-green-500/30 p-3 text-green-600 font-bold px-6"
                onClick={() => setPayModalOpen(true)}
              >
                Pay Now
              </button>
            )}
          </div>
        </div>

        {selectedFirstGroup == "Current" &&
          selectedSecondGroup == "Monthly" && (
            <div className="px-5 mt-10">
              {/* static button bottom section */}
              <div className="flex justify-between gap-5 bg-secoundary_background p-4 rounded-lg mb-5">
                <button className="active-btn flex items-center justify-center gap-2 flex-1">
                  <Image
                    className="p-2 bg-white/25 rounded-md"
                    src={StarImage}
                    height={35}
                    width={35}
                    alt="StarImage"
                  />
                  Your obtained points: <b>500 pt</b>{" "}
                </button>
                <button className="active-btn flex items-center justify-center gap-2 flex-1 flex-wrap">
                  <Image
                    className="p-2 bg-white/25 rounded-md"
                    src={TakaImage}
                    height={35}
                    width={35}
                    alt="TakaImage"
                  />
                  Cash value for every regular point: <b>20 Taka</b>{" "}
                  <button
                    onClick={() =>
                      setCashValueForEveryRegularPointModalOpen((prev) => !prev)
                    }
                    className="bg-white p-2 rounded-lg text-theme px-4 ml-2 flex gap-2 items-center"
                  >
                    Edit
                    <Image src={Pen} height={25} width={25} alt="Pen Icon" />
                  </button>
                </button>
              </div>

              {/* charts */}
              <div className="p-4 bg-secoundary_background rounded-lg mb-10 overflow-x-scroll hide-scroll">
                <h1 className="mb-7 text-2xl font-semibold">
                  {IdealVsAchieved.name}
                </h1>
                {IdealVsAchieved.charts.map((chartData, idx) => {
                  return (
                    <CombineBarCharts
                      barColors1={chartData.barColor1}
                      barColors2={chartData.barColor2}
                      top_label={chartData.name}
                      x_label={chartData.xLabel}
                      y_label={chartData.yLabel}
                      chartData1={chartData.chartData1}
                      chartData2={chartData.chartData2}
                      info={chartData.info}
                    />
                  );
                })}
              </div>
              <div className="p-4 bg-secoundary_background rounded-lg mb-10 flex justify-between flex-wrap gap-4 items-center">
                <div className="overflow-scroll hide-scroll w-fit">
                  {SecondSectionData.map((data, idx) => {
                    return (
                      <div
                        key={idx}
                        className="flex justify-between items-center  mb-3 w-[50rem]" // Ensuring all items take full width
                      >
                        <p
                          className="flex-1 mr-5"
                          style={{
                            color: data.nameColor,
                          }}
                        >
                          {data.name}
                        </p>{" "}
                        {/* Ensuring name width is fixed */}
                        <p
                          className="font-bold flex-1"
                          style={{ color: data.achivedColor, flexShrink: 0 }}
                        >
                          {`Achieved: ${data.achivedPercentage}`}%
                        </p>
                        <div className="flex flex-col w-[300px]">
                          <div className="flex justify-between items-center flex-wrap">
                            <p>{data.name}</p>
                            <p>{`${data.progressPercentage}/${data.progressMaxPercentage}`}</p>
                          </div>
                          <div
                            className={`h-5 w-full`}
                            style={{
                              maxWidth: "100%",
                              background: data.progressContainerColor,
                            }}
                          >
                            <div
                              className="h-full w-full rounded-tr-lg rounded-br-lg"
                              style={{
                                background: `linear-gradient(to right, ${data.progressThumbColor[1]}, ${data.progressThumbColor[0]})`,
                                width: `${Math.max(
                                  (data.progressPercentage /
                                    data.progressMaxPercentage) *
                                    100,
                                  2
                                )}%`, // Ensuring a minimum width of 2%
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex font-bold flex-col items-start w-fit">
                  <div className="flex mb-3 items-center justify-center gap-2">
                    <Image
                      className="bg-[#CEEBFF] rounded-md p-2"
                      src={StarImageBlack}
                      height={40}
                      width={40}
                      alt="StarImage"
                    />
                    Your Regular points:{" "}
                    <b
                      onClick={() => setRegularPopup(true)}
                      className="text-red-500 border-b-[1px] border-red-500 cursor-pointer"
                    >
                      00 pt
                    </b>{" "}
                  </div>
                  <div className="flex items-center justify-center gap-2 ">
                    <Image
                      className="bg-[#CEEBFF] rounded-md p-2"
                      src={StarImageBlack}
                      height={40}
                      width={40}
                      alt="StarImage"
                    />
                    Your actual incentive points:{" "}
                    <b
                      onClick={() => setIncentivePoints(true)}
                      className="text-red-500 border-b-[1px] cursor-pointer border-red-500"
                    >
                      400 pt
                    </b>{" "}
                    <div className="relative">
                      <div
                        onMouseEnter={() => setIncentivePointInfoOpen(true)}
                        onMouseLeave={() => setIncentivePointInfoOpen(false)}
                        className="h-4 w-4 flex items-center justify-center rounded-full bg-gray-500 text-white text-sm"
                      >
                        i
                      </div>
                      {incentivePointInfoOpen && (
                        <p className="absolute bg-white p-2 rounded-lg right-[-5rem] top-10 w-[10rem]" style={{fontSize: "13px"}}>
                          Hello world Hello world Hello world Hello world Hello
                          world
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="mt-3">
                    <span className="text-red-500">Note:</span> If you fail to
                    maintain the minmum Incentive slab for <br /> any of he
                    criteria, you overall incentive percentage will be zero.
                  </p>
                </div>
              </div>

              <div>
                <h1 className="text-xl font-bold mb-5">
                  Upsale/Cross Sale Amount
                </h1>

                <div className="bg-secoundary_background p-5">
                  <CombineBarCharts
                    barColors1={upSaleCrossSaleAmount[0].barColor1}
                    barColors2={upSaleCrossSaleAmount[0].barColor2}
                    chartData1={upSaleCrossSaleAmount[0].chartData1}
                    chartData2={upSaleCrossSaleAmount[0].chartData2}
                    top_label={upSaleCrossSaleAmount[0].name}
                    x_label={upSaleCrossSaleAmount[0].xLabel}
                    y_label={upSaleCrossSaleAmount[0].yLabel}
                    info={false}
                    chartBg={"#E1F3FF"}
                    chartHeadingClass={"text-theme"}
                    editButtonClass={
                      "bg-theme rounded-lg text-white px-4 flex items-center gap-2 justify-center"
                    }
                    buttonClass="active-btn !bg-white !text-theme"
                  />
                  <div className="flex justify-between gap-5 bg-[#E1F3FF] p-4 rounded-lg mb-5 font-bold">
                    <button className="flex items-center justify-center gap-2 flex-1">
                      <Image
                        className="p-2 bg-white/25 rounded-md"
                        src={StarImageBlack}
                        height={35}
                        width={35}
                        alt="StarImage"
                      />
                      Your upsale/cross sales points:{" "}
                      <b
                        onClick={() => setUpSaleCrossSalePointsPopup(true)}
                        className="text-theme border-b-2 border-theme"
                      >
                        60.05 pt
                      </b>{" "}
                    </button>
                    <button className="flex items-center justify-center gap-2 flex-1">
                      <Image
                        className="p-2 bg-white/25 rounded-md"
                        src={MoneyBag}
                        height={35}
                        width={35}
                        alt="StarImage"
                      />
                      Cash value of every upsale/cross sale point:{" "}
                      <b className="text-theme">100 Taka</b>{" "}
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold mb-5">Bonus Points</h1>

                <div className="bg-secoundary_background p-5">
                  <CombineBarCharts
                    barColors1={bonusPointsData[0].barColor1}
                    barColors2={bonusPointsData[0].barColor2}
                    chartData1={bonusPointsData[0].chartData1}
                    chartData2={bonusPointsData[0].chartData2}
                    top_label={bonusPointsData[0].name}
                    x_label={bonusPointsData[0].xLabel}
                    y_label={bonusPointsData[0].yLabel}
                    info={false}
                    editButtonClass={
                      "bg-theme rounded-lg text-white px-4 flex items-center gap-2 justify-center"
                    }
                    chartBg={"#E1F3FF"}
                    chartHeadingClass={"text-theme"}
                    buttonClass="light_btn !bg-white !text-theme"
                  />
                </div>
                <div className="bg-secoundary_background p-5">
                  <CombineBarCharts
                    barColors1={UnreleasedPaymentAmount[0].barColor1}
                    barColors2={UnreleasedPaymentAmount[0].barColor2}
                    chartData1={UnreleasedPaymentAmount[0].chartData1}
                    chartData2={UnreleasedPaymentAmount[0].chartData2}
                    top_label={UnreleasedPaymentAmount[0].name}
                    x_label={UnreleasedPaymentAmount[0].xLabel}
                    y_label={UnreleasedPaymentAmount[0].yLabel}
                    info={false}
                    editButtonClass={
                      "bg-theme rounded-lg text-white px-4 flex items-center gap-2 justify-center"
                    }
                    chartBg={"#E1F3FF"}
                    buttonClass="light_btn !bg-white !text-theme"
                  />

                  <div className="flex justify-between gap-5 bg-[#E1F3FF] p-4 rounded-lg mb-5 font-bold mt-20 flex-wrap">
                    <button className="flex items-center justify-center gap-2">
                      <Image
                        className="p-2 bg-white/25 rounded-md"
                        src={StarImageBlack}
                        height={35}
                        width={35}
                        alt="StarImage"
                      />
                      Your bonus points: <b className="text-theme">60 pt</b>{" "}
                      <div className="relative">
                      <div
                        onMouseEnter={() => setBonusPoint(true)}
                        onMouseLeave={() => setBonusPoint(false)}
                        className="h-4 w-4 flex items-center justify-center rounded-full bg-gray-500 text-white text-sm"
                      >
                        i
                      </div>
                      {bonusPoint && (
                        <p className="absolute bg-white p-2 rounded-lg right-[-5rem] top-10 w-[10rem] "  style={{fontSize: "13px"}}>
                          This value is bonus points based on release payment amount
                        </p>
                      )}
                    </div>
                    </button>
                    <button className="flex items-center justify-center gap-2">
                      <Image
                        className="p-2 bg-white/25 rounded-md"
                        src={StarImageBlack}
                        height={35}
                        width={35}
                        alt="StarImage"
                      />
                      Incentive Percentage:{" "}
                      <b className="text-theme">100 Taka</b>{" "}
                      <div className="relative">
                      <div
                        onMouseEnter={() => setIncentivePercentage(true)}
                        onMouseLeave={() => setIncentivePercentage(false)}
                        className="h-4 w-4 flex items-center justify-center rounded-full bg-gray-500 text-white text-sm"
                      >
                        i
                      </div>
                      {incentivePercentage && (
                        <p className="absolute bg-white p-2 rounded-lg right-[-5rem] top-10 w-[10rem]"  style={{fontSize: "13px"}}>
                          This value is unrelease payment amount
                        </p>
                      )}
                    </div>
                    </button>
                    <button className="flex items-center justify-center gap-2">
                      <Image
                        className="p-2 bg-white/25 rounded-md"
                        src={MoneyBag}
                        height={35}
                        width={35}
                        alt="StarImage"
                      />
                      Final points:{" "}
                      <b
                        className="text-theme border-b-2 border-theme"
                        onClick={() => setFinalPointPopup(true)}
                      >
                        48pt
                      </b>{" "}
                    </button>
                    <button className="flex items-center justify-center gap-2 flex-wrap">
                      <Image
                        className="p-2 bg-white/25 rounded-md"
                        src={MoneyBag}
                        height={35}
                        width={35}
                        alt="StarImage"
                      />
                      Cash value every bonus point:{" "}
                      <b className="text-theme">100 Taka</b>{" "}
                      <button
                        onClick={() =>
                          setCashValueForEveryRegularPointModalOpen(
                            (prev) => !prev
                          )
                        }
                        className="bg-white p-2 rounded-lg text-theme px-4 ml-2 flex gap-2 items-center"
                      >
                        Edit
                        <Image
                          src={Pen}
                          height={25}
                          width={25}
                          alt="Pen Icon"
                        />
                      </button>
                    </button>
                  </div>
                </div>
              </div>

              {/* popups */}

              {regularPopup && (
                <div className="fixed inset-0 z-50 grid place-items-center bg-black bg-opacity-50">
                  <div
                    className="modal bg-white shadow-lg rounded-lg w-1/2 max-w-md p-6 grid gap-6"
                    ref={regularPopupRef}
                  >
                    {/* Title */}
                    <div className="flex justify-between gap-2 items-center flex-wrap">
                      <h1 className="text-black text-2xl font-bold text-center">
                        Your Regular points:
                      </h1>
                      <h1
                        className="cursor-pointer"
                        onClick={() => setRegularPopup(false)}
                      >
                        X
                      </h1>
                    </div>

                    <div>
                      <div className="flex justify-between mb-3">
                        <p>Points</p>
                        <p>00</p>
                      </div>
                      <div className="flex justify-between pb-5 border-b-2 border-gray-500">
                        <p>Total Incentive average: </p>
                        <p className="text-red-500">00%</p>
                      </div>
                      <div className="mt-4 flex justify-between">
                        <p>
                          Your final points:{" "}
                          <b className="text-red-500">(00*00)</b>
                        </p>
                        <p className="text-red-500">00%</p>
                      </div>
                      <p className="mt-10 text-sm text-center">
                        <b className="text-red-500">** </b> For regular points,
                        you will be eligible for incentive only when you will
                        have more than 100 incentive points in total
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {cashValueForEveryRegularPointModalOpen && (
                <div className="fixed inset-0 z-50 grid place-items-center bg-black bg-opacity-50">
                  <div
                    className="modal bg-white shadow-lg rounded-lg w-1/2 max-w-md p-6 grid gap-4"
                    ref={cashValeForEveryREgularPointRef}
                  >
                    {/* Title */}
                    <h1 className="text-black text-2xl font-bold text-center">
                      Cash value for every regular point:
                    </h1>

                    <div className="flex flex-col justify-center items-center ">
                      <p className="text-gray-400 mb-2">
                        Current Value: <b className="text-black">20 Taka</b>
                      </p>
                      <p className="text-gray-400">New Value (Taka)</p>
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Write here"
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-center gap-4">
                      <button
                        className="active-btn px-8"
                        onClick={() => {
                          setCashValueForEveryRegularPointModalOpen(false);
                        }}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {incentivePopup && (
                <div className="fixed inset-0 z-50 grid place-items-center bg-black bg-opacity-50">
                  <div
                    className="modal bg-white shadow-lg rounded-lg w-1/2 max-w-md p-6 grid gap-6"
                    ref={incentivePopupRef}
                  >
                    {/* Title */}
                    <div className="flex justify-between gap-2 items-center flex-wrap">
                      <h1 className="text-black text-xl font-bold text-center">
                        Your actual incentive points:
                      </h1>
                      <h1
                        className="cursor-pointer"
                        onClick={() => setIncentivePoints(false)}
                      >
                        X
                      </h1>
                    </div>

                    <div>
                      <div className="flex justify-between mb-3">
                        <p>Your obtained points</p>
                        <p>500</p>
                      </div>
                      <div className="flex justify-between pb-5 border-b-2 border-gray-500">
                        <p>incentive points: </p>
                        <p>80%</p>
                      </div>
                      <div className="mt-4 flex justify-between">
                        <p>Your acutual incentive points: 500*80 %:</p>
                        <p>400</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {upSaleCrossSalePointsPopup && (
                <div className="fixed inset-0 z-50 grid place-items-center bg-black bg-opacity-50">
                  <div
                    className="modal bg-white shadow-lg rounded-lg w-1/2 max-w-md p-6 grid gap-6"
                    ref={upSaleCrossSalePointsPopupRef}
                  >
                    {/* Title */}
                    <div className="flex justify-between gap-2 items-center flex-wrap">
                      <h1 className="text-black text-xl font-bold text-center">
                        Upsale/cross sale points
                      </h1>
                      <h1
                        className="cursor-pointer"
                        onClick={() => setUpSaleCrossSalePointsPopup(false)}
                      >
                        X
                      </h1>
                    </div>

                    <div>
                      <div className="flex justify-between mb-3">
                        <p>Upsale/cross sale:</p>
                        <p>$1202</p>
                      </div>
                      <div className="flex justify-between pb-5 border-b-2 border-gray-500">
                        <p>incentive: </p>
                        <p>5%</p>
                      </div>
                      <div className="mt-4 flex justify-between">
                        <p>Upsale/cross sale point: {"\n"} (1201*5%)</p>
                        <p>60.06</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {finalPointPopup && (
                <div className="fixed inset-0 z-50 grid place-items-center bg-black bg-opacity-50">
                  <div
                    className="modal bg-white shadow-lg rounded-lg w-1/2 max-w-md p-6 grid gap-6"
                    ref={finalPointPopupRef}
                  >
                    {/* Title */}
                    <div className="flex justify-between gap-2 items-center flex-wrap">
                      <h1 className="text-black text-xl font-bold text-center">
                        Final points:
                      </h1>
                      <h1
                        className="cursor-pointer"
                        onClick={() => setFinalPointPopup(false)}
                      >
                        X
                      </h1>
                    </div>

                    <div>
                      <div className="flex justify-between mb-3">
                        <p>You bonus points:</p>
                        <p>60</p>
                      </div>
                      <div className="flex justify-between pb-5 border-b-2 border-gray-500">
                        <p>Incentive Percentage: </p>
                        <p>80%</p>
                      </div>
                      <div className="mt-4 flex justify-between">
                        <p>Your fina points: (60*80):</p>
                        <p>48pt</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        {selectedFirstGroup == "Current" &&
          selectedSecondGroup == "Quarterly" && <QuarterlyTable />}
        {selectedFirstGroup == "Current" && selectedSecondGroup == "Yearly" && (
          <YearlyTable />
        )}

        {incentiveFactorsModalOpen && (
          <div className="fixed inset-0 z-50 grid place-items-center bg-black bg-opacity-50">
            <div
              className="modal bg-white shadow-lg rounded-lg w-[90%] p-6 grid gap-6 max-w-[1300px] h-[90vh] overflow-scroll hide-scroll"
              ref={IncentiveFactorsRef}
            >
              {/* Title */}
              <h1 className="bg-theme text-white p-4 text-xl font-bold text-center">
                REGULAR POINTS:
              </h1>

              <p className="text-center p-3 text-green-700 bg-green-600/20 rounded-lg">
                Acutal regular points will be dependent on the following
                criteria:
              </p>

              <div className="flex flex-wrap gap-4 justify-center items-center">
                {Array.from({ length: 7 }).map((_, idx) => {
                  return (
                    <div className="bg-[#BCE4FF] p-3 rounded-lg min-w-[20rem] flex-1 ">
                      <h1 className="p-3 border-b-2 border-theme text-center font-bold">
                        Revision vs Task Ratio:
                      </h1>
                      <div className="flex justify-between items-center my-3">
                        <p className="font-bold">Ratio</p>
                        <p className="font-bold">Obtainable Points</p>
                      </div>
                      <div className="bg-[#A3D1F0]">
                        {Array.from({ length: 7 }).map((_, rowIdx) => {
                          return (
                            <div className="flex justify-between items-center py-3 p-2 rounded-lg">
                              <p>0-10%</p>
                              <p>100% Points</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <h1 className="bg-theme mt-7 text-white p-4 text-xl font-bold text-center ">
                REGULAR POINTS:
              </h1>

              <div className="flex justify-center items-center gap-4 flex-wrap">
                <p className="text-center p-3 text-green-700 bg-green-600/20 rounded-lg flex-1 h-full flex items-center justify-center ">
                  Bonus Points Based on the Released Amounts
                </p>
                <p className="text-center p-3 text-green-700 bg-green-600/20 rounded-lg flex-1">
                  However, The final bonus points will be determined by the
                  amount of unreleased payment he had (previous + current month)
                  as below:
                </p>
              </div>

              <div className="flex flex-wrap gap-4 justify-center items-center">
                {Array.from({ length: 2 }).map((_, idx) => {
                  return (
                    <div className="bg-[#BCE4FF] p-3 rounded-lg min-w-[20rem] flex-1 ">
                      <h1 className="p-3 border-b-2 border-theme text-center font-bold">
                        Bonus Points Based on the Released Amounts:
                      </h1>
                      <div className="flex justify-between items-center my-3">
                        <p className="font-bold">Ratio</p>
                        <p className="font-bold">Obtainable Points</p>
                      </div>
                      <div className="bg-[#A3D1F0]">
                        {Array.from({ length: 7 }).map((_, rowIdx) => {
                          return (
                            <div className="flex justify-between items-center py-3 p-2 rounded-lg">
                              <p>0-6000 USD</p>
                              <p>00 Points</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <h1 className="bg-theme mt-7 text-white p-4 text-xl font-bold text-center">
                UP SALE/CROSS SALE POINTS:
              </h1>

              <div className="flex flex-wrap gap-4 justify-center items-center">
                {Array.from({ length: 1 }).map((_, idx) => {
                  return (
                    <div className="bg-[#BCE4FF] p-3 rounded-lg min-w-[20rem] flex-1 ">
                      <h1 className="p-3 border-b-2 border-theme text-center font-bold">
                        Revision vs Task Ratio:
                      </h1>
                      <div className="flex justify-between items-center my-3">
                        <p className="font-bold">Ratio</p>
                        <p className="font-bold">Obtainable Points</p>
                      </div>
                      <div className="bg-[#A3D1F0]">
                        {Array.from({ length: 7 }).map((_, rowIdx) => {
                          return (
                            <div className="flex justify-between items-center py-3 p-2 rounded-lg">
                              <p>0-500 USD</p>
                              <p>03% Points</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {selectedFirstGroup == "Held amounts" && (
          <HeldAmountTable
            payModalOpen={payModalOpen}
            setPayModalOpen={setPayModalOpen}
          />
        )}
        <IncentiveSection />
      </div>
    </>
  );
}
