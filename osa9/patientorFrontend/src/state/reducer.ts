import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "UPDATE_PATIENT";
    payload: Patient;
    }
  | {
    type: "ADD_ENTRY";
    payload: {
      patientId: string;
      entry: Entry;
    };
  }
  | {
    type: "SET_DIAGNOSES_LIST";
    payload: Diagnosis[];
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "UPDATE_PATIENT":
      // Looks like same as ADD_PATIENT
    // eslint-disable-next-line no-fallthrough
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_ENTRY":
      const patientId = action.payload.patientId;
      const updatedEntries = [...state.patients[patientId].entries, action.payload.entry];
      return {
        ...state,
        patients: {
          ...state.patients,
          [patientId]: { ...state.patients[patientId], entries: updatedEntries}
        }
      };
    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    default:
      return state;
  }
};

export const setPatientList = (patientList: Patient[]): Action => {
  return({
    type: "SET_PATIENT_LIST",
    payload: patientList
  });
};

export const addPatient = (newPatient: Patient): Action => {
  return({
    type: "ADD_PATIENT",
    payload: newPatient
  });
};

export const updatePatient = (patient: Patient): Action => {
  return({
    type: "UPDATE_PATIENT",
    payload: patient
  });
};

export const addEntry = (patientId: string, entry: Entry): Action => {
  return ({
    type: "ADD_ENTRY",
    payload: { patientId, entry }
  });
};

export const setDiagnosesList = (diagnosesList: Diagnosis[]): Action => {
  return({
    type: "SET_DIAGNOSES_LIST",
    payload: diagnosesList
  });
};