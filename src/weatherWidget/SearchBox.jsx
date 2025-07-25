import { useState } from 'react';
import PropTypes from 'prop-types';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import CircularProgress from '@mui/material/CircularProgress';
import "./SearchBox.css";

export default function SearchBox({ updateInfo }) {
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    // Put REACT_APP_OWM_KEY=xxxx in .env
    const API_KEY = import.meta.env.VITE_OWM_KEY;

    const popularCities = ["New York", "London", "Tokyo", "Delhi", "Sydney"];

    let getWeatherInfo = async (city) => {
        try {
            let response = await fetch(`${API_URL}?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`);
            // Check if the response is ok (status in the range 200-299)
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            let jsonResponse = await response.json();
            let result = {
                city: city,
                country: jsonResponse.sys.country,
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelsLike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description,
                weatherMain: jsonResponse.weather[0].main.toLowerCase(),
                windSpeed: jsonResponse.wind.speed,
                visibility: jsonResponse.visibility / 1000, // Convert to km
                pressure: jsonResponse.main.pressure,
            };
            console.log(result);
            return result;
        } catch (err) {
            throw err;
        }
    };

    let handleChange = (e) => {
        setCity(e.target.value);
    };

    let handleSubmit = async (e) => {
        e.preventDefault();
        const trimmedCity = city.trim();
        if (!trimmedCity) return;

        try {
            setLoading(true);
            setError(false);

            console.log(trimmedCity);
            let newInfo = await getWeatherInfo(trimmedCity);
            updateInfo(newInfo);
            setCity("");
        } catch (err) {
            console.error(err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const handleCityClick = (cityName) => {
        setCity(cityName);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };


    return (
        <div className='SearchBox'>

            <div className="search-container">
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            name='city'
                            className="search-input"
                            placeholder="Search for any city"
                            value={city}
                            onChange={handleChange}
                            required
                        />
                        <button className="search-button" type="submit" disabled={loading}>
                            {loading ? <CircularProgress size={24} style={{ color: 'white' }} /> : <SearchSharpIcon />}
                        </button>
                    </div>

                    <div className="city-suggestions">
                        {popularCities.map((cityName) => (
                            <button
                                key={cityName}
                                className="city-button"
                                onClick={() => handleCityClick(cityName)}
                            >
                                {cityName}
                            </button>
                        ))}
                    </div>
                </form>

            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}


SearchBox.propTypes = {
    updateInfo: PropTypes.func.isRequired
};