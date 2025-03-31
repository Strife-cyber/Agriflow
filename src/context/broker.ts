import mqtt from "mqtt";
import { useEffect, useState } from "react"

interface BrokerProps {
    url: string,
    topic: string
}

const useBroker = ({ url, topic }: BrokerProps) => {
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const client = mqtt.connect(url);

        client.on("connect", () => {
            console.log("Connected to broker");
            client.subscribe(topic, (err) => {
                if (!err) {
                    console.log(`Subscribed to topic: ${topic}`);
                }
            });
        });

        client.on("message", (receivedTopic, payload) => {
            if (receivedTopic == topic) {
                setMessage(JSON.parse(payload.toString()));
            }
        });

        return () => {
            client.end();
        }
    }, [url, topic]);

    return message;
}

export default useBroker;
