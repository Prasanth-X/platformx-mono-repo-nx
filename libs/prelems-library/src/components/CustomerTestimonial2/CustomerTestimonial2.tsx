import { Autorenew } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import Slider from "react-slick";
import IconUpArrowSvg from "../../assets/svgIcon/upArrow.svg";
import { formCroppedUrl, nullToArray, nullToObject } from "../../utils/helperFns";
import "./CustomerTestimonial2.css";
import { useCustomStyle } from "./CustomerTestimonial2.style";
import { prelemTypes } from "../../theme/globalStyle";
import { usePrelemImpression } from "Common/ImpressionHooks/PrelemImpressionHook";

const CustomerTestimonial2 = (props: CustomerTestimonial2Props) => {
  const { content = {}, analytics, authoringHelper, secondaryArgs } = nullToObject(props);
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  const { Slots = [] } = nullToObject(content);
  const sliderInitialInput = nullToArray(Slots).length > 3 ? 3 : 1;
  // const { isAuthoring = false } = nullToObject(analytics);
  const [stateManage, setStateManage] = useState<any>({
    listItem: {},
    currentIndex: null,
  });
  const { currentIndex = null, listItem = {} } = stateManage;
  const { text1 = "", text2 = "", description = "" } = nullToObject(listItem);

  const { bucketName, gcpUrl } = secondaryArgs;
  const [slider1, setSlider1] = useState<any>(null);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const firstRender = useRef(true);

  const defaultStructureData = () => {
    let CustomerTestimonial2StructureData;
    try {
      CustomerTestimonial2StructureData = {
        "@context": "http://schema.org/",
        "@type": "ItemList",
        name: content?.title,
        itemListElement: Slots?.map((item: any, key: any) => {
          return {
            "@type": "ListItem",
            position: key + 1,
            item: {
              "@type": "review",
              name: item?.text2,
              description: item?.description,
            },
          };
        }),
      };
    } catch (e) {
      CustomerTestimonial2StructureData = {};
    }

    return CustomerTestimonial2StructureData;
  };

  const generateStructureData = () => {
    let CustomerTestimonial2StructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        CustomerTestimonial2StructureData = JSON.parse(tempSD);
      } else {
        CustomerTestimonial2StructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      CustomerTestimonial2StructureData = defaultStructureData();
    }
    return CustomerTestimonial2StructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
  }, [content?.title, content?.Slots]);

  usePrelemImpression(analytics, inView);
  /* AnalyticsEnabled dependency added as many times we are not getting analytics provider*async call)
  1. we are first checking in publish app if analytics provider is avaiable or not
  2. if its available we are setting AnalyticsEnabled to true
  3. if its not available we are setting false
  */

  const settings = {
    className: "center",
    infinite: true,
    slidesToShow: sliderInitialInput,
    arrows: false,
    dot: false,
    accessibility: false,
    swipe: false,
    draggable: false,
    responsive: [
      {
        breakpoint: 300,
        settings: {
          slidesToShow: sliderInitialInput,
          slidesToScroll: sliderInitialInput,
          initialSlide: sliderInitialInput,
          dot: false,
          arrows: false,
          accessibility: false,
          swipe: false,
          draggable: false,
        },
      },
    ],
  };

  const handleClickProduts = (e: any, ele = {}, index = 0) => {
    e.preventDefault();
    const { currentIndex: crIndex = 0 } = stateManage;
    if (crIndex !== index) {
      //same index not change
      if (e.screenX < 630) {
        slider1?.slickPrev();
      } else {
        slider1?.slickNext();
      }
      setStateManage({
        ...stateManage,
        currentIndex: index,
        listItem: ele,
      });
    }
  };
  const getActiveObject = (slide: number) => {
    if (Slots.length <= 3) {
      setStateManage({
        ...stateManage,
        currentIndex: slide,
        listItem: Slots[slide],
      });
    } else {
      const lastIndexFind = Slots.length - 1 === slide ? true : false;
      setStateManage({
        ...stateManage,
        currentIndex: lastIndexFind ? 0 : slide + 1,
        listItem: Slots[lastIndexFind ? 0 : slide + 1],
      });
    }
  };

  useEffect(() => {
    if (Slots.length <= 3) {
      setStateManage({
        ...stateManage,
        currentIndex: 0,
        listItem: Slots[0],
      });
    } else {
      setStateManage({
        ...stateManage,
        currentIndex: 1,
        listItem: Slots[1],
      });
    }
  }, [nullToArray(Slots)]);

  const handleAfterChange = useCallback((slide) => {
    getActiveObject(slide);
  }, []);

  const sliderCommon = useMemo(() => {
    return (
      <Slider
        {...settings}
        autoplaySpeed={4000}
        afterChange={handleAfterChange}
        ref={(slider) => setSlider1(slider)}
        autoplay={authoringHelper?.isEditing ? false : true}>
        {nullToArray(Slots).map((items: any, key: number) => (
          <React.Fragment key={`${items?.text1}_${key.toString()}`}>
            <Box
              className='sliderWrapper'
              sx={{ opacity: currentIndex === key ? 1 : 0.5 }}
              onClick={(e) => handleClickProduts(e, items, key)}>
              <img
                src={formCroppedUrl(gcpUrl, bucketName, items?.image?.Url, items?.image?.ext)}
                alt='Testimonial'
                width='83'
                height='83'
                className='sliderImage'
              />
            </Box>
          </React.Fragment>
        ))}
      </Slider>
    );
  }, Slots);
  return (
    <>
      {currentIndex !== null ? (
        <Box
          className={`${classes.customerTestimonial2Wrapper} ${globalClasses.prelemType1} prelem prelemType1 customer-testimonial2 customerTestimonial2Bg`}>
          <div
            ref={authoringHelper?.innerRef}
            className={`CustomerTestimonial2-slider prelem-py sliderInnerWrapper`}>
            <Box ref={ref}>
              <Box className='title'>
                <Typography variant='h2medium' color='secondaryTitle' id='title'>
                  {" "}
                  {content?.title}{" "}
                </Typography>
              </Box>
              <Typography variant='h2semibold' color='secondaryTitle' className='centerText'>
                {/* <img
                  alt="quotes"
                  src={IconDoubleQutoesSvg}
                  width="70"
                  height="48"
                /> */}
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 25' width='70' height='48'>
                  <path d='M12.744 7.57652H8.52002V19.1605H0.0720215V7.44852C0.0720215 3.16051 2.50402 0.728516 6.79202 0.728516H12.744V7.57652ZM15.176 19.1605V7.44852C15.176 3.16051 17.608 0.728516 21.896 0.728516H27.848V7.57652H23.624V19.1605H15.176Z'></path>
                </svg>
              </Typography>

              <Box
                className='overlayPosition'
                // sx={{
                //   "&:hover": {
                //     ".add-content-overlay": {
                //       display: authoringHelper?.isEditing ? "flex" : "none",
                //     },
                //   },
                // }}
              >
                <Typography
                  variant='p1regular'
                  color='secondaryParagraph'
                  className='teasureCenter'
                  id='description'>
                  {description}
                </Typography>

                <Box className='iconUparrowWrapper'>
                  <Box className='iconUparrow'>
                    <img alt='iconuparrow' src={IconUpArrowSvg} height='13' width='24' />
                  </Box>
                  <React.Fragment>
                    <Box className='sliderWidth'>
                      <Box className='sliderHeight'> {sliderCommon} </Box>
                    </Box>
                  </React.Fragment>
                  <Typography variant='p3medium' color='secondaryParagraph' className='noMargin'>
                    {text1}{" "}
                  </Typography>
                  <Typography variant='p4medium' color='secondaryParagraph' className='noMargin'>
                    {text2}
                  </Typography>
                </Box>
                <Box className={authoringHelper?.isEditing ? "overlay" : "hideElementClass"}>
                  <Box
                    className='pointer'
                    onClick={() =>
                      secondaryArgs?.multiSlot?.onToggleContentGallery("awards", true)
                    }>
                    <Autorenew className='autorenewIcon' />
                    <Typography className='overLaytextgap' variant='h3regular' color='textColor'>
                      Replace
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </div>
        </Box>
      ) : null}
    </>
  );
};

interface CustomerTestimonial2Props {
  content: Content;
  analytics: Analytics;
  authoringHelper?: AuthoringHelper;
  secondaryArgs?: SecondaryArgs;
}

interface SecondaryArgs {
  prelemBaseEndpoint?: PrelemBaseEndpoint;
  bucketName: string;
  gcpUrl: string;
}

interface PrelemBaseEndpoint {
  device?: string;
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

interface Content {
  title?: string;
  Slots: CustomerTestimonial2Data[];
  TagName?: string;
}

interface CustomerTestimonial2Data {
  description?: string;
  text2?: string;
  text1?: string;
  image?: any;
}

CustomerTestimonial2.defaultProps = {
  content: {
    title: "Some review of our client",
    Slots: [
      {
        text2: "Lorem ipsumdolor sit amet 1",
        description:
          "1 am sem ex, gravida quis dui et, pretium luctus tellus. Donec enim justo, vestibulum non augue nec, volutpat suscipit augueNullam sem ex, gravida quis dui et, pretium luctus tellus. Donec enim justo, vestibulum non augue nec, volutpat suscipit augue",
        text1: "Neque porro quisquam 1",
        image: {
          Name: "CustomerTestimonial2",
          Url: "machine_assets/1690802122418/public/png/CustomerTestimonialTwo_Web",
          Title: "CustomerTestimonial2",
          Description: "This is for CustomerTestimonial2",
          AltText: "CustomerTestimonial2",
          ext: "png",
          visibility: "public",
          bitStreamId: "",
        },
      },
      {
        text2: "Lorem ipsumdolor sit amet 2",
        description:
          "2 am sem ex, gravida quis dui et, pretium luctus tellus. Donec enim justo, vestibulum non augue nec, volutpat suscipit augueNullam sem ex, gravida quis dui et, pretium luctus tellus. Donec enim justo, vestibulum non augue nec, volutpat suscipit augue",
        text1: "Neque porro quisquam 2",
        image: {
          Name: "Product picture",
          Url: "machine_assets/1690001744940/public/png/ProductDetails",
          Title: "Product picture",
          Description: "This is for Product picture",
          AltText: "Imagecard2",
          Attribution: false,
          ext: "png",
          visibility: "public",
          bitStreamId: "",
        },
      },
      {
        text2: "Lorem ipsumdolor sit amet 3",
        description:
          "3 am sem ex, gravida quis dui et, pretium luctus tellus. Donec enim justo, vestibulum non augue nec, volutpat suscipit augueNullam sem ex, gravida quis dui et, pretium luctus tellus. Donec enim justo, vestibulum non augue nec, volutpat suscipit augue",
        text1: "Neque porro quisquam 3",
        image: {
          Name: "Eiffel Tower picture",
          Url: "machine_assets/1691578533676/public/png/paris4",
          Title: "Eiffel Tower picture",
          Description: "This is for Eiffel Tower picture",
          AltText: "Eiffel Tower picture",
          Attribution: false,
          ext: "png",
          visibility: "public",
          bitStreamId: "",
        },
      },
      {
        text2: "Lorem ipsumdolor sit amet 4",
        description:
          "4 am sem ex, gravida quis dui et, pretium luctus tellus. Donec enim justo, vestibulum non augue nec, volutpat suscipit augueNullam sem ex, gravida quis dui et, pretium luctus tellus. Donec enim justo, vestibulum non augue nec, volutpat suscipit augue",
        text1: "Neque porro quisquam 4",
        image: {
          Name: "Jerusalem ",
          Url: "machine_assets/1691579076835/public/png/Jerusalem",
          Title: "Jerusalem ",
          Description: "This is for Jerusalem ",
          AltText: "Jerusalem ",
          Attribution: false,
          ext: "png",
          visibility: "public",
          bitStreamId: "",
        },
      },
    ],
    TagName: "SiteComponents",
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
    gcpUrl: "https://storage.googleapis.com",
    bucketName: "cropped_image_public",
    prelemBaseEndpoint: {
      device: "",
    },
  },
};

export default React.memo(CustomerTestimonial2);
