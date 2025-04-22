#include "encryption.h"

/**
 * @file encryption.cpp
 * @brief Implémentation des fonctions de chiffrement.
 * @author [Votre Nom]
 * @date 21 avril 2025
 */

static byte aes_key[] = {0x2b, 0x7e, 0x15, 0x16, 0x28, 0xae, 0xd2, 0xa6,
                         0xab, 0xf7, 0x03, 0x05, 0x30, 0x4f, 0x7e, 0x1f};
static byte aes_iv[] = {0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
                        0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f};
static AESLib aesLib;

String encrypt(const String& msg) {
  int blockSize = 16;
  int inputLen = msg.length();
  int paddedLen = ((inputLen + blockSize - 1) / blockSize) * blockSize;
  char paddedMsg[paddedLen];
  memcpy(paddedMsg, msg.c_str(), inputLen);
  int padding = paddedLen - inputLen;
  for (int i = inputLen; i < paddedLen; i++) {
    paddedMsg[i] = (char)padding; // PKCS#7 padding
  }

  byte encrypted[paddedLen];
  byte iv[16];
  memcpy(iv, aes_iv, 16);
  aesLib.encrypt((byte*)paddedMsg, paddedLen, encrypted, aes_key, 128, iv);

  String encryptedStr = "";
  for (int i = 0; i < paddedLen; i++) {
    if (encrypted[i] < 16) encryptedStr += "0";
    encryptedStr += String(encrypted[i], HEX);
  }
  return encryptedStr;
}