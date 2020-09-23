import { NewPatientEntry, Gender } from './types';

const isString = (text: unknown): text is string => {
  return text && (typeof text ==='string' || text instanceof String);
};

const parseName = (text: unknown): string => {
  if (!isString(text)) {
    throw new Error('name not given or invalid');
  }
  return text;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !Date.parse(date)) {
    throw new Error('date not given or invalid');
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('ssn not given or invalid');
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!Object.values(Gender).includes(gender as Gender)) {
    throw new Error('gender not given or invalid');
  }
  return gender as Gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('occupation not given or invalid');
  }
  return occupation;
};

export const toNewPatientEntry =
  ({ name, dateOfBirth, ssn, gender, occupation }
  :{ name: unknown, dateOfBirth: unknown, ssn: unknown, gender:unknown, occupation:unknown})
  : NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: []
  };
  return newEntry;
};