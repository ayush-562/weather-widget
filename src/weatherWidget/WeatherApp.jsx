import { useState } from "react";
import SearchBox from "./SearchBox";
import WeatherInfo from "./WeatherInfo";
import "./WeatherApp.css";

export default function WeatherApp() {
    const [weatherInfo, setWeatherInfo] = useState({
        city: "Delhi",
        country: "IN",
        windSpeed: 2.68,
        visibility: 4.0,
        pressure: 1012,
        feelsLike: 24.48,
        temp: 25.05,
        tempMin: 25.05,
        tempMax: 25.05,
        humidity: 47,
        weather: "haze",
        weatherMain: "atmosphere",
    });

    let updateInfo = (result) => {
        setWeatherInfo(result);
    };

    return (
        <div style={{ textAlign: "center" }}>
            <div className="text-center mb-8 pt-8">
                <h1 className="text-5xl sm:text-4xl font-bold text-white mb-4 tracking-tight">Weather Gallery</h1>
                <p className="text-xl text-indigo-200 mt-4 font-light">Discover weather through stunning visuals</p>
            </div>
            <SearchBox updateInfo={updateInfo} />
            <WeatherInfo info={weatherInfo} />
        </div>
    );
}