import { useLazyQuery } from '@apollo/client';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';
import PreviewIcon from '@mui/icons-material/Preview';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Mapping from 'platform-x-prelems/prelems/mapping';
import usePlatformAnalytics from 'platform-x-utils/dist/analytics';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import {
  fetchPrelemContent,
  fetchPrelemValidation,
} from '../../../services/prelems/prelems.api';
import { addPrelem } from '../../../store/Actions';
import { Store } from '../../../store/ContextStore';
import { ThemeConstants } from '@platformx/utilities';
import { SearchCardListProps } from '../utils/prelemTypes';
const mappingDynamicInstance = {};
Object.keys(Mapping).forEach((item) => {
  mappingDynamicInstance[item] = React.lazy(
    () => import(`platform-x-prelems/prelems/${Mapping[item]}`)
  );
  return mappingDynamicInstance;
});

export const PrelemSearchCard = ({ searchCardList }: SearchCardListProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const { page } = state;
  const [runFetchValidationQuery] = useLazyQuery(fetchPrelemValidation);
  const [runFetchContentQuery] = useLazyQuery(fetchPrelemContent);
  const [handleImpression] = usePlatformAnalytics();
  return (
    <Box
      sx={{
        backgroundColor: ThemeConstants.LIGHT_BG_COLOR,
        minHeight: {
          xl: '500px',
          md: 'calc(100vh - 400px)',
          xs: 'calc(100vh - 300px)',
        },
      }}
      data-testid="prelem-search-card-wrap"
    >
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            padding: { xs: '0', lg: '0 80px', xl: '0' },
          }}
        >
          {searchCardList.length > 0 &&
            searchCardList.map((item, key) => {
              return (
                <Box
                  sx={{
                    paddingTop: {
                      xs: '30px !important',
                      lg: '40px !important ',
                    },
                    position: 'relative',
                    padding: {
                      xs: ' 5px !important',
                      em: '10px !important',
                    },
                    width: { xs: '100%', sm: 'calc(100%/2 - 0px)' },
                  }}
                  key={key}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      '&:hover .card-overlay': {
                        opacity: 1,
                        zIndex: 1,
                      },
                    }}
                    data-testid="prelem-search-card"
                  >
                    <Card
                      sx={{
                        p: { xs: 0, lg: 0 },
                        position: 'relative',
                        display: {
                          xs: 'none',
                          sm: 'none',
                          md: 'none',
                          lg: 'block',
                        },
                        backgroundColor: ThemeConstants.LIGHT_BG_COLOR,
                      }}
                    >
                      <CardMedia
                        component="img"
                        alt="green iguana"
                        image={item?.PreviewThumbnail}
                        sx={{
                          '&.Platform-x-CardMedia-root': {
                            minHeight: '130px',
                            objectFit: 'contain',
                          },
                        }}
                        data-testid="card-media"
                      />
                    </Card>
                    <Card
                      sx={{
                        p: { xs: 0, lg: 0 },
                        position: 'relative',
                        display: {
                          xs: 'block',
                          sm: 'block',
                          md: 'block',
                          lg: 'none',
                        },
                        backgroundColor: ThemeConstants.LIGHT_BG_COLOR,
                      }}
                      onClick={() => {
                        navigate('./about', {
                          state: item,
                        });
                      }}
                    >
                      <CardMedia
                        component="img"
                        alt="green iguana"
                        image={item?.PreviewThumbnail}
                        sx={{
                          '&.Platform-x-CardMedia-root': {
                            minHeight: '130px',
                            objectFit: 'contain',
                          },
                        }}
                        data-testid="card-media"
                      />
                    </Card>
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '0%',
                        height: '100%',
                        width: '100%',
                        transition: '.3s ease',
                        backgroundColor: ThemeConstants.LIGHT_GREY_COLOR,
                        justifyContent: 'center',
                        alignItems: 'center',
                        opacity: 0,
                        zIndex: -1,
                        display: {
                          xs: 'none',
                          lg: 'flex',
                        },
                      }}
                      className="card-overlay"
                    >
                      <Box sx={{ width: '355px' }}>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Box sx={{ width: '48%' }}>
                            <Button
                              variant="contained"
                              sx={{
                                backgroundColor:
                                  ThemeConstants.PRIMARY_MAIN_COLOR,
                                color: ThemeConstants.WHITE_COLOR,
                                '&:hover': {
                                  backgroundColor:
                                    ThemeConstants.PRIMARY_MAIN_COLOR,
                                  color: ThemeConstants.WHITE_COLOR,
                                },
                                minWidth: '0',
                                width: '100%',
                              }}
                              onClick={() => {
                                const pageDataObj = {
                                  eventType: 'Prelem Preview',
                                  PrelemPreview: true,
                                  PrelemPreviewId: item?.PrelemId,
                                  PrelemPreviewName: item?.PrelemName,
                                };
                                handleImpression(
                                  pageDataObj.eventType,
                                  pageDataObj
                                );
                                navigate('./preview', {
                                  state: item,
                                });
                              }}
                              data-testid="preview-button"
                            >
                              <PreviewIcon />
                              <Typography
                                pl={1}
                                sx={{ textTransform: 'capitalize' }}
                              >
                                {t('preview')}
                              </Typography>
                            </Button>
                          </Box>
                          <Box sx={{ width: '48%' }}>
                            <Button
                              variant="contained"
                              sx={{
                                backgroundColor:
                                  ThemeConstants.PRIMARY_MAIN_COLOR,
                                color: ThemeConstants.WHITE_COLOR,
                                '&:hover': {
                                  backgroundColor:
                                    ThemeConstants.PRIMARY_MAIN_COLOR,
                                  color: ThemeConstants.WHITE_COLOR,
                                },
                                minWidth: '0',
                                width: '100%',
                              }}
                              onClick={() => {
                                const pageDataObj = {
                                  eventType: 'About Prelem',
                                  AboutPrelem: true,
                                  AboutPrelemId: item?.PrelemId,
                                  AboutPrelemName: item?.PrelemName,
                                };
                                handleImpression(
                                  pageDataObj.eventType,
                                  pageDataObj
                                );
                                navigate('./about', {
                                  state: item,
                                });
                              }}
                              data-testid="info-button"
                            >
                              <InfoIcon />
                              <Typography
                                pl={1}
                                sx={{ textTransform: 'capitalize' }}
                              >
                                {t('about')}
                              </Typography>
                            </Button>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            marginTop: '15px',
                          }}
                        >
                          <Button
                            variant="contained"
                            sx={{
                              backgroundColor:
                                ThemeConstants.PRIMARY_MAIN_COLOR,
                              color: ThemeConstants.WHITE_COLOR,
                              '&:hover': {
                                backgroundColor:
                                  ThemeConstants.PRIMARY_MAIN_COLOR,
                                color: ThemeConstants.WHITE_COLOR,
                              },
                              width: '100%',
                            }}
                            onClick={() => {
                              const addPrelemObj = {
                                eventType: 'Add Prelem',
                                clickType: 'Add Prelem Click on Search Page',
                                PrelemId: item?.PrelemId,
                                PrelemName: item?.PrelemName,
                                Tags: item?.Tags,
                              };
                              handleImpression(
                                addPrelemObj.eventType,
                                addPrelemObj
                              );
                              addPrelem(
                                dispatch,
                                item,
                                runFetchContentQuery,
                                runFetchValidationQuery,
                                navigate,
                                page?.insertPrelemAt
                              );
                            }}
                            data-testid="add-button"
                          >
                            <AddIcon />{' '}
                            <Typography
                              pl={1}
                              sx={{ textTransform: 'capitalize' }}
                            >
                              {t('add_prelem')}
                            </Typography>
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      textAlign: 'left',
                      pt: { xs: 2, lg: 3 },
                      pb: 1,
                      letterSpacing: 'normal',
                      display: { xs: 'none', lg: 'block' },
                      fontSize: {
                        xs: ThemeConstants.FONTSIZE_DEFAULT,
                        lg: ThemeConstants.FONTSIZE_SECONDARY_DEFAULT,
                        xl: ThemeConstants.FONTSIZE_MD,
                      },
                      color: '#1f2021',
                      fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
                    }}
                    data-testid="prelem-card-title-web"
                  >
                    {item?.PrelemName}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      textAlign: 'left',
                      pt: { xs: 2, lg: 3 },
                      pb: 1,
                      letterSpacing: 'normal',
                      display: { xs: 'block', lg: 'none' },
                      fontSize: {
                        xs: ThemeConstants.FONTSIZE_DEFAULT,
                        lg: ThemeConstants.FONTSIZE_SECONDARY_DEFAULT,
                        xl: ThemeConstants.FONTSIZE_MD,
                      },
                      fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
                    }}
                    onClick={() => {
                      navigate('./about', {
                        state: item,
                      });
                    }}
                    data-testid="prelem-card-title-mobile"
                  >
                    {item?.PrelemName}
                  </Typography>
                  <Box sx={{ width: '100%', display: 'flex' }}>
                    <Typography
                      variant="body2"
                      sx={{
                        textAlign: 'left',
                        fontSize: {
                          xs: ThemeConstants.FONTSIZE_SM,
                          lg: ThemeConstants.FONTSIZE_DEFAULT,
                          xl: ThemeConstants.FONTSIZE_SECONDARY_DEFAULT,
                        },
                        letterSpacing: 'normal',
                      }}
                      data-testid="prelem-card-description"
                    >
                      {item?.Description}
                    </Typography>
                    <Box
                      sx={{
                        bottom: '20px',
                        display: {
                          xs: 'block',
                          lg: 'none',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: ThemeConstants.PRIMARY_MAIN_COLOR,
                          color: ThemeConstants.WHITE_COLOR,
                          width: '50px',
                          height: '50px',
                          '&:hover': {
                            backgroundColor: ThemeConstants.PRIMARY_MAIN_COLOR,
                            color: ThemeConstants.WHITE_COLOR,
                          },
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '50%',
                          padding: '0',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          const addPrelemObj = {
                            eventType: 'Add Prelem',
                            PrelemId: item?.PrelemId,
                            PrelemName: item?.PrelemName,
                            Tags: item?.Tags,
                          };
                          handleImpression(
                            addPrelemObj.eventType,
                            addPrelemObj
                          );
                          addPrelem(
                            dispatch,
                            item,
                            runFetchContentQuery,
                            runFetchValidationQuery,
                            navigate,
                            page?.insertPrelemAt
                          );
                        }}
                        data-testid="add-button"
                      >
                        <AddIcon />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              );
            })}
        </Box>
      </Container>
    </Box>
  );
};
