export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

export type NewPatientEntry = Omit<PatientEntry, 'id'>;
export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;
export type PublicPatient = Omit<PatientEntry, 'ssn' | 'entries' >;

export enum Gender {
  'male',
  'female',
  'other'
}