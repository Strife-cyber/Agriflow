import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import useWeather from "@/hooks/weather-hook";
import { useAnimation, aos } from "@/context/aos";
import { Progress } from "@/components/ui/progress";
import { useTranslation } from "@/context/translation";
import {
  Cloud, Droplets, Eye,
  Gauge, Sunrise, Sunset, Wind,
} from "lucide-react";
import { 
    Card, CardContent, CardDescription, 
    CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { 
    formatTime, getHumidityStatus, getTimeUntil, 
    getWeatherBackground, getWeatherIcon, getWindDirection 
} from "@/utils/weather-functions";

interface WeatherCardProps {
  className?: string;
}

export function WeatherCard({ className }: WeatherCardProps) {
  const { weather, error } = useWeather();
  const t = useTranslation(); // ✅ Get translation function
  useAnimation();

  // Handle error/no data
  if (error || !weather) {
    return (
      <div 
        className="min-h-[300px] flex items-center justify-center bg-white rounded-lg shadow-lg"
        data-aos={aos.fadeUp}
      >
        <div className="text-center">
          <Cloud className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800">{t("error")}</h2>
          <p className="text-gray-600 mt-2">
            {error}
          </p>
        </div>
      </div>
    )
  }

  const humidityStatus = getHumidityStatus(weather.main.humidity);

  return (
    <Card 
      className={cn(
        "overflow-hidden bg-white shadow-md border border-gray-300",
        className,
        `${getWeatherBackground(weather)} bg-opacity-10`
      )}
      data-aos={aos.fadeUp}
      style={{
        padding: "0"
      }}
    >
      <CardHeader className="pb-2 pt-4 bg-green-50 border-b border-green-200">
        <div className="flex justify-between items-start">
          <div data-aos={aos.fadeRight}>
            <CardTitle className="text-gray-800 text-2xl flex items-center gap-1">
              {weather.name}
              <Badge variant="outline" className="ml-2 text-xs border-gray-300 text-gray-600">
                {weather.sys.country}
              </Badge>
            </CardTitle>
            <CardDescription className="text-gray-600 mt-1">
              {new Date((weather.dt + weather.timezone) * 1000).toLocaleDateString([], {
                weekday: "long",
                month: "short",
                day: "numeric",
              })}
            </CardDescription>
          </div>
          <div className="flex flex-col items-end" data-aos={aos.fadeLeft}>
            <span className="text-3xl font-bold text-green-700">{Math.round(weather.main.temp)}°C</span>
            <span className="text-sm text-gray-500">{t("feelsLike")} {Math.round(weather.main.feels_like)}°C</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="flex items-center justify-between mb-6" data-aos={aos.zoomIn} data-aos-delay="100">
          <div className="flex items-center">
            {getWeatherIcon(weather.weather[0].icon, weather.weather[0].id)}
            <div className="ml-4">
              <p className="text-lg font-medium text-gray-800 capitalize">{weather.weather[0].description}</p>
              <p className="text-sm text-gray-500">{getTimeUntil(weather)}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div 
            className="bg-green-100 rounded-lg p-3"
            data-aos={aos.fadeRight}
            data-aos-delay="200"
          >
            <div className="flex items-center mb-2">
              <Droplets className="h-4 w-4 text-blue-500 mr-2" />
              <span className="text-sm text-gray-600">{t("humidity")}</span>
            </div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-lg font-medium text-gray-800">{weather.main.humidity}%</span>
              <Badge className={cn(humidityStatus.color, "text-white")}>{humidityStatus.label}</Badge>
            </div>
            <Progress value={weather.main.humidity} className="h-1 bg-gray-300" />
          </div>

          <div 
            className="bg-green-100 rounded-lg p-3"
            data-aos={aos.fadeLeft}
            data-aos-delay="200"
          >
            <div className="flex items-center mb-2">
              <Wind className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-600">{t("wind")}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium text-gray-800">{weather.wind.speed} m/s</span>
              <span className="text-sm text-gray-500">{getWindDirection(weather.wind.deg)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="bg-green-100 rounded-lg p-2 flex flex-col items-center" data-aos={aos.fadeUp}>
            <Eye className="h-3 w-3 text-gray-500 mr-1" />
            <span className="text-xs text-gray-600">{t("visibility")}</span>
            <span className="text-sm font-medium text-gray-800">{(weather.visibility / 1000).toFixed(1)} km</span>
          </div>

          <div className="bg-green-100 rounded-lg p-2 flex flex-col items-center" data-aos={aos.fadeUp} data-aos-delay="350">
            <Gauge className="h-3 w-3 text-gray-500 mr-1" />
            <span className="text-xs text-gray-600">{t("pressure")}</span>
            <span className="text-sm font-medium text-gray-800">{weather.main.pressure} hPa</span>
          </div>

          <div className="bg-green-100 rounded-lg p-2 flex flex-col items-center" data-aos={aos.fadeUp} data-aos-delay="400">
            <Cloud className="h-3 w-3 text-gray-500 mr-1" />
            <span className="text-xs text-gray-600">{t("clouds")}</span>
            <span className="text-sm font-medium text-gray-800">{weather.clouds.all}%</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="bg-green-50 pt-3 pb-3 px-6 flex justify-between border-t border-green-200" data-aos={aos.fadeUp}>
        <div className="flex items-center">
          <Sunrise className="h-4 w-4 text-yellow-500 mr-2" />
          <span className="text-sm text-gray-600">{t("sunrise")}: {formatTime(weather.sys.sunrise, weather)}</span>
        </div>
        <div className="flex items-center">
          <Sunset className="h-4 w-4 text-orange-500 mr-2" />
          <span className="text-sm text-gray-600">{t("sunset")}: {formatTime(weather.sys.sunset, weather)}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
