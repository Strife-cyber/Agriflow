import mqtt from "mqtt";
import axios from "axios";
import crypto from "crypto";

const BROKER_URL = "mqtt://localhost";
const API_BASE_URL = "http://localhost:3000/api";

// Mapping topics to API routes
const TOPIC_API_MAP = {
  "topic/co2": "co2levelreading",
  "topic/tank": "watertankreading",
  "topic/light": "lightreading",
  "topic/humidity": "soilhumidityreading",
  "topic/temperature": "temperaturereading",
};

const key = Buffer.from([
  0x2b, 0x7e, 0x15, 0x16, 0x28, 0xae, 0xd2, 0xa6,
  0xab, 0xf7, 0x03, 0x05, 0x30, 0x4f, 0x7e, 0x1f
]);

const iv = Buffer.from([
  0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
  0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f
]);

const mqttClient = mqtt.connect(BROKER_URL);

// Subscribe to all topics on connect
mqttClient.on("connect", () => {
  console.log("✅ Connected to MQTT broker");

  Object.keys(TOPIC_API_MAP).forEach((topic) => {
    mqttClient.subscribe(topic, (err) => {
      if (err) {
        console.error(`❌ Subscription error for ${topic}:`, err);
      } else {
        console.log(`📡 Subscribed to ${topic}`);
      }
    });
  });
});

// Handle incoming messages and send to corresponding API
mqttClient.on("message", async (topic, messageBuffer) => {
  try {
    const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    let decrypted = decipher.update(messageBuffer.toString(), 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    const message = decrypted;

    const endpoint = TOPIC_API_MAP[topic];

    if (!endpoint) {
      console.warn(`⚠️ No API route mapped for topic: ${topic}`);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/${endpoint}`, {
        value: message,
      });

      if (response.status === 200 || response.status === 201) {
        console.log(`✅ Posted to ${endpoint}: ${message}`);
      } else {
        console.warn(`⚠️ Unexpected response for ${endpoint}:`, response.status);
      }
    } catch (error) {
      console.error(`❌ Failed to post to ${endpoint}:`, error.message);
    }
  } catch (err) {
    console.error(`❌ Decryption failed for topic: ${topic}`, err.message);
  }
});

// Handle errors and connection close
mqttClient.on("error", (err) => {
  console.error("❌ MQTT Error:", err.message);
});

mqttClient.on("close", () => {
  console.log("🔌 MQTT connection closed");
});
