#ifndef ACTUATORS_H
#define ACTUATORS_H

#include <Arduino.h>

/**
 * @file actuators.h
 * @brief Gestion des actionneurs (ventilateur, pompe, lumière).
 * @author [Djiatsa Dunamis]
 * 
 * @date 21 avril 2025
 */

/** Pins des actionneurs */
#define FAN_PIN 25    // Pin du ventilateur
#define PUMP_PIN 26   // Pin de la pompe
#define LIGHT_PIN 27  // Pin de la lumière

/**
 * @brief Initialise les actionneurs.
 */
void initActuators();

/**
 * @brief Définit l'état d'un actionneur.
 * @param device Nom de l'actionneur ("fan", "pump", "light").
 * @param state État à définir (true = ON, false = OFF).
 * @return true si l'actionneur est valide, false sinon.
 */
bool setActuatorState(const String& device, bool state);

/**
 * @brief Obtient l'état actuel d'un actionneur.
 * @param device Nom de l'actionneur ("fan", "pump", "light").
 * @return État actuel (true = ON, false = OFF), ou false si invalide.
 */
bool getActuatorState(const String& device);

#endif