import React from 'react';
import { Formik, Form, Field } from "formik";
import { Grid, Button } from "semantic-ui-react";
import { useStateValue } from '../state';
import { DiagnosisSelection } from '../AddPatientModal/FormField';
import { Entry, DistributiveOmit, HealthCheckRating } from '../types';
import { TextField, NumberField } from "../AddPatientModal/FormField";

export type EntryFormValues = DistributiveOmit<Entry, "id" | "entries">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
    initialValues={{
      type: 'HealthCheck',
      date: '',
      specialist: '',
      description: '',
      healthCheckRating: 0
    }}
    onSubmit={onSubmit}
    validate={values => {
      const requiredError = "Field is required";
      const errors: { [field: string]: string } = {};
      if (values.type !== "HealthCheck") {
        errors.type = "Only HealthCheck is supported for now";
      }
      if (!Date.parse(values.date)) {
        errors.date = "Date is invalid";
    }
      if (!values.specialist) {
        errors.specialist = requiredError;
      }
      if (!values.description) {
        errors.description = requiredError;
      }
      if (values.type === 'HealthCheck' && !Object.values(HealthCheckRating).includes(values.healthCheckRating)) {
        errors.healthCheckRating = requiredError;
      }
      return errors;
  }}
  >
    {({ isValid, dirty, setFieldValue, setFieldTouched }) => {

      return (
        <Form className="form ui">
          <Field
            label="Type"
            name="type"
            component={TextField}
          />
          <Field
            label="Specialist"
            placeholder="name"
            name="specialist"
            component={TextField}
          />
          <Field
            label="Date Of Visit"
            placeholder="YYYY-MM-DD"
            name="date"
            component={TextField}
          />
          <Field
            label="Health check rating"
            min={0}
            max={3}
            name="healthCheckRating"
            component={NumberField}
          />
          <Field
            label="Description"
            placeholder="Description"
            name="description"
            component={TextField}
          />
          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
          />    
          <Grid>
            <Grid.Column floated="left" width={5}>
              <Button type="button" onClick={onCancel} color="red">
                Cancel
              </Button>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Button
                type="submit"
                floated="right"
                color="green"
                disabled={!dirty || !isValid}
              >
                Add
              </Button>
            </Grid.Column>
          </Grid>
        </Form>
      );
    }}
  </Formik>
  );
};

export default AddEntryForm;