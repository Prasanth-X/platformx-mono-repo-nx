import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { ReactNode } from 'react';
import CATSvg from '../../assets/images/cat.png';
import './ErrorBoundary.css';
// import { CATSvg } from '../../assets/images';

type ReactProps = {
  navigate?: any;
  children: ReactNode;
};

type ReactState = {
  hasError: boolean;
};

// const navigate = useNavigate();
class ErrorBoundary extends React.Component<ReactProps, ReactState> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <Box
            sx={{
              height: '100%',
            }}
          >
            <Typography
              variant="h1"
              sx={{
                color: '#006092 !important',
                fontSize: '69px !important',
                fontWeight: '600px !important',
                textAlign: 'center',
                marginBottom: '30px',
                padding: '20px 0 10px 0',
              }}
              id="Heading"
            >
              Oops.....
            </Typography>
            <Typography
              variant="h1"
              sx={{
                color: '#006092 !important',
                fontSize: '21px !important',
                fontWeight: '600px !important',
                textAlign: 'center',
                marginBottom: '30px',
                padding: '0px 0 30px 0',
              }}
              id="Heading"
            >
              {`The page you requested isn't available right now, please try again later.`}
            </Typography>
            <Typography
              sx={{
                textAlign: 'center',
                marginBottom: '30px',
                padding: '0px 0 30px 0',
              }}
            >
              <img src={CATSvg} alt="errorBoundary" className="errorBoundary" />
            </Typography>
          </Box>
        </div>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
