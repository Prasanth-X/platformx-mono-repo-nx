import { Box, Card, Divider, Grid, Link, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { formRelativeURL } from "../helperFunction";
import Logo from "assets/header/platform-x-logo.png";
import emailLogo from "assets/footer/Email.png";
import phoneLogo from "assets/footer/Phone.png";
import mapLogo from "assets/footer/map.png";
import "service/i18n";
import { useCustomStyle } from "./Footer.style";

interface IFooter {
  FooterLogo: string;
  Description: string;
  FacebookUrl: string;
  LinkedinUrl: string;
  InstagramUrl: string;
  TwitterUrl: string;
  YoutubeUrl: string;
  Address: string;
  Email: string;
  PhoneNumber: string;
  NewsLetterDescription: string;
  CopyrightYearDescription: string;
  TermsAndConditions: string;
  PrivacyUrl: string;
  CookiesDescription: string;
  HelpSupport: string;
  about_us_text: string;
  address: string;
  contact_number: string;
  copyright_text: string;
  email_address: string;
  news_letter_description: string;
  news_letter_title: string;
  site_logo: string;
  title_text: string;
  link: LinkItem[];
  footermediahandle: MediaItem[];
}

interface LinkItem {
  link_name: string;
  link_url: string;
}

interface MediaItem {
  enable: boolean;
  icon_image: string;
  media_name: string;
  media_url: string;
}
interface Props {
  data: IFooter;
  langCode: string;
  gcpUrl?: string;
  bucketName?: string;
}

const Footer = ({ data, langCode, gcpUrl, bucketName }: Props) => {
  // const [email, setEmail] = useState("");
  const { i18n } = useTranslation();
  const classes = useCustomStyle();

  // const url = new URL(window.location.href);
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     //await addToMailchimp(email);
  //     console.log("Successfully subscribed!");
  //     // Add any success notifications or redirect on successful subscription
  //   } catch (error) {
  //     console.error("Error subscribing:", error);
  //     // Add error handling and display an appropriate message
  //   }
  // };
  useEffect(() => {
    if (typeof window !== "undefined") {
      i18n.changeLanguage(langCode);
    }
  }, []);
  return (
    <footer>
      <Card className={`${classes.xfooter} footerBackground`}>
        <Box className='footerPadding'>
          <Grid container>
            <Grid item xs={12} em={4} sm={6} className='gapRight'>
              <Box className='footerLogo'>
                <img
                  src={formRelativeURL(gcpUrl, bucketName, data?.site_logo)}
                  loading='lazy'
                  width='40px'
                  alt='Logo'
                  height='40px'
                />
              </Box>
              <Typography variant='p4regular' color='footerParagraphColor' className='aboutPara'>
                {data?.about_us_text}
              </Typography>
              <br />
              <Box className='anchorWrapper'>
                {data.footermediahandle.map((media, index) => (
                  <a
                    href={media.media_url}
                    target='_blank'
                    rel='noopener noreferrer'
                    key={`media-${index}`}
                    className='anchorGap'>
                    <img
                      src={formRelativeURL(gcpUrl, bucketName, media.icon_image)}
                      loading='lazy'
                      alt='social-icon'
                      width='40'
                      height='40'
                    />
                  </a>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} em={4} sm={6} className='footerSecondColumn'>
              <Typography variant='h5medium' color='footerParagraphColor' className='margin_zero'>
                {data.title_text}
              </Typography>
              <Box className='footerSection1'>
                <img src={mapLogo} loading='lazy' alt='social-icon' width='24' height='24' />
                <Typography
                  variant='p4regular'
                  color='footerParagraphColor'
                  className='margin_zero'>
                  {data?.address}
                </Typography>
              </Box>
              <Box className='footerSection2'>
                <img src={emailLogo} loading='lazy' alt='social-icon' width='24' height='24' />
                <Typography
                  variant='p4regular'
                  color='footerParagraphColor'
                  className='margin_zero'>
                  {data?.email_address}
                </Typography>
              </Box>
              <Box className='footerSection3'>
                <img src={phoneLogo} loading='lazy' alt='social-icon' width='24' height='24' />
                <Typography
                  variant='p4regular'
                  color='footerParagraphColor'
                  className='margin_zero'>
                  {data?.contact_number}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} em={4} sm={12} className='footerLastColumn'>
              <Typography variant='h5medium' color='footerTextColor' className='margin_zero'>
                {data.news_letter_title}
              </Typography>
              <Box className='footerSection1'>
                <Typography variant='p4regular' color='footerParagraphColor'>
                  {data?.news_letter_description}
                </Typography>
              </Box>
              {/* <FormControl
                fullWidth
                sx={{
                  backgroundColor: "#fff",
                  mt: "32px",
                  borderRadius: "3px",
                }}
                variant="outlined"
              >
                <OutlinedInput
                  id="outlined-adornment-password"
                  type="text"
                  value={email}
                  placeholder={t("email_placeholder_text")} //'Enter your email address'
                  //onChange={handleChange('password')}
                  onChange={(e) => setEmail(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleSubmit}
                        sx={{
                          backgroundColor: "#2d2d39",
                          color: "#fff",
                          borderRadius: "3px",
                          width: "60px",
                          marginRight: "-2px",
                          "&:hover": {
                            // Define your hover styles here
                            // For example, change the background color and color:
                            backgroundColor: "#4B9EF9",
                            color: "white",
                          },
                        }}
                        aria-label="toggle password visibility"
                        // onClick={handleClickShowPassword}
                        edge="end"
                      >
                        <ArrowForwardIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl> */}
            </Grid>
          </Grid>
        </Box>
      </Card>
      <Grid container className={`${classes.xfooter} footercopyRight`}>
        <Grid item xs={12} em={4} lg={4} className='copyRightLeftcolumn'>
          <Typography
            variant='p4regular'
            fontSize={12}
            color='footerParagraphColor'
            className='margin_zero'>
            {data?.copyright_text}
          </Typography>
        </Grid>
        <Grid item xs={12} em={1} lg={1}>
          <Divider variant='middle' className='dividerLine' />
        </Grid>
        <Grid item xs={12} em={7} lg={7}>
          <Box className='copyRightSecondcolumn'>
            {data.link.map((link, index) => (
              <Link
                underline='hover'
                className={`footer-link footerLinkColor`}
                target='_self'
                fontSize={12}
                href={link.link_url ? link.link_url : "/error"}
                key={`index_${index + 1}`}>
                <Typography variant='p4regular' component='span' color='footerParagraphColor'>
                  {link.link_name}
                </Typography>
              </Link>
            ))}
          </Box>
        </Grid>
      </Grid>
    </footer>
  );
};

Footer.defaultProps = {
  data: {
    FooterLogo: Logo,
    Description: "Run your D2C engagement and monetization initiatives through a single platform.",
    FacebookUrl: "https://www.facebook.com/",
    LinkedinUrl: "https://www.linkedin.com/",
    InstagramUrl: "https://www.instagram.com/",
    TwitterUrl: "https://twitter.com/home",
    YoutubeUrl: "https://www.youtube.com/",
    Address: "HCL Technology Hub, Plot No 3A, Sector 126, Noida – 201303. UP(India)",
    Email: "info@platform-x.com",
    PhoneNumber: "0120 430 6000",
    NewsLetterDescription: "Stay always in touch! Subscribe to our Newsletter.",
    CopyrightYearDescription: "©2022 Platform-X | HCL Technologies Pvt. Ltd.",
    TermsAndConditions: "/termsandconditions",
    PrivacyUrl: "/privacy",
    CookiesDescription: "/cookies",
    HelpSupport: "/help",
    about_us_text: "Publish, Engage, Convert – the all-in-One-Solutionzz",
    address: "HCL Technology Hub, Plot No 3A, Sector 126, Noida – 201303. UP",
    contact_number: "0120 430 6000",
    copyright_text: "Copyright © 2022 HCL Technologies Limited",
    email_address: "info@platform-x.com",
    news_letter_description: "News Letter Description",
    news_letter_title: "News Letter",
    site_logo: "1697614907544/public/png/X-Header-Logo.png",
    title_text: "Contact Us",
    link: [
      {
        link_name: "Contact Us",
        link_url:
          "https://platx-publish-dev.fanuep.com/en/copyofcookie-policy12?manage-cookies=true",
      },
      {
        link_name: "Privacy",
        link_url:
          "https://platx-publish-dev.fanuep.com/en/copyofcookie-policy12?manage-cookies=true",
      },
      {
        link_name: "Cookies",
        link_url:
          "https://platx-publish-dev.fanuep.com/en/copyofcookie-policy12?manage-cookies=true",
      },
    ],
    footermediahandle: [
      {
        enable: "true",
        icon_image: "1697631196993/public/png/fb-icon-(2).png",
        media_name: "Facebook",
        media_url: "www.facebook.comzzzz",
      },
      {
        enable: "true",
        icon_image: "1697631174751/public/png/twitter-icon.png",
        media_name: "Twitter",
        media_url: "www.twitter.comfff",
      },
      {
        enable: "true",
        icon_image: "1695394906710/public/png/instagram-icon.png",
        media_name: "Instagram",
        media_url: "www.instagram.comvvv",
      },
      {
        enable: "true",
        icon_image: "1695394938167/public/png/Pintrest.png",
        media_name: "Pinterest",
        media_url: "www.pinterest.com",
      },
      {
        enable: "true",
        icon_image: "1695395138011/public/png/linkedin-icon.png",
        media_name: "Linkedin",
        media_url: "www.linkedin.com",
      },
      {
        enable: "true",
        icon_image:
          "1697615037552/public/jpeg/Enner-Valencia-celebrates-scoring-for-Internacional.jpg",
        media_name: "Youtube",
        media_url: "www.youtube.com",
      },
    ],
  },
};

export default Footer;
