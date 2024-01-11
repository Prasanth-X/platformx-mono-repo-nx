import { Backdrop, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import ThemeConstants from '../themes/authoring/lightTheme/lightThemeVariable';

export const Loader = () => {
  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open
    >
      <Box
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
        }}
      >
        <Box
          sx={{
            width: '60px',
            height: '60px',
            padding: '10px',
            borderRadius: '7px',
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
          }}
        >
          <CircularProgress
            style={{
              width: '40px',
              height: '40px',
              color: ThemeConstants.PRIMARY_MAIN_COLOR,
            }}
          />
        </Box>
      </Box>
    </Backdrop>
  );
};

// export default Loader;
