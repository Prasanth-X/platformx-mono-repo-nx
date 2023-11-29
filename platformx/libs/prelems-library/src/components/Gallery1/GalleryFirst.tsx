import React from "react";
import { Box } from "@mui/material";
import ReactPlayer from "react-player";
import "./Gallery1.css";
import { formCroppedUrl } from "utils/helperFns";

function GalleryFirst({ GalleryOne, handleOpen, secondaryArgs }: any) {
  return (
    <>
      <Box className='gallery1FirstBox'>
        {GalleryOne?.map((item: any, index: number) => {
          return (
            <Box
              className='gallery1ImageWrapper'
              key={`${item?.Title}_${index.toString()}`}
              onClick={() => handleOpen(GalleryOne, index)}>
              {"Thumbnail" in item ? (
                <img
                  alt='Gallery1 picture'
                  src={formCroppedUrl(
                    secondaryArgs?.gcpUrl,
                    secondaryArgs?.bucketName,
                    item?.Url,
                    item?.ext,
                  )}
                />
              ) : (
                <ReactPlayer
                  className='videobox'
                  url={item.Url}
                  width='100%'
                  height='100%'
                  playing={true}
                  loop={true}
                  controls={false}
                  muted={true}
                />
              )}
            </Box>
          );
        })}
      </Box>
    </>
  );
}

export default GalleryFirst;
