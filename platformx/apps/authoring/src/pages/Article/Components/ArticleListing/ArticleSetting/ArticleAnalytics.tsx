import { useMutation } from '@apollo/client';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  showToastError,
  showToastSuccess,
} from '../../../../../components/toastNotification/toastNotificationReactTostify';
import {
  publish_article,
  update_article,
} from '../../../../../services/article/article.api';
import ThemeConstants from '../../../../../theme/variable';
import BasicSwitch from '../../../../editPage/Switch';

const ArticleAnalytics = ({
  selectedArticle,
  setSelectedArticle,
  getArticle,
}) => {
  const { t } = useTranslation();
  const [publishsavedmutate] = useMutation(publish_article);
  const [updateMutate] = useMutation(update_article);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(
    selectedArticle?.AnalyticsEnable
  );
  const [disabledState, setDiabledState] = useState(true);
  // Function to handle checkbox changes
  const handlePrelemAnalyticsChange = (event, fieldType) => {
    setDiabledState(!disabledState);
    setAnalyticsEnabled(event.target.checked);
    setSelectedArticle(() => ({
      ...selectedArticle,
      AnalyticsEnable: event.target.checked,
      creationDate: new Date().toISOString(),
    }));
  };
  const publishArticle = () => {
    const articleToSend = {
      Page: selectedArticle.Page,
      ParentPageURL: selectedArticle.ParentPageURL,
      CurrentPageURL: selectedArticle.CurrentPageURL,
    };
    publishsavedmutate({
      variables: {
        input: articleToSend,
      },
    })
      .then((resp) => {
        showToastSuccess(`${t('article')} ${t('updated_toast')}`);
        getArticle(0, 10);
      })
      .catch((error) => {
        if (error.graphQLErrors[0]) {
          showToastError(error.graphQLErrors[0].message);
        } else {
          showToastError(t('api_error_toast'));
        }
      });
  };
  const saveAnalytics = () => {
    setDiabledState(!disabledState);
    const updatedArticle = {
      ...selectedArticle,
      creationDate: new Date().toISOString(),
      modificationDate: new Date().toISOString(),
      ArticleSettings: {
        ...selectedArticle?.ArticleSettings,
        SeoKeywords: [],
      },
    };
    updateMutate({
      variables: {
        input: updatedArticle,
      },
    }).then((resp) => {
      if (
        selectedArticle.Page_State &&
        selectedArticle.Page_State === 'DRAFT'
      ) {
        showToastSuccess(`${t('article')} ${t('updated_toast')}`);
      } else {
        publishArticle();
      }
    });
  };

  return (
    <AccordionDetails>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        mt={1}
        mb={1}
      >
        <Typography
          variant='subtitle1'
          sx={{
            display: 'flex',
            alignItems: 'center',
            textTransform: 'capitalize',
          }}
          className='drawer-label'
        >
          {`${t('article')} ${t('analytics')}`}
          <Tooltip
            title={
              <Box m={1}>
                <Typography
                  sx={{
                    fontSize: ThemeConstants.FONTSIZE_XS,
                    textTransform: 'capitalize',
                  }}
                  mb={1}
                >
                  {t('article_analytics_tp')}
                </Typography>
              </Box>
            }
            placement='right'
          >
            <Box>
              <InfoOutlinedIcon
                sx={{
                  marginLeft: '10px',
                  '&:hover': {
                    color: ThemeConstants.NOTIFICATION_ERROR,
                  },
                }}
              />
            </Box>
          </Tooltip>
        </Typography>
        <BasicSwitch
          onChange={(e: any) =>
            handlePrelemAnalyticsChange(e, 'AnalyticsEnabled')
          }
          checked={analyticsEnabled}
          color={ThemeConstants.BLACK_COLOR}
        />
      </Box>
      <Typography
        variant='subtitle1'
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          textTransform: 'capitalize',
        }}
        mt={1}
        mb={1}
      >
        {t('impression')}
        <BasicSwitch disabled color={ThemeConstants.BLACK_COLOR} />
      </Typography>
      <Typography
        variant='subtitle1'
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          textTransform: 'capitalize',
        }}
        mt={1}
        mb={1}
      >
        {t('content_insight')}
        <BasicSwitch disabled color={ThemeConstants.BLACK_COLOR} />
      </Typography>

      <Box sx={{ textAlign: 'right' }} mb={2} mt={2}>
        <Button
          variant='contained'
          disabled={disabledState}
          sx={{
            backgroundColor: ThemeConstants.BLACK_COLOR,
            '&:hover': {
              backgroundColor: ThemeConstants.BLACK_COLOR,
            },
            textTransform: 'capitalize',
          }}
          onClick={saveAnalytics}
        >
          {t('done')}
        </Button>
      </Box>
    </AccordionDetails>
  );
};
export default ArticleAnalytics;
