#ifndef MQTT_HANDLER_H
#define MQTT_HANDLER_H

#include <WiFi.h>              // ✅ For WiFi connection
#include <PubSubClient.h>      // ✅ Standard MQTT client library
#include <Arduino.h>

/**
 * @file mqtt_handler.h
 * @brief Gestion de la communication MQTT avec PubSubClient.
 */

/** Configuration MQTT */
#define MQTT_SERVER "192.168.23.222"     // ✅ Just the IP for PubSubClient
#define MQTT_PORT 1883
#define PUBLISH_INTERVAL 5000          // Intervalle de publication (ms)

/**
 * @brief Initialise le client MQTT.
 */
void initMQTT();

/**
 * @brief Publie les données des capteurs vers le broker MQTT.
 */
void publishSensorData();

/**
 * @brief Vérifie si le client MQTT est connecté.
 * @return true si connecté, false sinon.
 */
bool isMQTTConnected();

#endif
