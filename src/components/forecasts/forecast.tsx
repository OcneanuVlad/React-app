import Chart from "./chart";

window.onload = function () {};

type forecastProps = {
  forecastData: Array<Array<Object>>;
};

function Forecast(props: forecastProps) {

    console.log(props.forecastData);

  return (
    <div className="forecast w-8/12 h-full border-black">
      {props.forecastData && <Chart data={props.forecastData}/>}
    </div>
  );
}

export default Forecast;
