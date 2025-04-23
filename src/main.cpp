#include "sensors.h"
#include "actuators.h"
#include "threshold.h"
#include "web_server.h"
#include "mqtt_handler.h"

/**
 * @file main.cpp
 * @brief Main program for managing the AgriFlow IoT system.
 * @details Initializes WiFi, sensors, actuators, web server, and MQTT client.
 *          Periodically checks the web server, maintains WiFi connection, and publishes sensor data via MQTT.
 * @author [Votre Nom]
 * @date 21 April 2025
 */

/** WiFi Configuration */
const char* ssid = "TECNO CAMON 20";
const char* pass = "2500*dark";

/** Non-blocking Timers */
static unsigned long lastPublish = 0;
static unsigned long lastServerCheck = 0;
static const unsigned long serverInterval = 10; // ms

/**
 * @brief Prints the WiFi connection status.
 * @details Displays the SSID, IP address, and signal strength (RSSI) to the Serial monitor.
 */
static void printWifiStatus() {
  Serial.print(F("Connecté au SSID: "));
  Serial.println(WiFi.SSID());
  Serial.print(F("Adresse IP: "));
  Serial.println(WiFi.localIP());
  Serial.print(F("Force du signal (RSSI): "));
  Serial.print(WiFi.RSSI());
  Serial.println(F(" dBm"));
  Serial.print(F("Ouvrir http://"));
  Serial.println(WiFi.localIP());
}

void setup() {
  Serial.begin(115200);

  // WiFi Connection
  Serial.print(F("Connexion au WiFi "));
  Serial.println(ssid);
  WiFi.setHostname("AgriFlowESP32"); // Set a unique hostname
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, pass);

  unsigned long startTime = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - startTime < 10000) {
    delay(500);
    Serial.print(".");
  }
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println(F("\nÉchec de la connexion ! Redémarrage..."));
    ESP.restart();
  }
  Serial.println(F("\nWiFi connecté"));
  printWifiStatus();

  // Initialize Modules
  if (!initSensors()) {
    Serial.println(F("Échec de l'initialisation des capteurs. Redémarrage..."));
    ESP.restart();
  }
  initActuators();
  if (!WebServerManager::initWebServer()) { // Fixed: Added class qualification
    Serial.println(F("Échec de l'initialisation du serveur web. Redémarrage..."));
    ESP.restart();
  }
  
  initMQTT();
  initThresholds();
}

void loop() {
  unsigned long now = millis();

  // Manage Web Server
  if (now - lastServerCheck >= serverInterval) {
    WebServerManager::handleWebServer(); // Fixed: Added class qualification
    lastServerCheck = now;
  }

  // Check WiFi Connection
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println(F("WiFi déconnecté, tentative de reconnexion..."));
    WiFi.reconnect();
    unsigned long reconnectStart = millis();
    while (WiFi.status() != WL_CONNECTED && millis() - reconnectStart < 10000) {
      delay(500);
      Serial.print(".");
    }
    if (WiFi.status() != WL_CONNECTED) {
      Serial.println(F("\nÉchec de la reconnexion ! Redémarrage..."));
      ESP.restart();
    }
    Serial.println(F("\nReconnecté au WiFi"));
    printWifiStatus();
  }

  // Publish MQTT Data
  if (isMQTTConnected() && (now - lastPublish >= PUBLISH_INTERVAL)) {
    publishSensorData();
    lastPublish = now;
  }
}