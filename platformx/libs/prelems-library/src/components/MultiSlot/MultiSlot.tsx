import { Cached } from "@mui/icons-material";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import "../../Style.css";
import MultiSlotCard from "../MultiSlotCard/MultiSlotCard";
import { useCustomStyle } from "./MultiSlot.style";
import { prelemTypes } from "../../theme/globalStyle";
import { usePrelemImpression } from "Common/ImpressionHooks/PrelemImpressionHook";

const MultiSlot = ({ content, analytics, authoringHelper, secondaryArgs }: MultiSlotProps) => {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const firstRender = useRef(true);

  usePrelemImpression(analytics, inView);

  const defaultStructureData = () => {
    let multiSlotStructureData;
    try {
      multiSlotStructureData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: content?.Title,
        description: content?.Description,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: content.Slots[0].Title,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: content.Slots[1].Title,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: content.Slots[2].Title,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: content.Slots[3].Title,
          },
        ],
      };
    } catch (e) {
      multiSlotStructureData = {};
    }

    return multiSlotStructureData;
  };

  const generateStructureData = () => {
    let multiSlotStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current === true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        multiSlotStructureData = JSON.parse(tempSD);
      } else {
        multiSlotStructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      multiSlotStructureData = defaultStructureData();
    }
    return multiSlotStructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content?.Title, content?.Description, content?.Slots]);

  const onAdd = (slotNumber: number) => {
    const {
      multiSlot: { onToggleContentGallery },
    } = secondaryArgs;
    onToggleContentGallery(undefined, undefined, slotNumber);
  };

  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.MultiSlotWrapper} ${globalClasses.prelemType1} prelem prelemType1 MultiSlot`}>
      <Container
        className={
          authoringHelper?.isEditPage
            ? "grid_full_width prelem-py"
            : "grid_container grid_container_nopadding prelem-py"
        }>
        <Box ref={ref}>
          <Box className='topContentWrapper'>
            <Typography variant='h2semibold' id='Title'>
              {content?.Title}
            </Typography>
            <Typography variant='p3regular' id='Description'>
              {content?.Description}
            </Typography>
          </Box>
          <Grid container>
            {content?.Slots.map((item: any, index: any) => {
              return (
                <Grid item xs={12} sm={6} em={3} rowSpacing={1} p={1} key={index}>
                  {content &&
                    content?.Slots &&
                    Object.keys(content?.Slots?.[index]).length !== 0 && (
                      <Paper onClick={() => onAdd(index)} className='expertise-show-case-wrapper'>
                        <Box
                          className='refIconWrapper'
                          sx={{
                            display: secondaryArgs?.editState ? "flex" : "none",
                          }}>
                          <Box className='iconBox'>
                            <Cached />
                          </Box>
                        </Box>
                        <MultiSlotCard
                          content={content.Slots[index]}
                          secondaryArgs={secondaryArgs}
                        />
                      </Paper>
                    )}
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

interface MultiSlotProps {
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

interface Content {
  Title?: string;
  Description?: string;
  Slots: [
    {
      Id: string;
      EditorialItemPath: string;
      Description: string;
      Title: string;
      ImageDescription: string;
      Thumbnail: {
        Name: string;
        Url: string;
        Title: string;
        Description: string;
        AltText: string;
        Attribution: boolean;
        Color: string;
        ext: string;
      };
      ContentType: string;
      PublishedBy: string;
      Author: string;
      PublishedDate: string;
    },
    {
      Id: string;
      EditorialItemPath: string;
      Description: string;
      Title: string;
      ImageDescription: string;
      Thumbnail: {
        Name: string;
        Url: string;
        Title: string;
        Description: string;
        AltText: string;
        Attribution: boolean;
        Color: string;
        ext: string;
      };
      ContentType: string;
      PublishedBy: string;
      Author: string;
      PublishedDate: string;
    },
    {
      Id: string;
      EditorialItemPath: string;
      Description: string;
      Title: string;
      ImageDescription: string;
      Thumbnail: {
        Name: string;
        Url: string;
        Title: string;
        Description: string;
        AltText: string;
        Attribution: boolean;
        Color: string;
        ext: string;
      };
      ContentType: string;
      PublishedBy: string;
      Author: string;
      PublishedDate: string;
    },
    {
      Id: string;
      EditorialItemPath: string;
      Description: string;
      Title: string;
      ImageDescription: string;
      Thumbnail: {
        Name: string;
        Url: string;
        Title: string;
        Description: string;
        AltText: string;
        Attribution: boolean;
        Color: string;
        ext: string;
      };
      ContentType: string;
      PublishedBy: string;
      Author: string;
      PublishedDate: string;
    },
  ];
  TagName?: string;
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

MultiSlot.defaultProps = {
  content: {
    Title: "Lorem ipsum dolor sit amet",
    Description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.",
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
        ContentType: "Event",
        PublishedBy: "jitender",
        Author: "jitender",
        PublishedDate: "2022-10-04T12:47:02.924Z",
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
        ContentType: "Poll",
        PublishedBy: "Jitender",
        Author: "jitender",
        PublishedDate: "2022-10-04T12:47:02.924Z",
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
        ContentType: "VOD",
        PublishedBy: "Jitender",
        Author: "jitender",
        PublishedDate: "2022-10-04T12:47:02.924Z",
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
        Id: "Article_04",
        ContentType: "Quiz",
        PublishedBy: "Jitender",
        Author: "jitender",
        PublishedDate: "2022-10-04T12:47:02.924Z",
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
    gcpUrl: "https://storage.googleapis.com",
    bucketName: "cropped_image_public",
    prelemBaseEndpoint: {
      APIEndPoint: "https://platx-api-dev.fanuep.com/platform-x/",
      device: "window",
      buttonBaseUrl: "https://platx-publish-dev.fanuep.com/",
    },
    editState: false,
    multiSlot: {},
  },
};

export default MultiSlot;
