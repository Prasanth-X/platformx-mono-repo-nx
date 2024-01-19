import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { format } from "date-fns";
import React from "react";
import { getImage, nullToObject } from "@platformx/utilities";
import "./ContentTypeCard.css";
import { getIcon } from "../../Common/Utils/helperFns";

const ContentTypeCard = ({
  content,
  isLoading,
  secondaryArgs,
}: //secondaryArgs,
ContentTypeCardProps) => {
  const { ContentType = "" } = nullToObject(content);
  let bgColor, bgImageUrl;
  if (!isLoading && content && Object.keys(nullToObject(content)).length > 0) {
    const formedUrl = getImage(content, secondaryArgs);
    const { color, imageUrl } = formedUrl;
    bgColor = color;
    bgImageUrl = imageUrl;
  }
  const minCss = `
      .singlebr {
       display: -webkit-box;
       -webkit-box-orient: vertical;
       -webkit-line-clamp: 1;
       overflow: hidden;
      }
       .doublebr {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
       }`;
  const titleMaxLength = 35;

  return (
    <>
      {isLoading ? (
        <Box sx={{ height: "100%", width: "100%" }} className='skeleton skeleton-card'></Box>
      ) : (
        <Card
          sx={{
            position: "relative",
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "end",
            borderRadius: "5px",
          }}
          className='contenttype_card'>
          <style>{minCss}</style>
          <CardMedia
            image={bgImageUrl ? bgImageUrl : ""}
            component={bgImageUrl ? "img" : "div"}
            sx={{
              height: "100%",
              position: "absolute",
              width: "100%",
              backgroundSize: "cover",
              left: 0,
              top: 0,
              borderRadius: "10px",
              maxWidth: "100%",
              backgroundColor: bgColor ? bgColor : "",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "0",
              bottom: "0",
              background: "rgba(0, 0, 0, 0.4)",
              width: "100%",
              height: { xs: "920px", sm: "506px", md: "650px" },
              color: "#FFFFFF",
            }}></Box>
          <CardContent
            sx={{
              position: "relative",
              color: "#ffffff",
              backgroundColor: "transparent",
              mt: { xs: 0, sm: 0, md: 4, lg: 8 },
              paddingBottom: "10px !important",
            }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                borderBottom: "2px solid",
                paddingBottom: "6px",
                width: "fit-content",
              }}>
              <img alt='ContentTypeCardimg' src={getIcon(ContentType || "")} />
              <Typography
                gutterBottom
                variant='h7medium'
                sx={{ color: "inherit", margin: "0 0 1px 4px", textTransform: "capitalize" }}>
                {content?.ContentType === "VOD" ||
                content?.ContentType === "Quiz" ||
                content?.ContentType === "Poll"
                  ? content?.ContentType
                  : content?.ContentType?.replace(/([A-Z])/g, " $1").trim()}
              </Typography>
            </Box>

            {ContentType === "Product" && (
              <Typography
                className='doublebr'
                gutterBottom
                sx={{
                  color: "#ced3d9",
                  textTransform: "capitalize",
                  marginBottom: "1px",
                }}
                variant='h7medium'>
                {content?.brand}
              </Typography>
            )}

            <Typography
              gutterBottom
              variant='h6medium'
              component='h2'
              sx={{
                color: "inherit",
                margin: "3px 0",
                textTransform: "capitalize",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                display: "block",
                position: "relative",
                zIndex: "9999",
                wordBreak: "break-word",
                maxWidth: {
                  xs: "110px",
                  sm: "87px",
                  md: "152px",
                  lg: "152px",
                  xl: "152px",
                },
                "&:hover": {
                  overflow: "visible",
                  whiteSpace: "normal",
                  height: "auto",
                },
                // display: '-webkit-box',
                // WebkitLineClamp: 3,
                // WebkitBoxOrient: 'vertical',
                // overflow: 'hidden',
              }}>
              {content?.Title && content?.Title?.length > titleMaxLength ? (
                <>{`${content?.Title?.substring(0, titleMaxLength)}...`}</>
              ) : (
                <>{content?.Title}</>
              )}
            </Typography>
            <Typography
              className='doublebr'
              gutterBottom
              sx={{
                color: "#ced3d9",
                textTransform: "capitalize",
                marginBottom: "1px",
              }}
              variant='h7medium'>
              {content?.Author}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "fit-content",
              }}>
              <Typography gutterBottom sx={{ color: "#ced3d9" }} variant='h7regular'>
                {content?.PublishedDate &&
                  format(new Date(content?.PublishedDate), "LLL dd, yyyy | H:mm")}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}
    </>
  );
};

interface ContentTypeCardProps {
  content: Content;
  isLoading: boolean;
  secondaryArgs: SecondaryArgs;
}
interface SecondaryArgs {
  gcpUrl?: string;
  bucketName?: string;
}

interface Content {
  brand?: string;
  Author?: string;
  ContentType?: string;
  Count?: string;
  Description?: string;
  EditorialItemPath?: string;
  PublishedDate?: any;
  lastModifiedDate?: any;
  SEODescription?: string;
  SEOTitle?: string;
  SEOImage?: object;
  Thumbnail?: {
    Name?: string;
    Url?: string;
    AltText?: string;
    ext?: string;
  };
  Title?: string;
  background_content?: any;
  tags?: string;
}

export default ContentTypeCard;
