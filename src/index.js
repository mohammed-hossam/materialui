import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { arEG, arSD } from '@mui/material/locale';
import { StyledEngineProvider } from '@mui/material/styles';

const theme = createTheme(
  {
    // direction: 'rtl',
    // dataGrid: {
    //   direction: 'rtl',
    // },
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  arSD
);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </ThemeProvider>,
  document.getElementById('root')
);
