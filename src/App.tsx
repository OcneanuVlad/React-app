import { useState } from "react";
import Forecast from "./components/forecasts/forecast";
import Search from "./components/search/search";
import { weatherApiUrl, weatherApiKey } from "./api";

export type data = {
  label: string;
  value: string;
};

function App() {
  const [forecast, setForecast] = useState<Array<Array<Object>>>(null);

  function handleOnSearchChange(searchData: data) {
    const [lat, lon] = searchData.value.split(" ");

    const forecastFetch: Promise<any> = fetch(
      `${weatherApiUrl}/forecast?lat=${parseFloat(lat)}&lon=${parseFloat(
        lon
      )}&appid=${weatherApiKey}&units=metric`
    );

    forecastFetch
      .then(async (response: any) => {
        const forecastResponse = await response.json();

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

  return (
    <div className="h-auto w-screen flex flex-col items-center my-20">
      <Search onSearchChange={handleOnSearchChange} />
      <Forecast forecastData={forecast} />
    </div>
  );
}

export default App;
