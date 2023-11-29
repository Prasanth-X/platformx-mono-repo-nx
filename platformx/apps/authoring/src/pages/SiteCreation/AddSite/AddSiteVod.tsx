import { Grid, Box, Typography, SelectChangeEvent } from '@mui/material';
import { t } from 'i18next';
import { Fragment, useState } from 'react';
import CookieTextBox from '../../SiteSetting/CookieSetting/CookieTextBox';
import AddSiteSelect from './AddSiteSelect';
import { handleTextChange } from '../SiteCreation.utils';
const AddSiteVod = ({ form, setForm }) => {
  const [vodSelect, setVodSelect] = useState('Brightcove');
  const handleDropDownChange = (event: SelectChangeEvent) => {
    setVodSelect(event.target.value);
  };
  return (
    <>
      <Box sx={{ marginTop: '24px' }}>
        <Typography
          sx={{
            fontFamily: 'InterSemiBold',
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: '20px',
            lineHeight: '24px',
            color: '#14142B',
          }}
        >
          {t('what_is_vod')}
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '16px',
            lineHeight: '22px',
            color: '#4E4B66',
          }}
          marginTop={2}
        >
          {t('Vod_description')}
        </Typography>

        <Grid container marginTop={4}>
          <Grid item xs={12} sm={5} md={5} lg={5}>
            <Typography
              sx={{
                fontFamily: 'inter',
                fontWeight: '500',
                color: '#14142B',
              }}
            >
              {t('select_vod')}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={7} md={7} lg={7}>
            <AddSiteSelect
              value={vodSelect}
              handleDropDownChange={handleDropDownChange}
              itemList={[
                { value: 'Kaltura', name: 'Kaltura' },
                { value: 'Brightcove', name: 'Brightcove' },
              ]}
            />
          </Grid>
          {form.map((control, index) => (
            <Fragment key={`control_${index + 1}`}>
              <Grid
                item
                xs={12}
                sm={5}
                md={5}
                lg={5}
                sx={{
                  marginTop: { xs: '24px', sm: '36px', md: '36px', lg: '36px' },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    fontSize: '14px',
                    lineHeight: '17px',
                    color: '#14142B',
                  }}
                >
                  {t(control.title)}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={7}
                md={7}
                lg={7}
                sx={{
                  marginTop: { xs: '16px', sm: '36px', md: '36px', lg: '36px' },
                }}
              >
                <CookieTextBox
                  name={control.name}
                  state={control.value}
                  placeHolder={control.placeholder}
                  handleChange={handleTextChange(control, form, setForm)}
                  placeHolderStyle={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    fontSize: '16px',
                    lineHeight: '24px',
                    color: '#6E7191',
                  }}
                />
              </Grid>
            </Fragment>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default AddSiteVod;
