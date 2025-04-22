#include "sensors.h"

/**
 * @file sensors.cpp
 * @brief Implémentation des fonctions pour la gestion des capteurs.
 * @author [Votre Nom]
 * @date 21 avril 2025
 */

static DHT_Unified dht(DHT_PIN, DHTTYPE); // Instance du capteur DHT

bool initSensors() {
  dht.begin();
  // No need for pin mode in an esp 32
  // Vérification du capteur DHT
  sensors_event_t event;
  dht.temperature().getEvent(&event);
  /*if (isnan(event.temperature)) {
    Serial.println(F("Erreur d'initialisation du capteur DHT22 !"));
    return false;
  }*/
  Serial.println(F("Capteur DHT opérationnel"));
  return true;
}

float readSensor(const String& sensor) {
  float value = 0;
  if (sensor == "co2") {
    float mq_raw = analogRead(MQ_PIN);
    float mq_voltage = (mq_raw * 3.3) / 4095.0;
    Serial.print(F("MQ (CO2): "));
    Serial.print(mq_raw);
    Serial.print(F(" | Tension: "));
    Serial.print(mq_voltage);
    Serial.println(F(" V"));
    if (mq_voltage < 0.1 || mq_voltage > 3.2) {
      Serial.println(F("⚠️ MQ CO2 non détecté ou tension anormale"));
    } else {
      Serial.println(F("🔌 MQ CO2 détecté"));
    }
    value = mq_voltage; // Simplifié, calibration réelle nécessaire
  } else if (sensor == "tank") {
    int state = analogRead(TANK_PIN);
    value = (state / 10000) * 100; // Notons que l'on dois remplacer 10000 par un seuils
    Serial.print(F("Niveau du réservoir: "));
    Serial.print(value);
    Serial.println(F("%"));
  } else if (sensor == "light") {
    float lecture = analogRead(PHOTO_PIN);
    float v = (lecture * 3.3) / 4095.0;
    value = (5013 * v + 2532.5) / (2.5 - v);
    if (value < 0) value = -value;
    Serial.print(F("Luminosité: "));
    Serial.print(value);
    Serial.println(F(" lx"));
  } else if (sensor == "humidity") {
    value = analogRead(YL69_AO_PIN);
    value  = (value / 4096) * 100; // set a default value replace with sensor limit
    Serial.print(F("Humidité du sol: "));
    Serial.print(value);
    Serial.println(F("%"));
  } else if (sensor == "temperature") {
    sensors_event_t event;
    dht.temperature().getEvent(&event);
    if (isnan(event.temperature)) {
      Serial.println(F("Erreur de lecture de la température !"));
    } else {
      Serial.print(F("Température: "));
      Serial.print(event.temperature);
      Serial.println(F("°C"));
      value = event.temperature;
    }
  }
  return isnan(value) ? 0 : value;
}