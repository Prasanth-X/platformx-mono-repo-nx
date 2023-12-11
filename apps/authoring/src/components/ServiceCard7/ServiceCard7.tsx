import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import "./Banner5.css";
import usePlatformAnalytics from "platform-x-utils/dist/analytics";
import { useInView } from "react-intersection-observer";
import Banner5Slide from "./Banner5Slide";

const completeButtonUrl = (
  actionType = "External",
  url = "https://www.hcltech.com",
  btnBaseUrl = ""
) => {
  if (actionType === "Internal") {
    const urlwidoutSlash = url.slice(1);
    return btnBaseUrl + urlwidoutSlash;
  }
  return url;
};

const Banner5 = ({
  content,
  analytics,
  authoringHelper,
  secondaryArgs,
}: Banner5Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isPlaying = !authoringHelper?.isEditing;
  const selectedOne = useRef(0);
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
  const ButtonObj2 = {
    Button_Name: "Button2_Name",
    Button_RedirectURL: "Button2_RedirectURL",
    Button_Type: "Button2_Type",
    Button_Value: "Button2_Value",
    Button_Action: "Button2_Action",
    Button_Content: "Button2_Content",
  };
  const ButtonDataObj2 = {
    Button_Name: content?.Button2_Name,
    Button_RedirectURL: content?.Button2_RedirectURL,
    Button_Type: content?.Button2_Type,
    Button_Value: content?.Button2_Value,
    Button_Action: content?.Button2_Action,
    Button_Content: content?.Button2_Content,
  };
  const ButtonObj3 = {
    Button_Name: "Button3_Name",
    Button_RedirectURL: "Button3_RedirectURL",
    Button_Type: "Button3_Type",
    Button_Value: "Button3_Value",
    Button_Action: "Button3_Action",
    Button_Content: "Button3_Content",
  };
  const ButtonDataObj3 = {
    Button_Name: content?.Button3_Name,
    Button_RedirectURL: content?.Button3_RedirectURL,
    Button_Type: content?.Button3_Type,
    Button_Value: content?.Button3_Value,
    Button_Action: content?.Button3_Action,
    Button_Content: content?.Button3_Content,
  };
  const ButtonObj4 = {
    Button_Name: "Button4_Name",
    Button_RedirectURL: "Button4_RedirectURL",
    Button_Type: "Button4_Type",
    Button_Value: "Button4_Value",
    Button_Action: "Button4_Action",
    Button_Content: "Button4_Content",
  };
  const ButtonDataObj4 = {
    Button_Name: content?.Button4_Name,
    Button_RedirectURL: content?.Button4_RedirectURL,
    Button_Type: content?.Button4_Type,
    Button_Value: content?.Button4_Value,
    Button_Action: content?.Button4_Action,
    Button_Content: content?.Button4_Content,
  };

  const defaultObj = {
    pageId: analytics?.pageId,
    pageTitle: analytics?.pageTitle,
    pageDesc: analytics?.pageDesc,
    pageTags: analytics?.pageTags,
    prelemID: analytics?.prelemId,
    prelemTitle: analytics?.prelemTitle,
    prelemTags: analytics?.prelemTags,
    prelemPosition: analytics?.prelemPosition,
  };

  const [handleTrack, handleImpression] = usePlatformAnalytics();
  const [enableImpressionTracking, setEnableImpressionTracking] =
    useState(true);

  const firstRender = useRef(true);

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const defaultStructureData = () => {
    let Banner5StructureData;
    try {
      Banner5StructureData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement:
          content?.Images &&
          Object.entries(content?.Images || []).map(([, value], index) => {
            return {
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "ImageObject",
                image: value?.Url,
                description: content[`${"Title_" + (index + 1)}`],
                contenturl: completeButtonUrl(
                  content["Button" + (index + 1) + "_Action"],
                  content["Button" + (index + 1) + "_RedirectURL"],
                  secondaryArgs.prelemBaseEndpoint.buttonBaseUrl
                ),
              },
            };
          }),
      };
    } catch (e) {
      Banner5StructureData = {};
    }

    return Banner5StructureData;
  };

  const generateStructureData = () => {
    let Banner5StructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current === true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(
        stringifyStructureData || ""
      );

      if (String(tempSD).length > 0) {
        Banner5StructureData = JSON.parse(tempSD);
      } else {
        Banner5StructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      Banner5StructureData = defaultStructureData();
    }
    return Banner5StructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData =
        structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(
        stringifyStructureData || ""
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // }, [content.Description, content.Images?.Image_1?.Url, content.Title, websiteUrl]);

  useEffect(() => {
    if (
      !analytics?.isAuthoring &&
      analytics?.isAnalyticsEnabled &&
      enableImpressionTracking &&
      inView
    ) {
      const prelemImpressionObj = {
        eventType: "Prelem Impression",
        ...defaultObj,
      };

      handleImpression("Prelem Impression", prelemImpressionObj);
      setEnableImpressionTracking(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, analytics?.isAnalyticsEnabled]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isPlaying) {
        selectedOne.current = currentSlide;
        setCurrentSlide(
          (currentSlide + 1) % Object.entries(content?.Images || []).length
        );
      }
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentSlide, isPlaying]);

  const handleSlideChange = (index: number) => {
    selectedOne.current = currentSlide;
    setCurrentSlide(index);
  };

  return (
    <div style={{}} ref={authoringHelper?.innerRef}>
      <Box ref={ref} className="slideshow">
        <Box className="slides">
          <Banner5Slide
            idfortitle="Title1"
            title={content?.Title1}
            img={content?.Images?.Image_1?.Url}
            analytics={analytics}
            authoringHelper={authoringHelper}
            secondaryArgs={secondaryArgs}
            handleTrack={handleTrack}
            ButtonObj={ButtonObj1}
            defaultObj={defaultObj}
            buttonDataObj={ButtonDataObj1}
            showSlide={currentSlide === 0}
          />
          <Banner5Slide
            idfortitle="Title2"
            title={content?.Title2}
            img={content?.Images?.Image_2?.Url}
            analytics={analytics}
            authoringHelper={authoringHelper}
            secondaryArgs={secondaryArgs}
            handleTrack={handleTrack}
            ButtonObj={ButtonObj2}
            defaultObj={defaultObj}
            buttonDataObj={ButtonDataObj2}
            showSlide={currentSlide === 1}
          />
          <Banner5Slide
            idfortitle="Title3"
            title={content?.Title3}
            img={content?.Images?.Image_3?.Url}
            analytics={analytics}
            authoringHelper={authoringHelper}
            secondaryArgs={secondaryArgs}
            handleTrack={handleTrack}
            ButtonObj={ButtonObj3}
            defaultObj={defaultObj}
            buttonDataObj={ButtonDataObj3}
            showSlide={currentSlide === 2}
          />
          <Banner5Slide
            idfortitle="Title4"
            title={content?.Title4}
            img={content?.Images?.Image_4?.Url}
            analytics={analytics}
            authoringHelper={authoringHelper}
            secondaryArgs={secondaryArgs}
            handleTrack={handleTrack}
            ButtonObj={ButtonObj4}
            defaultObj={defaultObj}
            buttonDataObj={ButtonDataObj4}
            showSlide={currentSlide === 3}
          />
        </Box>
        <Box className="controls">
          <Box className="slider-nav">
            {Object.entries(content?.Images || []).map(([key, value], index) => (
              <Box
                sx={{ width: { em: "120px !important" }, position: "relative" }}
                key={key + value?.Title}
                className={`slider-dot ${currentSlide === index ? "active" : ""
                  }`}
                onClick={() => handleSlideChange(index)}
              >
                <Typography
                  className={`activeSlide ${currentSlide === index ? "active" : ""
                    }`}
                  variant="h6medium"
                >
                  {`0${index + 1}`}
                </Typography>
                <Box
                  className={`hor-line ${currentSlide === index ? "active" : ""
                    } ${index === selectedOne.current ? "prviousSelect" : ""}`}
                ></Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

interface Banner5Props {
  content: Content;
  analytics: Analytics;
  authoringHelper?: AuthoringHelper;
  secondaryArgs?: any;
}

interface Content {
  TagName?: string;

  Title1?: string;
  Button1_Action?: string;
  Button1_Content?: string;
  Button1_Name?: string;
  Button1_RedirectURL?: string;
  Button1_RestEndPonit?: string;
  Button1_Type?: string;
  Button1_Value?: string;

  Title2?: string;
  Button2_Action?: string;
  Button2_Content?: string;
  Button2_Name?: string;
  Button2_RedirectURL?: string;
  Button2_RestEndPonit?: string;
  Button2_Type?: string;
  Button2_Value?: string;

  Title3?: string;
  Button3_Action?: string;
  Button3_Content?: string;
  Button3_Name?: string;
  Button3_RedirectURL?: string;
  Button3_RestEndPonit?: string;
  Button3_Type?: string;
  Button3_Value?: string;

  Title4?: string;
  Button4_Action?: string;
  Button4_Content?: string;
  Button4_Name?: string;
  Button4_RedirectURL?: string;
  Button4_RestEndPonit?: string;
  Button4_Type?: string;
  Button4_Value?: string;

  Images?: {
    Image_1?: {
      Name?: string;
      Url?: string;
      Title?: string;
      Description?: string;
      AltText?: string;
    };
    Image_2?: {
      Name?: string;
      Url?: string;
      Title?: string;
      Description?: string;
      AltText?: string;
    };
    Image_3?: {
      Name?: string;
      Url?: string;
      Title?: string;
      Description?: string;
      AltText?: string;
    };
    Image_4?: {
      Name?: string;
      Url?: string;
      Title?: string;
      Description?: string;
      AltText?: string;
    };
  };
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
  sendDefaultStructureDataForResetToAuthoringCB: (
    structureData: string
  ) => void;
  openButtonEditWindowInAuthoringCB: (buttonObj?: object, e?: object) => void;
  selectedButtonNameForEditing: string;
  isEditing: boolean;
  buttonRef?: React.Ref<HTMLButtonElement>;
  buttonContentEditable?: boolean;
  lastSavedStructuredData?: string;
}

Banner5.defaultProps = {
  content: {
    Button1_Action: "External",
    Button1_Content:
      '\'{"pagination":{"start":0,"rows":100},"searchTerm":"","tags":[],"filter":"Ecommerce","ecommerceRequest":{}}\'',
    Button1_Name: "ReachUS",
    Button1_RedirectURL: "https://www.google.com",
    Button1_RestEndPoint: "RestEndPoint 1",
    Button1_Type: "new window",
    Button1_Value: "Lorem Ipsum1",
    Button2_Action: "Internal",
    Button2_Content:
      '\'{"pagination":{"start":0,"rows":100},"searchTerm":"","tags":[],"filter":"Ecommerce","ecommerceRequest":{}}\'',
    Button2_Name: "ReachUS",
    Button2_RedirectURL: "https://www.google.com",
    Button2_RestEndPoint: "RestEndPoint 2",
    Button2_Type: "New Window",
    Button2_Value: "Lorem Ipsum2",
    Button3_Action: "Content",
    Button3_Content:
      '\'{"pagination":{"start":0,"rows":100},"searchTerm":"","tags":[],"filter":"Ecommerce","ecommerceRequest":{}}\'',
    Button3_Name: "ReachUS",
    Button3_RedirectURL: "https://www.google.com",
    Button3_RestEndPoint: "RestEndPoint 3",
    Button3_Type: "New Window",
    Button3_Value: "Lorem Ipsum3",
    Button4_Action: "Internal",
    Button4_Content:
      '\'{"pagination":{"start":0,"rows":100},"searchTerm":"","tags":[],"filter":"Ecommerce","ecommerceRequest":{}}\'',
    Button4_Name: "ReachUS",
    Button4_RedirectURL: "https://www.google.com",
    Button4_RestEndPoint: "RestEndPoint 4",
    Button4_Type: "New Window",
    Button4_Value: "Lorem Ipsum4",
    Images: {
      Image_1: {
        Name: "X_Image",
        Url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/3dccf695-08a6-4a35-a261-a9df0ef2847f/content",
        Title: "ThreeSlotOne",
        Description: "This is for ThreeSlotOne",
        Attribution: false,
        AltText: "ThreeSlotOne",
      },
      Image_2: {
        Name: "X_Image",
        Url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/44c6a0c4-b87b-4c05-bd56-e0cf3c74033f/content",
        Title: "ThreeSlotOne",
        Description: "This is for ThreeSlotOne",
        Attribution: false,
        AltText: "ThreeSlotOne",
      },
      Image_3: {
        Name: "X_Image",
        Url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/54a4ba27-08bb-4769-8510-357485f094fb/content",
        Title: "ThreeSlotOne",
        Description: "This is for ThreeSlotOne",
        Attribution: false,
        AltText: "ThreeSlotOne",
      },
      Image_4: {
        Name: "X_Image",
        Url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/0c9b5688-41b7-4892-bf57-a724dc9f43a6/content",
        Title: "ThreeSlotOne",
        Description: "This is for ThreeSlotOne",
        Attribution: false,
        AltText: "ThreeSlotOne",
      },
    },
    TagName: "SiteComponents",
    Title1: "Lorem ipsum dolor sit amet1",
    Title2: "Lorem ipsum dolor sit amet2",
    Title3: "Lorem ipsum dolor sit amet3",
    Title4: "Lorem ipsum dolor sit amet4",
    PrelemContentType: ["Select"],
  },
  authoringHelper: {
    innerRef: null,
    sendStructureDataToAuthoringCB: () => { },
    sendDefaultStructureDataForResetToAuthoringCB: () => { },
    openButtonEditWindowInAuthoringCB: () => { },
    selectedButtonNameForEditing: "",
    isEditing: false,
    buttonRef: null,
    buttonContentEditable: false,
    lastSavedStructuredData: "",
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

export default Banner5;
