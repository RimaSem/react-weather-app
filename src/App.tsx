import { useState, useEffect, useRef } from "react";
import SearchBar from "./components/SearchBar";
import WeatherContainer from "./components/WeatherContainer";

function App() {
  const [APIkey, setAPIkey] = useState("4a551e9fd5cbd706339b90539e03776c");
  const [city, setCity] = useState("klaipeda");
  const [cityData, setCityData] = useState<[]>([]);
  const [weatherData, setWeatherData] = useState(null);

  const errorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIkey}`,
      { mode: "cors" }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === "400" || data.length < 1) {
          errorRef.current
            ? (errorRef.current.style.display = "block")
            : console.log("something went wrong!");
        } else {
          setCityData(data);
          fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=${APIkey}&units=metric`,
            { mode: "cors" }
          )
            .then((response) => response.json())
            .then((wdata) => {
              setWeatherData(wdata);
            });
        }
      });
  }, [city]);

  return (
    <div className="App">
      <SearchBar setCity={setCity} errorRef={errorRef} />
      <div ref={errorRef} className="error-message">
        City not found
      </div>
      {weatherData && (
        <WeatherContainer cityData={cityData} weatherData={weatherData} />
      )}
    </div>
  );
}

export default App;
