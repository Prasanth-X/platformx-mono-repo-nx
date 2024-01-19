import { Box, Typography, Grid, Container } from "@mui/material";
import React, { useState, useEffect } from "react";
// import { useTranslation } from "react-i18next";
// import "../../service/i18n";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getDynamicContentListApiCall } from "@platformx/utilities";
import XCard4 from "../../components/Cards/XCard4/XCard4";
import ReplaceComponent from "../../components/Replace/ReplaceComponent";
import CardSkeleton from "../../components/Cards/CardSkeleton";
import { useCustomStyle } from "./DynamicPrelemWithCarousel1.style";

const DynamicPrelemWithCarousel1 = ({ content, authoringHelper, secondaryArgs = {} }: any) => {
  const classes = useCustomStyle();
  const [loading, setLoading] = useState(false);
  const [contentList, setContentList] = React.useState([]);
  // const { t } = useTranslation();
  const [start, setStart] = useState(0);
  const numberOfRows = 3;

  const getContentList = async () => {
    setLoading(true);
    try {
      const contentListFromAPI = await getDynamicContentListApiCall({
        params: content?.QueryParam,
        secondaryArgs: secondaryArgs,
        start,
        numberOfRows,
      });

      if (contentListFromAPI) setContentList(contentListFromAPI);
      else setContentList([]);
      setLoading(false);
    } catch (err: any) {
      setContentList([]);
      setLoading(false);
    }
  };
  const getNextList = () => {
    setStart((prevState) => prevState + numberOfRows);
  };

  const getPreviousList = () => {
    if (start !== 0) setStart((prevState) => prevState - numberOfRows);
  };

  useEffect(() => {
    getContentList();
  }, [start, content?.QueryParam]);

  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.dynamicPrelemWithCarousel1} dynamicPrelemWithCarousel1Wrapper`}>
      <Container
        className={
          authoringHelper?.isEditPage ? `grid_full_width prelem-py` : `grid_container prelem-py`
        }>
        <Box className='textWrapper'>
          <Typography variant='h2medium' color='secondaryTitle' id='Title'>
            {content?.Title}
          </Typography>
          <Box className='navigationWrapper'>
            <ArrowBackIcon
              onClick={getPreviousList}
              className={`${start === 0 ? "arrowIconsDisabled" : ""} arrowIcons`}
              sx={{
                pointerEvents: start === 0 ? "none" : "",
              }}
            />
            <ArrowForwardIcon
              onClick={getNextList}
              className={`${contentList?.length === 0 ? "arrowIconsDisabled" : ""} arrowIcons`}
              sx={{
                pointerEvents: contentList?.length === 0 ? "none" : "",
              }}
            />
          </Box>
        </Box>
        <Grid
          container
          sx={{
            margin: "8px 0 0 0",
            position: "relative",
            "&:hover": {
              ".add-content-overlay": {
                display: authoringHelper?.authoringHoverShow ? "flex !important" : "none",
              },
            },
          }}>
          {loading ? (
            <Box>
              <CardSkeleton />
            </Box>
          ) : contentList?.length > 0 ? (
            <Box sx={{ marginLeft: "-15px", marginRight: "-15px" }}>
              <Grid container>
                {contentList.map((item: any, index: any) => {
                  return (
                    <Grid item xs={12} lg={4} px='15px' key={index}>
                      <XCard4 content={item} secondaryArgs={secondaryArgs} />
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          ) : (
            <Box className='noResultFound'>
              <Typography variant='p3regular' color='secondaryParagraph'>
                {/* {t("no_result_found")} */}
                No results found
              </Typography>
            </Box>
          )}
          <Box className='add-content-overlay'>
            <ReplaceComponent secondaryArgs={secondaryArgs} />
          </Box>
        </Grid>
      </Container>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

DynamicPrelemWithCarousel1.defaultProps = {
  content: {
    Title: "Lorem ipsum dolor sit amet",
    Description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    QueryParam: {
      filter: "ALL",
      tags: ["Articles"],
      searchTerm: "",
      pagination: { start: 0, rows: 6 },
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
    authoringHoverShow: false,
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
    prelemTags: ["Content", "Dynamic", "Dynamic Prelem", "Article", "VOD"],
  },
  secondaryArgs: {
    prelemBaseEndpoint: {
      APIEndPoint: "https://dev.prelem.hcl-x.com/platform-x/v1/authoring",
      device: "window",
      buttonBaseUrl: "https://platx-publish-dev.fanuep.com/",
    },
    editState: false,
    multiSlot: {},
    gcpUrl: "https://storage.googleapis.com",
    bucketName: "cropped_image_public",
  },
};

export default DynamicPrelemWithCarousel1;
