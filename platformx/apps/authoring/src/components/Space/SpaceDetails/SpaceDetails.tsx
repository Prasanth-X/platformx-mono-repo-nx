import { Box, FormControl, Grid, InputLabel, MenuItem } from '@mui/material';
import React, { useCallback } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useTranslation } from 'react-i18next';
import TitleSubTitle from '../../Common/TitleSubTitle';
import TextBox from '../../Common/TextBox';
import AutoTextArea from '../../Common/AutoTextArea';
import { useStyles } from './SpaceDetails.styles';
import { Constants } from './Constants';

const SpaceDetails = ({ stateSpace, setStateSpace }) => {
  const { t } = useTranslation();
  const { readOnly = false } = stateSpace;

  const handleSelectChange = (event: SelectChangeEvent) => {
    setStateSpace((prevState: any) => {
      return {
        ...prevState,
        template: event.target.value as string,
      };
    });
  };

  const handleOnBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setStateSpace((prevState: any) => {
        return {
          ...prevState,
          [event.target.name]: event.target.value as string,
        };
      });
    },
    [setStateSpace]
  );
  const classes = useStyles();
  return (
    <>
      <Box
        id='titleDescription'
        className={`${classes.container} main-container`}
      >
        <TitleSubTitle
          title={t('community_space')}
          subTitle={t('subhead')}
          titleVarient='h3medium'
          subTitleVarient='h7regular'
        />

        <Grid container rowSpacing={1}>
          {/* Title*/}
          <Grid item xs={12} sm={5} md={5} className='grid'>
            <TitleSubTitle
              title={`${t('name')}*`}
              subTitle={t('name_of_your_Space_here')}
              titleVarient='h6medium'
              subTitleVarient='h7regular'
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={7}
            md={7}
            className='margintopClassforSpaceDetails'
          >
            <TextBox
              name='displayName'
              placeHolder={t('space_name_placeholder')}
              maxCharLength={100}
              state={stateSpace?.displayName}
              handleOnBlur={handleOnBlur}
              isDisabled={readOnly}
            />
          </Grid>

          {/* description*/}
          <Grid item xs={12} sm={5} md={5} className='grid'>
            <TitleSubTitle
              title={`${t('description')}`}
              subTitle={t('space_desc_subtitle')}
              titleVarient='h6medium'
              subTitleVarient='h7regular'
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={7}
            md={7}
            className='margintopClassforSpaceDetails'
          >
            <AutoTextArea
              name='description'
              placeHolder={t('space_desc_placeholder')}
              maxCharLength={1000}
              state={stateSpace?.description}
              handleOnBlur={handleOnBlur}
              isDisabled={readOnly}
            />
          </Grid>

          {/*template */}
          <Grid item xs={12} sm={5} md={5} className='grid'>
            <TitleSubTitle
              title={t('template')}
              subTitle={t('space_template_subtitle')}
              titleVarient='h6medium'
              subTitleVarient='h7regular'
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={7}
            md={7}
            className='margintopClassforSpaceDetails'
          >
            <FormControl fullWidth disabled={readOnly}>
              <InputLabel id='demo-simple-select-label'>
                {t('template')}
              </InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={stateSpace.template}
                label={t('template')}
                onChange={handleSelectChange}
              >
                {Constants.map((item) => {
                  return (
                    <MenuItem key={item} value={item}>
                      {t(`${item}`)}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SpaceDetails;
