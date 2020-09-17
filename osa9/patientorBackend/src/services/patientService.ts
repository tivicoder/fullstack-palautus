import patiendData from '../../data/patients.json';
import { PatientEntry, NonSensitivePatientEntry } from '../types';

const getPatientEntries = (): PatientEntry[] => {
  return patiendData;
};

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry[] => {
  return patiendData.map(({ ssn:_, ...keepAttribs }) => keepAttribs );
};

export default {
  getPatientEntries,
  getNonSensitivePatientEntries
};