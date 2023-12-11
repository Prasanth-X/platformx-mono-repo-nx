import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Card, CardContent, CardMedia, Typography, Box, Divider, IconButton } from "@mui/material";
import { format } from "date-fns";

const VideoGallery = ({
  content,
}: //secondaryArgs,
VideoGalleryProps) => {
  return (
    <Card style={{ position: "relative", height: "100%" }}>
      <CardMedia
        component='img'
        height='600'
        src={content?.Thumbnail?.Url}
        style={{ position: "absolute" }}
      />
      <CardContent
        sx={{
          position: "relative",
          color: "#ffffff",
          backgroundColor: "transparent",
          mt: { xs: 0, sm: 0, md: 4, lg: 8 },
        }}>
        <IconButton aria-label='play/pause' style={{ color: "#ffffff" }}>
          <PlayArrowIcon sx={{ height: 38, width: 38 }} />
        </IconButton>
        <Typography
          gutterBottom
          // variant="h5"
          component='h2'
          className='secondary-desvription'>
          {content.Title}
        </Typography>
        <Typography gutterBottom sx={{ color: "inherit" }} variant='caption'>
          {content.Description}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "fit-content",
          }}>
          <Typography gutterBottom sx={{ color: "inherit" }} variant='caption'>
            {content.Author}
          </Typography>
          <Divider
            orientation='vertical'
            variant='middle'
            flexItem
            light
            sx={{ background: "#ffffff", mx: ".5rem", mt: "3px" }}
          />
          <Typography gutterBottom sx={{ color: "inherit" }} variant='caption'>
            {format(new Date(content?.PublishedDate), "MM dd yyyy")}
          </Typography>
          <Divider
            orientation='vertical'
            variant='middle'
            flexItem
            light
            sx={{ background: "#ffffff", mx: ".5rem", mt: "3px" }}
          />
          <Typography gutterBottom sx={{ color: "inherit" }} variant='caption'>
            {format(new Date(content?.PublishedDate), "h:mm")}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
{
  /* <VideoDialogBox open={open} onClose={handleClose} dialogTitle={content.DialogTitle} dialogContent={content.DialogContent} /> */
}

interface VideoGalleryProps {
  content: Content;
  //secondaryArgs?: {};
}

interface ThumbnailProps {
  AltText?: string;
  Description?: string;
  Name?: string;
  Url?: string;
}

interface Content {
  Author?: string;
  ContentType?: string;
  Count?: string;
  Description?: string;
  EditorialItemPath?: string;
  PublishedDate?: any;
  SEODescription?: string;
  SEOTitle?: string;
  SEOImage?: object;
  Thumbnail?: ThumbnailProps;
  Title?: string;
}

VideoGallery.defaultProps = {
  content: {
    Title: "VideoGallery1",
    Image:
      "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/0618d773-f5cd-402b-9e28-a8f17e820101/content",
    APIURL: "url", //--> 10 IMAGES
    ImageDescription: "Humanity is obsessed with breaking its limits, creating lorem ipsum",
    AuthorName: "By John Dio",
    Date: "Jul 06, 2022",
    Time: "15:10",
  },
  authoringHelper: {
    innerRef: null,
    sendStructureDataToAuthoringCB: () => {},
    openButtonEditWindowInAuthoringCB: () => {},
    selectedButtonNameForEditing: "",
    isEditing: false,
    buttonRef: null,
    buttonContentEditable: false,
  },

  analytics: {
    isAnalyticsEnabled: true,
    isSeoEnabled: false,
    isAuthoring: false,
    position: 0,
    pageId: 1234,
    prelemId: 2345,
    pageTitle: "Prelem Title",
    pageDesc: "Prelem Description",
    pageTags: "Page Tags1, page tagg2",
    prelemTags: "Prelem Tags1, Prelem tagg2",
  },
};

export default VideoGallery;
