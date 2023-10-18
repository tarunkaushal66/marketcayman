import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const UserChart = ({ name, data }) => {
  const parsedData = [
    Math.round((data.completed / data.total) * 100),
    Math.round((data.cancelled / data.total) * 100),
    Math.round((data.ongoing / data.total) * 100),
  ];
  const labels = [data.completed, data.cancelled, data.ongoing];
  const titles = ["Completed", "Cancelled", "Ongoing"];
  console.log("cddd 1", parsedData);
  const [chartData, setChartData] = React.useState({
    series: parsedData, // Update this array with the values you want
    options: {
      chart: {
        width: 380,
        type: "donut",
      },
      dataLabels: {
        // enabled: true,
        formatter: function (val, config) {
          return parseInt(labels[config.seriesIndex]);
        },
        style: {
          fontSize: "10px",
          colors: ["#fff"],
        },
      },
      tooltip: {
        enabled: true,
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          return `<div class="p-1 bg-light border text-dark">
              <span>${titles[seriesIndex]} : ${parsedData[seriesIndex]}%</span>
            </div>`;
        },
      },
      legend: {
        show: false, // Set this to false to hide the legend
        position: "right",
        offsetY: 0,
        height: 230,
      },
      labels: ["Completed,", "Ongoing", "Cancelled"],
      colors: ["#FFA800", "#FF8021", "#FF5733"], // Define custom colors here
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              show: false,
            },
          },
        },
      ],
      annotations: {
        // Add a custom annotation for the title in the center
        centerTitle: {
          text: "Pie Chart Title", // Customize the title text
          fontSize: "20px", // Customize the font size
          offsetY: 0, // Adjust the vertical position
        },
      },
    },
  });

  return (
    <>
      <div className="chart-wrap position-relative">
        <h6 className="m-0 position-absolute pieTitle">{name}</h6>
        <div id="chart">
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="donut"
            className="w-100"
          />
        </div>
      </div>
    </>
  );
};

export default UserChart;
