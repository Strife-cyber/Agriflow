import axios from "axios";
import { useEffect, useState } from "react";
import { Weather } from "@/utils/weather-functions";
import { encryptData, decryptData } from "@/utils/crypt-hard";

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
if (!OPENWEATHER_API_KEY) {
    throw new Error("Missing OpenWeatherMap API key.");
}

const useWeather = () => {
    const [weather, setWeather] = useState<Weather | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchWeather = async (latitude: number, longitude: number) => {
        try {
            const response = await axios.get<Weather>(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHER_API_KEY}&units=metric`
            );

            setWeather(response.data);
            localStorage.setItem("weatherData", encryptData(response.data));
            localStorage.setItem("lastFetched", Date.now().toString());
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || "Failed to fetch weather data");
            } else {
                setError("An unexpected error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    const getWeatherData = () => {
        const lastFetched = localStorage.getItem("lastFetched");
        const encryptedWeatherData = localStorage.getItem("weatherData");

        if (lastFetched && encryptedWeatherData && Date.now() - parseInt(lastFetched) < 6 * 60 * 60 * 1000) {
            const decryptedWeather = decryptData(encryptedWeatherData);
            if (decryptedWeather) {
                setWeather(decryptedWeather as Weather);
            }
            setLoading(false);
        } else {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => fetchWeather(position.coords.latitude, position.coords.longitude),
                    () => {
                        setError("Geolocation permission denied");
                        setLoading(false);
                    }
                );
            } else {
                setError("Geolocation is not supported");
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        getWeatherData();
    }, []);

    return { weather, loading, error };
};

export default useWeather;
