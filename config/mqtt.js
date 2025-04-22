import mqtt from 'mqtt';

const client = mqtt.connect("mqtts://h11fa00a.ala.asia-southeast1.emqxsl.com", {
  port: 8883,
  username: "iotuser",
  password: "Projectgr123",
});

client.on("connect", () => {
  console.log("✅ Connected to MQTT broker");
});

export default client;
