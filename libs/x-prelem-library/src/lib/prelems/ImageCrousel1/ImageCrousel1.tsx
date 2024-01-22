/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { completeButtonUrl, getImg } from "@platformx/utilities";
import BasicButton from "../../components/BasicButton/BasicButton";
import ImageRender from "../../components/ImageRender";
import { useCustomStyle } from "./ImageCrousel1.style";
import prelemTypes from "../../globalStyle";
import "./ImageCrousel1.css";
import { usePrelemImpression } from "../../components/ImpressionHooks/PrelemImpressionHook";
import Slider from "../../components/Slider/Slider";

const ImageCrousel1 = ({
  content,
  analytics,
  authoringHelper,
  secondaryArgs,
}: ImageCrousel1Prop) => {
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
  const ButtonObj3 = {
    Button_Name: "Button3_Name",
    Button_RedirectURL: "Button3_RedirectURL",
    Button_Type: "Button3_Type",
    Button_Value: "Button3_Value",
    Button_Action: "Button3_Action",
    Button_Content: "Button3_Content",
  };
  const ButtonDataObj3 = {
    Button_Name: content?.Button3_Name,
    Button_RedirectURL: content?.Button3_RedirectURL,
    Button_Type: content?.Button3_Type,
    Button_Value: content?.Button3_Value,
    Button_Action: content?.Button3_Action,
    Button_Content: content?.Button3_Content,
  };
  const ButtonObj4 = {
    Button_Name: "Button4_Name",
    Button_RedirectURL: "Button4_RedirectURL",
    Button_Type: "Button4_Type",
    Button_Value: "Button4_Value",
    Button_Action: "Button4_Action",
    Button_Content: "Button4_Content",
  };
  const ButtonDataObj4 = {
    Button_Name: content?.Button4_Name,
    Button_RedirectURL: content?.Button4_RedirectURL,
    Button_Type: content?.Button4_Type,
    Button_Value: content?.Button4_Value,
    Button_Action: content?.Button4_Action,
    Button_Content: content?.Button4_Content,
  };
  const ButtonObj5 = {
    Button_Name: "Button5_Name",
    Button_RedirectURL: "Button5_RedirectURL",
    Button_Type: "Button5_Type",
    Button_Value: "Button5_Value",
    Button_Action: "Button5_Action",
    Button_Content: "Button5_Content",
  };
  const ButtonDataObj5 = {
    Button_Name: content?.Button5_Name,
    Button_RedirectURL: content?.Button5_RedirectURL,
    Button_Type: content?.Button5_Type,
    Button_Value: content?.Button5_Value,
    Button_Action: content?.Button5_Action,
    Button_Content: content?.Button5_Content,
  };

  const firstRender = useRef(true);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const defaultStructureData = () => {
    let ImageCrousel1StructureData;
    try {
      ImageCrousel1StructureData = {
        "@context": "http://schema.org/",
        "@type": "ItemList",
        itemListElement:
          content?.ImageCompound &&
          Object.entries(content?.ImageCompound).map(([,], index) => {
            return {
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "ImageObject",
                image: getImg(content, secondaryArgs, index + 1),
                description: content[`${"Title_" + (index + 1)}`],

                contenturl: completeButtonUrl(
                  content["Button" + (index + 1) + "_Action"],
                  content["Button" + (index + 1) + "_RedirectURL"],
                  secondaryArgs.prelemBaseEndpoint.buttonBaseUrl,
                ),
              },
            };
          }),
      };
    } catch (e) {
      ImageCrousel1StructureData = {};
    }

    return ImageCrousel1StructureData;
  };
  const generateStructureData = () => {
    let ImageCrousel1StructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current === true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD)?.length > 0) {
        ImageCrousel1StructureData = JSON.parse(tempSD);
      } else {
        ImageCrousel1StructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      ImageCrousel1StructureData = defaultStructureData();
    }
    return ImageCrousel1StructureData;
  };
  const settings = {
    autoplay: !authoringHelper?.isEditPage,
    showThumb: false,
    animationType: "slideIn",
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    content?.ImageCompound,
    content?.Title_1,
    content?.Title_2,
    content?.Title_3,
    content?.Title_4,
    content?.Title_5,
    content?.Button1_RedirectURL,
    content?.Button2_RedirectURL,
    content?.Button3_RedirectURL,
    content?.Button4_RedirectURL,
    content?.Button5_RedirectURL,
  ]);

  usePrelemImpression(analytics, inView, secondaryArgs);
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  const thumbImg = Object.entries(content?.ImageCompound).map((_, index: number) => {
    return getImg(content, secondaryArgs, index + 1);
  });
  return (
    <Box
      ref={authoringHelper?.innerRef}
      className={`${classes.imageCrousel1Wrapper} ${globalClasses.prelemType2} prelem prelemType2 imageCrousel1`}>
      <Box ref={ref}>
        <Slider {...settings} thumbImg={thumbImg} sliderName='sliderContainer1'>
          {content?.ImageCompound &&
            Object.entries(content?.ImageCompound).map(([key, value], index) => (
              <Box key={index + 1} className='imgCrouselWrapper'>
                {value ? (
                  <Box className='crouselWrapper'>
                    <ImageRender
                      originalImage={
                        content?.ImageCompound[`ImageCompound_${index + 1}`]?.original_image
                      }
                      publishedImages={
                        content?.ImageCompound[`ImageCompound_${index + 1}`]?.published_images
                      }
                      secondaryArgs={secondaryArgs}
                      imgOrder={{
                        1440: "hero",
                        1280: "hero",
                        1024: "card2",
                        768: "card2",
                        600: "card2",
                        320: "card2",
                      }}
                    />
                    <Box className='imageCrouselBox'>
                      <Container
                        className={
                          authoringHelper?.isEditPage ? "grid_full_width" : "grid_container"
                        }>
                        <Typography
                          variant='h2semibold'
                          color='textColor'
                          key={key}
                          className={
                            authoringHelper?.isEditPage ? "typoText" : "typoText typoTextAnimation"
                          }
                          id={`Title_${index + 1}`}>
                          {content?.[`Title_${index + 1}`]}
                        </Typography>
                        <Box id='button'>
                          <BasicButton
                            openButtonEditWindow={
                              authoringHelper?.openButtonEditWindowInAuthoringCB
                            }
                            isAuthoring={analytics?.isAuthoring}
                            currentBtnEditing={authoringHelper?.selectedButtonNameForEditing}
                            variant='defaultButton1'
                            analyticsEnabled={analytics?.isAnalyticsEnabled}
                            ButtonObj={
                              key === "ImageCompound_1"
                                ? ButtonObj1
                                : key === "ImageCompound_2"
                                ? ButtonObj2
                                : key === "ImageCompound_3"
                                ? ButtonObj3
                                : key === "ImageCompound_4"
                                ? ButtonObj4
                                : ButtonObj5
                            }
                            isEditing={authoringHelper?.isEditing}
                            buttonDataObj={
                              key === "ImageCompound_1"
                                ? ButtonDataObj1
                                : key === "ImageCompound_2"
                                ? ButtonDataObj2
                                : key === "ImageCompound_3"
                                ? ButtonDataObj3
                                : key === "ImageCompound_4"
                                ? ButtonDataObj4
                                : ButtonDataObj5
                            }
                            secondaryArgs={secondaryArgs}
                            analytics={analytics}
                          />
                        </Box>
                      </Container>
                    </Box>
                  </Box>
                ) : null}
              </Box>
            ))}
        </Slider>
      </Box>
    </Box>
  );
};

interface ImageCrousel1Prop {
  content: Content;
  analytics?: any; //Analytics
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
  Description?: string;
  TagName?: string;
  Title_1?: string;
  Button1_Action?: string;
  Button1_Content?: string;
  Button1_Name?: string;
  Button1_RedirectURL?: string;
  Button1_RestEndPonit?: string;
  Button1_Type?: string;
  Button1_Value?: string;

  Title_2?: string;
  Button2_Action?: string;
  Button2_Content?: string;
  Button2_Name?: string;
  Button2_RedirectURL?: string;
  Button2_RestEndPonit?: string;
  Button2_Type?: string;
  Button2_Value?: string;

  Title_3?: string;
  Button3_Action?: string;
  Button3_Content?: string;
  Button3_Name?: string;
  Button3_RedirectURL?: string;
  Button3_RestEndPonit?: string;
  Button3_Type?: string;
  Button3_Value?: string;

  Title_4?: string;
  Button4_Action?: string;
  Button4_Content?: string;
  Button4_Name?: string;
  Button4_RedirectURL?: string;
  Button4_RestEndPonit?: string;
  Button4_Type?: string;
  Button4_Value?: string;

  Title_5?: string;
  Button5_Action?: string;
  Button5_Content?: string;
  Button5_Name?: string;
  Button5_RedirectURL?: string;
  Button5_RestEndPonit?: string;
  Button5_Type?: string;
  Button5_Value?: string;

  ImageCompound: {
    ImageCompound_1: ImageCompound;
    ImageCompound_2: ImageCompound;
    ImageCompound_3: ImageCompound;
    ImageCompound_4: ImageCompound;
    ImageCompound_5: ImageCompound;
  };
}

interface ImageCompound {
  original_image: object;
  published_images: PublishedImages[];
}

interface PublishedImages {
  aspect_ratio: string;
  bucket_path: string;
  folder_path: string;
  visibility: string;
  ext: string;
}

ImageCrousel1.defaultProps = {
  content: {
    TagName: "SiteComponents",
    Title: "",
    Title_1: "Lorem ipsum dolor sit amet",
    Button1_Action: "External",
    Button1_Name: "Digital Product",
    Button1_RedirectURL: "https://www.google.com/",
    Button1_RestEndPonit: "RestEndPoint 2",
    Button1_Type: "Button1_Type",
    Button1_Value: "Lorem ipsum1",

    Title_2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit2.",
    Button2_Action: "External",
    Button2_Name: "Digital Product",
    Button2_RedirectURL: "https://www.google.com/",
    Button2_RestEndPonit: "RestEndPoint 2",
    Button2_Type: "Button1_Type",
    Button2_Value: "Lorem ipsum2",

    Title_3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit3.",
    Button3_Action: "External",
    Button3_Name: "Digital Product",
    Button3_RedirectURL: "https://www.google.com/",
    Button3_RestEndPonit: "RestEndPoint 3",
    Button3_Type: "Button1_Type",
    Button3_Value: "Lorem ipsum3",

    Title_4: "Lorem ipsum dolor sit amet, consectetur adipiscing elit4.",
    Button4_Action: "External",
    Button4_Name: "Digital Product",
    Button4_RedirectURL: "https://www.google.com/",
    Button4_RestEndPonit: "RestEndPoint 4",
    Button4_Type: "Button1_Type",
    Button4_Value: "Lorem ipsum4",

    Title_5: "Lorem ipsum dolor sit amet, consectetur adipiscing elit5.",
    Button5_Action: "External",
    Button5_Name: "Digital Product",
    Button5_RedirectURL: "https://www.google.com/",
    Button5_RestEndPonit: "RestEndPoint 5",
    Button5_Type: "Button1_Type",
    Button5_Value: "Lorem ipsum5",
    ImageCompound: {
      ImageCompound_1: {
        published_images: [
          {
            aspect_ratio: "landscape",
            folder_path: "1689583455813/public/png/ContactUs",
          },
          {
            aspect_ratio: "square",
            folder_path: "1689583455813/public/png/ContactUs",
          },
          {
            aspect_ratio: "portrait",
            folder_path: "1689583455813/public/png/ContactUs",
          },
          {
            aspect_ratio: "hero",
            folder_path: "1689583455813/public/png/ContactUs",
          },
          {
            aspect_ratio: "card1",
            folder_path: "1689583455813/public/png/ContactUs",
          },
          {
            aspect_ratio: "card2",
            folder_path: "1689583455813/public/png/ContactUs",
          },
        ],
        original_image: {
          bitStreamId: "",
          original_image_relative_path: "machine_assets/1689925750685/public/png/ContactUs",
          visibility: "public",
          ext: "png",
          auto: "true",
        },
      },
      ImageCompound_2: {
        published_images: [
          {
            aspect_ratio: "portrait",
            folder_path: "machine_assets/1690001744940/public/png/ProductDetails-portrait",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1690001744940/public/png/ProductDetails-hero",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1690001744940/public/png/ProductDetails-card1",
          },
          {
            aspect_ratio: "landscape",
            folder_path: "machine_assets/1690001744940/public/png/ProductDetails-landscape",
          },
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1690001744940/public/png/ProductDetails-square",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1690001744940/public/png/ProductDetails-card2",
          },
        ],
        original_image: {
          bitStreamId: "",
          original_image_relative_path: "machine_assets/1690001744940/public/png/ProductDetails",
          visibility: "public",
          ext: "png",
          auto: "true",
        },
      },
      ImageCompound_3: {
        published_images: [
          {
            aspect_ratio: "landscape",
            folder_path: "1689583455813/public/png/ContactUs",
          },
          {
            aspect_ratio: "square",
            folder_path: "1689583455813/public/png/ContactUs",
          },
          {
            aspect_ratio: "portrait",
            folder_path: "1689583455813/public/png/ContactUs",
          },
          {
            aspect_ratio: "hero",
            folder_path: "1689583455813/public/png/ContactUs",
          },
          {
            aspect_ratio: "card1",
            folder_path: "1689583455813/public/png/ContactUs",
          },
          {
            aspect_ratio: "card2",
            folder_path: "1689583455813/public/png/ContactUs",
          },
        ],
        original_image: {
          bitStreamId: "",
          original_image_relative_path: "machine_assets/1689925750685/public/png/ContactUs",
          visibility: "public",
          ext: "png",
          auto: "true",
        },
      },
      ImageCompound_4: {
        published_images: [
          {
            aspect_ratio: "landscape",
            folder_path: "1689583455813/public/png/ContactUs",
          },
          {
            aspect_ratio: "square",
            folder_path: "1689583455813/public/png/ContactUs",
          },
          {
            aspect_ratio: "portrait",
            folder_path: "1689583455813/public/png/ContactUs",
          },
          {
            aspect_ratio: "hero",
            folder_path: "1689583455813/public/png/ContactUs",
          },
          {
            aspect_ratio: "card1",
            folder_path: "1689583455813/public/png/ContactUs",
          },
          {
            aspect_ratio: "card2",
            folder_path: "1689583455813/public/png/ContactUs",
          },
        ],
        original_image: {
          bitStreamId: "",
          original_image_relative_path: "machine_assets/1689925750685/public/png/ContactUs",
          visibility: "public",
          ext: "png",
          auto: "true",
        },
      },
      ImageCompound_5: {
        published_images: [
          {
            aspect_ratio: "landscape",
            folder_path: "1689583455813/public/png/ContactUs",
          },
          {
            aspect_ratio: "square",
            folder_path: "1689583455813/public/png/ContactUs",
          },
          {
            aspect_ratio: "portrait",
            folder_path: "1689583455813/public/png/ContactUs",
          },
          {
            aspect_ratio: "hero",
            folder_path: "1689583455813/public/png/ContactUs",
          },
          {
            aspect_ratio: "card1",
            folder_path: "1689583455813/public/png/ContactUs",
          },
          {
            aspect_ratio: "card2",
            folder_path: "1689583455813/public/png/ContactUs",
          },
        ],
        original_image: {
          bitStreamId: "",
          original_image_relative_path: "machine_assets/1689925750685/public/png/ContactUs",
          visibility: "public",
          ext: "png",
          auto: "true",
        },
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
    isSeoEnabled: false,
    isAuthoring: false,
    isAnalyticsEnabled: true,
    position: 0,
    pageId: 19,
    prelemId: 19,
    pageTitle: "Image Carousel 1",
    pageDesc:
      "This prelem can be used to create an image carousel of 5 images. All the image will have some text & CTA. Users can use it as the hero banner of the website.",
    pageTags: "Image Carousel, Images, Gallery, Hero Banner",
    prelemTags: "Image Carousel, Images, Gallery, Hero Banner",
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

export default ImageCrousel1;
