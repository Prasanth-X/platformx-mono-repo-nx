import React, { useState, useEffect } from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineContent from "@mui/lab/TimelineContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import { format } from "date-fns";
import "./BlogContent.css";
import "./Blogs.css";
import DOMPurify from "isomorphic-dompurify";
import BlogShareDialogBox from "./BlogShareDialogBox";
import { encodeGetParams } from "../../utils/helperFns";
import { useTranslation } from "react-i18next";

function BlogContent(props: any) {
  const { t } = useTranslation();
  const { getEventUrl = "" } = props;

  const [selList, setSelList] = useState([]);

  const timeSince = (indate: any) => {
    const date = new Date(indate);
    const curDate = new Date();

    const seconds = Math.floor((curDate.getTime() - date.getTime()) / 1000);

    let interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + "years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + "months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + "d ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + "h ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + "m ago";
    }
    return Math.floor(seconds) + "s ago";
  };

  useEffect(() => {
    setSelList(props?.selectedBlogDetail);

    if (props.selectedId != null) {
      const useId = props.selectedId;
      const ele = document.getElementById(useId);
      if (ele) {
        ele.scrollIntoView({ behavior: "smooth" });
      }
    }
  });

  return (
    <>
      <Box className='blogContent'>
        <Box
          className='contentArea'
          sx={{
            overflowX: "none",
          }}
          id='scrollableDiv'>
          {selList?.length > 0 ? (
            <Timeline sx={{ margin: 0 }} className='listItemWrapper'>
              {selList.map((item: any, index: number) => {
                const fbShareId = encodeGetParams({ blogShareId: item?._id });
                return (
                  <>
                    <TimelineItem
                      className='blogTimelineItem'
                      key={item._id}
                      id={item._id}
                      // sx={{
                      //   alignItems: "baseline",
                      //   display: "flex",
                      //   flexDirection: { xs: "cloumn", md: "row" },
                      //   marginTop: { xs: "15px !importany", md: 0 },
                      // }}
                    >
                      {/* <TimelineItem > */}
                      {/* <TimelineSeparator className="blogTimelineSeparator">
                      <TimelineDot
                        className="WithoutBorder"
                        variant="outlined"
                        sx={{
                          border: "none !important",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "unset !important",
                        }}
                      >

                      </TimelineDot>
                    </TimelineSeparator> */}
                      <TimelineContent sx={{ display: "flex", padding: 0 }}>
                        <Box
                          sx={{
                            flexGrow: 0,
                            width: { xs: "30%", md: "20%", em: "20%" },
                          }}>
                          {item.created_date ? (
                            <>
                              <Typography variant='h5medium' component='p' className='description'>
                                {timeSince(item.created_date)}
                              </Typography>

                              <Typography variant='h7medium' component='p' className='description'>
                                {format(new Date(item.created_date), "MMM d, yyyy")}
                              </Typography>
                            </>
                          ) : null}
                        </Box>
                        <Box
                          sx={{
                            flexGrow: "1",
                            width: { xs: "60%", md: "75%", em: "70%" },
                          }}>
                          {item?.key_highlighter?.[0]?.highlighter ? (
                            <Box
                              sx={{
                                display: "flex",
                                columnGap: "5px",
                                alignItems: "center",
                                paddingBottom: "8px",
                              }}>
                              <>
                                {item.key_highlighter[0].highlighter ? (
                                  <Typography
                                    variant='h7medium'
                                    component='p'
                                    className='description'
                                    key={item.key_highlighter[0]._id}>
                                    {item.key_highlighter[0].highlighter}
                                  </Typography>
                                ) : null}
                                {item.key_highlighter[0]?.time ? (
                                  <>
                                    <span className='dotSeprator'></span>
                                    <Typography
                                      variant='h7medium'
                                      component='p'
                                      className='description'>
                                      {format(
                                        new Date(item.key_highlighter[0]?.time),
                                        "MMM dd, yyyy | H:mm",
                                      )}
                                    </Typography>
                                  </>
                                ) : null}
                              </>
                            </Box>
                          ) : null}
                          {item?.title ? (
                            <Typography
                              variant='h5medium'
                              component='p'
                              className='heading'
                              sx={{
                                wordBreak: "break-all",
                                paddingBottom: "8px",
                                // marginTop: { xs: "15px", md: "0" },
                              }}>
                              {item?.title}
                            </Typography>
                          ) : null}
                          {item?.authors[0] ? (
                            <>
                              <Typography
                                variant='p4regular'
                                component='q'
                                className='description'
                                sx={{
                                  fontStyle: "italic",
                                  wordBreak: "break-all",
                                  "&::before": {
                                    content: "open-quote",
                                  },
                                  span: {
                                    display: "contents",
                                  },
                                }}
                                dangerouslySetInnerHTML={{
                                  __html: DOMPurify.sanitize(item?.description),
                                }}></Typography>
                              <Typography
                                variant='h7medium'
                                component='p'
                                className='heading'
                                sx={{
                                  wordBreak: "break-all",
                                  textAlign: "right",
                                  fontStyle: "italic",
                                }}>
                                {`— ${item?.authors[0]}`}
                              </Typography>
                            </>
                          ) : (
                            <Typography
                              variant='p4regular'
                              component='p'
                              className='description'
                              sx={{
                                // color: "#5c6574",
                                wordBreak: "break-all",
                              }}
                              dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(item?.description),
                              }}></Typography>
                          )}
                          {item?.embeded?.[0]?.code ? (
                            <>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: item?.embeded[0].code,
                                  // __html: `<iframe src="https://platx-publish-dev.fanuep.com/en/embed/article/crop-final-check" width="360" height="203" style="border:none;overflow:hidden"></iframe>`
                                }}></div>
                            </>
                          ) : null}
                        </Box>
                        <Box
                          sx={{
                            flexGrow: "0",
                            paddingLeft: "5px",
                            // marginTop: { xs: "25px", md: "0 !important" },
                            width: "10%",
                            textAlign: "right",
                            cursor: "pointer",
                          }}>
                          {/* share */}
                          <BlogShareDialogBox shareUrl={`${getEventUrl}?${fbShareId}`} />
                        </Box>
                      </TimelineContent>
                    </TimelineItem>
                    <Divider
                      className={`${
                        selList?.length - 1 === index ? "lastLine" : ""
                      } horizontalDivider`}
                    />
                  </>
                );
              })}
            </Timeline>
          ) : (
            <Box className='noresultFound'>
              <Typography variant='h5regular' className='message'>
                {" "}
                {`${t("no_results_found")}`}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}

export default BlogContent;
