import express from 'express';
import { createSensor, getlogdata, getSensorData, iddata, tabledatas, timelimit, getdatalimit, getsetlimits, allsetlimit } from '../controllers/sensor.js';

const router = express.Router();

router.get('/insertdata', createSensor);
router.get('/data', getlogdata);
router.get('/sensordata/:id', getSensorData);
router.get('/getdata/:id', iddata);
router.get('/table/:id', tabledatas);
router.get('/limitdata/:id', getdatalimit);
router.get('/setlimitdata/:id', getsetlimits);
router.get('/alllimitdata', allsetlimit);
router.get('/setlimit', timelimit);
router.post('/setlimit', timelimit);




export default router;