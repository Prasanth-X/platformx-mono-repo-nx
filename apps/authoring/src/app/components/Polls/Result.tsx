import { Box, Grid, RadioGroup } from '@mui/material';
import { useTranslation } from 'react-i18next';
import RadioControlLabel from '../Common/RadioControlLabel';
import TitleSubTitle from '../Common/TitleSubTitle';
import { useCustomStyle } from './Poll.style';
import CommonBoxWithNumber from '../../Common/CommonBoxWithNumber/CommonBoxWithNumber';

const Result = ({ state, setState, unsavedChanges }) => {
  const { t } = useTranslation();
  const handleChange = (event) => {
    setState({ ...state, ['scoreBy']: event.target.value });
  };
  const classes = useCustomStyle();
  return (
    <Box id='results' className={classes.mainStyleWrapper}>
      <CommonBoxWithNumber
        number='05'
        title={t('poll_result_header')}
        titleVarient='p3semibold'
        subTitleVarient='p4regular'
        subTitle={t('subhead')}
      >
        <Grid container>
          <Grid item xs={12} sm={5} md={5} className='leftFiledLast'>
            <TitleSubTitle
              title={t('score_title')}
              subTitle={t('score_subtitle')}
              titleVarient='h6medium'
              subTitleVarient='h7regular'
            />
          </Grid>
          <Grid item xs={12} sm={7} md={7}>
            <Box className='textFiledLast'>
              <RadioGroup
                name='page-radio-buttons-group'
                value={state.scoreBy}
                onChange={handleChange}
                row
              >
                <RadioControlLabel value={t('count')} />
                <RadioControlLabel value={t('percentage')} />
              </RadioGroup>
            </Box>
          </Grid>
        </Grid>
      </CommonBoxWithNumber>
    </Box>
  );
};
export default Result;
