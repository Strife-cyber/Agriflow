import { Droplet } from "lucide-react";
import { useEffect, useState } from "react";
import { useAnimation, aos } from "@/context/aos";
import { BaseSensorCard } from "./base-sensor-card";

interface WaterTankLevelProps {
  value: number
  className?: string
  lastUpdated?: Date
}

export function WaterTankLevel({ value, className, lastUpdated }: WaterTankLevelProps) {
  const [prevValue, setPrevValue] = useState(value)
  useAnimation() // Initialize AOS

  useEffect(() => {
    if (value !== prevValue) {
      setPrevValue(value)
    }
  }, [value, prevValue])

  // Determine status based on water level
  const getStatus = (level: number) => {
    if (level < 20) return { label: "Low", color: "text-red-600" }
    if (level < 40) return { label: "Warning", color: "text-yellow-600" }
    return { label: "Good", color: "text-green-600" }
  }

  const status = getStatus(value)

  return (
    <BaseSensorCard
      title="waterTankLevel"
      icon={<Droplet className="h-4 w-4" />}
      className={className}
      lastUpdated={lastUpdated}
    >
      <div 
        className="flex flex-col items-center h-full justify-center space-y-4"
        data-aos={aos.fadeUp} // Entire component fades up
      >
        <div 
          className="relative h-64 w-32 mx-auto"
          data-aos={aos.zoomIn} // Tank zooms in
          data-aos-delay="100"
        >
          {/* Tank container */}
          <div className="absolute inset-0 border-4 border-green-300/50 rounded-b-xl rounded-t-2xl overflow-hidden bg-green-100/50">
            {/* Water level */}
            <div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-400 to-green-600"
              style={{ height: `${value}%` }}
              data-aos={aos.slideUp} // Water level slides up
              data-aos-delay="200"
            >
              {/* Static wave effect */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23ffffff' fillOpacity='0.3' d='M0,192L48,176C96,160,192,128,288,133.3C384,139,480,181,576,186.7C672,192,768,160,864,154.7C960,149,1056,171,1152,165.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E\")",
                  backgroundSize: "200% 100%",
                  backgroundPositionX: "50%", // Static position
                }}
                data-aos={aos.fadeUp}
                data-aos-delay="250"
              />
            </div>

            {/* Level markers */}
            <div 
              className="absolute inset-y-0 left-0 w-6 flex flex-col justify-between py-2"
              data-aos={aos.fadeRight}
              data-aos-delay="300"
            >
              {[0, 20, 40, 60, 80, 100].reverse().map((mark) => (
                <div 
                  key={mark} 
                  className="flex items-center"
                  data-aos={aos.fadeUp}
                  data-aos-delay={300 + (100 - mark) * 10}
                >
                  <div className="h-0.5 w-2 bg-green-300/70" />
                  <span className="text-[8px] text-green-600 ml-0.5">{mark}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tank cap */}
          <div 
            className="absolute -top-2 left-0 right-0 h-2 bg-green-300 rounded-t-xl"
            data-aos={aos.fadeDown}
            data-aos-delay="350"
          />

          {/* Pipe */}
          <div 
            className="absolute -right-4 top-6 w-4 h-8 bg-green-300 rounded-r-md"
            data-aos={aos.fadeLeft}
            data-aos-delay="400"
          />
        </div>

        <div 
          className="text-center"
          data-aos={aos.fadeUp}
          data-aos-delay="450"
        >
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-green-800">{Math.round(value)}%</span>
            <span className={`text-sm ${status.color}`}>{status.label}</span>
          </div>
        </div>
      </div>
    </BaseSensorCard>
  )
}