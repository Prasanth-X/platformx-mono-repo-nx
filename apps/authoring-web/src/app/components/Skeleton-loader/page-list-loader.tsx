import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

const PageListLoader = () => {
  return (
    <Box>
      <Grid
        container
        sx={{
          padding: { xs: '0 5px', em: '0 10px' },
        }}
      >
        <Grid item xs={12} sm={6}>
          <Card
            sx={{
              maxWidth: '800px',
              height: '160px',
              padding: '5%',
              margin: { xs: '5px', em: '10px' },
            }}
          >
            <Skeleton
              animation='wave'
              width='60%'
              height={15}
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation='wave'
              height={10}
              width='90%'
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation='wave'
              height={2}
              width='90%'
              style={{ marginBottom: 20, marginTop: 40 }}
            />
            <Skeleton
              animation='wave'
              height={10}
              width='40%'
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation='wave'
              height={10}
              width='80%'
              style={{ marginBottom: 6 }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card
            sx={{
              maxWidth: '800px',
              height: '160px',
              padding: '5%',
              margin: { xs: '5px', em: '10px' },
            }}
          >
            <Skeleton
              animation='wave'
              width='60%'
              height={15}
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation='wave'
              height={10}
              width='90%'
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation='wave'
              height={2}
              width='90%'
              style={{ marginBottom: 20, marginTop: 40 }}
            />
            <Skeleton
              animation='wave'
              height={10}
              width='40%'
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation='wave'
              height={10}
              width='80%'
              style={{ marginBottom: 6 }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card
            sx={{
              maxWidth: '800px',
              height: '160px',
              padding: '5%',
              margin: { xs: '5px', em: '10px' },
            }}
          >
            <Skeleton
              animation='wave'
              width='60%'
              height={15}
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation='wave'
              height={10}
              width='90%'
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation='wave'
              height={2}
              width='90%'
              style={{ marginBottom: 20, marginTop: 40 }}
            />
            <Skeleton
              animation='wave'
              height={10}
              width='40%'
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation='wave'
              height={10}
              width='80%'
              style={{ marginBottom: 6 }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card
            sx={{
              maxWidth: '800px',
              height: '160px',
              padding: '5%',
              margin: { xs: '5px', em: '10px' },
            }}
          >
            <Skeleton
              animation='wave'
              width='60%'
              height={15}
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation='wave'
              height={10}
              width='90%'
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation='wave'
              height={2}
              width='90%'
              style={{ marginBottom: 20, marginTop: 40 }}
            />
            <Skeleton
              animation='wave'
              height={10}
              width='40%'
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation='wave'
              height={10}
              width='80%'
              style={{ marginBottom: 6 }}
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PageListLoader;
