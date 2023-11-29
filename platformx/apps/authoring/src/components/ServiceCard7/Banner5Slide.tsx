import React from "react";
import { Typography, Box } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import "./Banner5.css";
import BasicButton from "./BasicButton/BasicButton";

const Banner5Slide = ({
  idfortitle,
  title,
  img,
  analytics,
  authoringHelper,
  secondaryArgs,
  handleTrack,
  ButtonObj,
  defaultObj,
  buttonDataObj,
  showSlide,
}: Banner5SlideProps) => {
  return (
    <>
      <Box
        className={
          authoringHelper?.isEditing
            ? "slideWithoutStyles"
            : `slide ${showSlide ? "active" : ""}`
        }
        sx={{
          backgroundImage: `url(${img})`,
          ...(authoringHelper?.isEditing && {
            visibility: showSlide ? "visible" : "hidden",
          }),
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "0",
            bottom: "0",
            background: "rgba(0, 0, 0, 0.4)",
            width: "100%",
            color: "#FFFFFF",
          }}
        ></Box>
        <Box className="slide-content">
          <Box
            className="slide-caption"
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "85%",
            }}
          >
            <Box className={`animationEffect ${showSlide ? "animated" : ""}`}>
              <Typography
                id={idfortitle}
                variant="h1regular"
                className="headerLight"
                sx={{
                  marginBottom: "23px",
                }}
              >
                {title}
              </Typography>
              <BasicButton
                openButtonEditWindow={
                  authoringHelper?.openButtonEditWindowInAuthoringCB
                }
                isAuthoring={analytics?.isAuthoring}
                handleTrack={handleTrack}
                currentBtnEditing={
                  authoringHelper?.selectedButtonNameForEditing
                }
                variant="ecommerceButton"
                analyticsEnabled={analytics?.isAnalyticsEnabled}
                ButtonObj={ButtonObj}
                isEditing={authoringHelper?.isEditing}
                defaultObj={defaultObj}
                buttonDataObj={buttonDataObj}
                secondaryArgs={secondaryArgs}
                endIcon={<EastIcon className="arrowIcon icon headerLight" />}
              />
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
  img: string;
  analytics: Analytics;
  authoringHelper: AuthoringHelper;
  secondaryArgs: any;
  handleTrack: any;
  ButtonObj: object;
  defaultObj: object;
  buttonDataObj: object;
  showSlide: boolean;
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
  sendDefaultStructureDataForResetToAuthoringCB: (
    structureData: string
  ) => void;
  openButtonEditWindowInAuthoringCB: (buttonObj?: object, e?: object) => void;
  selectedButtonNameForEditing: string;
  isEditing: boolean;
  buttonRef?: React.Ref<HTMLButtonElement>;
  buttonContentEditable?: boolean;
  lastSavedStructuredData?: string;
}
export default Banner5Slide;
