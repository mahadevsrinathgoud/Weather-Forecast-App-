
import React from 'react';
import './weatherForm.css';

function WeatherForm({ weatherData }) {
  return (
    <div className="weather-card">
      <div className="weather-content">
        <div className="weather-icon-container">
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt="Weather Icon"
            className="weather-icon"
          />
        </div>
        <h2 className="location-title">
          {weatherData.name}, {weatherData.sys.country}
        </h2>
        <div className="weather-info">
          <div className="temperature">
            {Math.round(weatherData.main.temp)}°C
          </div>
          <div className="weather-description">
            {weatherData.weather[0].description}
          </div>
          <div className="weather-details">
            <div className="detail-card">
              <div className="detail-label">Humidity</div>
              <div className="detail-value">{weatherData.main.humidity}%</div>
            </div>
            <div className="detail-card">
              <div className="detail-label">Wind Speed</div>
              <div className="detail-value">{weatherData.wind.speed} m/s</div>
            </div>
            <div className="detail-card">
              <div className="detail-label">Pressure</div>
              <div className="detail-value">{weatherData.main.pressure} hPa</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherForm;