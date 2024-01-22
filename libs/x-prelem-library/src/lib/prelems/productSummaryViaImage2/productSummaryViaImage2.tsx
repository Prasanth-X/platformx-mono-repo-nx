import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import ImageRender from "../../components/ImageRender";
import "../../Style.css";
import { completeButtonUrl, formCroppedUrl, RedDots } from "@platformx/utilities";
import BasicButton from "../../components/BasicButton/BasicButton";
import TwoColumnLayout from "../../components/layouts/TwoColumns/TwoColumnLayout";
import { useCustomStyle } from "./ProductSummaryViaImage2.style";
import prelemTypes from "../../globalStyle";
import { usePrelemImpression } from "../../components/ImpressionHooks/PrelemImpressionHook";

const ProductSummaryViaImage2 = ({
  content,
  analytics,
  authoringHelper,
  secondaryArgs,
}: ProductSummaryViaImage2Prop) => {
  const ButtonObj2 = {
    Button_Name: "Button2_Name",
    Button_RedirectURL: "Button2_RedirectURL",
    Button_Type: "Button2_Type",
    Button_Value: "Button2_Value",
    Button_Action: "Button2_Action",
    Button_Content: "Button2_Content",
  };
  const ButtonDataObj2 = {
    Button_Name: content.Button2_Name,
    Button_RedirectURL: content.Button2_RedirectURL,
    Button_Type: content.Button2_Type,
    Button_Value: content.Button2_Value,
    Button_Action: content.Button2_Action,
    Button_Content: content?.Button1_Content,
  };

  const firstRender = useRef(true);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const defaultStructureData = () => {
    let ProductSummaryViaImage2StructureData;
    const { original_image_relative_path, ext }: any =
      content?.ImageCompound?.ImageCompound_1?.original_image || {};
    const img = formCroppedUrl(
      secondaryArgs?.gcpUrl,
      secondaryArgs?.bucketName,
      original_image_relative_path,
      ext,
    );

    try {
      ProductSummaryViaImage2StructureData = {
        "@context": "http://schema.org/",
        "@type": "ItemList",
        name: content?.Title,
        description: content?.Description,
        image: img,
        itemListElement: [
          {
            "@type": "Product",
            url: completeButtonUrl(
              content?.Button2_Action,
              content?.Button2_RedirectURL,
              secondaryArgs.prelemBaseEndpoint.buttonBaseUrl,
            ),
            name: content?.Button2_Value,
          },
        ],
      };
    } catch (e) {
      ProductSummaryViaImage2StructureData = {};
    }
    return ProductSummaryViaImage2StructureData;
  };
  const generateStructureData = () => {
    let ProductSummaryViaImage2StructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        ProductSummaryViaImage2StructureData = JSON.parse(tempSD);
      } else {
        ProductSummaryViaImage2StructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      ProductSummaryViaImage2StructureData = defaultStructureData();
    }
    return ProductSummaryViaImage2StructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    content?.Title,
    content?.Description,
    content?.ImageCompound,
    content?.Button1_Action,
    content?.Button1_Value,
    content?.Button1_Name,
    content?.Button1_RedirectURL,
    content?.Button2_Action,
    content?.Button2_Value,
    content?.Button2_Name,
    content?.Button2_RedirectURL,
  ]);

  usePrelemImpression(analytics, inView, secondaryArgs);
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  const gridVal = {
    md: [12, 12],
    em: [6, 6],
    lg: [6, 6],
  };
  const firstColumnContent = () => {
    return (
      <Box className='backImgWrapper widthheight100'>
        <ImageRender
          originalImage={content?.ImageCompound?.ImageCompound_1?.original_image}
          publishedImages={content?.ImageCompound?.ImageCompound_1?.published_images}
          secondaryArgs={secondaryArgs}
          imgOrder={{
            1440: "card2",
            1280: "landscape",
            1024: "card2",
            768: "square",
            600: "square",
            320: "square",
          }}
        />
        <Box className='dottedImageWrapper'>
          <img alt='summary5' src={RedDots} width='140' height='63' />
        </Box>
      </Box>
    );
  };
  const secondColumnContent = () => {
    return (
      <Box>
        <Typography variant='h2semibold' id='Title'>
          {content.Title}
        </Typography>
        <Typography variant='h4semibold' id='Subtitle'>
          {content.Subtitle}
        </Typography>
        <Typography variant='p3regular' id='Description'>
          {content.Description}
        </Typography>
        <BasicButton
          openButtonEditWindow={authoringHelper?.openButtonEditWindowInAuthoringCB}
          isAuthoring={analytics?.isAuthoring}
          currentBtnEditing={authoringHelper?.selectedButtonNameForEditing}
          variant='primaryButton1'
          analyticsEnabled={analytics?.isAnalyticsEnabled}
          ButtonObj={ButtonObj2}
          isEditing={authoringHelper?.isEditing}
          buttonDataObj={ButtonDataObj2}
          secondaryArgs={secondaryArgs}
          analytics={analytics}
        />
      </Box>
    );
  };
  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.productSummaryViaImage2Wrapper} ${globalClasses.prelemType1} prelem prelemType1 productSummaryViaImage2 productSummaryViaImage2Bg`}>
      <Container
        className={
          authoringHelper?.isEditPage ? "grid_full_width prelem-py" : "grid_container prelem-py"
        }
        ref={ref}>
        <TwoColumnLayout
          firstColumnContent={firstColumnContent()}
          secondColumnContent={secondColumnContent()}
          gridVal={gridVal}
          customClassName='aboutUs2'
          noGap={true}
        />
      </Container>
    </div>
  );
};

interface ProductSummaryViaImage2Prop {
  content: Content;
  analytics?: any;
  authoringHelper?: AuthoringHelper;
  secondaryArgs?: any;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  Subtitle?: string;
  Description?: string;

  Button1_Action?: string;
  Button1_Content?: string;
  Button1_Name?: string;
  Button1_RedirectURL?: string;
  Button1_RestEndPonit?: string;
  Button1_Type?: string;
  Button1_Value?: string;

  Button2_Action?: string;
  Button2_Content?: string;
  Button2_Name?: string;
  Button2_RedirectURL?: string;
  Button2_RestEndPonit?: string;
  Button2_Type?: string;
  Button2_Value?: string;

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
ProductSummaryViaImage2.defaultProps = {
  content: {
    Button1_Action: "External",
    Button1_Name: "Digital Product",
    Button1_RedirectURL: "https://www.google.com/",
    Button1_RestEndPonit: "RestEndPoint 1",
    Button1_Type: "Button1_Type",
    Button1_Value: "Lorem ipsum",

    Button2_Action: "External",
    Button2_Name: "Security",
    Button2_RedirectURL: "https://www.google.com/",
    Button2_RestEndPonit: "RestEndPoint 2",
    Button2_Type: "Button2_Type",
    Button2_Value: "Lorem ipsum",

    TagName: "SiteComponents",
    Title: "Lorem ipsum dolor sit",
    Subtitle: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur",
    Description:
      "Nullam sem ex, gravida quis dui et, pretium luctus tellus. Donec enim justo, vestibulum non augue nec, volutpat suscipit augue. Proin sit amet mi in odio efficitur fringilla. Quisque dictum odio ligula, vitae laoreet turpis sollicitudin at.",

    PrelemContentType: ["Select"],
    ImageCompound: {
      ImageCompound_1: {
        original_image: {
          original_image_relative_path:
            "machine_assets/1690193077597/public/png/ProductSummarViaImage2",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "ProductSummaryViaImageTwo",
            Name: "ProductSummaryViaImageTwo",
            Title: "ProductSummaryViaImageTwo",
            Description: "This is for ProductSummaryViaImageTwo",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "portrait",
            folder_path: "machine_assets/1690193077597/public/png/ProductSummarViaImage2-portrait",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1690193077597/public/png/ProductSummarViaImage2-hero",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1690193077597/public/png/ProductSummarViaImage2-card1",
          },
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1690193077597/public/png/ProductSummarViaImage2-square",
          },
          {
            aspect_ratio: "landscape",
            folder_path: "machine_assets/1690193077597/public/png/ProductSummarViaImage2-landscape",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1690193077597/public/png/ProductSummarViaImage2-card2",
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
    pageId: 17,
    prelemId: 17,
    pageTitle: "Product Summary Via Image 2",
    pageDesc:
      "This prelem can be used to display a product via image & provide some description about it. ",
    pageTags: "Page Tags1, page tagg2",
    prelemTags: "CTA, Product Summary, Image, Product Description, Gallery",
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

export default ProductSummaryViaImage2;
