#include "mqtt_handler.h"
#include "sensors.h"
#include "encryption.h"

// 🔧 MQTT client and network client objects
WiFiClient wifiClient;
PubSubClient client(wifiClient);

// Topics to publish
static const char* topics[] = {"co2", "tank", "light", "humidity", "temperature"};
static const int topicCount = sizeof(topics) / sizeof(topics[0]);

// Last publish timestamp
unsigned long lastPublish = 0;

void initMQTT() {
  client.setServer(MQTT_SERVER, MQTT_PORT);
  
  // Try to connect (called in loop, too)
  while (!client.connected()) {
    Serial.print("🔌 Connexion au serveur MQTT...");
    if (client.connect("ESP32Client", nullptr, nullptr, "lwt", 0, false, "I am going offline")) {
      Serial.println("✅ Connecté !");
    } else {
      Serial.print("❌ Échec, code: ");
      Serial.println(client.state());
      delay(2000);
    }
  }
}

void publishSensorData() {
  if (!client.connected()) {
    initMQTT();
  }

  client.loop(); // Maintain connection

  for (int i = 0; i < topicCount; i++) {
    float value = readSensor(topics[i]);
    String cipher = encrypt(String(value, 2));
    String topicPath = "topic/" + String(topics[i]);
    client.publish(topicPath.c_str(), cipher.c_str());
  }

  Serial.println(F("📡 Données des capteurs publiées vers MQTT"));
}

bool isMQTTConnected() {
  return client.connected();
}
