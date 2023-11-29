import EditIcon from '@mui/icons-material/Edit';
import { Box, Divider, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import DemositeHeader from 'platform-x-utils/dist/DemositeHeader';
import React, { useContext, useEffect, useState } from 'react';
import Frame from 'react-frame-component';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useUserSession from '../../../hooks/useUserSession/useUserSession';
import { Store } from '../../../store/ContextStore';
import LightTheme from '../../../theme/lightTheme';
import ThemeConstants from '../../../theme/variable';
import { tabs, theme } from './utils/constants';
import { useStyles } from './vodPreview.styles';
import PrelemTheme from '../../../theme/prelemTheme';

const prelemAuthoringHelper = {
  isAuthoring: true,
};
const VodPreview = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [deviceType, setDeviceType] = useState('desktop');
  const [getSession] = useUserSession();
  const { userInfo } = getSession();
  const navigate = useNavigate();
  const iframeRef = React.useRef<any>();
  const [height, setHeight] = useState(300);
  const { state } = useContext(Store);
  const { vod } = state;

  const handleResize = (iframe: any) => {
    if (iframe?.current?.contentDocument?.body?.scrollHeight > 100) {
      setHeight(window.parent.innerHeight - 105);
    }
  };
  const Header = React.lazy(
    () => import(`platform-x-utils/dist/${process.env?.REACT_APP_HEADER}`)
  );

  const Footer = React.lazy(
    () => import(`platform-x-utils/dist/${process.env?.REACT_APP_FOOTER}`)
  );
  const themeConstant =
    process.env?.REACT_APP_COMPONENT_THEME == 'LightTheme'
      ? ThemeConstants
      : ThemeConstants;

  const initialContent = `<!DOCTYPE html><html><head>${document.head.innerHTML}
  <style>
    #react-player video {
      object-fit: fill !important;
    }
    .tweetWrapper iframe {
      visibility: visible !important;
      position: relative !important;
    }
    body {
      overflow-x: hidden;
    }
  </style></head><body><div></div></body></html>`;

  const renderHeader = () => {
    const demoUsers = {
      'finance@demosite.com': 'finwiz',
      'retail@demosite.com': 'retail',
      'media@demosite.com': 'finwiz',
      'sports@demosite.com': 'finwiz',
    };
    if (
      userInfo &&
      userInfo.username &&
      Object.keys(demoUsers).includes(userInfo.username)
    ) {
      return (
        <ThemeProvider theme={LightTheme}>
          <DemositeHeader headerSitename={demoUsers[userInfo.username]} />
        </ThemeProvider>
      );
    } else {
      return (
        <ThemeProvider theme={theme[`${process.env?.REACT_APP_HEADER_THEME}`]}>
          <Header isAuthoring />
        </ThemeProvider>
      );
    }
  };
  const [previewObject, setPreviewObject] = useState({
    Page: '',
    SiteName: '',
    SubTitle: null,
    Title: '',
    Banner: '',
    Description: '',
    ContentType: '',
    Category: '',
    ParentPageURL: '',
    CurrentPageURL: '',
    Page_CreatedBy: '',
    Page_PublishedBy: '',
    IsEdit: false,
    SeoEnable: true,
    AnalyticsEnable: true,
    RobotTxt: false,
    SiteMap: false,
    Others: null,
    Analytics: null,
    StructureData: '',
    DevelopedBy: '',
    DevelopedDate: '',
    Page_State: '',
    UserActionInfo: '',
    Links: [],
    LinkTags: [],
    creationDate: '',
    LastModificationDate: '',
    Tag: [],
  });
  const PreviewVod = {
    Page: '',
    Description: '',
    Title: '',
    DsapceVideoUrl: '',
    Thumbnail: '',
    CurrentPageURL: '',
    ParentPageURL: '',
    Tags: [],
    Page_State: '',
    IsSoftDelete: false,
    SeoEnable: true,
    AnalyticsEnable: true,
    SiteMap: false,
    Others: null,
    Analytics: null,
    StructureData: '',
    PageSettings: {},
  };
  const ContentType = React.lazy(
    () => import('platform-x-prelems/prelems/VideoLandingPage')
  );

  useEffect(() => {
    if (Object.keys(vod?.currentVod).length > 0) {
      setPreviewObject(vod?.currentVod);
    } else {
      window.history.back();
    }
  }, [vod]);

  return (
    <>
      <Box className={classes.previewContainer}>
        <Box
          className={classes.backContainer}
          onClick={() => {
            navigate(`/content/create-vod?path=${vod?.currentVod.Page}`);
          }}
        >
          <Typography variant='body2' className={classes.editText}>
            <EditIcon className={classes.editIcon} />
            {`${t('edit')} ${t('vod')}`}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignSelf: 'center',
            border: '1px solid #ced3d9',
            borderRadius: '24px',
            margin: '10px 0',
            marginLeft: { xs: '10%', sm: 'calc(50% - 228px)' },
          }}
        >
          {tabs.map((tab, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                backgroundColor:
                  deviceType == tab.type
                    ? ThemeConstants.PRIMARY_MAIN_COLOR
                    : ThemeConstants.WHITE_COLOR,
                transition: 'all 0.50s',
                padding: '12px 27px',
                borderRadius: '24px',
                cursor: deviceType == tab.type ? 'pointer' : 'default',
              }}
              onClick={() => {
                setDeviceType(tab.type);
              }}
            >
              <tab.icon
                sx={{
                  fontSize: ThemeConstants.FONTSIZE_H2,
                  color:
                    deviceType == tab.type
                      ? ThemeConstants.WHITE_COLOR
                      : ThemeConstants.PRIMARY_MAIN_COLOR,
                  cursor: 'pointer',
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>

      <Divider sx={{ mb: { sm: '-1px' } }} />
      <Box>
        <Box
          sx={{
            border: '1px solid #ced3d9',
            borderRadius: '30px',
            padding: '10px',
            width: {
              sm:
                deviceType === 'desktop'
                  ? '100%'
                  : deviceType === 'tablet'
                    ? '100%'
                    : '402px',
              md:
                deviceType === 'desktop'
                  ? '100%'
                  : deviceType === 'tablet'
                    ? '768px'
                    : '402px',
              lg:
                deviceType === 'desktop'
                  ? '100%'
                  : deviceType === 'tablet'
                    ? '809px'
                    : '402px',
            },
            margin: 'auto',
            transition: 'width 0.50s',
          }}
        >
          <Box
            sx={{
              border: '1px solid #ced3d9',
              borderRadius: '30px',
              overflow: 'hidden',
            }}
          >
            <Frame
              width={
                deviceType === 'desktop'
                  ? '100%'
                  : deviceType === 'tablet'
                    ? '100%'
                    : '100%'
              }
              height={height}
              initialContent={initialContent}
              id='site-frame'
              ref={iframeRef}
              contentDidMount={() => handleResize(iframeRef)}
              contentDidUpdate={() => handleResize(iframeRef)}
              frameBorder='0'
            >
              {renderHeader()}
              <ThemeProvider
                theme={PrelemTheme}
              >
                <ContentType
                  content={previewObject}
                  authoringHelper={prelemAuthoringHelper}
                  secondaryArgs={{ prelemBaseEndpoint: { device: deviceType } }}
                />
              </ThemeProvider>
            </Frame>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default VodPreview;
