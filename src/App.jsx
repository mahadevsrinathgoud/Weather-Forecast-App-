
import React, { useState } from 'react';
import WeatherForm from './components/weatherForm';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const apiKey = '71f6779186cc32448b4c412eea65b982';
  const units = 'metric';

  const searchWeather = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&APPID=${apiKey}&units=${units}`
      );
      const data = await response.json();
      if (response.ok) {
        console.log('Weather data:', data); // Debug log
        setWeatherData(data);
      } else {
        alert(data.message || 'Error fetching weather data');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      alert('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getBackgroundImage = () => {
    if (!weatherData || !weatherData.weather) return 'default-background';
    
    const weatherId = weatherData.weather[0].id;
    console.log('Weather ID:', weatherId); // Debug log

    if (weatherId === 800) return 'sunny-background';
    if (weatherId >= 801 && weatherId <= 804) return 'cloudy-background';
    if ((weatherId >= 300 && weatherId <= 321) || (weatherId >= 500 && weatherId <= 531)) return 'rainy-background';
    if (weatherId >= 600 && weatherId <= 622) return 'snowy-background';
    if (weatherId >= 200 && weatherId <= 232) return 'stormy-background';
    if (weatherId >= 701 && weatherId <= 781) return 'foggy-background';
    
    return 'default-background';
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchWeather();
    }
  };

  return (
    <div className={`App ${getBackgroundImage()}`}>
      <div className="content-wrapper">
        <h1 className="app-title">Weather Forecast</h1>
        <div className="search-container">
          <input
            className="search-input"
            type="text"
            placeholder="Enter city name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button 
            className="search-button"
            onClick={searchWeather}
            disabled={loading}
          >
            🔍
          </button>
        </div>
        {weatherData && <WeatherForm weatherData={weatherData} />}
      </div>
    </div>
  );
}

export default App;
