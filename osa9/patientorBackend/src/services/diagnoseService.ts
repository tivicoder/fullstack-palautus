import diagnoseData from '../../data/diagnoses.json';
import { DiagnoseEntry } from '../types';

const getDiagnoses= (): DiagnoseEntry[] => diagnoseData;

export default {
  getDiagnoses
};