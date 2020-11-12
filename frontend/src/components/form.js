import React from 'react';
import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import * as yup from 'yup';


const Form = () => {

  function createUser(values) {
    let last_name = values.name;
    let email = values.email;
    let city = values.city;
    let country = values.country;
    let phone_number = values.phone;
    let first_name = values.surname;

    fetch('http://localhost:3000/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({last_name, email, city, country, phone_number, first_name}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
      });
  }

  const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    name: yup
      .string('Enter your name')
      .required('Name is required'),
    surname: yup
      .string('Enter your surname')
      .required('Surname is required'),
    phone: yup
      .number('Enter your phone')
      .required('Phone is required'),
    city: yup
      .string('Enter your city')
      .required('City is required'),
    country: yup
      .string('Enter your country')
      .required('Country is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      createUser(values);
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          id="surname"
          name="surname"
          label="Surname"
          value={formik.values.surname}
          onChange={formik.handleChange}
          error={formik.touched.surname && Boolean(formik.errors.surname)}
          helperText={formik.touched.surname && formik.errors.surname}
        />
        <TextField
          fullWidth
          id="country"
          name="country"
          label="Country"
          value={formik.values.country}
          onChange={formik.handleChange}
          error={formik.touched.country && Boolean(formik.errors.country)}
          helperText={formik.touched.country && formik.errors.country}
        />
        <TextField
          fullWidth
          id="city"
          name="city"
          label="City"
          value={formik.values.city}
          onChange={formik.handleChange}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
        />
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="phone"
          name="phone"
          label="Phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Save
        </Button>
      </form>
    </div>
  );
}

export default Form;
