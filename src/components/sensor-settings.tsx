import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Thermometer,
  Droplets,
  Droplet,
  Sun,
  Wind,
  Save,
} from "lucide-react";
import { TemperatureThresholds } from "./thresholds/temperature-thresholds";
import { SoilHumidityThresholds } from "./thresholds/soil-humidity-thresholds";
import { WaterTankThresholds } from "./thresholds/water-tank-thresholds";
import { LuminosityThresholds } from "./thresholds/luminosity-thresholds";
import { CO2Thresholds } from "./thresholds/co2-thresholds";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/language-context";
import { useTranslation } from "@/context/translation";

export interface SensorThresholdSettings {
  temperature: { low: number; high: number };
  soilHumidity: { low: number; high: number };
  waterTankLevel: { low: number; high: number };
  luminosity: { low: number; high: number; unit: "%" | "lux" };
  co2Level: { low: number; high: number };
}

interface SensorSettingsProps {
  onSave?: (settings: SensorThresholdSettings) => void;
  defaultSettings?: SensorThresholdSettings;
  className?: string;
}

export function SensorSettings({
  onSave,
  defaultSettings = {
    temperature: { low: 15, high: 30 },
    soilHumidity: { low: 30, high: 70 },
    waterTankLevel: { low: 20, high: 90 },
    luminosity: { low: 20, high: 80, unit: "%" },
    co2Level: { low: 400, high: 1200 },
  },
  className,
}: SensorSettingsProps) {
  const { isEnglish } = useLanguage();
  const translation = useTranslation();
  const [hasChanges, setHasChanges] = useState(false);
  const [settings, setSettings] = useState(defaultSettings);
  const [activeTab, setActiveTab] = useState("temperature");

  const updateSettings = (key: keyof SensorThresholdSettings, values: any) => {
    setSettings((prev) => ({ ...prev, [key]: values }));
    setHasChanges(true);
  };

  const handleSaveAll = () => {
    onSave?.(settings);
    setHasChanges(false);
  };

  const labels = {
    title: isEnglish ? "Sensor Threshold Settings" : "Paramètres des seuils capteurs",
    description: isEnglish
      ? "Configure alert thresholds for all sensors in your agricultural system"
      : "Configurer les seuils d'alerte pour tous les capteurs de votre système agricole",
    save: isEnglish ? "Save All Settings" : "Enregistrer tous les paramètres",
    tabs: [
      { key: "temperature", icon: <Thermometer />, label: translation("temperature") },
      { key: "humidity", icon: <Droplets />, label: translation("humidity") },
      { key: "water", icon: <Droplet />, label: translation("waterTankLevel") },
      { key: "light", icon: <Sun />, label: translation("luminosity") },
      { key: "co2", icon: <Wind />, label: translation("co2Level") },
    ],
  };

  return (
    <Card className={`bg-white border-green-100 ${className}`}>
      <CardHeader className="border-b border-green-100">
        <CardTitle className="text-gray-800">{labels.title}</CardTitle>
        <CardDescription className="text-gray-500">{labels.description}</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 bg-gray-100 mb-6">
            {labels.tabs.map(({ key, icon, label }) => (
              <TabsTrigger
                key={key}
                value={key}
                className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800"
              >
                <span className="h-4 w-4 mr-2">{icon}</span>
                <span className="hidden sm:inline whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px]">{label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="temperature">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <TemperatureThresholds
                defaultLowThreshold={settings.temperature.low}
                defaultHighThreshold={settings.temperature.high}
                onThresholdChange={(low, high) => updateSettings("temperature", { low, high })}
              />
            </motion.div>
          </TabsContent>

          <TabsContent value="humidity">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <SoilHumidityThresholds
                defaultLowThreshold={settings.soilHumidity.low}
                defaultHighThreshold={settings.soilHumidity.high}
                onThresholdChange={(low, high) => updateSettings("soilHumidity", { low, high })}
              />
            </motion.div>
          </TabsContent>

          <TabsContent value="water">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <WaterTankThresholds
                defaultLowThreshold={settings.waterTankLevel.low}
                defaultHighThreshold={settings.waterTankLevel.high}
                onThresholdChange={(low, high) => updateSettings("waterTankLevel", { low, high })}
              />
            </motion.div>
          </TabsContent>

          <TabsContent value="light">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <LuminosityThresholds
                defaultLowThreshold={settings.luminosity.unit === "%" ? settings.luminosity.low : 20}
                defaultHighThreshold={settings.luminosity.unit === "%" ? settings.luminosity.high : 80}
                defaultLowThresholdLux={settings.luminosity.unit === "lux" ? settings.luminosity.low : 20000}
                defaultHighThresholdLux={settings.luminosity.unit === "lux" ? settings.luminosity.high : 80000}
                onThresholdChange={(low, high, unit) => updateSettings("luminosity", { low, high, unit })}
              />
            </motion.div>
          </TabsContent>

          <TabsContent value="co2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <CO2Thresholds
                defaultLowThreshold={settings.co2Level.low}
                defaultHighThreshold={settings.co2Level.high}
                onThresholdChange={(low, high) => updateSettings("co2Level", { low, high })}
              />
            </motion.div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end">
          <Button onClick={handleSaveAll} disabled={!hasChanges} className="bg-green-600 hover:bg-green-700 text-white">
            <Save className="h-4 w-4 mr-2" />
            <div className="max-[330px]:text-ellipsis max-[330px]:w-[140px] ">{labels.save}</div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
