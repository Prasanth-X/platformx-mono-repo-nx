import { Box, Container, Grid } from "@mui/material";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import ImageRender from "../../Common/ImageRender";
import "../../Style.css";
import BigArrow from "../../assets/BigArrow.png";
import { formCroppedUrl } from "../../utils/helperFns";
import { useCustomStyle } from "./ServiceCard5.style";
import { prelemTypes } from "../../theme/globalStyle";
import { usePrelemImpression } from "Common/ImpressionHooks/PrelemImpressionHook";

const ServiceCard5 = ({ content, analytics, authoringHelper, secondaryArgs }: ServiceCard5Prop) => {
  const firstRender = useRef(true);
  const { ref, inView } = useInView({
    threshold: 0.5,
  });
  const { ref: ref1, inView: inView1 } = useInView({
    /* Optional options */
    threshold: 0.1,
  });
  const defaultStructureData = () => {
    let ServiceCard5StructureData;
    const getImg = (index: number) => {
      const ImageCompound_index = `ImageCompound_${index}`;
      const { original_image_relative_path, ext }: any =
        (content?.ImageCompound && content?.ImageCompound[ImageCompound_index]?.original_image) ||
        {};
      const img = formCroppedUrl(
        secondaryArgs?.gcpUrl,
        secondaryArgs?.bucketName,
        original_image_relative_path,
        ext,
      );
      return img;
    };

    try {
      ServiceCard5StructureData = {
        "@context": "http://schema.org/",
        "@type": "ItemList",
        name: content?.Title,
        Description: content?.SubTitle,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@type": "ImageObject",
              contentUrl: getImg(1),
              name: content?.ImageText1,
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@type": "ImageObject",
              contentUrl: getImg(2),
              name: content?.ImageText2,
            },
          },
          {
            "@type": "ListItem",
            position: 3,
            item: {
              "@type": "ImageObject",
              contentUrl: getImg(3),
              name: content?.ImageText3,
            },
          },
        ],
      };
    } catch (e) {
      ServiceCard5StructureData = {};
    }
    return ServiceCard5StructureData;
  };

  const generateStructureData = () => {
    let ServiceCard5StructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current === true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        ServiceCard5StructureData = JSON.parse(tempSD);
      } else {
        ServiceCard5StructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      ServiceCard5StructureData = defaultStructureData();
    }
    return ServiceCard5StructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    content?.Title,
    content?.SubTitle,
    content?.ImageCompound?.ImageCompound_1?.original_image,
    content?.ImageCompound?.ImageCompound_2?.original_image,
    content?.ImageCompound?.ImageCompound_3?.original_image,
    content?.ImageText1,
    content?.ImageText2,
    content?.ImageText3,
  ]);

  usePrelemImpression(analytics, inView);
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.serviceCard5Wrapper} ${globalClasses.prelemType1} prelem prelemType1 serviceCard5Bg`}>
      <Container
        className={
          authoringHelper?.isEditPage ? "grid_full_width prelem-py" : "grid_container prelem-py"
        }
        ref={ref}>
        <Grid container>
          <Grid item xs={12} ref={ref1}>
            <Slide direction='right' in={secondaryArgs?.editState ? true : inView1} timeout={1500}>
              <Typography id='Title' variant='p3semibold' className='topTitle'>
                {content?.Title}
              </Typography>
            </Slide>
          </Grid>
          <Grid item xs={12}>
            <Slide direction='right' in={secondaryArgs?.editState ? true : inView1} timeout={1500}>
              <Typography variant='h2semibold' id='SubTitle'>
                {content?.SubTitle}
              </Typography>
            </Slide>
          </Grid>
          <Grid container className='bottomBoxWrapper'>
            <Slide direction='right' in={secondaryArgs?.editState ? true : inView1} timeout={1500}>
              <Grid item sm={3.6} className='gridBoxWrapper' mt={0}>
                <Box id='img' className='ArrowIconWrapper'>
                  <img alt='card5' src={BigArrow} />
                </Box>

                <ImageRender
                  originalImage={content?.ImageCompound?.ImageCompound_1?.original_image}
                  publishedImages={content?.ImageCompound?.ImageCompound_1?.published_images}
                  secondaryArgs={secondaryArgs}
                  imgOrder={{
                    1440: "square",
                    1280: "landscape",
                    1024: "card2",
                    768: "square",
                    600: "card1",
                    320: "portrait",
                  }}
                />
                <Typography variant='h2bold' id='ImageText1' className='titleBox'>
                  {content?.ImageText1}
                </Typography>
              </Grid>
            </Slide>
            <Slide direction='up' in={secondaryArgs?.editState ? true : inView1} timeout={1500}>
              <Grid item sm={3.6} className='gridBoxWrapper' mt='5%'>
                <Box id='img' className='ArrowIconWrapper'>
                  <img alt='card7' src={BigArrow} />
                </Box>
                <ImageRender
                  originalImage={content?.ImageCompound?.ImageCompound_2?.original_image}
                  publishedImages={content?.ImageCompound?.ImageCompound_2?.published_images}
                  secondaryArgs={secondaryArgs}
                  imgOrder={{
                    1440: "square",
                    1280: "landscape",
                    1024: "card2",
                    768: "square",
                    600: "card1",
                    320: "portrait",
                  }}
                />
                <Typography variant='h2bold' id='ImageText2' className='titleBox'>
                  {content?.ImageText2}
                </Typography>
              </Grid>
            </Slide>
            <Slide direction='left' in={secondaryArgs?.editState ? true : inView1} timeout={1500}>
              <Grid item sm={3.6} className='gridBoxWrapper' mt='10%'>
                <Box id='img' className='ArrowIconWrapper'>
                  <img alt='card9' src={BigArrow} />
                </Box>
                <ImageRender
                  originalImage={content?.ImageCompound?.ImageCompound_3?.original_image}
                  publishedImages={content?.ImageCompound?.ImageCompound_3?.published_images}
                  secondaryArgs={secondaryArgs}
                  imgOrder={{
                    1440: "square",
                    1280: "landscape",
                    1024: "card2",
                    768: "square",
                    600: "card1",
                    320: "portrait",
                  }}
                />
                <Typography variant='h2bold' id='ImageText3' className='titleBox'>
                  {content?.ImageText3}
                </Typography>
              </Grid>
            </Slide>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

interface ServiceCard5Prop {
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
}

interface Content {
  Title?: string;
  SubTitle?: string;
  ImageIcon?: boolean;
  ImageText1: string;
  ImageText2: string;
  ImageText3: string;

  TagName?: string;
  ImageCompound: {
    ImageCompound_1: ImageCompound;
    ImageCompound_2: ImageCompound;
    ImageCompound_3: ImageCompound;
  };
}

interface ImageCompound {
  original_image: OriginalImage;
  published_images: PublishedImages[];
}
interface OriginalImage {
  Url: string;
  bitStreamId: string;
  auto: boolean;
}
interface PublishedImages {
  aspect_ratio: string;
  bucket_path: string;
  folder_path: string;
  visibility: string;
  ext: string;
}
ServiceCard5.defaultProps = {
  content: {
    Title: "Lorem ipsum dolor sit amet",
    SubTitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    TagName: "SiteComponents",
    ImageText1: "Lorem ipsum dolor sit amet",
    ImageText2: "Lorem ipsum dolor sit amet",
    ImageText3: "Lorem ipsum dolor sit amet",

    ImageCompound: {
      ImageCompound_1: {
        original_image: {
          original_image_relative_path:
            "machine_assets/1690282743892/public/png/ExpertiseShowcase2",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "ServiceCard",
            Name: "ServiceCard",
            Title: "ServiceCard",
            Description: "This is for ServiceCard",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "portrait",
            folder_path: "machine_assets/1690282743892/public/png/ExpertiseShowcase2-portrait",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1690282743892/public/png/ExpertiseShowcase2-card1",
          },
          {
            aspect_ratio: "landscape",
            folder_path: "machine_assets/1690282743892/public/png/ExpertiseShowcase2-landscape",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1690282743892/public/png/ExpertiseShowcase2-hero",
          },
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1690282743892/public/png/ExpertiseShowcase2-square",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1690282743892/public/png/ExpertiseShowcase2-card2",
          },
        ],
      },
      ImageCompound_2: {
        original_image: {
          original_image_relative_path:
            "machine_assets/1689934844153/public/png/WebsiteIntroduction",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "ServiceCard",
            Name: "ServiceCard",
            Title: "ServiceCard",
            Description: "This is for ServiceCard",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "portrait",
            folder_path: "machine_assets/1689934844153/public/png/WebsiteIntroduction-portrait",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1689934844153/public/png/WebsiteIntroduction-hero",
          },
          {
            aspect_ratio: "landscape",
            folder_path: "machine_assets/1689934844153/public/png/WebsiteIntroduction-landscape",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1689934844153/public/png/WebsiteIntroduction-card1",
          },
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1689934844153/public/png/WebsiteIntroduction-square",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1689934844153/public/png/WebsiteIntroduction-card2",
          },
        ],
      },
      ImageCompound_3: {
        original_image: {
          original_image_relative_path:
            "machine_assets/1690282794843/public/png/ExpertiseShowcase4",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "ServiceCard",
            Name: "ServiceCard",
            Title: "ServiceCard",
            Description: "This is for ServiceCard",
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
    isEditPage: false,
  },

  analytics: {
    isSeoEnabled: false,
    isAuthoring: false,
    isAnalyticsEnabled: true,
    position: 0,
    pageId: 21,
    prelemId: 21,
    pageTitle: "Service Card 5",
    pageDesc:
      "This prelem can be used to show features, services, and products in cards. It has title, description & 3 fixed cards",
    pageTags: "Service, Box, Features, Cards, Service, Service, Product, Feature",
    prelemTags: "Service, Box, Features, Cards, Service, Service, Product, Feature",
  },
  secondaryArgs: {
    gcpUrl: "https://storage.googleapis.com",
    bucketName: "cropped_image_public",
  },
};

export default ServiceCard5;
