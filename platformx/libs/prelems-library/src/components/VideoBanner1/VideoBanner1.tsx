import { Box, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import ReactPlayer from "react-player";
import { useCustomStyle } from "./VideoBanner1.style";
import "./VideoBanner1.css";
import { usePrelemImpression } from "Common/ImpressionHooks/PrelemImpressionHook";

const VideoBanner1 = ({ content, analytics, authoringHelper, secondaryArgs }: VideoBanner1Prop) => {
  const firstRender = useRef(true);
  const scrollRef = useRef("DOWN");
  const scrollValueRef = useRef(1);
  const { ref, inView } = useInView({
    threshold: 0.2,
  });
  const { ref: secondBoxRef } = useInView({
    threshold: 0,
  });
  const boxRef = React.useRef<null | HTMLElement>(null);
  const generateStructureData = () => {
    let fullWidthVideoStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);
    if (firstRender.current && String(tempSD).length > 0) {
      fullWidthVideoStructureData = JSON.parse(tempSD);
    } else {
      try {
        fullWidthVideoStructureData = {
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: content?.Videos?.Video_1?.Title,
          description: content?.Videos?.Video_1?.Description,
          thumbnailUrl: content?.Videos?.Video_1?.Thumbnail,
          contentUrl: content?.Videos?.Video_1?.Url,
        };
      } catch (e) {
        fullWidthVideoStructureData = {};
      }
    }
    firstRender.current = false;
    return fullWidthVideoStructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    content?.Videos?.Video_1?.Title,
    content?.Videos?.Video_1?.Description,
    content?.Videos?.Video_1?.Url,
    content?.BannerTitle,
  ]);

  usePrelemImpression(analytics, inView);
  /* AnalyticsEnabled dependency added as many times we are not getting analytics provider*async call)
  1. we are first checking in publish app if analytics provider is avaiable or not
  2. if its available we are setting AnalyticsEnabled to true
  3. if its not available we are setting false
  */

  let val = 1;
  let oldScrollY = typeof window !== "undefined" && window?.scrollY;
  let iframeVal = 1;

  const handleScroll = () => {
    //Subtract the two and conclude
    if (typeof window !== "undefined") {
      if (oldScrollY < window?.scrollY) {
        scrollRef.current = "DOWN";
      } else {
        scrollRef.current = "UP";
      }
      oldScrollY = window?.scrollY;
      const doc = authoringHelper?.innerRef?.current;
      if (inView) {
        if (scrollRef.current === "DOWN") {
          val = scrollValueRef.current + 0.006;
          if (val >= 1 && val < 1.5) {
            scrollValueRef.current = val;
            if (doc)
              doc.querySelector(
                "#BannerTitle",
              )!.style.transform = `scale(${scrollValueRef.current})`;
          }
        }

        if (scrollRef.current === "UP") {
          val = scrollValueRef.current - 0.009;
          if (val >= 1 && val < 1.5) {
            scrollValueRef.current = val;
            if (doc)
              doc.querySelector(
                "#BannerTitle",
              )!.style.transform = `scale(${scrollValueRef.current})`;
          }
          if (window?.scrollY === 0) {
            if (doc) doc.querySelector("#BannerTitle")!.style.transform = `scale(1)`;
          }
        }
        // }
      }
    }
  };

  let iframe: HTMLIFrameElement | null | undefined;
  if (analytics?.isAuthoring) iframe = document?.getElementsByTagName("iframe")[0];
  let iframeoldScrollY: number | undefined;
  if (iframe && iframe.id === "site-frame") iframeoldScrollY = iframe?.contentWindow!.scrollY;

  const handleIframeScroll = () => {
    if (iframeoldScrollY && iframe) {
      //Subtract the two and conclude
      if (iframeoldScrollY < iframe?.contentWindow!.scrollY) {
        scrollRef.current = "DOWN";
      } else {
        scrollRef.current = "UP";
      }
      iframeoldScrollY = iframe?.contentWindow!.scrollY;
      const doc = authoringHelper?.innerRef?.current;
      if (inView) {
        if (scrollRef.current === "DOWN") {
          iframeVal = scrollValueRef.current + 0.006;
          if (iframeVal >= 1 && iframeVal < 1.5) {
            scrollValueRef.current = iframeVal;
            doc.querySelector("#BannerTitle")!.style.transform = `scale(${scrollValueRef.current})`;
          }
        }

        if (scrollRef.current === "UP") {
          iframeVal = scrollValueRef.current - 0.009;
          if (iframeVal >= 1 && iframeVal < 1.5) {
            scrollValueRef.current = iframeVal;
            doc.querySelector("#BannerTitle")!.style.transform = `scale(${scrollValueRef.current})`;
          }
          if (iframe?.contentWindow!.scrollY === 0) {
            doc.querySelector("#BannerTitle")!.style.transform = `scale(1)`;
          }
        }
      }
    }
  };

  useEffect(() => {
    if (analytics?.isAuthoring) {
      const iframe1: HTMLIFrameElement | null | undefined =
        document?.getElementsByTagName("iframe")[0];
      if (iframe1 && iframe1.id === "site-frame") {
        iframe1.contentWindow!.addEventListener("scroll", handleIframeScroll);
      }
    } else {
      window?.addEventListener("scroll", handleScroll);
    }
    return () => {
      window?.removeEventListener("scroll", handleScroll);
      if (iframe && iframe.id === "site-frame") {
        iframe.contentWindow!.addEventListener("scroll", handleIframeScroll);
      }
    };
  }, [inView]);
  const onClickScroll = (e: any) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      const pageHeight = window.innerHeight;
      window.scrollBy({
        top: pageHeight,
        behavior: "smooth",
      });
    }
  };
  const classes = useCustomStyle();
  return (
    <Box ref={authoringHelper?.innerRef} className={`${classes.videoBanner1Wrapper} videoBanner1`}>
      <Box className='animatorContainer'>
        <Box className='banner' ref={ref}>
          {secondaryArgs?.editState ? (
            <img alt='banner2' src={content.Videos.Video_1.Thumbnail} />
          ) : (
            <ReactPlayer
              className='react-player-anime'
              url={content?.Videos?.Video_1?.Url}
              config={{
                youtube: { playerVars: { disablekb: 1 } },
                file: { attributes: { controlsList: "nodownload" } },
              }}
              muted={true}
              playing={true}
              controls={false}
              playsinline={true}
              loop={true}
            />
          )}
          <Typography id='BannerTitle' variant='h3bold' gutterBottom className='bannerText'>
            <span>{content.BannerTitle}</span>
          </Typography>
        </Box>
        <Box className='anibuttonwrapper'>
          <Box className='videobanner1mouse-indicator' onClick={(e) => onClickScroll(e)}>
            <Box className='vb1mouse-down'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 30 45'
                enableBackground='new 0 0 30 45'>
                <path
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeMiterlimit='10'
                  d='M15,1.118c12.352,0,13.967,12.88,13.967,12.88v18.76  c0,0-1.514,11.204-13.967,11.204S0.931,32.966,0.931,32.966V14.05C0.931,14.05,2.648,1.118,15,1.118z'></path>
              </svg>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box id='next_video' ref={boxRef} className='bottomWrapper'>
        <Box ref={secondBoxRef}>
          {secondaryArgs?.editState ? (
            <img alt='banner3' className='bottomWraperImg' src={content.Videos.Video_1.Thumbnail} />
          ) : (
            <ReactPlayer
              className='react-player'
              url={content?.Videos?.Video_1?.Url}
              config={{
                youtube: { playerVars: { disablekb: 1 } },
                file: { attributes: { controlsList: "nodownload" } },
              }}
              muted={true}
              playsinline={true}
              playing={true}
              controls={false}
              loop={true}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

interface VideoBanner1Prop {
  content: Content;
  analytics: Analytics;
  authoringHelper?: AuthoringHelper;
  secondaryArgs?: any;
}

interface Analytics {
  pageId?: number;
  prelemId?: number;
  pageTitle?: string;
  prelemTitle?: string;
  pageDesc?: string;
  pageTags?: string;
  prelemTags?: string;
  prelemPosition?: number;
  isAnalyticsEnabled: boolean;
  isAuthoring: boolean;
  isSeoEnabled: boolean;
}

interface AuthoringHelper {
  innerRef: any;
  sendStructureDataToAuthoringCB: (structureData: string) => void;
  openButtonEditWindowInAuthoringCB: (buttonObj?: object, e?: object) => void;
  selectedButtonNameForEditing: string;
  isEditing: boolean;
  buttonRef?: React.Ref<HTMLButtonElement>;
  buttonContentEditable?: boolean;
  lastSavedStructuredData?: string;
}

interface Content {
  BannerTitle: string;
  Description1: string;
  Description2: string;
  Videos: {
    Video_1: {
      Name: string;
      Url: string;
      Title: string;
      Description: string;
      Attribution: boolean;
      Transcript: boolean;
      CC: boolean;
      Thumbnail: string;
    };
  };
}

VideoBanner1.defaultProps = {
  content: {
    BannerTitle: "Lorem ipsum",

    Videos: {
      Video_1: {
        Name: "HCL 360 Video",
        Url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/69ba1992-15d9-4d0d-9251-f79ae37184d5/content",
        Title: "HCL 360 Video",
        Description: "This is for HCL 360 Video",
        Attribution: false,
        CC: false,
        Transcript: false,
        Thumbnail:
          "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/34810a26-1b45-4349-9848-e37f0994fc75/content",
      },
    },
    // "Description1": "Lorem ipsum dolor sit amet, consectetur",
    // "Description2": "Lorem ipsum dolor sit amet, consectetur",
    PlayerType: "dspace",
  },
  authoringHelper: {
    innerRef: null,
    sendStructureDataToAuthoringCB: () => {},
    openButtonEditWindowInAuthoringCB: () => {},
    selectedButtonNameForEditing: "",
    isEditing: false,
    buttonRef: null,
    buttonContentEditable: false,
    lastSavedStructuredData: "",
  },

  analytics: {
    isAnalyticsEnabled: true,
    isSeoEnabled: false,
    isAuthoring: false,
    position: 0,
    pageId: 1234,
    prelemId: 2345,
    pageTitle: "Video Banner 1",
    pageDesc: "This prelem can be used as the header banner with video along with animation.",
    pageTags: "Header Banner, Video Banner, Animated Banner",
    prelemTags: "Header Banner, Video Banner, Animated Banner",
  },
};

export default VideoBanner1;
