import { Container } from '@mui/material';
import { LayoutContainer } from './AuthLayout.styles';
type LayoutProps = {
  children: React.ReactNode;
};
const AuthLayout = ({ children }: LayoutProps) => {
  return (
    <Container maxWidth='sm'>
      <LayoutContainer>{children}</LayoutContainer>
    </Container>
  );
};
