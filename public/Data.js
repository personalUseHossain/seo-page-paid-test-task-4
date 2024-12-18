export const IdealVsAchieved = {
  name: "Ideal vs Achieved",
  charts: [
    {
      name: "Revision vs Task ratio",
      xLabel: "Percentage",
      yLabel: "Incentive",
      chartData1: {
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
      },
      chartData2: {
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
      },
      barColor1: [
        ["#17995B", "#68F4AB"],
        ["#0A9DFF", "#C4EBFE"],
        ["#FEC117", "#FFE398"],
        ["#FFA4A4", "#FFA4A4"],
        ["#FFA4A4", "#FFA4A4"],
        ["#FFA4A4", "#FFA4A4"],
        ["#FFA4A4", "#FFA4A4"],
      ],

      barColor2: [["#0A9DFF", "#C4EBFE"]],
    },
    {
      name: "Goal Achieve Rate",
      xLabel: "Goal Achieve Rate",
      yLabel: "Incentive percentage",
      chartData1: {
        labels: [
          "0-41%",
          "42-50%",
          "51-74%",
          "75%",
          "76-80%",
          "80-90%",
          "91-100%",
        ],
        datasets: [
          {
            label: "Incentive Percentage",
            data: [0, 50, 80, 100, 100, 100, 100], // Values
            borderRadius: 10,
            barThickness: 50,
          },
        ],
      },
      chartData2: {
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
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100], // Values
            borderRadius: 10,
            barThickness: 10,
          },
        ],
      },
      barColor1: [
        ["#ffabab", "#ffabab"],
        ["#febf0f", "#ffe397"],
        ["#049bff", "#bae6fe"],
        ["#159758", "#6bf8ae"],
        ["#159758", "#6bf8ae"],
        ["#159758", "#6bf8ae"],
        ["#159758", "#6bf8ae"],
      ],

      barColor2: [["#ff0000", "#ff0000"]],
    },
    {
      name: "Negative points vs Positive points",
      xLabel: "Negative points vs Positive points",
      yLabel: "Incentive percentage",
      chartData1: {
        labels: [
          "0-25%",
          "26-35%",
          "36-50%",
          "51-65%",
          "66-80%",
          "81-95%",
          "100%",
        ],
        datasets: [
          {
            label: "Incentive Percentage",
            data: [100, 80, 50, 0, 0, 0, 0], // Values
            borderRadius: 10,
            barThickness: 50,
          },
        ],
      },
      chartData2: {
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
            data: [0, 0, 0, 80, 0, 0, 0, 0, 0, 0, 0, 100], // Values
            borderRadius: 10,
            barThickness: 10,
          },
        ],
      },
      barColor1: [
        ["#159758", "#6bf8ae"],
        ["#049bff", "#bae6fe"],
        ["#febf0f", "#ffe397"],
        ["#ffabab", "#ffabab"],
        ["#ffabab", "#ffabab"],
        ["#ffabab", "#ffabab"],
        ["#ffabab", "#ffabab"],
      ],

      barColor2: [["#049bff", "#bae6fe"]],
    },
    {
      name: "Percentage of Delayed Projects",
      xLabel: "Percentage of Delayed Projects",
      yLabel: "Incentive percentage",
      chartData1: {
        labels: [
          "0-30%",
          "31-40%",
          "41-50%",
          "51-60%",
          "61-70%",
          "71-80%",
          "100%",
        ],
        datasets: [
          {
            label: "Incentive Percentage",
            data: [120, 100, 80, 20, 0, 0, 0], // Values
            borderRadius: 10,
            barThickness: 50,
          },
        ],
      },
      chartData2: {
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
            data: [0, 0, 0, 80, 0, 0, 0, 0, 0, 0, 0, 100], // Values
            borderRadius: 10,
            barThickness: 10,
          },
        ],
      },
      barColor1: [
        ["#159758", "#6bf8ae"],
        ["#159758", "#6bf8ae"],
        ["#049bff", "#bae6fe"],
        ["#febf0f", "#ffe397"],
        ["#ffabab", "#ffabab"],
        ["#ffabab", "#ffabab"],
      ],

      barColor2: [["#049bff", "#bae6fe"]],
    },
    {
      name: "Deadline Miss Rate",
      xLabel: "Deadline Miss Rate",
      yLabel: "Incentive percentage",
      chartData1: {
        labels: [
          "0-30%",
          "31-40%",
          "41-45%",
          "46-50%",
          "51-65%",
          "66-80%",
          "81-100%",
        ],
        datasets: [
          {
            label: "Incentive Percentage",
            data: [100, 80, 50, 20, 0, 0, 0], // Values
            borderRadius: 10,
            barThickness: 50,
          },
        ],
      },
      chartData2: {
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
            data: [0, 0, 0, 0, 80, 0, 0, 0, 0, 0, 0, 100], // Values
            borderRadius: 10,
            barThickness: 10,
          },
        ],
      },
      barColor1: [
        ["#159758", "#6bf8ae"],
        ["#049bff", "#bae6fe"],
        ["#febf0f", "#ffe397"],
        ["#FFA928", "#FFEACC"],
        ["#ffabab", "#ffabab"],
        ["#ffabab", "#ffabab"],
      ],

      barColor2: [["#049bff", "#bae6fe"]],
      info: true
    },
    {
      name: "Client Retention Rate",
      xLabel: "Client Retention Rate",
      yLabel: "Incentive percentage",
      chartData1: {
        labels: ["0-5%", "6-10%", "11-15%", "16-20%", "21-100%"],
        datasets: [
          {
            label: "Incentive Percentage",
            data: [0, 50, 80, 100, 120], // Values
            borderRadius: 10,
            barThickness: 50,
          },
        ],
      },
      chartData2: {
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
            data: [0, 80, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100], // Values
            borderRadius: 10,
            barThickness: 10,
          },
        ],
      },
      barColor1: [
        ["#ffabab", "#ffabab"],
        ["#febf0f", "#ffe397"],
        ["#049bff", "#bae6fe"],
        ["#159758", "#6bf8ae"],
        ["#159758", "#6bf8ae"],
      ],

      barColor2: [["#049bff", "#bae6fe"]],
    },
  ],
};


export const SecondSectionData = [
  {
    name: "Revision vs task ratio",
    nameColor: "black",
    achivedPercentage: "80",
    achivedColor: "black",
    progressPercentage: 50,
    progressMaxPercentage: 100,
    progressThumbColor: ["#049bff", "#bae6fe"],
    progressContainerColor: "white"
  },
  {
    name: "Goal achieve rate",
    nameColor: "red",
    achivedPercentage: "00",
    achivedColor: "red",
    progressPercentage: 0,
    progressMaxPercentage: 100,
    progressThumbColor: ["#FF6666", "#FF6666"],
    progressContainerColor: "#FFDADA"
  },
  {
    name: "Negative points vs positive points",
    nameColor: "black",
    achivedPercentage: "80",
    achivedColor: "black",
    progressPercentage: 80,
    progressMaxPercentage: 100,
    progressThumbColor: ["#049bff", "#bae6fe"],
    progressContainerColor: "white"
  },
  {
    name: "Percentage of delayed projects",
    nameColor: "black",
    achivedPercentage: "29",
    achivedColor: "black",
    progressPercentage: 29,
    progressMaxPercentage: 120,
    progressThumbColor: ["#049bff", "#bae6fe"],
    progressContainerColor: "white"
  },
  {
    name: "Milestone cancelation rate",
    nameColor: "black",
    achivedPercentage: "03",
    achivedColor: "black",
    progressPercentage: 3,
    progressMaxPercentage: 100,
    progressThumbColor: ["#049bff", "#bae6fe"],
    progressContainerColor: "white"
  },

  {
    name: "Deadline miss rate",
    nameColor: "black",
    achivedPercentage: "40",
    achivedColor: "black",
    progressPercentage: 40,
    progressMaxPercentage: 100,
    progressThumbColor: ["#049bff", "#bae6fe"],
    progressContainerColor: "white"
  },
  {
    name: "Client retention rate",
    nameColor: "black",
    achivedPercentage: "80",
    achivedColor: "black",
    progressPercentage: 80,
    progressMaxPercentage: 100,
    progressThumbColor: ["#049bff", "#bae6fe"],
    progressContainerColor: "white"
  },
  {
    name: "Average",
    nameColor: "red",
    achivedPercentage: "0",
    achivedColor: "red",
    progressPercentage: 0,
    progressMaxPercentage: 100,
    progressThumbColor: ["#FF6666", "#FF6666"],
    progressContainerColor: "#FFDADA"
  },
];


export const upSaleCrossSaleAmount = [
    {
        name: "Upsale/Croll Sale Amount",
        xLabel: "Points Percentage",
        yLabel: "Upsale/Crolls Sale percentage",
        chartData1: {
          labels: ["1-500%", "501-1200$", "1201-1800$", "1801-3000$", "3001-higher"],
          datasets: [
            {
              label: "Incentive Percentage",
              data: [3, 4, 5, 5.5, 6], // Values
              borderRadius: 10,
              barThickness: 50,
            },
          ],
        },
        chartData2: {
            labels: ["1-500%", "501-1200$", "1201-1800$", "1801-3000$", "3001-higher"],
          datasets: [
            {
              label: "Revision Vs Task Ratio",
              data: [0, 0, 5, 0, 0], // Values
              borderRadius: 10,
              barThickness: 10,
            },
          ],
        },
        barColor1: [
            ["#159758", "#6bf8ae"],
            ["#049bff", "#bae6fe"],
            ["#febf0f", "#ffe397"],
            ["#049bff", "#bae6fe"],
            ["#159758", "#6bf8ae"],
        ],
  
        barColor2: [["#049bff", "#bae6fe"]],
      },
]



export const bonusPointsData = [
    {
        name: "Bonus Points Based on Released Amount",
        xLabel: "Released Amounts",
        yLabel: "Bonus points",
        chartData1: {
          labels: ["0-6000", "6001-8000", "8001-10000", "10001-12000", "12001-15000", "15001-Higher"],
          datasets: [
            {
              label: "Bonux Points",
              data: [0, 20, 40, 60, 80, 120], // Values
              borderRadius: 10,
              barThickness: 50,
            },
          ],
        },
        chartData2: {
            labels: ["0-6000", "6001-8000", "8001-10000", "10001-12000", "12001-15000", "15001-Higher"],
          datasets: [
            {
              label: "Bonux Points",
              data: [0, 0, 0, 60, 0, 0], // Values
              borderRadius: 10,
              barThickness: 10,
            },
          ],
        },
        barColor1: [
            ["#ffabab", "#ffabab"],
            ["#049bff", "#bae6fe"],
            ["#febf0f", "#ffe397"],
            ["#049bff", "#bae6fe"],
            ["#159758", "#6bf8ae"],
            ["#159758", "#6bf8ae"],
        ],
  
        barColor2: [["#049bff", "#bae6fe"]],
      },
]



export const UnreleasedPaymentAmount = [
    {
        name: "Unreleased Payment Amount",
        xLabel: "Unreleased Payment Amount",
        yLabel: "Incentive Percentage",
        chartData1: {
          labels: ["0-5000", "5001-10000", "10001-15000", "15001-20000", "20001-25000", "25001-30000", "30001-35000"],
          datasets: [
            {
              label: "Incentive Percentage",
              data: [100, 80, 50, 0, 0, 0], // Values
              borderRadius: 10,
              barThickness: 50,
            },
          ],
        },
        chartData2: {
            labels: ["0-5000", "5001-10000", "10001-15000", "15001-20000", "20001-25000", "25001-30000", "30001-35000"],
          datasets: [
            {
              label: "Revision Vs Task Ratio",
              data: [0, 80, 0, 0, 0, 0, 0], // Values
              borderRadius: 10,
              barThickness: 10,
            },
          ],
        },
        barColor1: [
            ["#159758", "#6bf8ae"],
            ["#049bff", "#bae6fe"],
            ["#febf0f", "#ffe397"],
            ["#febf0f", "#ffe397"],
            ["#ffabab", "#ffabab"],
            ["#ffabab", "#ffabab"],
        ],
  
        barColor2: [["#049bff", "#bae6fe"]],
      },
]



// yellow: ["#febf0f", "#ffe397"]
// green: ["#159758", "#6bf8ae"]
// blue: ["#049bff", "#bae6fe"]
// pink: ["#ffabab", "#ffabab"]