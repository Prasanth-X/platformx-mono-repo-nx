import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import TitleSubTitle from '../../Common/TitleSubTitle';
import BasicSwitchText from '../../Common/BasicSwitchText';
import { useStyles } from './SpaceAccess.styles';
import { Box, Grid, RadioGroup } from '@mui/material';
import RadioControlLabel from '../../Common/RadioControlLabel';
import { RegistrationConstants } from './Constants';

const SpaceAccess = ({ stateSpace, setStateSpace }) => {
  const { readOnly = false } = stateSpace;
  const { t } = useTranslation();
  const handleRadioChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setStateSpace((prevVlaue) => {
        return {
          ...prevVlaue,
          registration: (event.target as HTMLInputElement).value,
        };
      });
    },
    [setStateSpace]
  );
  const handleswitchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setStateSpace((prevVlaue) => {
        return {
          ...prevVlaue,
          hidden: event.target.checked,
        };
      });
    },
    [setStateSpace]
  );
  const classes = useStyles();

  return (
    <Box id='Space access' className={classes.container}>
      <TitleSubTitle
        title={t('space_access')}
        subTitle={t('subhead')}
        titleVarient='h3medium'
        subTitleVarient='h7regular'
      />
      <Box className='basicSwitchText'>
        <BasicSwitchText
          isDisable={readOnly}
          state={stateSpace.hidden}
          handleChange={handleswitchChange}
          title={t('hidden')}
          subtitle={t('space_hidden_subtitle')}
          keyName='analytics_enable'
        />
      </Box>
      <Box className='margintopclass'>
        <Grid container rowSpacing={1}>
          <Grid item xs={12} sm={5} md={5} className='paddingRightClass'>
            <TitleSubTitle
              title={t('registration')}
              subTitle={t('space_registraion_subtitle')}
              titleVarient='h6medium'
              subTitleVarient='h7regular'
            />
          </Grid>
          <Grid item xs={12} sm={7} md={7}>
            <Box>
              <RadioGroup
                name='page-radio-buttons-group'
                value={stateSpace.registration}
                onChange={handleRadioChange}
                row
              >
                {RegistrationConstants.map((item, index) => {
                  return (
                    <RadioControlLabel
                      disabled={readOnly}
                      key={`${item} ${index.toString()}`}
                      label={t(item)}
                      value={item}
                    />
                  );
                })}
              </RadioGroup>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default SpaceAccess;
