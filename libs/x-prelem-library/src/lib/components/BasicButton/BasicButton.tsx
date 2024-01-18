/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { errorRequest } from "../ConstantData";
import ToastService from "../ToastContainer/ToastService";
import {
  nullToObject,
  convertToLowerCase,
  encodeGetParams,
  completeExternalUrl,
  uriToJSON,
  conCatUrlPath,
  eComTypeUriToJSON,
} from "@platformx/utilities";
import usePlatformAnalytics from "../../hooks/usePlatformxAnalytics/index";
import { IMPRESSIONS } from "../ImpressionHooks/constants";
import { createClickImpression, snowplowPrelemClickImpression } from "../ImpressionHooks/helper";
import CustomModalSlider from "../CustomModalSlider/CustomModalSlider";

const BasicButton = (props: BasicButtonProps) => {
  const {
    isEditing,
    isAuthoring,
    openButtonEditWindow = () => {},
    analyticsEnabled,
    ButtonObj,
    currentBtnEditing,
    buttonContentEditable,
    buttonDataObj,
    variant,
    secondaryArgs,
    style,
    endIcon,
    analytics,
  } = props;
  const { t } = useTranslation();
  const [modalStatus, setModalStatus] = useState(false);
  const [sliderData, setSliderData] = useState([]);
  const [contentType, setContentType] = useState("");
  const [handleTrack] = usePlatformAnalytics();
  const buttonClickEvent = async () => {
    const { prelemBaseEndpoint = {} } = nullToObject(secondaryArgs);
    const {
      buttonBaseUrl = "",
      PublishEndPoint = "",
      language = "",
    } = nullToObject(prelemBaseEndpoint);
    const platformEndPoint = buttonBaseUrl ? buttonBaseUrl : PublishEndPoint;

    if (!isAuthoring && analyticsEnabled && analytics) {
      const buttonClickImpressionObj = createClickImpression(
        analytics,
        IMPRESSIONS.Button,
        secondaryArgs,
        buttonDataObj ? buttonDataObj : {},
        {},
      );
      const cardClickSnowplowObj = snowplowPrelemClickImpression(
        analytics,
        IMPRESSIONS.Button,
        secondaryArgs,
        buttonDataObj ? buttonDataObj : {},
        {},
      );
      handleTrack(IMPRESSIONS?.TRACKID, cardClickSnowplowObj);
      handleTrack(IMPRESSIONS?.CLICK_IMPRESSION, buttonClickImpressionObj);
    }

    let deployUrl = "";
    switch (buttonDataObj?.Button_Action) {
      case "Internal":
        if (buttonDataObj?.Button_RedirectURL) {
          deployUrl = platformEndPoint + language + buttonDataObj.Button_RedirectURL;
        }
        break;
      case "External":
        if (buttonDataObj?.Button_RedirectURL) {
          deployUrl = completeExternalUrl(buttonDataObj.Button_RedirectURL);
        }
        break;
      case "Content":
        const contentObjHandle = uriToJSON(buttonDataObj);
        const { ContentType = "", currentPath = "" } = nullToObject(contentObjHandle);
        const isGalleryArray = ["ImageGallery", "VideoGallery", "Gallery"].some(
          (ele) => convertToLowerCase(ele) === convertToLowerCase(ContentType),
        );

        if (ContentType && isGalleryArray) {
          const filterType =
            convertToLowerCase(ContentType) === convertToLowerCase("ImageGallery")
              ? "image"
              : "video";
          try {
            const newObj = {
              path: currentPath,
              contentType: ContentType,
            };
            const url = `${secondaryArgs?.prelemBaseEndpoint?.deliveryEndPoint}api/v1/web/en/delivery/multi-slot-content`;
            const res = await axios.get(`${url}?${encodeGetParams(newObj)}`, {
              headers: {
                sitename: secondaryArgs?.sitename,
              },
            });
            if (res) {
              let gallery = [];
              if (convertToLowerCase(ContentType) !== convertToLowerCase("VideoGallery")) {
                gallery = res?.data?.data?.fetchMultiSlotContent?.Gallery.map((x: any) => x.Image);
              } else {
                gallery = res?.data?.data?.fetchMultiSlotContent?.Gallery.map((x: any) => x.Video);
              }
              setSliderData(gallery);
              setContentType(filterType);
              setModalStatus(true);
            }
          } catch (error: any) {
            // console.log(error, "error");
            setModalStatus(false);
            setContentType("");
            setSliderData([]);
            ToastService.failToast(t(errorRequest));
          }
        }
        break;
      case "Js":
        const functionName = buttonDataObj.Button_RedirectURL || "";
        const { functionList, context, actions } = secondaryArgs;
        const { state, dispatch } = context;
        functionList[functionName]({ state, dispatch, actions });
        break;
      default:
        break;
    }

    if (
      buttonDataObj?.Button_Action === "Internal" ||
      buttonDataObj?.Button_Action === "External"
    ) {
      if (buttonDataObj?.Button_Type === "current window" && deployUrl !== "") {
        window.location.href = deployUrl;
      } else {
        window.open(deployUrl, "_blank");
      }
    } else if (buttonDataObj?.Button_Action === "Content") {
      const contentObjHandle = uriToJSON(buttonDataObj); //convertToParse
      const { ContentType = "", currentPath = "" } = nullToObject(contentObjHandle);
      const { Button_Type: buttonType = "" } = nullToObject(buttonDataObj);

      // image and video are open inside popUp
      const isGalaryArray = ["ImageGallery", "VideoGallery", "Gallery"].some(
        (ele) => convertToLowerCase(ele) === convertToLowerCase(ContentType),
      );
      const type = conCatUrlPath(ContentType);

      //backSlash remove
      let id = currentPath;
      if (id && id.charAt(0) === "/") {
        id = id.substring(1);
      }

      const ContentUrl = `${secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint}${secondaryArgs?.prelemBaseEndpoint?.language}/${type}${id}`;

      if (!isGalaryArray) {
        if (convertToLowerCase(buttonType) === convertToLowerCase("new window")) {
          window.open(ContentUrl); //newWindow open
        } else {
          window.location.href = ContentUrl; //same window
        }
      }
    } else if (buttonDataObj?.Button_Action === "Ecommerce") {
      localStorage.setItem("ecommerceQuery", JSON.stringify(buttonDataObj?.Button_Content));
      const ecomObjHandle = eComTypeUriToJSON(buttonDataObj); //convertToParse
      const { ContentType = "", currentPath = "" } = nullToObject(ecomObjHandle);
      const type = conCatUrlPath(ContentType);

      //backSlash remove
      let id = currentPath;
      if (id && id.charAt(0) === "/") {
        id = id.substring(1);
      }
      const ContentUrl = `${secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint}${secondaryArgs?.prelemBaseEndpoint?.language}/${type}${id}`;
      if (buttonDataObj?.Button_Type === "current window" && deployUrl !== "") {
        window.location.href = ContentUrl;
      } else {
        window.open(ContentUrl, "_blank");
      }
    }
  };

  const toggleModalStatus = () => {
    if (!secondaryArgs?.editState) setModalStatus(!modalStatus);
  };

  return (
    <>
      {variant === "imagetext" ||
      variant === "transparent" ||
      variant === "blackbutton" ||
      variant === "primaryButton1" ||
      variant === "primaryButton2" ||
      variant === "primaryButton3" ||
      variant === "primaryButton4" ||
      variant === "secondaryButton1" ||
      variant === "secondaryButton2" ||
      variant === "secondaryButton3" ||
      variant === "secondaryButton4" ||
      variant === "tertiaryButton1" ||
      variant === "tertiaryButton2" ||
      variant === "tertiaryButton3" ||
      variant === "tertiaryButton4" ||
      variant === "defaultButton1" ||
      variant === "defaultButton2" ||
      variant === "defaultButton3" ? (
        <Button
          style={style}
          sx={{
            "&.edit-active": {
              border: `2px dashed #fff`,
            },
          }}
          className={`${isEditing ? "button-link edit-active" : "button-link"}`}
          variant={variant}
          onClick={
            secondaryArgs?.editState ? (e) => openButtonEditWindow(ButtonObj, e) : buttonClickEvent
          }
          id={ButtonObj?.Button_Name}
          disableRipple
          endIcon={endIcon || ""}>
          <span
            className='tabbtn'
            contentEditable={isEditing && currentBtnEditing === ButtonObj?.Button_Name} // move to AU
            suppressContentEditableWarning={true} // Mo
            onClick={(e) => buttonContentEditable && e.stopPropagation()}>
            {buttonDataObj?.Button_Value}
          </span>
        </Button>
      ) : (
        <Button
          style={style}
          sx={{
            "&.edit-active": {
              border: `2px dashed #000`,
            },
            [`@media (max-width:600px)`]: {
              minWidth: "0",
              width: "100%",
            },
            [`@media (max-width:991px)`]: {
              minWidth: "150px",
            },
          }}
          className={`${isEditing ? "button-link edit-active" : "button-link"}`}
          variant='outlined'
          onClick={
            secondaryArgs?.editState ? (e) => openButtonEditWindow(ButtonObj, e) : buttonClickEvent
          }
          id={ButtonObj?.Button_Name}
          disableRipple>
          <span
            contentEditable={isEditing && currentBtnEditing === ButtonObj?.Button_Name} // move to AU
            suppressContentEditableWarning={true} // Mo
            onClick={(e) => buttonContentEditable && e.stopPropagation()}>
            {buttonDataObj?.Button_Value}
          </span>
        </Button>
      )}
      {modalStatus && sliderData && sliderData.length > 0 && !secondaryArgs?.editState && (
        <CustomModalSlider
          sliderData={sliderData}
          openModal={modalStatus}
          contentType={contentType}
          handleClose={toggleModalStatus}
        />
      )}
    </>
  );
};

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
interface BasicButtonProps {
  endIcon?: any;
  style?: React.CSSProperties;
  ButtonObj?: {
    Button_Name?: string;
    Button_RedirectURL?: string;
    Button_Type?: string;
    Button1_Action?: string;
    Button_Value?: string;
  };
  buttonDataObj?: {
    Button_Name?: string;
    Button_RedirectURL?: string;
    Button_Type?: string;
    Button_Value?: string;
    Button_Action?: string;
    Button_Content?: string;
  };
  analyticsEnabled?: boolean;
  isAuthoring?: boolean;
  openButtonEditWindow?: (buttonObj?: object, e?: object) => void;
  isEditing?: boolean;
  currentBtnEditing?: string;
  buttonRef?: React.Ref<HTMLButtonElement>;
  buttonContentEditable?: boolean;
  position?: number;
  pageId?: number;
  prelemId?: number;
  pageTitle?: string;
  pageDesc?: string;
  pageTags?: string;
  prelemTags?: string;
  handleTrack?: (arg: string, e: object) => void;
  defaultObj?: {
    pageId?: string | number;
    pageTitle?: string;
    pageDesc?: string;
    pageTags?: string;
    prelemID?: string | number;
    prelemTitle?: string;
    prelemTags?: string;
    prelemPosition?: string | number;
  };
  variant: string;
  secondaryArgs: any;
  analytics?: Analytics;
}

BasicButton.defaultProps = {
  ButtonObj: {
    Button_Name: "Reach Us",
    Button_RedirectURL: "https://www.google.com/",
    Button_Type: "Button_Type",
    Button_Value: "reach us",
  },
  ButtonDataObj: {
    Button_Name: "Reach Us",
    Button_RedirectURL: "https://www.google.com/",
    Button_Type: "Button_Type",
    Button_Action: "External",
    Button_Value: "reach us",
  },
  isAuthoring: false,
  openButtonEditWindow: () => {},
  isEditing: false,
  currentBtnEditing: "",
  buttonRef: null,
  buttonContentEditable: false,
  position: 0,
  pageId: 1234,
  prelemId: 2345,
  analyticsEnabled: true,
  pageTitle: "Prelem Title",
  pageDesc: "Prelem Description",
  pageTags: "Page Tags1, page tagg2",
  prelemTags: "Prelem Tags1, Prelem tagg2",
  handleTrack: () => {},
  defaultObj: {},
  variant: "primaryButton1",
  children: "Reach us 1",
  secondaryArgs: {},
  analytics: {
    isAnalyticsEnabled: true,
    isSeoEnabled: false,
    isAuthoring: false,
    position: 0,
    pageId: 12345,
    prelemId: 23456,
    pageTitle: "Page Title",
    pageDesc: "Page Description",
    pageTags: "Image, CTA, Title, Hero Banner",
    prelemTags: "Image, CTA, Title, Hero Banner",
  },
};

export default BasicButton;
