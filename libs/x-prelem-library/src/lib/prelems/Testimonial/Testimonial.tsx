import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import Slider from "react-slick";
import "../../Style.css";
import "./Testimonial.css";
import { useCustomStyle } from "./Testimonial.style";
import prelemTypes from "../../globalStyle";
import { usePrelemImpression } from "../../components/ImpressionHooks/PrelemImpressionHook";
import { TestimonialImg } from "@platformx/utilities";

const Testimonial = ({ content, analytics, authoringHelper, secondaryArgs }: TestimonialProps) => {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const firstRender = useRef(true);

  const windowSettings = {
    slidesToShow: 3,
    slidesToScroll: 3,
    infinite: false,
    dots: false,
    arrow: true,
    //adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          autoPlay: true,
          infinite: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoPlay: true,
          infinite: false,
        },
      },
    ],
  };

  const tabletSettings = {
    slidesToShow: 2,
    slidesToScroll: 2,
    infinite: false,
    dots: false,
    arrow: false,
  };

  const mobileSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    dots: false,
    arrow: false,
  };

  const sliderSettings =
    secondaryArgs?.prelemBaseEndpoint?.device === "tablet"
      ? { ...tabletSettings }
      : secondaryArgs?.prelemBaseEndpoint?.device === "mobile"
      ? { ...mobileSettings }
      : { ...windowSettings };

  const defaultStructureData = () => {
    let testimonialStructureData;
    try {
      testimonialStructureData = {
        "@context": "http://schema.org/",
        "@type": "ItemList",
        name: content?.Heading,
        itemListElement: content?.Testimonials?.map((item, key) => {
          return {
            "@type": "ListItem",
            position: key + 1,
            item: {
              "@type": "review",
              name: item?.AuthorName,
              description: item?.TestimonialText,
            },
          };
        }),
      };
    } catch (e) {
      testimonialStructureData = {};
    }

    return testimonialStructureData;
  };

  const generateStructureData = () => {
    let testimonialStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current === true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        testimonialStructureData = JSON.parse(tempSD);
      } else {
        testimonialStructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      testimonialStructureData = defaultStructureData();
    }
    return testimonialStructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content?.Heading, content?.Testimonials]);

  usePrelemImpression(analytics, inView, secondaryArgs);
  /* AnalyticsEnabled dependency added as many times we are not getting analytics provider*async call)
  1. we are first checking in publish app if analytics provider is avaiable or not
  2. if its available we are setting AnalyticsEnabled to true
  3. if its not available we are setting false
  */

  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.testimonialSliderWrapper} ${globalClasses.prelemType1} prelem prelemType1 testimonialSlider testimonialSliderBg`}>
      <Container
        className={
          authoringHelper?.isEditPage ? `grid_full_width prelem-py` : `grid_container prelem-py`
        }
        ref={ref}>
        <Typography variant='h2semibold' id='Heading' className='testimonialHeading'>
          {content?.Heading}
        </Typography>
        <Slider {...sliderSettings} className='editContent'>
          {content?.Testimonials?.map((items, key) => (
            <Card className='testimonialCardWrapper' key={key}>
              <CardContent>
                <Box className='my20'>
                  <img
                    alt='testimonial'
                    src={TestimonialImg}
                    width='67'
                    height='54'
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Typography variant='p3regular' className='textTruncated3Line cardDescription'>
                  {items?.TestimonialText}
                </Typography>
                <Typography variant='p4bold' className='my20 title'>
                  {items?.AuthorName}
                </Typography>
                <Typography className='cardDescription' variant='p3regular'>
                  {items?.AuthorDesignation}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Slider>
      </Container>
    </div>
  );
};

interface TestimonialProps {
  content: Content;
  analytics: Analytics;
  authoringHelper?: AuthoringHelper;
  secondaryArgs?: any;
}

// interface SecondaryArgs {
//   prelemImpressionSchema?: string;
//   clickImpressionSchema?: string;
//   prelemBaseEndpoint?: PrelemBaseEndpoint;
// }

// interface PrelemBaseEndpoint {
//   device?: string;
// }
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
  Heading?: string;
  Testimonials: TestimonialData[];
  TagName?: string;
}

interface TestimonialData {
  TestimonialText?: string;
  AuthorName?: string;
  AuthorDesignation?: string;
}

Testimonial.defaultProps = {
  content: {
    Heading: "Lorem ipsum dolor",
    Testimonials: [
      {
        TestimonialText:
          "Nullam sem ex, gravida quis dui et, pretium luctus tellus. Donec enim justo, vestibulum non augue nec, volutpat suscipit augue",
        AuthorName: "Lorem ipsumdolor sit amet",
        AuthorDesignation: "Neque porro quisquam",
      },
      {
        TestimonialText:
          "Nullam sem ex, gravida quis dui et, pretium luctus tellus. Donec enim justo, vestibulum non augue nec, volutpat suscipit augue",
        AuthorName: "Lorem ipsumdolor sit amet",
        AuthorDesignation: "Neque porro quisquam",
      },
      {
        TestimonialText:
          "Nullam sem ex, gravida quis dui et, pretium luctus tellus. Donec enim justo, vestibulum non augue nec, volutpat suscipit augue",
        AuthorName: "Lorem ipsumdolor sit amet",
        AuthorDesignation: "Neque porro quisquam",
      },
      {
        TestimonialText:
          "Nullam sem ex, gravida quis dui et, pretium luctus tellus. Donec enim justo, vestibulum non augue nec, volutpat suscipit augue",
        AuthorName: "Lorem ipsumdolor sit amet",
        AuthorDesignation: "Neque porro quisquam",
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

export default Testimonial;
