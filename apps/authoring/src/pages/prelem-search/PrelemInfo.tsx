import { useLazyQuery } from '@apollo/client';
import AddIcon from '@mui/icons-material/Add';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import PreviewIcon from '@mui/icons-material/Preview';
import { Box, Button, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';
import {
  fetchPrelemContent,
  fetchPrelemValidation,
} from '../../services/prelems/prelems.api';
import { addPrelem } from '../../store/Actions';
import { Store } from '../../store/ContextStore';
import ThemeConstants from '../../../../../libs/utilities/src/lib/themes/authoring/variable';
import { SearchCardObjecType } from './utils/prelemTypes';
const PrelemInfo = () => {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(Store);
  const { page } = state;
  const navigate = useNavigate();
  const location = useLocation();
  const [showMore, setShowMore] = useState(false);
  const prelemMetaInfo = location.state as SearchCardObjecType;
  const descriptionLimit = 500;
  const [runFetchContentQuery] = useLazyQuery(fetchPrelemContent);
  const [runFetchValidationQuery] = useLazyQuery(fetchPrelemValidation);

  return (
    <>
      <Box
        sx={{
          padding: { xs: '10px', sm: '10px', em: '20px', lg: '20px' },
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Button
            variant="outlined"
            sx={{
              borderColor: ThemeConstants.PRIMARY_MAIN_COLOR,
              color: ThemeConstants.PRIMARY_MAIN_COLOR,
              padding: '8px 15px',
              textTransform: 'none',
              '&:hover': {
                borderColor: ThemeConstants.PRIMARY_MAIN_COLOR,
                color: ThemeConstants.PRIMARY_MAIN_COLOR,
              },
              display: { xs: 'none', md: 'flex', lg: 'flex' },
            }}
            data-testid="prelem-back-button"
            onClick={() => {
              history.go(-1);
            }}
          >
            <ChevronLeftIcon />{' '}
            <Typography
              pl={1}
              variant="body1"
              sx={{ textTransform: 'capitalize' }}
            >
              {t('back')}
            </Typography>
          </Button>
          <ChevronLeftIcon
            sx={{
              color: ThemeConstants.PRIMARY_MAIN_COLOR,
              fontSize: ThemeConstants.FONTSIZE_XL,
              display: { xs: 'flex', md: 'none', lg: 'none' },
            }}
            data-testid="prelem-back-mobile-button"
            onClick={() => {
              history.go(-1);
            }}
          />
        </Box>
        <Box>
          <Typography
            variant="h4"
            sx={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%,-50%)',
              fontWeight: {
                xs: ThemeConstants.FONTWEIGHT_SEMIBOLD,
              },
              fontSize: {
                xs: ThemeConstants.FONTSIZE_MD,
                md: ThemeConstants.FONTSIZE_LG,
                lg: ThemeConstants.FONTSIZE_LG,
              },
              textTransform: 'capitalize',
            }}
            data-testid="page-title"
          >
            {t('about_prelem')}
          </Typography>
        </Box>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button
              variant="outlined"
              sx={{
                marginRight: '20px',
                display: { xs: 'none', md: 'flex', lg: 'flex' },
              }}
              data-testid="prelem-preview-button"
              onClick={() => {
                navigate('/prelem-search/preview', {
                  state: prelemMetaInfo,
                });
              }}
            >
              <PreviewIcon />
              <Typography
                pl={1}
                variant="body1"
                sx={{ textTransform: 'capitalize' }}
              >
                {t('preview')}
              </Typography>
            </Button>
            <Button
              variant="contained"
              sx={{
                display: { xs: 'none', md: 'flex', lg: 'flex' },
              }}
              data-testid="add-prelem-button"
              onClick={() => {
                addPrelem(
                  dispatch,
                  prelemMetaInfo,
                  runFetchContentQuery,
                  runFetchValidationQuery,
                  navigate,
                  page?.insertPrelemAt
                );
              }}
            >
              <AddIcon />{' '}
              <Typography
                pl={1}
                variant="body1"
                sx={{ textTransform: 'capitalize' }}
              >
                {t('add_prelem')}
              </Typography>
            </Button>
            <PreviewIcon
              sx={{
                color: ThemeConstants.PRIMARY_MAIN_COLOR,
                fontSize: ThemeConstants.FONTSIZE_XL,
                display: { xs: 'flex', md: 'none', lg: 'none' },
              }}
              data-testid="prelem-preview-mobile-button"
              onClick={() => {
                navigate('/prelem-search/preview', {
                  state: prelemMetaInfo,
                });
              }}
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: '#f1f1f1',
          height: 'calc(100vh - 205px)',
          overflowY: 'auto',
          padding: { xs: '20px', lg: '30px 80px', xl: '30px' },
          display: { xs: 'block', sm: 'block', md: 'flex', lg: 'flex' },
        }}
      >
        <Box
          sx={{ width: { xs: '100%', sm: '100%', md: '50%', lg: '50%' } }}
          mb={2}
        >
          <img
            src={prelemMetaInfo?.Thumbnails?.Tab}
            style={{ width: '100%', margin: 'auto' }}
          />
        </Box>
        <Box
          sx={{
            width: { xs: '100%', sm: '100%', md: '50%', lg: '50%' },
            padding: { xs: '0px', md: '0 20px 20px' },
          }}
        >
          <Typography
            variant="h3"
            data-testid="prelem-title"
            sx={{
              fontSize: {
                xs: ThemeConstants.FONTSIZE_MD,
                md: ThemeConstants.FONTSIZE_LG,
              },
              fontWeight: {
                xs: ThemeConstants.FONTWEIGHT_SEMIBOLD,
              },
            }}
          >
            {prelemMetaInfo.PrelemName}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              width: { xs: '100%' },
            }}
          >
            <Typography
              variant="body1"
              mt={1}
              mb={2}
              sx={{
                position: 'relative',
                fontSize: {
                  xs: ThemeConstants.FONTSIZE_DEFAULT,
                  lg: ThemeConstants.FONTSIZE_SECONDARY_DEFAULT,
                },
              }}
              data-testid="prelem-description"
            >
              {showMore == true
                ? prelemMetaInfo.Description
                : prelemMetaInfo.Description.slice(0, descriptionLimit)}
              {prelemMetaInfo.Description.length > descriptionLimit &&
                (showMore == false ? (
                  <span
                    style={{
                      color: '#0074b2',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      marginLeft: '10px',
                    }}
                    data-testid="read-more"
                    onClick={() => {
                      setShowMore(true);
                    }}
                  >
                    {t('read_more')}
                  </span>
                ) : (
                  <span
                    style={{
                      color: '#0074b2',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      marginLeft: '10px',
                    }}
                    onClick={() => {
                      setShowMore(false);
                    }}
                    data-testid="read-less"
                  >
                    {t('read_less')}
                  </span>
                ))}
            </Typography>
            <Box
              sx={{
                paddingTop: { xs: '10px', sm: '10px', md: '0', lg: '0' },
              }}
            >
              <Box
                sx={{
                  width: '52px',
                  height: '52px',
                  backgroundColor: ThemeConstants.PRIMARY_MAIN_COLOR,
                  borderRadius: '50%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  display: { xs: 'flex', md: 'none', lg: 'none' },
                  cursor: 'pointer',
                }}
                onClick={() => {
                  addPrelem(
                    dispatch,
                    prelemMetaInfo,
                    runFetchContentQuery,
                    runFetchValidationQuery,
                    navigate,
                    page?.insertPrelemAt
                  );
                }}
              >
                <AddIcon sx={{ color: ThemeConstants.WHITE_COLOR }} />
              </Box>
            </Box>
          </Box>

          <Typography
            variant="body1"
            sx={{
              fontSize: {
                xs: ThemeConstants.FONTSIZE_SM,
                lg: ThemeConstants.FONTSIZE_DEFAULT,
              },
              textTransform: 'capitalize',
            }}
            data-testid="prelem-otherinfo"
          >
            {t('tags')}:
            {prelemMetaInfo.Tags.map((item, index) => {
              return (
                <span key={index}>
                  <span>{item}</span>
                  {index < prelemMetaInfo.Tags.length - 1 && <span>, </span>}
                </span>
              );
            })}
          </Typography>
        </Box>
      </Box>
    </>
  );
};
export default PrelemInfo;
