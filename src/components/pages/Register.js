import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="primary" href="https://my.morlamoves.com/">
        Morla Moves
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Register() {

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Zorunlu alan"),
    lastName: Yup.string().required("Zorunlu alan"),
    email: Yup.string().email('Geçersiz e-mail adresi').required('Zorunlu alan'),
    password: Yup.string().required('Zorunlu alan').min(8, 'Şifre en az 8 karakter olmalıdır'),
    acceptBox: Yup.bool().required('Zorunlu alan').oneOf([true], 'Şartlar ve koşulları kabul etmelisiniz'),
  });

  const { handleSubmit, handleChange, values, errors, handleBlur, submitCount } = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      acceptBox: false
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1 }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Kayıt Ol
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="İsim"
                autoFocus
                onChange={handleChange}
                autoComplete='off'
                onBlur={handleBlur}
              />

              {values.firstName === '' && submitCount > 0 ?
                (<Typography sx={{ fontSize: '12px' }} color="error">{errors.firstName}</Typography>) : null}

            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Soyisim"
                name="lastName"
                onChange={handleChange}
                autoComplete='off'
                onBlur={handleBlur}
              />

              {values.lastName === '' && submitCount > 0 ?
                (<Typography sx={{ fontSize: '12px' }} color="error">{errors.lastName}</Typography>) : null}

            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="E-Posta"
                name="email"
                autoComplete="off"
                onChange={handleChange}
                onBlur={handleBlur}
              />

              {values.email === '' && submitCount > 0 ?
                (<Typography sx={{ fontSize: '12px' }} color="error">{errors.email}</Typography>) :
                (values.email !== '' && errors.email ?
                  (<Typography sx={{ fontSize: '12px' }} color="error">{errors.email}</Typography>) : null)}

            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Şifre"
                type="password"
                id="password"
                onChange={handleChange}
                autoComplete='off'
                onBlur={handleBlur}
              />

              {values.password === '' && submitCount > 0 ?
                (<Typography sx={{ fontSize: '12px' }} color="error">{errors.password}</Typography>) :
                (values.password !== '' && values.password.length < 8 && errors.password ?
                  (<Typography sx={{ fontSize: '12px' }} color="error">{errors.password}</Typography>) : null)}


            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox
                  value="allowExtraEmails"
                  color="primary"
                  name="acceptBox"
                  checked={values.acceptBox}
                  onChange={handleChange} />}
                label={
                  <Typography sx={{ fontSize: '13px' }} variant="body2">Morla Moves Kullanım Şart ve Koşullarını kabul ediyorum.</Typography>
                }
              />

              {values.acceptBox === false && submitCount > 0 ?
                (<Typography sx={{ fontSize: '12px' }} color="error">{errors.acceptBox}</Typography>) : null}

            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            color='primary'
          >
            Kayıt Ol
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="#" variant="body2">
                Zaten hesabınız var mı? Oturum Aç
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>

  );
}