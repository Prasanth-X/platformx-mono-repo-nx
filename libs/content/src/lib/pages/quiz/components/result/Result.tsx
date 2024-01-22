import { Box, Grid, RadioGroup } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCustomStyle } from '../../quiz.style';
import './Result.css';
import { useComment } from '@platformx/authoring-apis';
import { CommentWrapper } from '@platformx/comment-review';
import { CommonBoxWithNumber, RadioControlLabel, TitleSubTitle, } from '@platformx/utilities';

const Result = ({ state, setState, unsavedChanges, setFieldChanges }) => {
  const { t } = useTranslation();
  const [data, setData] = useState({});
  const { scrollToRef } =
    useComment();
  useEffect(() => {
    setData({
      result_range_1: { to: '0', from: '24', quotes: t('quiz_quotes_quote1') },
      result_range_2: { to: '25', from: '49', quotes: t('quiz_quotes_quote2') },
      result_range_3: { to: '50', from: '74', quotes: t('quiz_quotes_quote3') },
      result_range_4: {
        to: '75',
        from: '100',
        quotes: t('quiz_quotes_quote4'),
      },
    });
  }, [t]);

  const handleChange = (event) => {
    unsavedChanges.current = true;
    setState({ ...state, 'scoreBy': event.target.value });
  };
  const handleInput = (event, key) => {
    setFieldChanges(true);
    setData({ ...data, [key]: { ...data[key], quotes: event.target.value } });
    unsavedChanges.current = true;
    // setState({ ...state, [key]: event.target.value });
    // data[key].quotes = event.target.value;
  };
  const handleOnBlur = (event, key) => {
    unsavedChanges.current = true;
    setState({ ...state, [key]: event.target.value });
  };
  const classes = useCustomStyle();
  return (
    <Box id='results' className={classes.mainStyleWrapper}>
      <CommentWrapper elementId='4' scrollRef={scrollToRef} >
        <CommonBoxWithNumber
          number='04'
          title={t('results')}
          titleVarient='p3semibold'
          subTitleVarient='p4regular'
          subTitle={t('subhead')}
        >
          <Grid container>
            <Grid item xs={12} sm={5} md={5} className='leftFiled'>
              <TitleSubTitle
                title={t('score_title')}
                subTitle={t('score_subtitle')}
                titleVariant='h6medium'
                subTitleVariant='h7regular'
              />
            </Grid>
            <Grid item xs={12} sm={7} md={7} className='textFiled'>
              <Box>
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
          <Grid container>
            <Grid item xs={12} sm={5} md={5} className='leftFiledLast'>
              <TitleSubTitle
                title={t('quiz_quotes_title')}
                subTitle={t('quiz_quotes_subtitle')}
                titleVariant='h6medium'
                subTitleVariant='h7regular'
              />
            </Grid>
            <Grid item xs={12} sm={7} md={7} className='textFiledLast'>
              <Box className='quotesTable'>
                <table>
                  <tr>
                    <th
                      style={{
                        width: '14.5%',
                        borderRight: '1px solid #ced3d9',
                        textTransform: 'capitalize',
                      }}
                    >
                      {t('to')}
                    </th>
                    <th
                      style={{
                        width: '14.5%',
                        borderRight: '1px solid #ced3d9',
                        textTransform: 'capitalize',
                      }}
                    >
                      {t('from')}
                    </th>
                    <th
                      style={{
                        width: '100%',
                        textTransform: 'capitalize',
                      }}
                    >
                      {t('quotes')}
                    </th>
                  </tr>
                  {Object.keys(data).map((val, key) => {
                    return (
                      <tr
                        key={key}
                        style={{
                          backgroundColor:
                            key % 2 === 0 ? '#f5f6f8' : '#e6eaed',
                        }}
                      >
                        <td>{data[val].to}</td>
                        <td>{data[val].from}</td>
                        <td style={{ color: '#2d2d39', borderRight: '0px' }}>
                          <input
                            id='inputID'
                            style={{
                              border: 'none',
                              width: '-webkit-fill-available',
                              backgroundColor: ' inherit',
                              textAlign: 'center',
                              height: 'inherit',
                            }}
                            type='text'
                            name='quotes'
                            // placeholder={data[val].quotes}
                            value={data[val].quotes}
                            onChange={(e) => handleInput(e, val)}
                            onBlur={(e) => handleOnBlur(e, val)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </table>
              </Box>
            </Grid>
          </Grid>
        </CommonBoxWithNumber>
      </CommentWrapper>
    </Box>
  );
};
export default Result;
