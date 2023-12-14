import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Box, Button, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { prelemsApi } from '../../services/prelems/prelems.api';
import { ThemeConstants } from '@platformx/utilities';
import { Layout, LocationData } from './utils/prelemTypes';
const PrelemLayoutsList = () => {
  const location = useLocation();
  const [layouts, setLayouts] = useState<Layout[]>([]);
  const { searchValue, categoryState } = location.state as LocationData;

  useEffect(() => {
    const getLayouts = async () => {
      await prelemsApi
        .getPrelemsLayoutsList(searchValue, categoryState.categoryValue)
        .then((res) => {
          const { layoutSearch } = res.data.data;
          setLayouts(layoutSearch);
        });
    };
    getLayouts();
  }, [searchValue, categoryState]);

  return (
    <Box>
      <Box sx={{ padding: '0px 30px' }}>
        <Button
          variant="outlined"
          sx={{
            marginTop: '15px',
            marginBottom: '15px',
            minWidth: '80px',
          }}
          onClick={() => {
            history.go(-1);
          }}
        >
          <ChevronLeftIcon /> Back
        </Button>
      </Box>
      <Box
        sx={{
          backgroundColor: ThemeConstants.LIGHT_BG_COLOR,
          padding: '10px 10px',
          height: 'calc(100vh - 150px)',
          overflowY: 'scroll',
          overflowX: 'hidden',
        }}
      >
        <Grid container>
          {layouts.map((layout, key) => (
            <Grid
              item
              xs={12}
              sm={4}
              md={4}
              lg={4}
              sx={{
                padding: { xs: '10px', sm: '10px', md: '10px', lg: '20px' },
              }}
              key={key}
            >
              <img
                src={`${layout.thumbnail}`}
                srcSet={`${layout.thumbnail}`}
                alt={layout.thumbnail}
                loading="lazy"
                style={{ width: '100%' }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
export default PrelemLayoutsList;
