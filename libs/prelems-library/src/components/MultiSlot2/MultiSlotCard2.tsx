/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Card, Typography } from "@mui/material";
import ImageVideoGalleryModalSlider from "../ImageVideoGalleryModalSlider/ImageVideoGalleryModalSlider";
import ArticleIcon from "../../assets/dynamicprelemicons/article-v2.svg";
import ImageIcon from "../../assets/dynamicprelemicons/imggallery.svg";
import VideoIcon from "../../assets/dynamicprelemicons/vod.svg";
import PollIcon from "../../assets/dynamicprelemicons/poll-v2.png";
import QuizIcon from "../../assets/dynamicprelemicons/quiz-v2.png";
import EventIcon from "../../assets/dynamicprelemicons/EventWhiteIcon.png";
import EastIcon from "@mui/icons-material/East";
import { formCroppedUrl, getLandingPageURLwithoutSlash } from "../../utils/helperFns";

const typeInfo = {
  Article: {
    icon: ArticleIcon,
    text: "Article",
  },
  Poll: {
    icon: PollIcon,
    text: "Poll",
  },
  Quiz: {
    icon: QuizIcon,
    text: "Quiz",
  },
  ImageGallery: {
    icon: ImageIcon,
    text: "Image Gallery",
  },
  VideoGallery: {
    icon: VideoIcon,
    text: "Video Gallery",
  },
  Gallery: {
    icon: VideoIcon,
    text: "Gallery",
  },
  Event: {
    icon: EventIcon,
    text: "Event",
  },
};

const MultiSlotCard2 = ({
  content,
  secondaryArgs,
  triggerAnalytics,
  index,
}: MultislotCard2Props) => {
  const [modalStatus, setModalStatus] = useState(false);
  const [sliderData, setSliderData] = useState([]);

  useEffect(() => {
    if (
      content.ContentType === "ImageGallery" ||
      content.ContentType === "Gallery" ||
      content.ContentType === "VideoGallery"
    ) {
      axios
        .get(
          `${secondaryArgs?.prelemBaseEndpoint?.deliveryEndPoint}api/v1/web/en/delivery/multi-slot-content?path=${content?.EditorialItemPath}&contentType=${content.ContentType}`,
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
            } else {
              gallery = res?.data?.data?.fetchMultiSlotContent?.Gallery;
            }
            setSliderData(gallery);
          }
        });
    }
  }, []);
  const toggleModalStatus = () => {
    if (!secondaryArgs?.editState) setModalStatus(!modalStatus);
  };
  const onClickCard = (id: string) => (e: any) => {
    if (secondaryArgs.editState) {
      e.preventDefault();
    } else {
      if (typeof window !== "undefined") {
        const url = getLandingPageURLwithoutSlash(
          secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint,
          secondaryArgs?.prelemBaseEndpoint?.language,
          content.ContentType,
          id,
        );
        triggerAnalytics(url, index, content.Title, content.ContentType);
        window.open(url);
      }
    }
  };

  return (
    <>
      {["Article", "Quiz", "Poll", "Event"].includes(content.ContentType) ? (
        <Box
          sx={{
            "&:hover": {
              ".button-name": {
                display: secondaryArgs?.editState ? "none" : "block",
              },
            },
          }}
          className='multiSlotCard2 overlay-wrapper'>
          <Card className='cardItem' onClick={onClickCard(content?.EditorialItemPath)}>
            <Box className='cardItemInner'>
              {content?.Thumbnail?.Url ? (
                <img
                  alt='card1'
                  className='bgimage'
                  src={formCroppedUrl(
                    secondaryArgs?.gcpUrl,
                    secondaryArgs?.bucketName,
                    content?.Thumbnail?.Url,
                    content?.Thumbnail?.ext,
                  )}
                />
              ) : (
                <Box
                  sx={{
                    backgroundColor: content?.Thumbnail?.Color,
                    width: "100%",
                    height: "100%",
                  }}
                />
              )}
              <Box className='gradientWrapper' />
              <Box className='expertise-show-case'>
                <Box>
                  <Box className='textUnderline'>
                    <Box display='flex' alignItems='center'>
                      <img
                        src={typeInfo[content.ContentType]?.icon}
                        alt={content.ContentType}
                        width='16px'
                        height='16px'
                      />
                      <Typography variant='p4regular' className='contentTypeName' color='textColor'>
                        {typeInfo[content.ContentType]?.text || content.ContentType}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Typography variant='p2semibold' color='textColor' className='doublebr title'>
                  {content?.Title}
                </Typography>
                <Box display='flex' overflow='hidden' mt='8px' alignItems='center'>
                  <Box className='view-more' position='relative'>
                    <Typography variant='p4regular' color='textColor' className='viewMoreText'>
                      View More
                    </Typography>
                    <EastIcon className='eastIcon' />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Card>
        </Box>
      ) : (
        <Box
          sx={{
            "&:hover": {
              ".button-name": {
                display: secondaryArgs?.editState ? "none" : "block",
              },
            },
          }}
          className='multiSlotCard2 overlay-wrapper'
          onClick={toggleModalStatus}>
          <Box className='cardItemInner'>
            <img
              alt='card2'
              className='bgimage'
              src={formCroppedUrl(
                secondaryArgs?.gcpUrl,
                secondaryArgs?.bucketName,
                content?.Thumbnail?.Url,
                content?.Thumbnail?.ext,
              )}
            />
            <Box className='gradientWrapper' />
            <Box className='expertise-show-case'>
              <Box>
                <Box className='textUnderline'>
                  <Box display='flex' alignItems='center'>
                    <img
                      src={typeInfo[content.ContentType]?.icon}
                      alt={content.ContentType}
                      width='16px'
                      height='16px'
                    />
                    <Typography variant='p4regular' className='contentTypeName' color='textColor'>
                      {typeInfo[content.ContentType]?.text || content.ContentType}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Typography variant='p2semibold' className='doublebr title' color='textColor'>
                {content?.Title}
              </Typography>
              <Box display='flex' overflow='hidden' mt='8px' alignItems='center'>
                <Box className='view-more' position='relative'>
                  <Typography variant='p4regular' color='textColor' className='viewMoreText'>
                    View More
                  </Typography>
                  <EastIcon className='eastIcon' />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
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

interface MultislotCard2Props {
  content: Content;
  secondaryArgs: any;
  index: number;
  triggerAnalytics: (a: string, b: number, c: string, d: string) => void;
}

interface Content {
  Description?: string;
  Title?: string;
  EditorialItemPath: string;
  ImageDescription?: string;
  Thumbnail: {
    Description?: string;
    Title?: string;
    AltText: string;
    Attribution: boolean;
    Url: string;
    Name: string;
    Color: string;
    ext: string;
  };
  ContentType: string;
  PublishedBy: string;
  PublishedDate: string;
}

MultiSlotCard2.defaultProps = {
  content: {
    Description: "Lorem Ipsum is simply dummy",
    Title: "Lorem ipsum",
    EditorialItemPath: "/content/documents/hclplatformx/siteeditorial/imagegallery/xeroxgallery",
    Thumbnail: {
      Description: "This is for ExpertiseShowcase4",
      Title: "ExpertiseShowcase4",
      AltText: "ExpertiseShowcase4",
      Attribution: false,
      Url: "machine_assets/1690806479275/public/png/ExpertiseShowcase2",
      Name: "ExpertiseShowcase4",
      ext: "png",
    },
  },
};

export default MultiSlotCard2;
