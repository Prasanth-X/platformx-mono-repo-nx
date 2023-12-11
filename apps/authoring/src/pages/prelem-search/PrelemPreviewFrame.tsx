import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Mapping from 'platform-x-prelems/prelems/mapping';
import React, { useState } from 'react';
import Frame from 'react-frame-component';
import LightTheme from '../../theme/lightTheme';
import ThemeConstants from '../../theme/variable';
import { PrelemPreviewFrameType } from './utils/prelemTypes';
import PrelemTheme from '../../theme/prelemTheme';
const mappingDynamicInstance = {};
Object.keys(Mapping).forEach((item) => {
  mappingDynamicInstance[item] = React.lazy(
    () => import(`platform-x-prelems/prelems/${Mapping[item]}`)
  );
  return mappingDynamicInstance;
});

const PrelemPreviewFrame = ({
  children,
  device,
  prelemid,
}: PrelemPreviewFrameType) => {
  const [height, setHeight] = useState(300);
  const iframeRef = React.useRef<any>();
  const handleResize = (iframe: any) => {
    if (
      iframe?.current?.contentDocument?.body?.scrollHeight > 100 &&
      prelemid == 'Prelem_020' &&
      device == 'tablet'
    ) {
      setHeight(400);
    } else if (prelemid == 'Prelem_028') {
      setHeight(500);
    } else if (iframe?.current?.contentDocument?.body?.scrollHeight > 100) {
      setHeight(iframe.current.contentDocument.body.scrollHeight);
    }
  };
  const theme = {
    LightTheme,
  };

  const themeConstant =
    process.env?.REACT_APP_COMPONENT_THEME == 'LightTheme'
      ? ThemeConstants
      : ThemeConstants;

  const initialContent = `<!DOCTYPE html><html><head>${document.head.innerHTML}<style>
    .tweetWrapper iframe {
      visibility: visible !important;
      position: relative !important;
    }
    @media only screen and (min-width: 768px) {
      .tweetWrapper iframe {
        width: 83% !important;
      }
    }
    
    @media only screen and (min-width: 992px) {
      .tweetWrapper iframe {
        width: 72% !important;
      }
    }
    ::-webkit-scrollbar {
      width: 0px;
      height: 10px;
      display: none; 
  }
  ::-webkit-scrollbar-button:start:decrement,
  ::-webkit-scrollbar-button:end:increment  {
      height: 30px;
      background-color: transparent;
  }
  ::-webkit-scrollbar-track-piece  {
      background-color: #3b3b3b;
     -webkit-border-radius: 16px;
  }
  ::-webkit-scrollbar-thumb:vertical {
      height: 50px;
      background-color: #666;
      border: 1px solid #eee;
      -webkit-border-radius: 6px;
  }
    </style></head><body><div></div></body></html>`;

  return (
    <Box
      sx={{
        width: {
          xs:
            device === 'desktop'
              ? '1280px'
              : device === 'tablet'
                ? '794px'
                : '100%',
          sm:
            device === 'desktop'
              ? '1280px'
              : device === 'tablet'
                ? '794px'
                : '431px',
          md:
            device === 'desktop'
              ? '1280px'
              : device === 'tablet'
                ? '794px'
                : '431px',
          lg:
            device === 'desktop'
              ? '100%'
              : device === 'tablet'
                ? '55vw'
                : '30vw',
        },
      }}
    >
      <Frame
        width="100%"
        height={height}
        ref={iframeRef}
        contentDidMount={() => handleResize(iframeRef)}
        contentDidUpdate={() => handleResize(iframeRef)}
        scrolling={prelemid == 'Prelem_028' ? 'yes' : 'no'}
        frameBorder='0'
        initialContent={initialContent}
      >
        <ThemeProvider
          theme={PrelemTheme}
        >
          <Box
            sx={{ margin: (themeOptions) => themeOptions.prelemMargin.value }}
          >
            {children}
          </Box>
        </ThemeProvider>
      </Frame>
    </Box>
  );
};
export default PrelemPreviewFrame;
