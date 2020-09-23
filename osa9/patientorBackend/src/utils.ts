import { NewPatientEntry, Gender, NewEntry, HealthCheckRating, Diagnosis } from './types';

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

const parseStringArg = (text: unknown, argName: string) : string => {
  if (!isString(text)) {
    throw new Error(`${argName} not given or invalid`);
  }
  return text;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!Object.values(HealthCheckRating).includes(rating as HealthCheckRating)) {
    throw new Error('rating not given or invalid');
  }
  return rating as HealthCheckRating;
};

const parseDischarge = (discharge: { date: unknown, criteria: unknown }): {date: string, criteria: string} => {
  console.log('checking discharge: ', discharge);
  if (!discharge || !('date' in discharge) || !('criteria' in discharge)) {
    throw new Error('discharge not given or invalid');
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!isString(discharge.date) || !parseDate(discharge.date) || !isString(discharge.criteria)) {
    throw new Error('discharge is invalid');
  }

  return ({
    date: parseDate(discharge.date),
    criteria: discharge.criteria
  });
};

interface newEntryProps {
  description: unknown;
  date: unknown;
  type: unknown;
  specialist: unknown;
  diagnosisCodes: unknown;
  healthCheckRating: unknown;
  employerName: unknown;
  discharge: {
    date: unknown;
    criteria: unknown;
  },
  sickLeave: unknown;
}
export const toNewEntry = ({description, date, type, specialist, diagnosisCodes, healthCheckRating, employerName, discharge, sickLeave}
                          : newEntryProps) : NewEntry => {

  const commonProperties = {
    description: parseStringArg(description, 'description'),
    date: parseDate(date),
    specialist: parseStringArg(specialist, 'specialist'),
    diagnosisCodes: diagnosisCodes as Array<Diagnosis['code']> // no checking
  };

  switch (type) {
    case 'Hospital':
      return {
        ...commonProperties,
        type,
        discharge: parseDischarge(discharge)
      };
    case 'OccupationalHealthcare':
      return {
        ...commonProperties,
        type,
        employerName: parseStringArg(employerName,'employerName'),
        sickLeave: sickLeave as { startDate: string; endDate: string; } // no checking
      };
    case 'HealthCheck':
      return {
        ...commonProperties,
        type,
        healthCheckRating: parseHealthCheckRating(healthCheckRating)
      };
    default:
      throw new Error('type not given or invalid.');
  }
};