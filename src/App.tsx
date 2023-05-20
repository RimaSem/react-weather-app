import React, { useState, useEffect, useRef } from "react";
import SearchBar from "./components/SearchBar";
import WeatherContainer from "./components/WeatherContainer";
import axios from "axios";

export interface WeatherProps {
  list: {
    main: { temp: number; feels_like: number; humidity: number };
    pop: number;
    wind: { speed: number };
    weather: { main: string; icon: string }[];
  }[];
}

const App: React.FC = () => {
  const [APIkey, setAPIkey] = useState("4a551e9fd5cbd706339b90539e03776c");
  const [city, setCity] = useState("klaipeda");
  const [cityData, setCityData] = useState<[]>([]);
  const [weatherData, setWeatherData] = useState<WeatherProps>();
  const [isError, setIsError] = useState(false);

  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIkey}`
      )
      .then((response) => {
        if (response.data.cod === "400" || response.data.length < 1) {
          errorRef.current && (errorRef.current.style.display = "block");
        } else {
          setCityData(response.data);
          axios
            .get(
              `https://api.openweathermap.org/data/2.5/forecast?lat=${response.data[0].lat}&lon=${response.data[0].lon}&appid=${APIkey}&units=metric`
            )
            .then((response) => {
              if (!response) {
                throw Error("Weather data currently unavailable");
              }
              setWeatherData(response.data);
            })
            .catch((err) => setIsError(true));
        }
      })
      .catch((err) => setIsError(true));
  }, [city]);

  const displayContent = () => {
    if (isError) {
      return (
        <div className="error-message-weather">
          Data is currently unavailable. Please try again later.
        </div>
      );
    }
    return (
      weatherData && (
        <WeatherContainer cityData={cityData} weatherData={weatherData} />
      )
    );
  };

  return (
    <div className="App">
      <SearchBar setCity={setCity} errorRef={errorRef} />
      <div ref={errorRef} className="error-message-city">
        City not found
      </div>
      {displayContent()}
    </div>
  );
};

export default App;
