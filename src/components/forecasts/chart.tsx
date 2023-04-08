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

type chartProps = {
  data: Array<Array<Object>>;
};

function Chart(props: chartProps) {
  ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    PointElement
  );

  var hours: Array<string> = props.data[0].map((item: any) =>
    item.dt_txt.split(" ")[1].slice(0, -3)
  );
  var temps: Array<number> = props.data[0].map((item: any) =>
    Math.round(item.main.temp)
  );

  var data = {
    labels: hours,
    datasets: [
      {
        label: "test",
        data: temps,
        backgroundColor: "grey",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  var options: any = {
    plugins: {
      legend: {
        display: false,
      },
      responsive: true,
    },
    scales: {
      y: {
        max: Math.max(...temps) + 4,
      },
    },
  };

  return <Line data={data} options={options}></Line>;
}

export default Chart;
