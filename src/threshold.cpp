#include "threshold.h"
#include <Arduino.h>

Thresholds thresholds;

void initThresholds() {
    thresholds.temp = {"temp", 0, 100};
    thresholds.soil = {"soil", 0, 100};
    thresholds.co2 = {"co2", 0, 1000};
    thresholds.light = {"light", 0, 1024};
    thresholds.water = {"water", 0, 100};
}

Threshold* getThreshold(const char* name) {
    if (strcmp(name, "temp") == 0) return &thresholds.temp;
    if (strcmp(name, "soil") == 0) return &thresholds.soil;
    if (strcmp(name, "co2") == 0) return &thresholds.co2;
    if (strcmp(name, "light") == 0) return &thresholds.light;
    if (strcmp(name, "water") == 0) return &thresholds.water;
    return nullptr;
}

bool updateThreshold(const char* name, int min, int max) {
    Threshold* t = getThreshold(name);
    if (t == nullptr) return false;
    t->min = min;
    t->max = max;
    return true;
}

void printThresholds() {
    Serial.println("Current Thresholds:");
    Serial.print("Temp: "); Serial.print(thresholds.temp.min); Serial.print(" - "); Serial.println(thresholds.temp.max);
    Serial.print("Soil: "); Serial.print(thresholds.soil.min); Serial.print(" - "); Serial.println(thresholds.soil.max);
    Serial.print("CO2: "); Serial.print(thresholds.co2.min); Serial.print(" - "); Serial.println(thresholds.co2.max);
    Serial.print("Light: "); Serial.print(thresholds.light.min); Serial.print(" - "); Serial.println(thresholds.light.max);
    Serial.print("Water: "); Serial.print(thresholds.water.min); Serial.print(" - "); Serial.println(thresholds.water.max);
}
