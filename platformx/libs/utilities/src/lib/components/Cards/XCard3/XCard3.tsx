/* eslint-disable @typescript-eslint/no-empty-function */
import { Box, Typography } from '@mui/material';
import React from 'react';
import FallbackImage from '../../../assets/fallBackImage.png';
import { dateFormat, handleHtmlTags } from 'lib/utils/helperFns';
import CardSkeleton from '../CardSkeleton';
import { useCustomStyle } from './XCard3.style';

const XCard3 = ({ content, Icon, onCardClick }: XCard3Props) => {
  const classes = useCustomStyle();
  return (
    <Box className={`${classes.XCard3Wrapper} XCard3Box`} onClick={onCardClick}>
      {Object.keys(content)?.length > 0 ? (
        <Box className="XCard3innderBox">
          <Box className="imgWrapper">
            <img
              src={content?.teaser_image || FallbackImage}
              onError={(e: any) => {
                if (e.target.src !== FallbackImage) {
                  e.target.onerror = null;
                  e.target.src = FallbackImage;
                }
              }}
              alt=""
              style={{ objectFit: 'cover' }}
              width="100%"
              height="100%"
            />
            <Box className="mainContentBox">
              <Box className="contentBox">
                <Box className="iconWrapper">
                  <img src={Icon} alt="" />
                </Box>
                <Box className="topWrapper">
                  <Box className="nameWrapper">
                    <Typography variant="p4medium" color="textColor">
                      {content.adminName}
                    </Typography>
                  </Box>
                  <Box className="dateWrapper">
                    <Typography variant="p4medium" color="textColor">
                      {dateFormat(content.publishDate)}
                    </Typography>
                  </Box>
                </Box>
                <Box className="titleWrapper">
                  <Typography variant="h4semibold" color="textColor">
                    {content.title}
                  </Typography>
                  <Typography variant="p3regular" color="textColor">
                    {handleHtmlTags(content.description)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <CardSkeleton />
      )}
    </Box>
  );
};

interface XCard3Props {
  content: Content;
  analytics: Analytics;
  authoringHelper?: AuthoringHelper;
  secondaryArgs?: any;
  Icon?: any;
  onCardClick: () => void;
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
  adminName?: string;
  publishDate: string;
  title?: string;
  description?: string;
  button_Name?: string;
  teaser_image?: string;
  ImageCompound: {
    ImageCompound_1: {
      published_images: Image[];
      original_image: object;
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
XCard3.defaultProps = {
  content: {
    adminName: 'Peter Parker',
    button_Name: 'Learn more',
    title: 'Customer engagement has never been more accessible and “nuanced”',
    publishDate: 'July 7, 2022',
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
            AltText: 'XCard3',
            Name: 'XCard3',
            Title: 'XCard3',
            Description: 'This is for XCard3',
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
    pageTitle: 'XCard3',
    pageDesc:
      'The Prelem ‘XCard3 2’ can be used to give an introduction to your website. It has an image, title, description & CTA which can be used to add the required information.',
    pageTags: 'XCard3, Service Box, Features, Products',
    prelemTags: 'XCard3, Service Box, Features, Products',
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
export default XCard3;
