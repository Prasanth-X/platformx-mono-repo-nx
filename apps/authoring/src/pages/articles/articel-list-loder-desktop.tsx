import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

const ArticleListDesktopLoader = () => {
  return (
    <Box>
      {[1, 2, 3, 4].map((item, index) =>
        (<Grid
          key={index}
          container
          sx={{
            background: '#ffffff',
            height: '60px',
            alignItems: 'center',
            padding: '0 15px',
            marginBottom: '10px',
            borderRadius: '6px',
          }}
        >
          <Grid item xs={2.7}>
            <Skeleton
              animation='wave'
              height={10}
              width='90%'
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation='wave' width='60%' height={15} />
          </Grid>
          <Grid item xs={3}>
            <Skeleton
              animation='wave'
              height={10}
              width='90%'
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation='wave' width='60%' height={15} />
          </Grid>
          <Grid item xs={1.4}>
            <Skeleton
              animation='wave'
              height={10}
              width='90%'
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation='wave' width='60%' height={15} />
          </Grid>
          <Grid item xs={3}>
            <Skeleton
              animation='wave'
              height={10}
              width='90%'
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation='wave' width='60%' height={15} />
          </Grid>
          <Grid item xs={1.4}>
            <Skeleton
              animation='wave'
              height={10}
              width='90%'
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation='wave' width='60%' height={15} />
          </Grid>
          <Grid item xs={0.5}>
            <Skeleton
              animation='wave'
              height={10}
              width='90%'
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation='wave' width='60%' height={15} />
          </Grid>
        </Grid>)
      )}
    </Box>
  );
};

export default ArticleListDesktopLoader;
