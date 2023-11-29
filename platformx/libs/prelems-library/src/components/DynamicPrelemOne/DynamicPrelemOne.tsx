import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
// import { useTranslation } from "react-i18next";
import CardSkeleton from "../../Common/Cards/CardSkeleton";
import XCard1 from "../../Common/Cards/XCard1/XCard1";
import XCard2 from "../../Common/Cards/XCard2/XCard2";
import XCard3 from "../../Common/Cards/XCard3/XCard3";
import ReplaceComponent from "../../Common/Replace/ReplaceComponent";
import CourseIcon from "../../assets/dynamicprelemicons/CourseIcon.png";
// import "../../service/i18n";
import { getLearningListApiCall } from "../../utils/helper";
import { getGridValues } from "../../utils/helperFns";
import { useCustomStyle } from "./DynamicPrelemOne.style";

const DynamicPrelemOne = ({ content, authoringHelper, secondaryArgs = {} }: any) => {
  const classes = useCustomStyle();
  const [loading, setLoading] = useState(false);
  const [courseList, setCourseList] = React.useState([]);
  const cardObj = { XCard1, XCard2, XCard3 };
  // const { t } = useTranslation();

  const getOngoingList = async () => {
    setLoading(true);
    // await sleep(2000);
    const userId = localStorage.getItem("userId");
    if (userId?.length) {
      try {
        const res = await getLearningListApiCall({
          userId: userId,
          secondaryArgs: secondaryArgs,
        });
        const { data: { data: { getuserCourses = [] } = {} } = {} } = res;
        const list =
          getuserCourses?.map((item: any) => {
            const { publisher, published_date, title, description, teaser_image, key } = item;
            return {
              adminName: publisher,
              publishDate: published_date,
              title,
              description,
              teaser_image,
              button_Name: "Learn more",
              courseId: key,
            };
          }) || [];
        if (list?.length > 0) setCourseList(list);
        else setCourseList([]);
        setLoading(false);
      } catch (err: any) {
        setCourseList([]);
        setLoading(false);
      }
    } else {
      setCourseList([]);
      setLoading(false);
    }
  };

  const onCardClick = (courseId: string) => {
    window.location.href = `${secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint}${secondaryArgs?.prelemBaseEndpoint?.language}/course/course-details?courseId=${courseId}`;
  };

  useEffect(() => {
    getOngoingList();
  }, [content?.QueryParam]);

  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.dynamicPrelemOne} dynamicPrelemOneWrapper`}>
      <Container
        className={
          authoringHelper?.isEditPage ? `grid_full_width prelem-py` : `grid_container prelem-py`
        }>
        <Typography variant='h2semibold' id='Title'>
          {content?.Title}
        </Typography>
        <Grid
          container
          sx={{
            margin: "0 -8px",
            position: "relative",
            "&:hover": {
              ".add-content-overlay": {
                display: authoringHelper?.authoringHoverShow ? "flex !important" : "none",
              },
            },
          }}>
          <>
            {loading ? (
              <Box>
                <CardSkeleton />
              </Box>
            ) : courseList?.length > 0 ? (
              courseList?.map((item: any, index: any) => {
                const { sm, em, cardType } = getGridValues(courseList, index);
                const CardComponent = cardObj[cardType];

                return (
                  <Grid
                    key={`${item?.adminName}_${index.toString()}`}
                    item
                    xs={12}
                    sm={sm}
                    em={em}
                    rowSpacing={1}
                    p={1}>
                    <CardComponent
                      content={item}
                      secondaryArgs={secondaryArgs}
                      onCardClick={() => onCardClick(item.courseId)}
                      Icon={CourseIcon}
                    />
                  </Grid>
                );
              })
            ) : (
              <Box className='textWrapper'>
                <Typography variant='p3regular'>
                  {/* {t("no_result_found")} */}
                  No results found
                </Typography>
              </Box>
            )}
            <Box className='add-content-overlay'>
              <ReplaceComponent secondaryArgs={secondaryArgs} />
            </Box>
          </>
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

DynamicPrelemOne.defaultProps = {
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

export default DynamicPrelemOne;
