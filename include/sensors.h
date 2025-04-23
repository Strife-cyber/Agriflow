#ifndef SENSORS_H
#define SENSORS_H

#include <DHT.h>
#include <DHT_U.h>
#include <Arduino.h>

/**
 * @file sensors.h
 * @brief Gestion des capteurs pour la lecture des données environnementales.
 * @author [Votre Nom]
 * @date 21 avril 2025
 */

/** Type de capteur DHT utilisé */
#define DHTTYPE DHT22

/** Pins des capteurs */
#define DHT_PIN 15        // Pin pour le capteur DHT
#define PHOTO_PIN 33     // Pin pour la photorésistance
#define MQ_PIN 32        // Pin pour le capteur MQ (CO2)
#define TANK_PIN 34      // Pin pour le niveau du réservoir (changé pour éviter conflit)
#define YL69_AO_PIN 35   // Pin analogique pour l'humidité du sol

/**
 * @brief Initialise les capteurs.
 * @return true si l'initialisation réussit, false sinon.
 */
bool initSensors();

/**
 * @brief Lit la valeur d'un capteur spécifié.
 * @param sensor Nom du capteur ("co2", "tank", "light", "humidity", "temperature").
 * @return Valeur lue (float), ou 0 en cas d'erreur.
 */
float readSensor(const String& sensor);

#endif