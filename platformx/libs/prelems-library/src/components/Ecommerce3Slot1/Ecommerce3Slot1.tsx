import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useInView } from "react-intersection-observer";
import { Container, Typography } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import "./Ecommerce3Slot1.css";
import { useCustomStyle } from "./Ecommerce3Slot1.style";
import BasicButton from "../BasicButton/BasicButton";
import ImageRender from "../../Common/ImageRender";
import { usePrelemImpression } from "Common/ImpressionHooks/PrelemImpressionHook";

export default function Ecommerce3Slot1({
  content,
  analytics,
  authoringHelper,
  secondaryArgs,
}: Ecommerce3Slot1Props) {
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

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  usePrelemImpression(analytics, inView);
  const classes = useCustomStyle();
  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.ecommerce3Slot1Wrapper} outer-row ecommerce3Slot1Bg`}>
      <Container
        ref={ref}
        className={
          authoringHelper?.isEditPage ? "grid_full_width prelem-py" : "grid_container prelem-py"
        }>
        <Grid
          em={12}
          sx={{
            width: "100%",
            display: { xs: "flex", md: "block", em: "grid" },
            gap: "30px",
            flexDirection: { xs: "column" },
            height: "auto",
            justifyContent: "center",
            padding: { xs: "15px", md: "30px" },
          }}>
          <Grid
            em={9}
            sx={{
              gridRow: { em: "1 / 3" },
              gridColumn: { em: "1 / 2" },
              marginBottom: { md: "30px", em: "0" },
            }}
            className='discover-article'>
            <Box className='discover-image1 discover-picture'>
              <Box className='imgOverlay'></Box>
              <ImageRender
                originalImage={content?.ImageCompound?.ImageCompound_1?.original_image}
                publishedImages={content?.ImageCompound?.ImageCompound_1?.published_images}
                secondaryArgs={secondaryArgs}
                imgOrder={{
                  1440: "square",
                  1280: "landscape",
                  1024: "card2",
                  768: "square",
                  600: "card1",
                  320: "portrait",
                }}
              />
            </Box>
            <Box
              className='discover-headerArea'
              sx={{ left: "18px", top: "25px", flexDirection: "column" }}>
              <Typography
                variant='h2regular'
                color='textColor'
                sx={{ left: "45px", top: "37px" }}
                id='Title1'>
                {content?.Title1}
              </Typography>
              <Box>
                <BasicButton
                  openButtonEditWindow={authoringHelper?.openButtonEditWindowInAuthoringCB}
                  isAuthoring={analytics?.isAuthoring}
                  currentBtnEditing={authoringHelper?.selectedButtonNameForEditing}
                  variant='defaultButton1'
                  analyticsEnabled={analytics?.isAnalyticsEnabled}
                  ButtonObj={ButtonObj1}
                  isEditing={authoringHelper?.isEditing}
                  buttonDataObj={ButtonDataObj1}
                  secondaryArgs={secondaryArgs}
                  endIcon={<EastIcon className='arrowIcon icon headerLight' />}
                  analytics={analytics}
                />
              </Box>
            </Box>
          </Grid>
          <Grid
            em={3}
            sx={{
              gridRow: { em: "1" },
              gridColumn: { em: "2" },
              paddingRight: { md: "15px", em: "0px" },
              width: { md: "50%", em: "initial" },
              float: { md: "left", em: "unset" },
            }}
            className='discover-article'>
            <Box className='discover-image2 discover-picture'>
              <Box className='imgOverlay'></Box>
              <ImageRender
                originalImage={content?.ImageCompound?.ImageCompound_2?.original_image}
                publishedImages={content?.ImageCompound?.ImageCompound_2?.published_images}
                secondaryArgs={secondaryArgs}
                imgOrder={{
                  1440: "square",
                  1280: "landscape",
                  1024: "card2",
                  768: "square",
                  600: "card1",
                  320: "portrait",
                }}
              />
            </Box>
            <Box
              className='discover-headerArea'
              sx={{ left: "18px", top: "25px", flexDirection: "column" }}>
              <Typography variant='h4regular' color='textColor' id='Title2'>
                {content?.Title2}
              </Typography>
              <Box>
                <BasicButton
                  openButtonEditWindow={authoringHelper?.openButtonEditWindowInAuthoringCB}
                  isAuthoring={analytics?.isAuthoring}
                  currentBtnEditing={authoringHelper?.selectedButtonNameForEditing}
                  variant='defaultButton1'
                  analyticsEnabled={analytics?.isAnalyticsEnabled}
                  ButtonObj={ButtonObj2}
                  isEditing={authoringHelper?.isEditing}
                  buttonDataObj={ButtonDataObj2}
                  secondaryArgs={secondaryArgs}
                  endIcon={<EastIcon className='arrowIcon icon headerLight' />}
                  analytics={analytics}
                />
              </Box>
            </Box>
          </Grid>
          <Grid
            em={3}
            sx={{
              gridRow: { em: "2" },
              gridColumn: { em: "unset" },
              paddingLeft: { md: "15px", em: "0px" },
              width: { md: "50%", em: "initial" },
              float: { md: "right", em: "unset" },
            }}
            className='discover-article'>
            <Box className='discover-image2 discover-picture'>
              <Box className='imgOverlay'></Box>
              <ImageRender
                originalImage={content?.ImageCompound?.ImageCompound_3?.original_image}
                publishedImages={content?.ImageCompound?.ImageCompound_3?.published_images}
                secondaryArgs={secondaryArgs}
                imgOrder={{
                  1440: "square",
                  1280: "landscape",
                  1024: "card2",
                  768: "square",
                  600: "card1",
                  320: "portrait",
                }}
              />
            </Box>
            <Box
              className='discover-headerArea'
              sx={{
                left: { md: "36px", xs: "18px", em: "18px" },
                top: "25px",
                flexDirection: "column",
              }}>
              <Typography variant='h4regular' color='textColor' id='Title3'>
                {content?.Title3}
              </Typography>
              <Box>
                <BasicButton
                  openButtonEditWindow={authoringHelper?.openButtonEditWindowInAuthoringCB}
                  isAuthoring={analytics?.isAuthoring}
                  currentBtnEditing={authoringHelper?.selectedButtonNameForEditing}
                  variant='defaultButton1'
                  analyticsEnabled={analytics?.isAnalyticsEnabled}
                  ButtonObj={ButtonObj3}
                  isEditing={authoringHelper?.isEditing}
                  buttonDataObj={ButtonDataObj3}
                  secondaryArgs={secondaryArgs}
                  endIcon={<EastIcon className='arrowIcon icon headerLight' />}
                  analytics={analytics}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

interface Ecommerce3Slot1Props {
  content: Content;
  analytics: Analytics;
  authoringHelper: AuthoringHelper;
  secondaryArgs: any;
}

interface Content {
  TagName?: string;

  Title1?: string;
  Button1_Action?: string;
  Button1_Content?: string;
  Button1_Name?: string;
  Button1_RedirectURL?: string;
  Button1_RestEndPonit?: string;
  Button1_Type?: string;
  Button1_Value?: string;

  Title2?: string;
  Button2_Action?: string;
  Button2_Content?: string;
  Button2_Name?: string;
  Button2_RedirectURL?: string;
  Button2_RestEndPonit?: string;
  Button2_Type?: string;
  Button2_Value?: string;

  Title3?: string;
  Button3_Action?: string;
  Button3_Content?: string;
  Button3_Name?: string;
  Button3_RedirectURL?: string;
  Button3_RestEndPonit?: string;
  Button3_Type?: string;
  Button3_Value?: string;

  ImageCompound: {
    ImageCompound_1: ImageCompound;
    ImageCompound_2: ImageCompound;
    ImageCompound_3: ImageCompound;
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
  isEditPage: boolean;
}

Ecommerce3Slot1.defaultProps = {
  content: {
    Button1_Action: "Ecommerce",
    Button1_Content:
      '{"pagination":{"start":0,"rows":10},"searchTerm":"","tags":[],"filter":"Ecommerce","isSuggestive":false,"ecommerceRequest":{"filter":[]}}',
    Button1_Name: "ReachUS",
    Button1_RedirectURL: "https://www.google.com",
    Button1_RestEndPoint: "RestEndPoint 1",
    Button1_Type: "new window",
    Button1_Value: "Lorem Ipsum",
    Button2_Action: "Ecommerce",
    Button2_Content:
      '{"pagination":{"start":0,"rows":10},"searchTerm":"","tags":[],"filter":"Ecommerce","isSuggestive":false,"ecommerceRequest":{"filter":[]}}',
    Button2_Name: "ReachUS",
    Button2_RedirectURL: "Lorem ipsum",
    Button2_RestEndPoint: "",
    Button2_Type: "new window",
    Button2_Value: "Lorem ipsum",
    Button3_Action: "Ecommerce",
    Button3_Content:
      '{"pagination":{"start":0,"rows":10},"searchTerm":"","tags":[],"filter":"Ecommerce","isSuggestive":false,"ecommerceRequest":{"filter":[]}}',
    Button3_Name: "ReachUS",
    Button3_RedirectURL: "Lorem ipsum",
    Button3_RestEndPoint: "",
    Button3_Type: "new window",
    Button3_Value: "Lorem ipsum",
    Images: {
      Image_1: {
        Name: "X_Image",
        Url: "machine_assets/1690469744505/public/png/3Slot1_Image1",
        Title: "ThreeSlotOne",
        Description: "This is for ThreeSlotOne",
        Attribution: false,
        AltText: "ThreeSlotOne",
        ext: "png",
        visibility: "public",
      },
      Image_2: {
        Name: "X_Image",
        Url: "machine_assets/1690469771891/public/png/3Slot1_Image2",
        Title: "ThreeSlotOne",
        Description: "This is for ThreeSlotOne",
        Attribution: false,
        AltText: "ThreeSlotOne",
        ext: "png",
        visibility: "public",
      },
      Image_3: {
        Name: "X_Image",
        Url: "machine_assets/1690469795885/public/png/3Slot1_Image3",
        Title: "ThreeSlotOne",
        Description: "This is for ThreeSlotOne",
        Attribution: false,
        AltText: "ThreeSlotOne",
        ext: "png",
        visibility: "public",
      },
    },
    TagName: "SiteComponents",
    Title1: "Lorem ipsum dolor sit amet 1",
    Title2: "Lorem ipsum dolor sit amet 2",
    Title3: "Lorem ipsum dolor sit amet 3",
    PrelemContentType: ["Select"],
    ImageCompound: {
      ImageCompound_1: {
        original_image: {
          original_image_relative_path: "machine_assets/1690469744505/public/png/3Slot1_Image1",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "ThreeSlotOne",
            Name: "ThreeSlotOne",
            Title: "ThreeSlotOne",
            Description: "This is for ThreeSlotOne",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "landscape",
            folder_path: "machine_assets/1690469744505/public/png/3Slot1_Image1-landscape",
          },
          {
            aspect_ratio: "portrait",
            folder_path: "machine_assets/1690469744505/public/png/3Slot1_Image1-portrait",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1690469744505/public/png/3Slot1_Image1-card1",
          },
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1690469744505/public/png/3Slot1_Image1-square",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1690469744505/public/png/3Slot1_Image1-hero",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1690469744505/public/png/3Slot1_Image1-card2",
          },
        ],
      },
      ImageCompound_2: {
        original_image: {
          original_image_relative_path: "machine_assets/1690469771891/public/png/3Slot1_Image2",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "ThreeSlotOne",
            Name: "ThreeSlotOne",
            Title: "ThreeSlotOne",
            Description: "This is for ThreeSlotOne",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "landscape",
            folder_path: "machine_assets/1690469771891/public/png/3Slot1_Image2-landscape",
          },
          {
            aspect_ratio: "portrait",
            folder_path: "machine_assets/1690469771891/public/png/3Slot1_Image2-portrait",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1690469771891/public/png/3Slot1_Image2-hero",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1690469771891/public/png/3Slot1_Image2-card1",
          },
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1690469771891/public/png/3Slot1_Image2-square",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1690469771891/public/png/3Slot1_Image2-card2",
          },
        ],
      },
      ImageCompound_3: {
        original_image: {
          original_image_relative_path: "machine_assets/1690469795885/public/png/3Slot1_Image3",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "ThreeSlotOne",
            Name: "ThreeSlotOne",
            Title: "ThreeSlotOne",
            Description: "This is for ThreeSlotOne",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "portrait",
            folder_path: "machine_assets/1690469795885/public/png/3Slot1_Image3-portrait",
          },
          {
            aspect_ratio: "landscape",
            folder_path: "machine_assets/1690469795885/public/png/3Slot1_Image3-landscape",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1690469795885/public/png/3Slot1_Image3-card1",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1690469795885/public/png/3Slot1_Image3-hero",
          },
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1690469795885/public/png/3Slot1_Image3-square",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1690469795885/public/png/3Slot1_Image3-card2",
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
