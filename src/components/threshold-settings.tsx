import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCircle } from "lucide-react";
import { useTranslation } from "@/context/translation";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SensorSettings, type SensorThresholdSettings } from "./sensor-settings";

export function ThresholdSettings() {
  const translation = useTranslation();
  const [settings, setSettings] = useState<SensorThresholdSettings>({
    temperature: { low: 15, high: 30 },
    soilHumidity: { low: 30, high: 70 },
    waterTankLevel: { low: 20, high: 90 },
    luminosity: { low: 20, high: 80, unit: "%" },
    co2Level: { low: 400, high: 1200 },
  });
  const [showSaved, setShowSaved] = useState(false);

  const handleSaveSettings = (newSettings: SensorThresholdSettings) => {
    setSettings(newSettings);
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <SensorSettings onSave={handleSaveSettings} defaultSettings={settings} />

        <AnimatePresence>
          {showSaved && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-4 right-4 bg-green-100 text-green-800 px-4 py-2 rounded-md shadow-lg flex items-center gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              <span>{translation("saved")}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Card className="bg-white border-green-100">
        <CardHeader className="border-b border-green-100">
          <CardTitle className="text-gray-800 flex items-center gap-2">
            <Bell className="h-5 w-5 text-green-600" />
            {translation("title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(settings).map(([key, { low, high, unit }]) => (
              <div key={key} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-gray-800 font-medium">{translation(key as any)}</h3>
                  <Badge className="bg-blue-100 text-blue-700">Active</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{translation("low")}:</span>
                  <span className="text-gray-800">{low}{unit ?? "°C"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{translation("high")}:</span>
                  <span className="text-gray-800">{high}{unit ?? "°C"}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
