/* eslint-disable @typescript-eslint/no-empty-function */
import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import ImageRender from "../../components/ImageRender";
import { formCroppedUrl } from "@platformx/utilities";
import prelemTypes from "../../globalStyle";
import { useCustomStyle } from "./Banner2.style";
import "../../Style.css";
import { usePrelemImpression } from "../../components/ImpressionHooks/PrelemImpressionHook";

const Banner2 = ({ content, analytics, authoringHelper, secondaryArgs }: Banner2Prop) => {
  const firstRender = useRef(true);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const defaultStructureData = () => {
    let Banner2StructureData;
    const { original_image_relative_path, ext }: any =
      content?.ImageCompound?.ImageCompound_1?.original_image || {};
    const img = formCroppedUrl(
      secondaryArgs?.gcpUrl,
      secondaryArgs?.bucketName,
      original_image_relative_path,
      ext,
    );

    try {
      Banner2StructureData = {
        "@context": "http://schema.org/",
        "@type": "ImageObject",
        contentUrl: img,
        description: content?.Description,
        name: content?.Title,
      };
    } catch (e) {
      Banner2StructureData = {};
    }
    return Banner2StructureData;
  };

  const genrateStructureData = () => {
    let Banner2StructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current === true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        Banner2StructureData = JSON.parse(tempSD);
      } else {
        Banner2StructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      Banner2StructureData = defaultStructureData();
    }
    return Banner2StructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = genrateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    content?.ImageCompound?.ImageCompound_1?.original_image,
    content?.Title,
    content?.Description,
  ]);

  usePrelemImpression(analytics, inView, secondaryArgs);
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  return (
    <Box ref={authoringHelper?.innerRef}>
      <Grid container ref={ref}>
        <Grid item xs={12}>
          <Box
            className={`${classes.banner2MainWrapper} ${globalClasses.prelemType2} prelem prelemType2 banner2Props`}>
            <ImageRender
              originalImage={content?.ImageCompound?.ImageCompound_1?.original_image}
              publishedImages={content?.ImageCompound?.ImageCompound_1?.published_images}
              secondaryArgs={secondaryArgs}
              imgOrder={{
                1440: "hero",
                1280: "landscape",
                1024: "landscape",
                768: "landscape",
                600: "card1",
                320: "card1",
              }}
            />
            <Box className='banner2ContentWrapper'>
              <Container className='grid_container prelem-py' ref={ref}>
                <Grid container>
                  <Grid item xs={12} md={5.5} sm={12} lg={5.5}>
                    <Typography
                      variant='h2semibold'
                      color='textColor'
                      className='textAlignmentRightWrapper'
                      id='Title'>
                      {content.Title}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={1} sm={12} lg={1}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                      <Box
                        sx={{
                          height: {
                            md: "100px",
                            lg: "100px",
                            sm: "1px",
                            xs: "1px",
                          },
                          width: {
                            md: "1px",
                            lg: "1px",
                            sm: "100px",
                            xs: "100px",
                          },
                          backgroundColor: "#fff",
                        }}></Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={5.5} sm={12} lg={5.5}>
                    <Typography
                      variant='p3regular'
                      color='textColor'
                      className='textAlignmentLeftWrapper'
                      id='Description'>
                      {content.Description}
                    </Typography>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

interface Banner2Prop {
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
}

interface Content {
  Title?: string;
  Description?: string;
  ImageCompound: {
    ImageCompound_1: {
      published_images: Image[];
      original_image?: object;
    };
  };
}
interface Image {
  aspect_ratio: string;
  bucket_path: string;
  folder_path: string;
  visibility: string;
  ext: string;
}
Banner2.defaultProps = {
  content: {
    Title: "Lorum ipsum dolorsit amet, consecteter adipiscing elit",
    Description:
      "Lorum ipsum dolorsit amet, consecteter adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",

    PrelemContentType: ["Select"],
    ImageCompound: {
      ImageCompound_1: {
        original_image: {
          original_image_relative_path: "machine_assets/1690279185720/public/png/Banner2",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "BannerTwo",
            Name: "BannerTwo",
            Title: "BannerTwo",
            Description: "This is for BannerTwo",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1690279185720/public/png/Banner2-square",
          },
          {
            aspect_ratio: "portrait",
            folder_path: "machine_assets/1690279185720/public/png/Banner2-portrait",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1690279185720/public/png/Banner2-card1",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1690279185720/public/png/Banner2-hero",
          },
          {
            aspect_ratio: "landscape",
            folder_path: "machine_assets/1690279185720/public/png/Banner2-landscape",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1690279185720/public/png/Banner2-card2",
          },
        ],
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
  },

  analytics: {
    isAnalyticsEnabled: true,
    isSeoEnabled: false,
    isAuthoring: false,
    position: 0,
    pageId: 1234,
    prelemId: 2345,
    pageTitle: "Banner 2",
    pageDesc:
      "This prelem can be used as the main banner or simple banner anywhere in the website. ",
    pageTags: "Header Banner, Banner",
    prelemTags: "Header Banner, Banner",
  },
  secondaryArgs: {
    gcpUrl: "https://storage.googleapis.com",
    bucketName: "cropped_image_public",
  },
};

export default Banner2;
