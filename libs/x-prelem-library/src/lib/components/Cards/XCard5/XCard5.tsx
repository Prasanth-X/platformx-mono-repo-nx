import React from "react";
import { Box, CardMedia, Typography } from "@mui/material";
import { useCustomStyle } from "./XCard5.style";
import { getIcon, onClickCardUrlNavigate } from "../../Utils/helperFns";
import { getImage } from "utils/helperFns";

const XCard5 = ({ content, secondaryArgs }: XCard5Props) => {
  const classes = useCustomStyle();

  const onClickCard = (e: any, id: string) => {
    e.preventDefault && e.preventDefault();
    if (typeof window !== "undefined") {
      const url = onClickCardUrlNavigate(id, content, secondaryArgs);
      window.open(url);
    }
  };

  const formedUrl = getImage(content, secondaryArgs);
  const { color, imageUrl } = formedUrl;

  return (
    <Box
      className={`${classes.XCard5Wrapper} XCard5Box`}
      onClick={(e) => onClickCard(e, content?.EditorialItemPath)}>
      <Box className='XCard5innderBox'>
        <Box className='imgWrapper'>
          <CardMedia
            component={imageUrl ? "img" : "div"}
            image={imageUrl ? imageUrl : ""}
            alt={imageUrl ? content?.Thumbnail?.AltText : null}
            sx={{ backgroundColor: color ? color : "", height: "100%", width: "100%" }}
          />
          <Box className='mainContentBox'>
            <Box className='contentWrapperCard5Box'>
              <Box className='iconWrapper'>
                <img src={getIcon(content?.ContentType)} alt='' />
              </Box>
              <Box className='titleWrapper'>
                <Typography variant='p1regular' color='textColor'>
                  {content?.Title}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

interface XCard5Props {
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
  Description?: string;
  Title?: string;
  EditorialItemPath: string;
  ImageDescription: string;
  Thumbnail: {
    Description?: string;
    Title?: string;
    AltText: string;
    Attribution: boolean;
    Url: string;
    Name: string;
    ObjectType?: string;
    Color?: string;
    ext?: string;
  };
  ContentType: string;
  PublishedBy: string;
  PublishedDate: string;
  background_content: any;
}

XCard5.defaultProps = {
  content: {
    title: "New Rule Announced",
    publishDate: "Sept 6, 2023, 13:14 GST",
    Button1_Name: "View",
    Button1_RedirectURL: "www.google.com", // relative page url | link url
    Button1_RestEndPonit: "RestEndPoint 1", // ?
    Button1_Action: "External", // Page |  Link
    Button1_Type: "Button1_Type", // current window | new window
    Button1_Value: "View",
    ImageCompound: {
      ImageCompound_1: {
        original_image: {
          original_image_relative_path: "machine_assets/1690001203561/public/png/Aboutus",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "XCard4",
            Name: "XCard4",
            Title: "XCard4",
            Description: "This is for XCard4",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "portrait",
            folder_path: "machine_assets/1690001203561/public/png/Aboutus-portrait",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1690001203561/public/png/Aboutus-hero",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1690001203561/public/png/Aboutus-card1",
          },
          {
            aspect_ratio: "landscape",
            folder_path: "machine_assets/1690001203561/public/png/Aboutus-landscape",
          },
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1690001203561/public/png/Aboutus-square",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1690001203561/public/png/Aboutus-card2",
          },
        ],
      },
    },
    PrelemContentType: ["Select"],
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
    pageTitle: "XCard5",
    pageDesc:
      "The Prelem ‘XCard5 2’ can be used to give an introduction to your website. It has an image, title, description & CTA which can be used to add the required information.",
    pageTags: "XCard5, Service Box, Features, Products",
    prelemTags: "XCard5, Service Box, Features, Products",
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
export default XCard5;
