import { Box, Grid } from '@mui/material';
import {
  BasicSwitch,
  ThemeConstants,
  TitleSubTitle,
} from '@platformx/utilities';
import { useStyles } from './CreateUser.styles';

export default function ExternalAccess({ t, state, setState }: any) {
  const className = useStyles();
  const handleCommunityUserSwitchChange = () => {
    setState((prevState: any) => {
      return {
        ...prevState,
        'is_Community_User': !prevState?.is_Community_User,
      };
    });
  };
  return (

    <Box className="UserroleUserDetailsHead" id="external">
      <Box className="title">
        <TitleSubTitle
          title={t('external_access')}
          titleVariant="h3medium"
          subTitleVariant="h7regular"
        />
      </Box>
      <Grid container sx={{ padding: '0 20px 30px 20px' }}>
        <Grid item xs={12} sm={5} md={5}>
          <Box className={className.contentStyle}>
            <TitleSubTitle
              title={t('community_user')}
              subTitle={t('Select if the user is community user')}
              titleVariant="h6medium"
              subTitleVariant="h7regular"
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={7} md={7}>
          <Box className={className.contentStyle}>
            <BasicSwitch
              checked={state?.is_Community_User}
              onChange={handleCommunityUserSwitchChange}
              color={ThemeConstants.GREEN_COLOR}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>

  );
}
