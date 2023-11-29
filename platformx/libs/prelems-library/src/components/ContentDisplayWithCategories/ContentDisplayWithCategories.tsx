import AutorenewIcon from "@mui/icons-material/Autorenew";
import { Box, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import Slider from "react-slick";
import "../../Style.css";
import Business from "../../assets/svgIcon/Business.svg";
import Fashion from "../../assets/svgIcon/Fashion.svg";
import Lifestyle from "../../assets/svgIcon/Lifestyle.svg";
import Sports from "../../assets/svgIcon/Sports.svg";
import TechNews from "../../assets/svgIcon/TechNews.svg";
import Travel from "../../assets/svgIcon/Travel.svg";
import ArrowAnimated from "../../assets/svgIcon/animatedarrow.svg";
import { formCroppedUrl, getLandingPageURL } from "../../utils/helperFns";
import ImageVideoGalleryModalSlider from "../ImageVideoGalleryModalSlider/ImageVideoGalleryModalSlider";
import "./ContentDisplayWithCategories.css";
import { prelemTypes } from "../../theme/globalStyle";
import { useCustomStyle } from "./ContentDisplayWithCategories.style";
import { formImageUrl } from "components/DynamicPrelem/helper";
import { usePrelemImpression } from "Common/ImpressionHooks/PrelemImpressionHook";
import { createClickImpression } from "Common/ImpressionHooks/helper";
import { IMPRESSIONS } from "Common/ImpressionHooks/constants";
import usePlatformAnalytics from "../../analytics/index";

const ContentDisplayWithCategories = ({
  content,
  analytics,
  authoringHelper,
  secondaryArgs,
}: ContentDisplayWithCategoriesProp) => {
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  const firstRender = useRef(true);
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const [modalStatus, setModalStatus] = useState(false);
  const [handleTrack] = usePlatformAnalytics();

  const [sliderData, setSliderData] = useState([]);
  useEffect(() => {
    if (
      content?.Slots?.EditorialItemPath &&
      (content?.Slots?.ContentType === "ImageGallery" ||
        content?.Slots?.ContentType === "VideoGallery" ||
        content?.Slots?.ContentType === "Gallery")
    ) {
      axios
        .get(
          `${secondaryArgs?.prelemBaseEndpoint?.deliveryEndPoint}api/v1/web/en/delivery/multi-slot-content?path=${content?.Slots?.EditorialItemPath}&contentType=${content?.Slots?.ContentType}&documentType=hclplatformx:SiteComponentImageVideoGallery`,
          {
            headers: {
              sitename: secondaryArgs?.sitename,
            },
          },
        )
        .then((res: any) => {
          if (res) {
            let gallery = [];
            if (content?.Slots?.ContentType === "ImageGallery") {
              gallery = res?.data?.data?.fetchMultiSlotContent?.Gallery.map((x: any) => x.Image);
            } else if (content?.Slots?.ContentType === "VideoGallery") {
              gallery = res?.data?.data?.fetchMultiSlotContent?.Gallery.map((x: any) => x.Video);
            } else if (content?.Slots?.ContentType === "Gallery") {
              gallery = res?.data?.data?.fetchMultiSlotContent?.Gallery.map((x: any) => x);
            }
            setSliderData(gallery);
          }
        });
    }
  }, []);

  const defaultStructureData = () => {
    let ContentDisplayWithCategoriesStructureData;
    try {
      ContentDisplayWithCategoriesStructureData = {
        "@context": "http://schema.org/",
        "@type": "ItemList",
      };
    } catch (e) {
      ContentDisplayWithCategoriesStructureData = {};
    }

    return ContentDisplayWithCategoriesStructureData;
  };
  const generateStructureData = () => {
    let ContentDisplayWithCategoriesStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current === true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        ContentDisplayWithCategoriesStructureData = JSON.parse(tempSD);
      } else {
        ContentDisplayWithCategoriesStructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      ContentDisplayWithCategoriesStructureData = defaultStructureData();
    }
    return ContentDisplayWithCategoriesStructureData;
  };
  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    autoplay: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
  }, [
    content?.Slots,
    content?.Category1,
    content?.Category2,
    content?.Category3,
    content?.Category4,
    content?.Category5,
    content?.Category6,
    content?.Category_Counter1,
    content?.Category_Counter2,
    content?.Category_Counter3,
    content?.Category_Counter4,
    content?.Category_Counter5,
    content?.Category_Counter6,
    content?.Title1,
    content?.Title2,
    content?.Title3,
  ]);

  usePrelemImpression(analytics, inView);

  const toggleModalStatus = () => {
    if (!secondaryArgs?.editState) setModalStatus(!modalStatus);
  };
  const triggerAnalytics = (url: string, cardIndex: any) => {
    if (!analytics?.isAuthoring && analytics?.isAnalyticsEnabled) {
      const cardClickObj = {
        prelemSlotNumber: cardIndex + 1,
        contentType: content?.Slots[cardIndex]?.ContentType,
        contentTitle: content?.Slots[cardIndex]?.Title,
        contentUrl: url,
      };
      const cardClickAnalyticsObj = createClickImpression(
        analytics,
        IMPRESSIONS.Card,
        secondaryArgs,
        undefined,
        cardClickObj,
      );
      handleTrack(IMPRESSIONS?.CLICK_IMPRESSION, cardClickAnalyticsObj);
    }
  };

  const onClickCard = (e: any, id: string, index: any) => {
    if (secondaryArgs.editState) {
      e.preventDefault();
    } else {
      if (typeof window !== "undefined") {
        let url = "";
        if (id && id.charAt(0) === "/") {
          // eslint-disable-next-line no-param-reassign
          id = id.substring(1);
        }
        if (content.Slots[index].ContentType === "VOD") {
          url = getLandingPageURL(
            secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint,
            secondaryArgs?.prelemBaseEndpoint?.language,
            "video",
            id,
          );
        } else {
          url = getLandingPageURL(
            secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint,
            secondaryArgs?.prelemBaseEndpoint?.language,
            content.Slots[index].ContentType,
            id,
          );
        }
        triggerAnalytics(url, index);
        if (
          ["ImageGallery", "VideoGallery", "Gallery"].includes(content.Slots[index].ContentType)
        ) {
          toggleModalStatus();
        } else if (url) {
          window.open(url);
        }
      }
    }
  };

  return (
    <Box
      ref={authoringHelper?.innerRef}
      className={`${classes.contentDisplayWithCategories} ${globalClasses.prelemType1} prelem prelemType1 contentDisplayWithCategoriesBg`}>
      <Box ref={ref}>
        <Container
          className={
            authoringHelper?.isEditPage ? "grid_full_width prelem-py" : "grid_container prelem-py"
          }>
          <Grid container>
            <Grid item xs={12} md={12} em={8} className='leftSlider'>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
                <Typography variant='h2medium' id='Title1'>
                  {content.Title1}
                </Typography>
              </Box>
              <Box
                className='contentDisplayWithCategories'
                sx={{
                  "&:hover": {
                    ".add-content-overlay": {
                      display: authoringHelper?.authoringHoverShow ? "flex !important" : "none",
                    },
                  },
                }}>
                {content?.Slots.length > 0 ? (
                  <Slider {...settings}>
                    {content?.Slots &&
                      content?.Slots.map((value: any, index: any) => {
                        const { Url = "" } = value?.background_content || {};
                        const formedURlforImage = formImageUrl(value, Url, secondaryArgs);
                        return (
                          <Box
                            className='leftImageWrapper'
                            key={index}
                            onClick={(e) => onClickCard(e, value?.EditorialItemPath, index)}
                            sx={{
                              backgroundColor:
                                value?.background_content?.Url === "" &&
                                value?.background_content?.Color,
                            }}>
                            <img
                              src={formedURlforImage}
                              alt='image'
                              width='100%'
                              height='100%'
                              className='imageCard'
                            />
                            <Box className='cardTextWrapper'>
                              <Typography
                                variant='p1medium'
                                color='textColor'
                                id='Title3'
                                className='marginZero'>
                                {value.Title}
                              </Typography>
                            </Box>
                          </Box>
                        );
                      })}
                  </Slider>
                ) : (
                  <React.Fragment>
                    <Box className='noDataFoundWrapper'>
                      <img
                        src={formCroppedUrl(
                          secondaryArgs?.gcpUrl,
                          secondaryArgs?.bucketName,
                          secondaryArgs?.noResultImg?.Url,
                          "png",
                        )}
                        alt='NoDataFound'
                      />
                    </Box>
                    <Typography variant='h2' className='noDataAlingment'>
                      No data found
                    </Typography>
                  </React.Fragment>
                )}
                <Box className='add-content-overlay'>
                  <Box
                    className='pointer'
                    onClick={() => secondaryArgs?.multiSlot?.onToggleContentGallery()}>
                    <AutorenewIcon className='replaceIconWrapper' />
                    <Typography variant='p1regular' color='textColor'>
                      Replace
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={12} em={4} className='hotcategoryheading'>
              <Typography variant='h2medium' id='Title2'>
                {content.Title2}
              </Typography>
              <Box className='hotcategoryWrapper'>
                <Box className='hotcatmn'>
                  <Box className='icon'>
                    <img alt='image1' src={Business} />
                  </Box>
                  <Box className='contentwp'>
                    <Typography variant='p3medium' className='marginZero' id='Category1'>
                      {content.Category1}
                    </Typography>
                    {secondaryArgs?.editState ? (
                      <Typography variant='p3medium' className='marginZero' id='Category_Counter1'>
                        {parseInt(content.Category_Counter1)}
                      </Typography>
                    ) : (
                      <Typography variant='p3medium' className='marginZero' id='Category_Counter1'>
                        ({parseInt(content.Category_Counter1)})
                      </Typography>
                    )}
                  </Box>
                  <Box className='righticon'>
                    <img src={ArrowAnimated} alt='Animated Arrow' />
                  </Box>
                </Box>
                <Box className='hotcatmn'>
                  <Box className='icon'>
                    <img alt='image2' src={Fashion} />
                  </Box>
                  <Box className='contentwp'>
                    <Typography variant='p3medium' className='marginZero' id='Category2'>
                      {content.Category2}
                    </Typography>
                    {secondaryArgs?.editState ? (
                      <Typography variant='p3medium' className='marginZero' id='Category_Counter2'>
                        {parseInt(content.Category_Counter2)}
                      </Typography>
                    ) : (
                      <Typography variant='p3medium' className='marginZero' id='Category_Counter2'>
                        ({parseInt(content.Category_Counter2)})
                      </Typography>
                    )}
                  </Box>
                  <Box className='righticon'>
                    <img src={ArrowAnimated} alt='Animated Arrow' />
                  </Box>
                </Box>
                <Box className='hotcatmn'>
                  <Box className='icon'>
                    <img alt='image3' src={Lifestyle} />
                  </Box>
                  <Box className='contentwp'>
                    <Typography variant='p3medium' className='marginZero' id='Category3'>
                      {content.Category3}
                    </Typography>
                    {secondaryArgs?.editState ? (
                      <Typography variant='p3medium' className='marginZero' id='Category_Counter3'>
                        {parseInt(content.Category_Counter3)}
                      </Typography>
                    ) : (
                      <Typography variant='p3medium' className='marginZero' id='Category_Counter3'>
                        ({parseInt(content.Category_Counter3)})
                      </Typography>
                    )}
                  </Box>
                  <Box className='righticon'>
                    <img src={ArrowAnimated} alt='Animated Arrow' />
                  </Box>
                </Box>
                <Box className='hotcatmn'>
                  <Box className='icon'>
                    <img alt='image4' src={Travel} />
                  </Box>
                  <Box className='contentwp'>
                    <Typography variant='p3medium' className='marginZero' id='Category4'>
                      {content.Category4}
                    </Typography>
                    {secondaryArgs?.editState ? (
                      <Typography variant='p3medium' className='marginZero' id='Category_Counter4'>
                        {parseInt(content.Category_Counter4)}
                      </Typography>
                    ) : (
                      <Typography variant='p3medium' className='marginZero' id='Category_Counter4'>
                        ({parseInt(content.Category_Counter4)})
                      </Typography>
                    )}
                  </Box>
                  <Box className='righticon'>
                    <img src={ArrowAnimated} alt='Animated Arrow' />
                  </Box>
                </Box>
                <Box className='hotcatmn'>
                  <Box className='icon'>
                    <img alt='image5' src={Sports} />
                  </Box>
                  <Box className='contentwp'>
                    <Typography variant='p3medium' className='marginZero' id='Category5'>
                      {content.Category5}
                    </Typography>
                    {secondaryArgs?.editState ? (
                      <Typography variant='p3medium' className='marginZero' id='Category_Counter5'>
                        {parseInt(content.Category_Counter5)}
                      </Typography>
                    ) : (
                      <Typography variant='p3medium' className='marginZero' id='Category_Counter5'>
                        ({parseInt(content.Category_Counter5)})
                      </Typography>
                    )}
                  </Box>
                  <Box className='righticon'>
                    <img src={ArrowAnimated} alt='Animated Arrow' />
                  </Box>
                </Box>
                <Box className='hotcatmn'>
                  <Box className='icon'>
                    <img alt='image6' src={TechNews} />
                  </Box>
                  <Box className='contentwp'>
                    <Typography variant='p3medium' className='marginZero' id='Category6'>
                      {content.Category6}
                    </Typography>
                    {secondaryArgs?.editState ? (
                      <Typography variant='p3medium' className='marginZero' id='Category_Counter6'>
                        {parseInt(content.Category_Counter6)}
                      </Typography>
                    ) : (
                      <Typography variant='p3medium' className='marginZero' id='Category_Counter6'>
                        ({parseInt(content.Category_Counter6)})
                      </Typography>
                    )}
                  </Box>
                  <Box className='righticon'>
                    <img src={ArrowAnimated} alt='Animated Arrow' />
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {modalStatus && sliderData && sliderData.length > 0 && !secondaryArgs?.editState && (
        <ImageVideoGalleryModalSlider
          sliderData={sliderData}
          openModal={modalStatus}
          contentType={content?.Slots?.ContentType}
          handleClose={toggleModalStatus}
        />
      )}
    </Box>
  );
};

interface ContentDisplayWithCategoriesProp {
  content: Content;
  analytics?: Analytics;
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
  authoringHoverShow: boolean;
}
interface Content {
  TagName?: string;
  Title1?: string;
  Title2?: string;
  Title3?: string;
  Category1?: string;
  Category2?: string;
  Category3?: string;
  Category4?: string;
  Category5?: string;
  Category6?: string;
  Category_Counter1: string;
  Category_Counter2: string;
  Category_Counter3: string;
  Category_Counter4: string;
  Category_Counter5: string;
  Category_Counter6: string;
  URL: string;
  QueryParam: {
    filter: string;
    tags: [];
    searchTerm: string;
    pagination: any;
  };
  Slots?: any;
  published_images: PublishedImage[];
}
interface PublishedImage {
  aspect_ratio: string;
  bucket_path: string;
  folder_path: string;
  visibility: string;
  ext: string;
}

ContentDisplayWithCategories.defaultProps = {
  content: {
    Category1: "Business",
    Category2: "Fashion",
    Category3: "Lifestyle",
    Category4: "Travel",
    Category5: "Sport",
    Category6: "Tech news",
    Category_Counter1: "20",
    Category_Counter2: "120",
    Category_Counter3: "70",
    Category_Counter4: "80",
    Category_Counter5: "17",
    Category_Counter6: "20",
    QueryParam: {
      filter: "ALL",
      tags: [],
      searchTerm: "",
      pagination: {
        start: 0,
        rows: 9,
      },
    },
    TagName: "SiteComponents",
    Title1: "Lorem ipsum dolor sit amet",
    Title2: "Lorem ipsum dolor sit amet",
    PrelemContentType: [
      "ImageGallery",
      "VideoGallery",
      "Gallery",
      "Accolades",
      "Article",
      "Vod",
      "Quiz",
      "Poll",
      "Event",
    ],
    Slots: [
      {
        Title:
          "The Global Phenomenon of the FIFA World Cup: A Unifying Force in Football in manchester united city.",
        Banner: "",
        background_content: {
          objectType: "image",
          ext: "png",
          Url: "1699613113305/public/png/changes-to-the-laws-of-the-game-2022-23-800x450",
          Title: "",
          Thumbnail: "1699613113305/public/png/changes-to-the-laws-of-the-game-2022-23-800x450",
          Color: "",
        },
        Thumbnail: {
          Name: "the-global-phenomenon-of-the-fifa-world-cup-a-unifying-force-in-football-in-manchester-united-city-",
          Url: "https://dev.dam.hcl-x.com/server/api/core/bitstreams/32e741aa-66c9-4586-9464-cd7a7f90111a/content",
          Title:
            "The Global Phenomenon of the FIFA World Cup: A Unifying Force in Football in manchester united city.",
          Description:
            "The FIFA World Cup, an unparalleled celebration of football, captures the hearts of millions every four years, transcending geographical boundaries and cultural differences. From its humble beginnings in 1930 in Uruguay to the present-day global extravaganza, the World Cup has evolved into a multi-billion-dollar spectacle, showcasing not only the pinnacle of footballing talent but also serving as a powerful unifying force across nations. In this exploration, we delve into the historical roots, format evolution, cultural impact, economic implications, unforgettable moments, and the role of the Women's World Cup, dissecting the various facets that contribute to the magic of the World Cup.\nThe origins of the World Cup can be traced back to 1930 when Uruguay hosted the inaugural tournament, featuring 13 teams. The competition has since grown exponentially, adapting to the changing landscape of international football. The evolution of the tournament format has seen an increase in participat",
          Attribution: false,
          AltText:
            "The Global Phenomenon of the FIFA World Cup: A Unifying Force in Football in manchester united city.",
          ext: "png",
          visibility: "public",
        },
        Description:
          "The FIFA World Cup, an unparalleled celebration of football, captures the hearts of millions every four years, transcending geographical boundaries and cultural differences. From its humble beginnings in 1930 in Uruguay to the present-day global extravaganza, the World Cup has evolved into a multi-billion-dollar spectacle, showcasing not only the pinnacle of footballing talent but also serving as a powerful unifying force across nations. In this exploration, we delve into the historical roots, format evolution, cultural impact, economic implications, unforgettable moments, and the role of the Women's World Cup, dissecting the various facets that contribute to the magic of the World Cup.\nThe origins of the World Cup can be traced back to 1930 when Uruguay hosted the inaugural tournament, featuring 13 teams. The competition has since grown exponentially, adapting to the changing landscape of international football. The evolution of the tournament format has seen an increase in participat",
        PublishedDate: "2023-11-22T06:19:36Z",
        lastModifiedDate: "2023-11-22T06:19:27Z",
        ContentType: "Event",
        tags: '["Events"]',
        Author: "upendra k",
        CurrentPageURL:
          "/the-global-phenomenon-of-the-fifa-world-cup-a-unifying-force-in-football-in-manchester-united-city-",
        hclplatformx_EditorialTags:
          "the-global-phenomenon-of-the-fifa-world-cup-a-unifying-force-in-football-in-manchester-united-city-",
        EditorialItemPath:
          "the-global-phenomenon-of-the-fifa-world-cup-a-unifying-force-in-football-in-manchester-united-city-",
        PublishedBy: "upendra",
        Id: "the-global-phenomenon-of-the-fifa-world-cup-a-unifying-force-in-football-in-manchester-united-city-",
        EventEndDate: "2023-11-29T20:40:00Z",
        EventStartDate: "2023-11-24T18:30:00Z",
        GoogleApiAddress: "www.google.com",
      },
      {
        Title: "Digital Transformation Banner VOD",
        Thumbnail: {
          Name: "digital-transformation-banner-vod",
          Url: "https://dev.dam.hcl-x.com/server/api/core/bitstreams/25bb468d-438a-41bc-adf1-b40dd11ba3e8/content",
          Title: "Digital Transformation Banner VOD",
          Description: "",
          Attribution: false,
          AltText: "Digital Transformation Banner VOD",
        },
        EditorialItemPath: "digital-transformation-banner-vod",
        Description: "",
        Id: "digital-transformation-banner-vod",
        ContentType: "VOD",
        PublishedBy: "upendra",
        CurrentPageURL: "/digital-transformation-banner-vod",
        PublishedDate: "2023-11-21T10:20:29Z",
      },
      {
        Title: "new events",
        Banner: "",
        background_content: {
          objectType: "image",
          ext: "png",
          Url: "1699613220720/public/png/Banner-1",
          Title: "",
          Thumbnail: "1699613220720/public/png/Banner-1",
          Color: "",
        },
        Thumbnail: {
          Name: "new-events",
          Url: "https://dev.dam.hcl-x.com/server/api/core/bitstreams/4d262e20-3d62-47ff-9ce9-d9ef1408a6c4/content",
          Title: "new events",
          Description: "new description",
          Attribution: false,
          AltText: "new events",
          ext: "png",
          visibility: "public",
        },
        Description: "new description",
        PublishedDate: "2023-11-21T10:00:09Z",
        lastModifiedDate: "2023-11-21T10:00:05Z",
        ContentType: "Event",
        tags: '["Events"]',
        Author: "upendra k",
        CurrentPageURL: "/new-events",
        hclplatformx_EditorialTags: "new-events",
        EditorialItemPath: "new-events",
        PublishedBy: "upendra",
        Id: "new-events",
        GoogleApiAddress: "www.google.com",
      },
      {
        Title: "Videography Tutorial",
        Thumbnail: {
          Name: "videography-tutorial",
          Url: "https://dev.dam.hcl-x.com/server/api/core/bitstreams/92726c1b-6f59-4e0c-a92d-d89b2b526377/content",
          Title: "Videography Tutorial",
          Description: "Nikon",
          Attribution: false,
          AltText: "Videography Tutorial",
        },
        EditorialItemPath: "videography-tutorial",
        Description: "Nikon",
        Id: "videography-tutorial",
        ContentType: "VOD",
        PublishedBy: "sahbaz",
        CurrentPageURL: "/videography-tutorial",
        PublishedDate: "2023-11-21T06:37:20Z",
      },
      {
        Title: "Poll About ODI World Cup 2023 Final",
        Banner: "",
        background_content: {
          objectType: "image",
          Url: "1700463877332/public/jpeg/1",
          Title: "",
          Thumbnail: "1700463877332/public/jpeg/1",
          Color: "",
          ext: "jpg",
        },
        Thumbnail: {
          Name: "poll-about-odi-world-cup-2023-final",
          Url: "1700463877332/public/jpeg/1",
          Title: "Poll About ODI World Cup 2023 Final",
          Description: "ODI World Cup",
          Attribution: false,
          AltText: "Poll About ODI World Cup 2023 Final",
          ext: "jpg",
          visibility: "public",
        },
        Description: "ODI World Cup",
        PublishedDate: "2023-11-20T09:15:43Z",
        lastModifiedDate: "2023-11-20T09:15:16Z",
        ContentType: "Poll",
        tags: '["Polls","MS Dhoni"]',
        Author: "Vinay Gupta",
        CurrentPageURL: "/poll-about-odi-world-cup-2023-final",
        hclplatformx_EditorialTags: "poll-about-odi-world-cup-2023-final",
        EditorialItemPath: "poll-about-odi-world-cup-2023-final",
        PublishedBy: "Vinay",
        Id: "poll-about-odi-world-cup-2023-final",
      },
      {
        Title: "Quiz on World Cup 2023 Final",
        Banner: "",
        background_content: {
          objectType: "image",
          Url: "1699613220720/public/png/Banner-1",
          Title: "",
          Thumbnail: "1699613220720/public/png/Banner-1",
          Color: "",
          ext: "png",
        },
        Thumbnail: {
          Name: "quiz-on-world-cup-2023-final",
          Url: "1699613220720/public/png/Banner-1",
          Title: "Quiz on World Cup 2023 Final",
          Description: "World Cup",
          Attribution: false,
          AltText: "Quiz on World Cup 2023 Final",
          ext: "png",
          visibility: "public",
        },
        Description: "World Cup",
        PublishedDate: "2023-11-20T09:01:00Z",
        lastModifiedDate: "2023-11-20T09:00:32Z",
        ContentType: "Quiz",
        tags: '["Quiz","MS Dhoni"]',
        Author: "Vinay Gupta",
        CurrentPageURL: "/quiz-on-world-cup-2023-final",
        hclplatformx_EditorialTags: "quiz-on-world-cup-2023-final",
        EditorialItemPath: "quiz-on-world-cup-2023-final",
        PublishedBy: "Vinay",
        Id: "quiz-on-world-cup-2023-final",
      },
      {
        Title: "ODI World Cup 2023 Winner",
        Banner:
          "https://dev.dam.hcl-x.com/server/api/core/bitstreams/e99f820a-d42e-4ad3-a818-4d2470fed186/content",
        Thumbnail: {
          Name: "odi-world-cup-2023-winner",
          Url: "1700462997165/public/jpeg/world-cup",
          Title: "ODI World Cup 2023 Winner",
          Description:
            'The 2023 ODI World Cup was an exciting tournament from start to finish, with many great teams vying for the title of champion. After a thrilling competition that spanned several months, India came out on top as the winner of the 2023 ODI World Cup. It\'s the second time India has won the tournament, having previously taken home the title in 2011.India had a strong run throughout the tournament, showing they were ready to take on any opponent. In the group stages, India won six out of their seven games, with their only loss coming against defending champions England. However, they bounced back in the knockout stages with a comprehensive win over Bangladesh and then a tight victory against Australia in the semi-finals. The final was an even more impressive display, as India beat their arch-nemesis Pakistan in a match full of drama and excitement to take home their second ODI World Cup title.India\'s victory was made even sweeter when captain Virat Kohli was awarded the player of the tournament. His strong leadership and ability to keep his team focussed and motivated helped them ensure their victory in a tough competition. This win now gives India more confidence than ever going into future tournaments and puts them in a great position to defend their title in future editions of the ODI World Cup.<div class="Platform-x-Box-root css-0"><div><div class="content" style="position:relative"><div style="position:absolute;left:0;top:0;height:100%;width:100%"><img style="width:100%;object-fit:cover;height:100%" src="https://storage.googleapis.com/cropped_image_public/https://dev.dam.hcl-x.com/server/api/core/bitstreams/21be4498-10b2-480c-956e-9fddd23738ad/content.undefined"></div><div style="position:relative;bottom:0;left:0;padding:2% 3%;background-image:linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, #000 100%);width:100%;height:100%;display:flex;align-items:end;min-height:224px"><div><h1 style="font-size:28px;font-weight:bold;color:#fff;text-transform:uppercase;-webkit-line-clamp:1;text-overflow:ellipsis;overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;word-wrap:break-word">HCLTech speaks on Supercharging Progress™</h1><h1 style="font-size:16px;font-weight:500;color:#fff !important;-webkit-line-clamp:2;text-overflow:ellipsis;overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;word-wrap:break-word">HCLTECH</h1><a rel="noreferrer" style="text-decoration:none;width:140px;height:40px" target="_blank" href="https://health.care.hcl-x.com/en/vod//hcltech-speaks-on-supercharging-progress-"><button style="padding:0 8px;border-radius:4px;background-color:#fff;width:140px;height:40px;display:inline-flex;align-items:center;justify-content:center;cursor:pointer">View VOD<img style="margin-left:10px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYBAMAAAASWSDLAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAYUExURUdwTC0tOjAwOC0tOS0tOS0tOi0tOi0tOeUh8s4AAAAHdFJOUwCfIHnfkM+S7anqAAAAKklEQVQY02NgGEigrIDEMXcCkcyCYJBeApJiL4eCAHQZFD1QoKpAP5cDANFOCFKKojrfAAAAAElFTkSuQmCC"></button></a></div></div></div></div><br><br></div><img src="https://dev.dam.hcl-x.com/server/api/core/bitstreams/6eecb253-7220-4edb-868b-ad251d9d0cb7/content" class="descAsset" style="display:block;object-fit:cover"><br><br>',
          Attribution: false,
          AltText: "ODI World Cup 2023 Winner",
          ext: "jpg",
          visibility: "public",
        },
        Description:
          'The 2023 ODI World Cup was an exciting tournament from start to finish, with many great teams vying for the title of champion. After a thrilling competition that spanned several months, India came out on top as the winner of the 2023 ODI World Cup. It\'s the second time India has won the tournament, having previously taken home the title in 2011.India had a strong run throughout the tournament, showing they were ready to take on any opponent. In the group stages, India won six out of their seven games, with their only loss coming against defending champions England. However, they bounced back in the knockout stages with a comprehensive win over Bangladesh and then a tight victory against Australia in the semi-finals. The final was an even more impressive display, as India beat their arch-nemesis Pakistan in a match full of drama and excitement to take home their second ODI World Cup title.India\'s victory was made even sweeter when captain Virat Kohli was awarded the player of the tournament. His strong leadership and ability to keep his team focussed and motivated helped them ensure their victory in a tough competition. This win now gives India more confidence than ever going into future tournaments and puts them in a great position to defend their title in future editions of the ODI World Cup.<div class="Platform-x-Box-root css-0"><div><div class="content" style="position:relative"><div style="position:absolute;left:0;top:0;height:100%;width:100%"><img style="width:100%;object-fit:cover;height:100%" src="https://storage.googleapis.com/cropped_image_public/https://dev.dam.hcl-x.com/server/api/core/bitstreams/21be4498-10b2-480c-956e-9fddd23738ad/content.undefined"></div><div style="position:relative;bottom:0;left:0;padding:2% 3%;background-image:linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, #000 100%);width:100%;height:100%;display:flex;align-items:end;min-height:224px"><div><h1 style="font-size:28px;font-weight:bold;color:#fff;text-transform:uppercase;-webkit-line-clamp:1;text-overflow:ellipsis;overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;word-wrap:break-word">HCLTech speaks on Supercharging Progress™</h1><h1 style="font-size:16px;font-weight:500;color:#fff !important;-webkit-line-clamp:2;text-overflow:ellipsis;overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;word-wrap:break-word">HCLTECH</h1><a rel="noreferrer" style="text-decoration:none;width:140px;height:40px" target="_blank" href="https://health.care.hcl-x.com/en/vod//hcltech-speaks-on-supercharging-progress-"><button style="padding:0 8px;border-radius:4px;background-color:#fff;width:140px;height:40px;display:inline-flex;align-items:center;justify-content:center;cursor:pointer">View VOD<img style="margin-left:10px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYBAMAAAASWSDLAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAYUExURUdwTC0tOjAwOC0tOS0tOS0tOi0tOi0tOeUh8s4AAAAHdFJOUwCfIHnfkM+S7anqAAAAKklEQVQY02NgGEigrIDEMXcCkcyCYJBeApJiL4eCAHQZFD1QoKpAP5cDANFOCFKKojrfAAAAAElFTkSuQmCC"></button></a></div></div></div></div><br><br></div><img src="https://dev.dam.hcl-x.com/server/api/core/bitstreams/6eecb253-7220-4edb-868b-ad251d9d0cb7/content" class="descAsset" style="display:block;object-fit:cover"><br><br>',
        PublishedDate: "2023-11-20T08:54:15Z",
        lastModifiedDate: "2023-11-20T08:54:03Z",
        ContentType: "Article",
        tags: '["Articles"]',
        Author: "Vinay Gupta",
        CurrentPageURL: "/odi-world-cup-2023-winner",
        hclplatformx_EditorialTags: "odi-world-cup-2023-winner",
        EditorialItemPath: "odi-world-cup-2023-winner",
        PublishedBy: "Vinay",
        Id: "odi-world-cup-2023-winner",
      },
      {
        Title: "1698764899797---cricket-poll-2023",
        Banner: "",
        background_content: {
          objectType: "image",
          Url: "1699613113305/public/png/changes-to-the-laws-of-the-game-2022-23-800x450",
          Title: "",
          Thumbnail: "1699613113305/public/png/changes-to-the-laws-of-the-game-2022-23-800x450",
          Color: "",
          ext: "png",
        },
        Thumbnail: {
          Name: "1698764899797---cricket-poll-2023",
          Url: "1699613113305/public/png/changes-to-the-laws-of-the-game-2022-23-800x450",
          Title: "1698764899797---cricket-poll-2023",
          Description: "ODI",
          Attribution: false,
          AltText: "1698764899797---cricket-poll-2023",
          ext: "png",
          visibility: "public",
        },
        Description: "ODI",
        PublishedDate: "2023-11-20T07:26:34Z",
        lastModifiedDate: "2023-11-20T07:26:12Z",
        ContentType: "Poll",
        tags: '["MS Dhoni","Polls","cricket"]',
        Author: "Vinay Gupta",
        CurrentPageURL: "/1698764899797---cricket-poll-2023",
        hclplatformx_EditorialTags: "1698764899797---cricket-poll-2023",
        EditorialItemPath: "1698764899797---cricket-poll-2023",
        PublishedBy: "sahbaz",
        Id: "1698764899797---cricket-poll-2023",
      },
      {
        Title: "HCLTECH Supercharging Event",
        Banner: "",
        background_content: {
          objectType: "image",
          ext: "png",
          Url: "1699602027963/public/png/Banner-3",
          Title: "",
          Thumbnail: "1699602027963/public/png/Banner-3",
          Color: "",
        },
        Thumbnail: {
          Name: "hcltech-supercharging-event",
          Url: "https://dev.dam.hcl-x.com/server/api/core/bitstreams/a97ea65f-53c7-41ee-a126-bf9e218c0f12/content",
          Title: "HCLTECH Supercharging Event",
          Description: "HCLTECH",
          Attribution: false,
          AltText: "HCLTECH Supercharging Event",
          ext: "png",
          visibility: "public",
        },
        Description: "HCLTECH",
        PublishedDate: "2023-11-20T06:59:30Z",
        lastModifiedDate: "2023-11-20T06:59:27Z",
        ContentType: "Event",
        tags: '["Events","Advertising"]',
        Author: "Vinay Gupta",
        CurrentPageURL: "/hcltech-supercharging-event",
        hclplatformx_EditorialTags: "hcltech-supercharging-event",
        EditorialItemPath: "hcltech-supercharging-event",
        PublishedBy: "Vinay",
        Id: "hcltech-supercharging-event",
        EventEndDate: "2023-11-22T00:30:00Z",
        EventStartDate: "2023-11-20T18:30:00Z",
        GoogleApiAddress: "www.google.com",
      },
    ],
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
    authoringHoverShow: false,
  },

  analytics: {
    isSeoEnabled: false,
    isAuthoring: false,
    isAnalyticsEnabled: true,
    position: 0,
    pageId: 19,
    prelemId: 19,
    pageTitle: "Content Display With Categories",
    pageDesc:
      "This prelem can be used to create an image carousel of 5 images. All the image will have some text & CTA. Users can use it as the hero banner of the website.",
    pageTags: "Image Carousel, Images, Gallery, Hero Banner",
    prelemTags: "Image Carousel, Images, Gallery, Hero Banner",
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
    noResultImg: "machine_assets/1689600462756/public/png/Prelem_UI_Icons1",
  },
};

export default ContentDisplayWithCategories;
