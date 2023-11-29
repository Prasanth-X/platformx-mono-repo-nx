import { Box, Container, Typography } from "@mui/material";
import DOMPurify from "isomorphic-dompurify";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import ImageRender from "../../Common/ImageRender";
import "../../Style.css";
// import { ReactComponent as DoubleQutoesIcon } from "../../assets/svgIcon/doubleQuote.svg";
// import DoubleQutoesIcon from "../../assets/svgIcon/doubleQuote.svg";
import TwoColumnLayout from "../../layouts/TwoColumns/TwoColumnLayout";
import { useCustomStyle } from "./AboutUsFourWithSubHeading.style";
import { prelemTypes } from "../../theme/globalStyle";
import { usePrelemImpression } from "Common/ImpressionHooks/PrelemImpressionHook";

const AboutUsFourWithSubHeading = ({
  content,
  analytics,
  authoringHelper,
  secondaryArgs,
}: AboutUsFourWithSubHeadingProp) => {
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  const firstRender = useRef(true);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const gridVal = {
    md: [12, 12],
    em: [6, 6],
    lg: [6, 6],
  };
  const defaultStructureData = () => {
    let AboutUsFourWithSubHeadingStructureData;
    try {
      AboutUsFourWithSubHeadingStructureData = {
        "@context": "http://schema.org/",
        "@type": "Organization",
        name: content?.Title1,
        description: content?.Description1,
        member: {
          "@type": "OrganizationRole",
          member: {
            "@type": "Person",
            name: content?.Title2,
            description: content?.Description2,
          },
          roleName: content?.Description3,
        },
      };
    } catch (e) {
      AboutUsFourWithSubHeadingStructureData = {};
    }
    return AboutUsFourWithSubHeadingStructureData;
  };

  const genrateStructureData = () => {
    let AboutUsFourWithSubHeadingStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current === true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        AboutUsFourWithSubHeadingStructureData = JSON.parse(tempSD);
      } else {
        AboutUsFourWithSubHeadingStructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      AboutUsFourWithSubHeadingStructureData = defaultStructureData();
    }
    return AboutUsFourWithSubHeadingStructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = genrateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    content?.Title1,
    content?.Title2,
    content?.Description1,
    content?.Description2,
    content?.Description3,
    content?.ImageCompound?.ImageCompound_1?.original_image,
  ]);

  usePrelemImpression(analytics, inView);

  const firstColumnContent = () => {
    return (
      <Box className='firstColumnWrapper'>
        <Typography variant='h2medium' id='Title1'>
          {content.Title1}
        </Typography>
      </Box>
    );
  };

  const secondColumnContent = () => {
    return (
      <Box className='secondColumnWrapper'>
        <Typography
          variant='p3regular'
          id='Description1'
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(content.Description1 || ""),
          }}></Typography>
        <Box>
          {/* <img
            alt="img"
            src={DoubleQutoesIcon}
            width="66"
            height="46"
            className="quoteGap"
          /> */}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 25'
            width='70'
            height='48'
            className='doubleQuote'>
            <path d='M12.744 7.57652H8.52002V19.1605H0.0720215V7.44852C0.0720215 3.16051 2.50402 0.728516 6.79202 0.728516H12.744V7.57652ZM15.176 19.1605V7.44852C15.176 3.16051 17.608 0.728516 21.896 0.728516H27.848V7.57652H23.624V19.1605H15.176Z'></path>
          </svg>
          <Typography variant='p2regular' id='Description2'>
            {content.Description2}
          </Typography>
          <Box className='quotesColumn'>
            <Box className='imgWrapper'>
              <ImageRender
                originalImage={content?.ImageCompound?.ImageCompound_1?.original_image}
                publishedImages={content?.ImageCompound?.ImageCompound_1?.published_images}
                secondaryArgs={secondaryArgs}
                imgOrder={{
                  1440: "square",
                  1280: "square",
                  1024: "square",
                  768: "square",
                  600: "square",
                  320: "square",
                }}
              />
            </Box>
            <Box className='headingSubheading'>
              <Typography variant='p3semibold' id='Title2'>
                {content.Title2}
              </Typography>
              <Typography variant='p4regular' id='Description3'>
                {content.Description3}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };
  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.aboutUsfourWithsubHeadingWrapper} ${globalClasses.prelemType1} prelem prelemType1 aboutus-four-with-subheading aboutUsfourWithsubHeadingBg`}>
      <Container
        className={
          authoringHelper?.isEditPage ? "grid_full_width prelem-py" : "grid_container prelem-py"
        }
        ref={ref}>
        <TwoColumnLayout
          firstColumnContent={firstColumnContent()}
          secondColumnContent={secondColumnContent()}
          customClassName='AboutUsFourWithSubHeading'
          gridVal={gridVal}
          noPadding={true}
          col1Align='start'
          col2Align='start'
        />
      </Container>
    </div>
  );
};

interface AboutUsFourWithSubHeadingProp {
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
  Title1?: string;
  Title2?: string;
  Description1?: string;
  Description2?: string;
  Description3?: string;
  TagName?: string;
  ImageCompound: {
    ImageCompound_1: {
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
AboutUsFourWithSubHeading.defaultProps = {
  content: {
    Description1:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type a",
    Description2:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the",
    Description3:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the",

    TagName: "SiteComponents",
    Title1: "About us four with subheading",
    Title2: "Lorem ipsum",
    PrelemContentType: ["Select"],
    ImageCompound: {
      ImageCompound_1: {
        original_image: {
          original_image_relative_path:
            "machine_assets/1690290846248/public/png/AboutUsFourWithSubHeading",
          visibility: "public",
          ext: "png",
          bitStreamId: "",
          auto: true,
          MetaFields: {
            AltText: "aboutusfourwithsubheading",
            Name: "aboutusfourwithsubheading",
            Title: "aboutusfourwithsubheading",
            Description: "This is for aboutusfourwithsubheading",
            Attribution: false,
          },
        },
        published_images: [
          {
            aspect_ratio: "square",
            folder_path: "machine_assets/1690290846248/public/png/AboutUsFourWithSubHeading-square",
          },
          {
            aspect_ratio: "landscape",
            folder_path:
              "machine_assets/1690290846248/public/png/AboutUsFourWithSubHeading-landscape",
          },
          {
            aspect_ratio: "portrait",
            folder_path:
              "machine_assets/1690290846248/public/png/AboutUsFourWithSubHeading-portrait",
          },
          {
            aspect_ratio: "card1",
            folder_path: "machine_assets/1690290846248/public/png/AboutUsFourWithSubHeading-card1",
          },
          {
            aspect_ratio: "hero",
            folder_path: "machine_assets/1690290846248/public/png/AboutUsFourWithSubHeading-hero",
          },
          {
            aspect_ratio: "card2",
            folder_path: "machine_assets/1690290846248/public/png/AboutUsFourWithSubHeading-card2",
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
    pageTitle: "About Us 4 With SubHeading",
    pageDesc: "This prelem can be used to add About Us 4 With SubHeading anywhere in the website.",
    pageTags: "Text, Full Width, About Us 4 With SubHeading",
    prelemTags: "Text, Full Width, About Us 4 With SubHeading",
  },
  secondaryArgs: {
    gcpUrl: "https://storage.googleapis.com",
    bucketName: "cropped_image_public",
  },
};
export default AboutUsFourWithSubHeading;
