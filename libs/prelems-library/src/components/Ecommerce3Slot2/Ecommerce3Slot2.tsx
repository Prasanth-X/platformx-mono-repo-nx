import { Cached } from "@mui/icons-material";
import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
// import { formCroppedUrl } from "../../utils/helperFns";
import ImageRender from "../../Common/ImageRender";
import { useCustomStyle } from "./Ecommerce3Slot2.style";
import { usePrelemImpression } from "Common/ImpressionHooks/PrelemImpressionHook";

const Ecommerce3Slot2 = ({
  content,
  analytics,
  authoringHelper,
  secondaryArgs,
}: Ecommerce3Slot2Props) => {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const firstRender = useRef(true);

  // const getImg = (index: number) => {
  //   const ImageCompound_index = `ImageCompound_${index}`;
  //   const { original_image_relative_path, ext }: any =
  //     (content?.ImageCompound &&
  //       content?.ImageCompound[ImageCompound_index]?.original_image) ||
  //     {};
  //   const img = formCroppedUrl(
  //     secondaryArgs?.gcpUrl,
  //     secondaryArgs?.bucketName,
  //     original_image_relative_path,
  //     ext
  //   );
  //   return img;
  // };

  usePrelemImpression(analytics, inView);

  // const triggerAnalytics = (
  //   url: string,
  //   index: number,
  //   title: string,
  //   contentType: string
  // ) => {
  //   if (!analytics?.isAuthoring && analytics?.isAnalyticsEnabled) {
  //     const cardClickObj = {
  //       eventType: "Card Click",
  //       ...defaultObj,
  //       eventCategory: "Card Click",
  //       eventAction: "Click",
  //       prelemSlotNumber: index + 1,
  //       contentType: contentType,
  //       contentTitle: title,
  //       contentUrl: url,
  //     };
  //     handleTrack(cardClickObj?.eventType, cardClickObj);
  //   }
  // };

  const defaultStructureData = () => {
    let Ecommerce3Slot2StructureData;
    try {
      Ecommerce3Slot2StructureData = {};
    } catch (e) {
      Ecommerce3Slot2StructureData = {};
    }

    return Ecommerce3Slot2StructureData;
  };

  const generateStructureData = () => {
    let Ecommerce3Slot2StructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData || "");

    if (firstRender.current === true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        Ecommerce3Slot2StructureData = JSON.parse(tempSD);
      } else {
        Ecommerce3Slot2StructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      Ecommerce3Slot2StructureData = defaultStructureData();
    }
    return Ecommerce3Slot2StructureData;
  };

  const onAdd = (slotNumber: number) => {
    const {
      multiSlot: { eComContentGalleryHandle },
    } = secondaryArgs;
    eComContentGalleryHandle(
      JSON.stringify(content[`query_param${slotNumber + 1}`]),
      false,
      slotNumber + 1,
    );
  };

  const onCardClick = (index: number) => {
    localStorage.setItem("ecommerceQuery", JSON.stringify(content[`query_param${index + 1}`]));
    window.location.href = `${secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint}${secondaryArgs?.prelemBaseEndpoint?.language}/ecommerce/product-listing`;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const classes = useCustomStyle();

  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.ecommerce3Slot2Wrapper} outer-row ecommerce3Slot2Bg`}>
      <Container
        className={
          authoringHelper?.isEditPage
            ? "grid_full_width prelem-py"
            : "grid_container grid_container_nopadding prelem-py"
        }>
        <Grid ref={ref} container xs={12} md={12} className='gridContainer'>
          {Object.keys(content?.ImageCompound).map((image, index) => {
            return (
              <Grid
                key={`${index}`}
                item
                xs={12}
                em={4}
                className='eachImageGrid'
                onClick={
                  secondaryArgs?.editState ? (e) => e.preventDefault() : () => onCardClick(index)
                }>
                <Box
                  className={secondaryArgs?.editState ? "replaceOvelay" : "hideElementClass"}
                  onClick={() => onAdd(index)}>
                  <Box className='replaceIconClass'>
                    <Cached className='replaceIconColorClass' />
                  </Box>
                </Box>
                <Box className='Ecommerce3slot2ImageInner'>
                  <ImageRender
                    originalImage={
                      content?.ImageCompound[`ImageCompound_${index + 1}`]?.original_image
                    }
                    publishedImages={
                      content?.ImageCompound[`ImageCompound_${index + 1}`]?.published_images
                    }
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
                  <Box className='imageOverlay'></Box>
                </Box>

                <Typography className='textArea' id={`Title${index + 1}`} variant='h2regular'>
                  {content[`Title${index + 1}`]}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};

interface Ecommerce3Slot2Props {
  content: Content;
  analytics: Analytics;
  authoringHelper: AuthoringHelper;
  secondaryArgs: any;
}

interface Content {
  Title1?: string;
  Title2?: string;
  Title3?: string;
  Description?: string;
  TagName?: string;
  query_param1?: QueryParamfordata;
  query_param2?: QueryParamfordata;
  query_param3?: QueryParamfordata;
  ImageCompound: {
    ImageCompound_1: ImageCompound;
    ImageCompound_2: ImageCompound;
    ImageCompound_3: ImageCompound;
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
  authoringHoverShow?: boolean;
  isEditPage: boolean;
}

interface QueryParamfordata {
  pagination?: Pagination;
  searchTerm?: string;
  tags?: [string];
  filter?: string;
  isSuggestive?: boolean;
  ecommerceRequest?: EcommerceRequest;
  isQueryType?: string;
}

interface Pagination {
  start?: number;
  rows?: number;
}

interface EcommerceRequest {
  filter?: [string];
}

Ecommerce3Slot2.defaultProps = {
  content: {
    Images: {
      Image_1: {
        Name: "X_Image",
        Url: "machine_assets/1691503952068/public/png/SiteComponent_Ecomm_Slot2_1",
        Title: "ThreeSlotTwo",
        Description: "This is for ThreeSlotTwo",
        Attribution: false,
        AltText: "ThreeSlotTwo",
        ext: "png",
        visibility: "public",
      },
      Image_2: {
        Name: "X_Image",
        Url: "machine_assets/1691519622545/public/png/SiteComponent_Ecomm_Slot2_2",
        Title: "ThreeSlotTwo",
        Description: "This is for ThreeSlotTwo",
        Attribution: false,
        AltText: "ThreeSlotTwo",
        ext: "png",
        visibility: "public",
      },
      Image_3: {
        Name: "X_Image",
        Url: "machine_assets/1691504046210/public/png/SiteComponent_Ecomm_Slot2_3",
        Title: "ThreeSlotTwo",
        Description: "This is for ThreeSlotTwo",
        Attribution: false,
        AltText: "ThreeSlotTwo",
        ext: "png",
        visibility: "public",
      },
    },
    TagName: "SiteComponents",
    Title1: "Lorem ipsum dolor sit amet1",
    Title2: "Lorem ipsum dolor sit amet2",
    Title3: "Lorem ipsum dolor sit amet3",
    query_param1: {
      pagination: {
        start: 0,
        rows: 4,
      },
      searchTerm: "",
      tags: [],
      filter: "Ecommerce",
      isSuggestive: false,
      ecommerceRequest: {
        filter: [],
      },
    },
    query_param2: {
      pagination: {
        start: 0,
        rows: 4,
      },
      searchTerm: "",
      tags: [],
      filter: "Ecommerce",
      isSuggestive: false,
      ecommerceRequest: {
        filter: [],
      },
    },
    query_param3: {
      pagination: {
        start: 0,
        rows: 4,
      },
      searchTerm: "",
      tags: [],
      filter: "Ecommerce",
      isSuggestive: false,
      ecommerceRequest: {
        filter: [],
      },
    },
    PrelemContentType: ["Select"],
    ImageCompound: {
      ImageCompound_1: {
        original_image: {
          original_image_relative_path:
            "machine_assets/1690524802501/public/png/SiteComponent_Ecomm_Slot2_1",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "ThreeSlotTwo",
            Name: "X_Image",
            Title: "ThreeSlotTwo",
            Description: "This is for ThreeSlotTwo",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "landscape",
            folder_path:
              "machine_assets/1690524802501/public/png/SiteComponent_Ecomm_Slot2_1-landscape",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1690524802501/public/png/SiteComponent_Ecomm_Slot2_1-hero",
          },
          {
            aspect_ratio: "square",
            folder_path:
              "machine_assets/1690524802501/public/png/SiteComponent_Ecomm_Slot2_1-square",
          },
          {
            aspect_ratio: "portrait",
            folder_path:
              "machine_assets/1690524802501/public/png/SiteComponent_Ecomm_Slot2_1-portrait",
          },
          {
            aspect_ratio: "card2",
            folder_path:
              "machine_assets/1690524802501/public/png/SiteComponent_Ecomm_Slot2_1-card2",
          },
          {
            aspect_ratio: "card1",
            folder_path:
              "machine_assets/1690524802501/public/png/SiteComponent_Ecomm_Slot2_1-card1",
          },
        ],
      },
      ImageCompound_2: {
        original_image: {
          original_image_relative_path:
            "machine_assets/1690525566265/public/png/SiteComponent_Ecomm_Slot2_2",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "ThreeSlotTwo",
            Name: "X_Image",
            Title: "ThreeSlotTwo",
            Description: "This is for ThreeSlotTwo",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1690525566265/public/png/SiteComponent_Ecomm_Slot2_2-hero",
          },
          {
            aspect_ratio: "landscape",
            folder_path:
              "machine_assets/1690525566265/public/png/SiteComponent_Ecomm_Slot2_2-landscape",
          },
          {
            aspect_ratio: "square",
            folder_path:
              "machine_assets/1690525566265/public/png/SiteComponent_Ecomm_Slot2_2-square",
          },
          {
            aspect_ratio: "portrait",
            folder_path:
              "machine_assets/1690525566265/public/png/SiteComponent_Ecomm_Slot2_2-portrait",
          },
          {
            aspect_ratio: "card1",
            folder_path:
              "machine_assets/1690525566265/public/png/SiteComponent_Ecomm_Slot2_2-card1",
          },
          {
            aspect_ratio: "card2",
            folder_path:
              "machine_assets/1690525566265/public/png/SiteComponent_Ecomm_Slot2_2-card2",
          },
        ],
      },
      ImageCompound_3: {
        original_image: {
          original_image_relative_path:
            "machine_assets/1690525600612/public/png/SiteComponent_Ecomm_Slot2_3",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "ThreeSlotTwo",
            Name: "X_Image",
            Title: "ThreeSlotTwo",
            Description: "This is for ThreeSlotTwo",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "square",
            folder_path:
              "machine_assets/1690525600612/public/png/SiteComponent_Ecomm_Slot2_3-square",
          },
          {
            aspect_ratio: "portrait",
            folder_path:
              "machine_assets/1690525600612/public/png/SiteComponent_Ecomm_Slot2_3-portrait",
          },
          {
            aspect_ratio: "card1",
            folder_path:
              "machine_assets/1690525600612/public/png/SiteComponent_Ecomm_Slot2_3-card1",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1690525600612/public/png/SiteComponent_Ecomm_Slot2_3-hero",
          },
          {
            aspect_ratio: "landscape",
            folder_path:
              "machine_assets/1690525600612/public/png/SiteComponent_Ecomm_Slot2_3-landscape",
          },
          {
            aspect_ratio: "card2",
            folder_path:
              "machine_assets/1690525600612/public/png/SiteComponent_Ecomm_Slot2_3-card2",
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
    isAnalyticsEnabled: true,
    isSeoEnabled: false,
    isAuthoring: false,
    position: 0,
    pageId: 1234,
    prelemId: 2345,
    pageTitle: "Multi Slot Prelem",
    pageDesc:
      "This prelem having 4 cards that allows you to display all kind of content in grid. Use it to display the image gallery, video gallery, articles.",
    pageTags: "Multi Slot Prelem, Article Prelem, Media Cards",
    prelemTags: "Multi Slot Prelem, Article Prelem, Media Cards",
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

export default Ecommerce3Slot2;
