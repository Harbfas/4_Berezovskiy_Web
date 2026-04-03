import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { WeatherData } from '../types';

const WEATHER_API_KEY = '1fb73c77f2a4575deca4228e58634be5';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

interface WeatherContextType {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
  fetchWeather: (city: string) => Promise<void>;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${WEATHER_API_URL}?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric&lang=ru`
      );
      if (!res.ok) throw new Error('Город не найден');
      const data = await res.json();
      setWeather({
        temp: Math.round(data.main.temp),
        description: data.weather[0].description,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed),
        pressure: data.main.pressure
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WeatherContext.Provider value={{ weather, loading, error, fetchWeather }}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);
  if (!context) throw new Error('useWeather must be used within WeatherProvider');
  return context;
}