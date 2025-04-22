#ifndef THRESHOLD_H
#define THRESHOLD_H

#include <cstring>

/**
 * @file threshold.h
 * @brief Stores thresholds for sensors (temperature, soil, CO2, light, water) for Arduino use.
 * @author Djiatsa
 * @date 21 April 2025
 */

struct Threshold {
    const char* name;
    int min;
    int max;

    // Constructor
    Threshold(const char* nameVal = "", int minVal = 0, int maxVal = 0) 
        : name(strdup(nameVal)), min(minVal), max(maxVal) {}

    // Copy constructor
    Threshold(const Threshold& other) 
        : name(strdup(other.name)), min(other.min), max(other.max) {}

    // Destructor to free dynamically allocated memory
    ~Threshold() {
        if (name) {
            free((void*)name);  // Free the strdup'd name
        }
    }

    // Assignment operator
    Threshold& operator=(const Threshold& other) {
        if (this != &other) {
            // Free current memory
            if (name) {
                free((void*)name);
            }

            // Copy new data
            name = strdup(other.name);
            min = other.min;
            max = other.max;
        }
        return *this;
    }
};

struct Thresholds {
    Threshold temp;
    Threshold soil;
    Threshold co2;
    Threshold light;
    Threshold water;
};

extern Thresholds thresholds;

void initThresholds();
Threshold* getThreshold(const char* name);
bool updateThreshold(const char* name, int min, int max);
void printThresholds();

#endif
