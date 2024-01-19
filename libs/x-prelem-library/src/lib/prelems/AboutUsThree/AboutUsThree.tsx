/* eslint-disable @typescript-eslint/no-empty-function */
import DoneIcon from "@mui/icons-material/Done";
import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import ImageRender from "../../components/ImageRender";
import BasicButton from "../../components/BasicButton/BasicButton";
import { useCustomStyle } from "./AboutUsThree.style";
import { completeButtonUrl, formCroppedUrl } from "@platformx/utilities";
import prelemTypes from "../../globalStyle";
import { usePrelemImpression } from "../../components/ImpressionHooks/PrelemImpressionHook";
import VideoPlayer from "../../components/VideoPlayers/VideoPlayer";

const AboutUsThree = ({
  content,
  analytics,
  authoringHelper,
  secondaryArgs,
}: AboutUsThreeProps) => {
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
  const defaultStructureData = () => {
    let AboutUsThreeStructureData;
    const { original_image_relative_path, ext }: any =
      content?.ImageCompound?.ImageCompound_1?.original_image || {};
    const img = formCroppedUrl(
      secondaryArgs?.gcpUrl,
      secondaryArgs?.bucketName,
      original_image_relative_path,
      ext,
    );
    try {
      AboutUsThreeStructureData = {
        "@context": "http://schema.org/",
        "@type": "WebPage",
        name: content?.Title,
        description: content?.Description,
        url: completeButtonUrl(
          content?.Button1_Action,
          content?.Button1_RedirectURL,
          secondaryArgs.prelemBaseEndpoint.buttonBaseUrl,
        ),
        image: img,
        video: content?.Videos?.Video_1?.Url,
      };
    } catch (e) {
      AboutUsThreeStructureData = {};
    }
    return AboutUsThreeStructureData;
  };
  const genrateStructureData = () => {
    let AboutUsThreeStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        AboutUsThreeStructureData = JSON.parse(tempSD);
      } else {
        AboutUsThreeStructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      AboutUsThreeStructureData = defaultStructureData();
    }
    return AboutUsThreeStructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = genrateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    content?.Title,
    content?.Description,
    content?.Description1,
    content?.Description2,
    content?.Description3,
    content?.ImageCompound?.ImageCompound_1?.original_image,
    content?.Videos?.Video_1?.Url,
    content?.Button1_Value,
    content?.Button1_RedirectURL,
  ]);

  usePrelemImpression(analytics, inView, secondaryArgs);

  return (
    <div ref={authoringHelper?.innerRef}>
      <Box
        className={`${classes.aboutUsThreeWrapper} ${globalClasses.prelemType3} prelem prelemType3 aboutus-three aboutUsThreeBg`}
        ref={ref}>
        <Container className={authoringHelper?.isEditPage ? "grid_full_width" : "grid_container"}>
          <Grid container ref={ref} className='gridcontainer'>
            <Grid item xs={12} sm={12} md={12} em={6} lg={6}>
              <Grid container>
                <Grid item xs={6}>
                  <Box className='imageWrapper'>
                    <ImageRender
                      originalImage={content?.ImageCompound?.ImageCompound_1?.original_image}
                      publishedImages={content?.ImageCompound?.ImageCompound_1?.published_images}
                      secondaryArgs={secondaryArgs}
                      imgOrder={{
                        1440: "portrait",
                        1280: "portrait",
                        1024: "portrait",
                        768: "portrait",
                        600: "portrait",
                        320: "portrait",
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box className='imageWrapper1'>
                    {content?.Videos?.Video_1.Url && (
                      <VideoPlayer
                        playerProp={{
                          posterImg: formCroppedUrl(
                            secondaryArgs?.gcpUrl,
                            secondaryArgs?.bucketName,
                            content?.Videos?.Video_1.Thumbnail,
                            content?.Videos?.Video_1.ext,
                          ),
                          videoUrl: content?.Videos?.Video_1.Url,
                        }}
                      />
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12} em={6} lg={6} className='contentWrapper'>
              {" "}
              <Typography component='h2' variant='h2medium' id='Title' color='tertiaryTitle'>
                {content.Title}
              </Typography>
              <Box>
                <Typography
                  component='p'
                  variant='p3regular'
                  color='tertiaryParagraph'
                  id='Description'>
                  {content.Description}
                </Typography>
              </Box>
              <Box>
                <ul style={{ padding: 0, margin: 0 }}>
                  <li className='alignList'>
                    <DoneIcon className='doneIcon' />
                    <Typography
                      component='p'
                      variant='p3regular'
                      color='tertiaryParagraph'
                      id='Description1'>
                      {content.Description1}
                    </Typography>
                  </li>
                  <li className='alignList'>
                    <DoneIcon className='doneIcon' />
                    <Typography
                      component='p'
                      variant='p3regular'
                      color='tertiaryParagraph'
                      id='Description2'>
                      {content.Description2}
                    </Typography>
                  </li>
                  <li className='alignList'>
                    <DoneIcon className='doneIcon' />
                    <Typography
                      component='p'
                      variant='p3regular'
                      color='tertiaryParagraph'
                      id='Description3'>
                      {content.Description3}
                    </Typography>
                  </li>
                </ul>
              </Box>
              <Box>
                <Box className='gap'>
                  <BasicButton
                    openButtonEditWindow={authoringHelper?.openButtonEditWindowInAuthoringCB}
                    isAuthoring={analytics?.isAuthoring}
                    currentBtnEditing={authoringHelper?.selectedButtonNameForEditing}
                    variant='tertiaryButton1'
                    analyticsEnabled={analytics?.isAnalyticsEnabled}
                    ButtonObj={ButtonObj1}
                    isEditing={authoringHelper?.isEditing}
                    buttonDataObj={ButtonDataObj1}
                    secondaryArgs={secondaryArgs}
                    analytics={analytics}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

interface AboutUsThreeProps {
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
  Description1?: string;
  Description2?: string;
  Description3?: string;
  Button1_Action?: string;
  Button1_Content?: string;
  Button1_Name?: string;
  Button1_RedirectURL?: string;
  Button1_RestEndPonit?: string;
  Button1_Type?: string;
  Button1_Value?: string;
  Videos?: {
    Video_1: {
      Name: string;
      Url: string;
      Title: string;
      Description: string;
      Attribution: boolean;
      Transcript: boolean;
      Thumbnail: string;
      CC: boolean;
      ext: string;
    };
  };

  TagName?: string;
  ImageCompound: {
    ImageCompound_1: {
      published_images: Image[];
      original_image?: OriginalImage;
    };
  };
}

interface OriginalImage {
  original_image_relative_path: string;
  ext: string;
}
interface Image {
  aspect_ratio: string;
  bucket_path: string;
  folder_path: string;
  visibility: string;
  ext: string;
}
AboutUsThree.defaultProps = {
  content: {
    Button1_Name: "Lorem ipsum",
    Button1_RedirectURL: "www.google.com", // relative page url | link url
    Button1_RestEndPonit: "", // ?
    Button1_Action: "External", // Page |  Link
    Button1_Type: "new window", // current window | new window
    Button1_Value: "Learn More",
    Title: "For the Content Centre",
    Description1: "Lorem ipsum dolor sit amet",
    Description2: "Lorem ipsum dolor sit amet",
    Description3: "Lorem ipsum dolor sit amet",
    Description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.",
    Videos: {
      Video_1: {
        Name: "HCL 360 Video",
        Thumbnail: "machine_assets/1690978664393/public/png/AboutUsThree_thumbnail",
        Url: "https://dev.dam.hcl-x.com/server/api/core/bitstreams/69ba1992-15d9-4d0d-9251-f79ae37184d5/content",
        Title: "HCL 360 Video",
        Description: "This is for HCL 360 Video",
        Attribution: false,
        CC: false,
        ext: "png",
        Visibility: "public",
        BitStreamId: "",
        Transcript: false,
      },
    },

    TagName: "SiteComponents",
    PrelemContentType: ["Select"],
    ImageCompound: {
      ImageCompound_1: {
        original_image: {
          original_image_relative_path: "machine_assets/1690287490190/public/png/AboutUsThree-Web",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "AboutUsThree",
            Name: "AboutUsThree",
            Title: "AboutUsThree",
            Description: "This is for AboutUsThree",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "portrait",
            folder_path: "machine_assets/1690287490190/public/png/AboutUsThree-Web-portrait",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1690287490190/public/png/AboutUsThree-Web-card1",
          },
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1690287490190/public/png/AboutUsThree-Web-square",
          },
          {
            aspect_ratio: "landscape",
            folder_path: "machine_assets/1690287490190/public/png/AboutUsThree-Web-landscape",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1690287490190/public/png/AboutUsThree-Web-hero",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1690287490190/public/png/AboutUsThree-Web-card2",
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
    pageId: 12345,
    prelemId: 23456,
    pageTitle: "About Us Three",
    pageDesc:
      "The Prelem ‘About Us Three’ can be used to give an introduction to your website. It has an image, title, description & CTA which can be used to add the required information.",
    pageTags: "Website, Introduction, About Us Three, Image, CTA, Title, Hero Banner",
    prelemTags: "Website, Introduction, About Us Three, Image, CTA, Title, Hero Banner",
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

export default AboutUsThree;
