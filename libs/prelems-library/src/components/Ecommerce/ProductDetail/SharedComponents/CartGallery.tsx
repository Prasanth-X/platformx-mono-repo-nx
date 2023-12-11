import React, { useState } from 'react';
import ImagePopup from './Popup';
import { convertToLowerCase, nullToObject } from '../lib/utils/helperFns';
import {
  ArrowUpward,
  ArrowDownward,
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material';
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  IconButton,
  useMediaQuery,
  Box,
} from '@mui/material';
import './CartGallery.css';
import { useCustomStyle } from './CartGallery.style';
import fallBackImage from '../../../../assets/fallBackImage.png';

const CartGallery = (props: any = {}) => {
  const classes = useCustomStyle();
  const { loading = true, productFullDetails = {} } = nullToObject(props);
  const { attr_images: images = [] } = nullToObject(productFullDetails);

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [activeThumbnailIndex, setActiveThumbnailIndex] = useState(0);

  const isMobile = useMediaQuery('(max-width: 1023px)');
  const isMobileThumbNail = useMediaQuery('(max-width: 540px)');
  const isTabletThumbNail = useMediaQuery('(min-width: 541px)');

  const handleThumbnailClick = (index: number) => {
    setActiveThumbnailIndex(index);
  };

  const handleLargeImageClick = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const handleNextThumbnail = () => {
    setActiveThumbnailIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevThumbnail = () => {
    setActiveThumbnailIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  let initialThumbnailCount;
  if (isMobileThumbNail) {
    initialThumbnailCount = 3;
  } else if (isTabletThumbNail) {
    initialThumbnailCount = 4;
  } else {
    initialThumbnailCount = 5;
  }
  const initialThumbnails = images.slice(0, initialThumbnailCount);

  return (
    <Grid
      container
      className={`ecommerceShoppiCartGallery product-detail-section ${classes.productDetailGallery} ecomProductDetailGallery`}
      xs={12}
    >
      <Grid item className={`product-small-image-wrapper smallImageWrapper`}>
        {isMobile ? (
          <>
            {initialThumbnails.length > 4 && (
              <IconButton
                aria-label="Previous"
                onClick={handlePrevThumbnail}
                className="previousIcon"
              >
                <ChevronLeft />
              </IconButton>
            )}
          </>
        ) : (
          <>
            {initialThumbnails.length > 5 && (
              <IconButton
                aria-label="Previous"
                onClick={handlePrevThumbnail}
                className="previousIconDesktop"
              >
                <ArrowUpward />
              </IconButton>
            )}
          </>
        )}
        {loading ? (
          [1, 2, 3].map((item, index) => (
            <Grid
              item
              key={convertToLowerCase(index + 'initialThumbnails-ndn')}
            >
              <Card className="skeltonThumb">
                <Box className="skeleton"></Box>
              </Card>
            </Grid>
          ))
        ) : (
          <>
            {initialThumbnails.length === 0 && (
              <Grid item>
                <Card className={`product-thumbnail skeltonThumb`}>
                  <CardActionArea
                    style={{
                      opacity: 1,
                      padding: '5px',
                    }}
                  >
                    {loading ? (
                      <Box className="skeleton"></Box>
                    ) : (
                      <CardMedia
                        className="skeleton"
                        component="img"
                        image={fallBackImage}
                      />
                    )}
                  </CardActionArea>
                </Card>
              </Grid>
            )}
            {initialThumbnails.map((imageUrl: string, index: number) => (
              <Grid
                item
                key={convertToLowerCase(index + 'initialThumbnails-ndn')}
              >
                <Card className={`product-thumbnail skeltonThumb`}>
                  <CardActionArea
                    onClick={() => handleThumbnailClick(index)}
                    style={{
                      opacity: activeThumbnailIndex === index ? 1 : 0.5,
                      padding: '5px',
                    }}
                  >
                    {loading ? (
                      <Box className="skeleton"></Box>
                    ) : (
                      <CardMedia
                        className="skeleton"
                        component="img"
                        image={imageUrl}
                      />
                    )}
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </>
        )}

        {isMobile ? (
          <>
            {initialThumbnails.length > 4 && (
              <IconButton
                aria-label="Next"
                onClick={handleNextThumbnail}
                className="nextIcon"
              >
                <ChevronRight />
              </IconButton>
            )}
          </>
        ) : (
          <>
            {initialThumbnails.length > 5 && (
              <IconButton
                aria-label="Next"
                onClick={handleNextThumbnail}
                className="nextThumb"
              >
                <ArrowDownward />
              </IconButton>
            )}
          </>
        )}
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        em={9}
        lg={10}
        sx={{ order: { xs: 1, em: 2 } }}
        className="product-large-image-wrapper"
      >
        <Card className={`detail-large-image-card largeImageGap`}>
          <CardActionArea
            onClick={images.length > 0 && handleLargeImageClick}
            className={`large-image cardActionArea`}
          >
            <CardMedia
              className="skeleton"
              component={loading ? 'div' : 'img'}
              image={
                loading
                  ? ''
                  : images.length > 0
                  ? images[activeThumbnailIndex]
                  : fallBackImage
              }
              onError={(e: any) => {
                if (e.target.src !== fallBackImage) {
                  e.target.onerror = null;
                  e.target.src = fallBackImage;
                }
              }}
              sx={{
                height:
                  loading || images.length === 0
                    ? { xs: '350px', md: '425px', em: '500px' }
                    : '100%',
                width: '100%',
              }}
            />
          </CardActionArea>
        </Card>
      </Grid>
      <ImagePopup
        isOpen={isPopupOpen}
        isMobile={isMobile}
        handleClose={handleClosePopup}
        handlePrev={handlePrevThumbnail}
        handleNext={handleNextThumbnail}
        imageUrl={images[activeThumbnailIndex]}
      />
    </Grid>
  );
};

export default CartGallery;
