import patiendData from '../../data/patients.json';
import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry } from '../types';
import { v4 as uuid } from 'uuid';

const getPatientEntries = (): PatientEntry[] => {
  return patiendData.map(patient => ({ ...patient, entries:[] }));
};

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry[] => {
  return getPatientEntries().map(({ ssn:_, ...keepAttribs }) => keepAttribs );
};

const findPublicPatientEntry = (id: string): PatientEntry | undefined => {
  return getPatientEntries().find(patient => patient.id === id);
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
  findPublicPatientEntry,
  addPatient
};