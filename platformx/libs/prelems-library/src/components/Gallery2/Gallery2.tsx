import AutorenewIcon from "@mui/icons-material/Autorenew";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import ReactPlayer from "react-player";
import "../../Style.css";
import InfiniteLooper from "../InfiniteLooper/InfiniteLooper";
import "./Gallery2.css";
import { useCustomStyle } from "./Gallery2.style";
import { prelemTypes } from "../../theme/globalStyle";
import { getFormattedImageUrl } from "../../Common/Utils/helperFns";
import { usePrelemImpression } from "Common/ImpressionHooks/PrelemImpressionHook";

// ts-ignore
const Gallery2 = ({
  content,
  analytics,
  authoringHelper,
  secondaryArgs,
}: //secondaryArgs,

Gallery2Prop) => {
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  const [, setHoverState] = useState(false);

  const [GalleryOne, setGallery1] = useState<GallerySliderProps[]>([]);
  const [GalleryTwo, setGallery2] = useState<GallerySliderProps[]>([]);

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
              contentUrl: getFormattedImageUrl(item?.Url, item?.ext, secondaryArgs),
              name: item.Name,
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

    if (firstRender.current) {
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
  }, [content?.Title, content.Description, content?.Slots]);

  usePrelemImpression(analytics, inView);
  /* AnalyticsEnabled dependency added as many times we are not getting analytics provider*async call)
  1. we are first checking in publish app if analytics provider is avaiable or not
  2. if its available we are setting AnalyticsEnabled to true
  3. if its not available we are setting false
*/
  useEffect(() => {
    if (content?.Slots && content?.Slots.length > 0) {
      const midLength = content?.Slots?.length / 2;
      const Gall2 = content?.Slots.slice(0, midLength);
      const gall2 = content?.Slots.slice(midLength + 1, content?.Slots?.length);
      setGallery1(Gall2);
      setGallery2(gall2);
    }
  }, [content]);
  return (
    <Box
      ref={authoringHelper?.innerRef}
      className={`${classes.gallery2Wrapper} ${globalClasses.prelemType3} prelem prelemType3 gallery2 gallery2Bg`}>
      <Box ref={ref} className='prelem-py'>
        <Box className='boxWrapper'>
          <Typography variant='h2medium' color='tertiaryTitle' component='div' id={"Title"}>
            {content.Title}
          </Typography>
          <Box className='descriptionBox'>
            <Typography variant='p3regular' color='tertiaryParagraph' id='Description'>
              {content?.Description}
            </Typography>
          </Box>
          <Box
            className={`looper-list looperListWrapper`}
            // sx={{
            //   "&:hover": {
            //     ".add-content-overlay": {
            //       display: authoringHelper?.isEditing ? "flex" : "none",
            //     },
            //   },
            // }}
          >
            {GalleryOne.length && (
              <InfiniteLooper
                speed={`${authoringHelper?.isModalShow ? GalleryOne.length * 18 : 0}`}
                direction='left'>
                <Box className='looperList'>
                  {GalleryOne?.map((item, index) => {
                    return (
                      <Box
                        className='looperItem'
                        key={index}
                        onMouseEnter={() => setHoverState(true)}
                        onMouseLeave={() => setHoverState(false)}>
                        {!item.Thumbnail ? (
                          <img
                            alt='Gallery2'
                            src={getFormattedImageUrl(item?.Url, item?.ext, secondaryArgs)}
                            width='656'
                            height='276'
                            className='thumbnail'
                          />
                        ) : (
                          <ReactPlayer
                            url={item.Url}
                            width='100%'
                            height='100%'
                            playing={true}
                            loop={true}
                            controls={false}
                            muted={true}
                          />
                        )}
                      </Box>
                    );
                  })}
                </Box>
              </InfiniteLooper>
            )}
            {GalleryTwo.length && (
              <InfiniteLooper
                speed={`${authoringHelper?.isModalShow ? GalleryTwo.length * 18 - 20 : 0}`}
                direction='left'>
                <Box sx={{ display: "flex" }}>
                  {GalleryTwo?.map((item, index) => {
                    return (
                      <Box className='looperItem' key={index}>
                        {!item.Thumbnail ? (
                          <img
                            alt='Gallery2'
                            src={getFormattedImageUrl(item?.Url, item?.ext, secondaryArgs)}
                            width='656'
                            height='276'
                            className='thumbnail'
                          />
                        ) : (
                          <ReactPlayer
                            url={item.Url}
                            width='100%'
                            height='100%'
                            playing={true}
                            loop={true}
                            controls={false}
                            muted={true}
                          />
                        )}
                      </Box>
                    );
                  })}
                </Box>
              </InfiniteLooper>
            )}
            <Box className={authoringHelper?.isEditing ? "overlay" : "hideElementClass"}>
              <Box
                className='pointer'
                onClick={() => secondaryArgs?.multiSlot?.onToggleContentGallery("gallery", true)}>
                <AutorenewIcon className='icon' />
                <Typography className='overLaytextgap' variant='h3regular' color='textColor'>
                  Replace
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

interface Gallery2Prop {
  content: Content;
  analytics: Analytics;
  authoringHelper?: AuthoringHelper;
  secondaryArgs?: SecondaryArgs;
}

interface SecondaryArgs {
  multiSlot?: MultiSlot;
  prelemBaseEndpoint?: PrelemBaseEndpoint;
  editState?: boolean;
  gcpUrl?: string;
  bucketName?: string;
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
  ext?: string;
}

interface Content {
  Title?: string;
  Description: string;
  Slots?: GallerySliderProps[];
}

Gallery2.defaultProps = {
  content: {
    Title: "Lorem ispumdolor",
    Description:
      "Pre-built Elements (we call them “Prelems”) are the “Lego Blocks” of X. Go to market fast with our rich library of Prelems. Each Prelem comes with out-of-box modern UX, analytics, accessibility & SEO support",
    Slots: [
      {
        Name: "Idea Days",
        Url: "machine_assets/1690967974395/public/png/VideoBannerImage-ImageGalleryItem1",
        Title: "Idea Days",
        Description: "This is for Idea Days",
        AltText: "Imagecard2",
        ext: "png",
      },
      {
        Name: "Idea Days",
        Url: "machine_assets/1690971248485/public/png/VideoBannerImage2",
        Title: "Idea Days",
        Description: "This is for Idea Days",
        AltText: "Imagecard2",
        ext: "png",
      },
      {
        Name: "Idea Days",
        Url: "machine_assets/1690971222850/public/png/VideoBannerImage3",
        Title: "Idea Days",
        Description: "This is for Idea Days",
        AltText: "Imagecard2",
        ext: "png",
      },
      {
        Name: "Idea Days",
        Url: "machine_assets/1690971185085/public/png/VideoBannerImage4",
        Title: "Idea Days",
        Description: "This is for Idea Days",
        AltText: "Imagecard2",
        ext: "png",
      },
      {
        Name: "Idea Days",
        Url: "machine_assets/1690971149201/public/png/VideoBannerImage5",
        Title: "Idea Days",
        Description: "This is for Idea Days",
        AltText: "Imagecard2",
        ext: "png",
      },
      {
        Name: "Idea Days",
        Url: "machine_assets/1690968705909/public/png/VideoBannerImage6",
        Title: "Idea Days",
        Description: "This is for Idea Days",
        AltText: "Imagecard2",
        ext: "png",
      },
      {
        Name: "Idea Days",
        Url: "machine_assets/1690971117308/public/png/VideoBannerImage7",
        Title: "Idea Days",
        Description: "This is for Idea Days",
        AltText: "Imagecard2",
        ext: "png",
      },
      {
        Name: "Idea Days",
        Url: "machine_assets/1690971048535/public/png/VideoBannerImage9",
        Title: "Idea Days",
        Description: "This is for Idea Days",
        AltText: "Imagecard2",
        ext: "png",
      },
      {
        Name: "Idea Days",
        Url: "machine_assets/1690971021791/public/png/VideoBannerImage10",
        Title: "Idea Days",
        Description: "This is for Idea Days",
        AltText: "Imagecard2",
        ext: "png",
      },
      {
        Name: "Idea Days",
        Url: "machine_assets/1690970993200/public/png/VideoBannerImage11",
        Title: "Idea Days",
        Description: "This is for Idea Days",
        AltText: "Imagecard2",
        ext: "png",
      },
      {
        Name: "Idea Days",
        Url: "machine_assets/1690970960461/public/png/VideoBannerImage12",
        Title: "Idea Days",
        Description: "This is for Idea Days",
        AltText: "Imagecard2",
        ext: "png",
      },
      {
        Name: "Idea Days",
        Url: "machine_assets/1690970938832/public/png/VideoBannerImage13",
        Title: "Idea Days",
        Description: "This is for Idea Days",
        AltText: "Imagecard2",
        ext: "png",
      },
      {
        Name: "Idea Days",
        Url: "machine_assets/1690975317114/public/png/VideoBannerImage14",
        Title: "Idea Days",
        Description: "This is for Idea Days",
        AltText: "Imagecard2",
        ext: "png",
      },
      {
        Name: "Idea Days",
        Url: "machine_assets/1690970910412/public/png/VideoBannerImage15",
        Title: "Idea Days",
        Description: "This is for Idea Days",
        AltText: "Imagecard2",
        ext: "png",
      },
      {
        Name: "Idea Days",
        Url: "machine_assets/1690974789616/public/png/VideoBannerImage16",
        Title: "Idea Days",
        Description: "This is for Idea Days",
        AltText: "Imagecard2",
        ext: "png",
      },
      {
        Name: "Idea Days",
        Url: "machine_assets/1690974855218/public/png/VideoBannerImage17",
        Title: "Idea Days",
        Description: "This is for Idea Days",
        AltText: "Imagecard2",
        ext: "png",
      },
      {
        Name: "Idea Days",
        Url: "machine_assets/1690974880183/public/png/VideoBannerImage18",
        Title: "Idea Days",
        Description: "This is for Idea Days",
        AltText: "Imagecard2",
        ext: "png",
      },
      {
        Name: "Idea Days",
        Url: "machine_assets/1690974913347/public/png/VideoBannerImage19",
        Title: "Idea Days",
        Description: "This is for Idea Days",
        AltText: "Imagecard2",
        ext: "png",
      },
      {
        Name: "Idea Days",
        Url: "machine_assets/1690974942703/public/png/VideoBannerImage20",
        Title: "Idea Days",
        Description: "This is for Idea Days",
        AltText: "Imagecard2",
        ext: "png",
      },
      {
        Name: "Idea Days",
        Url: "machine_assets/1690974970584/public/png/VideoBannerImage21",
        Title: "Idea Days",
        Description: "This is for Idea Days",
        AltText: "Imagecard2",
        ext: "png",
      },
      {
        Name: "Idea Days",
        Url: "machine_assets/1690975000079/public/png/VideoBannerImage22",
        Title: "Idea Days",
        Description: "This is for Idea Days",
        AltText: "Imagecard2",
        ext: "png",
      },
      {
        Name: "Idea Days",
        Url: "machine_assets/1690975028064/public/png/VideoBannerImage23",
        Title: "Idea Days",
        Description: "This is for Idea Days",
        AltText: "Imagecard2",
        ext: "png",
      },
      {
        Name: "Idea Days",
        Url: "machine_assets/1690975057485/public/png/VideoBannerImage24",
        Title: "Idea Days",
        Description: "This is for Idea Days",
        AltText: "Imagecard2",
        ext: "png",
      },
      {
        Name: "Idea Days",
        Url: "machine_assets/1690974855218/public/png/VideoBannerImage17",
        Title: "Idea Days",
        Description: "This is for Idea Days",
        AltText: "Imagecard2",
        ext: "png",
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

export default Gallery2;
