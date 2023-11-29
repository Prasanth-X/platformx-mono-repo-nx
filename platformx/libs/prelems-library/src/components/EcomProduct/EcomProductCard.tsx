import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import ImageVideoGalleryModalSlider from "../ImageVideoGalleryModalSlider/ImageVideoGalleryModalSlider";
import { handleHtmlTags } from "../../utils/helperFns";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const EcomProductCard = ({ content, secondaryArgs }: DynamicPrelemCardProps) => {
  const { Url = "", Color = "" } = content.Thumbnail || {};
  const [modalStatus, setModalStatus] = useState(false);
  const [sliderData, setSliderData] = useState([]);

  const styles = `
    .doublebr {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
     }`;
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

  const onClickCard = () => {
    if (content.CtaUrl) {
      window.open(content.CtaUrl);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <Box
        sx={{
          boxShadow: "none!important",
          position: "relative",
          height: "100%",
          width: "100%",
          borderRadius: "10px",
          "&:hover": {
            cursor: content.CtaUrl ? "pointer" : "default",
            ".button-name": {
              display: secondaryArgs?.editState ? "none" : "block",
            },
          },
        }}
        className='overlay-wrapper'>
        <Card
          sx={{
            boxShadow: "none",
            cursor: content.CtaUrl ? "pointer" : "default",
            borderRadius: "10px",
            height: "100%",
            display: "flex!important",
            flexDirection: "column",
          }}
          onClick={() => onClickCard()}>
          <CardMedia
            sx={{
              height: { xs: "209px", sm: "209px", md: "147px", lg: "228px" },
              position: "relative",
              backgroundColor: Color,
            }}
            image={Url}>
            {/* <Box sx={{ height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: '10px', left: '10px', fontSize: '40px', color: 'white', fill: 'currentColor' }}>
              <img src={getIcon(content.ContentType)} style={{ width: '100%' }} />
            </Box> */}
          </CardMedia>

          <CardContent
            style={{
              padding: "16px 10px 16px 10px",
              flexGrow: 1,
              borderRadius: "8px",
            }}>
            <Typography
              gutterBottom
              variant='h3bold'
              className='doublebr'
              component='div'
              sx={{ letterSpacing: "0.25px" }}>
              {content.Title}
            </Typography>
            <Typography
              variant='h6regular'
              className='doublebr'
              color='text.secondary'
              sx={{ letterSpacing: "0.5px" }}>
              {" "}
              {handleHtmlTags(content.Description)}
            </Typography>
          </CardContent>
          <CardActions style={{ justifyContent: "space-between", padding: "10px" }}>
            <Box style={{ display: "flex", width: "100%" }}>
              <Typography
                gutterBottom
                variant='h6bold'
                component='div'
                style={{ letterSpacing: "1.25px", width: "50%" }}>
                {content?.Price}
              </Typography>
              <FiberManualRecordIcon sx={{ fontSize: 15 }} color='disabled' />
              <Typography
                variant='h6regular'
                style={{
                  letterSpacing: "1.25px",
                  width: "50%",
                  textAlign: "right",
                }}>
                {content?.Duration}
              </Typography>
            </Box>
          </CardActions>
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

interface DynamicPrelemCardProps {
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
  sitename?: string;
}
interface PrelemBaseEndpoint {
  PublishEndPoint?: string;
  APIEndPoint?: string;
  deliveryEndPoint?: string;
}
interface Content {
  Description?: string;
  Title?: string;
  EditorialItemPath: string;
  ImageDescription: string;
  Price: string;
  Duration: string;
  CtaUrl: string;
  Thumbnail: {
    Description?: string;
    Title?: string;
    AltText: string;
    Attribution: boolean;
    Url: string;
    Name: string;
    ObjectType?: string;
    Color?: string;
  };
  ContentType: string;
  PublishedBy: string;
  PublishedDate: string;
}

EcomProductCard.defaultProps = {
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
    Price: "100",
  },
  analytics: {
    isAnalyticsEnabled: true,
    isSeoEnabled: false,
    isAuthoring: false,
  },
};

export default EcomProductCard;
