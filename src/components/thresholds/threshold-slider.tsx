import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface ThresholdSliderProps {
  label: string
  minValue: number
  maxValue: number
  step?: number
  unit: string
  defaultLowThreshold: number
  defaultHighThreshold: number
  onThresholdChange?: (low: number, high: number) => void
  className?: string
  colorScheme?: "temperature" | "humidity" | "level" | "luminosity" | "co2"
  decimals?: number
}

export function ThresholdSlider({
  label,
  minValue,
  maxValue,
  step = 1,
  unit,
  defaultLowThreshold,
  defaultHighThreshold,
  onThresholdChange,
  className,
  colorScheme = "temperature",
  decimals = 0,
}: ThresholdSliderProps) {
  const [lowThreshold, setLowThreshold] = useState(defaultLowThreshold)
  const [highThreshold, setHighThreshold] = useState(defaultHighThreshold)
  const [lowInput, setLowInput] = useState(defaultLowThreshold.toFixed(decimals))
  const [highInput, setHighInput] = useState(defaultHighThreshold.toFixed(decimals))
  const [isDirty, setIsDirty] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Get color based on scheme
  const getGradient = () => {
    switch (colorScheme) {
      case "temperature":
        return "from-blue-500 via-green-500 to-red-500"
      case "humidity":
        return "from-yellow-500 via-green-500 to-blue-500"
      case "level":
        return "from-red-500 via-yellow-500 to-green-500"
      case "luminosity":
        return "from-gray-500 via-yellow-300 to-yellow-500"
      case "co2":
        return "from-green-500 via-yellow-500 to-red-500"
      default:
        return "from-blue-500 via-green-500 to-red-500"
    }
  }

  // Validate thresholds
  const validateThresholds = (low: number, high: number) => {
    if (low < minValue) {
      return `Low threshold cannot be less than ${minValue}${unit}`
    }
    if (high > maxValue) {
      return `High threshold cannot be greater than ${maxValue}${unit}`
    }
    if (low >= high) {
      return "Low threshold must be less than high threshold"
    }
    return null
  }

  // Handle slider change
  const handleSliderChange = (values: number[]) => {
    const [low, high] = values
    setLowThreshold(low)
    setHighThreshold(high)
    setLowInput(low.toFixed(decimals))
    setHighInput(high.toFixed(decimals))
    setIsDirty(true)

    const validationError = validateThresholds(low, high)
    setError(validationError)
  }

  // Handle low input change
  const handleLowInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLowInput(e.target.value)
    const value = Number.parseFloat(e.target.value)
    if (!isNaN(value)) {
      setLowThreshold(value)
      setIsDirty(true)
      setError(validateThresholds(value, highThreshold))
    }
  }

  // Handle high input change
  const handleHighInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHighInput(e.target.value)
    const value = Number.parseFloat(e.target.value)
    if (!isNaN(value)) {
      setHighThreshold(value)
      setIsDirty(true)
      setError(validateThresholds(lowThreshold, value))
    }
  }

  // Apply changes
  const applyChanges = () => {
    const validationError = validateThresholds(lowThreshold, highThreshold)
    if (!validationError) {
      onThresholdChange?.(lowThreshold, highThreshold)
      setIsDirty(false)
    } else {
      setError(validationError)
    }
  }

  // Reset to defaults
  const resetToDefaults = () => {
    setLowThreshold(defaultLowThreshold)
    setHighThreshold(defaultHighThreshold)
    setLowInput(defaultLowThreshold.toFixed(decimals))
    setHighInput(defaultHighThreshold.toFixed(decimals))
    setIsDirty(false)
    setError(null)
  }

  return (
    <div className={cn("space-y-4 p-4 bg-white rounded-lg border border-gray-200", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-800">{label}</h3>
        {isDirty && (
          <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
            Unsaved Changes
          </Badge>
        )}
      </div>

      <div className="relative pt-6 pb-2">
        {/* Background gradient */}
        <div className={`absolute inset-x-0 h-2 rounded-full bg-gradient-to-r ${getGradient()} opacity-50`} />

        {/* Slider */}
        <Slider
          defaultValue={[lowThreshold, highThreshold]}
          value={[lowThreshold, highThreshold]}
          min={minValue}
          max={maxValue}
          step={step}
          onValueChange={handleSliderChange}
          className="mt-6"
        />

        {/* Range markers */}
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>
            {minValue}
            {unit}
          </span>
          <span>
            {((maxValue - minValue) / 2 + minValue).toFixed(decimals)}
            {unit}
          </span>
          <span>
            {maxValue}
            {unit}
          </span>
        </div>
      </div>

      {/* Input fields */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs text-gray-500">Low Threshold</label>
          <div className="relative">
            <Input
              type="text"
              value={lowInput}
              onChange={handleLowInputChange}
              className="bg-gray-50 border-gray-200 text-gray-800 pr-8"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">{unit}</span>
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-xs text-gray-500">High Threshold</label>
          <div className="relative">
            <Input
              type="text"
              value={highInput}
              onChange={handleHighInputChange}
              className="bg-gray-50 border-gray-200 text-gray-800 pr-8"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">{unit}</span>
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-red-600"
        >
          <AlertTriangle className="h-4 w-4" />
          <span>{error}</span>
        </motion.div>
      )}

      {/* Action buttons */}
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={resetToDefaults}
          className="border-gray-200 text-gray-600 hover:text-gray-800 hover:bg-gray-100"
        >
          Reset
        </Button>
        <Button
          size="sm"
          onClick={applyChanges}
          disabled={!isDirty || !!error}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          {isDirty ? (
            "Apply Changes"
          ) : (
            <div className="flex items-center gap-1">
              <Check className="h-4 w-4" />
              <span>Saved</span>
            </div>
          )}
        </Button>
      </div>
    </div>
  )
}

