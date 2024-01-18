/* eslint-disable @typescript-eslint/no-empty-function */
import { Container, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useCustomStyle } from "./quote.style";
import prelemTypes from "../../globalStyle";
import "../../Style.css";
import { usePrelemImpression } from "../../components/ImpressionHooks/PrelemImpressionHook";

const Quote = ({
  content,
  analytics,
  authoringHelper,
  secondaryArgs,
}: //secondaryArgs,
QuoteProp) => {
  const firstRender = useRef(true);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const defaultStructureData = () => {
    let quoteStructureData;
    try {
      quoteStructureData = {
        "@context": "http://schema.org/",
        "@type": "Quotation",
        creator: {
          "@type": "Person",
          name: content?.AuthorName,
        },
        text: content?.QuoteText,
      };
    } catch (e) {
      quoteStructureData = {};
    }
    return quoteStructureData;
  };

  const generateStructureData = () => {
    let quoteStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        quoteStructureData = JSON.parse(tempSD);
      } else {
        quoteStructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      quoteStructureData = defaultStructureData();
    }
    return quoteStructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content?.QuoteText, content?.AuthorName]);

  usePrelemImpression(analytics, inView, secondaryArgs);

  /* AnalyticsEnabled dependency added as many times we are not getting analytics provider*async call)
  1. we are first checking in publish app if analytics provider is avaiable or not
  2. if its available we are setting AnalyticsEnabled to true
  3. if its not available we are setting false
*/
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  return (
    <div
      className={`${classes.quoteWrapperPrelem} ${globalClasses.prelemType1} prelem prelemType1 quote quoteBg`}
      ref={authoringHelper?.innerRef}>
      <Container
        className={
          authoringHelper?.isEditPage ? `grid_full_width prelem-py` : `grid_container prelem-py`
        }
        ref={ref}>
        <Typography variant='h2regular' className='typographyFirst'>
          “<span id={"QuoteText"}>{content?.QuoteText}</span>”
        </Typography>
        <Typography variant='h2semibold' className='typographySecond'>
          — <span id={"AuthorName"}>{content?.AuthorName}</span>
        </Typography>
      </Container>
    </div>
  );
};

interface QuoteProp {
  content: Content;
  analytics: Analytics;
  authoringHelper?: AuthoringHelper;
  secondaryArgs?: any;
}

// interface SecondaryArgs {
//   APIEndPoint: string;
//   prelemImpressionSchema?: string;
//   clickImpressionSchema?: string;
// }
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
  innerRef: React.Ref<HTMLDivElement>;
  sendStructureDataToAuthoringCB: (structureData: string) => void;
  sendDefaultStructureDataForResetToAuthoringCB: (structureData: string) => void;
  openButtonEditWindowInAuthoringCB: (buttonObj?: object, e?: object) => void;
  selectedButtonNameForEditing: string;
  isEditing: boolean;
  buttonRef?: React.Ref<HTMLButtonElement>;
  buttonContentEditable?: boolean;
  lastSavedStructuredData?: string;
  isEditPage?: boolean;
}

interface Content {
  AuthorName?: string;
  QuoteText?: string;
}

Quote.defaultProps = {
  content: {
    AuthorName: "Lorem ipsum dolor",
    QuoteText:
      "This prelem can be used to add a quote from someone on your website. This has separate text for Quote & Author Name.",
  },
  authoringHelper: {
    innerRef: null,
    sendStructureDataToAuthoringCB: () => {},
    sendDefaultStructureDataForResetToAuthoringCB: () => {},

    openButtonEditWindowInAuthoringCB: () => {},
    selectedButtonNameForEditing: "",
    isEditing: false,
    buttonRef: null,
    buttonContentEditable: false,
    lastSavedStructuredData: "",
    isEditPage: false,
  },
  analytics: {
    isAnalyticsEnabled: true,
    isSeoEnabled: false,
    isAuthoring: false,
    position: 0,
    pageId: 1234,
    prelemId: 2345,
    pageTitle: "Quote",
    pageDesc: "Prelem Description",
    pageTags: "Page Tags1, page tagg2",
    prelemTags: "Prelem Tags1, Prelem tagg2",
  },
  secondaryArgs: {
    prelemBaseEndpoint: {
      APIEndPoint: "https://platx-api-dev.fanuep.com/platform-x/",
      device: "window",
      buttonBaseUrl: "https://platx-publish-dev.fanuep.com/",
    },
    editState: false,
    multiSlot: {},
    gcpUrl: "https://storage.googleapis.com",
    bucketName: "cropped_image_public",
  },
};

export default Quote;
