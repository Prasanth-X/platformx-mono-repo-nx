import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

const ContentListMobileLoader = () => {
  return (
    <Box>
      {[1, 2, 3, 4, 5].map((item, index) =>
        (<Grid
          key={index}
          container
          sx={{
            background: '#ffffff',
            height: '87px',
            alignItems: 'center',
            padding: '0 25px',
            margin: '10px 0',
            borderRadius: '6px',
          }}
        >
          <Grid item xs={9}>
            <Skeleton
              animation='wave'
              height={10}
              width='90%'
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation='wave'
              width='60%'
              height={15}
              style={{ marginBottom: 6 }}
            />
          </Grid>
          <Grid item xs={2}>
          </Grid>
          <Grid item xs={1}>
            <Skeleton
              animation='wave'
              height={10}
              width='30%'
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation='wave'
              width='30%'
              height={15}
              style={{ marginBottom: 6 }}
            />
          </Grid>
        </Grid>)
      )}
    </Box>
  );
};

export default ContentListMobileLoader;
