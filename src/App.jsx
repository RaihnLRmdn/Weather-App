import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);

  const API_KEY = "9180d134f2cd04656608cd8c9fb55fe3";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;

  const searchLocation = async (event) => {
    if (event.key === "Enter") {
      try {
        const response = await axios.get(url);
        setData(response.data);
        setError(null);
      } catch (error) {
        setError("Gagal mencari lokasi");
      }
      setLocation("");
    }
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={handleLocationChange}
          onKeyPress={searchLocation}
          placeholder="Masukkan Lokasi"
          type="text"
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <div className="container">
        {data.name && (
          <div className="top">
            <div className="location">
              <h2>{data.name}</h2>
            </div>
            <div className="temp">
              <h1>{data.main.temp.toFixed()}°C</h1>
            </div>
            <div className="description">
              <p>{data.weather[0].main}</p>
            </div>
          </div>
        )}
        {data.name && (
          <div className="bottom">
            <div className="feels">
              <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              <p>Suhu Terasa</p>
            </div>
            <div className="humidity">
              <p className="bold">{data.main.humidity}%</p>
              <p>Kelembaban</p>
            </div>
            <div className="wind">
              <p className="bold">{data.wind.speed.toFixed()} m/s</p>
              <p>Kecepatan Angin</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
