import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import "../../Style.css";
import { formCroppedUrl } from "../../utils/helperFns";
import { useCustomStyle } from "./ImageCards.style";
import { prelemTypes } from "../../theme/globalStyle";
import { usePrelemImpression } from "Common/ImpressionHooks/PrelemImpressionHook";

const ImageCards = ({ content, analytics, authoringHelper, secondaryArgs }: ImageCardsProp) => {
  const firstRender = useRef(true);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const getImg = (index: number) => {
    const ImageCompound_index = `ImageCompound_${index}`;
    const { original_image_relative_path, ext }: any =
      (content?.ImageCompound && content?.ImageCompound[ImageCompound_index]?.original_image) || {};
    const img = formCroppedUrl(
      secondaryArgs?.gcpUrl,
      secondaryArgs?.bucketName,
      original_image_relative_path,
      ext,
    );
    return img;
  };

  const defaultStructureData = () => {
    let ImageCardsStructureData;
    try {
      ImageCardsStructureData = {
        "@context": "http://schema.org/",
        "@type": "ItemList",
        name: content?.Title,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@type": "ImageObject",
              contentUrl: getImg(1),
              name: content?.ImageText1,
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@type": "ImageObject",
              contentUrl: getImg(2),
              name: content?.ImageText2,
            },
          },
        ],
      };
    } catch (e) {
      ImageCardsStructureData = {};
    }
    return ImageCardsStructureData;
  };

  const genrateStructureData = () => {
    let ImageCardsStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current === true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        ImageCardsStructureData = JSON.parse(tempSD);
      } else {
        ImageCardsStructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      ImageCardsStructureData = defaultStructureData();
    }
    return ImageCardsStructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = genrateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content?.ImageCompound, content?.Title, content?.ImageText1, content?.ImageText2]);

  usePrelemImpression(analytics, inView);
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.imageCardsWrapper} ${globalClasses.prelemType1} prelem prelemType1 imageCardsWrapperBg`}>
      <Container
        className={
          authoringHelper?.isEditPage
            ? "grid_full_width prelem-py"
            : "grid_container grid_container_nopadding prelem-py"
        }
        ref={ref}>
        <Typography variant='h2semibold' textAlign='center' id='Title'>
          {content?.Title}
        </Typography>
        <Grid container>
          <Grid item xs={12} sm={6} p={1}>
            <Box className='imageContentWrapper'>
              <img alt='ImageCard' src={getImg(1)} width='654' height='460' />
              <Typography variant='p1semibold' id='ImageText1'>
                {content?.ImageText1}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} p={1}>
            <Box className='imageContentWrapper'>
              <img alt='ImageCard' src={getImg(2)} width='654' height='460' />
              <Typography variant='p1semibold' id='ImageText2'>
                {content?.ImageText2}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

interface ImageCardsProp {
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
  //Heading?: string;
  Title?: string;
  ImageText1?: string;
  ImageText2?: string;
  ImageCompound: {
    ImageCompound_1: ImageCompound;
    ImageCompound_2: ImageCompound;
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

ImageCards.defaultProps = {
  content: {
    Title: "Lorum ipsum dolor sit amet",
    ImageText1: "Lorum ipsum dolor sit amet",
    ImageText2: "Lorum ipsum dolor sit amet",
    ImageCompound: {
      ImageCompound_1: {
        original_image: {
          original_image_relative_path:
            "machine_assets/1690282743892/public/png/ExpertiseShowcase2",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "ImageCard",
            Name: "ImageCard",
            Title: "ImageCard",
            Description: "This is for ImageCard",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "portrait",
            folder_path: "machine_assets/1690282743892/public/png/ExpertiseShowcase2-portrait",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1690282743892/public/png/ExpertiseShowcase2-card1",
          },
          {
            aspect_ratio: "landscape",
            folder_path: "machine_assets/1690282743892/public/png/ExpertiseShowcase2-landscape",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1690282743892/public/png/ExpertiseShowcase2-hero",
          },
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1690282743892/public/png/ExpertiseShowcase2-square",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1690282743892/public/png/ExpertiseShowcase2-card2",
          },
        ],
      },
      ImageCompound_2: {
        original_image: {
          original_image_relative_path:
            "machine_assets/1690282794843/public/png/ExpertiseShowcase4",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "ImageCard",
            Name: "ImageCard",
            Title: "ImageCard",
            Description: "This is for ImageCard",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "landscape",
            folder_path: "machine_assets/1690282794843/public/png/ExpertiseShowcase4-landscape",
          },
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1690282794843/public/png/ExpertiseShowcase4-square",
          },
          {
            aspect_ratio: "portrait",
            folder_path: "machine_assets/1690282794843/public/png/ExpertiseShowcase4-portrait",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1690282794843/public/png/ExpertiseShowcase4-hero",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1690282794843/public/png/ExpertiseShowcase4-card1",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1690282794843/public/png/ExpertiseShowcase4-card2",
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
    pageTitle: "Image Cards",
    pageDesc:
      "This Prelem will have two columns with Image and Title and it can be used to display the lifecycle, locations.",
    pageTags: "Image Cards, Locations",
    prelemTags: "Image Cards, Locations",
  },
  secondaryArgs: {
    gcpUrl: "https://storage.googleapis.com",
    bucketName: "cropped_image_public",
  },
};

export default ImageCards;
