import express from 'express';
import client from '../config/mqtt.js';
import Usage from '../models/Usage.js';

const DeviceRouter = express.Router();

DeviceRouter.post('/control', (req, res) => {
  const { device, status } = req.body;
  console.log(`Received control request: ${device} -> ${status}`);

  let topic = "";
  if (device === "light") topic = "home/light";
  else if (device === "fan") topic = "home/fan";
  else return res.status(400).send("Invalid device");

  client.publish(topic, status,async (err) => {
    if (err) {
      console.error("MQTT Publish Error:", err);
      return res.status(500).send("Failed to publish message");
    } 
    try {
        const usage = await Usage.create({ device, status });
        
      } catch (logErr) {
        console.error("Usage log error:", logErr);
      }
  
      res.send(`✅ ${device} turned ${status}`);



  });
});

DeviceRouter.get('/usage', async (req, res) => {
    try {
      const history = await Usage.find().sort({ timestamp: 1 });
      res.json(history);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching usage data' });
    }
  });


export default DeviceRouter;
