import { Patient, NonSensitivePatientEntry, NewPatientEntry, Entry, NewEntry } from '../types';
import { v4 as uuid } from 'uuid';
import patients from '../../data/patients';

const getPatientEntries = (): Patient[] => {
  return patients;
};

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ ssn:_, ...keepAttribs }) => keepAttribs );
};

const findPublicPatientEntry = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

const addPatient = (data: NewPatientEntry): Patient => {
  const newEntry = {
    id: uuid(),
    ...data
  };
  patients.push(newEntry);
  return newEntry;
};

const addEntry = (userId: string, data: NewEntry): Entry => {
  const patient = patients.find(patient => patient.id === userId);
  if (!patient) {
    throw new Error(`Could not find patient with id ${userId}`);
  }
  const addedEntry: Entry = {
    ...data,
    id: uuid()
  };

  patient.entries.push(addedEntry);
  return addedEntry;
};

export default {
  getPatientEntries,
  getNonSensitivePatientEntries,
  findPublicPatientEntry,
  addPatient,
  addEntry
};