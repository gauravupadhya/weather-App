import React, { useState } from "react";
import "./App.css";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city.trim()) {
      alert("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");
    setWeatherData(null);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=dcdaf50617e646bca4d161904242812&q=${city}`
      );
      if (!response.ok) {
        throw new Error("Invalid city name");
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-app">
      <h1>Weather Application</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>
      {loading && <p>Loading data…</p>}
      {weatherData && (
        <div className="weather-cards">
          <div className="weather-card">
            <p><strong>Temperature:</strong> {weatherData.current.temp_c}°C</p>
          </div>
          <div className="weather-card">
            <p><strong>Humidity:</strong> {weatherData.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <p><strong>Condition:</strong> {weatherData.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <p><strong>Wind Speed:</strong> {weatherData.current.wind_kph} kph</p>
          </div>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default WeatherApp;