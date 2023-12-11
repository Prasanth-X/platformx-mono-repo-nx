import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import "../../Style.css";
import AwardsWinnerCompanyIcon from "../../assets/svgIcon/AwardsWinnerCompany.svg";
import PrelemsDeployedIcon from "../../assets/svgIcon/PrelemsDeployed.svg";
import ProjectsCompletedIcon from "../../assets/svgIcon/ProjectsCompletedIcon.svg";
import BasicButton from "../BasicButton/BasicButton";
import TwoColumnLayout from "../../layouts/TwoColumns/TwoColumnLayout";
import { useCustomStyle } from "./CounterNumberShowcase.style";
import { prelemTypes } from "../../theme/globalStyle";
import { usePrelemImpression } from "Common/ImpressionHooks/PrelemImpressionHook";

const CounterNumberShowcase = ({
  content,
  analytics,
  authoringHelper,
  secondaryArgs,
}: CounterNumberShowcaseProps) => {
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
    lg: [7, 5],
  };

  const defaultStructureData = () => {
    let CounterNumberShowcaseStructureData;
    try {
      CounterNumberShowcaseStructureData = {
        "@context": "https://schema.org/",
        "@type": "Organization",
        name: content?.Title1,
        description: content?.Description,
        url: "www.google.com ",
        interactionStatistic: [
          {
            "@type": "InteractionCounter",
            interactionType: "https://schema.org/LikeAction",
            name: content?.Title1,
            description: content?.Description1,
            userInteractionCount: content?.Counter1,
          },
          {
            "@type": "InteractionCounter",
            interactionType: "https://schema.org/FollowAction",
            name: content?.Title2,
            description: content?.Description2,
            userInteractionCount: content?.Counter2,
          },
          {
            "@type": "InteractionCounter",
            interactionType: "https://schema.org/FollowAction",
            name: content?.Title3,
            description: content?.Description3,
            userInteractionCount: content?.Counter3,
          },
        ],
      };
    } catch (e) {
      CounterNumberShowcaseStructureData = {};
    }
    return CounterNumberShowcaseStructureData;
  };
  const genrateStructureData = () => {
    let CounterNumberShowcaseStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        CounterNumberShowcaseStructureData = JSON.parse(tempSD);
      } else {
        CounterNumberShowcaseStructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      CounterNumberShowcaseStructureData = defaultStructureData();
    }
    return CounterNumberShowcaseStructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = genrateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
  }, [
    content?.Primary_Heading,
    content?.Secondary_Heading,
    content?.Description,
    content?.Description1,
    content?.Description2,
    content?.Description3,

    content?.Title1,
    content?.Title2,
    content?.Title3,

    content?.Counter1,
    content?.Counter2,
    content?.Counter3,

    content?.Button1_Value,
    content?.Button1_RedirectURL,
  ]);

  usePrelemImpression(analytics, inView);

  const firstColumnContent = () => {
    return (
      <Box className='firstColumnContent'>
        <Box className='title'>
          <Typography variant='labelbold' id='Primary_Heading' color='secondaryLabel'>
            {content?.Primary_Heading}
          </Typography>
        </Box>
        <Typography variant='h2medium' color='secondaryTitle' id='Secondary_Heading'>
          {content?.Secondary_Heading}
        </Typography>
        <Typography color='secondaryParagraph' variant='p3regular' id='Description'>
          {content.Description}
        </Typography>
        <BasicButton
          openButtonEditWindow={authoringHelper?.openButtonEditWindowInAuthoringCB}
          isAuthoring={analytics?.isAuthoring}
          currentBtnEditing={authoringHelper?.selectedButtonNameForEditing}
          //buttonRef={buttonRef}
          //buttonContentEditable={buttonContentEditable}
          variant='secondaryButton1'
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
  const secondColumnContent = () => {
    return (
      <Box className='secondColumnContent'>
        <Box className='itemBox'>
          <Box className='iconBox'>
            <img
              src={PrelemsDeployedIcon}
              alt='icon'
              width='42'
              height='42'
              className='iconWidth'
            />
          </Box>
          <Box>
            {secondaryArgs?.editState ? (
              <Typography variant='h2bold' id='Counter1' color='secondaryTitle' className='heading'>
                {parseInt(content.Counter1)}
              </Typography>
            ) : (
              <Typography variant='h2bold' id='Counter1' color='secondaryTitle' className='heading'>
                {parseInt(content.Counter1)}+
              </Typography>
            )}
            <Typography
              variant='h4bold'
              color='secondaryTitle'
              className='textTruncated1Line subheading'
              id='Title1'>
              {content?.Title1}
            </Typography>
            <Box className='discription'>
              <Typography
                color='secondaryParagraph'
                variant='p4regular'
                className='textTruncated3Line'
                id='Description1'>
                {content?.Description1}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box className='itemBox'>
          <Box className='iconBox'>
            <img
              src={ProjectsCompletedIcon}
              alt='icon'
              width='42'
              height='42'
              className='iconWidth'
            />
          </Box>
          <Box>
            {secondaryArgs?.editState ? (
              <Typography variant='h2bold' id='Counter2' color='secondaryTitle' className='heading'>
                {parseInt(content.Counter2)}
              </Typography>
            ) : (
              <Typography variant='h2bold' id='Counter2' color='secondaryTitle' className='heading'>
                {parseInt(content.Counter2)}+
              </Typography>
            )}
            <Typography
              variant='h4bold'
              className='textTruncated1Line subheading'
              color='secondaryTitle'
              id='Title2'>
              {content?.Title2}
            </Typography>
            <Box className='discription'>
              <Typography
                variant='p4regular'
                color='secondaryParagraph'
                className='textTruncated3Line'
                id='Description2'>
                {content?.Description2}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box className='itemBox'>
          <Box className='iconBox'>
            <img
              src={AwardsWinnerCompanyIcon}
              alt='icon'
              width='42'
              height='42'
              className='iconWidth'
            />
          </Box>
          <Box>
            {secondaryArgs?.editState ? (
              <Typography variant='h2bold' id='Counter3' color='secondaryTitle' className='heading'>
                {parseInt(content.Counter3)}
              </Typography>
            ) : (
              <Typography variant='h2bold' id='Counter3' color='secondaryTitle' className='heading'>
                {parseInt(content.Counter3)}+
              </Typography>
            )}
            <Typography
              variant='h4bold'
              className='textTruncated1Line subheading'
              color='secondaryTitle'
              id='Title3'>
              {content?.Title3}
            </Typography>
            <Box className='discription'>
              <Typography
                variant='p4regular'
                className='textTruncated3Line'
                color='secondaryParagraph'
                id='Description3'>
                {content?.Description3}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.counterNumbershowcaseWrapper} ${globalClasses.prelemType1} prelem prelemType1 counter-number-showcase counterNumbershowcaseBg`}>
      <Box ref={ref}>
        <Container
          className={
            authoringHelper?.isEditPage ? "grid_full_width prelem-py" : "grid_container prelem-py"
          }>
          <Grid container ref={ref} className='boxWrapper'>
            <TwoColumnLayout
              firstColumnContent={firstColumnContent()}
              secondColumnContent={secondColumnContent()}
              gridVal={gridVal}
              customClassName='CounterNumberShowcase'
              noGap={true}
              col1Align='start'
              col2Align='start'
            />
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

interface CounterNumberShowcaseProps {
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
  Button1_Action?: string;
  Button1_Content?: string;
  Button1_Name?: string;
  Button1_RedirectURL?: string;
  Button1_RestEndPoint?: string;
  Button1_Type?: string;
  Button1_Value?: string;
  Counter1: string;
  Counter2: string;
  Counter3: string;
  Primary_Heading?: string;
  Secondary_Heading: string;
  Description?: string;
  Description1?: string;
  Description2?: string;
  Description3?: string;
  Title?: string;
  Title1?: string;
  Title2?: string;
  Title3?: string;
  TagName?: string;
}

CounterNumberShowcase.defaultProps = {
  content: {
    Button1_Action: "External",
    Button1_Name: "Lorem ipsum",
    Button1_RedirectURL: "www.google.com",
    Button1_RestEndPoint: "",
    Button1_Type: "current window",
    Button1_Value: "Lorem ipsum",
    Counter1: "counter",
    Counter2: "counter",
    Counter3: "counter",
    Primary_Heading: "Lorem ipsum dolor sit amet",
    Secondary_Heading: "Lorem Ipsum",
    Description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    Description1: "Lorem Ipsum is simply dummy text of the printing and typesetting indus",
    Description2: "Lorem Ipsum is simply dummy text of the printing and typesetting indus",
    Description3: "Lorem Ipsum is simply dummy text of the printing and typesetting indus",
    Title: "Lorem ipsum",
    Title1: "Lorem ipsum",
    Title2: "Lorem ipsum",
    Title3: "Lorem ipsum",
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
    pageTitle: "New One",
    pageDesc:
      "The Prelem ‘New One’ can be used to give an introduction to your website. It has an image, title, description & CTA which can be used to add the required information.",
    pageTags: "Website, Introduction, New One, Image, CTA, Title, Hero Banner",
    prelemTags: "Website, Introduction, New One, Image, CTA, Title, Hero Banner",
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

export default CounterNumberShowcase;
