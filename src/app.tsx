
import React from 'react';
import AppContainer from './app_container.tsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontSize: 18,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer />
    </ThemeProvider >
  );
}

export default App;