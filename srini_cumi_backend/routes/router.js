import express from 'express';
import { createSensor, iddata, getlogdata, getSensorData, tabledatas, timelimit, getdatalimit, getsetlimits, allsetlimit, idallsetlimit, exceldata, userData, userRegister, rawdataapi } from '../controllers/sensor.js';

const router = express.Router();

router.get('/insertData', createSensor);
router.get('/data', getlogdata);
router.get('/sensordata/:id', getSensorData);
router.get('/getdata/:id', iddata);
router.get('/table/:id', tabledatas);
router.get('/limitdata/:id', getdatalimit);
router.get('/setlimitdata/:id', getsetlimits);
router.get('/alllimitdata', allsetlimit);
router.get('/idlimit/:id', idallsetlimit);
router.get('/setlimit', timelimit);
router.get('/dataexcel', exceldata);
router.get('/rawdata',rawdataapi );

router.post('/setlimit', timelimit);
//register
router.post("/register", userRegister);
//login
router.post("/login", userData);


export default router;