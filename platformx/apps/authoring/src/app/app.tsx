import styled from 'styled-components';

import NxWelcome from './nx-welcome';
import { ThemeProvider } from '@mui/material';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <ThemeProvider theme={{}}>
      <NxWelcome title="authoring" />
    </ThemeProvider>
  );
}

export default App;
