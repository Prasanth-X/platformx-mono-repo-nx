import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

const Accolades = ({
  content,
}: //secondaryArgs,
AccoladesProps) => {
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
      </CardContent>
    </Card>
  );
};

interface AccoladesProps {
  content: Content;
}

interface ThumbnailProps {
  AltText?: string;
  Description?: string;
  Name?: string;
  Url?: string;
}
interface Content {
  ContentType?: string;
  Title?: string;
  Description?: string;
  Thumbnail?: ThumbnailProps;
  slots: IndividualContent[];
}

interface IndividualContent {
  Author?: string;
  ContentType?: string;
  Count?: string;
  Description?: string;
  EditorialItemPath?: string;
  PublishedDate?: any;
  SEODescription?: string;
  SEOTitle?: string;
  SEOImage?: object;
  Title1?: string;
  Title2?: string;
  Internal?: string;
  URL?: string;
}

Accolades.defaultProps = {
  content: {
    name: "Accolades",
    ContentType: "Accolades",
    slots: [
      {
        Title1: "Lorem ipsum dolor si",
        Title2: "Lorem ipsum dolor si",
        Internal: "true",
        Description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
        URL: "/item",
      },
      {
        Title1: "Lorem ipsum dolor si",
        Title2: "Lorem ipsum dolor si",
        Internal: "true",
        Description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
        URL: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
      },
      {
        Title1: "Lorem ipsum dolor si",
        Title2: "Lorem ipsum dolor si",
        Internal: "true",
        Description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
        URL: "/item",
      },
      {
        Title1: "Lorem ipsum dolor si",
        Title2: "Lorem ipsum dolor si",
        Internal: "true",
        Description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
        URL: "/item",
      },
    ],
    Title: "Accolades Title",
    Description: "Accolades Description",
    Thumbnail: {
      Name: "Imagecard2",
      Url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/25501afd-7df1-486b-aa6d-ce069feb1d61/content",
      Title: "Imagecard2",
      Description: "This is for Imagecard2",
      AltText: "Imagecard2",
      Attribution: false,
    },
    PublishedDate: "2022-09-19T09:29:54Z",
    Author: "Rock",
  },
};

export default Accolades;
