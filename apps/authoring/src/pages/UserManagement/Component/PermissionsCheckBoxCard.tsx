import { Box, Grid, Typography } from '@mui/material';
import TitleSubTitle from '../../../components/Common/TitleSubTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import * as React from 'react';
import { UserPermissions } from '../Utils/constant';
import ThemeConstants from '../../../../../../libs/utilities/src/lib/themes/authoring/variable';

const PermissionsCheckBoxCard = () => {
  return (
    <>
      <Box className="PermissionsCheckbox">
        <Box
          sx={{ padding: '10px 20px', background: ThemeConstants.WHITE_COLOR }}
        >
          <TitleSubTitle
            title="Page"
            subTitle=""
            titleVarient="h5medium"
            subTitleVarient="h7regular"
          />
        </Box>
        <Grid container sx={{ padding: '0 20px 15px 20px' }}>
          {UserPermissions.map((item, i) => {
            const { Title } = item;
            return (
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  marginTop: { sm: '13px', xs: '10px' },
                  marginBottom: { sm: '3px', xs: '3px' },
                  display: 'flex',
                  paddingRight: '10px',
                  flexDirection: 'column',
                }}
                key={i}
              >
                <FormControlLabel
                  sx={{ color: '#89909A', fontSize: '14px' }}
                  control={
                    <Checkbox
                      sx={{ color: '#E6EAED', padding: '0 10px 0 9px' }}
                    />
                  }
                  label={<Typography variant="h6regular">{Title}</Typography>}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export default PermissionsCheckBoxCard;
