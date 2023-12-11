import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button } from "@mui/material";
import ImageVideoGalleryModalSlider from "../ImageVideoGalleryModalSlider/ImageVideoGalleryModalSlider";
import { useCustomStyle } from "./ExpertiseShowcaseSlot.style";
import { formCroppedUrl } from "utils/helperFns";

const ExpertiseShowcaseSlot = ({ content, secondaryArgs }: ExpertiseShowcaseSlotProps) => {
  const [modalStatus, setModalStatus] = useState(false);
  const [sliderData, setSliderData] = useState([]);
  const [contentType, setContentType] = useState("");
  useEffect(() => {
    const selectedContentType =
      (content?.EditorialItemPath &&
        (content?.EditorialItemPath?.split("/")[5] === "imagegallery"
          ? "ImageGallery"
          : content?.EditorialItemPath?.split("/")[5] === "videogallery" && "VideoGallery")) ||
      "ImageGallery";
    const filterType = selectedContentType === "ImageGallery" ? "image" : "video";
    axios
      .get(
        `${secondaryArgs?.prelemBaseEndpoint?.deliveryEndPoint}api/v1/web/en/delivery/multi-slot-content?path=${content?.EditorialItemPath}&contentType=${selectedContentType}`,
        {
          headers: {
            sitename: secondaryArgs?.sitename,
          },
        },
      )
      .then((res: any) => {
        if (res) {
          let gallery = [];
          if (selectedContentType === "ImageGallery") {
            gallery = res?.data?.data?.fetchMultiSlotContent?.Gallery.map((x: any) => x.Image);
          } else if (selectedContentType === "VideoGallery") {
            gallery = res?.data?.data?.fetchMultiSlotContent?.Gallery.map((x: any) => x.Video);
          }
          setSliderData(gallery);
          setContentType(filterType);
        }
      });
  }, []);

  const toggleModalStatus = () => {
    if (!secondaryArgs?.editState) setModalStatus(!modalStatus);
  };
  const classes = useCustomStyle();
  return (
    <>
      <Box
        className={`${classes.expertiseShowcaseSlotWrapper} expertiseShowcaseSlot overlay-wrapper`}
        sx={{
          "&:hover": {
            ".button-name": {
              display: secondaryArgs?.editState ? "none" : "block",
            },
          },
        }}
        onClick={toggleModalStatus}>
        <Box className='imgWrapper'>
          <img
            alt='Expert4img'
            src={formCroppedUrl(
              secondaryArgs?.gcpUrl,
              secondaryArgs?.bucketName,
              content?.Thumbnail?.Url,
              content?.Thumbnail?.ext,
            )}
            style={{ objectFit: "cover" }}
          />
          <Box className='bottomButton'>
            <Button variant='defaultButton1'>{content?.Title}</Button>
          </Box>
        </Box>
        <Box
          className='image-button-text'
          sx={{
            display: secondaryArgs?.editState ? "none" : "flex",
          }}>
          <Box className='button-name' sx={{ display: "none" }}>
            <Button variant='defaultButton1'>{content?.Title}</Button>
          </Box>
        </Box>
      </Box>
      {modalStatus && sliderData && sliderData.length > 0 && !secondaryArgs?.editState && (
        <ImageVideoGalleryModalSlider
          sliderData={sliderData}
          openModal={modalStatus}
          contentType={contentType}
          handleClose={toggleModalStatus}
        />
      )}
    </>
  );
};

interface ExpertiseShowcaseSlotProps {
  content: Content;
  secondaryArgs: any;
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
    ext: string;
  };
}

ExpertiseShowcaseSlot.defaultProps = {
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
      ext: "png",
    },
  },
};

export default ExpertiseShowcaseSlot;
