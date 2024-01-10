import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

const ContentListLoader = () => {
  return (
    <Box>
      {[1, 2, 3, 4].map((item, index) => (
        <Grid
          key={index}
          container
          sx={{
            background: '#ffffff',
            height: '60px',
            alignItems: 'center',
            padding: '0 25px',
            marginBottom: '10px',
            borderRadius: '0px',
            cursor: 'pointer',
            borderBottom: '1px solid #e6eaed',
          }}
        >
          <Grid item xs={2.2} sx={{ marginRight: '25px' }}>
            <Skeleton
              animation="wave"
              height={10}
              width="75%"
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" width="60%" height={15} />
          </Grid>
          <Grid item xs={2.3} sx={{ marginRight: '2.8%' }}>
            <Skeleton
              animation="wave"
              height={10}
              width="90%"
              style={{ marginBottom: 3 }}
            />
            <Skeleton animation="wave" width="60%" height={15} />
          </Grid>
          <Grid item xs={1} sx={{ marginRight: '3.2%' }}>
            <Skeleton
              animation="wave"
              height={10}
              width="100%"
              style={{ marginBottom: 3 }}
            />
            <Skeleton animation="wave" width="60%" height={15} />
          </Grid>
          <Grid item xs={2.6} sx={{ marginRight: '3%' }}>
            <Skeleton
              animation="wave"
              height={10}
              width="90%"
              style={{ marginBottom: 3 }}
            />
            <Skeleton animation="wave" width="60%" height={15} />
          </Grid>
          <Grid item xs={1.4} sx={{ marginRight: '3.1%' }}>
            <Skeleton
              animation="wave"
              height={10}
              width="90%"
              style={{ marginBottom: 3 }}
            />
            <Skeleton animation="wave" width="60%" height={15} />
          </Grid>
          <Grid item xs={0.5}>
            <Skeleton
              animation="wave"
              height={10}
              width="100%"
              style={{ marginBottom: 3 }}
            />
            <Skeleton animation="wave" width="60%" height={15} />
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};

export default ContentListLoader;
