#include "sensors.h"
#include "actuators.h"
#include "threshold.h"

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
    value = mq_voltage * 400; // Simplifié, calibration réelle nécessaire
    Threshold* co2Thresh = getThreshold("co2");
    Serial.print("Valeur co2: ");
    Serial.println(value);

    if (value > co2Thresh->max) setActuatorState("fan", true); // Allumer ventillateur trops de co2
    if (value < co2Thresh->min) setActuatorState("fan", false); // Eteindre le ventillateur gaz trops petit
  } else if (sensor == "tank") {
    int state = analogRead(TANK_PIN);
    Threshold* tankThresh = getThreshold("water");
    value = (state / tankThresh->max) * 100; // Notons que l'on dois remplacer 10000 par un seuils
    Serial.print(F("Niveau du réservoir: "));
    Serial.print(value);
    Serial.println(F("%"));
  } else if (sensor == "light") {
    Threshold* lightThresh = getThreshold("light");
    float lecture = analogRead(PHOTO_PIN);
    float v = (lecture * 3.3) / 4095.0;
    value = (3.3 - v) * 10000 / v;
    value = lightThresh->max / (value / 1000.0);
    if (value < 0) value = -value;
    Serial.print(F("Luminosité: "));
    Serial.print(value);
    Serial.println(F(" lx"));
    if (value < lightThresh->min) setActuatorState("light", true);  // allumer la lumiere il est trop obscure
    if (value > lightThresh->max) setActuatorState("light", false); // lumiere trop intense eteindre la lumiere
  } else if (sensor == "humidity") {
    value = analogRead(YL69_AO_PIN);
    Threshold* humidityThresh = getThreshold("soil");
    value = 100.0 - ((value / 4095.0) * 100.0);  // Wet = higher % remplacer la valeur par defaut ici qui est de 4096
    Serial.print(F("Humidité du sol: "));
    Serial.print(value);
    Serial.println(F("%"));

    if (value < humidityThresh->min) setActuatorState("pump", true); // Allumer la pompe car le sol est trop rigide
    if (value > humidityThresh->max) setActuatorState("pump", false); // Eteindre la pompe car le sol est trop mouiller
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
      Threshold* tempThresh = getThreshold("temp");

      if (value > tempThresh->max) setActuatorState("fan", true); // Allumer le ventillateur car il fait trops chaud
      if (value < tempThresh->min) setActuatorState("fan", false); // Eteindre le ventillateur car il fait trops froid
    }
  }
  return isnan(value) ? 0 : value;
}