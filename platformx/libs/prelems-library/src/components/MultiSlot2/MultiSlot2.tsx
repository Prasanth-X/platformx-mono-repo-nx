/* eslint-disable eqeqeq */
import { Cached } from "@mui/icons-material";
import { Box, Container, Paper, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import Slider from "react-slick";
import usePlatformAnalytics from "../../analytics/index";
import "../../Style.css";
import "./MultiSlot2.css";
import MultiSlotCard2 from "./MultiSlotCard2";
import { prelemTypes } from "../../theme/globalStyle";
import { useCustomStyle } from "./MultiSlot2.style";
import { IMPRESSIONS } from "Common/ImpressionHooks/constants";
import { createClickImpression } from "Common/ImpressionHooks/helper";
import { usePrelemImpression } from "Common/ImpressionHooks/PrelemImpressionHook";

const windowSettings = {
  arrows: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
};

const tabletSettings = {
  arrows: true,
  slidesToShow: 3,
  slidesToScroll: 3,
};

const mobileSettings = {
  arrows: false,
  slidesToShow: 1,
  variableWidth: true,
};

const MOBILE_WIDTH_THRESHOLD = 768;
const TABLE_WIDTH_THRESHOLD = 1024;

const MultiSlot2 = ({ content, analytics, authoringHelper, secondaryArgs }: MultiSlot2Props) => {
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  const [handleTrack] = usePlatformAnalytics();
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const firstRender = useRef(true);

  usePrelemImpression(analytics, inView);

  const triggerAnalytics = (url: string, index: number, title: string, contentType: string) => {
    if (!analytics?.isAuthoring && analytics?.isAnalyticsEnabled) {
      const cardClickObj = {
        prelemSlotNumber: index + 1,
        contentType: contentType,
        contentTitle: title,
        contentUrl: url,
      };
      const cardClickAnalyticsObj = createClickImpression(
        analytics,
        IMPRESSIONS.Card,
        secondaryArgs,
        undefined,
        cardClickObj,
      );
      handleTrack(IMPRESSIONS?.CLICK_IMPRESSION, cardClickAnalyticsObj);
    }
  };

  const defaultStructureData = () => {
    let multiSlot2StructureData;
    try {
      multiSlot2StructureData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: content?.Title,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: content?.Slots[0].Title,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: content?.Slots[1].Title,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: content?.Slots[2].Title,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: content?.Slots[3].Title,
          },
        ],
      };
    } catch (e) {
      multiSlot2StructureData = {};
    }

    return multiSlot2StructureData;
  };

  const generateStructureData = () => {
    let multiSlot2StructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData || "");

    if (firstRender.current == true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        multiSlot2StructureData = JSON.parse(tempSD);
      } else {
        multiSlot2StructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      multiSlot2StructureData = defaultStructureData();
    }
    return multiSlot2StructureData;
  };
  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content?.Title, content?.Slots]);
  const onAdd = (slotNumber: number) => {
    const { onToggleContentGallery } = secondaryArgs?.multiSlot || {};
    if (onToggleContentGallery) {
      onToggleContentGallery(undefined, undefined, slotNumber);
    }
  };

  // handle responsive when editing in aurthoring
  const [device, setDevice] = useState("desktop");
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < MOBILE_WIDTH_THRESHOLD) setDevice("mobile");
      else if (window.innerWidth <= TABLE_WIDTH_THRESHOLD) setDevice("tablet");
      else setDevice("desktop");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sliderSettings =
    secondaryArgs?.prelemBaseEndpoint?.device === "tablet" || device === "tablet"
      ? { ...tabletSettings }
      : secondaryArgs?.prelemBaseEndpoint?.device === "mobile" || device === "mobile"
      ? { ...mobileSettings }
      : { ...windowSettings };
  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.multiSlot2Wrapper} ${globalClasses.prelemType3} prelem prelemType3 multiSlot2BG`}>
      <Container
        className={
          authoringHelper?.isEditPage ? "grid_full_width prelem-py" : "grid_container prelem-py"
        }>
        <Box ref={ref}>
          <Box className='multiSlotHeading'>
            <Typography variant='h2medium' id='Title' color='tertiaryTitle'>
              {content?.Title}
            </Typography>
          </Box>
          <Slider {...sliderSettings} dots={false} infinite={false}>
            {content?.Slots.map((item: any, index: number) => {
              return (
                <Box key={`card-${item.Id}`} p={1}>
                  {Object.keys(item).length !== 0 && (
                    <Paper onClick={() => onAdd(index)} className='paperCard'>
                      <Box
                        className='paperCardInnerWrapper'
                        sx={{
                          display: secondaryArgs?.editState ? "flex" : "none",
                        }}>
                        <Box className='addCardsIcon'>
                          <Cached className='iconRefresh' />
                        </Box>
                      </Box>
                      <MultiSlotCard2
                        content={content.Slots[index]}
                        secondaryArgs={secondaryArgs}
                        triggerAnalytics={triggerAnalytics}
                        index={index}
                      />
                    </Paper>
                  )}
                </Box>
              );
            })}
          </Slider>
        </Box>
      </Container>
    </div>
  );
};

interface MultiSlot2Props {
  content: Content;
  analytics: Analytics;
  authoringHelper: AuthoringHelper;
  secondaryArgs: SecondaryArgs;
}

interface Content {
  Title?: string;
  Description?: string;
  Slots: any[];
  TagName?: string;
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

interface SecondaryArgs {
  multiSlot: MultiSlot;
  editState?: boolean;
  prelemBaseEndpoint?: PrelemBaseEndpoint;
  sitename?: string;
}
interface MultiSlot {
  onToggleContentGallery: any;
}
interface PrelemBaseEndpoint {
  device?: string;
}

MultiSlot2.defaultProps = {
  content: {
    Description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type .",
    TagName: "SiteComponents",
    Title: "Lorem ipsum dolor sit amet.",
    PrelemContentType: [
      "ImageGallery",
      "VideoGallery",
      "Gallery",
      "Article",
      "Poll",
      "Quiz",
      "Event",
    ],
    Slots: [
      {
        Title: "Lorem ipsum dolor sit amet",
        Thumbnail: {
          Name: "ExpertiseShowcase2",
          Url: "machine_assets/1690806479275/public/png/ExpertiseShowcase2",
          Title: "ExpertiseShowcase2",
          Description: "This is for ExpertiseShowcase2",
          Attribution: false,
          AltText: "ExpertiseShowcase2",
          ext: "png",
          Visibility: "public",
        },
        EditorialItemPath:
          "/content/documents/hclplatformx/siteeditorial/imagegallery/xeroxgallery",
        Description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        Id: "Article_01",
        ContentType: "ImageGallery",
        PublishedBy: "Vibhor",
        PublishedDate: "2023-04-10T01:47:02.924Z",
      },
      {
        Title: "Lorem ipsum dolor sit amet",
        Thumbnail: {
          Name: "ExpertiseShowcase2",
          Url: "machine_assets/1690806479275/public/png/ExpertiseShowcase2",
          Title: "ExpertiseShowcase2",
          Description: "This is for ExpertiseShowcase2",
          Attribution: false,
          AltText: "ExpertiseShowcase2",
          ext: "png",
          Visibility: "public",
        },
        EditorialItemPath:
          "/content/documents/hclplatformx/siteeditorial/imagegallery/xeroxgallery",
        Description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        Id: "Article_02",
        ContentType: "ImageGallery",
        PublishedBy: "vibhor",
        PublishedDate: "2023-04-10T02:47:02.924Z",
      },
      {
        Title: "Lorem ipsum dolor sit amet",
        Thumbnail: {
          Name: "ExpertiseShowcase2",
          Url: "machine_assets/1690806479275/public/png/ExpertiseShowcase2",
          Title: "ExpertiseShowcase2",
          Description: "This is for ExpertiseShowcase2",
          Attribution: false,
          AltText: "ExpertiseShowcase2",
          ext: "png",
          Visibility: "public",
        },
        EditorialItemPath:
          "/content/documents/hclplatformx/siteeditorial/imagegallery/xeroxgallery",
        Description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        Id: "Article_03",
        ContentType: "ImageGallery",
        PublishedBy: "vibhor",
        PublishedDate: "2023-04-10T02:51:02.924Z",
      },
      {
        Title: "Lorem ipsum dolor sit amet",
        Thumbnail: {
          Name: "ExpertiseShowcase2",
          Url: "machine_assets/1690806479275/public/png/ExpertiseShowcase2",
          Title: "ExpertiseShowcase2",
          Description: "This is for ExpertiseShowcase2",
          Attribution: false,
          AltText: "ExpertiseShowcase2",
          ext: "png",
          Visibility: "public",
        },
        EditorialItemPath:
          "/content/documents/hclplatformx/siteeditorial/imagegallery/xeroxgallery",
        Description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        Id: "prelem_04",
        ContentType: "Article",
        PublishedBy: "vibhor",
        PublishedDate: "2023-04-10T02:54:02.924Z",
      },
    ],
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
    pageTitle: "Multi Slot Prelem",
    pageDesc:
      "This prelem having 4 cards that allows you to display all kind of content in grid. Use it to display the image gallery, video gallery, articles.",
    pageTags: "Multi Slot Prelem, Article Prelem, Media Cards",
    prelemTags: "Multi Slot Prelem, Article Prelem, Media Cards",
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

export default MultiSlot2;
