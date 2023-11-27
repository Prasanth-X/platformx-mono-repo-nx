import styled from 'styled-components';

import NxWelcome from './nx-welcome';
import { DropdownMenu, PrelemTheme } from '@x-prelems/x-shared-components';
import { ThemeProvider } from '@mui/material';
import Header from '../components/Header';

export function App() {
  return (
    <ThemeProvider theme={PrelemTheme}>
      <Header />
    </ThemeProvider>
  );
}

export default App;
