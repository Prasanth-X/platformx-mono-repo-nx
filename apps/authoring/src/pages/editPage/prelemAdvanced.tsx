import { Typography } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useTranslation } from 'react-i18next';
import ThemeConstants from '../../../../../libs/utilities/src/lib/themes/authoring/variable';
import BasicSwitch from './Switch';

const PrelemAdvanced = () => {
  const { t } = useTranslation();
  // const handlePrelemAdvanceChange = (event, fieldType) => {};
  return (
    <AccordionDetails>
      <Typography
        variant="subtitle1"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        mt={1}
        mb={1}
      >
        {t('prelem_advanced_user')}
        <BasicSwitch
          disabled
          // onChange={(e: any) =>
          // handlePrelemAdvanceChange(e, 'loginUserEnabled')}
          color={ThemeConstants.BLACK_COLOR}
        />
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        mt={1}
        mb={1}
      >
        {t('prelem_advanced_pay')}
        <BasicSwitch
          disabled
          // onChange={(e: any) =>
          //   handlePrelemAdvanceChange(e, 'payToAccessEnabled')
          // }
          color={ThemeConstants.BLACK_COLOR}
        />
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        mt={1}
        mb={1}
      >
        {t('prelem_geo')}
        <BasicSwitch
          disabled
          // onChange={(e: any) =>
          //   handlePrelemAdvanceChange(e, 'geoTargetEnabled')}
          color={ThemeConstants.BLACK_COLOR}
        />
      </Typography>
    </AccordionDetails>
  );
};
export default PrelemAdvanced;
