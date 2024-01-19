import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

const ContentListDesktopLoader = () => {
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
            padding: '0 25px 0 32px',
            marginBottom: '10px',
            borderRadius: '6px',
          }}
        >
          <Grid item xs={0.8}>
            <Skeleton animation='wave' width='64%' height={70} />
          </Grid>
          <Grid item xs={6.3}>
            <Skeleton
              animation='wave'
              height={10}
              width='90%'
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation='wave' width='70%' height={15} />
          </Grid>
          <Grid item xs={1.5} sx={{ paddingLeft: '20px' }}>
            <Skeleton animation='wave' width='80%' height={45} />
          </Grid>
          <Grid item xs={2} sx={{ paddingLeft: '15px' }}>
            <Skeleton
              animation='wave'
              height={10}
              width='90%'
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation='wave' width='70%' height={15} />
          </Grid>
          <Grid item xs={1.4} sx={{ paddingLeft: '15px' }}>
            <Skeleton
              animation='wave'
              height={10}
              width='100%'
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation='wave' width='60%' height={15} />
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};

export default ContentListDesktopLoader;
