import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import "../../Style.css";
import { completeButtonUrl } from "../../utils/helperFns";
import BasicButton from "../BasicButton/BasicButton";
import TwoColumnLayout from "../../layouts/TwoColumns/TwoColumnLayout";
import { useCustomStyle } from "./ParagraphWithHeadlineAndCTA.style";
import { prelemTypes } from "../../theme/globalStyle";
import { usePrelemImpression } from "Common/ImpressionHooks/PrelemImpressionHook";

const ParagraphWithHeadlineAndCTA = ({
  content,
  analytics,
  authoringHelper,
  secondaryArgs,
}: ParagraphWithHeadlineAndCTAProps) => {
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  const ButtonObj1 = {
    Button_Name: "Button1_Name",
    Button_RedirectURL: "Button1_RedirectURL",
    Button_Type: "Button1_Type",
    Button_Value: "Button1_Value",
    Button_Action: "Button1_Action",
    Button_Content: "Button1_Content",
  };
  const ButtonDataObj1 = {
    Button_Name: content?.Button1_Name,
    Button_RedirectURL: content?.Button1_RedirectURL,
    Button_Type: content?.Button1_Type,
    Button_Value: content?.Button1_Value,
    Button_Action: content?.Button1_Action,
    Button_Content: content?.Button1_Content,
  };
  const firstRender = useRef(true);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const gridVal = {
    md: [12, 12],
    em: [6, 6],
  };

  const defaultStructureData = () => {
    let ParagraphWithHeadlineAndCTAStructureData;
    try {
      ParagraphWithHeadlineAndCTAStructureData = {
        "@context": "http://schema.org/",
        "@type": "WebPage",
        name: content?.Primary_Heading,
        description: content?.Description,
        url: completeButtonUrl(
          content?.Button1_Action,
          content?.Button1_RedirectURL,
          secondaryArgs.prelemBaseEndpoint.buttonBaseUrl,
        ),
      };
    } catch (e) {
      ParagraphWithHeadlineAndCTAStructureData = {};
    }
    return ParagraphWithHeadlineAndCTAStructureData;
  };
  const genrateStructureData = () => {
    let ParagraphWithHeadlineAndCTAStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current === true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        ParagraphWithHeadlineAndCTAStructureData = JSON.parse(tempSD);
      } else {
        ParagraphWithHeadlineAndCTAStructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      ParagraphWithHeadlineAndCTAStructureData = defaultStructureData();
    }
    return ParagraphWithHeadlineAndCTAStructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = genrateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    content?.Description,
    content?.Secondary_Heading,
    content?.Primary_Heading,
    content?.Button1_Value,
    content?.Button1_RedirectURL,
  ]);

  usePrelemImpression(analytics, inView);

  const firstColumnContent = () => {
    return (
      <Box className='firstColumnContentWrapper'>
        <Box className='borderBottom'>
          <Typography variant='labelbold' id='Primary_Heading'>
            {content.Primary_Heading}
          </Typography>
        </Box>
        <Typography variant='h2medium' id='Secondary_Heading'>
          {content.Secondary_Heading}
        </Typography>
      </Box>
    );
  };
  const secondColumnContent = () => {
    return (
      <Box className='secondColumnContentWrapper'>
        <Typography variant='p3regular' id='Description'>
          {content.Description}
        </Typography>
        <BasicButton
          openButtonEditWindow={authoringHelper?.openButtonEditWindowInAuthoringCB}
          isAuthoring={analytics?.isAuthoring}
          currentBtnEditing={authoringHelper?.selectedButtonNameForEditing}
          variant='primaryButton1'
          analyticsEnabled={analytics?.isAnalyticsEnabled}
          ButtonObj={ButtonObj1}
          isEditing={authoringHelper?.isEditing}
          buttonDataObj={ButtonDataObj1}
          secondaryArgs={secondaryArgs}
          analytics={analytics}
        />
      </Box>
    );
  };

  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.paragraphWithHeadlineAndCTAWrapper} ${globalClasses.prelemType1} prelem prelemType1 Paragraph-with-headline paragraphWithHeadlineAndCTABg`}>
      <Container
        className={
          authoringHelper?.isEditPage ? "grid_full_width prelem-py" : "grid_container prelem-py"
        }
        ref={ref}>
        <Grid container ref={ref}>
          <TwoColumnLayout
            firstColumnContent={firstColumnContent()}
            secondColumnContent={secondColumnContent()}
            gridVal={gridVal}
            customClassName='paragraphWithHeadlineAndCTA'
            noGap={true}
            col1Align='start'
            col2Align='start'
          />
        </Grid>
      </Container>
    </div>
  );
};

interface ParagraphWithHeadlineAndCTAProps {
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
  Primary_Heading?: string;
  Secondary_Heading?: string;
  Description?: string;
  Button1_Action?: string;
  Button1_Content?: string;
  Button1_Name?: string;
  Button1_RedirectURL?: string;
  Button1_RestEndPonit?: string;
  Button1_Type?: string;
  Button1_Value?: string;
  TagName?: string;
}

ParagraphWithHeadlineAndCTA.defaultProps = {
  content: {
    Button1_Name: "current window",
    Button1_RedirectURL: "www.google.com", // relative page url | link url
    Button1_RestEndPoint: "", // ?
    Button1_Action: "External", // Page |  Link
    Button1_Type: "current window", // current window | new window
    Button1_Value: "Lorem ipsum",

    Primary_Heading: "Lorem ipsum dolor sit amet.",
    Secondary_Heading: "Lorem ipsum dolor sit amet.",
    Description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut .",
    TagName: "SiteComponents",
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
    pageId: 12345,
    prelemId: 23456,
    pageTitle: "Paragraph With Headline And CTA",
    pageDesc:
      "The Prelem ‘Paragraph With Headline And CTA’ can be used to give an introduction to your website. It has an image, title, description & CTA which can be used to add the required information.",
    pageTags:
      "Website, Introduction, Paragraph With Headline And CTA, Image, CTA, Title, Hero Banner",
    prelemTags:
      "Website, Introduction, Paragraph With Headline And CTA, Image, CTA, Title, Hero Banner",
  },
  secondaryArgs: {
    prelemBaseEndpoint: {
      APIEndPoint: "https://platx-api-dev.fanuep.com/platform-x/",
      device: "window",
      buttonBaseUrl: "https://platx-publish-dev.fanuep.com/",
    },
    editState: false,
    multiSlot: {},
  },
};

export default ParagraphWithHeadlineAndCTA;
