import React, { useState } from "react";
import { Grid, Typography, CardHeader, Chip, Box, Button } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LinkIcon from "@mui/icons-material/Link";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Countdown, { zeroPad } from "react-countdown";
import { useTranslation } from "react-i18next";
import liveIcon from "../../assets/red_blinking_gif.gif";
import {
  capitalizeFirstLetter,
  dateFormat,
  nullToObject,
  nullToString,
  timeFormat,
} from "../../utils/helperFns";
import Share from "../Share/Share";
import CompletionList from "./CompletionList";
import "./Events.css";

const EventDetails = ({
  content = {},
  eventState,
  embedData,
  enablePreview,
  getEventUrl,
  showPublishedDate,
  showEventDetails,
}: any) => {
  const { t } = useTranslation();
  const { PageTags = [] } = nullToObject(content);

  const renderTagList = () => {
    let TagLists = [...PageTags];
    if (content?.PageTags?.length > 3) {
      TagLists = TagLists.splice(0, 3);
    }
    return TagLists;
  };
  const [timeover, setTimeover] = useState(eventState);

  const completeTime = () => {
    setTimeover("live");
  };

  const handleCommaValue = (data: string | number) => {
    if (data) {
      return ",";
    }
    return "";
  };

  const liveComplete = () => {
    setTimeover("completed");
  };

  const textForStart = (eventStatus: any) => {
    switch (eventStatus) {
      case "tobestart":
        return (
          <Typography variant='h6semibold' className='marginZeroBottom'>{`${t(
            "event_will_start_at",
          )}`}</Typography>
        );
      case "completed":
        return (
          <Typography variant='h6semibold' className='marginZeroBottom'>{`${t(
            "event_started_at",
          )}`}</Typography>
        );
      case "live":
        return (
          <Typography variant='h6semibold' className='marginZeroBottom'>{`${t(
            "event_started_at",
          )}`}</Typography>
        );
      default:
        return "";
    }
  };
  const textForEnd = (eventStatus: any) => {
    switch (eventStatus) {
      case "tobestart":
        return (
          <Typography variant='h6semibold' className='marginZeroBottom'>{`${t(
            "event_will_end_at",
          )}`}</Typography>
        );
      case "completed":
        return (
          <Typography variant='h6semibold' className='marginZeroBottom'>{`${t(
            "Event_ended_at",
          )}`}</Typography>
        );
      case "live":
        return (
          <Typography variant='h6semibold' className='marginZeroBottom'>{`${t(
            "event_will_end_at",
          )}`}</Typography>
        );
      default:
        return "";
    }
  };
  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (!completed) {
      return (
        <Box>
          <Typography variant='h2semibold'>
            {/* {`${days} ${pluralize(days, 'day')} ${hours} ${pluralize(hours, 'hour')} ${minutes} ${pluralize(minutes, 'minute')} ${seconds} ${pluralize(seconds, 'second')}`} */}
            {`${zeroPad(days)} : ${zeroPad(hours)} : ${zeroPad(minutes)} : ${zeroPad(seconds)}`}
          </Typography>
        </Box>
      );
      // Render a complete state
    }

    return "";
  };
  const styles = `.addressArea{
 display: -webkit-box;
-webkit-line-clamp: 3;
line-clamp: 3;
 -webkit-box-orient: vertical;
 overflow: hidden;
 word-break: break-word;
  }
  
  .eventlinkaddress{
    display: -webkit-box;
-webkit-line-clamp: 1;
line-clamp: 1;
 -webkit-box-orient: vertical;
 overflow: hidden;
 word-break: break-word;
  }`;

  return (
    <>
      <style> {styles}</style>
      <Grid
        className='eventDetailsWrapper'
        sx={{
          display: { xs: "flex" },
          flexDirection: { xs: "column" },
          padding: { xs: "10px", md: "20px", em: "30px" },
          width: "100%",
        }}>
        <Grid xs={12} md={12}>
          {content?.event_start_date && content?.event_end_date ? (
            <Box
              sx={{
                display: "flex",
                flexBasis: "unset !important",
                justifyContent: timeover === "live" ? "flex-end" : "flex-start",
              }}>
              <Box
                sx={{
                  alignItems: timeover === "live" ? "end" : "center",
                  justifyContent: timeover === "live" ? "flex-start" : "center",
                  color: "#fff",
                }}>
                {timeover === "tobestart" ? (
                  <>
                    <Typography variant='h4regular' color='textColor'>
                      {`${t("event_will_start_in")}`}
                    </Typography>
                    <Box
                      className='countDownTimer'
                      sx={{
                        paddingTop: "10px",
                      }}>
                      <Countdown
                        date={content?.event_start_date}
                        renderer={renderer}
                        onComplete={completeTime}
                      />
                    </Box>
                  </>
                ) : null}
                {timeover === "completed" ? (
                  <>
                    <Typography
                      variant='h4regular'
                      color='textColor'
                      sx={{ paddingLeft: { xs: "20px", md: "0" } }}>
                      {`${t("Event_ended_at")}`}
                    </Typography>
                    <Box>
                      <CompletionList content={content} />
                    </Box>
                  </>
                ) : (
                  ""
                )}
                {timeover === "live" ? (
                  <>
                    <Box>
                      <Typography
                        variant='h6regular'
                        color='textColor'
                        sx={{
                          border: "1px solid #ff0000",
                          padding: "5px",
                          width: "90px",
                          borderRadius: "4px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-evenly",
                        }}>
                        <img
                          src={liveIcon}
                          alt='Live'
                          style={{
                            width: "22%",
                            objectFit: "contain",
                            filter: "drop-shadow(-6px 23px 30px rgba(0,0,0,0.4))",
                            borderRadius: "20px",
                            marginRight: "6px",
                            position: "relative",
                            // top: "1px",
                          }}
                        />
                        <div style={{ display: "none" }}>
                          <Countdown
                            date={content?.event_end_date}
                            renderer={renderer}
                            onComplete={liveComplete}
                          />
                        </div>

                        <span>{`${t("live")}`}</span>
                      </Typography>
                      <Box sx={{ fontSize: "28px", paddingTop: "36px" }}></Box>
                    </Box>
                  </>
                ) : (
                  ""
                )}
              </Box>
            </Box>
          ) : (
            ""
          )}
        </Grid>
        <Grid
          xs={12}
          md={12}
          sx={{
            display: "flex",
            flexWrap: "wrap",
          }}>
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              marginTop: { xs: "5px", md: "15px" },
              paddingRight: { md: "100px" },
            }}
            className='flexOrder1 titleText'>
            <Box
              style={{ boxShadow: "none", borderRadius: "0px" }}
              sx={{
                background: "none",
                color: "textColor",
              }}>
              <Typography className='eventTitle' color='textColor' variant='h1bold'>
                {content?.title}
              </Typography>
              <Typography
                variant='p2regular'
                color='textColor'
                sx={{
                  wordWrap: "break-word",
                  marginTop: { xs: "4%", sm: "14px" },
                  display: "-webkit-box",
                  "-webkitBoxOrient": "vertical",
                  "-webkitLineClamp": "2",
                  overflow: "hidden",
                }}
                // dangerouslySetInnerHTML={{ __html: content?.Description }}
              >
                {content?.description}
              </Typography>

              <Box
                sx={{
                  margin: { xs: "3% 0 4%", sm: "0 0 4%" },
                  display: "inline-block",
                  width: "100%",
                }}>
                <Box
                  sx={{
                    marginTop: "30px",
                    width: { xs: "100%", sm: "100%" },
                    float: { sm: "left" },
                  }}>
                  <CardHeader
                    sx={{ padding: "0" }}
                    titleTypographyProps={{
                      variant: "h6medium",
                      className: "title",
                      sx: { float: "left", paddingRight: "5px", width: "auto" },
                    }}
                    title={`${capitalizeFirstLetter(content?.createdBy)} |`}
                    subheaderTypographyProps={{
                      variant: "h6medium",
                      className: "title",
                    }}
                    subheader={showPublishedDate()}
                  />
                  <Box sx={{ marginTop: "1%", display: "flex" }}>
                    {content?.PageTags.length > 3 ? (
                      <Box>
                        {renderTagList().map((tag: string) => {
                          return (
                            <Chip
                              label={tag}
                              key={tag}
                              variant='outlined'
                              className='badgeButton'
                            />
                          );
                        })}
                        <Box
                          style={{
                            float: "left",
                            padding: "10px",
                          }}>
                          +{content?.PageTags.length - 3}
                        </Box>
                      </Box>
                    ) : (
                      <Box>
                        {renderTagList().map((tag: string) => {
                          return (
                            <Chip
                              label={tag}
                              key={tag}
                              variant='outlined'
                              className='badgeButton'
                            />
                          );
                        })}
                      </Box>
                    )}

                    <Box></Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    marginTop: { xs: "18px", sm: "20px" },
                    width: { xs: "100%", sm: "50%" },
                    float: { sm: "left" },
                  }}>
                  <Typography
                    variant='subtitle2'
                    color='textColor'
                    sx={{
                      textAlign: "left",
                    }}>
                    {`${t("events_share")}`}
                  </Typography>
                  <Box sx={{ float: "left" }}>
                    <Share
                      domainUrl={getEventUrl()}
                      shareUrl={content?.settings?.socialog_url}
                      embedData={embedData}
                      border='1px solid #fff'
                      whiteIcon={true}
                      enablePreview={enablePreview}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          {/* whitebox start grid */}
          {content?.event_start_date ||
          content?.event_end_date ||
          (content?.google_api_address && content?.virtual_address) ||
          content?.actual_address ? (
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                flexBasis: "unset",
                alignItems: "flex-start",
                margin: { xs: 0 },
              }}
              className='flexOrder3'>
              <Box className='eventDetailsPanel'>
                {content?.event_start_date && (
                  <Box>
                    {textForStart(timeover)}
                    <Box sx={{ display: "flex" }}>
                      <Box sx={{ display: "inline-flex" }}>
                        <Typography
                          variant='h6regular'
                          className='widthAuto'
                          sx={{ paddingRight: "10px" }}>
                          <CalendarMonthOutlinedIcon />
                        </Typography>
                        <Typography variant='h6regular'>
                          {dateFormat(content?.event_start_date)}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          paddingLeft: "30px",
                          display: "inline-flex",
                        }}>
                        <Typography variant='h6regular' sx={{ paddingRight: "10px" }}>
                          <AccessTimeIcon />
                        </Typography>
                        <Typography variant='h6regular'>
                          {timeFormat(content?.event_start_date)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                )}
                {content?.event_start_date && content?.event_end_date ? (
                  <Box>
                    {textForEnd(timeover)}
                    <Box sx={{ display: "flex" }}>
                      <Box sx={{ display: "inline-flex" }}>
                        <Typography
                          variant='h6regular'
                          className='widthAuto'
                          sx={{ paddingRight: "10px" }}>
                          <CalendarMonthOutlinedIcon />
                        </Typography>
                        <Typography variant='h6regular'>
                          {dateFormat(content?.event_end_date)}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          paddingLeft: "30px",
                          display: "inline-flex",
                        }}>
                        <Typography variant='h6regular' sx={{ paddingRight: "10px" }}>
                          <AccessTimeIcon />
                        </Typography>
                        <Typography variant='h6regular'>
                          {timeFormat(content?.event_end_date)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  ""
                )}

                {content?.google_api_address && content?.virtual_address ? (
                  <Box>
                    <Typography variant='h6semibold' className='marginZeroBottom'>{`${t(
                      "event_Link",
                    )}`}</Typography>
                    <Box sx={{ display: "flex" }}>
                      <Typography
                        variant='h6regular'
                        className='widthAuto'
                        sx={{ paddingRight: "10px" }}>
                        <LinkIcon className='eventlinkIcon' />
                      </Typography>
                      <Typography variant='h6regular' sx={{ paddingRight: "10px" }}>
                        <a
                          className='eventlinkaddress'
                          rel='noopener noreferrer'
                          href={content?.virtual_address}
                          target={"_blank"}>
                          {content?.virtual_address}
                        </a>
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  ""
                )}
                {content?.actual_address ? (
                  <Box>
                    <Typography variant='h6semibold' className='marginZeroBottom'>{`${t(
                      "event_Location",
                    )}`}</Typography>
                    <Box sx={{ display: "flex" }}>
                      <Typography
                        variant='h6regular'
                        className='widthAuto'
                        sx={{ paddingRight: "10px" }}>
                        <LocationOnOutlinedIcon />
                      </Typography>
                      <Typography variant='h6regular' sx={{ paddingRight: "10px" }}>
                        {/* <a
                            className="addressArea"
                            rel="noopener noreferrer"
                            href={`http://maps.google.com/?q=${content?.actual_address}, ${content?.locality}, ${content?.region_state}, ${content?.country}, ${content?.postal_code}`}
                            target="_blank"
                          >
                            {`${content?.actual_address}, ${content?.locality}, ${content?.region_state}, ${content?.country}, ${content?.postal_code}`}
                          </a> */}
                        <a
                          className='addressArea'
                          rel='noopener noreferrer'
                          href={`http://maps.google.com/?q=${nullToString(
                            content?.actual_address,
                          )}, ${nullToString(content?.locality)}, ${nullToString(
                            content?.region_state,
                          )}, ${nullToString(content?.country)}, ${nullToString(
                            content?.postal_code,
                          )}`}
                          target='_blank'>
                          {`${nullToString(content?.actual_address)}, ${nullToString(
                            content?.locality,
                          )}, ${nullToString(content?.region_state)}, ${nullToString(
                            content?.country,
                          )}, ${nullToString(content?.postal_code)} ${handleCommaValue(
                            nullToString(content?.postal_code),
                          )}`}
                        </a>
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  ""
                )}
              </Box>
            </Grid>
          ) : (
            ""
          )}
        </Grid>
        <Grid xs={12} className='' sx={{ display: "flex", alignItems: "end" }}>
          <Box
            sx={{
              textAlign: "center",
              marginTop: { xs: "10px", md: "0" },
              width: "100%",
            }}>
            <Button
              variant='defaultButton2'
              className='eventDetailButton'
              startIcon={<ExpandMoreIcon sx={{ fill: "#fff" }} />}
              onClick={showEventDetails}>
              {`${t("show_Details")}`}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default EventDetails;
