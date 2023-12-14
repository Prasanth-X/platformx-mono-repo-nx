import { Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ImageVideoGalleryModalSlider from './ImageVideoGalleryModalSlider';

const nullToObject = (obj: any = {}) => {
  return obj ? obj : {};
};

const convertToLowerCase = (stringData: any = '') => {
  return ('' + stringData).toLowerCase();
};

const encodeGetParams = (params: any = {}) => {
  return Object.entries(params)
    .map((key: any) =>
      key
        .map((k: any) => {
          const enCodeData = typeof k === 'object' ? JSON.stringify(k) : k;
          return encodeURIComponent(enCodeData);
        })
        .join('=')
    )
    .join('&');
};

const completeExternalUrl = (str: string) => {
  let tarea = str;
  const tarea_regex = /^(http|https)/;
  if (!tarea_regex.test(String(str).toLowerCase())) {
    tarea = 'https://' + str;
  }
  return tarea;
};
const contentTypeUriToJSON = (jsonObj = {}) => {
  const { Button_Content: buttonContent = '' } = nullToObject(jsonObj);
  if (buttonContent && typeof buttonContent === 'string') {
    if (buttonContent.includes('ContentEnCodeParse')) {
      return JSON.parse(buttonContent);
    }
    return {};
  }
  return {};
};

const eComTypeUriToJSON = (jsonObj = {}) => {
  const { Button_Content: buttonContent = '' } = nullToObject(jsonObj);
  if (buttonContent && typeof buttonContent === 'string') {
    if (buttonContent.includes('ecomEnCodeParse')) {
      return JSON.parse(buttonContent);
    }
    return {};
  }
  return {};
};

const conCatUrlPath = (ContentType = '') => {
  if (ContentType) {
    const typeUrl =
      ContentType.charAt(ContentType.length - 1) === '/'
        ? `${ContentType}`
        : `${ContentType}/`;
    if (convertToLowerCase(typeUrl) === 'vod/') {
      return 'video/';
    }
    return convertToLowerCase(typeUrl);
  }
  return '';
};

const BasicButton = (props: BasicButtonProps) => {
  const {
    isEditing,
    isAuthoring,
    openButtonEditWindow = () => {},
    analyticsEnabled,
    ButtonObj,
    handleTrack = () => {},
    currentBtnEditing,
    buttonContentEditable,
    defaultObj,
    buttonDataObj,
    variant,
    secondaryArgs,
    style,
    endIcon,
  } = props;
  const { t } = useTranslation();
  const [modalStatus, setModalStatus] = useState(false);
  const [sliderData, setSliderData] = useState([]);
  const [contentType, setContentType] = useState('');

  const buttonClickEvent = async (e: any) => {
    const { prelemBaseEndpoint = {} } = nullToObject(secondaryArgs);
    const {
      buttonBaseUrl = '',
      PublishEndPoint = '',
      language = '',
    } = nullToObject(prelemBaseEndpoint);
    const platformEndPoint = buttonBaseUrl ? buttonBaseUrl : PublishEndPoint;

    if (!isAuthoring && analyticsEnabled) {
      const buttonClickObj = {
        eventType: 'Button Click',
        ...defaultObj,
        buttonURL: buttonDataObj?.Button_RedirectURL,
        nameOfFileDownloaded: '',
        eventCategory: 'Button Click',
        eventAction: 'Click',
        eventLabel: e.currentTarget.innerText,
        eventValue: 1,
      };
      handleTrack(buttonClickObj?.eventType, buttonClickObj);
    }

    let deployUrl = '';
    switch (buttonDataObj?.Button_Action) {
      case 'Internal':
        if (buttonDataObj?.Button_RedirectURL) {
          deployUrl =
            platformEndPoint + language + buttonDataObj.Button_RedirectURL;
        }
        break;
      case 'External':
        if (buttonDataObj?.Button_RedirectURL) {
          deployUrl = completeExternalUrl(buttonDataObj.Button_RedirectURL);
        }
        break;
      case 'Content':
        const contentObjHandle = contentTypeUriToJSON(buttonDataObj);
        const { ContentType = '', currentPath = '' } =
          nullToObject(contentObjHandle);
        const isGalleryArray = ['ImageGallery', 'VideoGallery', 'Gallery'].some(
          (ele) => convertToLowerCase(ele) === convertToLowerCase(ContentType)
        );

        if (ContentType && isGalleryArray) {
          const filterType =
            convertToLowerCase(ContentType) ===
            convertToLowerCase('ImageGallery')
              ? 'image'
              : 'video';
          try {
            const newObj = {
              path: currentPath,
              contentType: ContentType,
            };
            const url = `${secondaryArgs?.prelemBaseEndpoint?.deliveryEndPoint}api/v1/web/en/delivery/multi-slot-content`;
            const res = await axios.get(`${url}?${encodeGetParams(newObj)}`);
            if (res) {
              let gallery = [];
              if (
                convertToLowerCase(ContentType) !==
                convertToLowerCase('VideoGallery')
              ) {
                gallery = res?.data?.data?.fetchMultiSlotContent?.Gallery.map(
                  (x: any) => x.Image
                );
              } else {
                gallery = res?.data?.data?.fetchMultiSlotContent?.Gallery.map(
                  (x: any) => x.Video
                );
              }
              setSliderData(gallery);
              setContentType(filterType);
              setModalStatus(true);
            }
          } catch (error: any) {
            // console.log(error, "error");
            setModalStatus(false);
            setContentType('');
            setSliderData([]);
          }
        }
        break;
      default:
        break;
    }

    if (
      buttonDataObj?.Button_Action === 'Internal' ||
      buttonDataObj?.Button_Action === 'External'
    ) {
      if (buttonDataObj?.Button_Type === 'current window' && deployUrl !== '') {
        window.location.href = deployUrl;
      } else {
        window.open(deployUrl, '_blank');
      }
    } else if (buttonDataObj?.Button_Action === 'Content') {
      const contentObjHandle = contentTypeUriToJSON(buttonDataObj); //convertToParse
      const { ContentType = '', currentPath = '' } =
        nullToObject(contentObjHandle);
      const { Button_Type: buttonType = '' } = nullToObject(buttonDataObj);

      // image and video are open inside popUp
      const isGalaryArray = ['ImageGallery', 'VideoGallery', 'Gallery'].some(
        (ele) => convertToLowerCase(ele) === convertToLowerCase(ContentType)
      );
      const type = conCatUrlPath(ContentType);

      //backSlash remove
      let id = currentPath;
      if (id.charAt(0) === '/') {
        id = id.substring(1);
      }

      const ContentUrl = `${secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint}${secondaryArgs?.prelemBaseEndpoint?.language}/${type}${id}`;

      if (!isGalaryArray) {
        if (
          convertToLowerCase(buttonType) === convertToLowerCase('new window')
        ) {
          window.open(ContentUrl); //newWindow open
        } else {
          window.location.href = ContentUrl; //same window
        }
      }
    } else if (buttonDataObj?.Button_Action === 'Ecommerce') {
      localStorage.setItem('ecommerceQuery', buttonDataObj?.Button_Content);
      const ecomObjHandle = eComTypeUriToJSON(buttonDataObj); //convertToParse
      const { ContentType = '', currentPath = '' } =
        nullToObject(ecomObjHandle);
      const type = conCatUrlPath(ContentType);

      //backSlash remove
      let id = currentPath;
      if (id.charAt(0) === '/') {
        id = id.substring(1);
      }
      const ContentUrl = `${secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint}${secondaryArgs?.prelemBaseEndpoint?.language}/${type}${id}`;
      if (buttonDataObj?.Button_Type === 'current window' && deployUrl !== '') {
        window.location.href = ContentUrl;
      } else {
        window.open(ContentUrl, '_blank');
      }
    }
  };

  const toggleModalStatus = () => {
    if (!secondaryArgs?.editState) setModalStatus(!modalStatus);
  };

  return (
    <>
      {variant === 'contained' ||
      variant === 'tertiary' ||
      variant === 'transparent' ||
      variant === 'imagetext' ||
      variant === 'redbutton' ||
      variant === 'blackbutton' ||
      variant === 'ecommerceButton' ||
      variant === 'text' ? (
        <Button
          style={style}
          sx={{
            '&.edit-active': {
              border: `2px dashed #fff`,
            },
          }}
          className={`${isEditing ? 'button-link edit-active' : 'button-link'}`}
          // variant={variant}
          onClick={
            secondaryArgs?.editState
              ? (e) => openButtonEditWindow(ButtonObj, e)
              : (e) => buttonClickEvent(e)
          }
          id={ButtonObj?.Button_Name}
          disableRipple
          endIcon={endIcon || ''}
        >
          <span
            className="tabbtn"
            contentEditable={
              isEditing && currentBtnEditing === ButtonObj?.Button_Name
            } // move to AU
            suppressContentEditableWarning={true} // Mo
            onClick={(e) => buttonContentEditable && e.stopPropagation()}
          >
            {buttonDataObj?.Button_Value}
          </span>
        </Button>
      ) : (
        <Button
          style={style}
          sx={{
            '&.edit-active': {
              border: `2px dashed #000`,
            },
            [`@media (max-width:600px)`]: {
              minWidth: '0',
              width: '100%',
            },
            [`@media (max-width:991px)`]: {
              minWidth: '150px',
            },
          }}
          className={`${isEditing ? 'button-link edit-active' : 'button-link'}`}
          variant="outlined"
          onClick={
            secondaryArgs?.editState
              ? (e) => openButtonEditWindow(ButtonObj, e)
              : (e) => buttonClickEvent(e)
          }
          id={ButtonObj?.Button_Name}
          disableRipple
        >
          <span
            contentEditable={
              isEditing && currentBtnEditing === ButtonObj?.Button_Name
            } // move to AU
            suppressContentEditableWarning={true} // Mo
            onClick={(e) => buttonContentEditable && e.stopPropagation()}
          >
            {buttonDataObj?.Button_Value}
          </span>
        </Button>
      )}
      {modalStatus &&
        sliderData &&
        sliderData.length > 0 &&
        !secondaryArgs?.editState && (
          <ImageVideoGalleryModalSlider
            sliderData={sliderData}
            openModal={modalStatus}
            contentType={contentType}
            handleClose={toggleModalStatus}
          />
        )}
    </>
  );
};

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
    pageId?: number;
    pageTitle?: string;
    pageDesc?: string;
    pageTags?: string;
    prelemID?: number;
    prelemTitle?: string;
    prelemTags?: string;
    prelemPosition?: number;
  };
  variant: string;
  secondaryArgs: any;
}

BasicButton.defaultProps = {
  ButtonObj: {
    Button_Name: 'Reach Us',
    Button_RedirectURL: 'https://www.google.com/',
    Button_Type: 'Button_Type',
    Button_Value: 'reach us',
  },
  ButtonDataObj: {
    Button_Name: 'Reach Us',
    Button_RedirectURL: 'https://www.google.com/',
    Button_Type: 'Button_Type',
    Button_Action: 'External',
    Button_Value: 'reach us',
  },
  isAuthoring: false,
  openButtonEditWindow: () => {},
  isEditing: false,
  currentBtnEditing: '',
  buttonRef: null,
  buttonContentEditable: false,
  position: 0,
  pageId: 1234,
  prelemId: 2345,
  analyticsEnabled: true,
  pageTitle: 'Prelem Title',
  pageDesc: 'Prelem Description',
  pageTags: 'Page Tags1, page tagg2',
  prelemTags: 'Prelem Tags1, Prelem tagg2',
  handleTrack: () => {},
  defaultObj: {},
  variant: 'contained',
  children: 'Reach us 1',
  secondaryArgs: {
    prelemBaseEndpoint: {
      PublishEndPoint: process.env.NX_PUBLISH_URI,
      language: 'en',
    },
  },
};

export default BasicButton;
