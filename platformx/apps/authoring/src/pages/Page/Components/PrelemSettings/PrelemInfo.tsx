import { useLazyQuery } from '@apollo/client';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import { fetchPrelemDefaultMeta } from '../../../../services/prelems/prelems.api';
import { Store } from '../../../../store/ContextStore';
import { useStyles } from '../../PrelemPreview/PrelemPreview.styles';
import BackButton from '../BackButton/BackButton';
import '../PageSettings/PageSettings.css';

const PrelemInfo = ({ setPageId, selectedPrelemIndex }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const location = useLocation();
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [prelemMetaInfo, setPrelemMetaInfo] = useState({
    PrelemName: '',
    Description: '',
    Tags: [],
  });
  const descriptionLimit = 500;
  const [fetchPrelemDefaultMetaData] = useLazyQuery(fetchPrelemDefaultMeta);
  const { state } = useContext(Store);
  const { page } = state;
  const getPrelemDetails = () => {
    setLoading(true);
    fetchPrelemDefaultMetaData({
      variables: {
        prelemId: page?.prelemMetaArray[selectedPrelemIndex].PrelemId,
      },
    }).then(async (res) => {
      const response = res.data.authoring_prelemById;
      setPrelemMetaInfo({
        PrelemName: response.PrelemName,
        Description: response.Description,
        Tags: response.Tags,
      });
      setLoading(false);
    });
  };
  useEffect(() => {
    getPrelemDetails();
  }, [selectedPrelemIndex]);
  return (
    <Box className='PageInfoWp'>
      {loading ? (
        <Box
          sx={{ display: 'flex', justifyContent: 'center', marginTop: '180px' }}
        >
          <CircularProgress color='inherit' />
        </Box>
      ) : (
        <Box className='pageSettingmainWp'>
          <BackButton setPageId={setPageId} Title={prelemMetaInfo.PrelemName} />
          <Box className='rowBox'>
            <Typography
              className='labelbox'
              variant='p4regular'
              data-testid='prelem-description'
            >
              {showMore == true
                ? prelemMetaInfo.Description
                : prelemMetaInfo.Description.slice(0, descriptionLimit)}
              {prelemMetaInfo.Description.length > descriptionLimit &&
                (showMore == false ? (
                  <Typography
                    variant='p4semibold'
                    component='h4'
                    sx={{ cursor: 'pointer' }}
                    data-testid='read-more'
                    onClick={() => {
                      setShowMore(true);
                    }}
                  >
                    {t('read_more')}
                  </Typography>
                ) : (
                  <Typography
                    variant='p4semibold'
                    component='h4'
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                      setShowMore(false);
                    }}
                    data-testid='read-less'
                  >
                    {t('read_less')}
                  </Typography>
                ))}
            </Typography>
          </Box>
          <Box className='rowBox'>
            <Typography
              className='labelbox'
              variant='p4regular'
              data-testid='prelem-otherinfo'
            >
              {t('tags')}:{' '}
              <Box className={classes.tagswarp}>
                <ul>
                  {prelemMetaInfo.Tags.map((item, index) => {
                    return (
                      <li key={index}>
                        <Typography variant='p3regular'>
                          {item}
                        </Typography>
                      </li>
                    );
                  })}
                </ul>
              </Box>
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PrelemInfo;
