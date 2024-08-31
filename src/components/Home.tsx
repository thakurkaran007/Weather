import  { useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, TextField, Button, Skeleton } from "@mui/material";
import '../Home.css'; 
interface x {
    name: string,
    main: any,
    weather: any,
    wind: any
}

export default function WeatherCard() {
    const [weatherData, setWeatherData] = useState<x|null>(null);
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getWeather = () => {
        if (city.trim() === '') {
            return;
        }
        setError(null);
        setLoading(true);
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=966c561ba960031bf7c6df9bf96b347d&units=metric`)
            .then((res) => {
                setWeatherData(res.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                setWeatherData(null);
            });
    };

    return (
        <div className="weather-card-container">
            <TextField 
                label="City Name" 
                variant="outlined" 
                value={city} 
                onChange={(e) => setCity(e.target.value)} 
                fullWidth 
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={getWeather}>
                Get Weather
            </Button>

            {error && <Typography color="error">{error}</Typography>}

            {loading ? (
                <Card className="weather-card">
                    <Skeleton variant="rectangular" width="100%" height={300} />
                    <CardContent>
                        <Skeleton width="60%" />
                        <Skeleton width="40%" />
                        <Skeleton width="80%" />
                    </CardContent>
                </Card>
            ) : (
                weatherData && (
                    <Card className="weather-card">
                        <div className="video-container">
                            <video autoPlay loop muted className="background-video">
                                <source src={weatherData.main.temp > 20 ? "https://videos.pexels.com/video-files/2715412/2715412-uhd_2560_1440_30fps.mp4": weatherData.main.humidity>18? "https://videos.pexels.com/video-files/2657691/2657691-hd_1920_1080_30fps.mp4":"https://videos.pexels.com/video-files/3476248/3476248-uhd_2560_1440_30fps.mp44"} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <CardContent className="weather-info">
                            <Typography variant="h5" component="div">
                                Weather in {weatherData.name}
                            </Typography>
                            <Typography variant="body2">
                                Temperature: {weatherData.main.temp}°C
                            </Typography>
                            <Typography variant="body2">
                                Weather: {weatherData.weather[0].description}
                            </Typography>
                            <Typography variant="body2">
                                Humidity: {weatherData.main.humidity}%
                            </Typography>
                            <Typography variant="body2">
                                Wind Speed: {weatherData.wind.speed} m/s
                            </Typography>
                        </CardContent>
                    </Card>
                )
            )}
        </div>
    );
}


