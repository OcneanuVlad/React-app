import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

function Chart({ data, day, handlePointClick, index }) {
  ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    PointElement,
    ChartDataLabels
  );

  const hours = data[day].map((item) => item.dt_txt.split(" ")[1].slice(0, -3));
  const allTemps = [];
  data.forEach((day) => {
    day.map((item) => allTemps.push(Math.round(item.main.temp)));
  });
  const temps = data[day].map((item) => Math.round(item.main.temp));

  const chartData = {
    labels: hours,
    datasets: [
      {
        label: "test",
        data: temps,
        backgroundColor: (context) =>
          context.dataIndex === index ? "#2d2d2d" : "#fefefe",
        borderColor: "#fefefe",
        borderWidth: 3,
        pointBorderColor: "transparent",
        tension: 0.3,
      },
    ],
  };

  const options: any = {
    maintainAspectRatio: false,
    onClick: pointClick,
    elements: {
      point: {
        radius: (context) => (context.dataIndex === index ? 12 : 5),
        color: "black",
        hitRadius: 300,
        hoverRadius: 12,
      },
    },
    plugins: {
      tooltip: {
        mode: "none",
      },
      legend: {
        display: false,
      },
      responsive: true,
      datalabels: {
        anchor: "end",
        align: "top",
        color: "#fefefe",
        font: {
          family: "Montserrat",
          weight: "bold",
          size: 16,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#fefefe",
          font: {
            family: "Montserrat",
            weight: "normal",
            size: 12,
          },
        },
      },
      y: {
        display: false,
        max: Math.max(...allTemps) + 2,
        min: Math.min(...allTemps) - 2,
        grid: {
          display: false,
        },
      },
    },
  };

  function pointClick(event, activePoints) {
    if (activePoints.length > 0) {
      handlePointClick(activePoints[0]?.index);
    }
  }

  return (
    <div className="chart w-11/12 absolute bottom-5">
      <Line data={chartData} options={options} />
    </div>
  );
}

export default Chart;
