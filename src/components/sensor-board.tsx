import { useEffect, useState } from "react"
import { CO2Level } from "./sensors/co2-level"
import ReadingsHook from "@/hooks/readings-hook"
import { Luminosity } from "./sensors/luminosity"
import { SoilHumidity } from "./sensors/soil-humidity"
import { WaterTankLevel } from "./sensors/water-tank-level"
import { TemperatureGauge } from "./sensors/temperature-gauge"

export function SensorBoard() {
  const date = new Date();

  // Hooks for each sensor
  const temperatureHook = ReadingsHook("temperature");
  const humidityHook = ReadingsHook("soilhumidity");
  const co2Hook = ReadingsHook("co2level");
  const luminosityHook = ReadingsHook("light");
  const waterLevelHook = ReadingsHook("watertank");

  const [co2Level, setCo2Level] = useState<number | null>(null);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [soilHumidity, setSoilHumidity] = useState<number | null>(null);
  const [luminosity, setLuminosity] = useState<number | null>(null);
  const [waterLevel, setWaterLevel] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const fetchInitialReadings = async () => {
      const temp = await temperatureHook.getLatestReading();
      const co2 = await co2Hook.getLatestReading();
      const hum = await humidityHook.getLatestReading();
      const light = await luminosityHook.getLatestReading();
      const water = await waterLevelHook.getLatestReading();

      if (temp) {
        setTemperature(temp.value);
        setLastUpdated(new Date(temp.createdAt));
      }
      if (co2) setCo2Level(co2.value);
      if (hum) setSoilHumidity(hum.value);
      if (light) setLuminosity(light.value);
      if (water) setWaterLevel(water.value);
    };

    fetchInitialReadings();
  }, []);

  useEffect(() => {
    const stopTemperature = temperatureHook.startLatestReadingPolling((data) => {
      setTemperature(data.value);
      setLastUpdated(new Date(data.createdAt));
    }, 5000);

    const stopHumidity = humidityHook.startLatestReadingPolling((data) => {
      setSoilHumidity(data.value);
      setLastUpdated(new Date(data.createdAt));
    }, 5000);

    const stopCO2 = co2Hook.startLatestReadingPolling((data) => {
      setCo2Level(data.value);
      setLastUpdated(new Date(data.createdAt));
    }, 5000);

    const stopLuminosity = luminosityHook.startLatestReadingPolling((data) => {
      setLuminosity(data.value);
      setLastUpdated(new Date(data.createdAt));
    }, 5000);

    const stopWaterLevel = waterLevelHook.startLatestReadingPolling((data) => {
      setWaterLevel(data.value);
      setLastUpdated(new Date(data.createdAt));
    }, 5000);

    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      stopTemperature();
      stopHumidity();
      stopCO2();
      stopLuminosity();
      stopWaterLevel();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200 p-6">
      <div className="max-w-7xl mx-auto">
        {width <= 1300 ? (
          <div className="flex flex-wrap w-full items-center justify-center gap-4 p-6">
            <TemperatureGauge value={temperature || 0} lastUpdated={lastUpdated || date} />
            <SoilHumidity value={soilHumidity || 0} lastUpdated={lastUpdated || date} />
            <Luminosity value={luminosity || 0} lastUpdated={lastUpdated || date} className="lg:col-span-2" />
            <CO2Level value={co2Level || 0} lastUpdated={lastUpdated || date} />
            <WaterTankLevel value={waterLevel || 0} lastUpdated={lastUpdated || date} />
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-2 w-full items-center justify-center gap-4 p-6">
              <TemperatureGauge value={temperature || 0} lastUpdated={lastUpdated || date} />
              <SoilHumidity value={soilHumidity || 0} lastUpdated={lastUpdated || date} />
              <CO2Level value={co2Level || 0} lastUpdated={lastUpdated || date} />
              <Luminosity value={luminosity || 0} lastUpdated={lastUpdated || date} className="lg:col-span-2" />
            </div>
            <div className="p-6">
              <WaterTankLevel value={waterLevel || 0} lastUpdated={lastUpdated || date} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
