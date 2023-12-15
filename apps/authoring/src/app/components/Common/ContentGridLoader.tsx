import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const ContentGridLoader = () => {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", padding: "0 10px" }}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((key) =>
        (<Box
          key={key}
          sx={{
            width: {
              xs: 'calc(100%/2 - 20px)',
              sm: 'calc(100%/3 - 20px)',
              lg: 'calc(100%/4 - 20px)',
              xl: 'calc(100%/5 - 20px)',
            },
            margin: '10px',
          }}
        >
           <Skeleton variant="rectangular" height={180} sx={{ borderRadius: "4px" }}/>
          <Box>
            <Skeleton />
            <Skeleton width='65%' />
          </Box>
        </Box>)
      )}
    </Box>
  );
};

export default ContentGridLoader;
