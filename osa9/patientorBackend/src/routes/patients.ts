import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientEntries());
});

router.get('/:id', (req, res) => {
  console.log('finding patient: ', req.params.id);
  const patient = patientService.findPublicPatientEntry(req.params.id);
  if (!patient) {
    res.status(400).send('patient not found');
  } else {
    res.json(patient);
  }
});

router.post('/', (req, res) => {
  console.log('POST body:', req.body);
  try {
    const newPatientEntry = patientService.addPatient(toNewPatientEntry(req.body));
    res.json(newPatientEntry);
  } catch (e) {
    if (!(e instanceof Error)){
      throw new Error('wrong error type');
    }
    res.status(400).send(e.message);
  }
});

export default router;