/* eslint-disable @typescript-eslint/no-empty-function */
import { Box, Typography } from '@mui/material';
import React from 'react';
import FallbackImage from '../../../assets/fallBackImage.png';
import CardSkeleton from '../CardSkeleton';
import { useCustomStyle } from './XCard1.style';
import { dateFormat, handleHtmlTags } from 'lib/utils/helperFns';

const XCard1 = ({ content, Icon, onCardClick }: XCard1Props) => {
  const classes = useCustomStyle();
  return (
    <Box className={`${classes.XCard1Wrapper} XCard1Box`}>
      {Object.keys(content)?.length > 0 ? (
        <Box className="XCard1innderBox" onClick={onCardClick}>
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
            <Box className="iconWrapper">
              <Box className="imgIconBox">
                <img src={Icon} alt="" />
              </Box>
            </Box>
          </Box>
          <Box className="contentBox">
            <Box className="titleWrapper">
              <Typography variant="h4semibold" className="title">
                {content.title}
              </Typography>
              <Typography variant="p3regular" className="description">
                {handleHtmlTags(content.description)}
              </Typography>
            </Box>
            <Box className="topWrapper">
              <Box className="nameWrapper">
                <Typography variant="p4medium" className="publish">
                  {content.adminName}
                </Typography>
              </Box>
              <Box className="dateWrapper">
                <Typography variant="p4medium" className="publish">
                  {dateFormat(content.publishDate)}
                </Typography>
              </Box>
            </Box>
            {/* <Box className="buttonRapper" onClick={onCardClick}>
              <XButton variant="textButton" endIcon={<EastIcon />}>
                {content.button_Name}
              </XButton>
            </Box> */}
          </Box>
        </Box>
      ) : (
        <CardSkeleton />
      )}
    </Box>
  );
};

interface XCard1Props {
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
XCard1.defaultProps = {
  content: {
    adminName: 'Peter Parker',
    button_Name: 'Learn more',
    title: 'Customer engagement has never been more accessible and “nuanced”',
    description:
      'Customer engagement has never been more accessible and “nuanced” Customer engagement has never been more accessible and “nuanced”',
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
            AltText: 'XCard1',
            Name: 'XCard1',
            Title: 'XCard1',
            Description: 'This is for XCard1',
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
    pageTitle: 'XCard1',
    pageDesc:
      'The Prelem ‘XCard1 2’ can be used to give an introduction to your website. It has an image, title, description & CTA which can be used to add the required information.',
    pageTags: 'XCard1, Service Box, Features, Products',
    prelemTags: 'XCard1, Service Box, Features, Products',
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
export default XCard1;
