#ifndef WEB_SERVER_H
#define WEB_SERVER_H

#include <LittleFS.h>
#include <ArduinoJson.h>
#include <WebServer.h>

/**
 * @file web_server.h
 * @brief Manages the synchronous web server for the user interface on ESP32.
 * @details This header defines the WebServerManager class, which initializes and handles a synchronous web server
 *          using the ESP32 WebServer library. It provides endpoints for serving static files, sensor readings,
 *          actuator controls, and threshold management for the AgriFlow Monitor.
 * @author [Votre Nom]
 * @date 21 April 2025
 */

class WebServerManager {
private:
    static WebServer server; // Synchronous web server instance for ESP32, running on port 80

    /**
     * @brief Serves a file from LittleFS with the appropriate MIME type.
     * @details Checks if the requested file exists in LittleFS, determines its MIME type based on the file extension,
     *          and streams the file to the client. Sends error responses for missing or inaccessible files.
     * @param path The path to the file in LittleFS (e.g., "/index.html").
     */
    static void serveFile(const String& path);

    /**
     * @brief Handles device control requests (POST /activate).
     * @details Processes a JSON POST request to toggle an actuator (e.g., fan, pump, light). Expects a JSON body
     *          with "device" (string) and "state" (boolean) fields. Updates the actuator state via setActuatorState.
     */
    static void handleDeviceControl();

    /**
     * @brief Handles sensor reading requests (GET /temp, /soil, etc.).
     * @details Retrieves the current reading for a specified sensor and returns it as a JSON response
     *          with a "value" field containing the sensor reading.
     * @param sensor The sensor identifier (e.g., "temperature", "humidity", "co2", "light", "tank").
     */
    static void handleSensorReading(const String& sensor);

    /**
     * @brief Handles threshold update requests (POST /thresholds).
     * @details Processes a JSON POST request to update sensor thresholds. Expects a JSON body with sensor names
     *          (e.g., "temp", "soil") as keys and nested objects containing "min" and "max" values.
     *          Updates thresholds via updateThreshold and reports success or partial failure.
     */
    static void handleThresholds();

    /**
     * @brief Handles threshold fetch requests (GET /thresholds).
     * @details Retrieves the current min and max thresholds for all sensors and returns them as a JSON object
     *          with sensor names as keys and nested objects containing "min" and "max" values.
     */
    static void handleGetThresholds();

    /**
     * @brief Handles actuator state requests (GET /state/fan, /state/pump, etc.).
     * @details Retrieves the current state of a specified actuator and returns it as a JSON response
     *          with a "value" field containing the actuator state (true for ON, false for OFF).
     * @param device The device identifier (e.g., "fan", "pump", "light").
     */
    static void handleActuatorState(const String& device);

public:
    /**
     * @brief Initializes the synchronous web server and LittleFS.
     * @details Mounts the LittleFS filesystem, sets up routes for serving static files, handling sensor readings,
     *          actuator states, and threshold updates, and starts the web server.
     * @return true if initialization succeeds, false if LittleFS fails to mount.
     */
    static bool initWebServer();

    /**
     * @brief Handles incoming client requests.
     * @details Calls handleClient() on the server to process incoming HTTP requests synchronously.
     *          Must be called repeatedly in the main loop to handle client connections.
     */
    static void handleWebServer();
};

#endif