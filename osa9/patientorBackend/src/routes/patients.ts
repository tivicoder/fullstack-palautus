import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientEntries());
});

router.post('/', (req, res) => {
  console.log('POST body:', req.body);
  const newPatientEntry = patientService.addPatient(req.body);
  res.json(newPatientEntry);
});

export default router;