import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { Header, Container, Icon } from "semantic-ui-react";
import { useStateValue } from "../state";

const genderIcon = {
  male: <Icon name='mars' />,
  female: <Icon name='venus' />,
  other: <Icon name='mars' />,
};

function PatientPage() {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  
  const patient = Object.values(patients).find(patient => patient.id === id);

  if (!patient || !patient.ssn) {
    const fetchPatientData = async () => {
      console.log('FETCHING patient data');
      const { data: patientFromApi } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      console.log('got patient: ', patientFromApi);
      dispatch({ type: "ADD_PATIENT", payload: patientFromApi });
    };
    fetchPatientData();

    return <div>loading</div>;
  }

  return (
    <div>
      <Header as="h2">{patient.name} {genderIcon[patient.gender]}</Header>
      <Container>ssn: {patient.ssn} </Container>
      <Container>occupation: {patient.occupation}</Container>
    </div>
  );
}

export default PatientPage;