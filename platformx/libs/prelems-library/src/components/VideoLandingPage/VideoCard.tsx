import React from "react";
import { Grid, Typography, CardMedia, Card, CardActions, Box } from "@mui/material";
import { format } from "date-fns";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";

const VideoCard = ({ item, index }: any) => {
  const onClickCard = (id: string) => {
    if (typeof window !== "undefined") window.open(`/video${id}`);
  };

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      sx={{
        height: { xs: "100px", sm: "100%" },
        margin: { xs: "11px 0", sm: "0px" },
        paddingTop: { xs: "0", sm: "8px" },
        paddingBottom: { xs: "0", sm: "8px" },
        paddingLeft: { xs: "0px", sm: parseInt(index) === 0 ? "0px" : "8px" },
        paddingRight: { xs: "0px", sm: parseInt(index) === 2 ? "0px" : "8px" },
      }}>
      <Card
        style={{
          boxShadow: "none",
          cursor: "pointer",
          borderRadius: "5px",
          position: "relative",
        }}
        sx={{ border: { sm: "solid 1px #ced3d9" }, height: { sm: "235px" } }}
        onClick={() => onClickCard(item.CurrentPageURL)}>
        <CardMedia
          component='img'
          // height="130px"
          image={item?.Thumbnail}
          alt='green iguana'
          style={{
            objectFit: "fill",
          }}
          sx={{
            width: { xs: "44%", sm: "100%" },
            float: { xs: "left", sm: "none" },
            height: { xs: "100px", sm: "116px" },
            borderRadius: { xs: "5px 0 0 5px", sm: "5px 5px 0 0" },
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: { xs: "52px", sm: "70px" },
            left: { xs: "6px", sm: "9px" },
          }}>
          <PlayCircleOutlineRoundedIcon sx={{ color: "white", fontSize: "40px" }} />
        </Box>
        <CardActions
          sx={{
            position: { sm: "relative" },
            padding: { xs: "0 0 0 18px", sm: "15px 12px 10px" },
            height: { sm: "115px" },
          }}>
          <Box sx={{ position: { sm: "absolute" }, top: { sm: "8px" } }}>
            <Typography
              gutterBottom
              variant='subtitle1'
              component='h6'
              style={{
                fontWeight: "500",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}>
              {item?.Title}
            </Typography>
            <Box
              sx={{
                position: { xs: "absolute", sm: "unset" },
                bottom: { xs: "0", sm: "initial" },
              }}>
              <Typography
                gutterBottom
                variant='subtitle2'
                color='text.secondary'
                component='div'
                style={{ fontWeight: "600", marginBottom: "0" }}>
                {item?.Author}
              </Typography>
              <Typography
                variant='subtitle2'
                color='text.secondary'
                style={{ fontWeight: "normal" }}>
                {format(new Date(item?.PublishedDate), "MMM d, yyyy")} |{" "}
                {format(new Date(item?.PublishedDate), "kk:mm")}
              </Typography>
            </Box>
          </Box>
        </CardActions>
      </Card>
    </Grid>
  );
};

VideoCard.defaultProps = {
  item: {
    Page: "test3434",
    Title: "test3434",
    Description: "Testjhgddsf3434",
    TagName: "VOD",
    Thumbnail:
      "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/7166e3a0-a3cd-429e-b4b0-6d13c4314c8d/content",
    CurrentPageURL: "/test3434",
    ParentPageURL: "/",
    DsapceVideoUrl:
      "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/2bac1054-11e1-4f62-98df-a20ff14132e1/content",
    Page_LastModifiedBy: "Medha",
    PublishedDate: "2022-11-29T12:49:59Z",
    Author: "Medha",
  },
  index: 0,
};

export default VideoCard;
