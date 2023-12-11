import MoreHorizIcon from '@mui/icons-material/MoreHorizRounded';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { format } from 'date-fns';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import PageStatus from '../../../../components/Common/pageStatus/PageStatus';
import ThemeConstants from '../../../../../../../libs/utilities/src/lib/themes/authoring/variable';
import CardMenu from '../CardMenu/CardMenu';
import { BaseCard } from './PageCard.styles';
import { PageCardProps } from './PageCard.types';

function PageCard({
  searchCardList,
  i,
  cardClickHandle,
  onDuplicatePage,
  handleDelete,
  handleUnpublishedPage,
  handleReschedule,
  handleCancelSchedule,
}: PageCardProps) {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const searchPageUrl = new URL(window.location.href);
  const searchCat = searchPageUrl.searchParams.get('searchCat');
  const searchTerm = searchPageUrl.searchParams.get('searchTerm');
  const sortBy = searchPageUrl.searchParams.get('sortBy');

  // const deviceDetectType = useDeviceDetect();
  const deviceDetectType = 'desktop';
  const descMaxLength = 100;
  const {
    Title,
    Status,
    Path,
    Page,
    SchduledPublishTriggerDateTime: ScheduledPublishTriggerDateTime,
    SchduledUnPublishTriggerDateTime: ScheduledUnPublishTriggerDateTime,
    Description,
    LastPublishedDate,
    LastModificationDate,
    LastModifiedBy,
    PublishedBy,
    PublishedDate,
  } = searchCardList;
  const handleCardClick = () => {
    if (
      ScheduledUnPublishTriggerDateTime == null &&
      ScheduledPublishTriggerDateTime == null &&
      Status == 'draft'
    ) {
      cardClickHandle(
        Page || '',
        Status || '',
        Path || '',
        '',
        '',
        '',
        searchCat || '',
        searchTerm || '',
        sortBy || ''
      );
    } else {
      cardClickHandle(
        Page || '',
        Status || '',
        Path || '',
        'preview',
        deviceDetectType,
        'no'
      );
    }
  };
  const dateFormat = (dataTime) => {
    return dataTime && format(new Date(dataTime), 'h:mm aa, dd LLLL');
  };
  const handleMenuActions = () => {
    return;
  };
  return (
    <>
      <Box
        sx={{
          padding: { xs: '5px', em: '10px' },
          width: { xs: '100%', sm: 'calc(100%/2 - 0px)' },
          cursor: 'pointer',
        }}
        key={i}
        onClick={handleCardClick}
      >
        <BaseCard>
          <CardContent
            sx={{
              position: 'relative',
              padding: {
                xs: '10px 20px 80px !important',
                sm: '10px 20px 120px !important',
                md: '10px 20px 80px !important',
                xl: '15px 20px 80px !important',
              },
              overflowWrap: 'break-word',
              width: '100%',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontSize: ThemeConstants.FONTSIZE_SECONDARY_DEFAULT,
                display: 'flex',
                alignItems: 'center',
                textTransform: 'capitalize',
                justifyContent: 'space-between',
              }}
              mb={1}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: {
                    xs: ThemeConstants.FONTSIZE_DEFAULT,
                    xl: ThemeConstants.FONTSIZE_SECONDARY_DEFAULT,
                  },
                }}
              >
                <Box
                  sx={{
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    display: 'block',
                    maxWidth: {
                      xs: '110px',
                      sm: '87px',
                      md: '152px',
                      lg: '152px',
                      xl: '152px',
                    },
                    '&:hover': {
                      overflow: 'visible',
                      whiteSpace: 'normal',
                      height: 'auto',
                    },
                  }}
                >
                  {Title}
                </Box>
                {ScheduledPublishTriggerDateTime && (
                  <PageStatus pageType="Scheduled Publish"></PageStatus>
                )}

                {ScheduledUnPublishTriggerDateTime && (
                  <PageStatus pageType="Scheduled Unpublish"></PageStatus>
                )}
                <PageStatus pageType={Status}></PageStatus>
              </Box>
              <IconButton
                aria-label="settings"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                sx={{ padding: '5px' }}
              >
                <MoreHorizIcon />
              </IconButton>
            </Typography>
            <Typography
              sx={{
                // paddingBottom: '10px',
                color: '#777777',
                fontSize: {
                  xs: ThemeConstants.FONTSIZE_SM,
                  xl: ThemeConstants.FONTSIZE_DEFAULT,
                },
              }}
              mb={1}
            >
              {Description && Description?.length > descMaxLength ? (
                <>{`${Description?.substring(0, descMaxLength)}...`}</>
              ) : (
                <>{Description}</>
              )}
            </Typography>
            <Box
              sx={{
                position: 'absolute',
                bottom: { xs: ' 15px', xl: '20px' },
                left: '20px',
                right: '20px',
              }}
            >
              <Divider
                sx={{
                  marginBottom: '12px',
                }}
              ></Divider>

              <Typography
                variant="h5"
                sx={{
                  fontSize: {
                    xs: ThemeConstants.FONTSIZE_XS,
                    xl: ThemeConstants.FONTSIZE_SM,
                  },
                  color: '#2d2d39',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                }}
              >
                {ScheduledUnPublishTriggerDateTime &&
                ScheduledPublishTriggerDateTime
                  ? `${t('scheduled_publish_unpublish_by')} ${PublishedBy}`
                  : ScheduledPublishTriggerDateTime
                  ? `${t('scheduled_publish_by')} ${PublishedBy}`
                  : ScheduledUnPublishTriggerDateTime
                  ? `${t('scheduled_unpublish_by ')} ${PublishedBy}`
                  : Status === 'published'
                  ? `${t('published_by')} ${PublishedBy}`
                  : `${t('modified_by')} ${LastModifiedBy}`}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: {
                    xs: ThemeConstants.FONTSIZE_XS,
                    xl: ThemeConstants.FONTSIZE_SM,
                  },
                  letterSpacing: { xs: ThemeConstants.LETTER_SPACING_LG },
                  color: '#777777',
                  textTransform: 'capitalize',
                }}
              >
                {ScheduledUnPublishTriggerDateTime &&
                ScheduledPublishTriggerDateTime ? (
                  <Box component="div">
                    Scheduled to Publish at
                    <span
                      style={{
                        fontWeight: 'bold',
                        paddingLeft: '5px',
                        paddingRight: '5px',
                      }}
                    >
                      {dateFormat(ScheduledPublishTriggerDateTime)}
                    </span>
                    | Scheduled to Unpublish at
                    <span style={{ fontWeight: 'bold', paddingLeft: '5px' }}>
                      {dateFormat(ScheduledUnPublishTriggerDateTime)}
                    </span>
                  </Box>
                ) : ScheduledPublishTriggerDateTime ? (
                  <Box component="div">
                    Scheduled to Publish at
                    <span style={{ fontWeight: 'bold', paddingLeft: '5px' }}>
                      {dateFormat(ScheduledPublishTriggerDateTime)}
                    </span>
                  </Box>
                ) : ScheduledUnPublishTriggerDateTime ? (
                  <Box component="div">
                    Scheduled to Unpublish at
                    <span style={{ fontWeight: 'bold', paddingLeft: '5px' }}>
                      {dateFormat(ScheduledUnPublishTriggerDateTime)}
                    </span>
                  </Box>
                ) : Status === 'published' ? (
                  <Box component="div">
                    {t('published_by')}
                    <span style={{ paddingLeft: '5px' }}>
                      {dateFormat(PublishedDate)}
                    </span>
                  </Box>
                ) : Status === 'draft' && LastPublishedDate ? (
                  `${t('last_modified_at')} ${dateFormat(
                    LastModificationDate
                  )} | ${t('last_published_at')} ${dateFormat(
                    LastPublishedDate
                  )}`
                ) : (
                  `${t('last_modified_at')} ${dateFormat(LastModificationDate)}`
                )}
              </Typography>
            </Box>
          </CardContent>
        </BaseCard>
      </Box>
      <CardMenu
        PageDetails={searchCardList}
        Open={open}
        AnchorEl={anchorEl}
        handleClose={() => {
          setAnchorEl(null);
        }}
      ></CardMenu>
    </>
  );
}

export default memo(PageCard);
