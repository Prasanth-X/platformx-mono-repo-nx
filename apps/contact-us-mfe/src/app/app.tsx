import { ThemeProvider } from '@mui/styles';
import { PrelemTheme } from '@platformx/utilities';
import NxWelcome from './nx-welcome';

export function App() {
  return (
    <ThemeProvider theme={PrelemTheme}>
      <NxWelcome title="contact-us-mfe" />
    </ThemeProvider>
  );
}

export default App;
