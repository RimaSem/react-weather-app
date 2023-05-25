import React, { CSSProperties, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchBar from "./components/SearchBar";
import WeatherContainer from "./components/WeatherContainer";
import axios from "axios";
import { FadeLoader } from "react-spinners";

const App: React.FC = () => {
  const [city, setCity] = useState<string>("klaipeda");
  const API_KEY = import.meta.env.VITE_API_KEY;

  const { data: cityData, isLoading } = useQuery({
    queryKey: ["cityData", city],
    queryFn: () =>
      axios
        .get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`
        )
        .then((res) => res.data),
  });

  const override: CSSProperties = {
    margin: "200px auto 0",
  };

  if (isLoading) {
    return (
      <FadeLoader
        cssOverride={override}
        color={"white"}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }

  return (
    <div className="App">
      <SearchBar setCity={setCity} />
      {cityData?.length === 0 && (
        <div className="error-message-city">City not found</div>
      )}
      {cityData && (
        <WeatherContainer
          latitude={cityData[0]?.lat}
          longitude={cityData[0]?.lon}
          cityName={cityData[0]?.name}
          countryName={cityData[0]?.country}
          apiKey={API_KEY}
        />
      )}
    </div>
  );
};

export default App;
