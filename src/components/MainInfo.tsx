import { convertToF } from "../utils";

interface MainInfoProps {
  weatherData: {
    list: {
      main: { temp: number };
      weather: { main: string; icon: string }[];
    }[];
  };
  cityData: { name: string; country: string }[];
  isF: boolean;
  setIsF: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainInfo: React.FC<MainInfoProps> = ({
  cityData,
  weatherData,
  isF,
  setIsF,
}) => (
  <>
    <div className="temp-type-btn" onClick={() => setIsF((prev) => !prev)}>
      <span>{isF ? "C" : "F"}</span>
    </div>
    <div className="location">
      {`${cityData[0].name}, ${cityData[0].country}`}
    </div>
    <div className="temp-data-row">
      <span className="weather-icon">
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@4x.png`}
        />
      </span>
      <span className="temperature">
        {!isF
          ? Math.round(+weatherData.list[0].main.temp)
          : Math.round(convertToF(+weatherData.list[0].main.temp))}
      </span>
      <span className="degree">º</span>
      <span className="temperature-type">{isF ? "F" : "C"}</span>
    </div>
    <span className="weather-description">
      {weatherData.list[0].weather[0].main}
    </span>
  </>
);

export default MainInfo;
