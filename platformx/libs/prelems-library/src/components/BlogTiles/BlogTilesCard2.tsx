import { Box, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { handleHtmlTags } from "../../utils/helperFns";
import { getIcon, onClickCardUrlNavigate } from "../../Common/Utils/helperFns";
import { formImageUrl } from "components/DynamicPrelem/helper";
import { IMPRESSIONS } from "Common/ImpressionHooks/constants";
import { createClickImpression } from "Common/ImpressionHooks/helper";
import usePlatformAnalytics from "../../analytics/index";

const BlogTilesCard2 = ({ content, secondaryArgs, analytics, cardIndex }: BlogTilesCard2Props) => {
  const { Color = "", Url = "" } = content?.background_content || {};
  const [handleTrack] = usePlatformAnalytics();
  const [modalStatus, setModalStatus] = useState(false);
  const [, setSliderData] = useState([]);
  // const getImg = () => {
  //   if (Url && ext) {
  //     // background_content image
  //     return formCroppedUrl(gcpUrl, bucketName, Url, ext);
  //   } else {
  //     // thumbnail image
  //     return formCroppedUrl(gcpUrl, bucketName, content.Thumbnail?.Url, content.Thumbnail?.ext);
  //   }
  // };
  useEffect(() => {
    if (
      content?.EditorialItemPath &&
      (content.ContentType === "ImageGallery" ||
        content.ContentType === "VideoGallery" ||
        content.ContentType === "Gallery")
    ) {
      axios
        .get(
          `${secondaryArgs?.prelemBaseEndpoint?.deliveryEndPoint}api/v1/web/en/delivery/multi-slot-content?path=${content?.EditorialItemPath}&contentType=${content.ContentType}&documentType=hclplatformx:SiteComponentImageVideoGallery`,
          {
            headers: {
              sitename: secondaryArgs?.sitename,
            },
          },
        )
        .then((res: any) => {
          if (res) {
            let gallery = [];
            if (content.ContentType === "ImageGallery") {
              gallery = res?.data?.data?.fetchMultiSlotContent?.Gallery.map((x: any) => x.Image);
            } else if (content.ContentType === "VideoGallery") {
              gallery = res?.data?.data?.fetchMultiSlotContent?.Gallery.map((x: any) => x.Video);
            } else if (content.ContentType === "Gallery") {
              gallery = res?.data?.data?.fetchMultiSlotContent?.Gallery.map((x: any) => x);
            }
            setSliderData(gallery);
          }
        });
    }
  }, []);

  const toggleModalStatus = () => {
    if (!secondaryArgs?.editState) setModalStatus(!modalStatus);
  };

  const triggerAnalytics = (url: string) => {
    if (!analytics?.isAuthoring && analytics?.isAnalyticsEnabled) {
      const cardClickObj = {
        prelemSlotNumber: cardIndex + 1,
        contentType: content?.ContentType,
        contentTitle: content?.Title,
        contentUrl: url,
      };
      const cardClickAnalyticsObj = createClickImpression(
        analytics,
        IMPRESSIONS.Card,
        secondaryArgs,
        undefined,
        cardClickObj,
      );
      handleTrack(IMPRESSIONS?.CLICK_IMPRESSION, cardClickAnalyticsObj);
    }
  };

  const onClickCard = (e: any, id: string) => {
    if (secondaryArgs.editState) {
      e.preventDefault();
    } else {
      if (typeof window !== "undefined") {
        const url = onClickCardUrlNavigate(id, content, secondaryArgs);
        triggerAnalytics(url);
        if (["ImageGallery", "VideoGallery", "Gallery"].includes(content.ContentType)) {
          toggleModalStatus();
        } else if (url) {
          window.open(url);
        }
      }
    }
  };

  const formedImageUrl = formImageUrl(content, Url, secondaryArgs);

  return (
    <>
      <Box
        sx={{
          "&:hover": {
            ".button-name": {
              display: secondaryArgs?.editState ? "none" : "block",
            },
          },
        }}
        className='overlay-wrapper blogTilesCardWrapper blogTilesCard2Type2'>
        <Card
          className='blogTilesCard noShadow'
          onClick={(e) => onClickCard(e, content?.EditorialItemPath)}>
          <Grid container className='alignText'>
            <Grid xs={12} md={6}>
              <CardMedia
                className='blogTilesCardMedia1'
                sx={{
                  backgroundColor: Color,
                  height: {
                    xs: "204px",
                    sm: "382px",
                    md: "330px",
                    lg: "479px",
                  },
                }}
                image={formedImageUrl}>
                <Box className='cardOverlay1'>
                  <Box className='contentIcons1'>
                    <img
                      alt='BlogTilesCard2Img'
                      src={getIcon(content.ContentType)}
                      className='fullwidth'
                    />
                  </Box>
                </Box>
              </CardMedia>
            </Grid>
            <Grid xs={12} md={6}>
              <CardContent className='blogTilesCardContent extraGap'>
                <Typography variant='h2medium' className='threeline title'>
                  {content.Title}
                </Typography>
                <Box sx={{ display: "flex" }}>
                  <Typography variant='p4bold' component='div' className='publishedBy marginZero'>
                    {content?.Author?.trim() || content?.PublishedBy}
                  </Typography>
                  <Typography variant='p4regular' className='publishedBy gap marginZero'>
                    {content?.PublishedDate
                      ? format(new Date(content?.PublishedDate), "LLL dd, yyyy | H:mm")
                      : "-"}
                  </Typography>
                </Box>
                <Typography variant='p3regular' className='fiveline'>
                  {" "}
                  {handleHtmlTags(content.Description)}
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </>
  );
};

interface BlogTilesCard2Props {
  content: Content;
  secondaryArgs: SecondaryArgs;
  analytics: Analytics;
  cardIndex: number;
}
interface Analytics {
  pageId?: number;
  prelemId?: number;
  pageTitle?: string;
  prelemTitle?: string;
  pageDesc?: string;
  pageTags?: string;
  prelemTags?: string;
  prelemPosition?: number;
  isAnalyticsEnabled: boolean;
  isAuthoring: boolean;
  isSeoEnabled: boolean;
}
interface SecondaryArgs {
  prelemBaseEndpoint?: PrelemBaseEndpoint;
  editState: boolean;
  bucketName: string;
  gcpUrl: string;
  sitename?: string;
}
interface PrelemBaseEndpoint {
  PublishEndPoint?: string;
  APIEndPoint?: string;
  deliveryEndPoint?: string;
  language?: string;
}
interface Content {
  Description?: string;
  Title?: string;
  EditorialItemPath: string;
  ImageDescription: string;
  Thumbnail: {
    Description?: string;
    Title?: string;
    AltText: string;
    Attribution: boolean;
    Url: string;
    Name: string;
    ObjectType?: string;
    Color?: string;
    ext?: string;
  };
  ContentType: string;
  PublishedBy: string;
  Author: string;
  PublishedDate: string;
  background_content: any;
}

BlogTilesCard2.defaultProps = {
  content: {
    Description:
      "Welcome to the Ultimate Art Quiz. Students are learning about the seven elements of art during class.",
    Title: "I got 99 problems and this quiz is one",
    EditorialItemPath: "/content/documents/hclplatformx/siteeditorial/imagegallery/xeroxgallery",
    Thumbnail: {
      Description: "This is for ExpertiseShowcase4",
      Title: "ExpertiseShowcase4",
      AltText: "ExpertiseShowcase4",
      Attribution: false,
      Url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/0618d773-f5cd-402b-9e28-a8f17e820101/content",
      Name: "ExpertiseShowcase4",
    },
  },
  analytics: {
    isAnalyticsEnabled: true,
    isSeoEnabled: false,
    isAuthoring: false,
  },
};

export default BlogTilesCard2;
