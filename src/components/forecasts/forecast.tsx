import { useRef } from "react";
import Blocks from "../animation/animationBlocks";
import Chart from "./chart";

export function doWorstWeather(weathers: Array<any>): Array<any> {
  let worst: string = "-1";
  let description: string = "";
  weathers.forEach((item) => {
    if (item.icon[item.icon.length - 1] === "n") {
      if (item.icon.slice(0, -1) + "a" > worst) {
        worst = item.icon.slice(0, -1) + "a";
        description = firstLetterToUppercase(item.description);
      }
    } else {
      if (item.icon > worst) {
        worst = item.icon;
        description = firstLetterToUppercase(item.description);
      }
    }
  });
  if (worst[worst.length - 1] === "a") {
    worst = worst.slice(0, -1) + "n";
  }
  return [description, worst];
}

function firstLetterToUppercase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// component
function Forecast({ handleOnHourChange, day, hour, forecastData, location, handleDegreeChange, degree, handleSetFavorite, favorites }) {

  var dayName: string = getDayName(day);
  if (hour !== null) {
    var currentHour: string = forecastData[day][hour].dt_txt.split(" ")[1].slice(0, -3);
  }

  function getDayName(day) {
    const thisDate: string = forecastData[day][0].dt_txt;
    const dayIndex: number = new Date(thisDate.split(" ")[0]).getDay();
    const dayNames: Array<string> = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return dayNames[dayIndex];
  }

  function handlePointClick(value) {
    handleOnHourChange(value);
  }

  function doAverage(values: Array<any>): number {
    const sum = values.reduce((accumulator, value) => {
      return accumulator + value;
    });
    return Math.round(sum / values.length);
  }

  function handleMetric(): void {
    if (degree === "F") {
      forecastData.forEach((item) => {
        item.forEach((item) => {
          item.main.temp = (item.main.temp - 32) * 0.5556;
        });
      });
    }
    handleDegreeChange("C");
  }

  function handleImperial(): void {
    if (degree === "C") {
      forecastData.forEach((item) => {
        item.forEach((item) => {
          item.main.temp = item.main.temp * 1.8 + 32;
        });
      });
    }
    handleDegreeChange("F");
  }

  function setFavorite() {
    handleSetFavorite();
  }

  return (
    <div className="forecast">
      <Blocks />
      <div className="forecast-info flex justify-center h-1/2 w-full">
        <div className="forecast-info-left h-full w-1/2 flex flex-col ">
          <div className="flex w-full">
            <p className="city text-3xl flex w-auto m-0">{location.city}</p>
            <button className="star w-1/12 ml-3 flex justify-center items-center" onClick={setFavorite}>
              <img
                className="w-3/4"
                src={favorites.some((item) => item.city === location.city) ? "images/star-filled.png" : "images/star-empty.png"}
              />
            </button>
          </div>
          <p className="secondary">
            {dayName} {hour !== null ? currentHour : null}
          </p>
          <p className="secondary">
            {hour !== null
              ? firstLetterToUppercase(forecastData[day][hour].weather[0].description)
              : doWorstWeather(forecastData[day].map((item) => item.weather[0]))[0]}
          </p>
          <img
            className="weatherIcon"
            src={
              hour !== null
                ? `images/${forecastData[day][hour].weather[0].icon}.png`
                : `images/${doWorstWeather(forecastData[day].map((item) => item.weather[0]))[1]}.png`
            }
            alt="overall"
          ></img>
        </div>
        <div className="degrees absolute flex justify-evenly top-8 w-16">
          <button
            className={degree === "C" ? "cursor-pointer font-bold text-contrast" : "cursor-pointer font-thin text-contrast2"}
            onClick={handleMetric}
          >
            C°
          </button>
          <div className="block h-5 w-px bg-contrast"></div>
          <button
            className={degree === "F" ? "cursor-pointer font-bold text-contrast" : "cursor-pointer font-thin text-contrast2"}
            onClick={handleImperial}
          >
            F°
          </button>
        </div>
        <div className="forecast-info-right flex flex-col items-end w-1/2 h-full text-sm">
          <p className="mainTemp">
            {hour !== null ? Math.round(forecastData[day][hour].main.temp) : Math.round(Math.max(...forecastData[day].map((item) => item.main.temp)))}
          </p>
          <p className="secondary text-contrast2">
            Precipitation:{" "}
            {hour !== null ? Math.round(forecastData[day][hour].pop * 100) : doAverage(forecastData[day].map((item) => item.pop * 100))}%
          </p>
          <p className="secondary text-contrast2">
            Humidity:{" "}
            {hour !== null ? Math.round(forecastData[day][hour].main.humidity) : doAverage(forecastData[day].map((item) => item.main.humidity))}%
          </p>
          <p className="secondary text-contrast2">
            Wind: {hour !== null ? Math.round(forecastData[day][hour].wind.speed) : doAverage(forecastData[day].map((item) => item.wind.speed))} km/h
          </p>
        </div>
      </div>
      <Chart data={forecastData} day={day} handlePointClick={handlePointClick} index={hour} />
    </div>
  );
}

export default Forecast;
