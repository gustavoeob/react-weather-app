import "./styles/scss/main.scss";
import Search from "./components/search/search";
import CurrentWeather from "./components/weather/current-weather";
import Forecast from "./components/weather/forecast";
import Background from "./components/elements/background";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import { useState } from "react";
// import Loader from "./components/elements/loader";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [background, setBackground] = useState(null);

  const handleOnSearchChange = (searchData) => {
    /* Destructuring the searchData.value.split(" ") into lat and lon. */
    const [lat, lon] = searchData.value.split(" ");

    /* Fetching the data from the API. */
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    /* A promise that is waiting for both the currentWeatherFetch and forecastFetch to be completed. */
    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        /* Waiting for the response to be completed. */
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        /* Setting the currentWeather and forecast state. */
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
        setBackground(weatherResponse);
      })
      .catch((err) => console.log(err));
  };
  return (
    <main className="app">
      {background ? (
        <Background data={background} />
      ) : (
        <>
        <h1 className="app-name">Beforecast</h1>
        <h2 className="app-text-cover">Current weather & next days forecast</h2>
        
        </>
      )}
          <Search onSearchChange={handleOnSearchChange} />
      {
        <div className="main-content-box">
          {currentWeather && <CurrentWeather data={currentWeather} />}
          {forecast && <Forecast data={forecast} curr={currentWeather} />}
        </div>
      }
    </main>
  );
}

export default App;
