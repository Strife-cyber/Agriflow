#ifndef THRESHOLD_H
#define THRESHOLD_H

#include <cstring>

/**
 * @file threshold.h
 * @brief Manages sensor threshold storage and operations for the AgriTech Monitor on Arduino.
 * @details This header defines the `Threshold` and `Thresholds` structures for storing minimum and maximum
 *          threshold values for sensors (temperature, soil humidity, CO2, light, water). It provides functions
 *          to initialize, retrieve, update, and print thresholds, as well as control automatic threshold-based
 *          operations. The thresholds are used to trigger alerts or actuator actions when sensor readings fall
 *          outside the specified ranges.
 * @author Djiatsa
 * @date 21 April 2025
 */

/**
 * @brief Global flag to enable or disable automatic threshold-based operations.
 * @details When set to `true`, the system automatically triggers actuator actions (e.g., turning on a fan)
 *          based on sensor readings exceeding threshold limits. When `false`, manual control is required.
 * @note This variable is global and should be accessed carefully to avoid race conditions in multi-threaded
 *       or interrupt-driven Arduino applications.
 */
extern bool automatic;

/**
 * @struct Threshold
 * @brief Represents a single sensor's threshold with a name and min/max values.
 * @details Stores the name of a sensor (e.g., "temp") and its minimum and maximum threshold values.
 *          Includes a constructor, copy constructor, destructor, and assignment operator to manage
 *          dynamically allocated memory for the sensor name.
 */
struct Threshold {
    const char* name; /**< Name of the sensor (e.g., "temp", "soil"). */
    int min;          /**< Minimum threshold value for the sensor. */
    int max;          /**< Maximum threshold value for the sensor. */

    /**
     * @brief Constructs a Threshold object with specified name and threshold values.
     * @param nameVal Name of the sensor (default: empty string).
     * @param minVal Minimum threshold value (default: 0).
     * @param maxVal Maximum threshold value (default: 0).
     * @note The name is duplicated using `strdup` to ensure independent memory allocation.
     */
    Threshold(const char* nameVal = "", int minVal = 0, int maxVal = 0) 
        : name(strdup(nameVal)), min(minVal), max(maxVal) {}

    /**
     * @brief Copy constructor for Threshold.
     * @param other The Threshold object to copy.
     * @details Creates a deep copy of the sensor name to avoid shared memory issues.
     */
    Threshold(const Threshold& other) 
        : name(strdup(other.name)), min(other.min), max(other.max) {}

    /**
     * @brief Destructor for Threshold.
     * @details Frees the dynamically allocated memory for the sensor name to prevent memory leaks.
     */
    ~Threshold() {
        if (name) {
            free((void*)name);
        }
    }

    /**
     * @brief Assignment operator for Threshold.
     * @param other The Threshold object to assign from.
     * @return Reference to the assigned Threshold object.
     * @details Performs a deep copy of the sensor name and threshold values, freeing existing memory
     *          to prevent leaks.
     */
    Threshold& operator=(const Threshold& other) {
        if (this != &other) {
            if (name) {
                free((void*)name);
            }
            name = strdup(other.name);
            min = other.min;
            max = other.max;
        }
        return *this;
    }
};

/**
 * @struct Thresholds
 * @brief Aggregates threshold settings for all sensors in the AgriTech Monitor.
 * @details Contains individual Threshold objects for temperature, soil humidity, CO2, light, and
 *          water tank level sensors. Used to centralize threshold management.
 */
struct Thresholds {
    Threshold temp;   /**< Threshold for temperature sensor. */
    Threshold soil;   /**< Threshold for soil humidity sensor. */
    Threshold co2;    /**< Threshold for CO2 level sensor. */
    Threshold light;  /**< Threshold for luminosity sensor. */
    Threshold water;  /**< Threshold for water tank level sensor. */
};

/**
 * @brief Global instance of Thresholds for storing all sensor thresholds.
 * @details Provides a single point of access to threshold settings for all sensors in the system.
 *          Initialized by `initThresholds()` and accessed/modified via other functions.
 */
extern Thresholds thresholds;

/**
 * @brief Initializes the global thresholds structure with default values.
 * @details Sets default min and max threshold values for all sensors (temperature, soil, CO2,
 *          light, water). Called once during system startup to ensure thresholds are properly
 *          configured.
 * @note Default values are specific to the AgriTech Monitor's operational requirements and
 *       should be reviewed for specific use cases.
 */
void initThresholds();

/**
 * @brief Retrieves the Threshold object for a specified sensor.
 * @param name Name of the sensor (e.g., "temp", "soil", "co2", "light", "water").
 * @return Pointer to the Threshold object for the specified sensor, or nullptr if the sensor
 *         name is invalid.
 * @note The returned pointer points to the global `thresholds` structure and should not be freed.
 */
Threshold* getThreshold(const char* name);

/**
 * @brief Updates the threshold values for a specified sensor.
 * @param name Name of the sensor (e.g., "temp", "soil", "co2", "light", "water").
 * @param min New minimum threshold value.
 * @param max New maximum threshold value.
 * @return `true` if the threshold was updated successfully, `false` if the sensor name is invalid
 *         or the values are out of acceptable range.
 * @note Validates that `min` is less than or equal to `max` and that values are within sensor-specific
 *       limits before updating.
 */
bool updateThreshold(const char* name, int min, int max);

/**
 * @brief Prints all threshold values to the Serial console for debugging.
 * @details Outputs the name, minimum, and maximum threshold values for each sensor in the
 *          `thresholds` structure. Useful for verifying threshold settings during development
 *          or troubleshooting.
 * @note Requires Serial communication to be initialized (e.g., via `Serial.begin()`).
 */
void printThresholds();

/**
 * @brief Enables automatic threshold-based operations.
 * @details Sets the global `automatic` flag to `true`, allowing the system to automatically
 *          trigger actuator actions (e.g., fan, pump, light) when sensor readings exceed
 *          their thresholds.
 * @note Ensure that sensor and actuator configurations are correct before enabling automatic
 *       mode to prevent unintended behavior.
 * @param state
 */
void setAutomatic(bool state);

#endif