import React from "react";
import { Typography, Box } from "@mui/material";
import BasicButton from "../BasicButton/BasicButton";
import EastIcon from "@mui/icons-material/East";
import "./Banner5.css";
import ImageRender from "../../Common/ImageRender";

const Banner5Slide = ({
  idfortitle,
  title,
  img,
  analytics,
  authoringHelper,
  secondaryArgs,
  ButtonObj,
  buttonDataObj,
  showSlide,
}: Banner5SlideProps) => {
  return (
    <>
      <Box
        className={
          authoringHelper?.isEditing ? "slideWithoutStyles" : `slide ${showSlide ? "active" : ""}`
        }
        sx={{ display: showSlide ? "block" : "none" }}>
        <Box className='gradient'></Box>
        <ImageRender
          originalImage={img?.original_image}
          publishedImages={img?.published_images}
          secondaryArgs={secondaryArgs}
          imgOrder={{
            1440: "landscape",
            1280: "landscape",
            1024: "card2",
            768: "square",
            600: "card1",
            320: "portrait",
          }}
        />
        {/* <img
          src={img}
          width="100%"
          height="100%"
          style={{ objectFit: "cover" }}
          alt="back"
        /> */}
        <Box className='slide-content'>
          <Box className={`slide-caption caption`}>
            <Box
              className={`animationEffect ${
                !authoringHelper?.isEditing && showSlide ? "animated" : ""
              }`}>
              <Typography
                className='animatedTitle'
                id={idfortitle}
                variant='h1regular'
                color='textColor'>
                {title}
              </Typography>
              <Box className='linkButton'>
                <BasicButton
                  openButtonEditWindow={authoringHelper?.openButtonEditWindowInAuthoringCB}
                  isAuthoring={analytics?.isAuthoring}
                  currentBtnEditing={authoringHelper?.selectedButtonNameForEditing}
                  variant='defaultButton3'
                  analyticsEnabled={analytics?.isAnalyticsEnabled}
                  ButtonObj={ButtonObj}
                  isEditing={authoringHelper?.isEditing}
                  buttonDataObj={buttonDataObj}
                  secondaryArgs={secondaryArgs}
                  endIcon={<EastIcon />}
                  analytics={analytics}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

interface Banner5SlideProps {
  idfortitle: string;
  title: string;
  img: {
    original_image: object;
    published_images: PublishedImages[];
  };
  analytics: Analytics;
  authoringHelper: AuthoringHelper;
  secondaryArgs: any;
  ButtonObj: object;
  buttonDataObj: object;
  showSlide: boolean;
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
}
export default Banner5Slide;
