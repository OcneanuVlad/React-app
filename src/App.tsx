import { useEffect, useState } from "react";
import Forecast from "./components/forecasts/forecast";
import Search from "./components/search/search";
import { weatherApiUrl, weatherApiKey } from "./api";
import Button from "./components/buttons/button";
import Favorites from "./components/favorites/favorites";
import dummy from "./dummy/test";
import ChangeColors from "./components/theme/theme";
import { gsap } from "gsap";

export type data = {
  label: string;
  value: string;
};

type location = {
  city: string;
  country: string;
  coord: Object;
};

let timeoutId;

// component
function App() {
  const [forecast, setForecast] = useState<Array<Array<Object>> | null>(null);
  const [day, setDay] = useState<number>(0);
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [hour, setHour] = useState<number | null>(null);
  const [location, setLocation] = useState<location>(null);
  const [degree, setDegree] = useState<string>("C");
  const [favorites, setFavorites] = useState<Array<any>>([]);

  window.onload = function () {
    const body: HTMLElement = document.querySelector(".mainContainer");

    // set height based on device
    body.style.height = `${window.screen.height - 120}px`;
    
    const blocks: HTMLElement = document.querySelector(".main-blocks-container");

    // get current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchData(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.log(error);
        blocks.style.zIndex = "0";
      }
    );
    setTimeout(() => {
      blocks.style.zIndex = "0";
    }, 5000);
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
      `${weatherApiUrl}/forecast?lat=${parseFloat(lat)}&lon=${parseFloat(lon)}&appid=${weatherApiKey}&units=metric`
    );
    console.log("***FETCH***");

    forecastFetch
      .then(async (response: any) => {
        const forecastResponse = await response.json();

        gsap.fromTo(".button-blocks-container", { x: "0%" }, { duration: 1.5, x: "-400%" });
        gsap.fromTo(".blocks-container", { x: "0%" }, { duration: 1.5, x: "400%" });

        // delay the update for the animation to take place
        setTimeout(() => {
          setLocation({
            city: forecastResponse.city.name,
            country: forecastResponse.city.country,
            coord: forecastResponse.city.coord,
          });
          let daysForecast: Array<Array<Object>> = [[]];
          let day: number = 0;
          daysForecast[day].push(forecastResponse.list[0]);
          for (let i = 1; i <= 39; i++) {
            if (forecastResponse.list[i - 1].dt_txt.split(" ")[1] > forecastResponse.list[i].dt_txt.split(" ")[1]) {
              day++;
              daysForecast[day] = [];
            }
            daysForecast[day].push(forecastResponse.list[i]);
          }
          ChangeColors();

          setForecast(daysForecast);
        }, 250);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // dummy data for testing purposes

  // function fetchData(lat, lon) {
  //   const forecastResponse = dummy;
  //   console.log(forecastResponse);

  //   setLocation({
  //     city: forecastResponse.city.name,
  //     country: forecastResponse.city.country,
  //     coord: forecastResponse.city.coord,
  //   });
  //   let daysForecast: Array<Array<Object>> = [[]];
  //   let day: number = 0;
  //   daysForecast[day].push(forecastResponse.list[0]);
  //   for (let i = 1; i <= 39; i++) {
  //     if (forecastResponse.list[i - 1].dt_txt.split(" ")[1] > forecastResponse.list[i].dt_txt.split(" ")[1]) {
  //       day++;
  //       daysForecast[day] = [];
  //     }
  //     daysForecast[day].push(forecastResponse.list[i]);
  //   }

  //   setForecast(daysForecast);
  // }

  function handleOnDayChange(day) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setDay(day);
      setHour(null);
    }, 300);
    setSelectedDay(day);
  }

  function handleDegreeChange(degree) {
    setDegree(degree);
  }

  function handleSetFavorite() {
    const newFavorites = [...favorites];
    if (!newFavorites.some((item) => item.city === location.city)) {
      newFavorites.unshift(location);
      if (newFavorites.length > 3) {
        newFavorites.pop();
      }
      setFavorites(newFavorites);
    } else {
      newFavorites.splice(
        newFavorites.findIndex((item) => item.city === location.city),
        1
      );
      setFavorites(newFavorites);
    }
  }
  function handleLocationChange(value) {
    if (location.city !== value.city) {
      fetchData(value.coord.lat, value.coord.lon);
    }
  }

  return (
    <div className="mainContainer">
      <Search onSearchChange={handleOnSearchChange} />
      <Favorites data={favorites} onLocationChange={handleLocationChange} currentLocation={location} />
      {forecast && (
        <Forecast
          forecastData={forecast}
          day={day}
          hour={hour}
          handleOnHourChange={handleOnHourChange}
          location={location}
          handleDegreeChange={handleDegreeChange}
          degree={degree}
          handleSetFavorite={handleSetFavorite}
          favorites={favorites}
        />
      )}
      {forecast && (
        <div className="buttonsContainer">
          <Button data={forecast} selectedDay={selectedDay} onDayChange={handleOnDayChange} day={0} />
          <Button data={forecast} selectedDay={selectedDay} onDayChange={handleOnDayChange} day={1} />
          <Button data={forecast} selectedDay={selectedDay} onDayChange={handleOnDayChange} day={2} />
          <Button data={forecast} selectedDay={selectedDay} onDayChange={handleOnDayChange} day={3} />
          <Button data={forecast} selectedDay={selectedDay} onDayChange={handleOnDayChange} day={4} />
        </div>
      )}
      <div className="main-blocks-container">
        <div className="block"></div>
        <div className="block"></div>
        <div className="block"></div>
      </div>
      <p className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs text-contrast2">© 2023 Ocneanu Vlad</p>
    </div>
  );
}

export default App;
