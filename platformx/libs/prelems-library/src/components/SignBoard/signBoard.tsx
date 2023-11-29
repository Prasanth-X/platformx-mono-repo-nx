import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import TwoColumnLayout from "../../layouts/TwoColumns/TwoColumnLayout";
import { completeButtonUrl } from "../../utils/helperFns";
import BasicButton from "../BasicButton/BasicButton";
import { useCustomStyle } from "./signBoard.style";
import { prelemTypes } from "../../theme/globalStyle";
import { usePrelemImpression } from "Common/ImpressionHooks/PrelemImpressionHook";

const SignBoard = ({ content, analytics, authoringHelper, secondaryArgs }: SignBoardProps) => {
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  const ButtonObj = {
    Button_Name: "Button1_Name",
    Button_RedirectURL: "Button1_RedirectURL",
    Button_Type: "Button1_Type",
    Button_Value: "Button1_Value",
    Button_Action: "Button1_Action",
    Button_Content: "Button1_Content",
  };

  const ButtonDataObj = {
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

  const defaultStructureData = () => {
    let SignBoardStructureData;
    try {
      SignBoardStructureData = {
        "@context": "http://schema.org/",
        "@type": "Organization",
        name: content?.Title,
        description: content?.Description,
        contactPoint: [
          {
            "@type": "ContactPoint",
            url: completeButtonUrl(
              content?.Button1_Action,
              content?.Button1_RedirectURL,
              secondaryArgs.prelemBaseEndpoint.buttonBaseUrl,
            ),
            contactType: "enquiry",
          },
        ],
      };
    } catch (e) {
      SignBoardStructureData = {};
    }
    return SignBoardStructureData;
  };

  const genrateStructureData = () => {
    let SignBoardStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        SignBoardStructureData = JSON.parse(tempSD);
      } else {
        SignBoardStructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      SignBoardStructureData = defaultStructureData();
    }
    return SignBoardStructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = genrateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content.Description, content.Title, content?.Button1_RedirectURL]);

  usePrelemImpression(analytics, inView);
  const gridVal = {
    xs: [12, 12],
    md: [9, 3],
    em: [9, 3],
    lg: [9, 3],
  };
  const firstColumnContent = () => {
    return (
      <Box className='leftContentWrapper'>
        <Typography variant='h2regular' id='Title' color='secondaryTitle'>
          {content.Title}
        </Typography>
        <Typography variant='p3regular' color='secondaryParagraph' id='Description'>
          {content.Description}
        </Typography>
      </Box>
    );
  };
  const secondColumnContent = () => {
    return (
      <Box className='rightButtonWrapper'>
        <BasicButton
          openButtonEditWindow={authoringHelper?.openButtonEditWindowInAuthoringCB}
          isAuthoring={analytics?.isAuthoring}
          currentBtnEditing={authoringHelper?.selectedButtonNameForEditing}
          //buttonRef={buttonRef}
          //buttonContentEditable={buttonContentEditable}
          variant='secondaryButton2'
          analyticsEnabled={analytics?.isAnalyticsEnabled}
          ButtonObj={ButtonObj}
          isEditing={authoringHelper?.isEditing}
          buttonDataObj={ButtonDataObj}
          secondaryArgs={secondaryArgs}
          analytics={analytics}
        />
      </Box>
    );
  };
  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.signBoardWrapper} ${globalClasses.prelemType2} prelem prelemType2 signBoardBg`}>
      <Container
        className={
          authoringHelper?.isEditPage ? `grid_full_width prelem-py` : `grid_container prelem-py`
        }
        ref={ref}>
        <TwoColumnLayout
          firstColumnContent={firstColumnContent()}
          secondColumnContent={secondColumnContent()}
          gridVal={gridVal}
          customClassName='signBoardInnerWrapper'
          noGap={true}
        />
      </Container>
    </div>
  );
};

interface SignBoardProps {
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
  Title?: string;
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

SignBoard.defaultProps = {
  content: {
    Button1_Name: "LearnMore",
    Button1_RedirectURL: "https://www.google.com/", // relative page url | link url
    Button1_RestEndPonit: "RestEndPoint 1", // ?
    Button1_Action: "External", // Page |  Link
    Button1_Type: "current window", // current window | new window
    Button1_Value: "Lorem ipsum",
    Title: "Lorem ipsum dolor sit amet",
    Description:
      "Nullam sem ex, gravida quis dui et, pretium luctus tellus. Donec enim justo, vestibulum non augue nec.",
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
    pageId: 1234,
    prelemId: 2345,
    pageTitle: "Sign Board",
    pageDesc:
      "This Prelem can be used as a sign board where the user can give information about a main product or service & can redirect to the product/service detail page using the CTA.",
    pageTags: "Sign board, CTA, Product summary, Service Summary, blogs",
    prelemTags: "Sign board, CTA, Product summary, Service Summary, blogs",
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

export default SignBoard;
