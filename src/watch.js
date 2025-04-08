import mqtt from "mqtt";
import axios from "axios";

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
  const message = messageBuffer.toString();
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
});

// Handle errors and connection close
mqttClient.on("error", (err) => {
  console.error("❌ MQTT Error:", err.message);
});

mqttClient.on("close", () => {
  console.log("🔌 MQTT connection closed");
});
