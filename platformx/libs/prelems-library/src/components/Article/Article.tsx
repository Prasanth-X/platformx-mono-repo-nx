import { Box, Card, CardContent, Chip, Divider, Grid, Typography, useTheme } from "@mui/material";
import { format } from "date-fns";
import usePlatformAnalytics from "platform-x-utils/dist/analytics";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ImageRender from "../../Common/ImageRender";
import "../../Style.css";
// import ProfileIcon from "../../assets/profileIcon.svg";
import "../../service/i18n";
import Share from "../Share/Share";
import RecentCarousel from "./RecentCarousel";
import { useCustomStyle } from "../Article/Article.style";

const Article = ({
  content,
  analytics,
  authoringHelper,
  secondaryArgs = {},
  showRecentArticles = true,
}: any) => {
  const classes = useCustomStyle();
  const theme = useTheme();
  const defaultObj = {
    pageId: analytics?.pageId,
    pageTitle: analytics?.pageTitle,
    pageDesc: analytics?.pageDesc,
    pageTags: analytics?.pageTags,
    prelemID: analytics?.prelemId,
    prelemTitle: analytics?.prelemTitle,
    prelemTags: analytics?.prelemTags,
    prelemPosition: analytics?.prelemPosition,
  };

  const [, handleImpression] = usePlatformAnalytics();
  const [enableImpressionTracking, setEnableImpressionTracking] = useState(true);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const firstRender = useRef(true);
  const { t, i18n } = useTranslation();

  const getArticleUrl = () => {
    let id = content?.current_page_url;
    if (id && id.charAt(0) === "/") {
      id = id.substring(1);
    }
    return `${secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint}${secondaryArgs?.prelemBaseEndpoint?.language}/article/${id}`;
  };
  // const url = new URL(window.location.href);
  useEffect(() => {
    if (typeof window !== "undefined") {
      i18n.changeLanguage(secondaryArgs?.prelemBaseEndpoint?.language);
      // i18n.changeLanguage(url.pathname.split("/")[1]);
    }
  }, []);
  useEffect(() => {
    if (
      !analytics?.isAuthoring &&
      analytics?.isAnalyticsEnabled &&
      enableImpressionTracking &&
      inView
    ) {
      const prelemImpressionObj = {
        eventType: "Prelem Impression",
        ...defaultObj,
      };
      handleImpression("Prelem Impression", prelemImpressionObj);
      setEnableImpressionTracking(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, analytics?.isAnalyticsEnabled]);

  const defaultStructureData = () => {
    let ArticleStructureData;
    try {
      ArticleStructureData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            url: content?.Button1_RedirectURL,
            name: content?.Button1_Value,
          },
          {
            "@type": "ListItem",
            position: 2,
            url: content?.Slots[0].EditorialItemPath,
            name: content?.Slots[0].Title,
          },
          {
            "@type": "ListItem",
            position: 3,
            url: content?.Slots[1].EditorialItemPath,
            name: content?.Slots[1].Title,
          },
          {
            "@type": "ListItem",
            position: 4,
            url: content?.Slots[2].EditorialItemPath,
            name: content?.Slots[2].Title,
          },
        ],
      };
    } catch (e) {
      ArticleStructureData = {};
    }

    return ArticleStructureData;
  };

  const generateStructureData = () => {
    let ArticleStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current === true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        ArticleStructureData = JSON.parse(tempSD);
      } else {
        ArticleStructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      ArticleStructureData = defaultStructureData();
    }
    return ArticleStructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content?.Slots]);
  const articleStyle = `
  blockquote{
    margin: 0;
    border-left: 3px solid black;
    padding: 5px 10px;
    font-style:italic;
  }
  .descAsset {
    height: 366px;
    width: 650px;
  }
  @media only screen and (max-width: 600px) {
    .descAsset {
    width: 100%;
    height: 100%;
  }`;

  // const publishUrl = secondaryArgs?.prelemBaseEndpoint?.buttonBaseUrl;
  const publishUrl = window.location.host + "/";
  const language = secondaryArgs?.prelemBaseEndpoint?.language;
  // const embedPageURL = publishUrl + language + "/embed/article/" + content?.current_page_url;
  // const landingPageURL = publishUrl + language + "/article/" + content?.current_page_url;
  const embedPageURL = publishUrl + language + "/embed/article" + content?.current_page_url;
  const landingPageURL = publishUrl + language + "/article" + content?.current_page_url;

  const embedData = {
    Title: content?.title,
    Description: content?.description,
    Thumbnail: content?.banner,
    Author: content?.developed_by,
    creationDate: content?.developed_date,
    Page: embedPageURL,
    LandingPage: landingPageURL,
    ContentURL: content?.PageSettings?.SocialOgURL,
  };
  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.articleDetailPageWrapper} articleDetailPage`}>
      <Grid container ref={ref}>
        <style>{articleStyle}</style>
        <Grid item xs={12} className='articleHeroImage'>
          <Box
            sx={{
              // height: { md: "457px", sm: "457px", xs: "205px", lg: "457px" },
              aspectRatio: {
                xs: "4 / 3",
                sm: "4 / 3",
                md: "4 / 3",
                em: "4 / 3",
                lg: "3 / 1",
                xl: "3 / 1",
              },
              position: "relative",
            }}>
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                background: "linear-gradient(180deg, rgba(0,0,0,0.0001) 0%, #000000 100%)",
                mixBlendMode: "normal",
                opacity: "0.5",
              }}></div>
            <ImageRender
              originalImage={content?.original_image}
              publishedImages={content?.published_images}
              secondaryArgs={secondaryArgs}
              imgOrder={{
                1440: "hero",
                1280: "hero",
                1024: "card2",
                768: "card2",
                600: "card2",
                320: "card2",
              }}
            />
            {/* <img
              src={fetchCroppedUrl(content.Banner, content.published_images, { 1440: 'landscape', 1280: 'landscape', 1024: 'portrait', 768: 'portrait', 600: 'square', 320: 'square' })}
              alt={"Banner_Image"}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            /> */}
            {/* <Box sx={{ display: 'flex',
                            position: { xs: 'initial', md: 'absolute' },
                            width: { xs: '100%', sm: '100%', md: '700px' },
                            margin: '-450px auto 0px 230px',
                            color: 'white'
                            }}>
                            <KeyboardArrowLeftIcon />
                            <Link
                                to="/" style={{ textDecoration: 'none', color: 'white'}}
                                > <Typography variant='h3medium'> Back </Typography>
                            </Link>
                        </Box> */}
            <Box
              sx={{
                position: { xs: "initial", md: "relative" },
                bottom: "10px",
                width: { xs: "100%", sm: "100%", md: "700px" },
                marginTop: "-15px",
                margin: { xs: "0 5%", md: "-10px auto" },
              }}>
              <Typography
                variant='h1bold'
                id='title'
                color='textColor'
                sx={{
                  position: "absolute",
                  bottom: "5%",
                  // margin: { xs: '0 5%', md: '0%' },
                }}>
                {content.title}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} className='articleDescription prelem-pb'>
          <Card
            className='articleCardDescription'
            sx={{
              boxShadow: "none",
              borderRadius: "0px",
              margin: { xs: "0", md: "0 auto" },
              width: { xs: "100%", sm: "100%", md: "700px" },
              padding: { xs: "0px 3% 0px 3%", md: "0px" },
            }}>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "24px 0",
              }}>
              <Box sx={{ display: "flex" }}>
                {/* <img
                  alt="Article"
                  width="16px"
                  height="20px"
                  src={ProfileIcon}
                ></img> */}
                <AccountCircleOutlinedIcon className='avtartIcon' width='16px' height='20px' />
                <Typography variant='p4regular' className='noMarginBoth' sx={{ ml: "5px" }}>
                  {content.page_lastmodifiedby}
                </Typography>
              </Box>
              <Typography variant='p4regular' className='noMarginBoth'>
                {content?.developed_date
                  ? format(new Date(content?.developed_date), "MMM dd, yyyy | H:mm")
                  : "-"}
              </Typography>
            </Box>
            <Divider variant='fullWidth' />
            <CardContent style={{ padding: "12px 0px 12px 0px" }}>
              <Typography
                variant='p3regular'
                dangerouslySetInnerHTML={{ __html: content.description }}></Typography>
            </CardContent>
            <Divider variant='fullWidth' />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexFlow: { xs: "column", md: "row" },
                mb: "30px",
                mt: "25px",
              }}>
              {content.tags && content.tags?.length > 0 && (
                <Box sx={{ mb: { xs: "15px", md: 0 } }}>
                  <Typography variant='h4medium' className='title'>
                    {t("related_tags")}
                  </Typography>
                  {content.tags?.map((tag: string) => {
                    return (
                      <Fragment key={tag}>
                        {tag && (
                          <Chip
                            label={tag}
                            key={tag}
                            variant='outlined'
                            style={{
                              fontSize: "14px",
                              fontWeight: "normal",
                              marginRight: "10px",
                              marginTop: "5px",
                              backgroundColor: "#fff",
                              // backgroundColor: "#e6eaed",
                              borderRadius: "5px",
                              border: "1px solid #14142B",
                            }}
                          />
                        )}
                      </Fragment>
                    );
                  })}
                </Box>
              )}
              <Box>
                <Typography variant='h6regular'>{t("share_text")}</Typography>
                <Share
                  domainUrl={getArticleUrl()}
                  shareUrl={content?.settings?.socialog_url}
                  embedData={embedData}
                  whiteIcon={false}
                  border={`solid 1px ${theme.palette.prelemType1.LINE}`}
                />
              </Box>
            </Box>
            <Box
              sx={{
                margin: { xs: "0 -3%", md: "0" },
                padding: { xs: "40px 5%", md: "0" },
              }}>
              {showRecentArticles && (
                <RecentCarousel
                  isArticleLandingPage={true}
                  data={content.latest_articles}
                  secondaryArgs={secondaryArgs}
                />
              )}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

Article.defaultProps = {
  content: {
    Page: "final-create",
    SiteName: "PlatX",
    SubTitle: null,
    title: "Sachin Tendulkar",
    banner:
      "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/5d50e2ba-dd05-44f8-ad2c-17148ae7b76b/content",
    description:
      "We seem to live in a society that greatly promotes individualism, and unfortunately, this can lead to feelings of isolation and loneliness. As human beings, we were not created to go through life alone. God created us to be in relationship with one another. While on Earth, Jesus gathered a group of believers to join Him in His journey of changing the world. These 12 men, known as the disciples, traveled with Jesus and learned from His teachings. They educated others about the teachings of Jesus and continued to do so after His death. We seem to live in a society that greatly promotes individualism, and unfortunately, this can lead to feelings of isolation and loneliness. As human beings, we were not created to go through life alone. God created us to be in relationship with one another. While on Earth, Jesus gathered a group of believers to join Him in His journey of changing the world. These 12 men, known as the disciples, traveled with Jesus and learned from His teachings. They educated others about the teachings of Jesus and continued to do so after His death.",
    ContentType: "article",
    Category: "article",
    parent_page_url: "/",
    current_page_url: "final-create",
    Page_CreatedBy: "Platx Dev",
    page_lastmodifiedby: "Platx Dev",
    Page_PublishedBy: null,
    IsEdit: false,
    SeoEnable: true,
    AnalyticsEnable: true,
    RobotTxt: false,
    SiteMap: false,
    Others: null,
    Analytics: null,
    PageSettings: {
      Page: "sample-article",
      Description: "it’s crucial that you optimize your video descriptions for SEO.",
      PageViewer: "",
      PageCaching: "",
      PageMobileFriendly: "",
      SeoTitle: "",
      SeoDescription: "",
      SchedulePublishDateTime: "",
      SeoKeywords: "",
      SeoBlockIndexing: "",
      SocialOgTitle: "",
      SocialOgDescription: "",
      SocialOgSiteName: "",
      SocialOgType: "",
      SocialOgURL: "https://platx-publish-dev.fanuep.com/article/article-test",
      SocialOgLocale: "",
      SocialOgImage: "null",
      SocialOgTwitterTitle: "",
      SocialOgTwitterDescription: "",
      SocialOgTwitterImage: "null",
      SocialOgTwitterURL: "",
      SocialTwitterCardSize: "",
      IsScheduleUnpublish: "",
      ScheduleUnpublishDateTime: "",
      IsSchedulePublish: "",
    },
    structure_data:
      '{"@context":"https://schema.org","@type":"Article","headline":"final create","Description":"dfasdf dsfsdaf dfsdf dfsdf ddfsdf&nbsp;","keywords":[""],"url":"final-create","image":"https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/5d50e2ba-dd05-44f8-ad2c-17148ae7b76b/content","datePublished":"2022-11-11T13:38:57.565Z","dateModified":"","author":[{"@type":"Person","name":"Platx Dev","url":"final-create"}]}',
    developed_by: "Platx Dev",
    developed_date: "2022-11-11T14:31:55Z",
    page_state: "DRAFT",
    UserActionInfo:
      '{"publishByDetails":{"email":"","name":"","timeZone":"Asia/Kolkata","pubUnpubDateTime":""},"unpublishByDetails":{"email":"","name":"","timeZone":"Asia/Kolkata","pubUnpubDateTime":""}}',
    Links: [],
    LinkTags: [],
    creationDate: "2022-11-11T13:40:34Z",
    LastModificationDate: "2022-11-11T14:31:43Z",
    articleContent: { Images: {}, Videos: {} },
    article_settings: {
      PageTags: ["final"],
      PageCaching: false,
      PageMobileFriendly: false,
      SeoBlockIndexing: false,
      SocialOgImage: {
        ImageCropUrl: {
          CropUrl: {},
          MetaFields: { AltText: "", Name: "", Title: "", Description: "" },
        },
      },
      SocialOgTwitterImage: {
        ImageCropUrl: {
          CropUrl: {},
          MetaFields: { AltText: "", Name: "", Title: "", Description: "" },
        },
      },
      IsScheduleUnpublish: false,
      IsSchedulePublish: false,
    },
    latest_articles: [
      {
        title: "is the data back",
        banner:
          "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/dff10c91-bb3b-4d01-b688-92e3b2e165a8/content",
        thumbnail:
          "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/e7d8d045-cb3f-4a30-ab46-6cacf403b5f7/content",
        description: "check if the data is back",
        publishedDate: "2022-11-11T12:29:14Z",
        page_lastmodifiedby: "2022-11-11T12:29:14Z",
        content_type: "Article",
        author: "Platx Dev",
        current_page_url: "is-the-data-back",
        original_image: {
          original_image_relative_path: "1693060047487/public/jpeg/pic_sustainability_large",
          bitStreamId: "ee2fed38-b579-4696-a824-17993411821e",
          auto: true,
          ext: "jpg",
          visibility: "public",
        },
      },
      {
        title: "Hellow world 12 Hellow world 12 Hellow world 12 Hellow world 12",
        banner:
          "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/d13aa105-3a5a-4725-8b38-1fa9438bf8a1/content",
        thumbnail:
          "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/e7d8d045-cb3f-4a30-ab46-6cacf403b5f7/content",
        description: "this si a test",
        publishedDate: "2022-11-11T08:59:36Z",
        page_lastmodifiedby: "2022-11-11T08:59:36Z",
        content_type: "Article",
        author: "Platx Dev",
        current_page_url: "hellow-world-12",
      },
      {
        title: "Hellow world 1",
        banner:
          "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/7e10aee8-adcc-4699-8327-93cd11cd3676/content",
        thumbnail:
          "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/e7d8d045-cb3f-4a30-ab46-6cacf403b5f7/content",
        description: "this is a new one",
        publishedDate: "2022-11-11T08:47:24Z",
        page_lastmodifiedby: "2022-11-11T08:47:24Z",
        content_type: "Article",
        author: "Platx Dev",
        current_page_url: "hellow-world-1",
        original_image: {
          original_image_relative_path: "1693060047487/public/jpeg/pic_sustainability_large",
          bitStreamId: "ee2fed38-b579-4696-a824-17993411821e",
          auto: true,
          ext: "jpg",
          visibility: "public",
        },
      },
      {
        title: "This is new",
        banner:
          "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/f5d6e327-84b8-47f3-9bee-fdc3f97be566/content",
        thumbnail:
          "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/f5d6e327-84b8-47f3-9bee-fdc3f97be566/content",
        description: "this is not <b>new</b><div>this is <u>not</u> at all <i>new</i></div>",
        publishedDate: "2022-11-11T08:17:26Z",
        page_lastmodifiedby: "2022-11-11T08:17:26Z",
        content_type: "Article",
        author: "Platx Dev",
        current_page_url: "this-is-new",
      },
      {
        title: "Tatatata 3",
        banner:
          "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/e7d8d045-cb3f-4a30-ab46-6cacf403b5f7/content",
        thumbnail:
          "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/e7d8d045-cb3f-4a30-ab46-6cacf403b5f7/content",
        description: "dfsf dsfsdfdsf dfdsfad dfs df fdgfdg",
        publishedDate: "2022-11-11T08:07:02Z",
        page_lastmodifiedby: "2022-11-11T08:07:02Z",
        content_type: "Article",
        author: "api",
        current_page_url: "tatatata-3",
      },
      {
        title: "Dhoni",
        banner:
          "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/2cce57f1-b219-4ee6-8f79-44021086b9aa/content",
        thumbnail:
          "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/2cce57f1-b219-4ee6-8f79-44021086b9aa/content",
        description:
          'dfsad df df dfasdfdsf<div>dfdfdsf dsfdsf dsffdsf</div><div>dsfsdf dsfsadf dsfsdf</div><div><br></div><img src="https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/440bc073-2ecf-47c9-b3aa-7bcea8f0c3f8/content" class="descAsset" style="display:block;object-fit:cover"><div><br></div><div>dsfsdf</div><div>dsfsadf</div><div>dsfsa</div><div>dfsdfasdf</div><div>sdfsd<br><br></div>',
        publishedDate: "2022-11-11T07:52:02Z",
        page_lastmodifiedby: "2022-11-11T07:52:02Z",
        content_type: "Article",
        author: "Platx Dev",
        current_page_url: "dhoni",
      },
      {
        title: "article 00001",
        banner:
          "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/409d6afd-376f-4013-bf58-8f7fd2d674ae/content",
        thumbnail:
          "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/409d6afd-376f-4013-bf58-8f7fd2d674ae/content",
        description: "dfsf dsff sfsd dfsdfd hhhhhhh",
        publishedDate: "2022-11-11T04:31:46Z",
        page_lastmodifiedby: "2022-11-11T04:31:46Z",
        content_type: "Article",
        author: "Platx Dev",
        current_page_url: "article-00001",
      },
    ],
    tags: ["final", "Second", "Natural"],
    ImageCompound: {
      ImageCompound_1: {
        original_image: {
          bitStreamId: "",
          original_image_relative_path: "machine_assets/1689925750685/public/png/ContactUs",
          visibility: "public",
          ext: "png",
          auto: "true",
        },
        published_images: [
          {
            aspect_ratio: "landscape",
            folder_path: "1689583455813/public/png/ContactUs",
          },
          {
            aspect_ratio: "square",
            folder_path: "1689583455813/public/png/ContactUs",
          },
          {
            aspect_ratio: "portrait",
            folder_path: "1689583455813/public/png/ContactUs",
          },
          {
            aspect_ratio: "hero",
            folder_path: "1689583455813/public/png/ContactUs",
          },
          {
            aspect_ratio: "card1",
            folder_path: "1689583455813/public/png/ContactUs",
          },
          {
            aspect_ratio: "card2",
            folder_path: "1689583455813/public/png/ContactUs",
          },
        ],
      },
    },
  },
  secondaryArgs: {
    gcpUrl: "https://storage.googleapis.com",
    bucketName: "cropped_image_public",
    prelemBaseEndpoint: {
      language: "en",
    },
  },
};

export default Article;
