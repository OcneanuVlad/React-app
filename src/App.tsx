import { useState } from "react";
import Forecast from "./components/forecasts/forecast";
import Search from "./components/search/search";
import { weatherApiUrl, weatherApiKey } from "./api";
import Button from "./components/buttons/button";

export type data = {
  label: string;
  value: string;
};

function App() {
  const [forecast, setForecast] = useState<Array<Array<Object>> | null>(null);
  const [day, setDay] = useState<number>(0);
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [hour, setHour] = useState<number | null>(null);
  const [city, setCity] = useState<string | null>(null);

  window.onload = function () {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchData(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  function handleOnHourChange(value) {
    setHour(value);
  }

  function handleOnSearchChange(searchData: data) {
    const [lat, lon] = searchData.value.split(" ");

    fetchData(lat, lon);
  }

  function fetchData(lat, lon) {
    const forecastFetch: Promise<any> = fetch(
      `${weatherApiUrl}/forecast?lat=${parseFloat(lat)}&lon=${parseFloat(
        lon
      )}&appid=${weatherApiKey}&units=metric`
    );

    forecastFetch
      .then(async (response: any) => {
        const forecastResponse = await response.json();
        console.log(forecastResponse);

        setCity(forecastResponse.city.name);
        let daysForecast: Array<Array<Object>> = [[]];
        let day: number = 0;
        daysForecast[day].push(forecastResponse.list[0]);
        for (let i = 1; i <= 39; i++) {
          if (
            forecastResponse.list[i - 1].dt_txt.split(" ")[1] >
            forecastResponse.list[i].dt_txt.split(" ")[1]
          ) {
            day++;
            daysForecast[day] = [];
          }
          daysForecast[day].push(forecastResponse.list[i]);
        }

        setForecast(daysForecast);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleOnDayChange(day) {
    setDay(day);
    setHour(null);
    setSelectedDay(day);
  }

  return (
    <div className="h-auto w-screen flex flex-col items-center my-16">
      <Search onSearchChange={handleOnSearchChange} />
      {forecast && <Forecast forecastData={forecast} day={day} hour={hour} handleOnHourChange={handleOnHourChange} city={city}/>}
      {forecast && <div className="flex">
        <Button data={forecast} selectedDay={selectedDay} onDayChange={handleOnDayChange} day={0} />
        <Button data={forecast} selectedDay={selectedDay} onDayChange={handleOnDayChange} day={1} />
        <Button data={forecast} selectedDay={selectedDay} onDayChange={handleOnDayChange} day={2} />
        <Button data={forecast} selectedDay={selectedDay} onDayChange={handleOnDayChange} day={3} />
        <Button data={forecast} selectedDay={selectedDay} onDayChange={handleOnDayChange} day={4} />
      </div>}
    </div>
  );
}

export default App;
