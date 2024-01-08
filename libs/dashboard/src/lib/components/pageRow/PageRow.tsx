import { useLazyQuery } from '@apollo/client';
import EastIcon from '@mui/icons-material/East';
import { Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { formatContentTitle, capitalizeWords } from '@platformx/utilities';
import { PageQueries, fetchPrelemValidation } from '@platformx/authoring-apis';
import { fetchPageModel } from '@platformx/authoring-apis';
import { dateTimeFormat, getSubDomain } from '@platformx/utilities';
import { RecentPage } from '../recentPages/RecentPages.types';
import { useStyles } from './PageRow.styles';
import { useDispatch } from 'react-redux';

const PageRow = ({
  title,
  current_page_url,
  status,
  last_modification_date,
  last_modified_by,
  path,
}: RecentPage) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [runFetchPageModel] = useLazyQuery(PageQueries.FETCH_PAGE_MODEL_DRAFT);
  const [runFetchValidationQuery] = useLazyQuery(fetchPrelemValidation);

  // function to view published pages
  const handleClick = (status: string) => {
    if (status == 'published') {
      // window.open(authInfo.publishUri + i18n.language + current_page_url);
      window.open( `${getSubDomain()}/${i18n.language}${current_page_url}`)
    } else {
      fetchPageModel(
        dispatch,
        runFetchPageModel,
        runFetchValidationQuery,
        path,
        navigate
      );
    }
  };

  return (
    <Box className={classes.contentRowContainer}>
      <Grid container>
        <Grid xs={12} md={6} sx={{ order: { xs: 2, md: 'inherit' } }}>
          <Typography
            component='h2'
            className={classes.contentRowText}
            variant='h6regular'
            onClick={() => handleClick(status)}
          >
            {capitalizeWords(formatContentTitle(title))}
          </Typography>
        </Grid>
        <Grid
          xs={6}
          md={3}
          sx={{
            order: { xs: 3, md: 'inherit' },
            display: { xs: 'none', md: 'flex' },
          }}
        >
          <Typography variant='h6regular'>{last_modified_by}</Typography>
        </Grid>
        <Grid
          xs={12}
          md={3}
          em={2}
          sx={{
            paddingLeft: { xs: 0, md: '15px' },
            order: { xs: 1, md: 'inherit' },
            marginBottom: { xs: '5px', md: 0 },
          }}
        >
          <Box
            className={
              status == 'published'
                ? classes.statusPublish
                : classes.statusDraft
            }
          >
            {`${t(status)}`}
          </Box>
        </Grid>
        <Grid
          xs={12}
          md={1}
          sx={{
            display: { xs: 'none', em: 'flex' },
            justifyContent: 'flex-end',
          }}
        >
          <Box
            className={classes.arrowIcon}
            onClick={() => handleClick(status)}
          >
            <EastIcon fontSize='small' />
          </Box>
        </Grid>
        <Grid
          className='mt-2'
          xs={6}
          md={12}
          sx={{
            order: { xs: 4, md: 'inherit' },
            display: { xs: 'none', md: 'flex' },
          }}
        >
          <Typography variant='h7regular' sx={{ color: '#5C6574' }}>
            {dateTimeFormat(last_modification_date)}
          </Typography>
        </Grid>
        <Grid
          className='mt-2'
          xs={12}
          md={12}
          sx={{ order: { xs: 4 }, display: { xs: 'flex', md: 'none' } }}
        >
          <Typography variant='h6regular'>{last_modified_by}</Typography>
          <Typography
            variant='h7regular'
            sx={{
              color: '#5C6574',
              borderLeft: '1px solid #5c6574',
              paddingLeft: '5px',
              marginLeft: '5px',
            }}
          >
            {dateTimeFormat(last_modification_date)}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PageRow;
