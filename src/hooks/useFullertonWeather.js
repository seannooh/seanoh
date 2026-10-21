import { useEffect, useState } from "react";

// Current temperature in Fullerton from Open-Meteo (free, no API key).
// Returns null until it loads, or if the request fails.
const WEATHER_URL =
    "https://api.open-meteo.com/v1/forecast" +
    "?latitude=33.87&longitude=-117.92&current=temperature_2m&temperature_unit=fahrenheit";

export default function useFullertonWeather() {
    const [temperature, setTemperature] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        fetch(WEATHER_URL, { signal: controller.signal })
            .then((response) => (response.ok ? response.json() : Promise.reject(response.status)))
            .then((data) => {
                const value = data?.current?.temperature_2m;
                if (typeof value === "number") setTemperature(Math.round(value));
            })
            .catch(() => {});

        return () => controller.abort();
    }, []);

    return temperature;
}
