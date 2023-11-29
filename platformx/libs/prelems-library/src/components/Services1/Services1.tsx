import { Container, Divider, Grid, Typography } from "@mui/material";
import Slide from "@mui/material/Slide";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import "../../Style.css";
import { useCustomStyle } from "./Services1.style";
import { prelemTypes } from "../../theme/globalStyle";
import { usePrelemImpression } from "Common/ImpressionHooks/PrelemImpressionHook";

const Services1 = ({ content, analytics, authoringHelper, secondaryArgs }: Services1Prop) => {
  const firstRender = useRef(true);
  const { ref, inView } = useInView({
    threshold: 0.3,
  });

  const defaultStructureData = () => {
    let services1StructureData;
    try {
      services1StructureData = {
        "@context": "https://schema.org/",
        "@type": "Service",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: content?.Subtitle,
          description: content?.Title,
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                description: content?.Row_1,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                description: content?.Row_2,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                description: content?.Row_3,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                description: content?.Row_4,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                description: content?.Row_5,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                description: content?.Row_6,
              },
            },
          ],
        },
      };
    } catch (e) {
      services1StructureData = {};
    }

    return services1StructureData;
  };
  const generateStructureData = () => {
    let services1StructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current === true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        services1StructureData = JSON.parse(tempSD);
      } else {
        services1StructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      services1StructureData = defaultStructureData();
    }
    return services1StructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
  }, [
    content?.Subtitle,
    content?.Title,
    content?.Row_1,
    content?.Row_2,
    content?.Row_3,
    content?.Row_4,
    content?.Row_5,
    content?.Row_6,
  ]);

  usePrelemImpression(analytics, inView);
  /* AnalyticsEnabled dependency added as many times we are not getting analytics provider*async call)
  1. we are first checking in publish app if analytics provider is avaiable or not
  2. if its available we are setting AnalyticsEnabled to true
  3. if its not available we are setting false
  */
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.service1PrelemWrapper} ${globalClasses.prelemType1} prelem prelemType1 service1PrelemBg Services1`}>
      <Container
        className={
          authoringHelper?.isEditPage ? `grid_full_width prelem-py` : `grid_container prelem-py`
        }
        ref={ref}>
        <Grid container className='ServiceWrapperBoxOverflowX'>
          <Slide direction='right' in={secondaryArgs?.editState ? true : inView} timeout={1000}>
            <Grid item xs={12} sm={12} md={6} className='LeftServices1'>
              <Typography variant='labelbold' id='Title'>
                {content?.Title}
              </Typography>
              <Typography variant='h2semibold' id='Subtitle'>
                {content?.Subtitle}
              </Typography>
            </Grid>
          </Slide>

          <Grid item xs={12} sm={12} md={6}>
            <Slide direction='left' in={secondaryArgs?.editState ? true : inView} timeout={1000}>
              <Typography variant='p3regular' className='TypoRight' id='Row_1'>
                {content?.Row_1}
              </Typography>
            </Slide>
            <Slide direction='left' in={secondaryArgs?.editState ? true : inView} timeout={1010}>
              <Divider />
            </Slide>
            <Slide direction='left' in={secondaryArgs?.editState ? true : inView} timeout={1500}>
              <Typography variant='p3regular' className='TypoRight' id='Row_2'>
                {content?.Row_2}
              </Typography>
            </Slide>
            <Slide direction='left' in={secondaryArgs?.editState ? true : inView} timeout={1510}>
              <Divider />
            </Slide>
            <Slide direction='left' in={secondaryArgs?.editState ? true : inView} timeout={2000}>
              <Typography variant='p3regular' className='TypoRight' id='Row_3'>
                {content?.Row_3}
              </Typography>
            </Slide>
            <Slide direction='left' in={secondaryArgs?.editState ? true : inView} timeout={2010}>
              <Divider />
            </Slide>
            <Slide direction='left' in={secondaryArgs?.editState ? true : inView} timeout={2500}>
              <Typography variant='p3regular' className='TypoRight' id='Row_4'>
                {content?.Row_4}
              </Typography>
            </Slide>
            <Slide direction='left' in={secondaryArgs?.editState ? true : inView} timeout={2510}>
              <Divider />
            </Slide>
            <Slide direction='left' in={secondaryArgs?.editState ? true : inView} timeout={3000}>
              <Typography variant='p3regular' className='TypoRight' id='Row_5'>
                {content?.Row_5}
              </Typography>
            </Slide>
            <Slide direction='left' in={secondaryArgs?.editState ? true : inView} timeout={3010}>
              <Divider />
            </Slide>
            <Slide direction='left' in={secondaryArgs?.editState ? true : inView} timeout={3500}>
              <Typography variant='p3regular' className='TypoRight' id='Row_6'>
                {content?.Row_6}
              </Typography>
            </Slide>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

interface Services1Prop {
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
  Subtitle?: string;
  Row_1: string;
  Row_2: string;
  Row_3: string;
  Row_4: string;
  Row_5: string;
  Row_6: string;
}

Services1.defaultProps = {
  content: {
    Title: "LOREM IPSUM DOLOR SIT AMET",
    Subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    Row_1:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    Row_2:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    Row_3:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    Row_4:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    Row_5:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    Row_6:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
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
    pageTitle: "Services 1",
    pageDesc:
      "This prelem can be used to show features or services. It has title, description & 6 rows that we want to show here which can used to write about the features or services.",
    pageTags: "Services, Features, Product, Products, Service, Feature",
    prelemTags: "Services, Features, Product, Products, Service, Feature",
  },
  secondaryArgs: {
    prelemBaseEndpoint: {
      device: "",
    },
  },
};

export default Services1;
