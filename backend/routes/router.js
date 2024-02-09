import express from 'express';
import { createSensor, getlogdata, getSensorData, iddata } from '../controllers/sensor.js';

const router = express.Router();

router.get('/insertdata', createSensor);
router.get('/data', getlogdata);
router.get('/sensordata/:id', getSensorData);
router.get('/getdata/:id', iddata);

export default router;