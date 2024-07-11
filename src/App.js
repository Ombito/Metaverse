import React from 'react';
import { CssBaseline } from '@mui/material';
import Header from './components/Header';
import MuseumScene from './components/MuseumScene';

const App = () => {
  return (
    <>
      <CssBaseline />
      <Header />
      <MuseumScene />
    </>
  );
};

export default App;
