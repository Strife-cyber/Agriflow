import { Droplets } from "lucide-react";
import { useEffect, useState } from "react";
import { useAnimation, aos } from "@/context/aos";
import { BaseSensorCard } from "./base-sensor-card";

interface SoilHumidityProps {
  value: number
  className?: string
  lastUpdated?: Date
}

export function SoilHumidity({ value, className, lastUpdated }: SoilHumidityProps) {
  const [prevValue, setPrevValue] = useState(value)
  useAnimation() // Initialize AOS

  useEffect(() => {
    if (value !== prevValue) {
      setPrevValue(value)
    }
  }, [value, prevValue])

  // Determine status based on humidity level
  const getStatus = (humidity: number) => {
    if (humidity < 30) return { label: "Dry", color: "bg-yellow-500" }
    if (humidity < 60) return { label: "Optimal", color: "bg-green-500" }
    return { label: "Wet", color: "bg-blue-500" }
  }

  const status = getStatus(value)
  const statusBgColor = status.color === "bg-yellow-500" ? "#eab308" : status.color === "bg-green-500" ? "#22c55e" : "#3b82f6"

  return (
    <BaseSensorCard
      title="soilHumidity"
      icon={<Droplets className="h-4 w-4" />}
      className={className}
      lastUpdated={lastUpdated}
    >
      <div 
        className="flex flex-col h-full justify-center space-y-6"
        data-aos={aos.fadeUp} // Entire component fades up
      >
        <div 
          className="flex items-center justify-between"
          data-aos={aos.fadeRight} // Value and status slide in from right
          data-aos-delay="100"
        >
          <span className="text-4xl font-bold text-green-800">
            <span>{Math.round(value)}</span>
            <span className="text-2xl ml-1">%</span>
          </span>
          <div
            className="px-3 py-1 rounded-full text-sm text-white"
            style={{ backgroundColor: statusBgColor }}
            data-aos={aos.fadeLeft} // Status slides in from left
            data-aos-delay="200"
          >
            {status.label}
          </div>
        </div>

        <div 
          className="relative h-8 w-full bg-green-100 rounded-full overflow-hidden"
          data-aos={aos.zoomIn} // Progress bar zooms in
          data-aos-delay="300"
        >
          {/* Water drops background pattern */}
          <div 
            className="absolute inset-0 flex items-center justify-around opacity-30"
            data-aos={aos.fadeUp}
            data-aos-delay="350"
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <Droplets 
                key={i} 
                className="h-3 w-3 text-green-400" 
                data-aos={aos.fadeUp}
                data-aos-delay={350 + i * 20}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div
            className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-green-400 to-green-600 rounded-full"
            style={{ width: `${value}%` }}
            data-aos={aos.slideLeft} // Progress slides in from left
            data-aos-delay="400"
          >
            {/* Static water bubbles */}
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-white/30"
                  style={{
                    width: 10 + Math.random() * 10,
                    height: 10 + Math.random() * 10,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  data-aos={aos.fadeUp}
                  data-aos-delay={400 + i * 50}
                />
              ))}
            </div>
          </div>

          {/* Measurement markers */}
          <div className="absolute inset-0 flex justify-between items-center px-2">
            {[0, 25, 50, 75, 100].map((mark) => (
              <div
                key={mark}
                className="h-2 w-0.5 bg-green-300/70"
                style={{ marginLeft: mark === 0 ? "0" : mark === 100 ? "-1px" : "0" }}
              />
            ))}
          </div>
        </div>

        <div 
          className="flex justify-between text-xs text-green-600"
          data-aos={aos.fadeUp}
          data-aos-delay="500"
        >
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      </div>
    </BaseSensorCard>
  )
}