import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import "../../Style.css";
import { completeButtonUrl, formCroppedUrl } from "../../utils/helperFns";
import BasicButton from "../BasicButton/BasicButton";
import { useCustomStyle } from "./ProductSummary3.style";
import ImageRender from "../../Common/ImageRender";
import { prelemTypes } from "../../theme/globalStyle";
import { usePrelemImpression } from "Common/ImpressionHooks/PrelemImpressionHook";

const ProductSummary3 = ({
  content,
  analytics,
  authoringHelper,
  secondaryArgs,
}: ProductSummary3Props) => {
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  const ButtonObj1 = {
    Button_Name: "Button1_Name",
    Button_RedirectURL: "Button1_RedirectURL",
    Button_Type: "Button1_Type",
    Button_Value: "Button1_Value",
    Button_Action: "Button1_Action",
    Button_Content: "Button1_Content",
  };
  const ButtonDataObj1 = {
    Button_Name: content?.Button1_Name,
    Button_RedirectURL: content?.Button1_RedirectURL,
    Button_Type: content?.Button1_Type,
    Button_Value: content?.Button1_Value,
    Button_Action: content?.Button1_Action,
    Button_Content: content?.Button1_Content,
  };
  const firstRender = useRef(true);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const { original_image_relative_path, ext }: any =
    content?.ImageCompound?.ImageCompound_1?.original_image || {};
  const imgUrl = formCroppedUrl(
    secondaryArgs?.gcpUrl,
    secondaryArgs?.bucketName,
    original_image_relative_path,
    ext,
  );

  const defaultStructureData = () => {
    let ProductSummary3StructureData;
    try {
      ProductSummary3StructureData = {
        "@context": "http://schema.org/",
        "@type": "WebPage",
        name: content?.Title1,
        image: imgUrl,
        description: content?.Description,
        url: completeButtonUrl(
          content?.Button1_Action,
          content?.Button1_RedirectURL,
          secondaryArgs.prelemBaseEndpoint.buttonBaseUrl,
        ),
      };
    } catch (e) {
      ProductSummary3StructureData = {};
    }
    return ProductSummary3StructureData;
  };
  const genrateStructureData = () => {
    let ProductSummary3StructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        ProductSummary3StructureData = JSON.parse(tempSD);
      } else {
        ProductSummary3StructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      ProductSummary3StructureData = defaultStructureData();
    }
    return ProductSummary3StructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = genrateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    content?.Description,
    imgUrl,
    content?.Title1,
    content?.Title2,
    content?.Button1_Value,
    content?.Button1_RedirectURL,
  ]);

  usePrelemImpression(analytics, inView);

  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.productSummary3Wrapper} ${globalClasses.prelemType1} prelem prelemType1 product-summary-3 productSummary3Bg`}>
      <Container
        className={
          authoringHelper?.isEditPage ? "grid_full_width prelem-py" : "grid_container prelem-py"
        }
        ref={ref}>
        <Grid container ref={ref}>
          <Grid md={12} em={8}>
            <Box className='imageWrapper widthheight100'>
              <ImageRender
                originalImage={content?.ImageCompound?.ImageCompound_1?.original_image}
                publishedImages={content?.ImageCompound?.ImageCompound_1?.published_images}
                secondaryArgs={secondaryArgs}
                imgOrder={{
                  1440: "landscape",
                  1280: "landscape",
                  1024: "square",
                  768: "card2",
                  600: "card2",
                  320: "card2",
                }}
              />
              {/* <img
          alt="summary"
          src={imgUrl}
          width="890"
          height="713"
          className="imageProp"
        /> */}
            </Box>
          </Grid>
          <Grid md={12} em={4} className='secondColumnContentWrapper'>
            <Box>
              <Box className='title'>
                <Typography
                  variant='labelbold'
                  className='sublabel'
                  color='tertiaryLabel'
                  id='Title1'>
                  {content.Title1}
                </Typography>
              </Box>
              <Typography variant='h2medium' color='tertiaryTitle' id='Title2'>
                {content.Title2}
              </Typography>
              <Typography variant='p3regular' color='tertiaryParagraph' id='Description'>
                {content.Description}
              </Typography>
              <BasicButton
                openButtonEditWindow={authoringHelper?.openButtonEditWindowInAuthoringCB}
                isAuthoring={analytics?.isAuthoring}
                currentBtnEditing={authoringHelper?.selectedButtonNameForEditing}
                variant='tertiaryButton1'
                analyticsEnabled={analytics?.isAnalyticsEnabled}
                ButtonObj={ButtonObj1}
                isEditing={authoringHelper?.isEditing}
                buttonDataObj={ButtonDataObj1}
                secondaryArgs={secondaryArgs}
                analytics={analytics}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

interface ProductSummary3Props {
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
  Title1?: string;
  Title2?: string;
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

ProductSummary3.defaultProps = {
  content: {
    Button1_Name: "Lorem ipsum",
    Button1_RedirectURL: "www.google.com", // relative page url | link url
    Button1_RestEndPonit: "", // ?
    Button1_Action: "External", // Page |  Link
    Button1_Type: "current window", // current window | new window
    Button1_Value: "Lorem ipsum",
    Title1: "Lorem ipsum dolor sit amet",
    Title2: "Lorem ipsum dolor sit amet",
    Description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",

    TagName: "SiteComponents",
    ImageCompound: {
      ImageCompound_1: {
        original_image: {
          original_image_relative_path:
            "machine_assets/1690448895885/public/png/ProductSummary3_New",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "ProductSummary3",
            Name: "ProductSummary3",
            Title: "ProductSummary3",
            Description: "This is for ProductSummary3",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1690448895885/public/png/ProductSummary3_New-hero",
          },
          {
            aspect_ratio: "portrait",
            folder_path: "machine_assets/1690448895885/public/png/ProductSummary3_New-portrait",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1690448895885/public/png/ProductSummary3_New-card1",
          },
          {
            aspect_ratio: "landscape",
            folder_path: "machine_assets/1690448895885/public/png/ProductSummary3_New-landscape",
          },
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1690448895885/public/png/ProductSummary3_New-square",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1690448895885/public/png/ProductSummary3_New-card2",
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
    pageId: 12345,
    prelemId: 23456,
    pageTitle: "Website Summary With Sub Heading",
    pageDesc:
      "The Prelem ‘Website Summary With Sub Heading’ can be used to give an introduction to your website. It has an image, title, description & CTA which can be used to add the required information.",
    pageTags:
      "Website, Introduction, Website Summary With Sub Heading, Image, CTA, Title, Hero Banner",
    prelemTags:
      "Website, Introduction, Website Summary With Sub Heading, Image, CTA, Title, Hero Banner",
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

export default ProductSummary3;
