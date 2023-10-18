import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactApexChart from "react-apexcharts";

const BarChart = () => {
  const [chartData, setChartData] = useState(
    {
      series: [
        {
          name: "PRODUCT A",
          data: [44, 55, 41, 67, 22, 43, 54, 32, 44, 55, 41, 67],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "bar",
          stacked: false,
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 6,
            dataLabels: {
              total: {
                enabled: false,
              },
            },
          },
        },
        // dataLabels: {
        //   enabled: true,
        //   formatter: function (val) {
        //     return val + "%";
        //   },
        //   offsetY: -20,
        //   style: {
        //     fontSize: "12px",
        //     colors: ["#304758"],
        //   },
        // },

        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 0,
              },
            },
          },
        ],
        // yaxis: {
        //   axisBorder: {
        //     show: false,
        //   },
        //   axisTicks: {
        //     show: false,
        //   },
        //   labels: {
        //     show: false,
        //     formatter: function (val) {
        //       return val + "%";
        //     },
        //   },
        // },
        // title: {
        //   text: "Monthly Inflation in Argentina, 2002",
        //   floating: true,
        //   offsetY: 330,
        //   align: "center",
        //   style: {
        //     color: "#444",
        //   },
        // },
        legend: {
          position: "right",
          offsetY: 40,
        },
        fill: {
          opacity: 1,
        },
        // Specify custom colors for the bars
        colors: [
          "#FFA800",
          "#FF8021",
          "#FF5733",
          "#FF4633",
          "#FF3333",
          "#FF334E",
          "#FF3369",
          "#FF337D",
          "#FF33A3",
          "#FF33C7",
          "#FF33E1",
          "#FF33F7",
        ],
      },
    } || {
      series: [
        {
          name: "PRODUCT A",
          data: [44, 55, 41, 67, 22, 43, 54, 32, 44, 55, 41, 67],
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 350,
          stacked: false,
          toolbar: false,
          zoom: {
            enabled: false,
          },
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 0,
              },
            },
          },
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 6,
            dataLabels: {
              total: {
                enabled: false,
              },
            },
          },
        },
        legend: {
          position: "right",
          offsetY: 40,
        },
        fill: {
          opacity: 1,
        },
        // Specify custom colors for the bars
        colors: [
          "#FFA800",
          "#FF8021",
          "#FF5733",
          "#FF4633",
          "#FF3333",
          "#FF334E",
          "#FF3369",
          "#FF337D",
          "#FF33A3",
          "#FF33C7",
          "#FF33E1",
          "#FF33F7",
        ],
      },
    }
  );

  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default BarChart;
