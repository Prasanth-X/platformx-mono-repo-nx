/* eslint-disable @typescript-eslint/no-empty-function */
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useCustomStyle } from './XCard4.style';
import {
  formAbsoluteUrl,
  getIcon,
  onClickCardUrlNavigate,
} from '../../Utils/helperFns';
// import { t } from "i18next";
// import "../../../service/i18n";
import { dateTimeFormat } from 'lib/utils/helperFns';
import fallBackImage from '../../../assets/fallBackImage.png';

const XCard4 = ({
  content,
  secondaryArgs,
}: // authoringHelper,
// analytics,
XCard4Props) => {
  const classes = useCustomStyle();

  const onClickCard = (e: any, id: string) => {
    e.preventDefault && e.preventDefault();
    if (typeof window !== 'undefined') {
      const url = onClickCardUrlNavigate(id, content, secondaryArgs);
      window.open(url);
    }
  };

  return (
    <Box className={`${classes.XCard4Wrapper} XCard4Box`}>
      <Box className="XCard4innderBox">
        <Box className="imgWrapper">
          <Box className="IconTopRight">
            <img src={getIcon(content?.ContentType)} alt="" />
          </Box>
          <img
            alt="Thumbnail"
            src={formAbsoluteUrl(
              secondaryArgs.gcpUrl,
              secondaryArgs.bucketName,
              content?.Thumbnail?.Url,
              content.Thumbnail?.ext,
              content?.ContentType
            )}
            onError={(e: any) => {
              if (e.target.src !== fallBackImage) {
                e.target.onerror = null;
                e.target.src = fallBackImage;
              }
            }}
            height="100%"
            width="100%"
          />
          <Box className="mainContentBox">
            <Box className="InnerWrapper">
              <Box className="contentWrapperBox">
                <Typography variant="h4bold">{content?.Title}</Typography>
                <Box className="dateWrapper">
                  <Box className="iconWrapper">
                    <AccessTimeIcon className="accessTime" />
                  </Box>
                  <Typography variant="p4medium" className="publishTime">
                    {dateTimeFormat(content?.PublishedDate)}
                  </Typography>
                </Box>
              </Box>
              <Box className="ButtonWrapper">
                <Button
                  variant="primaryButton2"
                  onClick={(e) => onClickCard(e, content?.EditorialItemPath)}
                >
                  View
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

interface XCard4Props {
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
  sendDefaultStructureDataForResetToAuthoringCB: (
    structureData: string
  ) => void;
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
// interface Image {
//   aspect_ratio: string;
//   bucket_path: string;
//   folder_path: string;
//   visibility: string;
//   ext: string;
// }
XCard4.defaultProps = {
  content: {
    title: 'New Rule Announced',
    publishDate: 'Sept 6, 2023, 13:14 GST',
    Button1_Name: 'View',
    Button1_RedirectURL: 'www.google.com', // relative page url | link url
    Button1_RestEndPonit: 'RestEndPoint 1', // ?
    Button1_Action: 'External', // Page |  Link
    Button1_Type: 'Button1_Type', // current window | new window
    Button1_Value: 'View',
    ImageCompound: {
      ImageCompound_1: {
        original_image: {
          original_image_relative_path:
            'machine_assets/1690001203561/public/png/Aboutus',
          visibility: 'public',
          ext: 'png',
          bitStreamId: '',
          auto: true,
          MetaFields: {
            AltText: 'XCard4',
            Name: 'XCard4',
            Title: 'XCard4',
            Description: 'This is for XCard4',
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: 'portrait',
            folder_path:
              'machine_assets/1690001203561/public/png/Aboutus-portrait',
          },
          {
            aspect_ratio: 'hero',
            folder_path: 'machine_assets/1690001203561/public/png/Aboutus-hero',
          },
          {
            aspect_ratio: 'card1',
            folder_path:
              'machine_assets/1690001203561/public/png/Aboutus-card1',
          },
          {
            aspect_ratio: 'landscape',
            folder_path:
              'machine_assets/1690001203561/public/png/Aboutus-landscape',
          },
          {
            aspect_ratio: 'square',
            folder_path:
              'machine_assets/1690001203561/public/png/Aboutus-square',
          },
          {
            aspect_ratio: 'card2',
            folder_path:
              'machine_assets/1690001203561/public/png/Aboutus-card2',
          },
        ],
      },
    },
    PrelemContentType: ['Select'],
  },
  authoringHelper: {
    innerRef: null,
    sendStructureDataToAuthoringCB: () => {},
    sendDefaultStructureDataForResetToAuthoringCB: () => {},
    openButtonEditWindowInAuthoringCB: () => {},
    selectedButtonNameForEditing: '',
    isEditing: false,
    buttonRef: null,
    buttonContentEditable: false,
    lastSavedStructuredData: '',
    isEditPage: false,
  },
  analytics: {
    isAnalyticsEnabled: true,
    isSeoEnabled: false,
    isAuthoring: false,
    position: 0,
    pageId: 12345,
    prelemId: 23456,
    pageTitle: 'XCard4',
    pageDesc:
      'The Prelem ‘XCard4 2’ can be used to give an introduction to your website. It has an image, title, description & CTA which can be used to add the required information.',
    pageTags: 'XCard4, Service Box, Features, Products',
    prelemTags: 'XCard4, Service Box, Features, Products',
  },
  secondaryArgs: {
    prelemBaseEndpoint: {
      APIEndPoint: 'https://platx-api-dev.fanuep.com/platform-x/',
      device: 'window',
      buttonBaseUrl: 'https://platx-publish-dev.fanuep.com/',
    },
    editState: false,
    multiSlot: {},
    gcpUrl: 'https://storage.googleapis.com',
    bucketName: 'cropped_image_public',
  },
};
export default XCard4;
