import { Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useAnimation, aos } from "@/context/aos";
import { BaseSensorCard } from "./base-sensor-card";

interface LuminosityProps {
  value: number
  unit?: "lux" | "%"
  maxValue?: number
  className?: string
  lastUpdated?: Date
}

export function Luminosity({
  value,
  unit = "lux",
  maxValue = unit === "lux" ? 100000 : 100,
  className,
  lastUpdated,
}: LuminosityProps) {
  const [prevValue, setPrevValue] = useState(value)
  useAnimation() // Initialize AOS

  // Normalize value (0-100%)
  const normalizedValue = (value / maxValue) * 100

  // Static values for glow and background based on normalized value
  const glowOpacity = normalizedValue < 50 ? 0.1 + (normalizedValue / 50) * 0.2 : 0.3 + ((normalizedValue - 50) / 50) * 0.2
  const glowSize = normalizedValue < 50 ? (normalizedValue / 50) * 20 : 20 + ((normalizedValue - 50) / 50) * 20
  const glowColor = normalizedValue < 50 
    ? `rgba(16, 185, 129, ${0.3 + (normalizedValue / 50) * 0.3})` 
    : `rgba(16, 185, 129, ${0.6 + ((normalizedValue - 50) / 50) * 0.3})`
  const backgroundOpacity = 0.8 - (normalizedValue / 100) * 0.4
  const backgroundColor = `rgba(209, 250, 229, ${backgroundOpacity})` // Green-tinted light background

  // Get text description based on light level
  const getLightDescription = (level: number) => {
    const normalized = (level / maxValue) * 100
    if (normalized < 20) return "Dark"
    if (normalized < 40) return "Dim"
    if (normalized < 60) return "Moderate"
    if (normalized < 80) return "Bright"
    return "Very Bright"
  }

  useEffect(() => {
    if (value !== prevValue) {
      setPrevValue(value)
    }
  }, [value, prevValue])

  return (
    <BaseSensorCard
      title="luminosity"
      icon={<Sun className="h-4 w-4" />}
      className={className}
      lastUpdated={lastUpdated}
    >
      <div
        className="flex flex-col items-center justify-center h-full relative overflow-hidden rounded-lg"
        style={{ backgroundColor }}
        data-aos={aos.fadeUp}
      >
        {/* Glow effect */}
        <div
          className="absolute rounded-full"
          style={{
            width: "150px",
            height: "150px",
            filter: "blur(40px)",
            opacity: glowOpacity,
            boxShadow: `0 0 ${glowSize}px ${glowColor}`,
            background: glowColor,
          }}
          data-aos={aos.zoomIn} // Glow zooms in
          data-aos-delay="100"
        />

        <div
          className="relative z-10 flex flex-col items-center justify-center p-6"
          data-aos={aos.fadeUp} // Content fades up
          data-aos-delay="200"
        >
          {/* Sun icon with rays */}
          <div className="relative mb-4">
            <Sun 
              className="h-16 w-16 text-green-500" 
              data-aos={aos.zoomIn} // Sun zooms in
              data-aos-delay="300"
            />
            {/* Static rays */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute bg-green-400/30 rounded-full"
                style={{
                  width: "2px",
                  height: `${15 + (normalizedValue / 100) * 10}px`, // Height varies with value
                  left: "50%",
                  top: "50%",
                  marginLeft: "-1px",
                  marginTop: "-10px",
                  transformOrigin: "center bottom",
                  transform: `rotate(${i * 45}deg) translateY(-30px)`,
                }}
                data-aos={aos.fadeUp} // Rays fade up
                data-aos-delay={300 + i * 50}
              />
            ))}
          </div>

          {/* Value display */}
          <div
            className="text-center"
            data-aos={aos.fadeUp}
            data-aos-delay="400"
          >
            <span className="text-4xl font-bold text-green-800">
              {unit === "lux" ? value.toLocaleString() : Math.round(value)}
            </span>
            <span className="text-2xl text-green-700 ml-1">{unit}</span>
            <div className="mt-2 text-lg text-green-600">{getLightDescription(value)}</div>
          </div>
        </div>
      </div>
    </BaseSensorCard>
  )
}