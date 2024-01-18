import React, { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { useInView } from "react-intersection-observer";
import "../../Style.css";
import { useCustomStyle } from "./AnimationOnPageScroll.style";
import prelemTypes from "../../globalStyle";
import { usePrelemImpression } from "../../components/ImpressionHooks/PrelemImpressionHook";

const AnimationOnPageScroll = ({
  content,
  analytics,
  authoringHelper,
  secondaryArgs,
}: AnimationOnPageScrollProp) => {
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  const scrollRef = useRef("DOWN");
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const generateStructureData = () => {
    const websiteIntroduction2StructureData = {};
    return websiteIntroduction2StructureData;
  };
  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content?.Text1, content?.Text2]);

  usePrelemImpression(analytics, inView, secondaryArgs);

  let val = 0;
  // let oldScrollY = typeof window !== 'undefined' && window?.scrollY;
  // let iframeVal = 1;
  // const handleScroll = () => {
  //   if (typeof window !== 'undefined') {
  //     if (oldScrollY < window?.scrollY) {
  //       scrollRef.current = 'DOWN';
  //     } else {
  //       scrollRef.current = 'UP';
  //     }
  //     oldScrollY = window?.scrollY;
  //     const doc = authoringHelper?.innerRef?.current;
  //     if (inView) {
  //       if (scrollRef.current == 'DOWN') {
  //         val = scrollValueRef.current + 8;
  //         if (val >= 1) {
  //           scrollValueRef.current = val;
  //           doc.querySelector(
  //             '#Text1'
  //           )!.style.marginLeft = `${scrollValueRef.current}px`;
  //           doc.querySelector(
  //             '#Text2'
  //           )!.style.marginRight = `${scrollValueRef.current}px`;
  //         }
  //       }

  //       if (scrollRef.current == 'UP') {
  //         val = scrollValueRef.current - 8;
  //         if (val >= 1) {
  //           scrollValueRef.current = val;
  //           doc.querySelector(
  //             '#Text1'
  //           )!.style.marginLeft = `${scrollValueRef.current}px`;
  //           doc.querySelector(
  //             '#Text2'
  //           )!.style.marginRight = `${scrollValueRef.current}px`;
  //         }
  //       }
  //     }
  //   }
  // };

  // let iframe: HTMLIFrameElement | null | undefined;
  // if (analytics?.isAuthoring)
  //   iframe = document?.getElementsByTagName('iframe')[0];
  // let iframeoldScrollY = iframe?.contentWindow!.scrollY;

  // const handleIframeScroll = () => {
  //   if (iframeoldScrollY && iframe) {
  //     //Subtract the two and conclude
  //     if (iframeoldScrollY < iframe?.contentWindow!.scrollY) {
  //       scrollRef.current = 'DOWN';
  //     } else {
  //       scrollRef.current = 'UP';
  //     }
  //     iframeoldScrollY = iframe?.contentWindow!.scrollY;
  //     const doc = authoringHelper?.innerRef?.current;
  //     if (inView) {
  //       if (scrollRef.current == 'DOWN') {
  //         iframeVal = scrollValueRef.current + 4;
  //         if (iframeVal >= 1) {
  //           scrollValueRef.current = val;
  //           doc.querySelector(
  //             '#Text1'
  //           )!.style.marginLeft = `${scrollValueRef.current}px`;
  //           doc.querySelector(
  //             '#Text2'
  //           )!.style.marginRight = `${scrollValueRef.current}px`;
  //         }
  //       }

  //       if (scrollRef.current == 'UP') {
  //         iframeVal = scrollValueRef.current - 4;
  //         if (iframeVal >= 1) {
  //           scrollValueRef.current = val;
  //           doc.querySelector(
  //             '#Text1'
  //           )!.style.marginLeft = `${scrollValueRef.current}px`;
  //           doc.querySelector(
  //             '#Text2'
  //           )!.style.marginRight = `${scrollValueRef.current}px`;
  //         }
  //       }
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (analytics?.isAuthoring) {
  //     const iframe1: HTMLIFrameElement | null | undefined =
  //       document?.getElementsByTagName('iframe')[0];
  //     if (iframe1 && iframe1.id === 'site-frame') {
  //       iframe1.contentWindow!.addEventListener('scroll', handleIframeScroll);
  //     }
  //   } else {
  //     window?.addEventListener('scroll', handleScroll);
  //   }
  //   return () => {
  //     window?.removeEventListener('scroll', handleScroll);
  //     if (iframe && iframe.id == 'site-frame') {
  //       iframe.contentWindow!.addEventListener('scroll', handleIframeScroll);
  //     }
  //   };
  // }, [inView]);

  useEffect(() => {
    if (analytics?.isAuthoring) {
      // eslint-disable-next-line prefer-destructuring
      const iframe: HTMLIFrameElement | null | undefined =
        document.getElementsByTagName("iframe")[0];
      if (iframe && iframe.id === "site-frame") {
        let oldValue = 0;
        let newValue = 0;
        iframe.contentWindow!.addEventListener(
          "scroll",
          () => {
            newValue = iframe.contentWindow!.scrollY;
            if (oldValue < newValue) {
              scrollRef.current = "DOWN";
            } else if (oldValue > newValue) {
              scrollRef.current = "UP";
            }
            oldValue = newValue;
            const doc = authoringHelper?.innerRef?.current;
            if (Math.round(doc.querySelector("#Text1")!.offsetTop) - 450) {
              if (scrollRef.current === "DOWN") {
                val = val + 4;
                doc.querySelector("#Text1")!.style.marginLeft = (val + "px").toString();
                doc.querySelector("#Text2")!.style.marginLeft = ("-" + val + "px").toString();
              }
              if (scrollRef.current === "UP") {
                if (val > 0) {
                  val = val - 4;
                  doc.querySelector("#Text1")!.style.marginLeft = (val + "px").toString();
                  doc.querySelector("#Text2")!.style.marginLeft = ("-" + val + "px").toString();
                }
              }
            }
          },
          false,
        );
      }
    } else {
      let oldValue = 0;
      let newValue = 0;
      window.addEventListener("scroll", () => {
        newValue = window.scrollY;
        if (oldValue < newValue) {
          scrollRef.current = "DOWN";
        } else if (oldValue > newValue) {
          scrollRef.current = "UP";
        }
        oldValue = newValue;
        const doc = authoringHelper?.innerRef?.current;
        if (Math.round(doc.querySelector("#Text1")!.offsetTop) - 450) {
          if (scrollRef.current === "DOWN") {
            val = val + 4;
            doc.querySelector("#Text1")!.style.marginLeft = (val + "px").toString();
            doc.querySelector("#Text2")!.style.marginLeft = ("-" + val + "px").toString();
          }
          if (scrollRef.current === "UP") {
            if (val > 0) {
              val = val - 4;
              doc.querySelector("#Text1")!.style.marginLeft = (val + "px").toString();
              doc.querySelector("#Text2")!.style.marginLeft = ("-" + val + "px").toString();
            }
          }
        }
      });
    }
  });

  return (
    <Box
      ref={authoringHelper?.innerRef}
      className={`prelem-py ${classes.animationOnPageWrapper} ${globalClasses.prelemType1} prelem prelemType1 animationOnPageScrollBg`}>
      <Box ref={ref} id='siteframe'>
        <Typography variant='weblarge' id='Text1' className='animationText'>
          {content.Text1}
        </Typography>
        <Typography variant='weblarge' className='animationText' id='Text2'>
          {content.Text2}
        </Typography>
      </Box>
    </Box>
  );
};

interface AnimationOnPageScrollProp {
  secondaryArgs?: any;
  content: Content;
  analytics: Analytics;
  authoringHelper?: AuthoringHelper;
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
}

interface Content {
  Text1?: string;
  Text2?: string;
  TagName?: string;
}

AnimationOnPageScroll.defaultProps = {
  content: {
    TagName: "SiteComponents",
    Text1: "Lorem ipsum",
    Text2: "dolor sit amet",
  },
  authoringHelper: {
    innerRef: null,
    sendStructureDataToAuthoringCB: () => {},
    openButtonEditWindowInAuthoringCB: () => {},
    selectedButtonNameForEditing: "",
    isEditing: false,
    buttonRef: null,
    buttonContentEditable: false,
  },
  analytics: {
    isSeoEnabled: false,
    isAuthoring: false,
    isAnalyticsEnabled: true,
    position: 0,
    pageId: 1234,
    prelemId: 2345,
    pageTitle: "Animation on Page Scroll",
    pageDesc:
      "This prelem animated the text on scrolling the page down. This can be used when user wants to add an element of excitement on the page.",
    pageTags: "Page Tags1, page tagg2",
    prelemTags: "Animation, gallery, pagescroll, animated",
  },
};

export default AnimationOnPageScroll;
