import { Droplet } from "lucide-react"
import { useEffect, useState } from "react"
import { useAnimation, aos } from "@/context/aos"
import { BaseSensorCard } from "./base-sensor-card"

interface WaterTankLevelProps {
  value: number
  className?: string
  lastUpdated?: Date
}

export function WaterTankLevel({ value, className, lastUpdated }: WaterTankLevelProps) {
  const [prevValue, setPrevValue] = useState(value)
  useAnimation()

  useEffect(() => {
    if (value !== prevValue) setPrevValue(value)
  }, [value, prevValue])

  const getStatus = (level: number) =>
    level < 20 ? { label: "Low", color: "text-red-600" } :
    level < 40 ? { label: "Warning", color: "text-yellow-600" } :
    { label: "Good", color: "text-green-600" }

  const status = getStatus(value)
  const clampedValue = Math.max(0, Math.min(100, value))

  return (
    <BaseSensorCard
      title="Water Tank Level"
      icon={<Droplet className="h-4 w-4" />}
      className={className}
      lastUpdated={lastUpdated}
    >
      <div 
        className="flex flex-col items-center h-full justify-center space-y-4 p-4"
        data-aos={aos.fadeUp}
      >
        <div 
          className="relative w-32 h-64 mx-auto perspective-1000"
          data-aos={aos.zoomIn}
          data-aos-delay="100"
          data-aos-duration="800"
        >
          {/* Tank container */}
          <div className="absolute inset-0 bg-gradient-to-b from-green-200/50 to-green-100/70 border-4 border-green-300/70 rounded-xl shadow-inner overflow-hidden">
            {/* Water level */}
            <div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-500 to-green-300"
              style={{ height: `${clampedValue}%` }}
              data-aos={aos.slideUp}
              data-aos-delay="200"
              data-aos-duration="1000"
            >
              {/* Pronounced ripple effect */}
              <div 
                className="absolute top-0 left-0 right-0 bg-green-200/70 animate-ripple"
                style={{ height: '4px' }} // Base height set here
                data-aos={aos.fadeUp}
                data-aos-delay="250"
              />
            </div>

            {/* Level markers */}
            <div 
              className="absolute inset-y-0 right-2 w-6 flex flex-col justify-between py-2 text-right"
              data-aos={aos.fadeLeft}
              data-aos-delay="300"
            >
              {[0, 20, 40, 60, 80, 100].reverse().map((mark) => (
                <div 
                  key={mark} 
                  className="flex items-center justify-end"
                  data-aos={aos.fadeUp}
                  data-aos-delay={300 + (100 - mark) * 20}
                >
                  <span className="text-[8px] text-green-700 mr-1">{mark}%</span>
                  <div className="h-0.5 w-2 bg-green-400/80" />
                </div>
              ))}
            </div>

            {/* Tank cap */}
            <div 
              className="absolute -top-3 left-1/4 right-1/4 h-3 bg-gradient-to-r from-green-300 to-green-400 rounded-t-md shadow-md"
              data-aos={aos.fadeDown}
              data-aos-delay="350"
              data-aos-duration="600"
            />
          </div>

          {/* Pipe */}
          <div 
            className="absolute -right-4 top-8 w-4 h-10 bg-gradient-to-b from-green-300 to-green-400 rounded-r-md shadow-md"
            data-aos={aos.fadeLeft}
            data-aos-delay="400"
            data-aos-duration="600"
          />
        </div>

        <div 
          className="text-center"
          data-aos={aos.fadeUp}
          data-aos-delay="450"
          data-aos-duration="600"
        >
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-green-800">{Math.round(clampedValue)}%</span>
            <span className={`text-sm font-medium ${status.color}`}>{status.label}</span>
          </div>
        </div>
      </div>
    </BaseSensorCard>
  )
}