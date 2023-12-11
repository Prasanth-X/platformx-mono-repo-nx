import { Box, Card, CardActionArea, CardContent, CardMedia, Link, Typography } from "@mui/material";
import React from "react";
import { formCroppedUrl } from "../../utils/helperFns";

const AwardCards = ({
  handleMouseOver,
  awards,
  handleMouseOut,
  onClickCard,
  secondaryArgs,
}: any) => {
  const { bucketName, gcpUrl } = secondaryArgs;
  return (
    <>
      {awards.map((item: any, index: number) => {
        if (item?.title && item?.sub_title) {
          return (
            <Card
              key={`${item?.title}_${index.toString()}`}
              className='awardCards'
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}>
              <CardContent>
                <Box className='awardTitleCenter'>
                  <Typography variant='p3regular' className='cardDescription'>
                    {item?.title}
                  </Typography>
                </Box>
                <Box className='centerItem'>
                  <Typography variant='p3bold' className='cardDescription'>
                    {item?.sub_title}
                  </Typography>
                </Box>
              </CardContent>
              <Box className='awardCardActionWrapper'>
                <CardActionArea
                  sx={{
                    cursor: item?.url ? "pointer" : "default",
                  }}>
                  <Link component='image' onClick={() => onClickCard(item?.url, index)}>
                    <CardMedia
                      component='img'
                      image={
                        item?.logo?.includes("dev.dam.hcl-x.com")
                          ? item?.logo
                          : formCroppedUrl(
                              gcpUrl,
                              bucketName,
                              item?.logo,
                              item?.ImageVideoData?.ext,
                            )
                      }
                      className='awardCardMedia'
                    />
                  </Link>
                </CardActionArea>
              </Box>
            </Card>
          );
        } else {
          return (
            <Card
              key={`${item?.title}_${index.toString()}`}
              className='awardCards1'
              elevation={0}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}>
              <CardActionArea>
                <Link component='image' onClick={() => onClickCard(item?.url, index)}>
                  <CardMedia
                    component='img'
                    image={
                      item?.logo?.includes("dev.dam.hcl-x.com")
                        ? item?.logo
                        : formCroppedUrl(gcpUrl, bucketName, item?.logo, item?.ImageVideoData?.ext)
                    }
                    className='cardImg'
                  />
                </Link>
              </CardActionArea>
            </Card>
          );
        }
      })}
    </>
  );
};

export default AwardCards;
