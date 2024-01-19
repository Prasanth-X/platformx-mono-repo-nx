import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import ImageRender from "../../components/ImageRender";
import TwoColumnLayout from "../../components/layouts/TwoColumns/TwoColumnLayout";
import { formCroppedUrl, handleHtmlTags, PhoneIcon } from "@platformx/utilities";
import { useCustomStyle } from "./CoreHighlights.style";
import prelemTypes from "../../globalStyle";
import "../../Style.css";
import { usePrelemImpression } from "../../components/ImpressionHooks/PrelemImpressionHook";

// ts-ignore
const CoreHighlights = ({
  content,
  analytics,
  authoringHelper,
  secondaryArgs,
}: //secondaryArgs,
CoreHighlightsProp) => {
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();

  const firstRender = useRef(true);

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const defaultStructureData = () => {
    let CoreHighlightsStructureData;
    const { original_image_relative_path, ext }: any =
      content?.ImageCompound?.ImageCompound_1?.original_image || {};
    const img = formCroppedUrl(
      secondaryArgs?.gcpUrl,
      secondaryArgs?.bucketName,
      original_image_relative_path,
      ext,
    );

    try {
      CoreHighlightsStructureData = {
        "@context": "http://schema.org/",
        "@type": "ContactPage",
        description: handleHtmlTags(content?.description),
        image: img,
        name: content?.title,
      };
    } catch (e) {
      CoreHighlightsStructureData = {};
    }

    return CoreHighlightsStructureData;
  };

  const generateStructureData = () => {
    let CoreHighlightsStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current === true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        CoreHighlightsStructureData = JSON.parse(tempSD);
      } else {
        CoreHighlightsStructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      CoreHighlightsStructureData = defaultStructureData();
    }
    return CoreHighlightsStructureData;
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
    content?.description,
    content?.ImageCompound?.ImageCompound_1?.original_image,
    content?.title,
  ]);

  usePrelemImpression(analytics, inView, secondaryArgs);

  /* AnalyticsEnabled dependency added as many times we are not getting analytics provider*async call)
  1. we are first checking in publish app if analytics provider is avaiable or not
  2. if its available we are setting AnalyticsEnabled to true
  3. if its not available we are setting false
*/
  const gridVal = {
    md: [12, 12],
    em: [6, 6],
    lg: [6, 6],
  };
  const firstColumnContent = () => {
    return (
      <Box className='leftImgBox'>
        <Box className='middleBoxWp'>
          <Typography variant='h1largebold' color='secondaryLabel'>
            {content.coretitle}+
          </Typography>
          <Typography variant='p3bold' color='secondaryLabel'>
            {content.coredescription}
          </Typography>
        </Box>
        <Box className='widthheight100'>
          <Grid container>
            <Grid xs={6} className='spRight'>
              <Box className='ImgBox'>
                <Box className='ImgBoxinner'>
                  <ImageRender
                    originalImage={content?.ImageCompound?.ImageCompound_1?.original_image}
                    publishedImages={content?.ImageCompound?.ImageCompound_1?.published_images}
                    secondaryArgs={secondaryArgs}
                    imgOrder={{
                      1440: "landscape",
                      1280: "landscape",
                      1024: "landscape",
                      768: "landscape",
                      600: "landscape",
                      320: "landscape",
                    }}
                  />
                </Box>
                <Box className='ImgBoxinner'>
                  <ImageRender
                    originalImage={content?.ImageCompound?.ImageCompound_1?.original_image}
                    publishedImages={content?.ImageCompound?.ImageCompound_2?.published_images}
                    secondaryArgs={secondaryArgs}
                    imgOrder={{
                      1440: "square",
                      1280: "square",
                      1024: "square",
                      768: "square",
                      600: "square",
                      320: "square",
                    }}
                    sx={{ height: "calc(100% - 10px)" }}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid xs={6} className='spLeft'>
              <Box className='ImgBox'>
                <Box className='ImgBoxinner'>
                  <ImageRender
                    originalImage={content?.ImageCompound?.ImageCompound_1?.original_image}
                    publishedImages={content?.ImageCompound?.ImageCompound_3?.published_images}
                    secondaryArgs={secondaryArgs}
                    imgOrder={{
                      1440: "square",
                      1280: "square",
                      1024: "square",
                      768: "square",
                      600: "square",
                      320: "square",
                    }}
                    sx={{ height: "calc(100% - 10px)" }}
                  />
                </Box>
                <Box className='ImgBoxinner'>
                  <ImageRender
                    originalImage={content?.ImageCompound?.ImageCompound_1?.original_image}
                    publishedImages={content?.ImageCompound?.ImageCompound_4?.published_images}
                    secondaryArgs={secondaryArgs}
                    imgOrder={{
                      1440: "landscape",
                      1280: "landscape",
                      1024: "landscape",
                      768: "landscape",
                      600: "landscape",
                      320: "landscape",
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  };
  const secondColumnContent = () => {
    return (
      <Box className='rightCol'>
        <Typography variant='p4semibold' color='secondaryLabel' textTransform={"uppercase"}>
          {`// ${content.subtitle}`}
        </Typography>
        <Typography variant='h2semibold'>{content.title}</Typography>
        <Typography variant='p3regular' className='leftborder'>
          {content.subdescription}
        </Typography>
        <Typography variant='p3regular'>{content.description}</Typography>
        <Divider variant='fullWidth' />
        <Box className='bootomTextContent'>
          <Box className='imgBoxIcon'>
            <img src={PhoneIcon} alt='Icon' />
          </Box>
          <Box className='rightContent'>
            <Typography variant='p2regular' m={0}>
              {content.contacttitle}
            </Typography>
            <Typography variant='h3bold' mt={0.5}>
              {content.contactdescription}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  };
  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.CoreHighlightsWrapper} ${globalClasses.prelemType1} prelem prelemType1 CoreHighlightsBg`}>
      <Container
        className={
          authoringHelper?.isEditPage ? "grid_full_width prelem-py" : "grid_container prelem-py"
        }
        ref={ref}>
        <Box className='CoreHighlights'>
          <TwoColumnLayout
            firstColumnContent={firstColumnContent()}
            secondColumnContent={secondColumnContent()}
            customClassName='CoreHighlights'
            gridVal={gridVal}
            noGap={true}
          />
        </Box>
      </Container>
    </div>
  );
};

interface CoreHighlightsProp {
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
  subtitle?: string;
  title?: string;
  subdescription?: string;
  description?: string;
  contacttitle?: string;
  contactdescription?: string;
  coretitle?: string;
  coredescription?: string;
  TagName?: string;
  ImageCompound: {
    ImageCompound_1: {
      published_images: Image[];
      original_image?: object;
    };
    ImageCompound_2: {
      published_images: Image[];
      original_image?: object;
    };
    ImageCompound_3: {
      published_images: Image[];
      original_image?: object;
    };
    ImageCompound_4: {
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

CoreHighlights.defaultProps = {
  content: {
    subtitle: "About us",
    title: "Our Distinctive Journey",
    subdescription: "Crafting success through innovation and dedication.",
    description:
      "With [X] years of unwavering commitment, we've successfully delivered [Y] projects, supported by a dynamic team of [Z] professionals. Experience the difference with our passion for excellence.",
    contacttitle: "Call us 24/7. We can answer for all your questions.",
    contactdescription: "507-452-1254 or 508-452-1253",
    coretitle: "25",
    coredescription: "Years of Experience",
    TagName: "SiteComponents",
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
            aspect_ratio: "card1",
            folder_path: "1701943901907/public/png/Rectangle-4611-card1",
          },
          {
            aspect_ratio: "portrait",
            folder_path: "1701943901907/public/png/Rectangle-4611-portrait",
          },
          {
            aspect_ratio: "square",
            folder_path: "1701943901907/public/png/Rectangle-4611-square",
          },
          {
            aspect_ratio: "hero",
            folder_path: "1701943901907/public/png/Rectangle-4611-hero",
          },
          {
            aspect_ratio: "landscape",
            folder_path: "1701943901907/public/png/Rectangle-4611-landscape",
          },
          {
            aspect_ratio: "card2",
            folder_path: "1701943901907/public/png/Rectangle-4611-card2",
          },
        ],
      },
      ImageCompound_2: {
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
            folder_path: "1701943625655/public/png/Rectangle-4606-portrait",
          },
          {
            aspect_ratio: "card1",
            folder_path: "1701943625655/public/png/Rectangle-4606-card1",
          },
          {
            aspect_ratio: "square",
            folder_path: "1701943625655/public/png/Rectangle-4606-square",
          },
          {
            aspect_ratio: "landscape",
            folder_path: "1701943625655/public/png/Rectangle-4606-landscape",
          },
          {
            aspect_ratio: "hero",
            folder_path: "1701943625655/public/png/Rectangle-4606-hero",
          },
          {
            aspect_ratio: "card2",
            folder_path: "1701943625655/public/png/Rectangle-4606-card2",
          },
        ],
      },
      ImageCompound_3: {
        original_image: {
          original_image_relative_path: "machine_assets/1690001744940/public/png/ProductDetails",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "Imagecard3",
            Name: "Imagecard3",
            Title: "Imagecard3",
            Description: "This is for Imagecard3",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "card1",
            folder_path: "1701943708677/public/png/Rectangle-4607-card1",
          },
          {
            aspect_ratio: "portrait",
            folder_path: "1701943708677/public/png/Rectangle-4607-portrait",
          },
          {
            aspect_ratio: "square",
            folder_path: "1701943708677/public/png/Rectangle-4607-square",
          },
          {
            aspect_ratio: "hero",
            folder_path: "1701943708677/public/png/Rectangle-4607-hero",
          },
          {
            aspect_ratio: "landscape",
            folder_path: "1701943708677/public/png/Rectangle-4607-landscape",
          },
          {
            aspect_ratio: "card2",
            folder_path: "1701943708677/public/png/Rectangle-4607-card2",
          },
        ],
      },
      ImageCompound_4: {
        original_image: {
          original_image_relative_path: "machine_assets/1690001744940/public/png/ProductDetails",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "Imagecard4",
            Name: "Imagecard4",
            Title: "Imagecard4",
            Description: "This is for Imagecard4",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "portrait",
            folder_path: "1701943857057/public/png/Rectangle-4609-portrait",
          },
          {
            aspect_ratio: "card1",
            folder_path: "1701943857057/public/png/Rectangle-4609-card1",
          },
          {
            aspect_ratio: "square",
            folder_path: "1701943857057/public/png/Rectangle-4609-square",
          },
          {
            aspect_ratio: "hero",
            folder_path: "1701943857057/public/png/Rectangle-4609-hero",
          },
          {
            aspect_ratio: "landscape",
            folder_path: "1701943857057/public/png/Rectangle-4609-landscape",
          },
          {
            aspect_ratio: "card2",
            folder_path: "1701943857057/public/png/Rectangle-4609-card2",
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

export default CoreHighlights;
