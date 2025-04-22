#include "actuators.h"

/**
 * @file actuators.cpp
 * @brief Implémentation des fonctions pour la gestion des actionneurs.
 * @author [Votre Nom]
 * @date 21 avril 2025
 */

static bool fanState = false;
static bool pumpState = false;
static bool lightState = false;

void initActuators() {
  pinMode(FAN_PIN, OUTPUT);
  pinMode(PUMP_PIN, OUTPUT);
  pinMode(LIGHT_PIN, OUTPUT);
  digitalWrite(FAN_PIN, LOW);
  digitalWrite(PUMP_PIN, LOW);
  digitalWrite(LIGHT_PIN, LOW);
}

bool setActuatorState(const String& device, bool state) {
  if (device == "fan") {
    fanState = state;
    digitalWrite(FAN_PIN, state ? HIGH : LOW);
    Serial.println("État ventilateur: " + String(state ? "ON" : "OFF"));
    return true;
  } else if (device == "pump") {
    pumpState = state;
    digitalWrite(PUMP_PIN, state ? HIGH : LOW);
    Serial.println("État pompe: " + String(state ? "ON" : "OFF"));
    return true;
  } else if (device == "light") {
    lightState = state;
    digitalWrite(LIGHT_PIN, state ? HIGH : LOW);
    Serial.println("État lumière: " + String(state ? "ON" : "OFF"));
    return true;
  }
  return false;
}

bool getActuatorState(const String& device) {
  if (device == "fan") return fanState;
  if (device == "pump") return pumpState;
  if (device == "light") return lightState;
  return false;
}