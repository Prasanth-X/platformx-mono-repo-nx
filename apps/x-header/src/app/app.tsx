import styled from 'styled-components';

import { ThemeProvider, Typography } from '@mui/material';
import Header from '../components/Header';
import { Theme } from '@x-prelems-monorepo-nx/x-components';
export function App() {
  return (
    <ThemeProvider theme={Theme}>
      <Header />
    </ThemeProvider>
  );
}

export default App;
