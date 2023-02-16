import React from "react";

function WeatherContainer() {
  return (
    <div className="weather-container">
      <div className="temp-type-btn">
        <span>F</span>
      </div>
      <div className="location"></div>
      <div className="temp-data-row">
        <span className="weather-icon">
          <img src="https://openweathermap.org/img/wn/09d@4x.png" />
        </span>
        <span className="temperature"></span>
        <span className="degree">º</span>
        <span className="temperature-type">C</span>
      </div>
      <span className="weather-description"></span>

      <div className="weather-details-container">
        <div className="column-1"></div>
        <div className="column-2"></div>
      </div>
    </div>
  );
}

export default WeatherContainer;
