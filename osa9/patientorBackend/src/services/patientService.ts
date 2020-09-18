import patiendData from '../../data/patients.json';
import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry } from '../types';
import { v4 as uuid } from 'uuid';

const getPatientEntries = (): PatientEntry[] => {
  return patiendData;
};

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry[] => {
  return patiendData.map(({ ssn:_, ...keepAttribs }) => keepAttribs );
};

const addPatient = (data: NewPatientEntry): PatientEntry => {
  const newEntry = {
    id: uuid(),
    ...data
  };
  patiendData.push(newEntry);
  return newEntry;
};

export default {
  getPatientEntries,
  getNonSensitivePatientEntries,
  addPatient
};