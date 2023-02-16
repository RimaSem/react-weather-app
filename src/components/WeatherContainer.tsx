import React from "react";
import MainInfo from "./MainInfo";
import InfoItem from "./InfoItem";

type WeatherContainerProps = {
  weatherData: {
    list: {
      main: { temp: number; feels_like: number; humidity: number };
      pop: number;
      wind: { speed: number };
      weather: { main: string; icon: string }[];
    }[];
  };
  cityData: [];
};

function WeatherContainer({ weatherData, cityData }: WeatherContainerProps) {
  return (
    <div className="weather-container">
      <MainInfo cityData={cityData} weatherData={weatherData} />
      <div className="weather-details-container">
        <div className="column-1">
          <InfoItem
            addClass={"feels-like"}
            img={"./img/temperature.svg"}
            label={"Feels Like"}
            itemData={
              weatherData && Math.round(+weatherData.list[0].main.feels_like)
            }
          >
            <>
              <span className="temp"></span>°<span className="type">C</span>
            </>
          </InfoItem>
          <InfoItem
            addClass={"humidity"}
            img={"./img/humidity.svg"}
            label={"Humidity"}
            itemData={weatherData && `${weatherData.list[0].main.humidity}%`}
          />
        </div>
        <div className="column-2">
          <InfoItem
            addClass={"precipitation"}
            img={"./img/rainy.svg"}
            label={"Precipitation"}
            itemData={weatherData && `${+weatherData.list[0].pop * 100}%`}
          />
          <InfoItem
            addClass={"wind"}
            img={"./img/windy.svg"}
            label={"Wind Speed"}
            itemData={
              weatherData && `${Math.round(weatherData.list[0].wind.speed)} m/s`
            }
          />
        </div>
      </div>
    </div>
  );
}

export default WeatherContainer;
