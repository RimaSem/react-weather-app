import { convertToF } from "../utils";

interface MainInfoProps {
  cityName?: string;
  countryName?: string;
  isF: boolean;
  setIsF: React.Dispatch<React.SetStateAction<boolean>>;
  weatherData: {
    list: {
      main: { temp: number };
      weather: { main: string; icon: string }[];
    }[];
  };
}

const MainInfo: React.FC<MainInfoProps> = ({
  cityName,
  countryName,
  isF,
  setIsF,
  weatherData,
}) => {
  const displayTemperature = () => {
    if (typeof weatherData?.list[0].main.temp === "number") {
      return weatherData?.list[0].main.temp;
    } else {
      return 0;
    }
  };

  const displayLocation = () => {
    if (cityName) {
      return `${cityName}, ${countryName}`;
    } else {
      return "Ooops.. maybe try again?";
    }
  };

  return (
    <>
      <div className="temp-type-btn" onClick={() => setIsF((prev) => !prev)}>
        <span>{isF ? "C" : "F"}</span>
      </div>
      <div className="location">{displayLocation()}</div>
      <div className="temp-data-row">
        <span className="weather-icon">
          <img
            src={`https://openweathermap.org/img/wn/${weatherData?.list[0].weather[0].icon}@4x.png`}
            alt="weather icon"
          />
        </span>
        <span className="temperature">
          {!isF
            ? Math.round(displayTemperature())
            : Math.round(convertToF(displayTemperature()))}
        </span>

        <span className="degree">º</span>
        <span className="temperature-type">{isF ? "F" : "C"}</span>
      </div>
      <span className="weather-description">
        {weatherData?.list[0].weather[0].main}
      </span>
    </>
  );
};

export default MainInfo;
