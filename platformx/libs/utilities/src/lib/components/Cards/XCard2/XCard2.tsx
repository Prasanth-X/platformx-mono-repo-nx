/* eslint-disable @typescript-eslint/no-empty-function */
import EastIcon from '@mui/icons-material/East';
import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
// import CourseIcon from "../../../assets/dynamicprelemicons/CourseIcon.png";
import FallbackImage from '../../../assets/fallBackImage.png';
import { dateFormat, handleHtmlTags } from 'lib/utils/helperFns';
import { XButton } from '../../XButton/XButton';
import CardSkeleton from '../CardSkeleton';
import { useCustomStyle } from './XCard2.style';

const XCard2 = ({ content, Icon, onCardClick }: XCard2Props) => {
  const classes = useCustomStyle();
  return (
    <Box className={`${classes.XCard2Wrapper} XCard2Box`}>
      {Object.keys(content)?.length > 0 ? (
        <Box className="XCard2innderBox">
          <Grid container>
            <Grid xs={12} md={6}>
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
                  style={{ objectFit: 'cover', height: '100%' }}
                  width="100%"
                />

                <Box className="iconWrapper">
                  <Box className="imgIconBox">
                    <img src={Icon} alt="" />
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid xs={12} md={6}>
              <Box className="contentBox">
                <Box>
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
                  <Box className="titleWrapper">
                    <Typography variant="h4semibold" className="title">
                      {content.title}
                    </Typography>
                    <Typography
                      variant="p3regular"
                      className="description"
                      sx={{ display: { xs: 'none', md: 'block' } }}
                    >
                      {handleHtmlTags(content.description)}
                    </Typography>
                  </Box>
                </Box>
                <Box className="buttonRapper" onClick={onCardClick}>
                  <XButton endIcon={<EastIcon fontSize="small" />}>
                    {content.button_Name}
                  </XButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <CardSkeleton />
      )}
    </Box>
  );
};

interface XCard2Props {
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
XCard2.defaultProps = {
  content: {
    adminName: 'Peter Parker',
    button_Name: 'Learn more',
    title: 'Customer engagement has never been more accessible and “nuanced”',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. A, dui ipsum non tincidunt nisl.',
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
            AltText: 'XCard2',
            Name: 'XCard2',
            Title: 'XCard2',
            Description: 'This is for XCard2',
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
    pageTitle: 'XCard2',
    pageDesc:
      'The Prelem ‘XCard2 2’ can be used to give an introduction to your website. It has an image, title, description & CTA which can be used to add the required information.',
    pageTags: 'XCard2, Service Box, Features, Products',
    prelemTags: 'XCard2, Service Box, Features, Products',
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
export default XCard2;
