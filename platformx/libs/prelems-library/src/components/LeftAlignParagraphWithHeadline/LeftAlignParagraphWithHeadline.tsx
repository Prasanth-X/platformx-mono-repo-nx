import { Container, Grid, Typography } from "@mui/material";
import DOMPurify from "isomorphic-dompurify";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import "../../Style.css";
import { useCustomStyle } from "./LeftAlignParagraphWithHeadline.style";
import { prelemTypes } from "../../theme/globalStyle";
import { usePrelemImpression } from "Common/ImpressionHooks/PrelemImpressionHook";

const LeftAlignParagraphWithHeadline = ({
  content,
  analytics,
  authoringHelper,
}: LeftAlignParagraphWithHeadlineProp) => {
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  const firstRender = useRef(true);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const defaultStructureData = () => {
    let LeftAlignParagraphWithHeadlineStructureData;
    try {
      LeftAlignParagraphWithHeadlineStructureData = {
        "@context": "http://schema.org/",
        "@type": "WebPage",
        name: content?.Title,
        description: content?.Description,
      };
    } catch (e) {
      LeftAlignParagraphWithHeadlineStructureData = {};
    }
    return LeftAlignParagraphWithHeadlineStructureData;
  };

  const genrateStructureData = () => {
    let LeftAlignParagraphWithHeadlineStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current === true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        LeftAlignParagraphWithHeadlineStructureData = JSON.parse(tempSD);
      } else {
        LeftAlignParagraphWithHeadlineStructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      LeftAlignParagraphWithHeadlineStructureData = defaultStructureData();
    }
    return LeftAlignParagraphWithHeadlineStructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = genrateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content?.Title, content?.Description]);

  usePrelemImpression(analytics, inView);
  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.leftAlignParagraphWithHeadlineWrapper} ${globalClasses.prelemType1} prelem prelemType1 left-align-paragraph-with-headline leftAlignParagraphWithHeadlineBg`}>
      <Container
        className={
          authoringHelper?.isEditPage ? "grid_full_width prelem-py" : "grid_container prelem-py"
        }
        ref={ref}>
        <Grid container>
          <Grid item xs={12} md={12} lg={8}>
            <Typography variant='h1bold' id='Title'>
              {content.Title}
            </Typography>
            <Typography
              variant='p3regular'
              id='Description'
              className='discription'
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(content.Description || ""),
              }}></Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

interface LeftAlignParagraphWithHeadlineProp {
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
}

LeftAlignParagraphWithHeadline.defaultProps = {
  content: {
    Title: "Lorem ipsum dolor sit amet",
    Description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut .\r\n\r\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
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
    pageTitle: "Left Align Paragraph With Headline",
    pageDesc:
      "This prelem can be used to add Left Align Paragraph With Headline anywhere in the website. ",
    pageTags: "Text, Full Width, Left Align Paragraph With Headline",
    prelemTags: "Text, Full Width, Left Align Paragraph With Headline",
  },
};
export default LeftAlignParagraphWithHeadline;
