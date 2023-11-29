import AutorenewIcon from "@mui/icons-material/Autorenew";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import { Box, Button, Container, Grid, Link, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import Slider from "react-slick";
import loadergif from "../../assets/Data-loader.gif";
import { nullToArray } from "../../utils/helperFns";
import "./DynamicEcommercePrelem.css";
import { getProductDetails } from "./helper";
import { useTranslation } from "react-i18next";
import ActualPrice from "../Ecommerce/ProductDetail/SharedComponents/ActualPrice";
import { addToCartGetCartId } from "../Ecommerce/hepler";
import "../../service/i18n";
import { useCustomStyle } from "./DynamicEcommercePrelem.style";
import fallBackImage from "../../assets/fallBackImage.png";
import { usePrelemImpression } from "Common/ImpressionHooks/PrelemImpressionHook";

const DynamicEcommercePrelem = ({
  content,
  analytics,
  authoringHelper,
  secondaryArgs,
}: DynamicEcommercePrelemProps) => {
  const classes = useCustomStyle();

  const [sliderRef, setSliderRef] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const fromBack = useRef(false);
  const { t } = useTranslation();
  const [queryParamfordata, setQueryParamfordata] = useState<QueryParamfordata>(
    content?.QueryParam,
  );

  const getProducts = async () => {
    setLoading(true);
    const response = await getProductDetails(queryParamfordata, secondaryArgs);
    const { data: { data: { fetchEcomProducts = [] } = {} } = {} } = response;
    if (fetchEcomProducts.length > 0) {
      setSlots(fetchEcomProducts);
    } else {
      setQueryParamfordata({
        ...queryParamfordata,
        pagination: {
          ...queryParamfordata?.pagination,
          start: queryParamfordata?.pagination?.start - 20,
        },
      });
      fromBack.current = true;
    }
    setLoading(false);
  };

  const handlePrevClick = () => {
    if (queryParamfordata?.pagination?.start !== 0 && activeSlide === 0) {
      setQueryParamfordata({
        ...queryParamfordata,
        pagination: {
          ...queryParamfordata?.pagination,
          start: queryParamfordata?.pagination?.start - 20,
        },
      });
      fromBack.current = true;
    } else {
      sliderRef?.slickPrev();
    }
  };

  const handleNextClick = () => {
    if (
      ((sliderRef.state.breakpoint !== 920 &&
        sliderRef.state.breakpoint !== 600 &&
        activeSlide >= sliderRef?.props.children.length - 4) ||
        (sliderRef.state.breakpoint === 920 &&
          activeSlide >= sliderRef?.props.children.length - 2.5) ||
        (sliderRef.state.breakpoint === 600 &&
          activeSlide >= sliderRef?.props.children.length - 1.5)) &&
      sliderRef?.props.children.length === 20
    ) {
      setQueryParamfordata({
        ...queryParamfordata,
        pagination: {
          ...queryParamfordata?.pagination,
          start: queryParamfordata?.pagination?.start + 20,
        },
      });
      fromBack.current = false;
      setActiveSlide(0);
    } else {
      sliderRef?.slickNext();
    }
  };

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const sliderSettings = {
    slidesToShow: 4,
    infinite: false,
    initialSlide: 0,
    autoplaySpeed: 500,
    slidesToScroll: 4,
    speed: 500,
    mobileFirst: true,
    afterChange: (current: number) => setActiveSlide(current),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: false,
        },
      },
      {
        breakpoint: 920,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2,
          initialSlide: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
          arrows: false,
          infinite: false,
        },
      },
    ],
  };

  // const buttonClickEvent = () => {
  //   localStorage.setItem(
  //     "ecommerceQuery",
  //     JSON.stringify(JSON.stringify(queryParamfordata))
  //   );
  //   window.location.href = `${secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint}${secondaryArgs?.prelemBaseEndpoint?.language}/ecommerce/product-listing`;
  // };

  const getSeeAllLink = () => {
    localStorage.setItem("ecommerceQuery", JSON.stringify(JSON.stringify(queryParamfordata)));
    return secondaryArgs?.editState
      ? "#"
      : `${secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint}${secondaryArgs?.prelemBaseEndpoint?.language}/ecommerce/product-listing`;
  };

  const onViewDetails = (productId: string) => {
    //Todo: logic to be added for direct cart navigation.
    window.location.href = `${secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint}${secondaryArgs?.prelemBaseEndpoint?.language}/ecommerce/product-detail?productId=${productId}`;
  };

  const addtoCartAndRedirect = (id: string) => {
    addToCartGetCartId(secondaryArgs, id, 1, true, {}, t("errorRequest"));
  };
  usePrelemImpression(analytics, inView);

  useEffect(() => {
    if (sliderRef && fromBack.current) {
      if (sliderRef.state.breakpoint === 600) {
        sliderRef.slickGoTo(sliderRef?.props.children.length - 1.5, true);
        setActiveSlide(sliderRef?.props.children.length - 1.5);
      } else if (sliderRef.state.breakpoint === 920) {
        sliderRef.slickGoTo(sliderRef?.props.children.length - 2.5, true);
        setActiveSlide(sliderRef?.props.children.length - 2.5);
      } else {
        sliderRef.slickGoTo(sliderRef?.props.children.length - 4, true);
        setActiveSlide(sliderRef?.props.children.length - 4);
      }
      fromBack.current = false;
    }
  }, [sliderRef]);

  useEffect(() => {
    getProducts();
  }, [queryParamfordata]);

  useEffect(() => {
    setQueryParamfordata(content?.QueryParam);
  }, [content?.QueryParam]);

  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.dynamicEcommercePrelem} dynamicEcommercePrelemWrapper`}>
      <Container
        className={
          authoringHelper?.isEditPage
            ? "grid_full_width prelem-py"
            : "grid_container grid_container_nopadding prelem-py"
        }>
        <Grid
          className='dynamic-ecommerce-prelem-slider sliderOverFlow'
          ref={ref}
          container
          xs={12}
          md={12}>
          <Grid item xs={9} md={8} className='headingRow'>
            <Typography id='Title' variant='h2regular' className='title'>
              {content?.Title}
            </Typography>
            {/* <Button
              sx={{
                justifyContent: "flex-start",
                "&:hover": { background: "transparent" },
              }}
              size="small"
              variant="text"
              onClick={
                secondaryArgs?.editState
                  ? (e) => e.preventDefault()
                  : () => buttonClickEvent()
              }
            > */}
            {/* <Typography
              id="LinkText"
              variant="h5regular"
              sx={{
                display: "flex",
                alignItems: "center",
                paddingLeft: "12px",
              }}
            > */}
            {/* {content?.LinkText} */}
            {/* </Typography> */}
            <Link
              id='LinkText'
              href={getSeeAllLink()}
              className='linkText largeScreen'
              rel='noopener noreferrer'
              underline='none'>
              <Typography component='span' className='linkTextItem'>
                {content?.LinkText}
              </Typography>
            </Link>
            {/* </Button> */}
          </Grid>
          <Grid item xs={3} md={4} className='navigationWrapper'>
            <Link
              id='LinkText'
              href={getSeeAllLink()}
              className='linkText smallScreen'
              rel='noopener noreferrer'
              underline='none'>
              <Typography component='span' className='linkTextItem'>
                {content?.LinkText}
              </Typography>
            </Link>
            <Box className='transparentButton' onClick={handlePrevClick}>
              <WestIcon className='nextPreviousButton previousBtn' />
            </Box>
            <Box className='transparentButton' onClick={handleNextClick}>
              <EastIcon className='nextPreviousButton' />
            </Box>
          </Grid>
          <Box
            className='overlayPosition'
            sx={{
              margin: loading || !slots || slots.length === 0 ? "0 auto" : "8px 0px 0px",
              position: "relative",
              // "&:hover": {
              //   ".add-content-overlay": {
              //     display: authoringHelper?.isEditing ? "flex" : "none",
              //   },
              // },
            }}>
            <Grid item xs={12} md={12}>
              {loading || !slots || slots.length === 0 ? (
                <Box className='sliderImgWrapper'>
                  <img alt='loader' src={loadergif} width='64' height='64' className='imgProp' />
                </Box>
              ) : (
                <Slider ref={setSliderRef} {...sliderSettings}>
                  {slots &&
                    slots.length > 0 &&
                    slots.map((card: any, index: number) => (
                      <Grid
                        item
                        key={`${card?.ecomx_name}_${index.toString()}`}
                        className='article pointer'
                        onClick={() => onViewDetails(card.id)}>
                        <Box className='image-container'>
                          <Box className='imgWrapper'>
                            <img
                              className='image'
                              src={
                                nullToArray(card?.attr_images).length > 0
                                  ? card?.attr_images[0]
                                  : fallBackImage
                              }
                              alt='background'
                              height='100%'
                              onError={(e: any) => {
                                if (e.target.src !== fallBackImage) {
                                  e.target.onerror = null;
                                  e.target.src = fallBackImage;
                                }
                              }}
                            />
                          </Box>
                          <Box className='hidden-button buttonItem'>
                            <Button
                              variant='primaryButton1'
                              onClick={(event) => {
                                event.stopPropagation();
                                if (!JSON.parse(card?.ecomx_in_stock)) return;
                                addtoCartAndRedirect(card.id);
                              }}>
                              {JSON.parse(card?.ecomx_in_stock)
                                ? t("add_to_cart")
                                : t("out_of_stock")}
                            </Button>
                          </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Typography
                            className='ellipsisTextof1line noGapBottom topheading'
                            variant='p4medium'>
                            {card?.attribute?.brand}
                          </Typography>
                          <Typography
                            className='ellipsisTextof2lines noGapBottom'
                            variant='p3semibold'>
                            {card?.ecomx_name}
                          </Typography>
                          <ActualPrice
                            price={card?.ecomx_sale_price}
                            currency={card?.ecomx_currency_code}
                            variant='p3regular'
                            className='priceItem'
                          />
                        </Box>
                      </Grid>
                    ))}
                </Slider>
              )}
            </Grid>
            <Box className={authoringHelper?.isEditing ? "overlay" : "hideElementClass"}>
              <Box
                className='pointer1'
                onClick={() =>
                  secondaryArgs?.multiSlot?.eComContentGalleryHandle(
                    JSON.stringify(content?.QueryParam),
                    false,
                  )
                }>
                <AutorenewIcon className='autorenewIcon' />
                <Typography className='overLaytextgap' variant='h3regular' color='textColor'>
                  Replace
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Container>
    </div>
  );
};
interface DynamicEcommercePrelemProps {
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
  Description?: string;
  LinkText?: string;
  PrelemContentType?: [string];
  QueryParam?: QueryParamfordata;
  TagName?: string;
  Title?: string;
}

interface QueryParamfordata {
  pagination: Pagination;
  searchTerm: string;
  tags: [string];
  filter: string;
  isSuggestive: boolean;
  ecommerceRequest: EcommerceRequest;
}

interface Pagination {
  start: number;
  rows: number;
}

interface EcommerceRequest {
  filter: [string];
}

DynamicEcommercePrelem.defaultProps = {
  content: {
    Description:
      "Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet",
    LinkText: "See all",
    PrelemContentType: ["Select"],
    QueryParam: {
      pagination: {
        start: 0,
        rows: 20,
      },
      searchTerm: "",
      tags: [],
      filter: "Ecommerce",
      isSuggestive: false,
      ecommerceRequest: {
        filter: [],
      },
    },
    TagName: "SiteComponents",
    Title: "Lorem ipsum dolor sit amet",
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
    prelemBaseEndpoint: {
      deliveryEndPoint: "http://platx-delivery-dev.fanuep.com/platform-x/",
      APIEndPoint: "https://platx-api-dev.fanuep.com/platform-x/",
      device: "window",
      buttonBaseUrl: "https://platx-publish-dev.fanuep.com/",
      gatewayURL: "https://platx-api-dev.fanuep.com/platform-x/v1/authoring/gateway",
    },
    editState: false,
    multiSlot: {},
  },
};

export default DynamicEcommercePrelem;
