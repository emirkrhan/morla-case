import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

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

export default function Login() {

    const navigate = useNavigate();
    const [showErrorMessage, setShowErrorMessage] = React.useState(false);


    const validationSchema = Yup.object({
        email: Yup.string().email('Geçersiz e-mail adresi').required('Zorunlu alan'),
        password: Yup.string().required('Zorunlu alan').min(8, 'Şifre en az 8 karakter olmalıdır'),
    });

    const { handleSubmit, handleChange, values, errors, handleBlur, submitCount } = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: (values) => {
            const userInfo = localStorage.getItem("userInfo");
            const userInfoJson = JSON.parse(userInfo);
            if (values.email === userInfoJson.email && values.password === userInfoJson.password) {
                navigate('/');
            } else {
                setShowErrorMessage(true);
                setTimeout(() => {
                    setShowErrorMessage(false);
                }, 2000);
            }
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
                    Giriş Yap
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>


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
                                (<Typography sx={{ fontSize: '12px' }} color="error">{errors.email}</Typography>) : null}

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
                                (<Typography sx={{ fontSize: '12px' }} color="error">{errors.password}</Typography>) : null}


                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        color='primary'
                    >
                        Giriş Yap
                    </Button>

                    {showErrorMessage ? <Typography textAlign='center' sx={{ fontSize: '12px' }} color="error">Geçersiz E-Posta veya şifre!</Typography> : null}

                    <Grid container justifyContent="center">
                        <Grid item>
                            <Link href='/register' variant="body2">
                                Hesabınız yok mu? Kayıt Olun
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>

    );
}