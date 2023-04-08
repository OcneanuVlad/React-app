import Chart from "./chart";

function Forecast({ handleOnHourChange, day, hour, forecastData, city }) {

  var dayName: string = getDayName(day)
  if (hour) {
    var currentHour: string = forecastData[day][hour].dt_txt.split(" ")[1].slice(0, -3);
  }

  function getDayName(day) {
    const thisDate: string = forecastData[day][0].dt_txt;
    const dayIndex: number = new Date(thisDate.split(" ")[0]).getDay();
    const dayNames: Array<string> = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
     return dayNames[dayIndex];
  }

  function handlePointClick(value) {
    handleOnHourChange(value);
  }

  console.log(forecastData);

  return (
    <div className="forecast w-6/12 h-full flex flex-col items-center my-16 overflow-hidden bg-secondary relative">
      <div className="forecast-info flex justify-between h-1/2 w-full">
        <div className="forecast-info-left h-full w-1/2 flex flex-col ">
          <p className="text-3xl">{city}</p>
          <p>
            {dayName} {currentHour}
          </p>
          <p>{hour ? forecastData[day][hour].weather[0].main : forecastData[day][0].weather[0].main}</p>
        </div>
        <div className="forecast-info-right flex flex-col items-end w-1/2 h-full text-sm">
          <div className="flex items-center">
            <img src="" alt="overall"></img>
            <p className="text-9xl font-extrabold">
              {hour ? Math.round(forecastData[day][hour].main.temp) : Math.round(forecastData[day][0].main.temp)}
            </p>
          </div>
          <p className="text-contrast2">
            Feels like: {hour ? Math.round(forecastData[day][hour].main.feels_like) : Math.round(forecastData[day][0].main.feels_like)}°
          </p>
          <p className="text-contrast2">Precipitation: {hour ? Math.round(forecastData[day][hour].pop * 100) : Math.round(forecastData[day][0].pop * 100)}%</p>
          <p className="text-contrast2">Humidity: {hour ? Math.round(forecastData[day][hour].main.humidity) : Math.round(forecastData[day][0].main.humidity)}%</p>
          <p className="text-contrast2">Wind: {hour ? Math.round(forecastData[day][hour].wind.speed) : Math.round(forecastData[day][0].wind.speed)} km/h</p>
        </div>
      </div>
      <Chart
        data={forecastData}
        day={day}
        handlePointClick={handlePointClick}
        index={hour}
      />
    </div>
  );
}

export default Forecast;
