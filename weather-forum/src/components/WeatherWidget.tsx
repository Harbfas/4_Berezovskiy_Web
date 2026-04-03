import { useState, useEffect } from 'react';
import { useWeather } from '../contexts/WeatherContext';

export default function WeatherWidget() {
  const { weather, loading, error, fetchWeather } = useWeather();
  const [city, setCity] = useState('Moscow');

  useEffect(() => {
    fetchWeather('Moscow');
  }, []);

  const handleSubmit = () => {
    if (city.trim()) {
      fetchWeather(city);
    }
  };

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2>Погода сегодня</h2>
        <div className="weather-controls">
          <input 
            type="text" 
            value={city} 
            onChange={(e) => setCity(e.target.value)} 
            placeholder="Введите город" 
          />
          <button className="btn btn-primary" onClick={handleSubmit}>Узнать погоду</button>
        </div>
      </div>
      <div className="weather-content">
        {loading && <p>Загрузка погоды...</p>}
        {error && <p style={{ color: '#ef4444' }}>Ошибка: {error}</p>}
        {weather && !loading && !error && (
          <div className="weather-info">
            <div className="weather-main">
              <div className="weather-temp">{weather.temp}°C</div>
              <div>{weather.description}</div>
              <div>{weather.city}, {weather.country}</div>
            </div>
            <div className="weather-details">
              <div>Влажность: {weather.humidity}%</div>
              <div>Ветер: {weather.windSpeed} м/с</div>
              <div>Давление: {weather.pressure} гПа</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
