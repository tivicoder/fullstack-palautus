import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientEntries());
});

router.post('/', (req, res) => {
  console.log('POST body:', req.body);
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    patientService.addPatient(newPatientEntry);
    res.json(newPatientEntry);
  } catch (e) {
    if (!(e instanceof Error)){
      throw new Error('wrong error type');
    }
    res.status(400).send(e.message);
  }
});

export default router;