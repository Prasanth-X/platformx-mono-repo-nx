import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useCustomStyle } from "./LearningList.style";
import ListTabs from "./Tabs/ListTabs";

const LearningList = ({ content, authoringHelper, secondaryArgs = {} }: any) => {
  const classes = useCustomStyle();
  return (
    <div ref={authoringHelper?.innerRef} className={`${classes.learningLintWrapper} learningLint`}>
      <Container className={`${classes.learningLintWrapper} grid_container prelem-py`}>
        <Grid container>
          <Grid xs={12} md={12}>
            <Box className='topContentRapper'>
              <Typography variant='h1bold' id='Title'>
                {content?.Title}
              </Typography>
              <Typography variant='p3regular'>{content?.Description}</Typography>
            </Box>
            <Box className='listingTabsWrapper'>
              <ListTabs secondaryArgs={secondaryArgs} authoringHelper={authoringHelper} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

LearningList.defaultProps = {
  content: {
    Title: "Lorem ipsum dolor sit amet",
    Description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    QueryParam: {
      filter: "All",
      tags: [],
      searchTerm: "",
      pagination: { start: 0, rows: 4 },
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
      APIEndPoint: "https://platx-api-dev.fanuep.com/platform-x/",
      device: "window",
      buttonBaseUrl: "https://platx-publish-dev.fanuep.com/",
    },
    editState: false,
    multiSlot: {},
  },
};

export default LearningList;
