import { useEffect, useState } from "react"
import { Thermometer } from "lucide-react"
import { useAnimation, aos } from "@/context/aos"
import { BaseSensorCard } from "./base-sensor-card"

interface TemperatureGaugeProps {
  value: number
  minValue?: number
  maxValue?: number
  className?: string
  lastUpdated?: Date
}

export function TemperatureGauge({
  value,
  minValue = -10,
  maxValue = 50,
  className,
  lastUpdated,
}: TemperatureGaugeProps) {
  const [prevValue, setPrevValue] = useState(value)
  useAnimation() // Initialize AOS

  // Calculate progress (0 to 1)
  const progress = (value - minValue) / (maxValue - minValue)
  
  // Calculate color based on temperature (HSL hue: blue to green to red)
  const colorAngle = 240 - progress * 240 // 240 (blue) to 0 (red) via green
  const strokeColor = `hsl(${colorAngle}, 80%, 60%)`

  // Calculate arc path
  const angle = progress * 270 - 135 // -135 to 135 degrees
  const x = Math.cos((angle * Math.PI) / 180)
  const y = Math.sin((angle * Math.PI) / 180)
  const r = 80 // radius
  const arcPath = `M -80 0 A ${r} ${r} 0 ${progress > 0.5 ? 1 : 0} 1 ${x * r} ${y * r}`

  // Needle rotation
  const needleAngle = -135 + progress * 270

  useEffect(() => {
    if (value !== prevValue) {
      setPrevValue(value)
    }
  }, [value, prevValue])

  return (
    <BaseSensorCard
      title="temperature"
      icon={<Thermometer className="h-4 w-4" />}
      className={className}
      lastUpdated={lastUpdated}
    >
      <div 
        className="flex flex-col items-center justify-center h-full"
        data-aos={aos.fadeUp} // Entire component fades up
      >
        <div 
          className="relative w-48 h-48"
          data-aos={aos.zoomIn} // Gauge zooms in
          data-aos-delay="100"
        >
          {/* Background track */}
          <svg viewBox="-100 -100 200 200" className="w-full h-full">
            <path
              d="M -80 0 A 80 80 0 1 1 80 0"
              fill="none"
              strokeWidth="12"
              stroke="rgba(209, 250, 229, 0.3)" // Light green tint
              strokeLinecap="round"
            />

            {/* Colored progress arc */}
            <path
              d={arcPath}
              fill="none"
              strokeWidth="12"
              stroke={strokeColor}
              strokeLinecap="round"
              data-aos={aos.fadeUp} // Arc fades up
              data-aos-delay="200"
            />

            {/* Tick marks */}
            {Array.from({ length: 7 }).map((_, i) => {
              const angle = -135 + i * 45
              const x1 = 68 * Math.cos((angle * Math.PI) / 180)
              const y1 = 68 * Math.sin((angle * Math.PI) / 180)
              const x2 = 80 * Math.cos((angle * Math.PI) / 180)
              const y2 = 80 * Math.sin((angle * Math.PI) / 180)
              const tickValue = minValue + (i * (maxValue - minValue)) / 6
              const tickX = 92 * Math.cos((angle * Math.PI) / 180)
              const tickY = 92 * Math.sin((angle * Math.PI) / 180)

              return (
                <g 
                  key={i}
                  data-aos={aos.fadeUp}
                  data-aos-delay={200 + i * 20}
                >
                  <line 
                    x1={x1} 
                    y1={y1} 
                    x2={x2} 
                    y2={y2} 
                    stroke="rgba(16, 185, 129, 0.7)" // Green tint
                    strokeWidth="2" 
                  />
                  <text
                    x={tickX}
                    y={tickY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#6b7280" // Gray for contrast
                    fontSize="10"
                  >
                    {Math.round(tickValue)}
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
              data-aos={aos.fadeUp}
              data-aos-delay="300"
            />

            {/* Center circle */}
            <circle 
              cx="0" 
              cy="0" 
              r="8" 
              fill="#d1fae5" // Light green
              stroke="#10b981" 
              strokeWidth="2" 
            />
          </svg>

          {/* Value display */}
          <div
            className="absolute bottom-4 left-0 right-0 text-center"
            data-aos={aos.fadeUp}
            data-aos-delay="400"
          >
            <span className="text-3xl font-bold text-green-800">
              {value.toFixed(1)}
            </span>
            <span className="text-xl text-green-700">°C</span>
          </div>
        </div>
      </div>
    </BaseSensorCard>
  )
}
