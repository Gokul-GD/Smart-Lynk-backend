import express from 'express';
import dotenv from 'dotenv';
import WeatherRoutes from './Routes/WeatherRoutes.js';
import ConnectDB from './config/db.js';
import router from './Routes/authRoutes.js';
import cors from 'cors';
import DeviceRouter from './Routes/deviceRoute.js';


dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

ConnectDB();

// for routes

app.use('/api/weather', WeatherRoutes);
app.use('/api/auth', router)
app.use('/api/devices', DeviceRouter);

// app.get('/', (req, res) => res.send('API is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Your Server running on ${PORT}`));