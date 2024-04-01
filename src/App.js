import React from 'react'
import HomePage from './components/HomePage'
import store from './redux/store'
import { setSepet } from './redux/actions';
import "./app.css"
import { Route, Routes } from 'react-router-dom';
import ProductDetail from './components/ProductDetail';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Register from "./components/pages/Register";

const theme = createTheme({
  palette: {
    primary: {
      main: '#2a59fe',
    },
    secondary: {
      main: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      'DM Sans',
      'sans-serif'
    ].join(','),
  }
});

export default function App() {

  store.subscribe(() => {
    const state = store.getState();
    const sepetState = state.sepet.sepet;
    localStorage.setItem('sepet', JSON.stringify(sepetState));
  });

  const savedSepet = localStorage.getItem('sepet');
  if (savedSepet) {
    const sepetState = JSON.parse(savedSepet);
    store.dispatch(setSepet(sepetState))
  } else {
    console.log('Sepet verisi bulunamadı.');
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </ThemeProvider>
  )
}
