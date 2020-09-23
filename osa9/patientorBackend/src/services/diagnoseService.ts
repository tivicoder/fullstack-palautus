import diagnoseData from '../../data/diagnoses.json';
import { Diagnosis } from '../types';

const getDiagnoses= (): Diagnosis[] => diagnoseData;

export default {
  getDiagnoses
};