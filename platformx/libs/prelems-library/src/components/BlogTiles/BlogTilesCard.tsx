import { Box, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { handleHtmlTags } from "../../utils/helperFns";
import ImageVideoGalleryModalSlider from "../ImageVideoGalleryModalSlider/ImageVideoGalleryModalSlider";
import { getIcon, onClickCardUrlNavigate } from "../../Common/Utils/helperFns";
import { formImageUrl } from "components/DynamicPrelem/helper";
import usePlatformAnalytics from "../../analytics/index";
import { createClickImpression } from "Common/ImpressionHooks/helper";
import { IMPRESSIONS } from "Common/ImpressionHooks/constants";

const BlogTilesCard = ({ content, secondaryArgs, analytics, cardIndex }: BlogTilesCardProps) => {
  const { Color = "", Url = "" } = content?.background_content || {};
  const [handleTrack] = usePlatformAnalytics();
  const [modalStatus, setModalStatus] = useState(false);
  const [sliderData, setSliderData] = useState([]);
  const styles = `
    .doublebr {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
     }
     .onelineelsp {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
     }`;
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
      <style>{styles}</style>
      <Box
        sx={{
          "&:hover": {
            ".button-name": {
              display: secondaryArgs?.editState ? "none" : "block",
            },
          },
        }}
        className='overlay-wrapper blogTilesCardWrapper'>
        <Card className='blogTilesCard' onClick={(e) => onClickCard(e, content?.EditorialItemPath)}>
          <Box sx={{ display: "inline-block", position: "relative" }}>
            <CardMedia
              className='imgheight blogTilesCardMedia'
              sx={{
                height: {
                  xs: "204px",
                  sm: "382px",
                  md: "245px",
                  em: "310px",
                  // lg: "411px",
                },
                backgroundColor: Color,
              }}
              image={formedImageUrl}>
              <Box className='cardOverlay'></Box>
              <Box className='contentIcons'>
                <img
                  alt='BlogTilesCardimg'
                  src={getIcon(content.ContentType)}
                  className='fullwidth'
                />
              </Box>
            </CardMedia>
          </Box>
          <CardContent className='blogTilesCardContent'>
            <Typography gutterBottom variant='h3bold' className='doublebr title' component='h3'>
              {content.Title}
            </Typography>
            <CardActions className='actions'>
              <Box className='Boxdivcontent centerItem'>
                <Typography
                  gutterBottom
                  variant='p4bold'
                  component='div'
                  className='publishedBy marginZero'>
                  <Box className='dotpoint'>{content?.Author?.trim() || content?.PublishedBy}.</Box>
                </Typography>
                <Typography variant='p4regular' className='publishedBy gap'>
                  {content?.PublishedDate
                    ? format(new Date(content?.PublishedDate), "LLL dd, yyyy | H:mm")
                    : "-"}
                </Typography>
              </Box>
            </CardActions>
            <Typography variant='p3regular' className='doublebr marginZero'>
              {handleHtmlTags(content.Description)}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      {modalStatus && sliderData && sliderData.length > 0 && !secondaryArgs?.editState && (
        <ImageVideoGalleryModalSlider
          sliderData={sliderData}
          openModal={modalStatus}
          contentType={content.ContentType}
          handleClose={toggleModalStatus}
        />
      )}
    </>
  );
};

interface BlogTilesCardProps {
  content: Content;
  secondaryArgs: SecondaryArgs;
  analytics: Analytics;
  cardIndex: number;
  getIcon?: (a: string) => string;
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
    ext: string;
    Name: string;
    ObjectType?: string;
    Color?: string;
  };
  ContentType: string;
  PublishedBy: string;
  Author: string;
  PublishedDate: string;
  background_content: any;
}

BlogTilesCard.defaultProps = {
  content: {
    Description: "Lorem Ipsum is simply dummy",
    Title: "Lorem ipsum",
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

export default BlogTilesCard;
