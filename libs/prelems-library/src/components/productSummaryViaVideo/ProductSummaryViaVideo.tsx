import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import "../../Style.css";
import TwoColumnLayout from "../../layouts/TwoColumns/TwoColumnLayout";
import { useCustomStyle } from "./productSummaryViaVideo.style";
import { usePrelemImpression } from "Common/ImpressionHooks/PrelemImpressionHook";

const ProductSummaryViaVideoDemo = ({
  content,
  analytics,
  authoringHelper,
}: //secondaryArgs,
ProductSummaryProp) => {
  const firstRender = useRef(true);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const getThumbnail = () => {
    const arr: any = content?.Videos?.Video_1?.Url.split("=");
    if (arr?.length !== 0) {
      return `https://img.youtube.com/vi/${arr[1]}/0.jpg`;
    }
  };
  const defaultStructureData = () => {
    let productSummaryViaVideoStructureData;
    try {
      productSummaryViaVideoStructureData = {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "VideoObject",
            contentUrl: content?.Videos?.Video_1?.Url,
            name: content?.Title,
            description: content?.Description,
            embedUrl: content?.Videos?.Video_1?.Url,
            thumbnailUrl: {
              "@id": getThumbnail(),
            },
          },
        ],
      };
    } catch (e) {
      productSummaryViaVideoStructureData = {};
    }

    return productSummaryViaVideoStructureData;
  };
  const generateStructureData = () => {
    let productSummaryViaVideoStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current === true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        productSummaryViaVideoStructureData = JSON.parse(tempSD);
      } else {
        productSummaryViaVideoStructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      productSummaryViaVideoStructureData = defaultStructureData();
    }
    return productSummaryViaVideoStructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content?.Description, content?.Title, content?.Videos?.Video_1.Url]);

  usePrelemImpression(analytics, inView);
  /* AnalyticsEnabled dependency added as many times we are not getting analytics provider*async call)
  1. we are first checking in publish app if analytics provider is avaiable or not
  2. if its available we are setting AnalyticsEnabled to true
  3. if its not available we are setting false
  */

  const getFormattedUrl = (url: string) => {
    if (url) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);

      const videoId = match && match[2].length === 11 ? match[2] : null;

      return `https://www.youtube.com/embed/${videoId}`;
    } else return "";
  };
  const classes = useCustomStyle();
  const gridVal = {
    md: [12, 12],
    em: [6, 6],
    lg: [6, 6],
  };
  const firstColumnContent = () => {
    return (
      <Box className='wrapperVideo'>
        <iframe
          width={"100%"}
          height={"100%"}
          id='productsummary'
          src={content?.Videos?.Video_1 && getFormattedUrl(content?.Videos?.Video_1?.Url)}
          title='YouTube video player'
          frameBorder='0'
          allow=''
          allowFullScreen></iframe>
      </Box>
    );
  };
  const secondColumnContent = () => {
    return (
      <Box>
        <Typography variant='h2semibold' id={"Title"}>
          {content?.Title}
        </Typography>
        <Typography variant='p3regular' id={"Description"}>
          {content?.Description}
        </Typography>
      </Box>
    );
  };
  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.productSummaryViaVideoWrapper} outer-row productSummaryViaVideo productSummaryViaVideoBg`}>
      <Container
        className={
          authoringHelper?.isEditPage ? `grid_full_width prelem-py` : `grid_container prelem-py`
        }
        ref={ref}>
        <TwoColumnLayout
          firstColumnContent={firstColumnContent()}
          secondColumnContent={secondColumnContent()}
          gridVal={gridVal}
          customClassName='productSummaryViaVideoInnerWrapper'
          noGap={true}
        />
      </Container>
    </div>
  );
};

interface ProductSummaryProp {
  content: Content;
  analytics: Analytics;
  authoringHelper?: AuthoringHelper;
  secondaryArgs?: SecondaryArgs;
}

interface SecondaryArgs {
  APIEndPoint?: string;
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
  Title?: string;
  Description?: string;
  Videos?: {
    Video_1: {
      Name: string;
      Url: string;
      Title: string;
      Description: string;
      Attribution: boolean;
      Transcript: boolean;
      CC: boolean;
    };
  };
  TagName?: string;
}

ProductSummaryViaVideoDemo.defaultProps = {
  content: {
    TagName: "SiteComponents",
    Title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
    Description:
      "Nullam sem ex, gravida quis dui et, pretium luctus tellus. Donec enim justo, vestibulum non augue nec, volutpat suscipit augue. Proin sit amet mi in odio efficitur fringilla. Quisque dictum odio ligula, vitae laoreet turpis sollicitudin at.",
    Videos: {
      Video_1: {
        Name: "HCL 360 Video",
        Thumbnail: "machine_assets/1689963604623/public/png/ProductSummaryViaVideo",
        Url: "https://www.youtube.com/watch?v=x9u4HdyTFXY",
        Title: "HCL 360 Video",
        Description: "This is for HCL 360 Video",
        Attribution: false,
        CC: false,
        ext: "png",
        Visibility: "public",
        BitStreamId: "",
        Transcript: false,
      },
    },
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
    pageTitle: "Product Summary via Video",
    pageDesc: "Prelem Description",
    pageTags: "Video, summary, product summary, video summary",
    prelemTags: "Video, summary, product summary, video summary",
  },
  secondaryArgs: {
    APIEndPoint: "https://platx-api-dev.fanuep.com/platform-x/",
  },
};

export default ProductSummaryViaVideoDemo;
