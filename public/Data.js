const idealVsAchieved = {
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
        barColors: [
          ["#17995B", "#68F4AB"],
          ["#0A9DFF", "#C4EBFE"],
          ["#FEC117", "#FFE398"],
          ["#FFA4A4", "#FFA4A4"],
          ["#FFA4A4", "#FFA4A4"],
          ["#FFA4A4", "#FFA4A4"],
          ["#FFA4A4", "#FFA4A4"],
        ],
      },
    ],
  };
  