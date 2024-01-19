import ClearIcon from "@mui/icons-material/Clear";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Slider from "react-slick";
import "../../Style.css";
import { getFormattedImageUrl } from "@platformx/utilities";
import VideoPlayer from "../../components/VideoPlayers/VideoPlayer";

const SlickStyle = `
  .image-video-gallery .slick-slider {
    position: relative;
    display: block;
    box-sizing: border-box;
    -webkit-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
    -khtml-user-select: none;
    touch-action: pan-y;
    -webkit-tap-highlight-color: transparent;
}
.image-video-gallery .slick-slider .slick-track,.image-video-gallery .slick-slider .slick-list {
    transform: translate3d(0, 0, 0);
}

.image-video-gallery .slick-list {
    position: relative;
    display: block;
    overflow: hidden;
    margin: 0 5px;
    padding: 0;
}

.image-video-gallery .slick-track {
    position: relative;
    top: 0;
    left: 0;
    display: block;
    margin-left: auto;
    margin-right: auto;
}
.image-video-gallery .slick-track:before,.image-video-gallery .slick-track:after {
    display: table;
    content: '';
}

.image-video-gallery .slick-initialized .slick-slide {
    display: block;
}

.image-video-gallery .slick-slide {
    display: none;
    float: left;
    height: 100%;
    min-height: 1px;
}
.image-video-gallery .slick-slide .Platform-x-Box-root {
  //  padding: 0 20px;
   box-sizing: border-box;
}
.image-video-gallery .slick-slide img,.image-video-gallery .slick-slide video {
    display: block;
    // width: 100%;
    height: 230px !important;
    margin: 0 auto;
    object-fit: cover;
    cursor: pointer,
}

.image-video-gallery .slick-prev {
    left: 0;
}
.image-video-gallery-modal .slick-prev,.image-video-gallery-modal .slick-next {
    font-size: 0;
    line-height: 0;
    position: absolute;
    top: 57%;
    display: block;
    width: 40px;
    height: 40px;
    padding: 0;
    transform: translate(0, -50%);
    cursor: pointer;
    color: transparent;
    border: none;
    outline: none;
    background: rgba(0,0,0,0.7);
    border-radius:50%;
    z-index:1;
}
.image-video-gallery .slick-prev:before,.image-video-gallery .slick-next:before {
  font-size: 32px;
  line-height: 1;
  color: white;
  margin-left: -3px;
  margin-bottom: 6px;
  display: inline-block;
}
.image-video-gallery .slick-prev:before {
  content: '‹';
}
.image-video-gallery .slick-next {
    right: 0px;
}
.image-video-gallery .slick-next:before {
  content: '›'; 
  margin-left: 3px;
}

.thumbnail-slider-wrap .slick-prev,.thumbnail-slider-wrap .slick-next {
  font-size: 0;
  line-height: 0;
  position: absolute;
  top: 50%;
  display: block;
  width: 32px;
  height: 32px;
  padding: 0;
  transform: translate(0, -50%);
  cursor: pointer;
  color: transparent;
  border: none;
  outline: none;
  background: rgba(0,0,0,0.7);
  border-radius:50%;
  z-index:1;
}
.thumbnail-slider-wrap  .slick-prev:before, .thumbnail-slider-wrap .slick-next:before {
font-size: 24px;
margin-bottom: 3px;
}
.thumbnail-slider-wrap .slick-prev{
  left:-10px;
}
.thumbnail-slider-wrap .slick-next{
  right:-10px;
}
.image-video-gallery .slider-container.slick-slider img.smallPlayIcon {
  height: 44px !important;
  width: 44px !important;
}
`;

const ImageVideoGalleryModalSlider = ({
  sliderData,
  indexPos,
  handleClose,
  openModal,
  secondaryArgs,
}: ModalSliderProps) => {
  const [nav1, setNav1] = useState<any>(null);
  const [nav2, setNav2] = useState<any>(null);
  const [slider1, setSlider1] = useState<any>(null);
  const [slider2, setSlider2] = useState<any>(null);
  const [currentSlide, setCurrentSlide] = useState<any>(0);
  const [showThumb, setShowThumb] = useState<any>(false);
  const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    pt: 2,
    pb: 3,
    display: "block",
    width: { xs: "90%", md: "100%" },
    "&.image-video-gallery": {
      "&:focus-visible": {
        outline: "none",
      },
    },
    "&.image-video-gallery .slider-container.slick-slider": {
      width: "100%",
      maxWidth: "100vw",
      overflow: "hidden",
      img: {
        width: "100% !important",
        maxWidth: "100%",
        height: "400px !important",
        margin: "0 auto",
        display: "block !important",
        [`@media (max-width:600px)`]: {
          height: "230px !important",
        },
      },
      video: {
        width: "100% !important",
        maxWidth: "100%",
        height: "400px !important",
        margin: "0 auto",
        display: "block !important",
        [`@media (max-width:600px)`]: {
          height: "230px !important",
        },
      },
      ".slick-list": {
        width: "800px !important",
        margin: "0 auto",
        [`@media (max-width:900px)`]: {
          width: "100% !important",
        },
      },
      ".slick-track": {
        margin: "0",
      },
      ".react-player-wrap": {
        height: "400px !important",
        position: "relative",
        [`@media (max-width:600px)`]: {
          height: "230px !important",
        },
      },
    },
    "&.image-video-gallery-modal .slick-slide iframe": {
      height: "100% !important",
    },
    "&.image-video-gallery .thumbnail-slider-wrap": {
      width: "650px",
      margin: "10px auto",
      // paddingRight: '2px',
      [`@media (max-width:900px)`]: {
        width: "auto",
        padding: "0 10px",
        maxWidth: "500px",
      },
      ".slick-slide": {
        border: "1px solid transparent",
        boxSizing: "border-box",
        maxWidth: "200px",
        float: sliderData?.length === 1 ? "none" : "left",
        margin: "0 auto",
      },
      ".slick-slide.slick-active.slick-current": {
        border: "1px solid #fff",
        "> div > div": {
          display: "block !important",
        },
      },
      img: {
        // width: '150px',
        height: "80px !important",
        maxWidth: "100%",
        width: "100%",
        [`@media (max-width:600px)`]: {
          // width: '100px',
          height: "60px !important",
        },
      },
      video: {
        // width: '150px',
        height: "80px !important",
        [`@media (max-width:900px)`]: {
          width: "100px !important",
          height: "60px !important",
        },
      },
      ".react-video-player-thumbnail": {
        height: "80px !important",
        [`@media (max-width:900px)`]: {
          width: "100px !important",
          height: "60px !important",
        },
      },
      // '.slick-track': {
      //   display: 'flex',
      //   justifyContent: 'center',
      // },
      // '.slick-list': {
      //   display: 'flex',
      //   justifyContent: 'center',
      // },
    },
  };
  // open current slide in popup
  useEffect(() => {
    if (slider1) {
      slider1?.slickGoTo(indexPos);
    }
    if (slider2) {
      slider2?.slickGoTo(indexPos);
    }
    // return () => {
    //   setSlider1(null);
    //   setSlider2(null);
    // };
  }, [slider1, slider2]);

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, [slider1, slider2]);

  useLayoutEffect(() => {
    //thumb image will visible after the rendering is completed
    setTimeout(() => {
      setShowThumb(true);
    }, 400);
    return () => {
      setShowThumb(false);
    };
  }, []);

  const settingsMain = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    asNavFor: ".slider-nav",
    infinite: true,
    beforeChange: (current: any, next: any) => {
      setCurrentSlide(next);
      if (slider1?.innerSlider?.list.querySelector(`[data-index="${next}"] video`)) {
        // slider1?.innerSlider?.list
        //   .querySelector(`[data-index="${next}"] video`)
        //   .focus();
        // slider1?.innerSlider?.list
        //   .querySelector(`[data-index="${next}"] video`)
        //   .click();
        // slider1?.innerSlider?.list
        //   .querySelector(`[data-index="${next}"] video`)
        //   .focus();
        // slider1?.innerSlider?.list
        //   .querySelector(`[data-index="${next}"] video`)
        //   .click();
      }
    },
    // afterChange: (currentSlide: any) => {
    //   if (
    //     slider1?.innerSlider?.list.querySelector(
    //       `[data-index="${currentSlide}"] video`
    //     )
    //   ) {
    //     // slider1?.innerSlider?.list
    //     //   .querySelector(`[data-index="${currentSlide - 1}"] video`)
    //     //   .pause();
    //     // slider1?.innerSlider?.list
    //     //   .querySelector(`[data-index="${currentSlide}"] video`)
    //     //   .click();
    //     // slider1?.innerSlider?.list
    //     //   .querySelector(`[data-index="${currentSlide}"] video`)
    //     //   .focus();
    //     // slider1?.innerSlider?.list
    //     //   .querySelector(`[data-index="${currentSlide}"] video`)
    //     //   .click();
    //   }
    // },
  };

  // const sliderSettings =
  //   secondaryArgs?.prelemBaseEndpoint?.device === 'tablet'
  //     ? { ...settingsMain }
  //     : secondaryArgs?.prelemBaseEndpoint?.device === 'mobile'
  //     ? { ...settingsMain }
  //     : { ...settingsMain };

  const settingsThumbs = {
    // slidesToShow: sliderData?.length || 6,
    slidesToShow: sliderData?.length < 4 ? sliderData?.length : 4,
    slidesToScroll: 1,
    asNavFor: ".slider-for",
    dots: false,
    swipeToSlide: false,
    focusOnSelect: true,
    // infinite: false,
    accessibility: false,
  };
  return (
    <Box>
      <Modal
        hideBackdrop
        open={openModal}
        // onClose={handleClose}
        sx={{ backgroundColor: "rgba(0,0,0,0.8)" }}>
        <Box
          sx={{
            ...style,
          }}
          className='image-video-gallery image-video-gallery-modal'>
          <style>{SlickStyle}</style>

          <Slider
            {...settingsMain}
            asNavFor={nav2}
            ref={(slider) => setSlider1(slider)}
            className='slider-container'>
            {sliderData?.map((slide: any, index: any) => (
              <React.Fragment key={index}>
                {!slide?.Thumbnail ? (
                  <Box sx={{ position: "relative" }}>
                    <Typography
                      variant='h3regular'
                      sx={{
                        color: "#fff",
                        textTransform: "capitalize",
                      }}>
                      {slide?.Title}
                    </Typography>
                    <img
                      alt='gallery1'
                      src={getFormattedImageUrl(slide?.Url, slide?.ext, secondaryArgs)}
                    />
                  </Box>
                ) : (
                  <Box sx={{ width: { xs: "100%", md: "800px" } }}>
                    <Typography
                      variant='h3regular'
                      sx={{
                        color: "#fff",
                        textTransform: "capitalize",
                      }}>
                      {slide?.Title}
                    </Typography>
                    <VideoPlayer
                      playerProp={{
                        posterImg: getFormattedImageUrl(
                          slide?.Thumbnail,
                          slide?.ext,
                          secondaryArgs,
                        ),
                        videoUrl: slide.Url,
                        classname: "react-player-wrap",
                        playing: currentSlide === index ? true : false,
                      }}
                    />
                  </Box>
                )}
              </React.Fragment>
            ))}
          </Slider>

          <div
            style={{ visibility: showThumb ? "visible" : "hidden" }}
            className='thumbnail-slider-wrap'>
            <Slider {...settingsThumbs} asNavFor={nav1} ref={(slider) => setSlider2(slider)}>
              {sliderData?.map((slide: any, index: any) => (
                <div key={index}>
                  {!slide?.Thumbnail ? (
                    <img
                      alt='gallery1'
                      src={getFormattedImageUrl(slide?.Url, slide?.ext, secondaryArgs)}
                    />
                  ) : (
                    <Box
                      sx={{
                        position: "relative",
                        padding: "0 !important",
                        height: "100%",
                        video: {
                          objectFit: "cover",
                        },
                      }}>
                      <img
                        alt='gallery1'
                        src={getFormattedImageUrl(slide?.Thumbnail, slide?.ext, secondaryArgs)}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          left: "0",
                          top: "0",
                          width: "100%",
                          height: "100%",
                          background: "transparent",
                          padding: "0 10px 10px !important",
                          margin: "0",
                          display: "flex",
                          alignItems: "flex-end",
                          justifyContent: "flex-start",
                          cursor: "pointer",
                          ".Platform-x-Box-root": {
                            padding: "0 !important",
                          },
                        }}>
                        <Box
                          sx={{
                            width: { xs: "24px", md: "24px" },
                            height: { xs: "24px", md: "24px" },
                            borderRadius: "50%",
                            background: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}>
                          <PlayArrowRoundedIcon sx={{ width: "15px", height: "15px" }} />
                        </Box>
                      </Box>
                    </Box>
                  )}
                </div>
              ))}
            </Slider>
          </div>

          <Button
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: { xs: "15px", sm: "70px" },
              top: { xs: "0px" },
              width: "36px",
              height: "36px",
              background: "rgba(0,0,0,0.7)",
              borderRadius: "50%",
              minWidth: "0 !important",
              padding: "1px 0 0 0",
              "&:hover": {
                background: "rgba(0,0,0,0.7)",
              },
            }}>
            <ClearIcon />
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

interface SecondaryArgs {
  prelemBaseEndpoint?: PrelemBaseEndpoint;
  gcpUrl?: string;
  bucketName?: string;
}
interface PrelemBaseEndpoint {
  device?: string;
}
interface ModalSliderProps {
  openModal?: any;
  indexPos?: number;
  sliderData?: any;
  contentType?: string;
  handleClose?: () => void;
  secondaryArgs?: SecondaryArgs;
}

ImageVideoGalleryModalSlider.defaultProps = {
  openModal: false,
  handleClose: () => {},
  contentType: "image",
  sliderData: [
    {
      Name: "image1",
      Url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/c63710dd-ab98-4bfa-9a93-394b7d11adfe/content",
      Title: "image1",
      Description: "This is for HeroBanner",
      AltText: "ProductSummary",
    },
    {
      Name: "image2",
      Url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/2887b4ed-eea3-4971-9869-272d062d87cf/content",
      Title: "image2",
      Description: "This is for HeroBanner",
      AltText: "ProductSummary",
    },
  ],
  secondaryArgs: {
    gcpUrl: "https://storage.googleapis.com",
    bucketName: "cropped_image_public",
  },
};

export default ImageVideoGalleryModalSlider;
