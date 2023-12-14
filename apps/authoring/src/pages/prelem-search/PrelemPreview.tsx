import { useLazyQuery } from '@apollo/client';
import AddIcon from '@mui/icons-material/Add';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ComputerIcon from '@mui/icons-material/Computer';
import InfoIcon from '@mui/icons-material/Info';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import TabletAndroidIcon from '@mui/icons-material/TabletAndroid';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import PrelemTheme from 'libs/utilities/src/lib/themes/prelems/prelemTheme';
import Mapping from 'platform-x-prelems/prelems/mapping';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';
import LightTheme from '../../../../../libs/utilities/src/lib/themes/authoring/lightTheme';
import ThemeConstants from '../../../../../libs/utilities/src/lib/themes/authoring/variable';
import PlatformXLoader from '../../components/Loader/loader';
import {
  fetchPrelemContent,
  fetchPrelemValidation,
} from '../../services/prelems/prelems.api';
import { addPrelem } from '../../store/Actions';
import { Store } from '../../store/ContextStore';
import { getSubDomain } from '../../utils/helperFunctions';
import PrelemPreviewFrame from './PrelemPreviewFrame';
import { SearchCardObjecType } from './utils/prelemTypes';
const mappingDynamicInstance = {};
Object.keys(Mapping).forEach((item) => {
  mappingDynamicInstance[item] = React.lazy(
    () => import(`platform-x-prelems/prelems/${Mapping[item]}`)
  );
  return mappingDynamicInstance;
});

const PrelemPreview = () => {
  const { t, i18n } = useTranslation();
  const { state, dispatch } = useContext(Store);
  const { page } = state;
  const navigate = useNavigate();
  const location = useLocation();
  const [runFetchContentQuery] = useLazyQuery(fetchPrelemContent);
  const [runFetchValidationQuery] = useLazyQuery(fetchPrelemValidation);
  const [loader, setLoader] = useState(false);
  const prelemMetaInfo = location.state as SearchCardObjecType;
  const PrelemComponent = mappingDynamicInstance[prelemMetaInfo?.PrelemId];
  const theme = {
    LightTheme,
  };

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
              color: '#2d2d39',
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
              color: ThemeConstants.PRIMARY_MAIN_COLOR,
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
            {t('prelem_preview')}
          </Typography>
        </Box>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button
              variant="outlined"
              sx={{
                borderColor: ThemeConstants.PRIMARY_MAIN_COLOR,
                color: ThemeConstants.PRIMARY_MAIN_COLOR,
                padding: '8px 15px',
                marginRight: '20px',
                textTransform: 'none',
                '&:hover': {
                  borderColor: ThemeConstants.PRIMARY_MAIN_COLOR,
                  color: ThemeConstants.PRIMARY_MAIN_COLOR,
                },
                display: { xs: 'none', md: 'flex', lg: 'flex' },
              }}
              data-testid="prelem-info-button"
              onClick={() => {
                navigate('/prelem-search/about', {
                  state: prelemMetaInfo,
                });
              }}
            >
              <InfoIcon />
              <Typography
                pl={1}
                sx={{
                  paddingLeft: '0px',
                  textTransform: 'capitalize',
                }}
                variant="body1"
              >
                {t('about')}
              </Typography>
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: ThemeConstants.PRIMARY_MAIN_COLOR,
                borderColor: ThemeConstants.PRIMARY_MAIN_COLOR,
                color: ThemeConstants.WHITE_COLOR,
                padding: '8px 10px',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: ThemeConstants.PRIMARY_MAIN_COLOR,
                  borderColor: ThemeConstants.PRIMARY_MAIN_COLOR,
                  color: ThemeConstants.WHITE_COLOR,
                },
                display: { xs: 'none', md: 'flex', lg: 'flex' },
                cursor: 'pointer',
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
                variant="body2"
                sx={{ textTransform: 'capitalize' }}
              >
                {t('add_prelem')}
              </Typography>
            </Button>
            <AddCircleOutlineOutlinedIcon
              sx={{
                color: ThemeConstants.PRIMARY_MAIN_COLOR,
                fontSize: ThemeConstants.FONTSIZE_XL,
                display: { xs: 'flex', md: 'none', lg: 'none' },
              }}
              data-testid="prelem-info-mobile-button"
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
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: ThemeConstants.LIGHT_BG_COLOR,
          height: 'calc(100vh - 145px)',
          overflowY: 'scroll',
        }}
      >
        <Box>
          <Container maxWidth="xl">
            {loader ? (
              <Box>
                <PlatformXLoader />
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  marginBottom: '30px',
                  padding: { xs: '0', lg: '0 30px', xl: '0' },
                }}
              >
                <Box
                  sx={{
                    width: { xs: '100%', md: '100%', lg: '100%' },
                    order: { xs: 3, sm: 2, em: 1 },
                  }}
                  mt={2}
                >
                  <Typography
                    sx={{
                      backgroundColor: ThemeConstants.PRIMARY_MAIN_COLOR,
                      color: ThemeConstants.WHITE_COLOR,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '160px',
                      paddingTop: '10px',
                      paddingBottom: '10px',
                      textTransform: 'capitalize',
                    }}
                  >
                    <ComputerIcon style={{ paddingRight: '10px' }} />
                    {t('web_preview')}
                  </Typography>

                  {PrelemComponent && (
                    <Box sx={{ display: 'none' }}>
                      <ThemeProvider theme={PrelemTheme}>
                        <PrelemComponent />
                      </ThemeProvider>
                    </Box>
                  )}
                  <PrelemPreviewFrame
                    device="desktop"
                    prelemid={prelemMetaInfo?.PrelemId}
                  >
                    {PrelemComponent ? (
                      <PrelemComponent
                        secondaryArgs={{
                          prelemBaseEndpoint: {
                            device: 'window',
                            APIEndPoint: process.env.NX_API_URI,
                            PublishEndPoint: `${getSubDomain()}/`,
                            buttonBaseUrl: `${getSubDomain()}/`,
                            deliveryEndPoint: process.env.NX_DELIVERY_URI,
                            language: i18n.language,
                          },
                        }}
                      />
                    ) : (
                      <Grid>Selected Prelem Not Load</Grid>
                    )}
                  </PrelemPreviewFrame>
                </Box>

                <Box
                  sx={{
                    width: { xs: '100%', md: '100%', lg: '65%' },
                    order: { xs: 2, sm: 1, em: 2 },
                    marginRight: { xs: '0px', md: '0px', lg: '16px' },
                  }}
                  mt={2}
                >
                  <Typography
                    sx={{
                      backgroundColor: ThemeConstants.PRIMARY_MAIN_COLOR,
                      color: ThemeConstants.WHITE_COLOR,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '160px',
                      paddingTop: '10px',
                      paddingBottom: '10px',
                      textTransform: 'capitalize',
                    }}
                  >
                    <TabletAndroidIcon style={{ paddingRight: '10px' }} />{' '}
                    {t('tablet_preview')}
                  </Typography>

                  {PrelemComponent && (
                    <Box sx={{ display: 'none' }}>
                      <ThemeProvider theme={PrelemTheme}>
                        <PrelemComponent />
                      </ThemeProvider>
                    </Box>
                  )}
                  <PrelemPreviewFrame
                    device="tablet"
                    prelemid={prelemMetaInfo?.PrelemId}
                  >
                    {PrelemComponent ? (
                      <PrelemComponent
                        secondaryArgs={{
                          prelemBaseEndpoint: {
                            device: 'tablet',
                            APIEndPoint: process.env.NX_API_URI,
                            PublishEndPoint: `${getSubDomain()}/`,
                            buttonBaseUrl: `${getSubDomain()}/`,
                            deliveryEndPoint: process.env.NX_DELIVERY_URI,
                            language: i18n.language,
                          },
                        }}
                      />
                    ) : (
                      <Grid>Selected Prelem Not Load</Grid>
                    )}
                  </PrelemPreviewFrame>
                </Box>
                <Box
                  sx={{
                    width: { xs: '100%', md: '100%', lg: '33%' },
                    order: { xs: 1, sm: 3 },
                  }}
                  mt={2}
                >
                  <Typography
                    sx={{
                      backgroundColor: ThemeConstants.PRIMARY_MAIN_COLOR,
                      color: ThemeConstants.WHITE_COLOR,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '160px',
                      paddingTop: '10px',
                      paddingBottom: '10px',
                      textTransform: 'capitalize',
                    }}
                  >
                    <PhoneAndroidIcon style={{ paddingRight: '10px' }} />
                    {t('mobile_preview')}
                  </Typography>

                  {PrelemComponent && (
                    <Box sx={{ display: 'none' }}>
                      <ThemeProvider theme={PrelemTheme}>
                        <PrelemComponent />
                      </ThemeProvider>
                    </Box>
                  )}
                  <PrelemPreviewFrame
                    device="mobile"
                    prelemid={prelemMetaInfo?.PrelemId}
                  >
                    {PrelemComponent ? (
                      <PrelemComponent
                        secondaryArgs={{
                          prelemBaseEndpoint: {
                            device: 'mobile',
                            APIEndPoint: process.env.NX_API_URI,
                            PublishEndPoint: `${getSubDomain()}/`,
                            buttonBaseUrl: `${getSubDomain()}/`,
                            deliveryEndPoint: process.env.NX_DELIVERY_URI,
                            language: i18n.language,
                          },
                        }}
                      />
                    ) : (
                      <Grid>Selected Prelem Not Load</Grid>
                    )}
                  </PrelemPreviewFrame>
                </Box>
              </Box>
            )}
          </Container>
        </Box>
      </Box>
    </>
  );
};
export default PrelemPreview;
