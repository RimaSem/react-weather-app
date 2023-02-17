import { useState } from "react";
import MainInfo from "./MainInfo";
import InfoItem from "./InfoItem";
import { convertToF } from "../utils";

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
  const [isF, setIsF] = useState(false);

  return (
    <div className="weather-container">
      <MainInfo
        cityData={cityData}
        weatherData={weatherData}
        isF={isF}
        setIsF={setIsF}
      />
      <div className="weather-details-container">
        <div className="column-1">
          <InfoItem
            addClass={"feels-like"}
            img={"./img/temperature.svg"}
            label={"Feels Like"}
            itemData={
              !isF
                ? Math.round(+weatherData.list[0].main.feels_like)
                : Math.round(convertToF(+weatherData.list[0].main.feels_like))
            }
          >
            <>
              <span className="temp"></span>°
              <span className="type">{isF ? "F" : "C"}</span>
            </>
          </InfoItem>
          <InfoItem
            addClass={"humidity"}
            img={"./img/humidity.svg"}
            label={"Humidity"}
            itemData={`${weatherData.list[0].main.humidity}%`}
          />
        </div>
        <div className="column-2">
          <InfoItem
            addClass={"precipitation"}
            img={"./img/rainy.svg"}
            label={"Precipitation"}
            itemData={`${+weatherData.list[0].pop * 100}%`}
          />
          <InfoItem
            addClass={"wind"}
            img={"./img/windy.svg"}
            label={"Wind Speed"}
            itemData={`${Math.round(weatherData.list[0].wind.speed)} m/s`}
          />
        </div>
      </div>
    </div>
  );
}

export default WeatherContainer;
