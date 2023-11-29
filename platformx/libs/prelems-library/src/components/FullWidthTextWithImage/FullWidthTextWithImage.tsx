import { Box, Container, Typography } from "@mui/material";
import Slide from "@mui/material/Slide";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import ImageRender from "../../Common/ImageRender";
import "../../Style.css";
import { formCroppedUrl } from "../../utils/helperFns";
import { useCustomStyle } from "./FullWidthTextWithImage.style";
import { prelemTypes } from "../../theme/globalStyle";
import { usePrelemImpression } from "Common/ImpressionHooks/PrelemImpressionHook";

const FullWidthTextWithImage = ({
  content,
  analytics,
  authoringHelper,
  secondaryArgs,
}: FullWidthTextWithImagePros) => {
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  const imageHeight = `
  @media only screen and (min-width: 360px) {
    .height {
      height:215px !important;
    }
  }
  @media only screen and (min-width: 600px) {
    .height {
      height:300px !important;
    }
  }
  @media only screen and (min-width: 750px) {
    .height {
      height:350px !important;
    }
  }
  @media only screen and (min-width: 900px) {
    .height {
      height:450px !important;
    }
  }
  @media only screen and (min-width: 1200px) {
    .height {
      height:550px !important;
    }
  }
  .height {
    object-fit: cover;
  }`;
  const firstRender = useRef(true);
  const { ref, inView } = useInView({
    threshold: 0.1,
  });
  const defaultStructureData = () => {
    let fullWidthTextWithImageStructureData;
    const { original_image_relative_path, ext }: any =
      content?.ImageCompound?.ImageCompound_1?.original_image || {};
    const img = formCroppedUrl(
      secondaryArgs?.gcpUrl,
      secondaryArgs?.bucketName,
      original_image_relative_path,
      ext,
    );

    try {
      fullWidthTextWithImageStructureData = {
        "@context": "http://schema.org/",
        "@type": "ImageObject",
        contentUrl: img,
        description: content?.Description,
        name: content?.Title,
      };
    } catch (e) {
      fullWidthTextWithImageStructureData = {};
    }

    return fullWidthTextWithImageStructureData;
  };
  const generateStructureData = () => {
    let fullWidthTextWithImageStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");
      if (String(tempSD).length > 0) {
        fullWidthTextWithImageStructureData = JSON.parse(tempSD);
      } else {
        fullWidthTextWithImageStructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      fullWidthTextWithImageStructureData = defaultStructureData();
    }
    return fullWidthTextWithImageStructureData;
  };
  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    content?.Description,
    content?.ImageCompound?.ImageCompound_1?.original_image,
    content?.Title,
  ]);

  usePrelemImpression(analytics, inView);

  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.fullWidthTextWithImageWrapper} ${globalClasses.prelemType2} prelem prelemType2 fullwidth-text-with-image fullWidthTextWithImageBg`}>
      <Box ref={ref} className={`prelem-pb boxWrapper`}>
        <style>{imageHeight}</style>
        <Box className='gridcontainer'>
          <Container className={authoringHelper?.isEditPage ? "grid_full_width" : "grid_container"}>
            <Slide direction='right' in={secondaryArgs?.editState ? true : inView} timeout={2000}>
              <Box className='heightPercentage'>
                <Typography variant='h2bold' id='Title' color='secondaryTitle' className='heading'>
                  {content.Title}
                </Typography>
              </Box>
            </Slide>
            <Slide direction='left' in={secondaryArgs?.editState ? true : inView} timeout={2000}>
              <Box className='heightPercentage'>
                <Typography
                  variant='p3regular'
                  id='Description'
                  color='secondaryParagraph'
                  // className="description"
                  className='description'>
                  {content.Description}
                </Typography>
              </Box>
            </Slide>
          </Container>
        </Box>
        <Box className='slideWrapper'>
          <Container className='grid_container'>
            <Slide direction='left' in={secondaryArgs?.editState ? true : inView} timeout={2000}>
              <Box className='imageWrapper'>
                <ImageRender
                  originalImage={content?.ImageCompound?.ImageCompound_1?.original_image}
                  publishedImages={content?.ImageCompound?.ImageCompound_1?.published_images}
                  secondaryArgs={secondaryArgs}
                  imgOrder={{
                    1440: "landscape",
                    1280: "landscape",
                    1024: "card2",
                    768: "landscape",
                    600: "landscape",
                    320: "square",
                  }}
                />
              </Box>
            </Slide>
          </Container>
        </Box>
      </Box>
    </div>
  );
};
interface FullWidthTextWithImagePros {
  content: Content;
  analytics?: Analytics;
  authoringHelper?: AuthoringHelper;
  secondaryArgs: any;
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

  TagName?: string;
  Banner: string;
  ImageCompound: {
    ImageCompound_1: {
      published_images: Image[];
      original_image?: object;
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

FullWidthTextWithImage.defaultProps = {
  content: {
    TagName: "SiteComponents",
    Title: `This brought about a need for technology transformation in their IT landscape`,
    Description: `With the industry moving towards innovation, the customer needed to move out of legacy technologies and keep pace with industry leading technologies to enhance operational efficiencies, control IT costs and improve scalability. This brought about a need for technology transformation in their IT landscape.`,

    Banner: "",
    PrelemContentType: ["Select"],
    ImageCompound: {
      ImageCompound_1: {
        original_image: {
          original_image_relative_path:
            "machine_assets/1689934844153/public/png/WebsiteIntroduction",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "FullWidthTextWithImage",
            Name: "FullWidthTextWithImage",
            Title: "FullWidthTextWithImage",
            Description: "This is for FullWidthTextWithImage",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "portrait",
            folder_path: "machine_assets/1689934844153/public/png/WebsiteIntroduction-portrait",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1689934844153/public/png/WebsiteIntroduction-hero",
          },
          {
            aspect_ratio: "landscape",
            folder_path: "machine_assets/1689934844153/public/png/WebsiteIntroduction-landscape",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1689934844153/public/png/WebsiteIntroduction-card1",
          },
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1689934844153/public/png/WebsiteIntroduction-square",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1689934844153/public/png/WebsiteIntroduction-card2",
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
    isSeoEnabled: false,
    isAuthoring: false,
    isAnalyticsEnabled: true,
    position: 0,
    pageId: 20,
    prelemId: 29,
    pageTitle: "Full Width Text With Image",
    pageDesc:
      "This prelem can be used to house a full width text with image. It can be used anywhere in the website to add an element of beautification to it.",
    pageTags: "Image, Full Width Text With Image",
    prelemTags: "Image, Full Width Text With Image",
  },
  secondaryArgs: {
    gcpUrl: "https://storage.googleapis.com",
    bucketName: "cropped_image_public",
  },
};

export default FullWidthTextWithImage;
