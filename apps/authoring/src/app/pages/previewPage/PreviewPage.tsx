import { useLazyQuery } from '@apollo/client';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ComputerRoundedIcon from '@mui/icons-material/ComputerRounded';
import PhoneAndroidRoundedIcon from '@mui/icons-material/PhoneAndroidRounded';
import TabletAndroidRoundedIcon from '@mui/icons-material/TabletAndroidRounded';
import { Box, Divider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { PrelemTheme } from '@platformx/utilities';
import Mapping from 'platform-x-prelems/prelems/mapping';
import DemositeHeader from 'platform-x-utils/dist/DemositeHeader';
import XeroxLandingHeader from 'platform-x-utils/dist/Xheader';
import usePlatformAnalytics from 'platform-x-utils/dist/analytics';
import React, {
  createRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import Frame from 'react-frame-component';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { LightTheme } from '@platformx/utilities';
import { ThemeConstants } from '@platformx/utilities';
import { FETCH_PAGE_MODEL_DRAFT } from '../../graphql/fetchQueries';
import { FETCH_PRELEM_VALIDATION } from '../../graphql/prelemQueries';
import useUserSession from '../../hooks/useUserSession/useUserSession';
import { fetchPageModel } from '../../store/Actions';
import { Store } from '../../store/ContextStore';
import { getSubDomain } from '../../utils/helperFunctions';
import { PrelemInstance } from '../prelem-search/utils/prelemTypes';
const mappingDynamicInstance = {};
Object.keys(Mapping).forEach((item) => {
  mappingDynamicInstance[item] = React.lazy(
    () => import(`platform-x-prelems/prelems/${Mapping[item]}`)
  );
  return mappingDynamicInstance;
});

export const PreviewPage = () => {
  const { t, i18n } = useTranslation();
  const [getSession] = useUserSession();
  const { userInfo } = getSession();
  const navigate = useNavigate();
  const { device } = useParams();
  const searchPageUrl = new URL(window.location.href);
  const path = localStorage.getItem('path');
  const editOption = searchPageUrl.searchParams.get('editoption');
  const [deviceType, setDeviceType] = useState(device);
  const [height, setHeight] = useState(300);
  const [width, setWidth] = useState(0);
  const iframeRef = React.useRef<any>();
  const { state, dispatch } = useContext(Store);
  const { page } = state;
  const [handleImpression] = usePlatformAnalytics();
  const myRefs = useRef([]);
  const tabs = [
    { type: 'window', icon: ComputerRoundedIcon },
    { type: 'tablet', icon: TabletAndroidRoundedIcon },
    { type: 'mobile', icon: PhoneAndroidRoundedIcon },
  ];

  myRefs.current = page?.prelemMetaArray?.map(
    (arrayTuple: PrelemInstance, i) => myRefs.current[i] ?? createRef()
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const [runFetchPageModel] = useLazyQuery(FETCH_PAGE_MODEL_DRAFT);
  const [runFetchValidationQuery] = useLazyQuery(FETCH_PRELEM_VALIDATION);

  const Header = React.lazy(
    () => import(`platform-x-utils/dist/${process.env?.NX_HEADER}`)
  );

  const Footer = React.lazy(
    () => import(`platform-x-utils/dist/${process.env?.NX_FOOTER}`)
  );

  const theme = {
    LightTheme,
  };

  useEffect(() => {
    if (Object.keys(page?.pageModel).length === 0) {
      fetchPageModel(
        dispatch,
        runFetchPageModel,
        runFetchValidationQuery,
        searchParams?.get('page')
      );
    }
  }, []);

  const handleResize = (iframe: any) => {
    if (iframe?.current?.contentDocument?.body?.scrollHeight > 100) {
      setHeight(window.parent.innerHeight - 48);
      setWidth(window.parent.innerWidth);
    }
  };
  const themeConstant =
    process.env?.NX_COMPONENT_THEME == 'LightTheme'
      ? ThemeConstants
      : ThemeConstants;

  const initialContent = `<!DOCTYPE html><html><head>${document.head.innerHTML}<style>
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
      const pathName = path?.toLowerCase();
      const arr = pathName && pathName.split('/');
      if (arr && typeof arr === 'object' && arr.includes('landingpage')) {
        return (
          <ThemeProvider theme={theme[`${process.env?.NX_HEADER_THEME}`]}>
            <XeroxLandingHeader isAuthoring currentTab />
          </ThemeProvider>
        );
      }
      return (
        <ThemeProvider theme={theme[`${process.env?.NX_HEADER_THEME}`]}>
          <Header isAuthoring />
        </ThemeProvider>
      );
    }
  };

  return (
    <>
      <Box
        sx={{
          display: { xs: 'none', sm: 'flex' },
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '10px 0',
        }}
      >
        <Box
          pl={2}
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            backgroundColor: ThemeConstants.WHITE_COLOR,
            color: 'rgba(0, 0, 0, 0.8)',
          }}
          onClick={() => {
            history.go(-1);
          }}
        >
          <ArrowBackIcon sx={{ marginRight: '10px' }} /> {t('back')}
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
      <Box
        sx={{
          border: '1px solid #ced3d9',
          borderRadius: '45px',
          padding: '20px',
          width: {
            sm:
              deviceType === 'window'
                ? '100%'
                : deviceType === 'tablet'
                ? '100%'
                : '390px',
            md:
              deviceType === 'window'
                ? '100%'
                : deviceType === 'tablet'
                ? '820px'
                : '390px',
            lg:
              deviceType === 'window'
                ? '1280px'
                : deviceType === 'tablet'
                ? '820px'
                : '390px',
          },
          margin: 'auto',
          backgroundColor: 'whitesmoke',
        }}
      >
        <Box
          sx={{
            border: '1px solid #ced3d9',
            borderRadius: '30px',
            overflow: 'hidden',
          }}
        >
          {state && page?.prelemMetaArray && page?.prelemMetaArray.length && (
            <Frame
              width={
                deviceType === 'window'
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
              {/* {renderHeader()} */}
              <ThemeProvider theme={PrelemTheme}>
                <Box
                  sx={{
                    margin: (themeOptions) => themeOptions.prelemMargin.value,
                  }}
                >
                  {page?.prelemMetaArray?.map(
                    (arrayTuple: PrelemInstance, i) => {
                      if (!arrayTuple.IsHidden) {
                        const PrelemComponent =
                          mappingDynamicInstance[arrayTuple.PrelemId];
                        const prelemSchema = {
                          ...arrayTuple,
                          isAuthoring: true,
                        };
                        const prelemContent = { ...prelemSchema?.content };
                        const prelemAnalytics = {
                          pageId: page?.pageSettings?.PageName,
                          pageTitle: page?.pageModel?.Title,
                          pageDesc: page?.pageSettings?.PageName,
                          pageTags: page?.pageSettings?.PageTags,
                          prelemID: arrayTuple.PrelemId,
                          prelemTitle: arrayTuple.PrelemName,
                          isAuthoring: true,
                          prelemPosition: i,
                        };
                        const prelemAuthoringHelper = {
                          isAuthoring: true,
                          isSeoEnabled: true,
                          isAnalyticsEnabled: true,
                          innerRef: myRefs.current[i],
                          isModalShow: true,
                        };
                        const prelemBaseEndpoint = {
                          APIEndPoint: process.env.NX_API_URI,
                          PublishEndPoint: `${getSubDomain()}/`,
                          buttonBaseUrl: `${getSubDomain()}/`,
                          device: deviceType,
                          deliveryEndPoint: process.env.NX_DELIVERY_URI,
                          language: i18n.language,
                        };
                        const secondaryArgs = {
                          prelemBaseEndpoint,
                          gcpUrl: process.env.NX_GCP_URL,
                          bucketName: process.env.NX_BUCKET_NAME,
                        };
                        return (
                          <Box
                            key={i}
                            sx={{
                              paddingTop: (themeOptions) =>
                                themeOptions.prelemPaddingTop.value,
                              paddingBottom: (themeOptions) =>
                                themeOptions.prelemPaddingBottom.value,
                            }}
                          >
                            <PrelemComponent
                              content={prelemContent}
                              analytics={prelemAnalytics}
                              authoringHelper={prelemAuthoringHelper}
                              secondaryArgs={secondaryArgs}
                            />
                          </Box>
                        );
                      }
                    }
                  )}
                </Box>
                {/* <ThemeProvider
                  theme={theme[`${process.env?.NX_FOOTER_THEME}`]}
                >
                  <Footer />
                </ThemeProvider> */}
              </ThemeProvider>
            </Frame>
          )}
        </Box>
      </Box>
    </>
  );
};
