import { CSSProperties, useState } from "react";
import MainInfo from "./MainInfo";
import InfoItem from "./InfoItem";
import { convertToF } from "../utils";
import feelsLikeIcon from "../img/temperature.svg";
import precipitationIcon from "../img/rainy.svg";
import humidityIcon from "../img/humidity.svg";
import windIcon from "../img/windy.svg";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { FadeLoader } from "react-spinners";

export interface WeatherProps {
  latitude: string;
  longitude: string;
  cityName: string;
  countryName: string;
  apiKey: string;
}

const WeatherContainer: React.FC<WeatherProps> = ({
  latitude,
  longitude,
  cityName,
  countryName,
  apiKey,
}) => {
  const [isF, setIsF] = useState(false);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["weatherData"],
    queryFn: () =>
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
        )
        .then((res) => res.data),
  });

  const override: CSSProperties = {
    margin: "100px 0 0 0",
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

  if (isError && Number((error as AxiosError)?.response?.status) >= 500) {
    return (
      <div className="fetch-error-message">
        Server currently down: {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="weather-container">
      <MainInfo
        cityName={cityName}
        countryName={countryName}
        isF={isF}
        setIsF={setIsF}
        weatherData={data}
      />
      <div className="weather-details-container">
        <div className="column-1">
          <InfoItem
            addClass={"feels-like"}
            img={feelsLikeIcon}
            label={"Feels Like"}
            itemData={
              !isF
                ? Math.round(Number(data?.list[0].main.feels_like))
                : Math.round(convertToF(Number(data?.list[0].main.feels_like)))
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
            itemData={`${data?.list[0].main.humidity}%`}
          />
        </div>
        <div className="column-2">
          <InfoItem
            addClass={"precipitation"}
            img={precipitationIcon}
            label={"Precipitation"}
            itemData={`${Math.round(Number(data?.list[0].pop * 100))}%`}
          />
          <InfoItem
            addClass={"wind"}
            img={windIcon}
            label={"Wind Speed"}
            itemData={`${Math.round(data?.list[0].wind.speed)} m/s`}
          />
        </div>
      </div>
    </div>
  );
};

export default WeatherContainer;
