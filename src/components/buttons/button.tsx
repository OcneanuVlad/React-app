import { gsap } from "gsap";
import { doWorstWeather } from "../forecasts/forecast";

function Button({ data, day, selectedDay, onDayChange }) {
  function handleClick() {
    onDayChange(day);
    gsap.fromTo(".blocks-container", { x: "0%" }, { duration: 1.5, x: "400%" });
  }

  if (day === selectedDay) {
    var buttonStyle = "buttonSelected button";
  } else {
    var buttonStyle = "button";
  }

  // convert data: 2020-12-05 to week day
  const thisDate = data[day][0].dt_txt;
  const dayIndex = new Date(thisDate.split(" ")[0]).getDay();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayName = dayNames[dayIndex];

  var temps: Array<number> = data[day].map((item: any) => Math.round(item.main.temp));

  return (
    <div onClick={handleClick} className={buttonStyle}>
      <div className="button-blocks-container">
        <div className="block"></div>
        <div className="block"></div>
        <div className="block"></div>
      </div>
      <p>{dayName}</p>
      <div className="h-1/3 flex items-center justify-center">
        {/* show the worst type of weather from the respective day (eg: rain, snow) */}
        <img className="w-3/12" src={`images/${doWorstWeather(data[day].map((item) => item.weather[0]))[1]}.png`} alt="general" />
      </div>
      <div className="flex w-1/2">
        {/* show the max and min temp from the respective day */}
        <p className="mr-auto">{Math.max(...temps)}°</p> <p className="text-contrast2 ml-auto">{Math.min(...temps)}°</p>
      </div>
    </div>
  );
}

export default Button;
