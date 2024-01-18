/* eslint-disable @typescript-eslint/no-empty-function */
import ClearIcon from "@mui/icons-material/Clear";
import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import Slider from "../Slider/Slider";
import "../../Style.css";
import { getFormattedImageUrl } from "@platformx/utilities";
import VideoPlayer from "../VideoPlayers/VideoPlayer";
import { formCroppedUrl } from "@platformx/utilities";
import { useCustomStyle } from "./CustomModalSlider.style";

const CustomModalSlider = ({
  sliderData,
  indexPos,
  handleClose,
  openModal,
  secondaryArgs,
}: ModalSliderProps) => {
  const classes = useCustomStyle();
  const thumbImg =
    sliderData &&
    sliderData.map((item: any) => {
      return formCroppedUrl(
        secondaryArgs?.gcpUrl,
        secondaryArgs?.bucketName,
        item.Thumbnail ? item.Thumbnail : item.Url,
        item.ext,
      );
    });
  const settings = {
    sliderName: ".slider-nav",
    infinite: true,
    initialIndex: indexPos ? indexPos > 0 ? indexPos : 0 : 0,
    showThumb: true,
  };
  return (
    <Box>
      <Modal hideBackdrop open={openModal}>
        <Box
          className={`${classes.customModalSliderWrapper} customModalSliderWrapperBg image-video-gallery-modal-wrapper overlayModal`}>
          <Slider {...settings} thumbImg={thumbImg} sliderName='slider-container'>
            {sliderData?.map((slide: any, index: any) => {
              return (
                <React.Fragment key={index}>
                  {!slide?.Thumbnail ? (
                    <Box className='slider-container-wrapper'>
                      <Typography variant='h3regular' className='oneLineEllipsis' color='textColor'>
                        {slide?.Title}
                      </Typography>
                      <img
                        alt='gallery1'
                        className='img'
                        src={getFormattedImageUrl(slide?.Url, slide?.ext, secondaryArgs)}
                      />
                    </Box>
                  ) : (
                    <Box className='slider-container-wrapper'>
                      <Typography variant='h3regular' className='oneLineEllipsis' color='textColor'>
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
                          classname: "react-player-wrap img",
                        }}
                      />
                    </Box>
                  )}
                </React.Fragment>
              );
            })}
          </Slider>
          <Button onClick={handleClose} className='closeButton'>
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

CustomModalSlider.defaultProps = {
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
    currentPageURL: "",
    sitename: "delhiuniversity",
    prelemBaseEndpoint: {
      PublishEndPoint: "",
      APIEndPoint: "https://platx-api-dev.fanuep.com/platform-x/",
      device: "window",
      buttonBaseUrl: "https://platx-publish-dev.fanuep.com/",
      deliveryEndPoint: "https://dev.delivery.hcl-x.com/platform-x/",
    },
    editState: false,
    multiSlot: {},
    gcpUrl: "https://storage.googleapis.com",
    bucketName: "cropped_image_public",
  },
};

export default CustomModalSlider;
