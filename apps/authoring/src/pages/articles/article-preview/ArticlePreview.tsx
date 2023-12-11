import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ComputerRoundedIcon from '@mui/icons-material/ComputerRounded';
import PhoneAndroidRoundedIcon from '@mui/icons-material/PhoneAndroidRounded';
import TabletAndroidRoundedIcon from '@mui/icons-material/TabletAndroidRounded';
import { Box, Divider, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React, { useContext, useEffect, useState } from 'react';
import Frame from 'react-frame-component';
import { useLocation } from 'react-router';
import { Store } from '../../../store/ContextStore';
import LightTheme from '../../../theme/lightTheme';
import ThemeConstants from '../../../theme/variable';
import PrelemTheme from '../../../theme/prelemTheme';

const theme = {
  LightTheme,
};
const tabs = [
  { type: 'desktop', icon: ComputerRoundedIcon },
  { type: 'tablet', icon: TabletAndroidRoundedIcon },
  { type: 'mobile', icon: PhoneAndroidRoundedIcon },
];
const ArticlePreview = () => {
  const [deviceType, setDeviceType] = useState('desktop');
  const iframeRef = React.useRef<any>();
  const [height, setHeight] = useState(300);
  const location = useLocation();
  const { state, dispatch } = useContext(Store);
  const { article } = state;
  const handleResize = (iframe: any) => {
    if (iframe?.current?.contentDocument?.body?.scrollHeight > 100) {
      setHeight(window.parent.innerHeight - 105);
    }
  };
  // const regularFont =
  //   process.env?.REACT_APP_COMPONENT_THEME == "XeroxTheme"
  //     ? "RobotoCondensed-Regular"
  //     : "Montserrat-regular";
  // const lightFont =
  //   process.env?.REACT_APP_COMPONENT_THEME == "XeroxTheme"
  //     ? "RobotoCondensed-Light"
  //     : "Montserrat-Light";
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
    articleContent: { Images: {}, Videos: {} },
    ArticleSettings: {},
    Tag: [],
  });
  const ContentType = React.lazy(
    () =>
      import(
        `platform-x-prelems/prelems/${previewObject.ContentType === 'article' ? 'Article' : 'VOD'
        }`
      )
  );

  const handleReturn = () => {
    window.history.back();
  };
  useEffect(() => {
    if (Object.keys(article?.currentArticle).length > 0) {
      article.currentArticle.DevelopedDate = new Date().toISOString(); //In preview we need to show current date and time
      setPreviewObject(article?.currentArticle);
    } else {
      window.history.back();
    }
  }, [article]);

  return (
    <>
      <Box
        sx={{ display: { xs: 'flex', sm: 'none' }, alignItems: 'center' }}
        onClick={handleReturn}
      >
        <ArrowBackIosIcon
          sx={{
            fontSize: ThemeConstants.FONTSIZE_H6,
            margin: '18px 4px 18px 16px',
          }}
        />
        <Typography variant='h3medium'>Back to Editing</Typography>
      </Box>
      <Box
        sx={{
          display: { xs: 'none', sm: 'flex' },
          justifyContent: 'center',
          margin: '10px 0',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid #ced3d9',
            borderRadius: '24px',
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
      <Divider sx={{ mb: { sm: '31px' } }} />
      <Box>
        <Box
          sx={{
            border: '1px solid #ced3d9',
            borderRadius: '45px',
            padding: '20px',
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
                  ? '1092px'
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
              <ThemeProvider
                theme={PrelemTheme}
              >
                <ContentType
                  content={previewObject}
                  showRecentArticles={false}
                />
              </ThemeProvider>
            </Frame>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default ArticlePreview;