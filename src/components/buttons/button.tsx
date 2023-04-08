import { useState } from "react";

function Button({ data, day, selectedDay, onDayChange }) {
  function handleClick() {
    onDayChange(day);
  }

  if (day === selectedDay) {
    var buttonStyle = "buttonSelected button";
  } else {
    var buttonStyle = "button";
  }

  const thisDate = data[day][0].dt_txt;
  const dayIndex = new Date(thisDate.split(" ")[0]).getDay();
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = dayNames[dayIndex];

  var temps: Array<number> = data[day].map((item: any) =>
    Math.round(item.main.temp)
  );

  return (
    <div onClick={handleClick} className={buttonStyle}>
      <p>{dayName}</p>
      <p className="flex w-1/2"><p className="mr-auto">{Math.max(...temps)}°</p> <p className="text-contrast2 ml-auto">{Math.min(...temps)}°</p></p>
    </div>
  );
}

export default Button;
