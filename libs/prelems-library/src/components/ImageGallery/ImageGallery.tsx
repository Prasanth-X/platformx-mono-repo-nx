import { Card, CardContent, CardMedia, Typography, Box, Divider } from "@mui/material";
import { format } from "date-fns";
import React from "react";

const ImageGallery = ({
  content,
}: //secondaryArgs,
ImageGalleryProps) => {
  return (
    <Card
      sx={{
        position: "relative",
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "end",
      }}>
      <CardMedia
        component='img'
        // height="600"
        src={content?.Thumbnail?.Url}
        sx={{ position: "absolute", maxWidth: "100%", height: "100%" }}
      />
      <CardContent
        sx={{
          position: "relative",
          color: "#ffffff",
          backgroundColor: "transparent",
          mt: { xs: 0, sm: 0, md: 4, lg: 8 },
        }}>
        {/* <Chip label="Images" variant="filled" sx={{ background: '#E8E8E8' }} size="small" /> */}
        <Typography
          gutterBottom
          // variant="h5"
          className='secondary-desvription'
          component='h2'
          sx={{ color: "inherit" }}>
          {content?.Title}
        </Typography>
        <Typography gutterBottom sx={{ color: "inherit" }} variant='caption'>
          {content?.Description}
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
            {format(new Date(content?.PublishedDate), "MM/dd/yyyy")}
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

interface ImageGalleryProps {
  content: Content;
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

ImageGallery.defaultProps = {
  content: {
    Title: "Tall Building Gallery OMG",
    Image:
      "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/872d3f4d-4c57-425d-b98c-7ad2a8570641/content",
    APIURL: "url", //--> 10 IMAGES
    ImageDescription: "Humanity is obsessed with breaking its limits, creating lorem ipsum",
    AuthorName: "By John Dio",
    Date: "Jul 06, 2022",
    Time: "15:10",
  },
};

export default ImageGallery;
