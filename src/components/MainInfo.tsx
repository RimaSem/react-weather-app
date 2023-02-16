import React from "react";

type MainInfoProps = {
  weatherData: {
    list: {
      main: { temp: number };
      weather: { main: string; icon: string }[];
    }[];
  };
  cityData: { name: string; country: string }[];
};

function MainInfo({ cityData, weatherData }: MainInfoProps) {
  return (
    <>
      <div className="temp-type-btn">
        <span>F</span>
      </div>
      <div className="location">
        {cityData && `${cityData[0].name}, ${cityData[0].country}`}
      </div>
      <div className="temp-data-row">
        <span className="weather-icon">
          <img
            src={
              weatherData &&
              `https://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@4x.png`
            }
          />
        </span>
        <span className="temperature">
          {weatherData && Math.round(+weatherData.list[0].main.temp)}
        </span>
        <span className="degree">º</span>
        <span className="temperature-type">C</span>
      </div>
      <span className="weather-description">
        {weatherData && weatherData.list[0].weather[0].main}
      </span>
    </>
  );
}

export default MainInfo;
