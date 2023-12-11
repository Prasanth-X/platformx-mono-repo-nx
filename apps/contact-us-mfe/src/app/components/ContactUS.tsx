// apps/micro-frontend-name/src/lib/ContactUsForm.tsx
import React from 'react';
import { PrelemTheme } from '@platformx/utilities';

import {
  TextField,
  Typography,
  Box,
  ThemeProvider,
  Button,
} from '@mui/material';

interface ContactUsFormProps {
  onSubmit: (formData: {
    name: string;
    email: string;
    message: string;
  }) => void;
}

const ContactUsForm = ({ onSubmit }: ContactUsFormProps) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ name, email, message });
  };

  return (
    <ThemeProvider theme={PrelemTheme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          padding: '1rem',
          backgroundColor: PrelemTheme.palette.primary.main,
          color: PrelemTheme.palette.primary.contrastText,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Contact Us
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ marginBottom: '1rem' }}
          />
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: '1rem' }}
          />
          <TextField
            label="Message"
            variant="outlined"
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ marginBottom: '1rem' }}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Box>
    </ThemeProvider>
  );
};
export default ContactUsForm;
