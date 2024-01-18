import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import ImageRender from "../../components/ImageRender";
import "../../Style.css";
import TwoColumnLayout from "../../components/layouts/TwoColumns/TwoColumnLayout";
import { formCroppedUrl } from "@platformx/utilities";
import { useCustomStyle } from "./ArticleDetail.style";
import prelemTypes from "../../globalStyle";
import { usePrelemImpression } from "../../components/ImpressionHooks/PrelemImpressionHook";

const ArticleDetail = ({
  content,
  analytics,
  authoringHelper,
  secondaryArgs,
}: ArticleDetailProps) => {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const firstRender = useRef(true);
  const { original_image_relative_path, ext }: any =
    content?.ImageCompound?.ImageCompound_1?.original_image || {};
  const imgUrl = formCroppedUrl(
    secondaryArgs?.gcpUrl,
    secondaryArgs?.bucketName,
    original_image_relative_path,
    ext,
  );

  const defaultStructureData = () => {
    let articleDetailStructureData;
    try {
      articleDetailStructureData = {
        "@context": "https://schema.org/",
        "@type": "Product",
        name: content?.Title,
        image: imgUrl,
        description: content?.Description,
      };
    } catch (e) {
      articleDetailStructureData = {};
    }

    return articleDetailStructureData;
  };

  const generateStructureData = () => {
    let articleDetailStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        articleDetailStructureData = JSON.parse(tempSD);
      } else {
        articleDetailStructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      articleDetailStructureData = defaultStructureData();
    }
    return articleDetailStructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content?.Description, imgUrl, content?.Title]);

  usePrelemImpression(analytics, inView, secondaryArgs);

  /* AnalyticsEnabled dependency added as many times we are not getting analytics provider*async call)
  1. we are first checking in publish app if analytics provider is avaiable or not
  2. if its available we are setting AnalyticsEnabled to true
  3. if its not available we are setting false
  */
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  const gridVal = {
    md: [12, 12],
    em: [6, 6],
    lg: [6, 6],
  };
  const firstColumnContent = () => {
    return (
      <Box className='contentWrapper'>
        <Typography variant='h2semibold' id='Title'>
          {content?.Title}
        </Typography>
        <Typography variant='h3regular' className='subTitle' id='SubTitle'>
          {content?.SubTitle}
        </Typography>
        <Typography variant='p3regular' id='Description'>
          {content?.Description}
        </Typography>
      </Box>
    );
  };
  const secondColumnContent = () => {
    return (
      // <Box className="wrapperImg">
      //   <img alt="ArticleDetail" src={imgUrl} width="630" height="500" />
      // </Box>
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
    );
  };
  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.articleDetailsWrapper} ${globalClasses.prelemType1} prelem prelemType1 articleDetails articleDetailsBg`}>
      <Container
        className={
          authoringHelper?.isEditPage ? `grid_full_width prelem-py` : `grid_container prelem-py`
        }
        ref={ref}>
        <TwoColumnLayout
          firstColumnContent={firstColumnContent()}
          secondColumnContent={secondColumnContent()}
          gridVal={gridVal}
          customClassName='articleDetailsInnerWrapper'
          noGap={true}
        />
      </Container>
    </div>
  );
};

interface ArticleDetailProps {
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
  SubTitle?: string;
  Description?: string;

  TagName?: string;
  ImageCompound: {
    ImageCompound_1: ImageCompound;
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

ArticleDetail.defaultProps = {
  content: {
    Title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    SubTitle: "Uploaded on 8th Nov, 2021",

    Description:
      "Nullam sem ex, gravida quis dui et, pretium luctus tellus. Donec enim justo, vestibulum non augue nec, volutpat suscipit augue. Proin sit amet mi in odio efficitur fringilla. Quisque dictum odio ligula, vitae laoreet turpis sollicitudin at.",

    TagName: "SiteComponents",
    ImageCompound: {
      ImageCompound_1: {
        original_image: {
          original_image_relative_path: "machine_assets/1690001744940/public/png/ProductDetails",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "Imagecard2",
            Name: "Imagecard2",
            Title: "Imagecard2",
            Description: "This is for Imagecard2",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "portrait",
            folder_path: "machine_assets/1690001744940/public/png/ProductDetails-portrait",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1690001744940/public/png/ProductDetails-hero",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1690001744940/public/png/ProductDetails-card1",
          },
          {
            aspect_ratio: "landscape",
            folder_path: "machine_assets/1690001744940/public/png/ProductDetails-landscape",
          },
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1690001744940/public/png/ProductDetails-square",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1690001744940/public/png/ProductDetails-card2",
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
    pageTitle: "Article Detail",
    pageDesc: "Prelem Description",
    pageTags: "Page Tags1, page tagg2",
    prelemTags: "Prelem Tags1, Prelem tagg2",
  },

  secondaryArgs: {
    //secondaryArgs.prelemBaseEndpoint.buttonBaseUrl
    prelemBaseEndpoint: {
      APIEndPoint: "https://platx-api-dev.fanuep.com/platform-x/",
      buttonBaseUrl: "https://platx-publish-dev.fanuep.com/",
    },
    gcpUrl: "https://storage.googleapis.com",
    bucketName: "cropped_image_public",
  },
};

export default ArticleDetail;
