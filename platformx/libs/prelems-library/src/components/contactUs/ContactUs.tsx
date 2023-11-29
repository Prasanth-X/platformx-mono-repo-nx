import { Box, Container, Typography } from "@mui/material";
import DOMPurify from "isomorphic-dompurify";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import CommonDraftDescription from "../../Common/CommonDraftDescription/CommonDraftDescription";
import ImageRender from "../../Common/ImageRender";
import "../../Style.css";
import TwoColumnLayout from "../../layouts/TwoColumns/TwoColumnLayout";
import {
  formCroppedUrl,
  handleHtmlTags,
  nullToObject,
  nullToString,
  structureDataUrlPoint,
} from "../../utils/helperFns";
import BasicButton from "../BasicButton/BasicButton";
import { useCustomStyle } from "./ContactUs.style";
import { prelemTypes } from "../../theme/globalStyle";
import { usePrelemImpression } from "Common/ImpressionHooks/PrelemImpressionHook";

// ts-ignore
const ContactUs = ({
  content,
  analytics,
  authoringHelper,
  secondaryArgs,
}: //secondaryArgs,
ContactUsProp) => {
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  const { editState = false } = nullToObject(secondaryArgs);
  const { Description = "" } = nullToObject(content);
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
  const [textHtml, setTextHtml] = useState("");

  const firstRender = useRef(true);

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  /**
   * description html passing from child component
   * @param textHtmlData string
   */
  const passingToHtml = (textHtmlData = "") => {
    setTextHtml(textHtmlData);
  };

  const defaultStructureData = () => {
    let contactUsStructureData;
    const { original_image_relative_path, ext }: any =
      content?.ImageCompound?.ImageCompound_1?.original_image || {};
    const img = formCroppedUrl(
      secondaryArgs?.gcpUrl,
      secondaryArgs?.bucketName,
      original_image_relative_path,
      ext,
    );

    try {
      contactUsStructureData = {
        "@context": "http://schema.org/",
        "@type": "ContactPage",
        description: handleHtmlTags(content?.Description),
        image: img,
        name: content?.Title,
        url: structureDataUrlPoint(
          {
            Button_Action: content?.Button1_Action,
            Button_RedirectURL: content?.Button1_RedirectURL,
            Button_Content: content.Button1_Content,
          },
          secondaryArgs,
        ), // to be changed, modified during stablization
      };
    } catch (e) {
      contactUsStructureData = {};
    }

    return contactUsStructureData;
  };

  const generateStructureData = () => {
    let contactUsStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current === true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        contactUsStructureData = JSON.parse(tempSD);
      } else {
        contactUsStructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      contactUsStructureData = defaultStructureData();
    }
    return contactUsStructureData;
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
    content?.Description,
    content?.ImageCompound?.ImageCompound_1?.original_image,
    content?.Title,
    content?.Button1_RedirectURL,
  ]);

  usePrelemImpression(analytics, inView);

  useEffect(() => {
    setTextHtml(nullToString(Description));
  }, [Description]);

  /* AnalyticsEnabled dependency added as many times we are not getting analytics provider*async call)
  1. we are first checking in publish app if analytics provider is avaiable or not
  2. if its available we are setting AnalyticsEnabled to true
  3. if its not available we are setting false
*/
  const firstColumnContent = () => {
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
  const secondColumnContent = () => {
    return (
      <Box>
        <Typography variant='h2semibold' id={"Title"}>
          {content.Title}
        </Typography>
        <Typography variant='h4regular' id='SubTitle'>
          {content.SubTitle}
        </Typography>
        {editState ? (
          <CommonDraftDescription
            description={content.Description || ""}
            editState={editState}
            passingToHtml={passingToHtml}
          />
        ) : null}

        <Typography
          variant='p3regular'
          id={"Description"}
          sx={{
            display: editState ? "none !important" : "block",
          }}
          data-Description-value={textHtml || nullToString(Description)} //this is mandatory don't remove
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(textHtml || nullToString(Description)),
          }}></Typography>

        <BasicButton
          openButtonEditWindow={authoringHelper?.openButtonEditWindowInAuthoringCB}
          isAuthoring={analytics?.isAuthoring}
          currentBtnEditing={authoringHelper?.selectedButtonNameForEditing}
          //buttonRef={authoringHelper.buttonRef}
          //buttonContentEditable={authoringHelper.buttonContentEditable}
          variant='primaryButton1'
          analyticsEnabled={analytics?.isAnalyticsEnabled}
          ButtonObj={ButtonObj}
          isEditing={authoringHelper?.isEditing}
          buttonDataObj={ButtonDataObj}
          secondaryArgs={secondaryArgs}
          analytics={analytics}
        />
      </Box>
    );
  };
  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.contactUsWrapper} ${globalClasses.prelemType1} prelem prelemType1 contact-us contactUsBg`}>
      <Container
        className={
          authoringHelper?.isEditPage ? "grid_full_width prelem-py" : "grid_container prelem-py"
        }
        ref={ref}>
        <Box className='contactUs'>
          <TwoColumnLayout
            firstColumnContent={firstColumnContent()}
            secondColumnContent={secondColumnContent()}
            customClassName='contactus'
            col1Align='center'
            col2Align='center'
          />
        </Box>
      </Container>
    </div>
  );
};

interface ContactUsProp {
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

ContactUs.defaultProps = {
  content: {
    Button1_Action: "External",
    Button1_Content:
      '{"pagination":{"start":0,"rows":10},"searchTerm":"","tags":[],"filter":"ContactUs","isSuggestive":false,"contactUs":{"filter":[]}}',
    Button1_Name: "Lorem Ipsum",
    Button1_RedirectURL: "https://www.google.com",
    Button1_RestEndPoint: "",
    Button1_Type: "current window",
    Button1_Value: "Lorem Ipsum",
    Description:
      "Nullam sem ex, gravida quis dui et, pretium luctus tellus. Donec enim justo, vestibulum non augue nec, volutpat suscipit augue. Proin sit amet mi in odio efficitur fringilla. Quisque dictum odio ligula, vitae laoreet turpis sollicitudin at.",

    SubTitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    TagName: "SiteComponents",
    Title: "Lorem ipsum",
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

export default ContactUs;
