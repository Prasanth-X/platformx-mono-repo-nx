import {
  Box,
  Grid,
  Typography
} from '@mui/material';
import { TitleSubTitle } from './SchemaComponents';
import BasicSwitch from './Switch/Switch';
import ThemeConstants from '../themes/authoring/lightTheme/lightThemeVariable';

const BasicSwitchText = ({
  state,
  isDisable,
  handleChange,
  title,
  subtitle,
  keyName,
  child = '',
}) => {
  return (
    <Box>
      <Grid
        container
        rowSpacing={1}
      // sx={{display: 'flex',
      // flexDirection: 'row'}}
      // columnSpacing={{ xs: 1, sm: 2, md: 2 }}
      >
        <Grid
          item
          xs={child ? 12 : 10}
          sm={5}
          md={5}
          sx={{
            paddingRight: {
              xs: '10px',
              sm: '10px',
              md: '55px',
            },
            // display: 'flex',
            // flexDirection: 'column'
          }}
        >
          <TitleSubTitle
            title={title}
            subTitle={subtitle}
            titleVariant="h6medium"
            subTitleVariant="h7regular"
          />
        </Grid>
        <Grid item xs={child ? 12 : 2} sm={7} md={7}>
          <Box sx={{
            display: "flex",
            alignItems: "center",
          }}>
            <Box sx={{ marginLeft: { xs: child ? '-10px' : null, sm: '0px' } }}>
              <BasicSwitch
                onChange={(e: any) => handleChange(e, keyName)}
                checked={state}
                disabled={isDisable}
                color={ThemeConstants.BLACK_COLOR}
              />
            </Box>
            {
              child && <Box sx={{ marginBottom: "8px" }}><Typography variant="h6medium">{child}</Typography></Box>
            }
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
export default BasicSwitchText