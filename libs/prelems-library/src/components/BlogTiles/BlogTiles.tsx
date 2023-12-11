/* eslint-disable react/jsx-key */
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { Box, Container, Grid, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import "../../Style.css";
import { formCroppedUrl } from "../../utils/helperFns";
import BlogTilesCard from "./BlogTilesCard";
import BlogTilesCard2 from "./BlogTilesCard2";
import "./BlogTiles.css";
import { prelemTypes } from "../../theme/globalStyle";
import { useCustomStyle } from "./BlogTiles.style";
import { usePrelemImpression } from "Common/ImpressionHooks/PrelemImpressionHook";

const BlogTiles = ({ content, analytics, authoringHelper, secondaryArgs }: any) => {
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  const { bucketName, gcpUrl } = secondaryArgs;
  const getCardArr = (data: any) => {
    if (data?.length > 5) {
      return data.slice(0, 5);
    } else if (data?.length > 0) {
      return data;
    }
    return [];
  };
  const [cardArr, setCardArr] = useState(getCardArr(content?.Slots));
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  usePrelemImpression(analytics, inView);

  useEffect(() => {
    setCardArr(getCardArr(content?.Slots));
  }, [content?.Slots]);

  const getGridValues = (index: number) => {
    let md = 4,
      em = 3;
    if (cardArr.length === 1) {
      md = 12;
      em = 12;
    } else if (cardArr.length === 2) {
      md = 6;
      em = 6;
    } else if (cardArr.length === 3) {
      if (index === 0) {
        em = 4;
        md = 4;
      } else {
        em = 4;
        md = 4;
      }
    } else if (cardArr.length === 4) {
      md = 6;
      em = 6;
    }
    return { md, em };
  };

  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.blogTilesWrapper} ${globalClasses.prelemType1} prelem prelemType1 blogTilesBg`}>
      <Container
        className={
          authoringHelper?.isEditPage ? "grid_full_width prelem-py" : "grid_container prelem-py"
        }>
        <Box ref={ref}>
          <Box className='blogTitleWrapper'>
            <Typography variant='h2semibold' id='Title'>
              {content?.Title}
            </Typography>
          </Box>
          <Grid
            container
            className='blogTilesInnerWrapper'
            sx={{
              "&:hover": {
                ".add-content-overlay": {
                  display: authoringHelper?.authoringHoverShow ? "flex !important" : "none",
                },
              },
            }}>
            {cardArr?.length > 0 ? (
              cardArr?.length <= 4 ? (
                cardArr.map((item: any, index: any) => {
                  const { md, em } = getGridValues(index);
                  return (
                    <Grid item xs={12} md={md} em={em} rowSpacing={1.5} p={1.5}>
                      {cardArr && Object.keys(item).length !== 0 && (
                        <Fragment>
                          <Box
                            sx={{
                              display: { xs: "block", md: "none", em: "none" },
                            }}>
                            <BlogTilesCard
                              content={cardArr[index]}
                              secondaryArgs={secondaryArgs}
                              analytics={analytics}
                              cardIndex={index}
                            />
                          </Box>
                          <Box
                            sx={{
                              display: { xs: "none", md: "block", em: "none" },
                            }}>
                            {md === 12 ? (
                              <BlogTilesCard
                                content={cardArr[index]}
                                secondaryArgs={secondaryArgs}
                                analytics={analytics}
                                cardIndex={index}
                              />
                            ) : (
                              <BlogTilesCard
                                content={cardArr[index]}
                                secondaryArgs={secondaryArgs}
                                analytics={analytics}
                                cardIndex={index}
                              />
                            )}
                          </Box>
                          <Box
                            sx={{
                              display: { xs: "none", md: "none", em: "block" },
                            }}>
                            {em === 12 || em === 12 ? (
                              <BlogTilesCard2
                                content={cardArr[index]}
                                secondaryArgs={secondaryArgs}
                                analytics={analytics}
                                cardIndex={index}
                              />
                            ) : (
                              <BlogTilesCard
                                content={cardArr[index]}
                                secondaryArgs={secondaryArgs}
                                analytics={analytics}
                                cardIndex={index}
                              />
                            )}
                          </Box>
                        </Fragment>
                      )}
                    </Grid>
                  );
                })
              ) : (
                <Grid
                  container
                  className='fivecardswp'
                  sx={{ display: { xs: "flex", md: "flex", em: "flex" } }}>
                  <Grid
                    className='leftGrid'
                    xs={12}
                    md={12}
                    em={7}
                    rowSpacing={1.5}
                    p={1.5}
                    sx={{ display: { xs: "flex", md: "none", em: "flex" } }}>
                    <BlogTilesCard
                      content={cardArr[0]}
                      secondaryArgs={secondaryArgs}
                      analytics={analytics}
                      cardIndex={0}
                    />
                  </Grid>
                  <Grid className='rightGrid' xs={12} md={12} em={5}>
                    <Grid container sx={{ justifyContent: "center", display: "flex" }}>
                      <Grid
                        xs={12}
                        md={6}
                        em={6}
                        rowSpacing={1.5}
                        p={1}
                        sx={{ display: { xs: "none", md: "flex", em: "none" } }}
                        className='SmallCard'>
                        <BlogTilesCard
                          content={cardArr[0]}
                          secondaryArgs={secondaryArgs}
                          analytics={analytics}
                          cardIndex={0}
                        />
                      </Grid>
                      <Grid xs={12} md={6} em={6} rowSpacing={1.5} p={1.5} className='SmallCard'>
                        <BlogTilesCard
                          content={cardArr[1]}
                          secondaryArgs={secondaryArgs}
                          analytics={analytics}
                          cardIndex={0}
                        />
                      </Grid>
                      <Grid xs={12} md={6} em={6} rowSpacing={1.5} p={1.5} className='SmallCard'>
                        <BlogTilesCard
                          content={cardArr[2]}
                          secondaryArgs={secondaryArgs}
                          analytics={analytics}
                          cardIndex={0}
                        />
                      </Grid>
                      <Grid xs={12} md={6} em={6} rowSpacing={1.5} p={1.5} className='SmallCard'>
                        <BlogTilesCard
                          content={cardArr[3]}
                          secondaryArgs={secondaryArgs}
                          analytics={analytics}
                          cardIndex={0}
                        />
                      </Grid>
                      <Grid xs={12} md={6} em={6} rowSpacing={1.5} p={1.5} className='SmallCard'>
                        <BlogTilesCard
                          content={cardArr[4]}
                          secondaryArgs={secondaryArgs}
                          analytics={analytics}
                          cardIndex={0}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              )
            ) : (
              <React.Fragment>
                <Box className='noDataFoundWrapper'>
                  <img
                    src={formCroppedUrl(
                      gcpUrl,
                      bucketName,
                      secondaryArgs?.noResultImg,
                      secondaryArgs?.ext,
                    )}
                    alt='NoDataFound'
                  />
                </Box>
                <Typography variant='h2' className='noDataAlingment'>
                  No data found
                </Typography>
              </React.Fragment>
            )}
            <Box className='add-content-overlay replaceWrapper'>
              <Box
                className='pointer'
                onClick={() => secondaryArgs?.multiSlot?.onToggleContentGallery()}>
                <AutorenewIcon className='replaceIconWrapper' />
                <Typography variant='p1regular' color='textColor'>
                  Replace
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Analytics {
  pageId?: number;
  prelemId?: number;
  pageTitle?: string;
  prelemTitle?: string;
  pageDesc?: string;
  pageTags?: string;
  prelemTags?: string;
  prelemPosition?: number;
  isAnalyticsEnabled: boolean;
  isAuthoring: boolean;
  isSeoEnabled: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface AuthoringHelper {
  innerRef: React.Ref<HTMLDivElement>;
  sendStructureDataToAuthoringCB: (structureData: string) => void;
  sendDefaultStructureDataForResetToAuthoringCB: (structureData: string) => void;
  openButtonEditWindowInAuthoringCB: (buttonObj?: object, e?: object) => void;
  selectedButtonNameForEditing: string;
  isEditing: boolean;
  buttonRef?: React.Ref<HTMLButtonElement>;
  buttonContentEditable?: boolean;
  lastSavedStructuredData?: string;
  isEditPage?: boolean;
}

BlogTiles.defaultProps = {
  content: {
    Description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    QueryParam: {
      filter: "ALL",
      tags: [],
      searchTerm: "",
      pagination: {
        start: 0,
        rows: 5,
      },
    },
    TagName: "SiteComponents",
    Title: "Lorem ipsum dolor sit amet",
    PrelemContentType: ["Select"],
    Slots: [
      {
        Title:
          "The Global Phenomenon of the FIFA World Cup: A Unifying Force in Football in manchester united city.",
        Banner: "",
        background_content: {
          objectType: "image",
          ext: "png",
          Url: "1699613113305/public/png/changes-to-the-laws-of-the-game-2022-23-800x450",
          Title: "",
          Thumbnail: "1699613113305/public/png/changes-to-the-laws-of-the-game-2022-23-800x450",
          Color: "",
        },
        Thumbnail: {
          Name: "the-global-phenomenon-of-the-fifa-world-cup-a-unifying-force-in-football-in-manchester-united-city-",
          Url: "https://dev.dam.hcl-x.com/server/api/core/bitstreams/32e741aa-66c9-4586-9464-cd7a7f90111a/content",
          Title:
            "The Global Phenomenon of the FIFA World Cup: A Unifying Force in Football in manchester united city.",
          Description:
            "The FIFA World Cup, an unparalleled celebration of football, captures the hearts of millions every four years, transcending geographical boundaries and cultural differences. From its humble beginnings in 1930 in Uruguay to the present-day global extravaganza, the World Cup has evolved into a multi-billion-dollar spectacle, showcasing not only the pinnacle of footballing talent but also serving as a powerful unifying force across nations. In this exploration, we delve into the historical roots, format evolution, cultural impact, economic implications, unforgettable moments, and the role of the Women's World Cup, dissecting the various facets that contribute to the magic of the World Cup.\nThe origins of the World Cup can be traced back to 1930 when Uruguay hosted the inaugural tournament, featuring 13 teams. The competition has since grown exponentially, adapting to the changing landscape of international football. The evolution of the tournament format has seen an increase in participat",
          Attribution: false,
          AltText:
            "The Global Phenomenon of the FIFA World Cup: A Unifying Force in Football in manchester united city.",
          ext: "png",
          visibility: "public",
        },
        Description:
          "The FIFA World Cup, an unparalleled celebration of football, captures the hearts of millions every four years, transcending geographical boundaries and cultural differences. From its humble beginnings in 1930 in Uruguay to the present-day global extravaganza, the World Cup has evolved into a multi-billion-dollar spectacle, showcasing not only the pinnacle of footballing talent but also serving as a powerful unifying force across nations. In this exploration, we delve into the historical roots, format evolution, cultural impact, economic implications, unforgettable moments, and the role of the Women's World Cup, dissecting the various facets that contribute to the magic of the World Cup.\nThe origins of the World Cup can be traced back to 1930 when Uruguay hosted the inaugural tournament, featuring 13 teams. The competition has since grown exponentially, adapting to the changing landscape of international football. The evolution of the tournament format has seen an increase in participat",
        PublishedDate: "2023-11-22T06:19:36Z",
        lastModifiedDate: "2023-11-22T06:19:27Z",
        ContentType: "Event",
        tags: '["Events"]',
        Author: "upendra k",
        CurrentPageURL:
          "/the-global-phenomenon-of-the-fifa-world-cup-a-unifying-force-in-football-in-manchester-united-city-",
        hclplatformx_EditorialTags:
          "the-global-phenomenon-of-the-fifa-world-cup-a-unifying-force-in-football-in-manchester-united-city-",
        EditorialItemPath:
          "the-global-phenomenon-of-the-fifa-world-cup-a-unifying-force-in-football-in-manchester-united-city-",
        PublishedBy: "upendra",
        Id: "the-global-phenomenon-of-the-fifa-world-cup-a-unifying-force-in-football-in-manchester-united-city-",
        EventEndDate: "2023-11-29T20:40:00Z",
        EventStartDate: "2023-11-24T18:30:00Z",
        GoogleApiAddress: "www.google.com",
      },
      {
        Title: "Digital Transformation Banner VOD",
        Thumbnail: {
          Name: "digital-transformation-banner-vod",
          Url: "https://dev.dam.hcl-x.com/server/api/core/bitstreams/25bb468d-438a-41bc-adf1-b40dd11ba3e8/content",
          Title: "Digital Transformation Banner VOD",
          Description: "",
          Attribution: false,
          AltText: "Digital Transformation Banner VOD",
        },
        EditorialItemPath: "digital-transformation-banner-vod",
        Description: "",
        Id: "digital-transformation-banner-vod",
        ContentType: "VOD",
        PublishedBy: "upendra",
        CurrentPageURL: "/digital-transformation-banner-vod",
        PublishedDate: "2023-11-21T10:20:29Z",
      },
      {
        Title: "new events",
        Banner: "",
        background_content: {
          objectType: "image",
          ext: "png",
          Url: "1699613220720/public/png/Banner-1",
          Title: "",
          Thumbnail: "1699613220720/public/png/Banner-1",
          Color: "",
        },
        Thumbnail: {
          Name: "new-events",
          Url: "https://dev.dam.hcl-x.com/server/api/core/bitstreams/4d262e20-3d62-47ff-9ce9-d9ef1408a6c4/content",
          Title: "new events",
          Description: "new description",
          Attribution: false,
          AltText: "new events",
          ext: "png",
          visibility: "public",
        },
        Description: "new description",
        PublishedDate: "2023-11-21T10:00:09Z",
        lastModifiedDate: "2023-11-21T10:00:05Z",
        ContentType: "Event",
        tags: '["Events"]',
        Author: "upendra k",
        CurrentPageURL: "/new-events",
        hclplatformx_EditorialTags: "new-events",
        EditorialItemPath: "new-events",
        PublishedBy: "upendra",
        Id: "new-events",
        GoogleApiAddress: "www.google.com",
      },
      {
        Title: "Videography Tutorial",
        Thumbnail: {
          Name: "videography-tutorial",
          Url: "https://dev.dam.hcl-x.com/server/api/core/bitstreams/92726c1b-6f59-4e0c-a92d-d89b2b526377/content",
          Title: "Videography Tutorial",
          Description: "Nikon",
          Attribution: false,
          AltText: "Videography Tutorial",
        },
        EditorialItemPath: "videography-tutorial",
        Description: "Nikon",
        Id: "videography-tutorial",
        ContentType: "VOD",
        PublishedBy: "sahbaz",
        CurrentPageURL: "/videography-tutorial",
        PublishedDate: "2023-11-21T06:37:20Z",
      },
      {
        Title: "Poll About ODI World Cup 2023 Final",
        Banner: "",
        background_content: {
          objectType: "image",
          Url: "1700463877332/public/jpeg/1",
          Title: "",
          Thumbnail: "1700463877332/public/jpeg/1",
          Color: "",
          ext: "jpg",
        },
        Thumbnail: {
          Name: "poll-about-odi-world-cup-2023-final",
          Url: "1700463877332/public/jpeg/1",
          Title: "Poll About ODI World Cup 2023 Final",
          Description: "ODI World Cup",
          Attribution: false,
          AltText: "Poll About ODI World Cup 2023 Final",
          ext: "jpg",
          visibility: "public",
        },
        Description: "ODI World Cup",
        PublishedDate: "2023-11-20T09:15:43Z",
        lastModifiedDate: "2023-11-20T09:15:16Z",
        ContentType: "Poll",
        tags: '["Polls","MS Dhoni"]',
        Author: "Vinay Gupta",
        CurrentPageURL: "/poll-about-odi-world-cup-2023-final",
        hclplatformx_EditorialTags: "poll-about-odi-world-cup-2023-final",
        EditorialItemPath: "poll-about-odi-world-cup-2023-final",
        PublishedBy: "Vinay",
        Id: "poll-about-odi-world-cup-2023-final",
      },
    ],
  },
  authoringHelper: {
    innerRef: null,
    sendStructureDataToAuthoringCB: () => {},
    sendDefaultStructureDataForResetToAuthoringCB: () => {},
    openButtonEditWindowInAuthoringCB: () => {},
    selectedButtonNameForEditing: "",
    isEditing: false,
    buttonRef: null,
    buttonContentEditable: false,
    lastSavedStructuredData: "",
    authoringHoverShow: false,
    isEditPage: false,
  },

  analytics: {
    isAnalyticsEnabled: true,
    isSeoEnabled: false,
    isAuthoring: false,
    position: 0,
    pageId: 1234,
    prelemId: 2345,
    pageTitle: "Multi Slot Prelem",
    pageDesc:
      "This prelem having 4 cards that allows you to display all kind of content in grid. Use it to display the image gallery, video gallery, articles.",
    pageTags: "Multi Slot Prelem, Article Prelem, Media Cards",
    prelemTags: ["Content", "Blog Tiles", "Blog Tiles Prelem", "Article", "VOD"],
  },
  secondaryArgs: {
    prelemBaseEndpoint: {
      APIEndPoint: "https://platx-api-dev.fanuep.com/platform-x/",
      device: "window",
      buttonBaseUrl: "https://platx-publish-dev.fanuep.com/",
    },
    editState: false,
    multiSlot: {},
    gcpUrl: "https://storage.googleapis.com",
    bucketName: "cropped_image_public",
    noResultImg: "machine_assets/1689600462756/public/png/Prelem_UI_Icons1",
    ext: "png",
  },
};

export default BlogTiles;
