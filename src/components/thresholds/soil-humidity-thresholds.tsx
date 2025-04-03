import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets } from "lucide-react";
import { ThresholdSlider } from "./threshold-slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "@/context/translation";
import { useSoilHumidityThresholdHook } from "@/hooks/threshold-hook";
import { Progress, ProgressIndicator } from "@radix-ui/react-progress";

interface SoilHumidityThresholdsProps {
  defaultLowThreshold?: number;
  defaultHighThreshold?: number;
  onThresholdChange?: (low: number, high: number) => void;
  className?: string;
}

export function SoilHumidityThresholds({
  onThresholdChange,
  className,
}: SoilHumidityThresholdsProps) {
  const t = useTranslation();
  const { status } = useSoilHumidityThresholdHook();
  const [cropType, setCropType] = useState("general");

  const handleThresholdChange = (low: number, high: number) => {
    onThresholdChange?.(low, high);
  };

  // Preset thresholds for different crop types
  const cropPresets = {
    general: { low: 30, high: 70 },
    corn: { low: 40, high: 80 },
    wheat: { low: 35, high: 65 },
    rice: { low: 60, high: 90 },
    vegetables: { low: 50, high: 75 },
  };

  const handleCropChange = (value: string) => {
    setCropType(value);
    const preset = cropPresets[value as keyof typeof cropPresets];
    if (preset) {
      onThresholdChange?.(preset.low, preset.high);
    }
  };

  const valueLow = cropPresets[cropType as keyof typeof cropPresets].low;
  const valueHigh = cropPresets[cropType as keyof typeof cropPresets].high;

  return (
    <Card className={`bg-white border-green-100 ${className}`}>
      <CardHeader className="pb-2 border-b border-green-100">
        <CardTitle className="flex items-center justify-between text-gray-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-green-100 text-green-600">
              <Droplets className="h-4 w-4" />
            </div>
            <span>{t("soil_humidity_thresholds")}</span>
          </div>
        </CardTitle>
      </CardHeader>
      {
        status.isLoading ? (
          <>
            <Progress>
              <ProgressIndicator/>
            </Progress>
          </>
        ) : (
          <CardContent className="p-4">
            <div className="mb-4">
              <Label htmlFor="crop-type" className="text-sm text-gray-500 mb-1 block">
                {t("crop_type")}
              </Label>
              <Select value={cropType} onValueChange={handleCropChange}>
                <SelectTrigger id="crop-type" className="bg-gray-50 border-gray-200 text-gray-800">
                  <SelectValue placeholder={t("crop_type")} />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200 text-gray-800">
                  <SelectItem value="general">{t("general")}</SelectItem>
                  <SelectItem value="corn">{t("corn")}</SelectItem>
                  <SelectItem value="wheat">{t("wheat")}</SelectItem>
                  <SelectItem value="rice">{t("rice")}</SelectItem>
                  <SelectItem value="vegetables">{t("vegetables")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
    
            <ThresholdSlider
              label={t("soil_humidity_range")}
              minValue={0}
              maxValue={100}
              step={1}
              unit="%"
              defaultLowThreshold={ status.data?.low || cropPresets[cropType as keyof typeof cropPresets].low }
              defaultHighThreshold={ status.data?.high || cropPresets[cropType as keyof typeof cropPresets].high }
              onThresholdChange={handleThresholdChange}
              colorScheme="humidity"
            />
    
            <div className="mt-4 text-sm text-gray-600">
              <p>{t("set_soil_humidity")}</p>
              <ul className="mt-2 list-disc list-inside space-y-1">
                <li>
                  {t("risk_drought", { "value": status.data?.low || valueLow })}
                </li>
                <li>
                  {t("risk_root_rot", { "value": status.data?.high || valueHigh })}
                </li>
              </ul>
            </div>
          </CardContent>
        )
      }
    </Card>
  );
}
