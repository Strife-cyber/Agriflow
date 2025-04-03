import { Input } from "@/components/ui/input";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lightbulb,
  Fan,
  Droplet,
  Power,
  Clock,
  RotateCcw,
  Timer,
  AlertTriangle,
  Settings,
  BarChart3,
} from "lucide-react"
import { useTranslation } from "@/context/translation";

interface ActuatorState {
  isOn: boolean
  intensity: number
  lastActivated: Date | null
  runTime: number
  isAutomatic: boolean
  isScheduled: boolean
}

interface ActuatorControlPanelProps {
  className?: string
  onStateChange?: (type: "light" | "fan" | "pump", state: ActuatorState) => void
}

export function ActuatorControlPanel({ className, onStateChange }: ActuatorControlPanelProps) {
  const translation = useTranslation();

  // State for each actuator
  const [lightState, setLightState] = useState<ActuatorState>({
    isOn: false,
    intensity: 80,
    lastActivated: null,
    runTime: 0,
    isAutomatic: true,
    isScheduled: false,
  })

  const [fanState, setFanState] = useState<ActuatorState>({
    isOn: false,
    intensity: 60,
    lastActivated: null,
    runTime: 0,
    isAutomatic: true,
    isScheduled: false,
  })

  const [pumpState, setPumpState] = useState<ActuatorState>({
    isOn: false,
    intensity: 70,
    lastActivated: null,
    runTime: 0,
    isAutomatic: true,
    isScheduled: false,
  })

  // Timer for run time tracking
  useEffect(() => {
    const interval = setInterval(() => {
      if (lightState.isOn) {
        setLightState((prev) => ({ ...prev, runTime: prev.runTime + 1 }))
      }
      if (fanState.isOn) {
        setFanState((prev) => ({ ...prev, runTime: prev.runTime + 1 }))
      }
      if (pumpState.isOn) {
        setPumpState((prev) => ({ ...prev, runTime: prev.runTime + 1 }))
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [lightState.isOn, fanState.isOn, pumpState.isOn])

  // Toggle functions for each actuator
  const toggleLight = () => {
    setLightState((prev) => {
      const newState = {
        ...prev,
        isOn: !prev.isOn,
        lastActivated: !prev.isOn ? new Date() : prev.lastActivated,
      }
      onStateChange?.("light", newState)
      return newState
    })
  }

  const toggleFan = () => {
    setFanState((prev) => {
      const newState = {
        ...prev,
        isOn: !prev.isOn,
        lastActivated: !prev.isOn ? new Date() : prev.lastActivated,
      }
      onStateChange?.("fan", newState)
      return newState
    })
  }

  const togglePump = () => {
    setPumpState((prev) => {
      const newState = {
        ...prev,
        isOn: !prev.isOn,
        lastActivated: !prev.isOn ? new Date() : prev.lastActivated,
      }
      onStateChange?.("pump", newState)
      return newState
    })
  }

  // Intensity change handlers
  const handleLightIntensityChange = (value: number[]) => {
    setLightState((prev) => {
      const newState = { ...prev, intensity: value[0] }
      onStateChange?.("light", newState)
      return newState
    })
  }

  const handleFanIntensityChange = (value: number[]) => {
    setFanState((prev) => {
      const newState = { ...prev, intensity: value[0] }
      onStateChange?.("fan", newState)
      return newState
    })
  }

  const handlePumpIntensityChange = (value: number[]) => {
    setPumpState((prev) => {
      const newState = { ...prev, intensity: value[0] }
      onStateChange?.("pump", newState)
      return newState
    })
  }

  // Toggle automatic mode
  const toggleLightAutomatic = () => {
    setLightState((prev) => {
      const newState = { ...prev, isAutomatic: !prev.isAutomatic }
      onStateChange?.("light", newState)
      return newState
    })
  }

  const toggleFanAutomatic = () => {
    setFanState((prev) => {
      const newState = { ...prev, isAutomatic: !prev.isAutomatic }
      onStateChange?.("fan", newState)
      return newState
    })
  }

  const togglePumpAutomatic = () => {
    setPumpState((prev) => {
      const newState = { ...prev, isAutomatic: !prev.isAutomatic }
      onStateChange?.("pump", newState)
      return newState
    })
  }

  // Reset run time
  const resetLightRunTime = () => {
    setLightState((prev) => ({ ...prev, runTime: 0 }))
  }

  const resetFanRunTime = () => {
    setFanState((prev) => ({ ...prev, runTime: 0 }))
  }

  const resetPumpRunTime = () => {
    setPumpState((prev) => ({ ...prev, runTime: 0 }))
  }

  // Format run time
  const formatRunTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Card className={`border-green-100 ${className}`}>
      <CardHeader className="border-b border-green-100">
        <CardTitle className="text-gray-800 flex items-center gap-2">
          <Power className="h-5 w-5 text-green-600" />
          { translation("actuatorControlPanel") }
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="controls" className="w-full">
          <TabsList className="w-full grid grid-cols-3 rounded-none border-b border-green-100">
            <TabsTrigger
              value="controls"
              className="data-[state=active]:bg-green-50 data-[state=active]:text-green-800 rounded-none"
            >
              { translation("controls") }
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-green-50 data-[state=active]:text-green-800 rounded-none"
            >
              { translation("settings") }
            </TabsTrigger>
            <TabsTrigger
              value="stats"
              className="data-[state=active]:bg-green-50 data-[state=active]:text-green-800 rounded-none"
            >
              { translation("statistics") }
            </TabsTrigger>
          </TabsList>

          <TabsContent value="controls" className="p-6 space-y-6">
            {/* Light Control */}
            <div className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${lightState.isOn ? "bg-amber-100" : "bg-gray-100"}`}>
                    <Lightbulb className={`h-6 w-6 ${lightState.isOn ? "text-amber-500" : "text-gray-400"}`} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{ translation("luminosity") }</h3>
                    <p className="text-sm text-gray-500">{ translation("supplementalLightingSystem") }</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={lightState.isOn ? "on" : "off"}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Badge className={lightState.isOn ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}>
                        {lightState.isOn ? "ON" : "OFF"}
                      </Badge>
                    </motion.div>
                  </AnimatePresence>
                  <Switch
                    checked={lightState.isOn}
                    onCheckedChange={toggleLight}
                    className="data-[state=checked]:bg-green-600"
                  />
                </div>
              </div>

              <div className="p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="light-intensity" className="text-sm text-gray-600">
                    { translation("intensity") }
                  </Label>
                  <span className="text-sm font-medium text-gray-700">{lightState.intensity}%</span>
                </div>
                <Slider
                  id="light-intensity"
                  value={[lightState.intensity]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={handleLightIntensityChange}
                  disabled={!lightState.isOn}
                  className="py-2"
                />

                <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                  <span>{ translation("low") }</span>
                  <span>{ translation("medium") }</span>
                  <span>{ translation("high") }</span>
                </div>

                <div className="flex items-center justify-between mt-4 text-sm">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{ `${translation("runTime")}: ${formatRunTime(lightState.runTime)}` }</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 rounded-full ml-1 text-gray-400 hover:text-gray-600"
                      onClick={resetLightRunTime}
                    >
                      <RotateCcw className="h-3 w-3" />
                      <span className="sr-only">{ translation("resetTimer") }</span>
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <Label htmlFor="light-auto" className="text-gray-600">
                      { translation("auto") }
                    </Label>
                    <Switch
                      id="light-auto"
                      checked={lightState.isAutomatic}
                      onCheckedChange={toggleLightAutomatic}
                      className="data-[state=checked]:bg-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Fan Control */}
            <div className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${fanState.isOn ? "bg-blue-100" : "bg-gray-100"}`}>
                    <Fan className={`h-6 w-6 ${fanState.isOn ? "text-blue-500" : "text-gray-400"}`} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{ translation("ventilationFans") }</h3>
                    <p className="text-sm text-gray-500">{ translation("airCirculationSystem") }</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={fanState.isOn ? "on" : "off"}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Badge className={fanState.isOn ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}>
                        {fanState.isOn ? "ON" : "OFF"}
                      </Badge>
                    </motion.div>
                  </AnimatePresence>
                  <Switch
                    checked={fanState.isOn}
                    onCheckedChange={toggleFan}
                    className="data-[state=checked]:bg-green-600"
                  />
                </div>
              </div>

              <div className="p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="fan-intensity" className="text-sm text-gray-600">
                    { translation("speed") }
                  </Label>
                  <span className="text-sm font-medium text-gray-700">{fanState.intensity}%</span>
                </div>
                <Slider
                  id="fan-intensity"
                  value={[fanState.intensity]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={handleFanIntensityChange}
                  disabled={!fanState.isOn}
                  className="py-2"
                />

                <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                  <span>{ translation("low") }</span>
                  <span>{ translation("medium") }</span>
                  <span>{ translation("high") }</span>
                </div>

                <div className="flex items-center justify-between mt-4 text-sm">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{ `${translation("runTime")}: ${formatRunTime(fanState.runTime)}` }</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 rounded-full ml-1 text-gray-400 hover:text-gray-600"
                      onClick={resetFanRunTime}
                    >
                      <RotateCcw className="h-3 w-3" />
                      <span className="sr-only">{ translation("resetTimer") }</span>
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <Label htmlFor="fan-auto" className="text-gray-600">
                      { translation("auto") }
                    </Label>
                    <Switch
                      id="fan-auto"
                      checked={fanState.isAutomatic}
                      onCheckedChange={toggleFanAutomatic}
                      className="data-[state=checked]:bg-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Pump Control */}
            <div className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${pumpState.isOn ? "bg-blue-100" : "bg-gray-100"}`}>
                    <Droplet className={`h-6 w-6 ${pumpState.isOn ? "text-blue-500" : "text-gray-400"}`} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{ translation("irrigationPump") }</h3>
                    <p className="text-sm text-gray-500">{ translation("waterDistributionSystem") }</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={pumpState.isOn ? "on" : "off"}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Badge className={pumpState.isOn ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}>
                        {pumpState.isOn ? "ON" : "OFF"}
                      </Badge>
                    </motion.div>
                  </AnimatePresence>
                  <Switch
                    checked={pumpState.isOn}
                    onCheckedChange={togglePump}
                    className="data-[state=checked]:bg-green-600"
                  />
                </div>
              </div>

              <div className="p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="pump-intensity" className="text-sm text-gray-600">
                    { translation("flowRate") }
                  </Label>
                  <span className="text-sm font-medium text-gray-700">{pumpState.intensity}%</span>
                </div>
                <Slider
                  id="pump-intensity"
                  value={[pumpState.intensity]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={handlePumpIntensityChange}
                  disabled={!pumpState.isOn}
                  className="py-2"
                />

                <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                  <span>{ translation("low") }</span>
                  <span>{ translation("medium") }</span>
                  <span>{ translation("high") }</span>
                </div>

                <div className="flex items-center justify-between mt-4 text-sm">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{ `${translation("runTime")}: ${formatRunTime(pumpState.runTime)}` }</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 rounded-full ml-1 text-gray-400 hover:text-gray-600"
                      onClick={resetPumpRunTime}
                    >
                      <RotateCcw className="h-3 w-3" />
                      <span className="sr-only">{ translation("resetTimer") }</span>
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <Label htmlFor="pump-auto" className="text-gray-600">
                      { translation("auto") }
                    </Label>
                    <Switch
                      id="pump-auto"
                      checked={pumpState.isAutomatic}
                      onCheckedChange={togglePumpAutomatic}
                      className="data-[state=checked]:bg-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
              <h3 className="font-medium text-gray-800 mb-3">{ translation("systemStatus") }</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-full ${lightState.isOn ? "bg-green-100" : "bg-gray-100"} mb-2`}>
                    <Lightbulb className={`h-5 w-5 ${lightState.isOn ? "text-green-600" : "text-gray-400"}`} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{ translation("lights") }</span>
                  <span className="text-xs text-gray-500">{lightState.isAutomatic ? "Automatic" : "Manual"}</span>
                </div>

                <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-full ${fanState.isOn ? "bg-green-100" : "bg-gray-100"} mb-2`}>
                    <Fan className={`h-5 w-5 ${fanState.isOn ? "text-green-600" : "text-gray-400"}`} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{ translation("fans") }</span>
                  <span className="text-xs text-gray-500">{fanState.isAutomatic ? "Automatic" : "Manual"}</span>
                </div>

                <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-full ${pumpState.isOn ? "bg-green-100" : "bg-gray-100"} mb-2`}>
                    <Droplet className={`h-5 w-5 ${pumpState.isOn ? "text-green-600" : "text-gray-400"}`} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{ translation("pump") }</span>
                  <span className="text-xs text-gray-500">{pumpState.isAutomatic ? "Automatic" : "Manual"}</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="p-6 space-y-6">
            <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="h-5 w-5 text-gray-600" />
                <h3 className="font-medium text-gray-800">{ translation("automationSettings") }</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Lightbulb className="h-5 w-5 text-amber-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">{ translation("lightSchedule") }</p>
                      <p className="text-xs text-gray-500">{ translation("setAutomaticOn/OffTimes") }</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs border-gray-200">
                    <Timer className="h-3 w-3 mr-1" />
                    { translation("configure") }
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Fan className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">{ translation("fanTriggers") }</p>
                      <p className="text-xs text-gray-500">{ translation("setTemperatureAndHumidityThresholds") }</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs border-gray-200">
                    <Settings className="h-3 w-3 mr-1" />
                    { translation("configure") }
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Droplet className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">{ translation("irrigationSchedule") }</p>
                      <p className="text-xs text-gray-500">{ translation("setWateringTimesAndSoilMoistureThresholds") }</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs border-gray-200">
                    <Timer className="h-3 w-3 mr-1" />
                    { translation("configure") }
                  </Button>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  <h3 className="font-medium text-gray-800">{ translation("safetySettings") }</h3>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="max-light-time" className="text-sm text-gray-600">
                      { translation("maximumLightRunTime") }
                    </Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="max-light-time"
                        type="number"
                        className="w-20 h-8 text-sm border-gray-200"
                        defaultValue="12"
                      />
                      <span className="text-sm text-gray-600">{ translation("hours") }</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="max-pump-time" className="text-sm text-gray-600">
                    { translation("maximumPumpRunTime") }
                    </Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="max-pump-time"
                        type="number"
                        className="w-20 h-8 text-sm border-gray-200"
                        defaultValue="30"
                      />
                      <span className="text-sm text-gray-600">{ translation("minutes") }</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="emergency-stop" className="text-sm text-gray-600">
                      { translation("emergencyStopOnHighTemperature") }
                    </Label>
                    <Switch id="emergency-stop" defaultChecked={true} className="data-[state=checked]:bg-red-500" />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stats" className="p-6 space-y-6">
            <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="h-5 w-5 text-gray-600" />
                <h3 className="font-medium text-gray-800">{ translation("usageStatistics") }</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">{ translation("lights-DailyRuntime") }</h4>
                  <div className="h-8 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>0h</span>
                    <span>6h</span>
                    <span>12h</span>
                    <span>18h</span>
                    <span>24h</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">{ translation("fans-DailyRuntime") }</h4>
                  <div className="h-8 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-400 rounded-full" style={{ width: "40%" }}></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>0h</span>
                    <span>6h</span>
                    <span>12h</span>
                    <span>18h</span>
                    <span>24h</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">{ translation("pump-DailyRuntime") }</h4>
                  <div className="h-8 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-400 rounded-full" style={{ width: "15%" }}></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>0h</span>
                    <span>6h</span>
                    <span>12h</span>
                    <span>18h</span>
                    <span>24h</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

