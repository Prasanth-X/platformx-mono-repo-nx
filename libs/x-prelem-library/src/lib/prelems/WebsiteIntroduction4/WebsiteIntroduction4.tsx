import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import ImageRender from "../../components/ImageRender";
import TwoColumnLayout from "../../components/layouts/TwoColumns/TwoColumnLayout";
import { formCroppedUrl, handleHtmlTags } from "@platformx/utilities";
import prelemTypes from "../../globalStyle";
import "../../Style.css";
import { usePrelemImpression } from "../../components/ImpressionHooks/PrelemImpressionHook";
import { useCustomStyle } from "./WebsiteIntroduction4.style";

// ts-ignore
const WebsiteIntroduction4 = ({
  content,
  analytics,
  authoringHelper,
  secondaryArgs,
}: //secondaryArgs,
WebsiteIntroduction4Prop) => {
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();

  const firstRender = useRef(true);

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const defaultStructureData = () => {
    let WebsiteIntroduction4StructureData;
    const { original_image_relative_path, ext }: any =
      content?.ImageCompound?.ImageCompound_1?.original_image || {};
    const img = formCroppedUrl(
      secondaryArgs?.gcpUrl,
      secondaryArgs?.bucketName,
      original_image_relative_path,
      ext,
    );

    try {
      WebsiteIntroduction4StructureData = {
        "@context": "http://schema.org/",
        "@type": "ContactPage",
        description: handleHtmlTags(content?.description),
        image: img,
        name: content?.title,
      };
    } catch (e) {
      WebsiteIntroduction4StructureData = {};
    }

    return WebsiteIntroduction4StructureData;
  };

  const generateStructureData = () => {
    let WebsiteIntroduction4StructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current === true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        WebsiteIntroduction4StructureData = JSON.parse(tempSD);
      } else {
        WebsiteIntroduction4StructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      WebsiteIntroduction4StructureData = defaultStructureData();
    }
    return WebsiteIntroduction4StructureData;
  };

  useEffect(() => {
    if (navigator) {
      if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator?.userAgent)) {
        // console.log("mobile");
      } else {
        // console.log("not mobile");
      }
    }
  }, []);

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    content?.description,
    content?.ImageCompound?.ImageCompound_1?.original_image,
    content?.title,
  ]);

  usePrelemImpression(analytics, inView, secondaryArgs);

  /* AnalyticsEnabled dependency added as many times we are not getting analytics provider*async call)
  1. we are first checking in publish app if analytics provider is avaiable or not
  2. if its available we are setting AnalyticsEnabled to true
  3. if its not available we are setting false
*/
  const gridVal = {
    md: [12, 12],
    em: [6, 6],
    lg: [6, 6],
  };
  const firstColumnContent = () => {
    return (
      <Box className='rightCol'>
        <Typography variant='h2semibold' id={"title"}>
          {content.title}
        </Typography>
        <Typography variant='p3regular' id='description'>
          {content.description}
        </Typography>
      </Box>
    );
  };
  const secondColumnContent = () => {
    return (
      <Box className='widthheight100'>
        <ImageRender
          originalImage={content?.ImageCompound?.ImageCompound_1?.original_image}
          publishedImages={content?.ImageCompound?.ImageCompound_1?.published_images}
          secondaryArgs={secondaryArgs}
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
    );
  };
  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.WebsiteIntroduction4Wrapper} ${globalClasses.prelemType1} prelem prelemType1 WebsiteIntroduction4Bg`}>
      <Container
        className={
          authoringHelper?.isEditPage ? "grid_full_width prelem-py" : "grid_container prelem-py"
        }
        ref={ref}>
        <Box className='WebsiteIntroduction4'>
          <TwoColumnLayout
            firstColumnContent={firstColumnContent()}
            secondColumnContent={secondColumnContent()}
            customClassName='WebsiteIntroduction4'
            gridVal={gridVal}
            col1Align='center'
            col2Align='center'
            noGap={true}
          />
        </Box>
      </Container>
    </div>
  );
};

interface WebsiteIntroduction4Prop {
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
  title?: string;
  description?: string;

  TagName?: string;
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

WebsiteIntroduction4.defaultProps = {
  content: {
    description:
      "This is also a good place for any issues that arise while coding or testing your application's code in-house! The list includes features like:Adding new items with custom attributes using various widgetsAdd an array tag such as tags A user interface layer allowing users interactively",

    TagName: "SiteComponents",
    title: "Deliver digital experiences like never before",
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
    pageId: 1234,
    prelemId: 2345,
    pageTitle: "Prelem Title",
    pageDesc: "Prelem Description",
    pageTags: "Page Tags1, page tagg2",
    prelemTags: "Prelem Tags1, Prelem tagg2",
  },
  secondaryArgs: {
    gcpUrl: "https://storage.googleapis.com",
    bucketName: "cropped_image_public",
    prelemBaseEndpoint: {
      deliveryEndPoint: "http://platx-delivery-dev.fanuep.com/platform-x/",
      APIEndPoint: "https://platx-api-dev.fanuep.com/platform-x/",
      device: "window",
      buttonBaseUrl: "https://platx-publish-dev.fanuep.com/",
    },
    editState: false,
    multiSlot: {},
  },
};

export default WebsiteIntroduction4;
