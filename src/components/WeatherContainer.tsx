import { useState } from "react";
import MainInfo from "./MainInfo";
import InfoItem from "./InfoItem";
import { convertToF } from "../utils";
import feelsLikeIcon from "../img/temperature.svg";
import precipitationIcon from "../img/rainy.svg";
import humidityIcon from "../img/humidity.svg";
import windIcon from "../img/windy.svg";
import { WeatherProps } from "../App";

export interface WeatherContainerProps {
  weatherData: WeatherProps;
  cityData: [];
}

const WeatherContainer: React.FC<WeatherContainerProps> = ({
  weatherData,
  cityData,
}) => {
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
            img={feelsLikeIcon}
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
            img={humidityIcon}
            label={"Humidity"}
            itemData={`${weatherData.list[0].main.humidity}%`}
          />
        </div>
        <div className="column-2">
          <InfoItem
            addClass={"precipitation"}
            img={precipitationIcon}
            label={"Precipitation"}
            itemData={`${+weatherData.list[0].pop * 100}%`}
          />
          <InfoItem
            addClass={"wind"}
            img={windIcon}
            label={"Wind Speed"}
            itemData={`${Math.round(weatherData.list[0].wind.speed)} m/s`}
          />
        </div>
      </div>
    </div>
  );
};

export default WeatherContainer;
