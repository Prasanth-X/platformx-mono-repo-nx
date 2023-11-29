import AutorenewIcon from "@mui/icons-material/Autorenew";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import "../../Style.css";
import ImageVideoGalleryModalSlider from "../ImageVideoGalleryModalSlider/ImageVideoGalleryModalSlider";
import InfiniteLooper from "../InfiniteLooper/InfiniteLooper";
import GalleryFirst from "./GalleryFirst";
import GallerySecond from "./GallerySecond";
import { useCustomStyle } from "./Gallery1.style";
import "./Gallery1.css";
import { prelemTypes } from "../../theme/globalStyle";
import { usePrelemImpression } from "Common/ImpressionHooks/PrelemImpressionHook";
// ts-ignore
const Gallery1 = ({
  content,
  analytics,
  authoringHelper,
  secondaryArgs,
}: //secondaryArgs,

Gallery1Prop) => {
  // const [hoverState, setHoverState] = useState(false);

  const [GalleryOne, setGallery1] = useState<GallerySliderProps[]>([]);
  const [GalleryTwo, setGallery2] = useState<GallerySliderProps[]>([]);
  const [indexPos, setIndexPos] = useState(0);
  const [open, setOpen] = useState(false);
  const [galleryData, setGalleryData] = useState<any>();

  const handleOpen = (data: any, indexPosition: number) => {
    if (authoringHelper?.isModalShow) {
      setOpen(true);
      setIndexPos(indexPosition);
      setGalleryData(data);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const firstRender = useRef(true);

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const defaultStructureData = () => {
    let GalleryStructureData;
    try {
      GalleryStructureData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: content?.Slots?.map((item: any, key: any) => {
          return {
            "@type": "ListItem",
            position: key + 1,
            item: {
              "@type": item.Thumbnail ? "VideoObject" : "ImageObject",
              contentUrl: item.Url,
            },
          };
        }),
      };
    } catch (e) {
      GalleryStructureData = {};
    }

    return GalleryStructureData;
  };

  const generateStructureData = () => {
    let GalleryStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current === true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        GalleryStructureData = JSON.parse(tempSD);
      } else {
        GalleryStructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      GalleryStructureData = defaultStructureData();
    }
    return GalleryStructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content?.Title, content?.Slots]);

  usePrelemImpression(analytics, inView);
  /* AnalyticsEnabled dependency added as many times we are not getting analytics provider*async call)
  1. we are first checking in publish app if analytics provider is avaiable or not
  2. if its available we are setting AnalyticsEnabled to true
  3. if its not available we are setting false
*/
  useEffect(() => {
    if (content?.Slots) {
      const midLength = content?.Slots?.length / 2;
      const gallery1 = content?.Slots.slice(0, midLength);
      const gallery2 = content?.Slots.slice(midLength + 1, content?.Slots?.length);
      setGallery1(gallery1);
      setGallery2(gallery2);
    }
  }, [content]);
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  return (
    <Box
      ref={authoringHelper?.innerRef}
      className={`${classes.gallery1PrelemWrapper} ${globalClasses.prelemType1} prelem prelemType1  gallery1PrelemBg Gallery1`}>
      <Box className='prelem-py' ref={ref}>
        <Typography textAlign='center' variant='h2semibold' id={"Title"}>
          {content.Title}
        </Typography>

        <Box
          className='galleryBox'
          sx={{
            "&:hover": {
              ".add-content-overlay": {
                display: authoringHelper?.isEditing ? "flex !important" : "none",
              },
            },
          }}>
          {GalleryOne.length &&
            (authoringHelper?.isEditing ? (
              <>
                <GalleryFirst
                  GalleryOne={GalleryOne}
                  handleOpen={handleOpen}
                  secondaryArgs={secondaryArgs}
                />
              </>
            ) : (
              <>
                <InfiniteLooper
                  speed={`${authoringHelper?.isModalShow ? GalleryOne.length * 18 : 0}`}
                  direction='left'>
                  <GalleryFirst
                    GalleryOne={GalleryOne}
                    handleOpen={handleOpen}
                    secondaryArgs={secondaryArgs}
                  />
                </InfiniteLooper>
              </>
            ))}
          {GalleryTwo.length &&
            (authoringHelper?.isEditing ? (
              <>
                <GallerySecond
                  GalleryTwo={GalleryTwo}
                  handleOpen={handleOpen}
                  secondaryArgs={secondaryArgs}
                />
              </>
            ) : (
              <>
                <InfiniteLooper
                  speed={`${authoringHelper?.isModalShow ? GalleryTwo.length * 18 - 20 : 0}`}
                  direction='left'>
                  <GallerySecond
                    GalleryTwo={GalleryTwo}
                    handleOpen={handleOpen}
                    secondaryArgs={secondaryArgs}
                  />
                </InfiniteLooper>
              </>
            ))}
          <Box className={`replaceWrapper add-content-overlay`}>
            <Box
              className='wrapperBoxIcons'
              onClick={() => secondaryArgs?.multiSlot?.onToggleContentGallery("gallery", true)}>
              <AutorenewIcon className='replaceIconWrapper' />
              <Typography variant='h3regular' color='textColor'>
                Replace
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <ImageVideoGalleryModalSlider
        openModal={open}
        indexPos={indexPos}
        handleClose={handleClose}
        sliderData={galleryData}
        contentType={"gallery"}
        secondaryArgs={secondaryArgs}
      />
    </Box>
  );
};

interface Gallery1Prop {
  content: Content;
  analytics: Analytics;
  authoringHelper?: AuthoringHelper;
  secondaryArgs?: SecondaryArgs;
}

interface SecondaryArgs {
  multiSlot?: MultiSlot;
  prelemBaseEndpoint?: PrelemBaseEndpoint;
  editState?: boolean;
}

interface PrelemBaseEndpoint {
  device?: string;
}

interface MultiSlot {
  onToggleContentGallery: (contentType: string, imageVideoContentGallery: boolean) => void;
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
  innerRef: any;
  sendStructureDataToAuthoringCB: (structureData: string) => void;
  sendDefaultStructureDataForResetToAuthoringCB: (structureData: string) => void;
  isEditing: boolean;
  lastSavedStructuredData?: string;
  isModalShow?: boolean;
  authoringHoverShow?: boolean;
}

interface GallerySliderProps {
  Name?: string;
  Url?: string;
  Title?: string;
  Description?: string;
  AltText?: string;
  Thumbnail?: string;
  Type?: string;
}

interface Content {
  Title?: string;
  Slots?: GallerySliderProps[];
}

Gallery1.defaultProps = {
  content: {
    Description: "lorem ipsum",
    EditorialItemPath:
      "/content/documents/hclplatformx/defaultdata/siteeditorial/imagevideogallery/default_image_video_gallery",
    TagName: "SiteComponents",
    Title: "Lorem ipsum dolor sit amet",
    PrelemContentType: ["ImageGallery", "VideoGallery", "Gallery"],
    Slots: [
      {
        Name: "Imagecard2",
        Url: "machine_assets/1690001744940/public/png/ProductDetails",
        Title: "Imagecard2",
        Description: "This is for Imagecard2",
        Attribution: false,
        AltText: "Imagecard2",
        ext: "png",
        visibility: "public",
        bitStreamId: "",
      },
      {
        Name: "HCL 360 Video",
        Url: "https://dev.dam.hcl-x.com/server/api/core/bitstreams/69ba1992-15d9-4d0d-9251-f79ae37184d5/content",
        Title: "HCL 360 Video",
        Description: "This is for HCL 360 Video",
        Thumbnail: "machine_assets/1689963604623/public/png/ProductSummaryViaVideo",
        ext: "png",
        visibility: "public",
        bitStreamId: "",
      },
      {
        Name: "Imagecard2",
        Url: "machine_assets/1690001744940/public/png/ProductDetails",
        Title: "Imagecard2",
        Description: "This is for Imagecard2",
        Attribution: false,
        AltText: "Imagecard2",
        ext: "png",
        visibility: "public",
        bitStreamId: "",
      },
      {
        Name: "HCL 360 Video",
        Url: "https://dev.dam.hcl-x.com/server/api/core/bitstreams/e99f647d-bb81-4bd5-baa2-7b34a73c6e95/content",
        Title: "HCL 360 Video",
        Description: "This is for HCL 360 Video",
        Thumbnail: "machine_assets/1689963604623/public/png/ProductSummaryViaVideo",
        ext: "png",
        visibility: "public",
        bitStreamId: "",
      },
      {
        Name: "Imagecard2",
        Url: "machine_assets/1690978664393/public/png/AboutUsThree_thumbnail",
        Title: "Imagecard2",
        Description: "This is for Imagecard2",
        Attribution: false,
        AltText: "Imagecard2",
        ext: "png",
        visibility: "public",
        bitStreamId: "",
      },
      {
        Name: "HCL 360 Video",
        Url: "https://dev.dam.hcl-x.com/server/api/core/bitstreams/16ee5252-c3b0-4989-89e5-e5480720a4d6/content",
        Title: "HCL 360 Video",
        Description: "This is for HCL 360 Video",
        Thumbnail: "machine_assets/1689963604623/public/png/ProductSummaryViaVideo",
        ext: "png",
        visibility: "public",
        bitStreamId: "",
      },
    ],
  },
  authoringHelper: {
    innerRef: null,
    sendStructureDataToAuthoringCB: () => {},
    openButtonEditWindowInAuthoringCB: () => {},
    sendDefaultStructureDataForResetToAuthoringCB: () => {},
    selectedButtonNameForEditing: "",
    isEditing: false,
    buttonRef: null,
    buttonContentEditable: false,
    lastSavedStructuredData: "",
    isModalShow: true,
    authoringHoverShow: false,
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
      device: "",
    },
    editState: false,
    gcpUrl: "https://storage.googleapis.com",
    bucketName: "cropped_image_public",
  },
};

export default Gallery1;
