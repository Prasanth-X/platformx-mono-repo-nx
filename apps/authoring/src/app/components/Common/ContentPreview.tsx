import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import weakMemoize from '@emotion/weak-memoize';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ComputerRoundedIcon from '@mui/icons-material/ComputerRounded';
import PhoneAndroidRoundedIcon from '@mui/icons-material/PhoneAndroidRounded';
import TabletAndroidRoundedIcon from '@mui/icons-material/TabletAndroidRounded';
import { Box, Divider, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React, { useContext, useEffect, useState } from 'react';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Store } from '../../store/ContextStore';
import { LightTheme } from '@platformx/utilities';
import { ThemeConstants } from '@platformx/utilities';
import { authInfo } from '../../utils/authConstants';
import { PrelemTheme } from '@platformx/utilities';

const theme = {
  LightTheme,
};

const tabs = [
  { type: 'desktop', icon: ComputerRoundedIcon },
  { type: 'tablet', icon: TabletAndroidRoundedIcon },
  { type: 'mobile', icon: PhoneAndroidRoundedIcon },
];

const prelemAuthoringHelper = {
  isAuthoring: true,
};
const secondaryArgs = {
  gcpUrl: authInfo.gcpUri,
  bucketName: authInfo.gcpBucketName,
};
const ContentPreview = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const iframeRef = React.useRef<any>();
  const [deviceType, setDeviceType] = useState('desktop');
  const { state, dispatch } = useContext(Store);
  const { content } = state;

  const memoizedCreateCacheWithContainer = weakMemoize((container: any) => {
    const newCache = createCache({ container, key: 'css', prepend: true });
    return newCache;
  });
  const [height, setHeight] = useState(300);
  const [previewObject, setPreviewObject] = useState({
    title: '',
    short_description: '',
    background_content: {
      objectType: '',
      Url: '',
      Color: '',
    },
    display_scores: '',
    result_range_1: '',
    result_range_2: '',
    result_range_3: '',
    result_range_4: '',
    questions: [
      {
        question_type: '',
        question: '',
        short_description: '',
        background_content: {
          Url: '',
          IsImage: Boolean,
          Title: '',
          Description: '',
          ColorCode: '',
        },
        is_image_option: Boolean,
        options_compound_fields: [
          {
            option_id: Number,
            option_image: {
              url: '',
              title: '',
            },
            is_correct: Boolean,
            option_text: '',
          },
        ],
      },
    ],
    options_compound_fields: '',
    contentType: '',
  });
  const initialContent = `<!DOCTYPE html><html><head>${document.head.innerHTML}
  <style>
    body {
      overflow-x: hidden;
    }
  </style></head><body><div class="frame-root"></div><div id="modal-root"></div></body></html>`;
  const ContentType = React.lazy(
    () =>
      import(
        `platform-x-prelems/prelems/${
          previewObject?.contentType === 'Event'
            ? 'EventLandingPage'
            : previewObject?.contentType
        }`
      )
  );

  const handleReturn = () => {
    window.history.back();
  };
  const handleResize = (iframe: any) => {
    if (iframe?.current?.contentDocument?.body?.scrollHeight > 100) {
      setHeight(window.parent.innerHeight);
    }
  };
  useEffect(() => {
    if (Object.keys(content?.currentContent).length > 0) {
      setPreviewObject(content?.currentContent);
    } else {
      window.history.back();
    }
  }, [content]);
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
        <Typography variant="h3medium">
          {t('resend_text_left_button')}
        </Typography>
      </Box>
      <Box
        sx={{
          display: { xs: 'none', sm: 'flex' },
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '10px 0',
        }}
      >
        <Box pl={2} onClick={() => navigate(-1)} sx={{ cursor: 'pointer' }}>
          <ArrowBackIcon />
        </Box>
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
        <Box>{}</Box>
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
                  ? '909px'
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
              id="site-frame"
              ref={iframeRef}
              contentDidMount={() => handleResize(iframeRef)}
              contentDidUpdate={() => handleResize(iframeRef)}
              frameBorder="0"
            >
              <FrameContextConsumer>
                {({ document }: any) => {
                  return (
                    <CacheProvider
                      value={memoizedCreateCacheWithContainer(document.head)}
                    >
                      <ThemeProvider theme={PrelemTheme}>
                        <ContentType
                          content={previewObject}
                          showLoading={false}
                          results={previewObject.options_compound_fields}
                          enablePreview
                          authoringHelper={prelemAuthoringHelper}
                          secondaryArgs={secondaryArgs}
                        />
                      </ThemeProvider>
                    </CacheProvider>
                  );
                }}
              </FrameContextConsumer>
            </Frame>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default ContentPreview;
