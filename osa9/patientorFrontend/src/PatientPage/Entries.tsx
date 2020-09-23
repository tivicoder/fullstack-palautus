import React from 'react';
import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../types";
import { Header, Icon, Segment } from "semantic-ui-react";
import { useStateValue } from "../state";

const checkTypeIcons = {
  "HealthCheck": <Icon name='user md' />,
  "Hospital": <Icon name='hospital' />,
  "OccupationalHealthcare": <Icon name='stethoscope' />
};

const healthRateIcons = {
  0: <Icon name='heart' color='green' />,
  1: <Icon name='heart' color='yellow' />,
  2: <Icon name='heart' color='red' />,
  3: <Icon name='heart' color='black' />
};

const EntryCommonContent: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  return(
    <>
      {entry.description}
      <ul>
        {entry.diagnosisCodes
          ? entry.diagnosisCodes.map(code => (<li key={code}>{code} {diagnoses[code].name}</li>))
          : '' }
      </ul>
    </>
  );
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const HealthCheckEntryComponent: React.FC<{ entry: HealthCheckEntry}> = ({ entry }) => {
  return(
    <div>
      <Header as="h3">{entry.date} {checkTypeIcons[entry.type]}</Header>
      <EntryCommonContent entry={entry} />
      <div>{healthRateIcons[entry.healthCheckRating]}</div>
    </div>
  );
};

const HospitalEntryComponent: React.FC<{ entry: HospitalEntry}> = ({ entry }) => {
  return(
    <div>
      <Header as="h3">{entry.date} {checkTypeIcons[entry.type]}</Header>
      <EntryCommonContent entry={entry} />
    </div>
  );
};

const OccupationalHealthcareEntryComponent: React.FC<{ entry: OccupationalHealthcareEntry}> = ({ entry }) => {
  return(
    <div>
      <Header as="h3">{entry.date} {checkTypeIcons[entry.type]} {entry.employerName}</Header>
      <EntryCommonContent entry={entry} />
    </div>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type){
    case "HealthCheck":
      return <HealthCheckEntryComponent entry={entry} />;
    case "Hospital":
      return <HospitalEntryComponent entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryComponent entry={entry} />;
    default:
      return assertNever(entry);
  }
};

function Entries({ entries }: {entries: Entry[]}) {
  return(
    <div style={{ marginTop: 30 }}>
      <Header as="h3">entries</Header>
      { entries.map(entry => <Segment key={entry.id}><EntryDetails key={entry.id} entry={entry}/></Segment>) }
    </div>
  );
}


export default Entries;