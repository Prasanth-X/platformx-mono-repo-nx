/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import DOMPurify from "isomorphic-dompurify";
import CommonDraftDescription from "../../components/CommonDraftDescription/CommonDraftDescription";
import ImageRender from "../../components/ImageRender";
import "../../Style.css";
import TwoColumnLayout from "../../components/layouts/TwoColumns/TwoColumnLayout";
import { nullToObject, nullToString, RedDots } from "@platformx/utilities";
import { useCustomStyle } from "./Description.style";
import prelemTypes from "../../globalStyle";
import { usePrelemImpression } from "../../components/ImpressionHooks/PrelemImpressionHook";

const Description = ({ content, analytics, authoringHelper, secondaryArgs }: DescriptionProp) => {
  const { editState = false } = nullToObject(secondaryArgs);
  const { DescriptionText: DescriptionData = "" } = nullToObject(content);
  const [textHtml, setTextHtml] = useState("");

  /**
   * description html passing from child component
   * @param textHtmlData string
   */
  const passingToHtml = (textHtmlData = "") => {
    setTextHtml(textHtmlData);
  };

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const generateStructureData = () => {
    const DescriptionStructureData = {};
    return DescriptionStructureData;
  };

  // const getImg = (index: number) => {
  //   const ImageCompound_index = `ImageCompound_${index}`;
  //   const { original_image_relative_path, ext }: any =
  //     (content?.ImageCompound &&
  //       content?.ImageCompound[ImageCompound_index]?.original_image) ||
  //     {};
  //   const img = formCroppedUrl(
  //     secondaryArgs?.gcpUrl,
  //     secondaryArgs?.bucketName,
  //     original_image_relative_path,
  //     ext
  //   );
  //   return img;
  // };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content?.DescriptionText, content?.ImageCompound]);

  usePrelemImpression(analytics, inView, secondaryArgs);

  useEffect(() => {
    setTextHtml(nullToString(DescriptionData));
  }, [DescriptionData]);

  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  const gridVal = {
    md: [12, 12],
    em: [6, 6],
    lg: [6, 6],
  };
  const firstColumnContent = () => {
    return (
      <Box className='rightWrapper'>
        <Box className='imgBoxColorWrapper'>
          <Box className='imgBoxWrapper widthheight100'>
            {/* <img alt="descriptionImage" src={getImg(1)} /> */}
            <ImageRender
              originalImage={content?.ImageCompound?.ImageCompound_1?.original_image}
              publishedImages={content?.ImageCompound?.ImageCompound_1?.published_images}
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
          </Box>
          <Box className='dottedImgFirst'>
            <img alt='descriptionImage1' src={RedDots} width='140' height='63' />
          </Box>
          <Box className='rightBottomImg'>
            {/* <img
              alt="descriptionImage3"
              src={getImg(2)}
              width="130"
              height="110"
            /> */}
            <ImageRender
              originalImage={content?.ImageCompound?.ImageCompound_2?.original_image}
              publishedImages={content?.ImageCompound?.ImageCompound_2?.published_images}
              secondaryArgs={secondaryArgs}
              // width="130px"
              // height="110px"
              imgOrder={{
                1440: "card2",
                1280: "landscape",
                1024: "card2",
                768: "square",
                600: "card2",
                320: "card2",
              }}
            />
          </Box>
        </Box>
      </Box>
    );
  };
  const secondColumnContent = () => {
    return (
      <Box>
        {editState ? (
          <CommonDraftDescription
            description={content.DescriptionText || ""}
            editState={editState}
            passingToHtml={passingToHtml}
          />
        ) : null}

        <Typography
          className='ql-editor'
          variant='p3regular'
          id='DescriptionText'
          sx={{
            display: editState ? "none !important" : "block",
          }}
          data-Description-value={textHtml || nullToString(DescriptionData)} //this is mandatory don't remove
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(textHtml || nullToString(DescriptionData)),
          }}></Typography>
      </Box>
    );
  };
  return (
    <Box
      ref={authoringHelper?.innerRef}
      className={`${classes.descriptionWrapperPrelem} ${globalClasses.prelemType1} prelem prelemType1 descriptionWrapper descriptionBg`}>
      <Container
        className={
          authoringHelper?.isEditPage ? `grid_full_width prelem-py` : `grid_container prelem-py`
        }
        ref={ref}>
        <TwoColumnLayout
          firstColumnContent={firstColumnContent()}
          secondColumnContent={secondColumnContent()}
          gridVal={gridVal}
          customClassName='descriptionWrapperInnerWrapper'
          noGap={true}
        />
      </Container>
    </Box>
  );
};

interface DescriptionProp {
  content: Content;
  analytics?: any; //Analytics;
  authoringHelper?: AuthoringHelper;
  prelemEditState?: boolean;
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
  DescriptionText: string;
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

Description.defaultProps = {
  content: {
    DescriptionText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <br /> <br /> <br />Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ImageCompound: {
      ImageCompound_1: {
        original_image: {
          original_image_relative_path:
            "machine_assets/1690186618629/public/png/WebsiteIntroduction2",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "Description",
            Name: "Description",
            Title: "Description",
            Description: "This is for Description",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1690186618629/public/png/WebsiteIntroduction2-hero",
          },
          {
            aspect_ratio: "portrait",
            folder_path: "machine_assets/1690186618629/public/png/WebsiteIntroduction2-portrait",
          },
          {
            aspect_ratio: "landscape",
            folder_path: "machine_assets/1690186618629/public/png/WebsiteIntroduction2-landscape",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1690186618629/public/png/WebsiteIntroduction2-card1",
          },
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1690186618629/public/png/WebsiteIntroduction2-square",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1690186618629/public/png/WebsiteIntroduction2-card2",
          },
        ],
      },
      ImageCompound_2: {
        original_image: {
          original_image_relative_path: "machine_assets/1690466287817/public/png/ProductDetails",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "Description",
            Name: "Description",
            Title: "Description",
            Description: "This is for Description",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "portrait",
            folder_path: "machine_assets/1690466287817/public/png/ProductDetails-portrait",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1690466287817/public/png/ProductDetails-card1",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1690466287817/public/png/ProductDetails-hero",
          },
          {
            aspect_ratio: "landscape",
            folder_path: "machine_assets/1690466287817/public/png/ProductDetails-landscape",
          },
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1690466287817/public/png/ProductDetails-square",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1690466287817/public/png/ProductDetails-card2",
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
    isEditPage: false,
  },

  analytics: {
    isSeoEnabled: false,
    isAuthoring: false,
    isAnalyticsEnabled: true,
    position: 0,
    pageId: 1234,
    prelemId: 2345,
    pageTitle: "Description",
    pageDesc:
      "This prelem can be used be used to write the description of anything. Since this prelem doesn’t have a heading, it will be used in continuation of another prelem.",
    pageTags: "Page Tags1, page tagg2",
    prelemTags: "Text, Description",
  },
  secondaryArgs: {
    gcpUrl: "https://storage.googleapis.com",
    bucketName: "cropped_image_public",
  },
};

export default Description;
