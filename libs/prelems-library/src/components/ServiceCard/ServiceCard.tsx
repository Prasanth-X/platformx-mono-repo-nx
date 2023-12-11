import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

const ServiceCard = ({
  content,
}: //secondaryArgs,
ServiceCardProps) => {
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

interface ServiceCardProps {
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
  slots: IndividualContent[];
  Title?: string;
  Description?: string;
  Thumbnail?: ThumbnailProps;
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
  Title?: string;
  Internal?: string;
  IconImage?: ThumbnailProps;
  Image_1?: ThumbnailProps;
}

ServiceCard.defaultProps = {
  content: {
    ContentType: "ServiceCard",
    name: "Services2",
    slots: [
      {
        Internal: "false",
        Title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        URL: "",
        IconImage: {
          Name: "Icon",
          Url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/4b935a95-149a-441a-a49a-ed3ae89290d6/content",
          Title: "Icon",
          Description: "This is for Icon",
          AltText: "Icon",
        },
        Image_1: {
          Name: "Imagecard2",
          Url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/c8da887c-7d5e-457f-8539-ae30b5e7cb7c/content",
          Title: "Imagecard2",
          Description: "This is for Imagecard2",
          AltText: "Imagecard2",
          Attribution: false,
        },
      },
      {
        Internal: "false",
        Title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        URL: "",
        IconImage: {
          Name: "Icon",
          Url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/143de3c4-8961-4fdb-889f-bc9016fc37a8/content",
          Title: "Icon",
          Description: "This is for Icon",
          AltText: "Icon",
        },
        Image_1: {
          Name: "ServiceCard",
          Url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/0618d773-f5cd-402b-9e28-a8f17e820101/content",
          Title: "Imagecard2",
          Description: "This is for ServiceCard",
          AltText: "ServiceCard",
          Attribution: false,
        },
      },
      {
        Internal: "false",
        Title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        Description: "Lorem ipsum dolor sit amet, consectetur adipiscing",
        URL: "",
        IconImage: {
          Name: "Icon",
          Url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/c0470ca8-2d77-4582-90f8-482b77b9b20a/content",
          Title: "Icon",
          Description: "This is for Icon",
          AltText: "Icon",
        },
        Image_1: {
          Name: "Imagecard2",
          Url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/593c5178-70ce-435c-8e1d-9794bb22d9ac/content",
          Title: "Imagecard2",
          Description: "This is for Imagecard2",
          AltText: "Imagecard2",
          Attribution: false,
        },
      },
      {
        Internal: "false",
        Title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        Description: "Lorem ipsum dolor sit amet, consectetur adipiscing",
        URL: "",
        IconImage: {
          Name: "Icon",
          Url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/84d49424-95a2-40b1-83aa-4ba45271afb2/content",
          Title: "Icon",
          Description: "This is for Icon",
          AltText: "Icon",
        },
        Image_1: {
          Name: "Imagecard2",
          Url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/25501afd-7df1-486b-aa6d-ce069feb1d61/content",
          Title: "Imagecard2",
          Description: "This is for Imagecard2",
          AltText: "Imagecard2",
          Attribution: false,
        },
      },
      {
        Internal: "false",
        Title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        Description: "Lorem ipsum dolor sit amet, consectetur adipiscing",
        URL: "",
        IconImage: {
          Name: "ServiceCard",
          Url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/4454373e-32e0-4cf5-90ca-fb5c742dcebc/content",
          Title: "ServiceCard",
          Description: "This is for ServiceCard",
          AltText: "ServiceCard",
        },
        Image_1: {
          Name: "Icon",
          Url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/0618d773-f5cd-402b-9e28-a8f17e820101/content",
          Title: "Icon",
          Description: "This is for Icon",
          AltText: "Icon",
        },
      },
      {
        Internal: "false",
        Title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        Description: "Lorem ipsum dolor sit amet, consectetur adipiscing",
        URL: "",
        IconImage: {
          Name: "Icon",
          Url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/fcbe170c-b6ac-4301-93eb-158e8179652e/content",
          Title: "Icon",
          Description: "This is for Icon",
          AltText: "Icon",
        },
        Image_1: {
          Name: "ServiceCard",
          Url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/593c5178-70ce-435c-8e1d-9794bb22d9ac/content",
          Title: "Imagecard2",
          Description: "This is for ServiceCard",
          AltText: "ServiceCard",
          Attribution: false,
        },
      },
    ],
    Title: "Service Card Title",
    Description: "Service Card Description",
    Thumbnail: {
      Name: "Imagecard2",
      Url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/593c5178-70ce-435c-8e1d-9794bb22d9ac/content",
      Title: "Imagecard2",
      Description: "This is for Imagecard2",
      AltText: "Imagecard2",
      Attribution: false,
    },
    PublishedDate: "2022-09-19T09:16:35Z",
    Author: "Tom",
  },
};

export default ServiceCard;
