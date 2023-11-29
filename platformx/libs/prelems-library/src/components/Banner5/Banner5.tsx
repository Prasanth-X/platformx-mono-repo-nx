import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useRef, useState } from "react";
import "./Banner5.css";
//import "../EcommerceDiscoverNow/EcommerceDiscoverNow.css";
import { useInView } from "react-intersection-observer";
import { completeButtonUrl, formCroppedUrl } from "../../utils/helperFns";
import Banner5Slide from "./Banner5Slide";
import { useCustomStyle } from "./Banner5.style";
import { usePrelemImpression } from "Common/ImpressionHooks/PrelemImpressionHook";

const Banner5 = ({ content, analytics, authoringHelper, secondaryArgs }: Banner5Props) => {
  const classes = useCustomStyle();
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

  const firstRender = useRef(true);

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const getImg = (index: number) => {
    const ImageCompound_index = `ImageCompound_${index}`;
    const { original_image_relative_path, ext }: any =
      (content?.ImageCompound && content?.ImageCompound[ImageCompound_index]?.original_image) || {};
    const img = formCroppedUrl(
      secondaryArgs?.gcpUrl,
      secondaryArgs?.bucketName,
      original_image_relative_path,
      ext,
    );
    return img;
  };
  const defaultStructureData = () => {
    let Banner5StructureData;
    try {
      Banner5StructureData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement:
          content?.ImageCompound &&
          Object.entries(content?.ImageCompound).map(([,], index) => {
            return {
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "ImageObject",
                image: getImg(index + 1),
                description: content[`${"Title_" + (index + 1)}`],
                contenturl: completeButtonUrl(
                  content["Button" + (index + 1) + "_Action"],
                  content["Button" + (index + 1) + "_RedirectURL"],
                  secondaryArgs.prelemBaseEndpoint.buttonBaseUrl,
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
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

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
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  usePrelemImpression(analytics, inView);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isPlaying) {
        selectedOne.current = currentSlide;
        setCurrentSlide((currentSlide + 1) % Object.entries(content?.ImageCompound).length);
      }
    }, 7000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentSlide, isPlaying]);

  const handleSlideChange = (index: number) => {
    selectedOne.current = currentSlide;
    setCurrentSlide(index);
  };

  return (
    <div ref={authoringHelper?.innerRef}>
      <Box ref={ref} className={`banner5-slideshow ${classes.slideShowWrapper} banner5Bgwrapper`}>
        <Box className='slides prelem-py'>
          <Banner5Slide
            idfortitle='Title1'
            title={content?.Title1}
            img={content?.ImageCompound?.ImageCompound_1}
            analytics={analytics}
            authoringHelper={authoringHelper}
            secondaryArgs={secondaryArgs}
            ButtonObj={ButtonObj1}
            buttonDataObj={ButtonDataObj1}
            showSlide={currentSlide === 0}
          />
          <Banner5Slide
            idfortitle='Title2'
            title={content?.Title2}
            img={content?.ImageCompound?.ImageCompound_2}
            analytics={analytics}
            authoringHelper={authoringHelper}
            secondaryArgs={secondaryArgs}
            ButtonObj={ButtonObj2}
            buttonDataObj={ButtonDataObj2}
            showSlide={currentSlide === 1}
          />
          <Banner5Slide
            idfortitle='Title3'
            title={content?.Title3}
            img={content?.ImageCompound?.ImageCompound_3}
            analytics={analytics}
            authoringHelper={authoringHelper}
            secondaryArgs={secondaryArgs}
            ButtonObj={ButtonObj3}
            buttonDataObj={ButtonDataObj3}
            showSlide={currentSlide === 2}
          />
          <Banner5Slide
            idfortitle='Title4'
            title={content?.Title4}
            img={content?.ImageCompound?.ImageCompound_4}
            analytics={analytics}
            authoringHelper={authoringHelper}
            secondaryArgs={secondaryArgs}
            ButtonObj={ButtonObj4}
            buttonDataObj={ButtonDataObj4}
            showSlide={currentSlide === 3}
          />
        </Box>
        <Box className='controls'>
          <Box className='slider-nav'>
            {Object.entries(content?.ImageCompound).map(([key], index) => (
              <Box
                sx={{ width: { em: "120px !important" }, position: "relative" }}
                key={`image${key}`}
                className={`slider-dot ${currentSlide === index ? "active" : ""}`}
                onClick={() => handleSlideChange(index)}>
                <Typography
                  className={`itemText activeSlide ${currentSlide === index ? "active" : ""}`}
                  variant='h6medium'>
                  {`0${index + 1}`}
                </Typography>
                <Box
                  className={`hor-line ${currentSlide === index ? "active" : ""} ${
                    index === selectedOne.current ? "prviousSelect" : ""
                  }`}></Box>
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

  ImageCompound: {
    ImageCompound_1: ImageCompound;
    ImageCompound_2: ImageCompound;
    ImageCompound_3: ImageCompound;
    ImageCompound_4: ImageCompound;
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
}

Banner5.defaultProps = {
  content: {
    Button1_Action: "Ecommerce",
    Button1_Content:
      '{"pagination":{"start":0,"rows":10},"searchTerm":"","tags":[],"filter":"Ecommerce","isSuggestive":false,"ecommerceRequest":{"filter":[]}}',
    Button1_Name: "ReachUS",
    Button1_RedirectURL: "https://www.google.com",
    Button1_RestEndPoint: "RestEndPoint 1",
    Button1_Type: "new window",
    Button1_Value: "Lorem Ipsum",
    Button2_Action: "Ecommerce",
    Button2_Content:
      '{"pagination":{"start":0,"rows":10},"searchTerm":"","tags":[],"filter":"Ecommerce","isSuggestive":false,"ecommerceRequest":{"filter":[]}}',
    Button2_Name: "ReachUS",
    Button2_RedirectURL: "https://www.google.com",
    Button2_RestEndPoint: "RestEndPoint 2",
    Button2_Type: "New Window",
    Button2_Value: "Lorem Ipsum",
    Button3_Action: "Ecommerce",
    Button3_Content:
      '{"pagination":{"start":0,"rows":10},"searchTerm":"","tags":[],"filter":"Ecommerce","isSuggestive":false,"ecommerceRequest":{"filter":[]}}',
    Button3_Name: "ReachUS",
    Button3_RedirectURL: "https://www.google.com",
    Button3_RestEndPoint: "RestEndPoint 3",
    Button3_Type: "New Window",
    Button3_Value: "Lorem Ipsum",
    Button4_Action: "Ecommerce",
    Button4_Content:
      '{"pagination":{"start":0,"rows":10},"searchTerm":"","tags":[],"filter":"Ecommerce","isSuggestive":false,"ecommerceRequest":{"filter":[]}}',
    Button4_Name: "ReachUS",
    Button4_RedirectURL: "https://www.google.com",
    Button4_RestEndPoint: "RestEndPoint 4",
    Button4_Type: "New Window",
    Button4_Value: "Lorem Ipsum",

    TagName: "SiteComponents",
    Title1: "Lorem ipsum dolor sit amet1",
    Title2: "Lorem ipsum dolor sit amet2",
    Title3: "Lorem ipsum dolor sit amet3",
    Title4: "Lorem ipsum dolor sit amet4",
    PrelemContentType: ["Select"],
    ImageCompound: {
      ImageCompound_1: {
        original_image: {
          original_image_relative_path:
            "machine_assets/1690187501280/public/png/ImageAndVideoCard1",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "ThreeSlotOne",
            Name: "X_Image",
            Title: "ThreeSlotOne",
            Description: "This is for ThreeSlotOne",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "portrait",
            folder_path: "machine_assets/1690187501280/public/png/ImageAndVideoCard1-portrait",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1690187501280/public/png/ImageAndVideoCard1-hero",
          },
          {
            aspect_ratio: "landscape",
            folder_path: "machine_assets/1690187501280/public/png/ImageAndVideoCard1-landscape",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1690187501280/public/png/ImageAndVideoCard1-card1",
          },
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1690187501280/public/png/ImageAndVideoCard1-square",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1690187501280/public/png/ImageAndVideoCard1-card2",
          },
        ],
      },
      ImageCompound_2: {
        original_image: {
          original_image_relative_path:
            "machine_assets/1690188371171/public/png/ImageAndVideoCard2",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "ThreeSlotOne",
            Name: "X_Image",
            Title: "ThreeSlotOne",
            Description: "This is for ThreeSlotOne",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "portrait",
            folder_path: "machine_assets/1690188371171/public/png/ImageAndVideoCard2-portrait",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1690188371171/public/png/ImageAndVideoCard2-card1",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1690188371171/public/png/ImageAndVideoCard2-hero",
          },
          {
            aspect_ratio: "landscape",
            folder_path: "machine_assets/1690188371171/public/png/ImageAndVideoCard2-landscape",
          },
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1690188371171/public/png/ImageAndVideoCard2-square",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1690188371171/public/png/ImageAndVideoCard2-card2",
          },
        ],
      },
      ImageCompound_3: {
        original_image: {
          original_image_relative_path:
            "machine_assets/1690188403295/public/png/ImageAndVideoCard3",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "ThreeSlotOne",
            Name: "X_Image",
            Title: "ThreeSlotOne",
            Description: "This is for ThreeSlotOne",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "portrait",
            folder_path: "machine_assets/1690188403295/public/png/ImageAndVideoCard3-portrait",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1690188403295/public/png/ImageAndVideoCard3-card1",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1690188403295/public/png/ImageAndVideoCard3-hero",
          },
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1690188403295/public/png/ImageAndVideoCard3-square",
          },
          {
            aspect_ratio: "landscape",
            folder_path: "machine_assets/1690188403295/public/png/ImageAndVideoCard3-landscape",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1690188403295/public/png/ImageAndVideoCard3-card2",
          },
        ],
      },
      ImageCompound_4: {
        original_image: {
          original_image_relative_path:
            "machine_assets/1690282794843/public/png/ExpertiseShowcase4",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "ThreeSlotOne",
            Name: "X_Image",
            Title: "ThreeSlotOne",
            Description: "This is for ThreeSlotOne",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "landscape",
            folder_path: "machine_assets/1690282794843/public/png/ExpertiseShowcase4-landscape",
          },
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1690282794843/public/png/ExpertiseShowcase4-square",
          },
          {
            aspect_ratio: "portrait",
            folder_path: "machine_assets/1690282794843/public/png/ExpertiseShowcase4-portrait",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1690282794843/public/png/ExpertiseShowcase4-hero",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1690282794843/public/png/ExpertiseShowcase4-card1",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1690282794843/public/png/ExpertiseShowcase4-card2",
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
    gcpUrl: "https://storage.googleapis.com",
    bucketName: "cropped_image_public",
  },
};

export default Banner5;
