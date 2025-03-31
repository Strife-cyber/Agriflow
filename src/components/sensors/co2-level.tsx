import { cn } from "@/lib/utils"
import { Wind } from "lucide-react"
import { useEffect, useState } from "react"
import { useAnimation, aos } from "@/context/aos"
import { BaseSensorCard } from "./base-sensor-card"

interface CO2LevelProps {
  value: number
  className?: string
  lastUpdated?: Date
}

export function CO2Level({ value, className, lastUpdated }: CO2LevelProps) {
  const [prevValue, setPrevValue] = useState(value)
  useAnimation();

  // CO2 levels thresholds (in ppm)
  const thresholds = {
    good: 800,
    moderate: 1200,
    poor: 1500,
    dangerous: 2000,
  }

  // Max value for the gauge
  const maxValue = 2500

  // Normalize value for the gauge (0-100%)
  const normalizedValue = (value / maxValue) * 100
  const needleAngle = -120 + (normalizedValue / 100) * 240

  // Color based on CO2 level
  const getColor = (co2Level: number) => {
    if (co2Level <= thresholds.good) return "#22c55e"
    if (co2Level <= thresholds.moderate) return "#84cc16"
    if (co2Level <= thresholds.poor) return "#eab308"
    if (co2Level <= thresholds.dangerous) return "#f97316"
    return "#ef4444"
  }

  // Get status based on CO2 level
  const getStatus = (co2Level: number) => {
    if (co2Level <= thresholds.good) return { label: "Good", color: "text-green-600" }
    if (co2Level <= thresholds.moderate) return { label: "Moderate", color: "text-lime-600" }
    if (co2Level <= thresholds.poor) return { label: "Poor", color: "text-yellow-600" }
    if (co2Level <= thresholds.dangerous) return { label: "Warning", color: "text-orange-600" }
    return { label: "Dangerous", color: "text-red-600" }
  }

  const color = getColor(value)
  const status = getStatus(value)

  useEffect(() => {
    if (value !== prevValue) {
      setPrevValue(value)
    }
  }, [value, prevValue])

  return (
    <BaseSensorCard
      title="co2Level"
      icon={<Wind className="h-4 w-4" />}
      className={className}
      lastUpdated={lastUpdated}
    >
      <div className="flex flex-col items-center justify-center h-full relative">
        <div 
          className="relative w-48 h-48"
          data-aos={aos.zoomIn} // Gauge zooms in
          data-aos-delay="100"
        >
          {/* Gauge background */}
          <svg viewBox="-100 -100 200 200" className="w-full h-full">
            <defs>
              <linearGradient id="co2Gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="30%" stopColor="#84cc16" />
                <stop offset="50%" stopColor="#eab308" />
                <stop offset="70%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>

            {/* Background track */}
            <path
              d="M -80 0 A 80 80 0 1 1 80 0"
              fill="none"
              strokeWidth="12"
              stroke="rgba(209, 250, 229, 0.3)" // Light green tint
              strokeLinecap="round"
            />

            {/* Colored track */}
            <path
              d="M -80 0 A 80 80 0 1 1 80 0"
              fill="none"
              strokeWidth="12"
              stroke="url(#co2Gradient)"
              strokeLinecap="round"
            />

            {/* Zone markers */}
            {[0, 25, 50, 75, 100].map((percent) => {
              const angle = -120 + (percent / 100) * 240
              const x = 80 * Math.cos((angle * Math.PI) / 180)
              const y = 80 * Math.sin((angle * Math.PI) / 180)
              const markerValue = (percent / 100) * maxValue

              return (
                <g key={percent}>
                  <circle
                    cx={x}
                    cy={y}
                    r="3"
                    fill={
                      markerValue <= thresholds.good
                        ? "#22c55e"
                        : markerValue <= thresholds.moderate
                          ? "#84cc16"
                          : markerValue <= thresholds.poor
                            ? "#eab308"
                            : markerValue <= thresholds.dangerous
                              ? "#f97316"
                              : "#ef4444"
                    }
                  />
                  <text
                    x={x * 1.15}
                    y={y * 1.15}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#6b7280" // Gray for contrast
                    fontSize="8"
                  >
                    {Math.round(markerValue)}
                  </text>
                </g>
              )
            })}

            {/* Needle */}
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="-60"
              stroke="#10b981" // Green tint
              strokeWidth="2"
              transform={`rotate(${needleAngle})`}
              data-aos={aos.fadeUp} // Needle fades up
              data-aos-delay="200"
            />

            {/* Center circle */}
            <circle cx="0" cy="0" r="8" fill="#d1fae5" stroke="#10b981" strokeWidth="2" />
          </svg>

          {/* Value display */}
          <div
            className="absolute bottom-0 left-0 right-0 text-center"
            data-aos={aos.fadeUp}
            data-aos-delay="300"
          >
            <span className="text-3xl font-bold" style={{ color }}>
              {Math.round(value)}
            </span>
            <span className="text-lg text-green-700 ml-1">ppm</span>
          </div>
        </div>

        <div
          className={cn("mt-2 text-lg font-medium", status.color)}
          data-aos={aos.fadeUp}
          data-aos-delay="400"
        >
          {status.label}
        </div>

        {/* Animated air particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-green-300/30"
              style={{
                width: 3 + Math.random() * 5,
                height: 3 + Math.random() * 5,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              data-aos={aos.fadeUp}
              data-aos-delay={i * 50}
              data-aos-duration={1000 + Math.random() * 2000}
            />
          ))}
        </div>
      </div>
    </BaseSensorCard>
  )
}