import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import ImageRender from "../../components/ImageRender";
import "../../Style.css";
import "./ServiceCards.css";
import { completeButtonUrl, convertToLowerCase, getImg } from "@platformx/utilities";
import BasicButton from "../../components/BasicButton/BasicButton";
import { useCustomStyle } from "./ServiceCards.style";

const ServiceCard = ({ content, analytics, authoringHelper, secondaryArgs }: ServiceCardProps) => {
  const [clickCard, setClickCard] = useState([false, false, false, false, false, false]);

  const firstRender = useRef(true);
  const { ref } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const defaultStructureData = () => {
    let serviceCardsStructureData;
    try {
      serviceCardsStructureData = {
        "@context": "http://schema.org/",
        "@type": "ItemList",
        name: "ServiceCards",
        itemListElement:
          content?.ImageCompound &&
          Object.entries(content?.ImageCompound).map(([,], index) => {
            return {
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Service",
                serviceType: content?.Heading,
                mainEntityOfPage: `${secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint}${secondaryArgs?.currentPageURL}`, //TODO: This should be the page url where the prelem is added.
                name: content["Button" + (index + 1) + "_Value"],
                image: getImg(content, secondaryArgs, index + 1),
                url: completeButtonUrl(
                  content["Button" + (index + 1) + "_Action"],
                  content["Button" + (index + 1) + "_RedirectURL"],
                  secondaryArgs.prelemBaseEndpoint.buttonBaseUrl,
                ),
              },
            };
          }),
      };
    } catch (e) {
      serviceCardsStructureData = {};
    }

    return serviceCardsStructureData;
  };

  const generateStructureData = () => {
    let serviceCardsStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        serviceCardsStructureData = JSON.parse(tempSD);
      } else {
        serviceCardsStructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      serviceCardsStructureData = defaultStructureData();
    }
    return serviceCardsStructureData;
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
    content?.Heading,
    content?.Button1_Value,
    content?.Button2_Value,
    content?.Button3_Value,
    content?.Button4_Value,
    content?.Button5_Value,
    content?.Button6_Value,
    content?.Button1_RedirectURL,
    content?.Button2_RedirectURL,
    content?.Button3_RedirectURL,
    content?.Button4_RedirectURL,
    content?.Button5_RedirectURL,
    content?.Button6_RedirectURL,
  ]);

  useEffect(() => {
    if (!secondaryArgs?.editState) {
      const newClickCard = [...clickCard];
      newClickCard.forEach((element, index) => {
        newClickCard[index] = false;
      });
      setClickCard(newClickCard);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondaryArgs?.editState]);
  const classes = useCustomStyle();
  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.serviceCardsWrapperPrelem} serviceCardsBg`}>
      <Box ref={ref}>
        <Box>
          <Container
            className={
              authoringHelper?.isEditPage
                ? `grid_full_width prelem-py`
                : `grid_container grid_container_nopadding prelem-py`
            }>
            <Typography variant='h2semibold' id={"Heading"} textAlign='center'>
              {content.Heading}
            </Typography>
            <Grid container>
              {content?.ImageCompound &&
                Object.entries(content?.ImageCompound).map(([key, value], index) => {
                  const ButtonObjNew = {
                    Button_Name: "Button" + (index + 1) + "_Name",
                    Button_RedirectURL: "Button" + (index + 1) + "_RedirectURL",
                    Button_Type: "Button" + (index + 1) + "_Type",
                    Button_Value: "Button" + (index + 1) + "_Value",
                    Button_Action: "Button" + (index + 1) + "_Action",
                    Button_Content: "Button" + (index + 1) + "_Content",
                  };
                  const ButtonDataObjNew = {
                    Button_Name: content["Button" + (index + 1) + "_Name"],
                    Button_RedirectURL: content["Button" + (index + 1) + "_RedirectURL"],
                    Button_Type: content["Button" + (index + 1) + "_Type"],
                    Button_Value: content["Button" + (index + 1) + "_Value"],
                    Button_Action: content["Button" + (index + 1) + "_Action"],
                    Button_Content: content["Button" + (index + 1) + "_Content"],
                  };
                  const originalImage = value?.original_image;
                  const publishedImages = value?.published_images;
                  return (
                    <Grid
                      key={convertToLowerCase(key) + "ued-dm"}
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={4}
                      p={1}
                      className={authoringHelper?.isEditPage ? "" : "serviceCardItems"}>
                      <Box
                        sx={{
                          position: "relative",
                          cursor: "pointer",
                          "&:hover": {
                            ".image-button-text": {
                              bottom: `${!authoringHelper?.isEditing ? "0" : ""}`,
                              background: `${
                                !authoringHelper?.isEditing ? "rgba(0, 0, 0, 0.5)" : ""
                              }`,
                              color: `${!authoringHelper?.isEditing ? "#FFFFFF" : ""}`,
                              transition: `${!authoringHelper?.isEditing ? "all 0.7s" : "none"}`,
                            },
                            ".button-name": {
                              display: `${!authoringHelper?.isEditing ? "block" : ""}`,
                            },
                            ".button-text": {
                              display: "block",
                              justifyContent: "center",
                              alignItems: "center",
                              cursor: "pointer",
                            },
                          },
                        }}>
                        <Box className='imageWrapper'>
                          <ImageRender
                            originalImage={originalImage}
                            publishedImages={publishedImages}
                            secondaryArgs={secondaryArgs}
                            imgOrder={{
                              1440: "card2",
                              1280: "card2",
                              1024: "card2",
                              768: "card2",
                              600: "card2",
                              320: "card2",
                            }}
                          />
                          <Box className='cardGradient'></Box>
                          <Box className={`firstButtonWrapper button-text`}>
                            <BasicButton
                              openButtonEditWindow={
                                authoringHelper?.openButtonEditWindowInAuthoringCB
                              }
                              isAuthoring={analytics?.isAuthoring}
                              currentBtnEditing={authoringHelper?.selectedButtonNameForEditing}
                              variant='defaultButton2'
                              analyticsEnabled={analytics?.isAnalyticsEnabled}
                              ButtonObj={ButtonObjNew}
                              buttonDataObj={ButtonDataObjNew}
                              isEditing={authoringHelper?.isEditing}
                              secondaryArgs={secondaryArgs}
                              analytics={analytics}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  );
                })}
            </Grid>
          </Container>
        </Box>
      </Box>
    </div>
  );
};

interface ServiceCardProps {
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
  Heading: string;
  Button1_Action?: string;
  Button1_Content?: string;
  Button1_Name?: string;
  Button1_RedirectURL?: string;
  Button1_RestEndPonit?: string;
  Button1_Type?: string;
  Button1_Value?: string;

  Button2_Action?: string;
  Button2_Content?: string;
  Button2_Name?: string;
  Button2_RedirectURL?: string;
  Button2_RestEndPonit?: string;
  Button2_Type?: string;
  Button2_Value?: string;

  Button3_Action?: string;
  Button3_Content?: string;
  Button3_Name?: string;
  Button3_RedirectURL?: string;
  Button3_RestEndPonit?: string;
  Button3_Type?: string;
  Button3_Value?: string;

  Button4_Action?: string;
  Button4_Content?: string;
  Button4_Name?: string;
  Button4_RedirectURL?: string;
  Button4_RestEndPonit?: string;
  Button4_Type?: string;
  Button4_Value?: string;

  Button5_Action?: string;
  Button5_Content?: string;
  Button5_Name?: string;
  Button5_RedirectURL?: string;
  Button5_RestEndPonit?: string;
  Button5_Type?: string;
  Button5_Value?: string;

  Button6_Action?: string;
  Button6_Content?: string;
  Button6_Name?: string;
  Button6_RedirectURL?: string;
  Button6_RestEndPonit?: string;
  Button6_Type?: string;
  Button6_Value?: string;
  ImageCompound: {
    ImageCompound_1: ImageCompound;
    ImageCompound_2: ImageCompound;
    ImageCompound_3: ImageCompound;
    ImageCompound_4: ImageCompound;
    ImageCompound_5: ImageCompound;
    ImageCompound_6: ImageCompound;
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

ServiceCard.defaultProps = {
  content: {
    Heading: "Lorem ipsumdolor",
    Button1_Action: "External",
    Button1_Content: "",
    Button1_Name: "Lorem ipsum dolor sit amet",
    Button1_RedirectURL: "https://www.google.com",
    Button1_Type: "Button1_Type",
    Button1_RestEndPonit: "RestEndPoint 1",
    Button1_Value: "Lorem ipsum dolor sit amet",
    Button2_Action: "External",
    Button2_Content: "",
    Button2_Name: "Lorem ipsum dolor sit amet",
    Button2_RedirectURL: "https://www.google.com",
    Button2_RestEndPonit: "RestEndPoint 2",
    Button2_Type: "Button2_Type",
    Button2_Value: "Lorem ipsum dolor sit amet",
    Button3_Action: "External",
    Button3_Content: "",
    Button3_Name: "Lorem ipsum dolor sit amet",
    Button3_RedirectURL: "https://www.google.com",
    Button3_RestEndPonit: "RestEndPoint 3",
    Button3_Type: "Button3_Type",
    Button3_Value: "Lorem ipsum dolor sit amet",
    Button4_Action: "External",
    Button4_Content: "",
    Button4_Name: "Lorem ipsum dolor sit amet",
    Button4_RedirectURL: "https://www.google.com",
    Button4_RestEndPonit: "RestEndPoint 4",
    Button4_Type: "Button4_Type",
    Button4_Value: "Lorem ipsum dolor sit amet",
    Button5_Action: "External",
    Button5_Content: "",
    Button5_Name: "Lorem ipsum dolor sit amet",
    Button5_RedirectURL: "https://www.google.com",
    Button5_RestEndPonit: "RestEndPoint 4",
    Button5_Type: "Button5_Type",
    Button5_Value: "Lorem ipsum dolor sit amet",
    Button6_Action: "External",
    Button6_Content: "",
    Button6_Name: "Lorem ipsum dolor sit amet",
    Button6_RedirectURL: "https://www.google.com",
    Button6_RestEndPonit: "RestEndPoint 4",
    Button6_Type: "Button6_Type",
    Button6_Value: "Lorem ipsum dolor sit amet",
    ImageCompound: {
      ImageCompound_1: {
        original_image: {
          original_image_relative_path: "machine_assets/1690450614461/public/png/ServiceCard1",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "ServiceCard1",
            Name: "ServiceCard1",
            Title: "ServiceCard1",
            Description: "This is for ServiceCard1",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "portrait",
            folder_path: "machine_assets/1690450614461/public/png/ServiceCard1-portrait",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1690450614461/public/png/ServiceCard1-card1",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1690450614461/public/png/ServiceCard1-hero",
          },
          {
            aspect_ratio: "landscape",
            folder_path: "machine_assets/1690450614461/public/png/ServiceCard1-landscape",
          },
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1690450614461/public/png/ServiceCard1-square",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1690450614461/public/png/ServiceCard1-card2",
          },
        ],
      },
      ImageCompound_2: {
        original_image: {
          original_image_relative_path: "machine_assets/1690450643905/public/png/ServiceCard2",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "ServiceCard2",
            Name: "ServiceCard2",
            Title: "ServiceCard2",
            Description: "This is for ServiceCard2",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "portrait",
            folder_path: "machine_assets/1690450643905/public/png/ServiceCard2-portrait",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1690450643905/public/png/ServiceCard2-hero",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1690450643905/public/png/ServiceCard2-card1",
          },
          {
            aspect_ratio: "landscape",
            folder_path: "machine_assets/1690450643905/public/png/ServiceCard2-landscape",
          },
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1690450643905/public/png/ServiceCard2-square",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1690450643905/public/png/ServiceCard2-card2",
          },
        ],
      },
      ImageCompound_3: {
        original_image: {
          original_image_relative_path: "machine_assets/1690450672443/public/png/ServiceCard3",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "ServiceCard3",
            Name: "ServiceCard3",
            Title: "ServiceCard3",
            Description: "This is for ServiceCard3",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1690450672443/public/png/ServiceCard3-square",
          },
          {
            aspect_ratio: "portrait",
            folder_path: "machine_assets/1690450672443/public/png/ServiceCard3-portrait",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1690450672443/public/png/ServiceCard3-hero",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1690450672443/public/png/ServiceCard3-card1",
          },
          {
            aspect_ratio: "landscape",
            folder_path: "machine_assets/1690450672443/public/png/ServiceCard3-landscape",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1690450672443/public/png/ServiceCard3-card2",
          },
        ],
      },
      ImageCompound_4: {
        original_image: {
          original_image_relative_path: "machine_assets/1690450614461/public/png/ServiceCard1",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "ServiceCard1",
            Name: "ServiceCard1",
            Title: "ServiceCard1",
            Description: "This is for ServiceCard1",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "portrait",
            folder_path: "machine_assets/1690450614461/public/png/ServiceCard1-portrait",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1690450614461/public/png/ServiceCard1-card1",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1690450614461/public/png/ServiceCard1-hero",
          },
          {
            aspect_ratio: "landscape",
            folder_path: "machine_assets/1690450614461/public/png/ServiceCard1-landscape",
          },
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1690450614461/public/png/ServiceCard1-square",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1690450614461/public/png/ServiceCard1-card2",
          },
        ],
      },
      ImageCompound_5: {
        original_image: {
          original_image_relative_path: "machine_assets/1690450643905/public/png/ServiceCard2",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "ServiceCard2",
            Name: "ServiceCard2",
            Title: "ServiceCard2",
            Description: "This is for ServiceCard2",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "portrait",
            folder_path: "machine_assets/1690450643905/public/png/ServiceCard2-portrait",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1690450643905/public/png/ServiceCard2-hero",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1690450643905/public/png/ServiceCard2-card1",
          },
          {
            aspect_ratio: "landscape",
            folder_path: "machine_assets/1690450643905/public/png/ServiceCard2-landscape",
          },
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1690450643905/public/png/ServiceCard2-square",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1690450643905/public/png/ServiceCard2-card2",
          },
        ],
      },
      ImageCompound_6: {
        original_image: {
          original_image_relative_path: "machine_assets/1690450672443/public/png/ServiceCard3",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "ServiceCard3",
            Name: "ServiceCard3",
            Title: "ServiceCard3",
            Description: "This is for ServiceCard3",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1690450672443/public/png/ServiceCard3-square",
          },
          {
            aspect_ratio: "portrait",
            folder_path: "machine_assets/1690450672443/public/png/ServiceCard3-portrait",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1690450672443/public/png/ServiceCard3-hero",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1690450672443/public/png/ServiceCard3-card1",
          },
          {
            aspect_ratio: "landscape",
            folder_path: "machine_assets/1690450672443/public/png/ServiceCard3-landscape",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1690450672443/public/png/ServiceCard3-card2",
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
    isEditing: true,
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
    pageId: 18,
    prelemId: 18,
    pageTitle: "Expertise showcase",
    pageDesc: "This prelem can be used to display the sponsors logo that the user wants.",
    pageTags: "Showcase, Experience, Images, Image Gallery, Gallery, PDF",
    prelemTags: "Showcase, Experience, Images, Image Gallery, Gallery, PDF",
  },
  secondaryArgs: {
    currentPageURL: "",
    sitename: "delhiuniversity",
    prelemBaseEndpoint: {
      PublishEndPoint: "",
      APIEndPoint: "https://platx-api-dev.fanuep.com/platform-x/",
      device: "window",
      buttonBaseUrl: "https://platx-publish-dev.fanuep.com/",
      deliveryEndPoint: "https://dev.delivery.hcl-x.com/platform-x/",
    },
    editState: false,
    multiSlot: {},
    gcpUrl: "https://storage.googleapis.com",
    bucketName: "cropped_image_public",
  },
};
export default ServiceCard;
