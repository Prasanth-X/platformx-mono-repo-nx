/* eslint-disable @typescript-eslint/no-empty-function */
import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import ImageRender from "../../components/ImageRender";
import "../../Style.css";
import TwoColumnLayout from "../../components/layouts/TwoColumns/TwoColumnLayout";
import { completeButtonUrl, formCroppedUrl } from "@platformx/utilities";
import BasicButton from "../../components/BasicButton/BasicButton";
import { useCustomStyle } from "./productSummaryViaImage.style";
import prelemTypes from "../../globalStyle";
import { usePrelemImpression } from "../../components/ImpressionHooks/PrelemImpressionHook";

const ProductSummaryViaImage = ({
  content,
  analytics,
  authoringHelper,
  secondaryArgs,
}: ProductSummaryViaImageProps) => {
  const ButtonObj = {
    Button_Name: "Button1_Name",
    Button_RedirectURL: "Button1_RedirectURL",
    Button_Type: "Button1_Type",
    Button_Value: "Button1_Value",
    Button_Action: "Button1_Action",
    Button_Content: "Button1_Content",
  };
  const ButtonDataObj = {
    Button_Name: content?.Button1_Name,
    Button_RedirectURL: content?.Button1_RedirectURL,
    Button_Type: content?.Button1_Type,
    Button_Value: content?.Button1_Value,
    Button_Action: content?.Button1_Action,
    Button_Content: content?.Button1_Content,
  };
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  const firstRender = useRef(true);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const defaultStructureData = () => {
    let ProductSummaryViaImageStructureData;
    const { original_image_relative_path, ext }: any =
      content?.ImageCompound?.ImageCompound_1?.original_image || {};
    const img = formCroppedUrl(
      secondaryArgs?.gcpUrl,
      secondaryArgs?.bucketName,
      original_image_relative_path,
      ext,
    );

    try {
      ProductSummaryViaImageStructureData = {
        "@context": "http://schema.org/",
        "@type": "Product",
        name: content?.Title,
        image: img,
        description: content?.Description,
        url: completeButtonUrl(
          content?.Button1_Action,
          content?.Button1_RedirectURL,
          secondaryArgs.prelemBaseEndpoint.buttonBaseUrl,
        ),
      };
    } catch (e) {
      ProductSummaryViaImageStructureData = {};
    }
    return ProductSummaryViaImageStructureData;
  };

  const genrateStructureData = () => {
    let ProductSummaryViaImageStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        ProductSummaryViaImageStructureData = JSON.parse(tempSD);
      } else {
        ProductSummaryViaImageStructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      ProductSummaryViaImageStructureData = defaultStructureData();
    }
    return ProductSummaryViaImageStructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = genrateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    content.Description,
    content.ImageCompound?.ImageCompound_1?.original_image,
    content.Title,
    content?.Button1_RedirectURL,
  ]);

  usePrelemImpression(analytics, inView, secondaryArgs);
  const gridVal = {
    md: [12, 12],
    em: [6, 6],
    lg: [6, 6],
  };
  const firstColumnContent = () => {
    return (
      <Box className='wrapperImg widthheight100'>
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
  const secondColumnContent = () => {
    return (
      <Box>
        <Typography variant='h2semibold' id='Title'>
          {content.Title}
        </Typography>
        <Typography variant='p3regular' id='Description'>
          {content.Description}
        </Typography>
        <Box>
          <BasicButton
            openButtonEditWindow={authoringHelper?.openButtonEditWindowInAuthoringCB}
            isAuthoring={analytics?.isAuthoring}
            currentBtnEditing={authoringHelper?.selectedButtonNameForEditing}
            //buttonRef={buttonRef}
            //buttonContentEditable={buttonContentEditable}
            variant='primaryButton1'
            analyticsEnabled={analytics?.isAnalyticsEnabled}
            ButtonObj={ButtonObj}
            isEditing={authoringHelper?.isEditing}
            buttonDataObj={ButtonDataObj}
            secondaryArgs={secondaryArgs}
            analytics={analytics}
          />
        </Box>
      </Box>
    );
  };
  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.productSummaryViaImageWrapper} ${globalClasses.prelemType1} prelem prelemType1 productSummaryViaImage productSummaryViaImageBg`}>
      <Container
        className={
          authoringHelper?.isEditPage ? `grid_full_width prelem-py` : `grid_container prelem-py`
        }
        ref={ref}>
        <TwoColumnLayout
          firstColumnContent={firstColumnContent()}
          secondColumnContent={secondColumnContent()}
          gridVal={gridVal}
          customClassName='productSummaryViaImageInnerWrapper'
          noGap={true}
        />
      </Container>
    </div>
  );
};

interface ProductSummaryViaImageProps {
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
  Description?: string;
  Button1_Action?: string;
  Button1_Content?: string;
  Button1_Name?: string;
  Button1_RedirectURL?: string;
  Button1_RestEndPonit?: string;
  Button1_Type?: string;
  Button1_Value?: string;

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

ProductSummaryViaImage.defaultProps = {
  content: {
    Button1_Name: "LearnMore",
    Button1_RedirectURL: "https://www.google.com/", // relative page url | link url
    Button1_RestEndPonit: "RestEndPoint 1", // ?
    Button1_Action: "External", // Page |  Link

    Button1_Type: "current window", // current window | new window
    Button1_Value: "Lorem ipsum",
    Title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
    Description:
      "Nullam sem ex, gravida quis dui et, pretium luctus tellus. Donec enim justo, vestibulum non augue nec, volutpat suscipit augue.Proin sit amet mi in odio efficitur fringilla.Quisque dictum odio ligula, vitae laoreet turpis sollicitudin at.",

    TagName: "SiteComponents",
    PrelemContentType: ["Select"],
    ImageCompound: {
      ImageCompound_1: {
        original_image: {
          original_image_relative_path:
            "machine_assets/1689938027653/public/png/ProductSummary-ViaImage",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "Imagecard1",
            Name: "Imagecard1",
            Title: "Imagecard1",
            Description: "This is for Imagecard1",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "portrait",
            folder_path: "machine_assets/1689938027653/public/png/ProductSummary-ViaImage-portrait",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1689938027653/public/png/ProductSummary-ViaImage-card1",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1689938027653/public/png/ProductSummary-ViaImage-hero",
          },
          {
            aspect_ratio: "landscape",
            folder_path:
              "machine_assets/1689938027653/public/png/ProductSummary-ViaImage-landscape",
          },
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1689938027653/public/png/ProductSummary-ViaImage-square",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1689938027653/public/png/ProductSummary-ViaImage-card2",
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
    pageTitle: "Product Summary via Image",
    pageDesc: "Prelem Description",
    pageTags: "Product Page, Summary page",
    prelemTags: "Product Summary, Summary, Article Summary, NewsLetter",
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

export default ProductSummaryViaImage;
