import React, { useRef, useEffect } from "react";
import { Chart, BarController, LinearScale, CategoryScale } from "chart.js";

Chart.register(BarController, LinearScale, CategoryScale);

function BarChartComponent() {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, []); // The empty array ensures the effect is only run once on mount

  return (
    <div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default BarChartComponent;
