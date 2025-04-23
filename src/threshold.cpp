#include "threshold.h"
#include <Arduino.h>

/**
 * @file threshold.cpp
 * @brief Implementation of sensor threshold management for the AgriTech Monitor on Arduino.
 * @details This file provides the implementation of functions declared in threshold.h, managing
 *          the initialization, retrieval, updating, and printing of sensor thresholds for
 *          temperature, soil humidity, CO2, light, and water tank level. It defines the global
 *          `thresholds` structure and supports automatic threshold-based operations for the
 *          AgriTech Monitor system.
 * @author Djiatsa
 * @date 21 April 2025
 */

/**
 * @brief Global instance of Thresholds for storing all sensor thresholds.
 * @details Stores the minimum and maximum threshold values for all sensors (temperature, soil,
 *          CO2, light, water) in the AgriTech Monitor. Initialized by `initThresholds()` and
 *          accessed or modified by other functions in this module.
 * @note This is a global variable and should be accessed carefully to avoid race conditions in
 *       interrupt-driven or multi-threaded Arduino applications.
 */
Thresholds thresholds;

/**
 * @brief Initializes the global thresholds structure with default values.
 * @details Sets predefined minimum and maximum threshold values for each sensor in the
 *          `thresholds` structure. The default values are tailored for the AgriTech Monitor's
 *          typical operating conditions:
 *          - Temperature: 10°C to 35°C
 *          - Soil Humidity: 300 to 800 (sensor-specific units)
 *          - CO2: 400 ppm to 1000 ppm
 *          - Light: 10,000 lux to 70,000 lux
 *          - Water Tank Level: 1000 to 9000 (sensor-specific units)
 * @note Must be called during system startup to ensure thresholds are properly configured
 *       before use.
 */
void initThresholds() {
    //automatic = true;
    thresholds.temp = {"temp", 10, 35};
    thresholds.soil = {"soil", 300, 800};
    thresholds.co2 = {"co2", 400, 1000};
    thresholds.light = {"light", 1000, 20000};
    thresholds.water = {"water", 1000, 9000};
}

/**
 * @brief Retrieves the Threshold object for a specified sensor.
 * @param name Name of the sensor (e.g., "temp", "soil", "co2", "light", "water").
 * @return Pointer to the Threshold object for the specified sensor, or nullptr if the sensor
 *         name is invalid.
 * @details Compares the input `name` with known sensor names using `strcmp` and returns a
 *          pointer to the corresponding Threshold object in the global `thresholds` structure.
 *          Returns nullptr for unrecognized names to indicate an error.
 * @note The returned pointer points to the global `thresholds` structure and should not be freed.
 */
Threshold* getThreshold(const char* name) {
    if (strcmp(name, "temp") == 0) return &thresholds.temp;
    if (strcmp(name, "soil") == 0) return &thresholds.soil;
    if (strcmp(name, "co2") == 0) return &thresholds.co2;
    if (strcmp(name, "light") == 0) return &thresholds.light;
    if (strcmp(name, "water") == 0) return &thresholds.water;
    return nullptr;
}

/**
 * @brief Updates the threshold values for a specified sensor.
 * @param name Name of the sensor (e.g., "temp", "soil", "co2", "light", "water").
 * @param min New minimum threshold value.
 * @param max New maximum threshold value.
 * @return `true` if the threshold was updated successfully, `false` if the sensor name is invalid.
 * @details Retrieves the Threshold object for the specified sensor using `getThreshold`. If valid,
 *          updates its `min` and `max` values with the provided inputs. Returns `false` if the
 *          sensor name is not recognized.
 * @note Does not perform range validation on `min` and `max`. Callers should ensure `min` <= `max`
 *       and that values are within sensor-specific limits.
 */
bool updateThreshold(const char* name, int min, int max) {
    Threshold* t = getThreshold(name);
    if (t == nullptr) return false;
    t->min = min;
    t->max = max;
    return true;
}

/**
 * @brief Prints all threshold values to the Serial console for debugging.
 * @details Outputs the minimum and maximum threshold values for each sensor (temperature, soil,
 *          CO2, light, water) in the `thresholds` structure to the Serial console in a human-readable
 *          format. Example output:
 *          ```
 *          Current Thresholds:
 *          Temp: 10 - 35
 *          Soil: 300 - 800
 *          CO2: 400 - 1000
 *          Light: 10000 - 70000
 *          Water: 1000 - 9000
 *          ```
 * @note Requires Serial communication to be initialized with `Serial.begin()` before calling.
 *       Typically used during development or troubleshooting to verify threshold settings.
 */
void printThresholds() {
    Serial.println("Current Thresholds:");
    Serial.print("Temp: "); Serial.print(thresholds.temp.min); Serial.print(" - "); Serial.println(thresholds.temp.max);
    Serial.print("Soil: "); Serial.print(thresholds.soil.min); Serial.print(" - "); Serial.println(thresholds.soil.max);
    Serial.print("CO2: "); Serial.print(thresholds.co2.min); Serial.print(" - "); Serial.println(thresholds.co2.max);
    Serial.print("Light: "); Serial.print(thresholds.light.min); Serial.print(" - "); Serial.println(thresholds.light.max);
    Serial.print("Water: "); Serial.print(thresholds.water.min); Serial.print(" - "); Serial.println(thresholds.water.max);
}

/**
 * @brief Enables automatic threshold-based operations (placeholder).
 * @details Intended to set the global `automatic` flag to `true`, enabling automatic actuator
 *          actions (e.g., turning on a fan or pump) when sensor readings exceed their thresholds.
 *          Currently a placeholder function with no implementation.
 * @note Future implementations should set `automatic = true` and include logic to integrate with
 *       actuator control systems. Ensure sensor and actuator configurations are validated before
 *       enabling automatic mode.
 */
void setAutomatic(bool state) {
    // automatic = state;
    Serial.println(state ? "Automatic mode enabled" : "Automatic mode disabled");
}
