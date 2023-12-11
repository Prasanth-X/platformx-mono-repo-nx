import React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import { Divider } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./Blogs.css";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import Skeleton from "@mui/material/Skeleton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import BlogSearchBox from "./BlogSearchBox";

const BlogTimeline = ({
  searchIconClickedChild,
  showTitle,
  clickingUpArrow,
  clickingDownArrow,
  sortOrder,
  onSearch,
  eventUrl,
  secondaryArgs,
  list,
  fetchMoreData,
  isLazyLoad,
  detailedItem,
  loading,
}: any) => {
  const { t } = useTranslation();
  return (
    <Box className='blogTimelineSection'>
      <Box sx={{ display: { xs: "flex", md: "block" }, pr: 2, mb: "20px" }}>
        <Box
          sx={{
            justifyContent: "space-between",
            width: { xs: "98%", md: "100%" },
            display: showTitle ? "flex" : "none",
          }}>
          <Typography
            variant='h5bold'
            className='listTypography heading'
            component='p'
            sx={{ mb: 2 }}>
            {`${t("blogs_Timeline")}`}
          </Typography>
          <KeyboardArrowDownIcon
            sx={{
              display: { md: "none", xs: "block" },
              fontSize: "24px",
              color: "red",
              position: "relative",
              right: "16%",
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              mr: { xs: 2, md: 0 },
            }}>
            <KeyboardArrowUpIcon
              onClick={clickingUpArrow}
              className={sortOrder === "asc" ? "arrowIcon activeColor" : "arrowIcon"}
            />
            <KeyboardArrowDownIcon
              onClick={clickingDownArrow}
              className={
                sortOrder === "desc" ? "activeColor arrowIcon downArrow " : "arrowIcon downArrow"
              }
            />
          </Box>
        </Box>
        <BlogSearchBox
          style={{
            height: "40px",
            minHeight: "40px",
            width: "100%",
            marginBottom: "15px",
            display: { md: "block", xs: "none" },
          }}
          onSearch={onSearch}
          sortOrder={sortOrder}
          sendShowFlag={searchIconClickedChild}
          eventUrl={eventUrl}
          secondaryArgs={secondaryArgs}
        />
      </Box>
      <Divider sx={{ display: { md: "none" }, marginLeft: "-16px" }} />
      <Box
        sx={{
          overflowX: "hidden",
          display: { xs: "none", md: "block" },
        }}
        id='scrollableDiv'>
        {list?.length > 0 ? (
          <InfiniteScroll
            loader={null}
            dataLength={list?.length ? list?.length : 0}
            next={fetchMoreData}
            hasMore={isLazyLoad}
            scrollableTarget='scrollableDiv'>
            <Timeline className='listTimeline'>
              {list
                .filter((item: any) => item.title)
                .map((item: any, index: number, arr: any) => {
                  return (
                    <Box
                      onClick={() => detailedItem(item)}
                      key={item._id}
                      sx={{ cursor: "pointer" }}>
                      <TimelineItem className='listTimelineItem' key={item._id}>
                        <TimelineSeparator className='listTimelineSeparator'>
                          {loading ? (
                            <Skeleton
                              // width="50px"
                              width={62}
                              height={40}
                              sx={{ borderRadius: "50px" }}
                            />
                          ) : (
                            <TimelineDot variant='outlined' className='listTimelineDot'>
                              <Typography
                                className='listTypographyTime'
                                variant='h7regular'
                                component='p'>
                                {format(new Date(item.created_date), "H:mm")}
                              </Typography>
                            </TimelineDot>
                          )}
                          {arr.length - 1 !== index ? (
                            <TimelineConnector className='listTimelineConnector' />
                          ) : null}
                        </TimelineSeparator>
                        <TimelineContent
                          sx={{
                            display: "flex",
                            padding: "0px 16px !important",
                          }}>
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography
                              variant='h7regular'
                              className='listTypography eventTimeline'
                              component='p'>
                              {loading ? (
                                <Skeleton animation='wave' height={10} sx={{ mt: 2 }} />
                              ) : (
                                format(new Date(item.created_date), "MMM dd, yyyy | H:mm")
                              )}
                            </Typography>
                            <Typography
                              className='overflowtext listTypography'
                              variant='h6regular'
                              component='p'
                              sx={{
                                wordBreak: "break-all",
                              }}>
                              {loading ? <Skeleton animation='wave' height={10} /> : item.title}
                            </Typography>
                          </Box>
                        </TimelineContent>
                      </TimelineItem>
                    </Box>
                  );
                })}
            </Timeline>
          </InfiniteScroll>
        ) : (
          <>
            <Box className='noresultFound'>
              <Typography variant='h5regular' className='message'>
                {" "}
                {`${t("no_results_found")}`}
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default BlogTimeline;
