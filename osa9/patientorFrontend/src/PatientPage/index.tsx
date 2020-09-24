import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from "../constants";
import { Patient, Entry } from "../types";
import { Header, Container, Icon, Button } from "semantic-ui-react";
import { useStateValue, updatePatient, addEntry } from "../state";
import Entries from './Entries';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';

const genderIcon = {
  male: <Icon name='mars' />,
  female: <Icon name='venus' />,
  other: <Icon name='genderless' />,
};

function PatientPage() {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  
  const patient = Object.values(patients).find(patient => patient.id === id);

  if (!patient || !patient.ssn) {
    const fetchPatientData = async () => {
      console.log('FETCHING patient data');
      const { data: patientFromApi } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      console.log('got updated patient: ', patientFromApi);
      dispatch(updatePatient(patientFromApi));
    };
    fetchPatientData();

    return <div>loading</div>;
  }

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        values
      );
      dispatch(addEntry(patient.id, newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };


  return (
    <div>
      <Header as="h2">{patient.name} {genderIcon[patient.gender]}</Header>
      <Container>ssn: {patient.ssn} </Container>
      <Container>occupation: {patient.occupation}</Container>
      <Entries entries={patient.entries} />
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
}

export default PatientPage;