import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { useForm } from './useForm';

const CustomTextField = styled(TextField)(({ theme }) => ({
  width: '80%',
  margin: 0,
  color: theme.palette.success.main,
}));

const initialValues = {
  id: 0,
  fullName: '',
  email: '',
  mobile: '',
  city: '',
  gender: 'male',
  departmentId: '',
  hireDate: new Date(),
  isPermanent: false,
};
const items = [
  { value: 'male', label: 'male' },
  { value: 'female', label: 'female' },
  { value: 'other', label: 'other' },
];

function EmployeeForm() {
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialValues, true);

  return (
    <Grid
      container
      //  spacing={2}
      sx={{ border: '' }}
    >
      <Grid item xs={6} sx={{}}>
        <CustomTextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          name="fullName"
          value={values.fullName}
          onChange={handleInputChange}
        />
        <CustomTextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          name="email"
          value={values.Email}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={6} sx={{}}>
        <FormControl>
          <FormLabel>Gender</FormLabel>
          <RadioGroup row name="gender" onChange={handleInputChange}>
            {items.map((item) => (
              <FormControlLabel
                key={item.id}
                value={item.label}
                control={<Radio />}
                label={item.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default EmployeeForm;
