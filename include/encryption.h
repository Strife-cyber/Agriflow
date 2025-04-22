#ifndef ENCRYPTION_H
#define ENCRYPTION_H

#include <AESLib.h>
#include <Arduino.h>

/**
 * @file encryption.h
 * @brief Gestion du chiffrement des données.
 * @author [Votre Nom]
 * @date 21 avril 2025
 */

/**
 * @brief Chiffre un message en utilisant AES.
 * @param msg Message à chiffrer.
 * @return Message chiffré sous forme de chaîne hexadécimale.
 */
String encrypt(const String& msg);

#endif