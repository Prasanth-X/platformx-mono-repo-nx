import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import ImageRender from "../../components/ImageRender";
import Slider from "react-slick";
import BasicButton from "../../components/BasicButton/BasicButton";
import { formCroppedUrl, handleHtmlTags } from "@platformx/utilities";
import { useCustomStyle } from "./Banner7.style";
import "./Banner7.css";
import prelemTypes from "../../globalStyle";
import "../../Style.css";
import { usePrelemImpression } from "../../components/ImpressionHooks/PrelemImpressionHook";

// ts-ignore
const Banner7 = ({
  content,
  analytics,
  authoringHelper,
  secondaryArgs,
}: //secondaryArgs,
Banner7Prop) => {
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
  const ButtonObj2 = {
    Button_Name: "Button2_Name",
    Button_RedirectURL: "Button2_RedirectURL",
    Button_Type: "Button2_Type",
    Button_Value: "Button2_Value",
    Button_Action: "Button2_Action",
    Button_Content: "Button2_Content",
  };
  const ButtonDataObj2 = {
    Button_Name: content?.Button2_Name,
    Button_RedirectURL: content?.Button2_RedirectURL,
    Button_Type: content?.Button2_Type,
    Button_Value: content?.Button2_Value,
    Button_Action: content?.Button2_Action,
    Button_Content: content?.Button2_Content,
  };
  const firstRender = useRef(true);

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const defaultStructureData = () => {
    let Banner7StructureData;
    const { original_image_relative_path, ext }: any =
      content?.ImageCompound?.ImageCompound_1?.original_image || {};
    const img = formCroppedUrl(
      secondaryArgs?.gcpUrl,
      secondaryArgs?.bucketName,
      original_image_relative_path,
      ext,
    );

    try {
      Banner7StructureData = {
        "@context": "http://schema.org/",
        "@type": "ContactPage",
        description: handleHtmlTags(content?.description1),
        image: img,
        name: content?.title1,
      };
    } catch (e) {
      Banner7StructureData = {};
    }

    return Banner7StructureData;
  };

  const generateStructureData = () => {
    let Banner7StructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current === true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        Banner7StructureData = JSON.parse(tempSD);
      } else {
        Banner7StructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      Banner7StructureData = defaultStructureData();
    }
    return Banner7StructureData;
  };
  const windowSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    dots: true,
    arrow: false,
  };

  const sliderSettings = { ...windowSettings };

  useEffect(() => {
    if (navigator) {
      if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator?.userAgent)) {
        // console.log("mobile");
      } else {
        // console.log("not mobile");
      }
    }
  }, []);

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    content?.description1,
    content?.ImageCompound?.ImageCompound_1?.original_image,
    content?.title1,
  ]);

  usePrelemImpression(analytics, inView, secondaryArgs);

  /* AnalyticsEnabled dependency added as many times we are not getting analytics provider*async call)
  1. we are first checking in publish app if analytics provider is avaiable or not
  2. if its available we are setting AnalyticsEnabled to true
  3. if its not available we are setting false
*/
  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.Banner7Wrapper} ${globalClasses.prelemType1} prelem prelemType1 Banner7Bg`}>
      <Container
        className={authoringHelper?.isEditPage ? "grid_full_width" : "grid_container"}
        ref={ref}>
        <Box className='Banner7'>
          <Slider {...sliderSettings}>
            <Box>
              <Grid className='mobRevCol' container>
                <Grid xs={12} em={6} className='contentLeftWp'>
                  <Box className='LeftContent'>
                    <Typography variant='h1largebold' id='title1'>
                      {content.title1}
                    </Typography>
                    <Typography variant='p2regular' id='description1'>
                      {content.description1}
                    </Typography>
                    <BasicButton
                      openButtonEditWindow={authoringHelper?.openButtonEditWindowInAuthoringCB}
                      isAuthoring={analytics?.isAuthoring}
                      currentBtnEditing={authoringHelper?.selectedButtonNameForEditing}
                      //buttonRef={buttonRef}
                      //buttonContentEditable={buttonContentEditable}
                      variant='primaryButton1'
                      analyticsEnabled={analytics?.isAnalyticsEnabled}
                      ButtonObj={ButtonObj1}
                      isEditing={authoringHelper?.isEditing}
                      buttonDataObj={ButtonDataObj1}
                      secondaryArgs={secondaryArgs}
                      analytics={analytics}
                    />
                  </Box>
                </Grid>
                <Grid xs={12} em={6}>
                  <Box className='rightImgBox'>
                    <Box className='widthheight100'>
                      <ImageRender
                        originalImage={content?.ImageCompound?.ImageCompound_1?.original_image}
                        publishedImages={content?.ImageCompound?.ImageCompound_1?.published_images}
                        secondaryArgs={secondaryArgs}
                        imgOrder={{
                          1440: "square",
                          1280: "square",
                          1024: "square",
                          768: "card2",
                          600: "card2",
                          320: "card2",
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid className='mobRevCol' container>
                <Grid xs={12} em={6} className='contentLeftWp'>
                  <Box className='LeftContent'>
                    <Typography variant='h1largebold' id='title2'>
                      {content.title2}
                    </Typography>
                    <Typography variant='p2regular' id='description2'>
                      {content.description2}
                    </Typography>
                    <BasicButton
                      openButtonEditWindow={authoringHelper?.openButtonEditWindowInAuthoringCB}
                      isAuthoring={analytics?.isAuthoring}
                      currentBtnEditing={authoringHelper?.selectedButtonNameForEditing}
                      //buttonRef={buttonRef}
                      //buttonContentEditable={buttonContentEditable}
                      variant='primaryButton1'
                      analyticsEnabled={analytics?.isAnalyticsEnabled}
                      ButtonObj={ButtonObj2}
                      isEditing={authoringHelper?.isEditing}
                      buttonDataObj={ButtonDataObj2}
                      secondaryArgs={secondaryArgs}
                      analytics={analytics}
                    />
                  </Box>
                </Grid>
                <Grid xs={12} em={6}>
                  <Box className='rightImgBox'>
                    <Box className='widthheight100'>
                      <ImageRender
                        originalImage={content?.ImageCompound?.ImageCompound_1?.original_image}
                        publishedImages={content?.ImageCompound?.ImageCompound_2?.published_images}
                        secondaryArgs={secondaryArgs}
                        imgOrder={{
                          1440: "square",
                          1280: "square",
                          1024: "square",
                          768: "card2",
                          600: "card2",
                          320: "card2",
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Slider>
        </Box>
      </Container>
    </div>
  );
};

interface Banner7Prop {
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
  title1?: string;
  description1?: string;
  Button1_Action?: string;
  Button1_Content?: string;
  Button1_Name?: string;
  Button1_RedirectURL?: string;
  Button1_RestEndPonit?: string;
  Button1_Type?: string;
  Button1_Value?: string;

  title2?: string;
  description2?: string;
  Button2_Action?: string;
  Button2_Content?: string;
  Button2_Name?: string;
  Button2_RedirectURL?: string;
  Button2_RestEndPonit?: string;
  Button2_Type?: string;
  Button2_Value?: string;
  TagName?: string;
  ImageCompound: {
    ImageCompound_1: {
      published_images: Image[];
      original_image?: object;
    };
    ImageCompound_2: {
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

Banner7.defaultProps = {
  content: {
    Button1_Action: "External",
    Button1_Content: "",
    Button1_Name: "Button1_Name",
    Button1_RedirectURL: "www.google.com",
    Button1_RestEndPoint: "RestEndPoint 1",
    Button1_Type: "Button1_Type",
    Button1_Value: "Read More",
    Button2_Action: "External",
    Button2_Content: "",
    Button2_Name: "Button2_Name",
    Button2_RedirectURL: "www.google.com",
    Button2_RestEndPoint: "RestEndPoint 2",
    Button2_Type: "Button2_Type",
    Button2_Value: "Read More",
    TagName: "SiteComponents",
    description1: "Nature is characterised by its diversity, complexity, and interconnectedness 1",
    description2: "Nature is characterised by its diversity, complexity, and interconnectedness 2",
    title1: "Embracing the Beauty of Nature: A Journey into the Wild 1",
    title2: "Embracing the Beauty of Nature: A Journey into the Wild 2",
    PrelemContentType: ["Select"],
    ImageCompound: {
      ImageCompound_1: {
        original_image: {
          original_image_relative_path: "machine_assets/1690001744940/public/png/ProductDetails",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "Imagecard3",
            Name: "Imagecard3",
            Title: "Imagecard3",
            Description: "This is for Imagecard3",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "card1",
            folder_path: "1701943708677/public/png/Rectangle-4607-card1",
          },
          {
            aspect_ratio: "portrait",
            folder_path: "1701943708677/public/png/Rectangle-4607-portrait",
          },
          {
            aspect_ratio: "square",
            folder_path: "1701943708677/public/png/Rectangle-4607-square",
          },
          {
            aspect_ratio: "hero",
            folder_path: "1701943708677/public/png/Rectangle-4607-hero",
          },
          {
            aspect_ratio: "landscape",
            folder_path: "1701943708677/public/png/Rectangle-4607-landscape",
          },
          {
            aspect_ratio: "card2",
            folder_path: "1701943708677/public/png/Rectangle-4607-card2",
          },
        ],
      },
      ImageCompound_2: {
        original_image: {
          original_image_relative_path: "machine_assets/1690001744940/public/png/ProductDetails",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "Imagecard4",
            Name: "Imagecard4",
            Title: "Imagecard4",
            Description: "This is for Imagecard4",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "portrait",
            folder_path: "1701943857057/public/png/Rectangle-4609-portrait",
          },
          {
            aspect_ratio: "card1",
            folder_path: "1701943857057/public/png/Rectangle-4609-card1",
          },
          {
            aspect_ratio: "square",
            folder_path: "1701943857057/public/png/Rectangle-4609-square",
          },
          {
            aspect_ratio: "hero",
            folder_path: "1701943857057/public/png/Rectangle-4609-hero",
          },
          {
            aspect_ratio: "landscape",
            folder_path: "1701943857057/public/png/Rectangle-4609-landscape",
          },
          {
            aspect_ratio: "card2",
            folder_path: "1701943857057/public/png/Rectangle-4609-card2",
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
    gcpUrl: "https://storage.googleapis.com",
    bucketName: "cropped_image_public",
    prelemBaseEndpoint: {
      deliveryEndPoint: "http://platx-delivery-dev.fanuep.com/platform-x/",
      APIEndPoint: "https://platx-api-dev.fanuep.com/platform-x/",
      device: "window",
      buttonBaseUrl: "https://platx-publish-dev.fanuep.com/",
    },
    editState: false,
    multiSlot: {},
  },
};

export default Banner7;
