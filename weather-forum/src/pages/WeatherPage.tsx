import { useWeather } from '../contexts/WeatherContext';

export default function WeatherPage() {
  const { weather } = useWeather();

  if (!weather) {
    return (
      <div className="weather-details-card">
        <h2>Подробный прогноз</h2>
        <p>Введите город</p>
      </div>
    );
  }

  return (
    <div className="weather-details-card">
      <h2>Подробный прогноз</h2>
      <div className="weather-info">
        <div>
          <h3>{weather.city}, {weather.country}</h3>
          <p>Температура: {weather.temp}°C</p>
          <p>Состояние: {weather.description}</p>
          <p>Влажность: {weather.humidity}%</p>
          <p>Ветер: {weather.windSpeed} м/с</p>
          <p>Давление: {weather.pressure} гПа</p>
        </div>
      </div>
    </div>
  );
}