import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { format } from "date-fns";
import React from "react";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import { useCustomStyle } from "../Article/RecentCarousel.style";
import ArticleIcon from "assets/Article.png";
import fallBackImage from "assets/fallBackImage.png";
import { formRelativeURL } from "components/HeaderFooter/helperFunction";

const windowSettings = {
  dots: true,
  arrows: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: false,
        dots: true,
      },
    },
    {
      breakpoint: 920,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
        dots: true,
        arrows: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
      },
    },
  ],
};

const tabletSettings = {
  slidesToShow: 2,
  slidesToScroll: 2,
  infinite: false,
  dots: true,
  arrows: false,
};

const mobileSettings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: false,
  dots: false,
  arrows: false,
};

const RecentCarousel = ({ isVideoLandingPage, data, secondaryArgs }: any) => {
  const platform = secondaryArgs?.platform;
  const classes = useCustomStyle();
  const theme = useTheme();
  const { t } = useTranslation();
  const { gcpUrl, bucketName } = secondaryArgs;
  const onClickCard = (item: any) => {
    if (typeof window !== "undefined") {
      const id = item?.current_page_url;
      const type = item?.content_type === "VOD" ? "video" : "article";
      if (secondaryArgs?.prelemBaseEndpoint?.language) {
        window.open(`/${secondaryArgs?.prelemBaseEndpoint?.language}/${type}${id}`);
      } else {
        window.open(`/${type}${id}`);
      }
    }
  };
  const vodPlayEnable = (item: any) => {
    if (platform !== "isAuthoring") onClickCard(item);
  };
  const sliderSettings =
    secondaryArgs?.prelemBaseEndpoint?.device === "tablet"
      ? { ...tabletSettings }
      : secondaryArgs?.prelemBaseEndpoint?.device === "mobile"
      ? { ...mobileSettings }
      : { ...windowSettings };

  const themeCss = `
        @charset 'UTF-8';.slick-dots,.slick-next,.slick-prev{position:absolute;display:block;padding:0}.slick-dots li button:before,.slick-next:before,.slick-prev:before{font-family:slick;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.slick-loading .slick-list{background:url(ajax-loader.gif) center center no-repeat #fff}@font-face{font-family:slick;font-weight:400;font-style:normal;src:url(fonts/slick.eot);src:url(fonts/slick.eot?#iefix) format('embedded-opentype'),url(fonts/slick.svg#slick) format('svg')}.slick-next,.slick-prev{font-size:0;line-height:0;top:50%;width:60px;height:60px;-webkit-transform:translate(0,-50%);-ms-transform:translate(0,-50%);transform:translate(0,-50%);cursor:pointer;color:transparent;border:none;outline:0;background:0 0}.slick-next:focus:before,.slick-next:hover:before,.slick-prev:focus:before,.slick-prev:hover:before{opacity:1}.slick-next.slick-disabled:before,.slick-prev.slick-disabled:before{opacity:.25}.slick-next:before,.slick-prev:before{font-size:20px;line-height:1;opacity:.75;color:#fff}.slick-prev{left:-25px}[dir=rtl] .slick-prev{right:-25px;left:auto}.slick-prev:before{content:'←'}.slick-next:before,[dir=rtl] .slick-prev:before{content:'→'}.slick-next{right:-25px}[dir=rtl] .slick-next{right:auto;left:-25px}[dir=rtl] .slick-next:before{content:'←'}.slick-dotted.slick-slider{margin-bottom:30px}.slick-dots{width:100%;margin:0;list-style:none;text-align:center}.slick-dots li{position:relative;display:inline-block;width:20px;height:20px;margin:0 5px;padding:0;cursor:pointer}.slick-dots li button{font-size:0;line-height:0;display:block;border-radius:50%;width:10px;height:10px;padding:5px;cursor:pointer;color:transparent;border:0;outline:none;background:grey;opacity:0.5}.slick-dots li.slick-active button{background:#000}.slick-dots li button:focus,.slick-dots li button:hover{outline:0}.slick-dots li button:focus:before,.slick-dots li button:hover:before{opacity:1}.slick-dots li button:before{font-size:6px;line-height:20px;position:absolute;top:0;left:0;width:20px;height:20px;content:'•';text-align:center;opacity:.25;color:#000}.slick-dots li.slick-active button:before{opacity:.75;color:#000}
        `;

  const minCss = `
       .recentCarouselContainer .slick-slider {
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
       .recentCarouselContainer .slick-slider .slick-track, .recentCarouselContainer .slick-slider .slick-list {
         transform: translate3d(0, 0, 0);
       }
       .recentCarouselContainer .slick-list {
         position: relative;
         display: block;
         overflow: hidden;
         margin: 0 -3.5%;
         padding: 0;
       }
       @media (max-width:900px){
         .recentCarouselContainer .slick-list {
           margin: 0 -5.5%;
        }
       }
       @media (max-width:600px){
        .recentCarouselContainer .slick-list {
          padding-left: 0 !important;
       }
      }
       .recentCarouselContainer .slick-track {
         position: relative;
         top: 0;
         left: 0;
         display: block;
         margin-left: auto;
         margin-right: auto;
       }
       .recentCarouselContainer .slick-track:before, .slick-track:after {
         display: table;
         content: '';
       }
       .recentCarouselContainer .slick-initialized .slick-slide {
         display: block;
       }
       .recentCarouselContainer .slick-slide {
         display: none;
         float: left;
         height: 100%;
         min-height: 1px;
       }
       .recentCarouselContainer .slick-prev {
         left: -85px;
       }
       .recentCarouselContainer .slick-prev, .recentCarouselContainer .slick-next {
         font-size: 0;
         line-height: 0;
         position: absolute;
         top: 50%;
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
       .recentCarouselContainer .slick-prev:before, .recentCarouselContainer .slick-next:before {
       font-size: 32px;
       line-height: 1;
       color: white;
       margin-left: -3px;
       margin-bottom: 6px;
       display: inline-block;
       }
       .recentCarouselContainer .slick-prev:before {
       content: '‹';
       }
       .recentCarouselContainer .slick-next {
         right: -65px;
       }
       .recentCarouselContainer .slick-next:before {
       content: '›';
       margin-left: 3px;
       }
       #title {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
       }
       .recentCarouselContainer .slick-dots {
        bottom: -35px;
       }
       .recentCarouselContainer .slick-dots li button {
        background-color: ${theme.palette.prelemType1.TITLE};
        width: 10px;
        height: 10px;
        opacity: 0.4;
       }
       .recentCarouselContainer .slick-dots li.slick-active button {
        background-color: ${theme.palette.prelemType1.TITLE};
        opacity: 1;
        width: 10px;
        height: 10px;
       }

      }`;

  const getRelativeUrl = (item: any) => {
    const { content_type, thumbnail, banner, original_image = {} } = item;
    const { original_image_relative_path, ext } = original_image;
    if (content_type?.toLowerCase() === "vod") {
      if (original_image_relative_path && ext) {
        return formRelativeURL(gcpUrl, bucketName, original_image_relative_path + "." + ext);
      } else {
        return thumbnail || fallBackImage;
      }
    } else {
      if (original_image_relative_path && ext) {
        return formRelativeURL(gcpUrl, bucketName, original_image_relative_path + "." + ext);
      } else {
        return banner || fallBackImage;
      }
    }
  };

  return (
    <>
      <style>{themeCss}</style>
      <style>{minCss}</style>
      <Box className={`${classes.recentCarouselWrapper} recentCarouselBg`}>
        <Typography variant='h4medium'>
          {isVideoLandingPage ? t("related_videos") : t("related_articles")}
        </Typography>
        <Grid item xs={12} style={{ marginTop: 0, marginLeft: "-3px" }}>
          <Box
            className='recentCarouselContainer'
            sx={{
              width: { md: "94%", xs: "100%" },
              marginLeft: { md: "4%", xs: "5%" },
            }}>
            <Slider {...sliderSettings}>
              {data?.map((item: any, key: number) => {
                const bannerImage = getRelativeUrl(item);
                return (
                  <Card
                    key={key}
                    sx={{
                      border: `solid 1px ${theme.palette.prelemType1.CARDS.VARIANT1.BORDER_COLOR}`,
                      width: { md: "95%!important", xs: "96%!important" },
                      boxShadow: "none",
                      cursor: "pointer",
                      borderRadius: "10px",
                      height: "267px",
                      display: "flex!important",
                      flexDirection: "column",
                      color: theme.palette.prelemType1.CARDS.VARIANT1.TITLE,
                      background: theme.palette.prelemType1.CARDS.VARIANT1.BACKGROUND,
                      position: "relative",
                    }}
                    onClick={() => vodPlayEnable(item)}>
                    <CardMedia
                      component='img'
                      height='140'
                      width='inherit'
                      image={bannerImage}
                      alt='related article'
                      style={{
                        borderTopLeftRadius: theme.borderRadius.value1,
                        borderTopRightRadius: theme.borderRadius.value1,
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        // width: { md: "222px", xs: "336px" },
                        width: "100%",
                        height: "140px",
                        background: "linear-gradient(180deg, rgba(0,0,0,0.0001) 0%, #000000 100%)",
                        mixBlendMode: "normal",
                        opacity: "0.5",
                      }}></Box>
                    {item?.content_type === "VOD" ? (
                      <Box sx={{ position: "absolute", top: "34%", left: "3%" }}>
                        <PlayCircleOutlineRoundedIcon sx={{ color: "white", fontSize: "40px" }} />
                      </Box>
                    ) : (
                      <img
                        alt='RecentCarousel'
                        src={ArticleIcon}
                        height='40'
                        width='40'
                        loading='lazy'
                        style={{
                          position: "absolute",
                          marginTop: "94px",
                          marginLeft: "3px",
                        }}
                      />
                    )}
                    <CardContent style={{ padding: "10px 10px 0px 10px", flexGrow: 1 }}>
                      <Typography
                        gutterBottom
                        variant='h5medium'
                        className='noMarginBoth title'
                        component='div'
                        style={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: "2",
                          overflow: "hidden",
                        }}>
                        {item?.title}
                      </Typography>
                    </CardContent>
                    <CardActions className='actionBar'>
                      <Box style={{ display: "grid" }}>
                        <Typography variant='h7medium' className='noMarginBoth title'>
                          {item?.author}
                        </Typography>
                        <Typography variant='h7medium' className='noMarginBoth title'>
                          {item?.publishedDate
                            ? format(new Date(item?.publishedDate), "LLL dd, yyyy | H:mm")
                            : "-"}
                        </Typography>
                      </Box>
                    </CardActions>
                  </Card>
                );
              })}
            </Slider>
          </Box>
        </Grid>
      </Box>
    </>
  );
};

export default RecentCarousel;
