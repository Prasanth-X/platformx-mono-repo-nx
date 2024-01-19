/* eslint-disable @typescript-eslint/no-empty-function */
import { Container, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { formCroppedUrl } from "@platformx/utilities";
import { useCustomStyle } from "./Sponsor.style";
import prelemTypes from "../../globalStyle";
import "../../Style.css";
import { usePrelemImpression } from "../../components/ImpressionHooks/PrelemImpressionHook";

const Sponsor = ({
  content,
  analytics,
  authoringHelper,
  secondaryArgs,
}: //secondaryArgs,
SponsorProp) => {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const generateStructureData = () => {
    const sponsorStructureData = {};
    return sponsorStructureData;
  };

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

  // const getOriginalImg = (index: number) => {
  //   const ImageCompound_index = `ImageCompound_${index}`;
  //   return (
  //     content?.ImageCompound &&
  //     content?.ImageCompound[ImageCompound_index]?.original_image
  //   );
  // };
  // const getPublishedImg = (index: number) => {
  //   const ImageCompound_index = `ImageCompound_${index}`;
  //   return (
  //     content?.ImageCompound &&
  //     content?.ImageCompound[ImageCompound_index]?.published_images
  //   );
  // };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content?.ImageCompound, content?.Title]);

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
      className={`${classes.sponsorWrapper} ${globalClasses.prelemType1} prelem prelemType1 sponsor sponsorBg`}>
      <Container
        className={
          authoringHelper?.isEditPage ? `grid_full_width prelem-py` : `grid_container prelem-py`
        }
        ref={ref}>
        <Grid className='wrapperMain' container ref={ref}>
          {content?.ImageCompound &&
            Object.entries(content?.ImageCompound).map(([key], index) => (
              <Grid item xs={12} sm={6} md={3} lg={3} key={key} className='wrapperImg'>
                <img alt={key} src={getImg(index + 1)} />
                {/* <ImageRender
                  originalImage={getOriginalImg(index + 1)}
                  publishedImages={getPublishedImg(index + 1)}
                  secondaryArgs={secondaryArgs}
                  imgOrder={{
                    1440: "landscape",
                    1280: "landscape",
                    1024: "card2",
                    768: "square",
                    600: "card2",
                    320: "card2",
                  }}
                  width="auto"
                  height="auto"
                /> */}
              </Grid>
            ))}
        </Grid>
      </Container>
    </div>
  );
};

interface SponsorProp {
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
  openButtonEditWindowInAuthoringCB: (buttonObj?: object, e?: object) => void;
  selectedButtonNameForEditing: string;
  isEditing: boolean;
  buttonRef?: React.Ref<HTMLButtonElement>;
  buttonContentEditable?: boolean;
  isEditPage?: boolean;
}

interface Content {
  Title?: string;
  TagName?: string;
  ImageCompound: {
    ImageCompound_1: ImageCompound;
    ImageCompound_2: ImageCompound;
    ImageCompound_3: ImageCompound;
    ImageCompound_4: ImageCompound;
    ImageCompound_5: ImageCompound;
    ImageCompound_6: ImageCompound;
    ImageCompound_7: ImageCompound;
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

Sponsor.defaultProps = {
  content: {
    TagName: "SiteComponents",
    Title: "Lorem ipsum",
    ImageCompound: {
      ImageCompound_1: {
        original_image: {
          original_image_relative_path:
            "machine_assets/1689964234264/public/png/Sponser-1200px-Amazon_Web_Services_Logo",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "AWS",
            Name: "AWS",
            Title: "AWS",
            Description: "This is for AWS",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "hero",
            folder_path:
              "machine_assets/1689964234264/public/png/Sponser-1200px-Amazon_Web_Services_Logo-hero",
          },
          {
            aspect_ratio: "card1",
            folder_path:
              "machine_assets/1689964234264/public/png/Sponser-1200px-Amazon_Web_Services_Logo-card1",
          },
          {
            aspect_ratio: "portrait",
            folder_path:
              "machine_assets/1689964234264/public/png/Sponser-1200px-Amazon_Web_Services_Logo-portrait",
          },
          {
            aspect_ratio: "square",
            folder_path:
              "machine_assets/1689964234264/public/png/Sponser-1200px-Amazon_Web_Services_Logo-square",
          },
          {
            aspect_ratio: "landscape",
            folder_path:
              "machine_assets/1689964234264/public/png/Sponser-1200px-Amazon_Web_Services_Logo-landscape",
          },
          {
            aspect_ratio: "card2",
            folder_path:
              "machine_assets/1689964234264/public/png/Sponser-1200px-Amazon_Web_Services_Logo-card2",
          },
        ],
      },
      ImageCompound_2: {
        original_image: {
          original_image_relative_path: "machine_assets/1689964749060/public/png/Sponser-google",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "Google",
            Name: "Google",
            Title: "Google",
            Description: "This is for Google",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1689964749060/public/png/Sponser-google-square",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1689964749060/public/png/Sponser-google-hero",
          },
          {
            aspect_ratio: "landscape",
            folder_path: "machine_assets/1689964749060/public/png/Sponser-google-landscape",
          },
          {
            aspect_ratio: "portrait",
            folder_path: "machine_assets/1689964749060/public/png/Sponser-google-portrait",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1689964749060/public/png/Sponser-google-card1",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1689964749060/public/png/Sponser-google-card2",
          },
        ],
      },
      ImageCompound_3: {
        original_image: {
          original_image_relative_path:
            "machine_assets/1689965518251/public/png/Sponser-cisco-logo-transparent",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "Cisco",
            Name: "Cisco",
            Title: "Cisco",
            Description: "This is for Cisco",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "square",
            folder_path:
              "machine_assets/1689965518251/public/png/Sponser-cisco-logo-transparent-square",
          },
          {
            aspect_ratio: "portrait",
            folder_path:
              "machine_assets/1689965518251/public/png/Sponser-cisco-logo-transparent-portrait",
          },
          {
            aspect_ratio: "card1",
            folder_path:
              "machine_assets/1689965518251/public/png/Sponser-cisco-logo-transparent-card1",
          },
          {
            aspect_ratio: "hero",
            folder_path:
              "machine_assets/1689965518251/public/png/Sponser-cisco-logo-transparent-hero",
          },
          {
            aspect_ratio: "landscape",
            folder_path:
              "machine_assets/1689965518251/public/png/Sponser-cisco-logo-transparent-landscape",
          },
          {
            aspect_ratio: "card2",
            folder_path:
              "machine_assets/1689965518251/public/png/Sponser-cisco-logo-transparent-card2",
          },
        ],
      },
      ImageCompound_4: {
        original_image: {
          original_image_relative_path:
            "machine_assets/1689965826745/public/png/Sponser-LinkedIn_Logo_2019",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "Linkedin",
            Name: "Linkedin",
            Title: "Linkedin",
            Description: "This is for Linkedin",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "square",
            folder_path:
              "machine_assets/1689965826745/public/png/Sponser-LinkedIn_Logo_2019-square",
          },
          {
            aspect_ratio: "landscape",
            folder_path:
              "machine_assets/1689965826745/public/png/Sponser-LinkedIn_Logo_2019-landscape",
          },
          {
            aspect_ratio: "portrait",
            folder_path:
              "machine_assets/1689965826745/public/png/Sponser-LinkedIn_Logo_2019-portrait",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1689965826745/public/png/Sponser-LinkedIn_Logo_2019-hero",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1689965826745/public/png/Sponser-LinkedIn_Logo_2019-card1",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1689965826745/public/png/Sponser-LinkedIn_Logo_2019-card2",
          },
        ],
      },
      ImageCompound_5: {
        original_image: {
          original_image_relative_path: "machine_assets/1689966176243/public/png/Sponser-Meta-Logo",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "Meta",
            Name: "Meta",
            Title: "Meta",
            Description: "This is for Meta",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "landscape",
            folder_path: "machine_assets/1689966176243/public/png/Sponser-Meta-Logo-landscape",
          },
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1689966176243/public/png/Sponser-Meta-Logo-square",
          },
          {
            aspect_ratio: "portrait",
            folder_path: "machine_assets/1689966176243/public/png/Sponser-Meta-Logo-portrait",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1689966176243/public/png/Sponser-Meta-Logo-hero",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1689966176243/public/png/Sponser-Meta-Logo-card1",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1689966176243/public/png/Sponser-Meta-Logo-card2",
          },
        ],
      },
      ImageCompound_6: {
        original_image: {
          original_image_relative_path:
            "machine_assets/1689966312560/public/png/Sponser-Microsoft-Logo-PNG-Transparent",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "Microsoft",
            Name: "Microsoft",
            Title: "Microsoft",
            Description: "This is for Microsoft",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "landscape",
            folder_path:
              "machine_assets/1689966312560/public/png/Sponser-Microsoft-Logo-PNG-Transparent-landscape",
          },
          {
            aspect_ratio: "hero",
            folder_path:
              "machine_assets/1689966312560/public/png/Sponser-Microsoft-Logo-PNG-Transparent-hero",
          },
          {
            aspect_ratio: "portrait",
            folder_path:
              "machine_assets/1689966312560/public/png/Sponser-Microsoft-Logo-PNG-Transparent-portrait",
          },
          {
            aspect_ratio: "square",
            folder_path:
              "machine_assets/1689966312560/public/png/Sponser-Microsoft-Logo-PNG-Transparent-square",
          },
          {
            aspect_ratio: "card1",
            folder_path:
              "machine_assets/1689966312560/public/png/Sponser-Microsoft-Logo-PNG-Transparent-card1",
          },
          {
            aspect_ratio: "card2",
            folder_path:
              "machine_assets/1689966312560/public/png/Sponser-Microsoft-Logo-PNG-Transparent-card2",
          },
        ],
      },
      ImageCompound_7: {
        original_image: {
          original_image_relative_path:
            "machine_assets/1689966425601/public/png/Sponser-shark-tank-logo",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "SharkTank",
            Name: "SharkTank",
            Title: "SharkTank",
            Description: "This is for SharkTank",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1689966425601/public/png/Sponser-shark-tank-logo-square",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1689966425601/public/png/Sponser-shark-tank-logo-card1",
          },
          {
            aspect_ratio: "portrait",
            folder_path: "machine_assets/1689966425601/public/png/Sponser-shark-tank-logo-portrait",
          },
          {
            aspect_ratio: "landscape",
            folder_path:
              "machine_assets/1689966425601/public/png/Sponser-shark-tank-logo-landscape",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1689966425601/public/png/Sponser-shark-tank-logo-hero",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1689966425601/public/png/Sponser-shark-tank-logo-card2",
          },
        ],
      },
    },
  },
  authoringHelper: {
    innerRef: null,
    sendStructureDataToAuthoringCB: () => {},
    openButtonEditWindowInAuthoringCB: () => {},
    selectedButtonNameForEditing: "",
    isEditing: false,
    buttonRef: null,
    buttonContentEditable: false,
    isEditPage: false,
  },

  analytics: {
    isAnalyticsEnabled: true,
    isSeoEnabled: false,
    isAuthoring: false,
    position: 0,
    pageId: 1234,
    prelemId: 2345,
    pageTitle: "Sponsor",
    pageDesc: "This prelem can be used to display the sponsors logo that the user wants.",
    pageTags: "Logo, Sponsor, Global Nav, Logos",
    prelemTags: "Logo, Sponsor, Global Nav, Logos",
  },
  secondaryArgs: {
    APIEndPoint: "https://platx-api-dev.fanuep.com/platform-x/",
    gcpUrl: "https://storage.googleapis.com",
    bucketName: "cropped_image_public",
  },
};

export default Sponsor;
