import { subDays } from "date-fns"
import { Event, EventCategory, EventSeverity } from ".."

export const generateMockEvents = (): Event[] => {
    const categories: EventCategory[] = ["sensor", "alert", "maintenance", "harvest", "planting", "system"]
    const severities: EventSeverity[] = ["info", "success", "warning", "error"]
    const locations = ["North Field", "South Field", "Greenhouse 1", "Greenhouse 2", "East Field", "West Field"]
    const sensors = [
      "Temperature Sensor 1",
      "Soil Humidity Sensor 2",
      "Water Tank Sensor",
      "Light Sensor 3",
      "CO2 Sensor 1",
    ]
    const users = ["John Deere", "Maria Garcia", "Alex Smith", "Sarah Johnson"]
  
    const events: Event[] = []
  
    // Generate 50 random events
    for (let i = 0; i < 50; i++) {
      const category = categories[Math.floor(Math.random() * categories.length)]
      const severity = severities[Math.floor(Math.random() * severities.length)]
      const location = locations[Math.floor(Math.random() * locations.length)]
      const sensor = category === "sensor" ? sensors[Math.floor(Math.random() * sensors.length)] : undefined
      const user = users[Math.floor(Math.random() * users.length)]
      const daysAgo = Math.floor(Math.random() * 14) // Events from last 14 days
      const hoursAgo = Math.floor(Math.random() * 24)
      const minutesAgo = Math.floor(Math.random() * 60)
  
      const timestamp = subDays(new Date(), daysAgo)
      timestamp.setHours(timestamp.getHours() - hoursAgo)
      timestamp.setMinutes(timestamp.getMinutes() - minutesAgo)
  
      let title = ""
      let description = ""
      let value: number | undefined
      let unit: string | undefined
  
      switch (category) {
        case "sensor":
          if (sensor?.includes("Temperature")) {
            value = Math.round((15 + Math.random() * 25) * 10) / 10
            unit = "°C"
            title = `Temperature ${value > 30 ? "high" : value < 15 ? "low" : "normal"}`
            description = `Temperature reading of ${value}${unit} from ${sensor}`
          } else if (sensor?.includes("Humidity")) {
            value = Math.round(Math.random() * 100)
            unit = "%"
            title = `Soil humidity ${value < 30 ? "low" : value > 70 ? "high" : "normal"}`
            description = `Soil humidity reading of ${value}${unit} from ${sensor}`
          } else if (sensor?.includes("Water")) {
            value = Math.round(Math.random() * 100)
            unit = "%"
            title = `Water tank level ${value < 20 ? "low" : value > 90 ? "high" : "normal"}`
            description = `Water tank level reading of ${value}${unit} from ${sensor}`
          } else if (sensor?.includes("Light")) {
            value = Math.round(Math.random() * 100000)
            unit = "lux"
            title = `Light intensity ${value < 20000 ? "low" : value > 80000 ? "high" : "normal"}`
            description = `Light intensity reading of ${value}${unit} from ${sensor}`
          } else if (sensor?.includes("CO2")) {
            value = Math.round(300 + Math.random() * 1700)
            unit = "ppm"
            title = `CO2 level ${value < 400 ? "low" : value > 1200 ? "high" : "normal"}`
            description = `CO2 level reading of ${value}${unit} from ${sensor}`
          }
          break
        case "alert":
          title = `System alert: ${severity === "error" ? "Critical" : severity === "warning" ? "Warning" : "Notice"}`
          description = `${severity === "error" ? "Critical" : severity === "warning" ? "Warning" : "Notice"} alert in ${location}`
          break
        case "maintenance":
          title = `Maintenance ${Math.random() > 0.5 ? "scheduled" : "performed"}`
          description = `Maintenance ${Math.random() > 0.5 ? "scheduled" : "performed"} in ${location}`
          break
        case "harvest":
          title = "Harvest completed"
          description = `Harvest completed in ${location}`
          value = Math.round(100 + Math.random() * 900)
          unit = "kg"
          break
        case "planting":
          title = "Planting completed"
          description = `Planting completed in ${location}`
          value = Math.round(100 + Math.random() * 900)
          unit = "seeds"
          break
        case "system":
          title = `System ${Math.random() > 0.5 ? "update" : "restart"}`
          description = `System ${Math.random() > 0.5 ? "update" : "restart"} ${Math.random() > 0.5 ? "scheduled" : "completed"}`
          break
      }
  
      const resolved = severity === "error" || severity === "warning" ? Math.random() > 0.3 : true
      const resolvedAt = resolved ? new Date(timestamp.getTime() + Math.random() * 3600000) : undefined
      const resolvedBy = resolved ? users[Math.floor(Math.random() * users.length)] : undefined
  
      events.push({
        id: `event-${i}`,
        timestamp,
        category,
        title,
        description,
        severity,
        sensor,
        location,
        value,
        unit,
        user,
        resolved,
        resolvedAt,
        resolvedBy,
      })
    }
  
    // Sort by timestamp (newest first)
    return events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  }