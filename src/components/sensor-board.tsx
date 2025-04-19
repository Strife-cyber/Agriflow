"use client"

import { useState, useEffect } from "react"
import { CO2Level } from "./sensors/co2-level"
import { Luminosity } from "./sensors/luminosity"
import { SoilHumidity } from "./sensors/soil-humidity"
import { WaterTankLevel } from "./sensors/water-tank-level"
import { TemperatureGauge } from "./sensors/temperature-gauge"

export function SensorBoard() {
  const [co2Level, setCo2Level] = useState(650);
  const [waterLevel, setWaterLevel] = useState(78);
  const [luminosity, setLuminosity] = useState(68000);
  const [temperature, setTemperature] = useState(24.5);
  const [soilHumidity, setSoilHumidity] = useState(65);
  const [width, setWidth] = useState(window.innerWidth);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Simulate real-time updates with smoother transitions
  useEffect(() => {
    const interval = setInterval(() => {
      setWaterLevel((prev) => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 3)))
      setTemperature((prev) => Math.max(-5, Math.min(45, prev + (Math.random() - 0.5) * 2)))
      setSoilHumidity((prev) => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 5)))
      setCo2Level((prev) => Math.max(400, Math.min(2200, prev + (Math.random() - 0.5) * 100)))
      setLuminosity((prev) => Math.max(0, Math.min(100000, prev + (Math.random() - 0.5) * 5000)))
      setLastUpdated(new Date())
    }, 5000);
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200 p-6">
      <div className="max-w-7xl mx-auto">
        {
          width <= 1300 ? (
            <div className="flex flex-wrap w-full items-center justify-center gap-4 p-6">
              <TemperatureGauge value={temperature} lastUpdated={lastUpdated} />
              <SoilHumidity value={soilHumidity} lastUpdated={lastUpdated} />
              <Luminosity value={luminosity} lastUpdated={lastUpdated} className="lg:col-span-2" />
              <CO2Level value={co2Level} lastUpdated={lastUpdated} />
              <WaterTankLevel value={waterLevel} lastUpdated={lastUpdated} />
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-2 w-full items-center justify-center gap-4 p-6">
                <TemperatureGauge value={temperature} lastUpdated={lastUpdated} />
                <SoilHumidity value={soilHumidity} lastUpdated={lastUpdated} />
                <CO2Level value={co2Level} lastUpdated={lastUpdated} />
                <Luminosity value={luminosity} lastUpdated={lastUpdated} className="lg:col-span-2" />
              </div>
              <div>
                <WaterTankLevel value={waterLevel} lastUpdated={lastUpdated} />
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}
