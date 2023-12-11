import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import ImageVideoGalleryModalSlider from "../ImageVideoGalleryModalSlider/ImageVideoGalleryModalSlider";
import { format } from "date-fns";
import { handleHtmlTags } from "../../utils/helperFns";
import { getIcon, onClickCardUrlNavigate } from "../../Common/Utils/helperFns";
import { formImageUrl } from "./helper";
import { createClickImpression } from "Common/ImpressionHooks/helper";
import { IMPRESSIONS } from "Common/ImpressionHooks/constants";
import usePlatformAnalytics from "../../analytics/index";

const DynamicPrelemCard = ({
  content,
  secondaryArgs,
  analytics,
  cardIndex,
}: DynamicPrelemCardProps) => {
  const { Color = "", Url = "" } = content?.background_content || {};

  const [handleTrack] = usePlatformAnalytics();
  const [modalStatus, setModalStatus] = useState(false);
  const [sliderData, setSliderData] = useState([]);
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
      const url = onClickCardUrlNavigate(id, content, secondaryArgs);
      triggerAnalytics(url);
      if (["ImageGallery", "VideoGallery", "Gallery"].includes(content.ContentType)) {
        toggleModalStatus();
      } else if (url) {
        window.open(url);
      }
    }
  };
  const formedUrl = formImageUrl(content, Url, secondaryArgs);

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
        className='overlay-wrapper'>
        <Card
          className='cardContentBox'
          onClick={(e) => onClickCard(e, content?.EditorialItemPath)}>
          <Box className='imgBox'>
            <CardMedia
              sx={{
                backgroundColor: Color,
                height: "100%",
              }}
              // image={Url || content.Thumbnail?.Url}
              image={formedUrl}>
              <Box className='imgboxOverlay'></Box>
              <Box className='IconBox'>
                <img alt='DynamicPrelemCardImg' src={getIcon(content.ContentType)} />
              </Box>
            </CardMedia>
          </Box>

          <CardContent className='childCard'>
            <Typography variant='h4semibold' className='cardTitle'>
              {content.Title}
            </Typography>
            <Typography variant='p3regular' className='cardDescription'>
              {handleHtmlTags(content.Description)}
            </Typography>
          </CardContent>
          <Box className='devider' />
          <Box className='BottomButtonBox childCard'>
            <Box className='adminDatdWrapper'>
              <Typography variant='p3regular' className='authorName'>
                {content?.Author?.trim() || content?.PublishedBy}
              </Typography>
              <Typography variant='p4regular'>
                {content?.PublishedDate
                  ? format(new Date(content?.PublishedDate), "LLL dd, yyyy | H:mm")
                  : "-"}
              </Typography>
            </Box>
          </Box>
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
  gcpUrl?: string;
  bucketName?: string;
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

DynamicPrelemCard.defaultProps = {
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

export default DynamicPrelemCard;
