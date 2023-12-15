import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import SkeltonLoader from '../../components/Skeleton-loader/skeleton';

const PrelemSearchLoader = () => {
  return (
    <Box
      sx={{
        paddingLeft: { xs: '10px', sm: '50px', md: '135px' },
        paddingRight: { xs: '10px', sm: '50px', md: '135px' },
        paddingTop: { xs: '10px', sm: '50px', md: '50px' },
      }}
    >
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ paddingBottom: '20px' }}
      >
        <Grid item xs={6} sm={3} sx={{ paddingRight: 3, paddingLeft: 2 }}>
          <Skeleton
            sx={{ height: 100, marginBottom: 2 }}
            animation='wave'
            variant='rectangular'
          />
        </Grid>
        <Grid item xs={6} sm={3} sx={{ paddingRight: 3, paddingLeft: 2 }}>
          <Skeleton
            sx={{ height: 100, marginBottom: 2 }}
            animation='wave'
            variant='rectangular'
          />
        </Grid>
        <Grid item xs={6} sm={3} sx={{ paddingRight: 3, paddingLeft: 2 }}>
          <Skeleton
            sx={{
              height: 100,
              marginBottom: 2,
              display: { xs: 'none', sm: 'block', md: 'block' },
            }}
            animation='wave'
            variant='rectangular'
          />
        </Grid>
        <Grid item xs={6} sm={3} sx={{ paddingRight: 3, paddingLeft: 2 }}>
          <Skeleton
            sx={{
              height: 100,
              marginBottom: 2,
              display: { xs: 'none', sm: 'block', md: 'block' },
            }}
            animation='wave'
            variant='rectangular'
          />
        </Grid>
      </Grid>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={6} sx={{ paddingRight: 3 }}>
          <SkeltonLoader maxWidth={800} maxHeight={500} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SkeltonLoader maxWidth={800} maxHeight={500} />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ paddingRight: 3 }}>
          <SkeltonLoader maxWidth={800} maxHeight={500} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SkeltonLoader maxWidth={800} maxHeight={500} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PrelemSearchLoader;
