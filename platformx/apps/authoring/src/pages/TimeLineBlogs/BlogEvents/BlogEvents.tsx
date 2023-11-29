import React, { useState, useEffect } from 'react';
import './BlogEvents.css';
import { format } from 'date-fns';
import { addMinutes } from 'date-fns';
import { makeStyles } from '@material-ui/core';

import { useLazyQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import ThemeConstants from '../../../theme/variable';
import liveIcon from '../../../assets/red_blinking_gif.gif';
import { Box, Button, Divider, Typography } from '@mui/material';
import SkeltonLoader from '../../../components/Skeleton-loader/skeleton';
import { CalendarTodayOutlined, ScheduleOutlined } from '@mui/icons-material';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { fetchContentByPath } from '../../../services/contentTypes/contentTypes.api';
import { showToastError } from '../../../components/toastNotification/toastNotificationReactTostify';
import { getSubDomain } from '../../../utils/helperFunctions';

const useStyles = makeStyles({
  eventSpacer: {
    marginTop: '12px',
  },
  dotSeparator: {
    fontSize: '6px',
  },
  timeField: {
    padding: '2px 0 8px 0',
    marginRight: '35px !important',
  },
  eventIcon: {
    position: 'relative',
    top: '6px',
    marginRight: '12px',
    fontSize: '18px',
    color: '#89909A',
  },
  button: {
    backgroundColor: ThemeConstants.LIGHT_GREY_COLOR,
    color: ThemeConstants.BLACK_COLOR_VARIANT1,
    padding: '10px',
    borderRadius: '3px',
    fontSize: ThemeConstants.FONTSIZE_XS,
    textTransform: 'capitalize',
    marginRight: '10px',
    '&:hover': {
      color: `${ThemeConstants.BLACK_COLOR_VARIANT1} !important`,
    },
  },
  selectField: {
    padding: '0 18px',
    borderRadius: '4px',
    border: 'solid 1px #2d2d39',
    backgroundColor: '#fff',
    width: '100%',
    marginTop: '15px',
  },
  noGapRight: {
    marginRight: '0px !important',
  },
});

interface EventsProps {
  eventPath: string;
}

const BlogEvents: React.FC<EventsProps> = (_props: any) => {
  const { eventPath = '' } = _props;
  const classes = useStyles();
  const { t } = useTranslation();

  const [runFetchContentByPath] = useLazyQuery(fetchContentByPath);
  const [eventState, setEventState] = useState('');
  const [selectedEventDetaiils, setSelectedEventDetails] = useState<any>();

  const tagLength = selectedEventDetaiils?.tags?.length - 2;
  const eventUrl = `${getSubDomain()}/event${
    selectedEventDetaiils?.current_page_url
  }`;

  const viewEventHandle = () => {
    window.open(eventUrl, '_blank');
  };

  const getEventStatus = (startDate: any, endDate: any) => {
    const currentDateTime = addMinutes(new Date(), 1);
    if (startDate || endDate) {
      const eventStartDate = new Date(startDate);
      const eventEndDate = new Date(endDate);
      if (currentDateTime > eventEndDate) {
        return 'completed';
      } else if (
        currentDateTime > eventStartDate &&
        currentDateTime < eventEndDate
      ) {
        return 'live';
      } else if (eventStartDate > currentDateTime) {
        return 'tobestart';
      } else {
        return 'error';
      }
    } else {
      return 'error';
    }
  };

  const getEventDetails = () => {
    if (eventPath) {
      runFetchContentByPath({
        variables: { contentType: 'Event', path: eventPath },
      })
        .then((res) => {
          if (res?.data?.authoring_getCmsContentByPath) {
            const contentObj = res?.data?.authoring_getCmsContentByPath;
            if (
              contentObj?.page_state === 'PUBLISHED' ||
              (contentObj?.page_state === 'DRAFT' &&
                contentObj?.lastPublishedDate)
            ) {
              setSelectedEventDetails(contentObj);
              const eventStatus = getEventStatus(
                contentObj?.event_start_date,
                contentObj?.event_end_date
              );
              setEventState(eventStatus);
            } else {
              showToastError("Couldn't find the event.");
            }
          } else {
            showToastError("Couldn't find the event.");
          }
        })
        .catch((err) => {
          showToastError(t('api_error_toast'));
        });
    } else {
      showToastError('Invalid URL.');
    }
  };

  useEffect(() => {
    if (eventPath) {
      getEventDetails();
    }
  }, [eventPath]);

  return (
    <>
      {selectedEventDetaiils && selectedEventDetaiils?.banner_image ? (
        <Box sx={{ position: 'relative', left: '0', top: '0', right: '0' }}>
          <Box
            className='eventArea'
            sx={{
              display: { xs: 'unset', em: 'flex' },
              flexDirection: 'column',
              flexWrap: 'nowrap',
              alignItems: 'stretch',
              height: { em: 'calc(100vh - 88px)', xs: 'unset' },
            }}
          >
            <Box
              className='innerContentArea'
              sx={{
                display: { md: 'flex', xs: 'unset !important' },
                flexDirection: 'column',
                flexWrap: 'nowrap',
                alignItems: 'stretch',
                height: { em: 'calc(100vh - 150px)', xs: 'unset' },
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  flexShrink: 1,
                  backgroundColor: '#fff',
                  outline: 'none',
                }}
              >
                <Box sx={{ position: 'relative', width: '100%' }}>
                  <img
                    src={selectedEventDetaiils?.banner_image}
                    className='eventImage'
                    width='100%'
                  />
                  <Box
                    sx={{
                      visibility: eventState == 'live' ? 'initial' : 'hidden',
                    }}
                  >
                    <img src={liveIcon} className='eventLiveIcon' />
                  </Box>
                </Box>
                <Box sx={{ margin: '12px 18px 5px 18px' }}>
                  <Typography
                    variant='h6semibold'
                    component='h6'
                    sx={{ color: ThemeConstants.BLACK_COLOR_VARIANT1 }}
                    className='eventTitle'
                  >
                    {selectedEventDetaiils?.title}
                  </Typography>
                  <Typography
                    variant='h6regular'
                    component='p'
                    className='eventDescription'
                  >
                    {selectedEventDetaiils?.description}
                  </Typography>
                  <Divider sx={{ margin: { xs: '0 -18px', lg: '0 0px' } }} />
                  {selectedEventDetaiils?.event_start_date ? (
                    <Box className={classes.eventSpacer}>
                      <Typography variant='h6semibold' component='h6'>
                        Event Start
                      </Typography>
                      <Box sx={{ display: 'flex' }}>
                        <Typography
                          variant='h6regular'
                          component='h6'
                          className={classes.timeField}
                        >
                          <CalendarTodayOutlined
                            className={classes.eventIcon}
                          />
                          {selectedEventDetaiils?.event_start_date
                            ? format(
                                new Date(
                                  selectedEventDetaiils?.event_start_date
                                ),
                                'LLL dd, yyyy'
                              )
                            : ''}
                        </Typography>
                        <Typography
                          variant='h6regular'
                          component='h6'
                          className={`${classes.timeField} ${classes.noGapRight}`}
                        >
                          <ScheduleOutlined className={classes.eventIcon} />
                          {selectedEventDetaiils?.event_start_date &&
                            format(
                              new Date(selectedEventDetaiils?.event_start_date),
                              'H:mm'
                            )}
                        </Typography>
                      </Box>
                    </Box>
                  ) : (
                    ''
                  )}
                  {selectedEventDetaiils?.event_end_date ? (
                    <Box>
                      <Typography
                        variant='h6semibold'
                        component='h6'
                        className={classes.eventSpacer}
                      >
                        Event End
                      </Typography>
                      <Box sx={{ display: 'flex' }}>
                        <Typography
                          variant='h6regular'
                          component='h6'
                          className={classes.timeField}
                        >
                          <CalendarTodayOutlined
                            className={classes.eventIcon}
                          />
                          {selectedEventDetaiils?.event_end_date &&
                            format(
                              new Date(selectedEventDetaiils?.event_end_date),
                              'LLL dd, yyyy'
                            )}
                        </Typography>
                        <Typography
                          variant='h6regular'
                          component='h6'
                          className={`${classes.timeField} ${classes.noGapRight}`}
                        >
                          <ScheduleOutlined className={classes.eventIcon} />
                          {selectedEventDetaiils?.event_end_date &&
                            format(
                              new Date(selectedEventDetaiils?.event_end_date),
                              'H:mm'
                            )}
                        </Typography>
                      </Box>
                    </Box>
                  ) : null}
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                flexGrow: '0',
                flexShrink: '0',
                margin: '2px 20px 20px 20px',
                marginBottom: '16px',
                display: { xs: 'none', em: 'block' },
              }}
            >
              <Button
                variant='outlined'
                sx={{
                  mr: 2,
                  background: '#fff !important',
                  width: '100%',
                  justifyContent: 'flex-start !important',
                }}
                size='large'
                endIcon={
                  <ArrowForwardIosOutlinedIcon className='eventArrowIcon' />
                }
                className={classes.button}
                onClick={viewEventHandle}
              >
                <Typography variant='h6semibold' component='h6'>
                  {' '}
                  View Full Event{' '}
                </Typography>
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              marginBottom: '16px',
              display: { xs: 'block', em: 'none' },
            }}
          >
            <Button
              variant='outlined'
              sx={{
                mr: 2,
                background: '#fff !important',
                width: '100%',
                justifyContent: 'flex-start !important',
                mt: 2,
              }}
              size='large'
              endIcon={
                <ArrowForwardIosOutlinedIcon className='eventArrowIcon' />
              }
              className={classes.button}
              onClick={viewEventHandle}
            >
              <Typography variant='h6semibold' component='h6'>
                {' '}
                View Full Event{' '}
              </Typography>
            </Button>
          </Box>
        </Box>
      ) : (
        <Box sx={{ position: 'relative', left: '0', top: '0', right: '0' }}>
          <SkeltonLoader maxWidth={800} maxHeight={500} />
        </Box>
      )}
    </>
  );
};
export default React.memo(BlogEvents);
