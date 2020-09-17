import express from 'express';
import diagnoseData from '../../data/diagnoses.json';
import { DiagnoseEntry } from '../types';

const diagnoses: DiagnoseEntry[] = diagnoseData;

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnoses);
});

export default router;