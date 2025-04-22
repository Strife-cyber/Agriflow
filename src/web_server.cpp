#include "sensors.h"
#include "actuators.h"
#include "threshold.h"
#include "web_server.h"

#define JSON_DOC_SIZE 200

/**
 * @file web_server.cpp
 * @brief Implementation of the synchronous web server for ESP32.
 * @details This file implements the WebServerManager class, providing a synchronous web server using the ESP32 WebServer library.
 *          It serves static files from LittleFS, handles sensor readings, actuator states, and threshold updates via a RESTful API.
 *          The server supports endpoints for controlling devices, fetching sensor data, and managing thresholds for the AgriFlow Monitor.
 * @author [Votre Nom]
 * @date 21 April 2025
 */

// Static member definition for the WebServer instance
WebServer WebServerManager::server(80);

/**
 * @brief Serves a file from LittleFS with the appropriate MIME type.
 * @details Checks if the requested file exists in LittleFS, determines its MIME type based on the file extension,
 *          and streams the file to the client. Sends a 500 error if the file cannot be opened or a 404 if the file is not found.
 * @param path The path to the file in LittleFS (e.g., "/index.html").
 */
void WebServerManager::serveFile(const String& path) {
  // Check if the file exists in LittleFS
  if (LittleFS.exists(path)) {
    File file = LittleFS.open(path, "r");
    if (!file) {
      // Send 500 error if the file cannot be opened
      server.send(500, "text/plain", "Erreur lors de l'ouverture du fichier");
      return;
    }

    // Determine the MIME type based on file extension
    String contentType = "text/plain";
    if (path.endsWith(".html")) contentType = "text/html";
    else if (path.endsWith(".css")) contentType = "text/css";
    else if (path.endsWith(".js")) contentType = "application/javascript";
    else if (path.endsWith(".png")) contentType = "image/png";
    else if (path.endsWith(".jpg") || path.endsWith(".jpeg")) contentType = "image/jpeg";
    else if (path.endsWith(".gif")) contentType = "image/gif";
    else if (path.endsWith(".ico")) contentType = "image/x-icon";
    else if (path.endsWith(".json")) contentType = "application/json";
    else if (path.endsWith(".pdf")) contentType = "application/pdf";
    else if (path.endsWith(".svg")) contentType = "image/svg+xml";
    else if (path.endsWith(".woff2")) contentType = "font/woff2";
    else if (path.endsWith(".ttf")) contentType = "font/ttf";
    else if (path.endsWith(".otf")) contentType = "font/otf";

    // Stream the file to the client with the appropriate MIME type
    server.streamFile(file, contentType);
    file.close();
  } else {
    // Send 404 error if the file is not found
    server.send(404, "text/plain", "Fichier non trouvé");
  }
}

/**
 * @brief Handles device control requests (POST /activate).
 * @details Processes a JSON POST request to toggle an actuator (e.g., fan, pump, light). Expects a JSON body
 *          with "device" (string) and "state" (boolean) fields. Calls setActuatorState to update the actuator state.
 *          Sends a 200 response on success or a 400 response for invalid JSON or unknown devices.
 */
void WebServerManager::handleDeviceControl() {
  // Retrieve the JSON body from the POST request
  String jsonBody = server.arg("plain");
  if (jsonBody.isEmpty()) {
    server.send(400, "application/json", "{\"error\": \"Aucun corps JSON reçu\"}");
    return;
  }

  // Parse the JSON body
  JsonDocument doc;
  DeserializationError error = deserializeJson(doc, jsonBody);
  if (error) {
    server.send(400, "application/json", "{\"error\": \"Format JSON invalide\"}");
    return;
  }

  // Extract device and state from JSON
  String device = doc["device"];
  bool state = doc["state"];

  // Update actuator state and send response
  if (setActuatorState(device, state)) {
    server.send(200, "application/json", "{\"status\": \"État de l'appareil mis à jour\"}");
  } else {
    server.send(400, "application/json", "{\"error\": \"Appareil inconnu\"}");
  }
}

/**
 * @brief Handles sensor reading requests (GET /temp, /soil, etc.).
 * @details Retrieves the current reading for a specified sensor using readSensor and returns it as a JSON response
 *          with a "value" field containing the sensor reading. Sends a 200 response with the sensor value.
 * @param sensor The sensor identifier (e.g., "temperature", "humidity", "co2", "light", "tank").
 */
void WebServerManager::handleSensorReading(const String& sensor) {
  // Create JSON document for response
  JsonDocument doc;
  float value = readSensor(sensor); // Get sensor reading
  doc["value"] = value;

  // Serialize JSON and send response
  String jsonResponse;
  serializeJson(doc, jsonResponse);
  server.send(200, "application/json", jsonResponse);
}

/**
 * @brief Handles threshold update requests (POST /thresholds).
 * @details Processes a JSON POST request to update sensor thresholds. Expects a JSON body with sensor names
 *          (e.g., "temp", "soil") as keys and nested objects containing "min" and "max" values.
 *          Calls updateThreshold for each sensor and sends a 200 response on full success or 207 on partial failure.
 */
void WebServerManager::handleThresholds() {
  // Retrieve the JSON body from the POST request
  String jsonBody = server.arg("plain");
  if (jsonBody.isEmpty()) {
    server.send(400, "application/json", "{\"error\": \"Aucun corps JSON reçu\"}");
    return;
  }

  // Parse the JSON body
  JsonDocument doc;
  DeserializationError error = deserializeJson(doc, jsonBody);
  if (error) {
    server.send(400, "application/json", "{\"error\": \"Format JSON invalide\"}");
    return;
  }

  // List of sensors to check for threshold updates
  const char* sensors[] = {"temp", "soil", "co2", "light", "water"};
  bool allUpdated = true;

  // Update thresholds for each sensor present in the JSON
  for (const char* sensor : sensors) {
    if (!doc[sensor].isNull()) {
      JsonObject obj = doc[sensor];
      int minVal = obj["min"];
      int maxVal = obj["max"];
      if (!updateThreshold(sensor, minVal, maxVal)) {
        allUpdated = false; // Track partial failures
      }
    }
  }

  // Send response based on update success
  if (allUpdated) {
    server.send(200, "application/json", "{\"status\": \"Seuils mis à jour avec succès\"}");
  } else {
    server.send(207, "application/json", "{\"status\": \"Certains seuils n'ont pas pu être mis à jour\"}");
  }
}

/**
 * @brief Handles threshold fetch requests (GET /thresholds).
 * @details Retrieves the current min and max thresholds for all sensors using getThreshold and returns them as a JSON object
 *          with sensor names as keys and nested objects containing "min" and "max" values. Sends a 200 response.
 */
void WebServerManager::handleGetThresholds() {
  // Create JSON document for response
  JsonDocument doc;

  // Retrieve and add thresholds for each sensor
  Threshold* t;

  t = getThreshold("temp");
  JsonObject temp = doc["temp"].to<JsonObject>();
  temp["min"] = t->min;
  temp["max"] = t->max;

  t = getThreshold("soil");
  JsonObject soil = doc["soil"].to<JsonObject>();
  soil["min"] = t->min;
  soil["max"] = t->max;

  t = getThreshold("co2");
  JsonObject co2 = doc["co2"].to<JsonObject>();
  co2["min"] = t->min;
  co2["max"] = t->max;

  t = getThreshold("light");
  JsonObject light = doc["light"].to<JsonObject>();
  light["min"] = t->min;
  light["max"] = t->max;

  t = getThreshold("water");
  JsonObject water = doc["water"].to<JsonObject>();
  water["min"] = t->min;
  water["max"] = t->max;

  // Serialize JSON and send response
  String jsonResponse;
  serializeJson(doc, jsonResponse);
  server.send(200, "application/json", jsonResponse);
}

/**
 * @brief Handles actuator state requests (GET /state/fan, /state/pump, etc.).
 * @details Retrieves the current state of a specified actuator using getActuatorState and returns it as a JSON response
 *          with a "value" field containing the actuator state (true for ON, false for OFF). Sends a 200 response.
 * @param device The device identifier (e.g., "fan", "pump", "light").
 */
void WebServerManager::handleActuatorState(const String& device) {
  // Create JSON document for response
  JsonDocument doc;
  doc["value"] = getActuatorState(device); // Get actuator state

  // Serialize JSON and send response
  String jsonResponse;
  serializeJson(doc, jsonResponse);
  server.send(200, "application/json", jsonResponse);
}

/**
 * @brief Initializes the synchronous web server and LittleFS.
 * @details Mounts the LittleFS filesystem, configures routes for serving static files, handling sensor readings,
 *          actuator states, and threshold updates, and starts the web server. Logs initialization status to Serial.
 * @return true if initialization succeeds, false if LittleFS fails to mount.
 */
bool WebServerManager::initWebServer() {
  // Initialize LittleFS filesystem
  if (!LittleFS.begin(true)) {
    Serial.println(F("Erreur d'initialisation de LittleFS"));
    return false;
  }
  Serial.println(F("LittleFS initialisé avec succès"));

  // Define route for serving the root (index.html)
  server.on("/", HTTP_GET, []() {
    WebServerManager::serveFile("/index.html");
  });

  // Define route for fetching thresholds
  server.on("/thresholds", HTTP_GET, WebServerManager::handleGetThresholds);

  // Define route for updating thresholds
  server.on("/thresholds", HTTP_POST, WebServerManager::handleThresholds);

  // Define route for device control
  server.on("/activate", HTTP_POST, WebServerManager::handleDeviceControl);

  // Define routes for sensor readings
  server.on("/temp", HTTP_GET, []() {
    WebServerManager::handleSensorReading("temperature");
  });
  server.on("/soil", HTTP_GET, []() {
    WebServerManager::handleSensorReading("humidity");
  });
  server.on("/co2", HTTP_GET, []() {
    WebServerManager::handleSensorReading("co2");
  });
  server.on("/light", HTTP_GET, []() {
    WebServerManager::handleSensorReading("light");
  });
  server.on("/water", HTTP_GET, []() {
    WebServerManager::handleSensorReading("tank");
  });

  // Define routes for actuator states
  server.on("/state/fan", HTTP_GET, []() {
    WebServerManager::handleActuatorState("fan");
  });
  server.on("/state/pump", HTTP_GET, []() {
    WebServerManager::handleActuatorState("pump");
  });
  server.on("/state/light", HTTP_GET, []() {
    WebServerManager::handleActuatorState("light");
  });

  // Define handler for 404 errors (attempt to serve files from LittleFS)
  server.onNotFound([]() {
    String path = WebServerManager::server.uri();
    if (path == "/") {
      path = "/index.html"; // Default to index.html for root
    }
    WebServerManager::serveFile(path);
  });

  // Start the web server
  server.begin();
  Serial.println(F("Serveur web synchrone démarré"));
  return true;
}

/**
 * @brief Handles incoming client requests.
 * @details Calls the server's handleClient() method to process incoming HTTP requests synchronously.
 *          This function must be called repeatedly in the main loop to ensure continuous handling of client connections.
 */
void WebServerManager::handleWebServer() {
  server.handleClient();
}