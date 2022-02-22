import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Grid, Typography } from '@mui/material';
import InputContainer from './fieldsContainers/Input';
import SelectContainer from './fieldsContainers/Select';
import DataTimePickerContainer from './fieldsContainers/DataTimePicker';

const intialFormikState = {
  name: '',
  email: '',
  phone: '',
  location: '',
  country: '',
  time: '',
};

const yupvalidationSchema = Yup.object().shape({
  name: Yup.string().required('من فضلك ادخل الاسم'),
  email: Yup.string()
    .email('البربد المدخل غير صحيح')
    .required('من فضلك ادخل البريد'),
  phone: Yup.number()
    .integer()
    .typeError('التليفون المدخل غير صحيح')
    .required('من فضلك ادخل التليفون'),
  location: Yup.string().required('من فضلك ادخل العنوان'),
  country: Yup.string().required('من فضلك ادخل البلد'),
});

function Main() {
  function handleSubmit(values) {
    console.log(values);
  }

  return (
    <Formik
      initialValues={intialFormikState}
      onSubmit={handleSubmit}
      validationSchema={yupvalidationSchema}
    >
      {(formikBag) => {
        return (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography>details</Typography>
              </Grid>
              <Grid item xs={6}>
                <InputContainer name="name" label="الاسم" />
              </Grid>
              <Grid item xs={6}>
                <InputContainer name="email" label="البريد الالكتروني" />
              </Grid>

              <Grid item xs={12}>
                <Typography>address</Typography>
              </Grid>
              <Grid item xs={12}>
                <InputContainer name="phone" label="التيليفون" />
              </Grid>
              <Grid item xs={12}>
                <InputContainer name="location" label="العنوان" />
              </Grid>
              <Grid item xs={12}>
                <Typography>information</Typography>
              </Grid>
              <Grid item xs={6}>
                <SelectContainer name="country" label="البلد" />
              </Grid>
              <Grid item xs={6}>
                <DataTimePickerContainer name="time" label="الوقت" />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                disabled={!formikBag.isValid || formikBag.isSubmitting}
              >
                ارسال
              </Button>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
}

export default Main;
