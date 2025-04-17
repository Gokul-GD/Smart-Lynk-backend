import express from 'express';
import  getWeather  from '../controller/weatherController.js';

const router = express.Router();

router.get('/:city', getWeather);

export default router;