import AutorenewIcon from "@mui/icons-material/Autorenew";
import { Box, Card, CardContent, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import "../../Style.css";
import { useCustomStyle } from "./FeatureBox2.style";
import { prelemTypes } from "../../theme/globalStyle";
import { usePrelemImpression } from "Common/ImpressionHooks/PrelemImpressionHook";

const FeatureBox2 = ({ content, analytics, authoringHelper, secondaryArgs }: FeatureBox2Props) => {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const firstRender = useRef(true);

  const defaultStructureData = () => {
    let structureData;
    try {
      structureData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: content?.Title2,
        itemListElement: content?.Slots?.map((item, key) => {
          return {
            "@type": "Recommendation",
            position: key + 1,
            itemReviewed: {
              "@type": "organization",
              name: item?.Title1,
              description: item?.Description,
            },
          };
        }),
      };
    } catch (e) {
      structureData = {};
    }

    return structureData;
  };

  const generateStructureData = () => {
    let structureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current === true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        structureData = JSON.parse(tempSD);
      } else {
        structureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      structureData = defaultStructureData();
    }
    return structureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content?.Title2, content?.Slots]);

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
      className={`${classes.featureBox2PrelemWrapper} ${globalClasses.prelemType1} prelem prelemType1 featureBox2PrelemBg FeatureBox2`}>
      <Container
        className={
          authoringHelper?.isEditPage ? `grid_full_width prelem-py` : `grid_container prelem-py`
        }
        ref={ref}>
        <Grid container item>
          <Grid item xs={12} sm={12} md={12} em={4} lg={4}>
            <Typography id='Title1' variant='labelbold'>
              {content?.Title1}
            </Typography>
            <Typography variant='h2semibold' id='Title2'>
              {content?.Title2}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            em={8}
            lg={8}
            sx={{
              position: "relative",
              "&:hover": {
                ".add-content-overlay": {
                  display: authoringHelper?.authoringHoverShow ? "flex !important" : "none",
                },
              },
            }}>
            {content?.Slots?.map((items, key) => (
              <Card
                onClick={() => {
                  if (items?.URL) {
                    if (items?.Internal === "true") {
                      window.location.assign(items.URL);
                    } else {
                      window.open(items.URL);
                    }
                  }
                }}
                className='FeatureBox2CardWrapper'
                key={key}>
                <CardContent className={`FeatureBox2CardContent FeatureBox2CardItem`}>
                  <Box className='heightAuto'>
                    <Box className='heightHalf'>
                      <Typography className={`topRightBox featureTitle`} variant='h1bold'>
                        {items.Title1}
                      </Typography>
                      <Typography variant='h3bold' className='featureTitle'>
                        {items.Title2}
                      </Typography>
                    </Box>
                    <Typography variant='p3regular' className='cardFeatureDescription'>
                      {items.Description}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
            <Box className={`ReplaceWrapper add-content-overlay`}>
              <Box
                className='WrapperBoxIcons'
                onClick={() => secondaryArgs?.multiSlot?.onToggleContentGallery()}>
                <AutorenewIcon className='replaceIconWrapper' />
                <Typography variant='h3regular' color='textColor'>
                  Replace
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

interface FeatureBox2Props {
  content: Content;
  analytics: Analytics;
  authoringHelper?: AuthoringHelper;
  secondaryArgs?: SecondaryArgs;
}
interface SecondaryArgs {
  multiSlot?: MultiSlot;
  prelemBaseEndpoint?: PrelemBaseEndpoint;
}
interface MultiSlot {
  onToggleContentGallery: () => void;
}
interface PrelemBaseEndpoint {
  device?: string;
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
  authoringHoverShow?: boolean;
  isEditPage?: boolean;
}

interface Content {
  Title1?: string;
  Title2: string;
  Slots: FeatureBox2Interface[];
  TagName?: string;
}

interface FeatureBox2Interface {
  Title1: string;
  Title2?: string;
  Description: string;
  URL?: string;
  Internal?: string;
}

FeatureBox2.defaultProps = {
  content: {
    Title1: "Lorem ipsum",
    Title2: "Lorem ipsum dolor sit amet",
    Slots: [
      {
        Title1: "01",
        Title2: "Lorem ipsum dolor sit amet",
        Description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
        URL: "",
        Internal: "true",
      },
      {
        Title1: "02",
        Title2: "Lorem ipsum dolor sit amet",
        Description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
        URL: "",
        Internal: "true",
      },
      {
        Title1: "03",
        Title2: "Lorem ipsum dolor sit amet",
        Description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
        URL: "",
        Internal: "true",
      },
      {
        Title1: "04",
        Title2: "Lorem ipsum dolor sit amet",
        Description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
        URL: "",
        Internal: "true",
      },
      {
        Title1: "05",
        Title2: "Lorem ipsum dolor sit amet",
        Description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
        URL: "",
        Internal: "true",
      },
      {
        Title1: "06",
        Title2: "Lorem ipsum dolor sit amet",
        Description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
        URL: "",
        Internal: "true",
      },
      {
        Title1: "07",
        Title2: "Lorem ipsum dolor sit amet",
        Description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
        URL: "",
        Internal: "true",
      },
    ],
    TagName: "Features, Testimonials, Services, Accolades",
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
    authoringHoverShow: false,
    isEditPage: false,
  },

  analytics: {
    isAnalyticsEnabled: true,
    isSeoEnabled: false,
    isAuthoring: false,
    position: 0,
    pageId: 1234,
    prelemId: 2345,
    pageTitle: "Prelem Title",
    pageDesc: "Prelem Description",
    pageTags: "Page Tags1, page tagg2",
    prelemTags: "Prelem Tags1, Prelem tagg2",
  },
  secondaryArgs: {
    device: "",
  },
};

export default FeatureBox2;
