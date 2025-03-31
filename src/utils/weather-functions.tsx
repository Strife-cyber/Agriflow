  import { 
    CloudLightning, CloudDrizzle, 
    CloudRain, CloudSnow, CloudFog, Cloud 
} from "lucide-react"

export interface Weather {
    coord: {
        lon: number
        lat: number
    }
    weather: {
        id: number
        main: string
        description: string
        icon: string
    }[]
    base: string
    main: {
        temp: number
        feels_like: number
        temp_min: number
        temp_max: number
        pressure: number
        humidity: number
        sea_level?: number
        grnd_level?: number
    }
    visibility: number
    wind: {
        speed: number
        deg: number
    }
    clouds: {
        all: number
    }
    dt: number
    sys: {
        type: number
        id: number
        country: string
        sunrise: number
        sunset: number
    }
    timezone: number
    id: number
    name: string
    cod: number
}

// Format time with timezone offset
export const formatTime = (timestamp: number, weather: Weather) => {
    const date = new Date((timestamp + weather.timezone) * 1000)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

// Get weather icon based on weather code
export const getWeatherIcon = (iconCode: string, weatherId: number) => {
    // First digit of weather ID determines the category
    const category = Math.floor(weatherId / 100)

    switch (category) {
    case 2: // Thunderstorm
        return <CloudLightning className="h-10 w-10 text-purple-400" />
    case 3: // Drizzle
        return <CloudDrizzle className="h-10 w-10 text-blue-400" />
    case 5: // Rain
        return <CloudRain className="h-10 w-10 text-blue-500" />
    case 6: // Snow
        return <CloudSnow className="h-10 w-10 text-blue-200" />
    case 7: // Atmosphere (fog, mist, etc.)
        return <CloudFog className="h-10 w-10 text-gray-400" />
    case 8: // Clouds or clear
        if (weatherId === 800) {
        return iconCode.includes("n") ? (
            <svg className="h-10 w-10 text-gray-200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12 3C10.9 3 9.9 3.9 9.9 5C9.9 6.1 10.9 7 12 7C13.1 7 14.1 6.1 14.1 5C14.1 3.9 13.1 3 12 3ZM12 15C10.9 15 9.9 15.9 9.9 17C9.9 18.1 10.9 19 12 19C13.1 19 14.1 18.1 14.1 17C14.1 15.9 13.1 15 12 15ZM12 11C13.1 11 14.1 10.1 14.1 9C14.1 7.9 13.1 7 12 7C10.9 7 9.9 7.9 9.9 9C9.9 10.1 10.9 11 12 11ZM16 7.1C17.1 7.1 18 6.1 18 5.1C18 4 17.1 3.1 16 3.1C14.9 3.1 14 4 14 5.1C14 6.1 14.9 7.1 16 7.1ZM16 15C14.9 15 14 15.9 14 17C14 18.1 14.9 19 16 19C17.1 19 18 18.1 18 17C18 15.9 17.1 15 16 15ZM16 11C17.1 11 18 10.1 18 9C18 7.9 17.1 7 16 7C14.9 7 14 7.9 14 9C14 10.1 14.9 11 16 11ZM8 7.1C9.1 7.1 10 6.1 10 5.1C10 4 9.1 3.1 8 3.1C6.9 3.1 6 4 6 5.1C6 6.1 6.9 7.1 8 7.1ZM8 15C6.9 15 6 15.9 6 17C6 18.1 6.9 19 8 19C9.1 19 10 18.1 10 17C10 15.9 9.1 15 8 15ZM8 11C9.1 11 10 10.1 10 9C10 7.9 9.1 7 8 7C6.9 7 6 7.9 6 9C6 10.1 6.9 11 8 11Z"
                fill="currentColor"
            />
            </svg>
        ) : (
            <svg
            className="h-10 w-10 text-yellow-400"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path
                d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z"
                fill="currentColor"
            />
            <path
                d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            </svg>
        )
        } else {
        return <Cloud className="h-10 w-10 text-blue-400" />
        }
    default:
        return <Cloud className="h-10 w-10 text-blue-400" />
    }
}

// Get weather background gradient based on time and weather
export const getWeatherBackground = (weather: Weather) => {
    const icon = weather.weather[0].icon
    const isNight = icon.includes("n")
    const weatherId = weather.weather[0].id

    if (isNight) {
    return "bg-gradient-to-br from-gray-900 to-blue-900"
    } else {
    if (weatherId >= 200 && weatherId < 300) {
        // Thunderstorm
        return "bg-gradient-to-br from-gray-800 to-purple-900"
    } else if (weatherId >= 300 && weatherId < 600) {
        // Drizzle and Rain
        return "bg-gradient-to-br from-gray-800 to-blue-800"
    } else if (weatherId >= 600 && weatherId < 700) {
        // Snow
        return "bg-gradient-to-br from-gray-800 to-blue-700"
    } else if (weatherId >= 700 && weatherId < 800) {
        // Atmosphere
        return "bg-gradient-to-br from-gray-800 to-gray-700"
    } else if (weatherId === 800) {
        // Clear
        return "bg-gradient-to-br from-blue-900 to-blue-700"
    } else {
        // Clouds
        return "bg-gradient-to-br from-gray-800 to-blue-800"
    }
    }
}

// Calculate time until sunset or sunrise
export const getTimeUntil = (weather: Weather) => {
    const now = Math.floor(Date.now() / 1000)
    const localTime = now + weather.timezone

    if (localTime > weather.sys.sunrise && localTime < weather.sys.sunset) {
    // It's daytime, calculate time until sunset
    const timeUntilSunset = weather.sys.sunset - localTime
    const hours = Math.floor(timeUntilSunset / 3600)
    const minutes = Math.floor((timeUntilSunset % 3600) / 60)
    return `Sunset in ${hours}h ${minutes}m`
    } else {
    // It's nighttime, calculate time until sunrise
    let timeUntilSunrise
    if (localTime < weather.sys.sunrise) {
        timeUntilSunrise = weather.sys.sunrise - localTime
    } else {
        // Next day's sunrise (approximation)
        timeUntilSunrise = weather.sys.sunrise + 86400 - localTime
    }
    const hours = Math.floor(timeUntilSunrise / 3600)
    const minutes = Math.floor((timeUntilSunrise % 3600) / 60)
    return `Sunrise in ${hours}h ${minutes}m`
    }
}

// Get wind direction as text
export const getWindDirection = (degrees: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
    const index = Math.round(degrees / 45) % 8
    return directions[index]
}

// Calculate humidity status
export const getHumidityStatus = (humidity: number) => {
    if (humidity < 30) return { label: "Dry", color: "bg-yellow-500" }
    if (humidity < 60) return { label: "Comfortable", color: "bg-green-500" }
    return { label: "Humid", color: "bg-blue-500" }
}