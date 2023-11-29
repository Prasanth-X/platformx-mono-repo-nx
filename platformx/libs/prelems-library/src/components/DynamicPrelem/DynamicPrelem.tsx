import AutorenewIcon from "@mui/icons-material/Autorenew";
import { Box, Container, Grid, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import "../../Style.css";
import DynamicPrelemCard from "./DynamicPrelemCard";
import DynamicPrelemCard2 from "./DynamicPrelemCard2";
import { prelemTypes } from "../../theme/globalStyle";
import { useCustomStyle } from "./DynamicPrelem.style";
import { usePrelemImpression } from "Common/ImpressionHooks/PrelemImpressionHook";

const DynamicPrelem = ({ content, analytics, authoringHelper, secondaryArgs }: any) => {
  const getCardArr = (data: any) => {
    if (data?.length > 4) {
      return data.slice(0, 4);
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
    let sm = 4,
      em = 3;
    if (cardArr.length === 1) {
      sm = 12;
      em = 12;
    } else if (cardArr.length === 2) {
      sm = 6;
      em = 6;
    } else if (cardArr.length === 3) {
      if (index === 0) {
        em = 6;
        sm = 12;
      } else {
        em = 3;
        sm = 6;
      }
    } else if (cardArr.length === 4) {
      sm = 6;
      em = 3;
    }
    return { sm, em };
  };
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.dynamicPrelemWrapper} ${globalClasses.prelemType1} prelem prelemType1 dynamicPrelemBg`}>
      <Container
        className={
          authoringHelper?.isEditPage
            ? "grid_full_width prelem-py"
            : "grid_container grid_container_nopadding prelem-py"
        }>
        <Box ref={ref} className='gridCard'>
          <Box className='topContent'>
            <Typography variant='h2semibold' id='Title'>
              {content?.Title}
            </Typography>
            <Typography variant='p3regular' id='Description'>
              {content?.Description}
            </Typography>
          </Box>
          <Grid
            container
            sx={{
              position: "relative",
              "&:hover": {
                ".add-content-overlay": {
                  display: authoringHelper?.authoringHoverShow ? "flex !important" : "none",
                },
              },
            }}>
            {cardArr?.length > 0 ? (
              cardArr.map((item: any, index: any) => {
                const { sm, em } = getGridValues(index);
                return (
                  <Grid
                    key={`${item?.Title}_${index.toString()}`}
                    item
                    xs={12}
                    sm={sm}
                    em={em}
                    rowSpacing={1}
                    p={1}>
                    {cardArr && Object.keys(item).length !== 0 && (
                      <Fragment>
                        <Box className='CardBoxWp' sx={{ display: { xs: "block", md: "none" } }}>
                          <DynamicPrelemCard
                            content={cardArr[index]}
                            secondaryArgs={secondaryArgs}
                            analytics={analytics}
                            cardIndex={index}
                          />
                        </Box>
                        <Box
                          className='CardBoxWp'
                          sx={{ display: { xs: "none", md: "block", em: "none" } }}>
                          {sm === 12 ? (
                            <DynamicPrelemCard
                              content={cardArr[index]}
                              secondaryArgs={secondaryArgs}
                              analytics={analytics}
                              cardIndex={index}
                            />
                          ) : (
                            <DynamicPrelemCard
                              content={cardArr[index]}
                              secondaryArgs={secondaryArgs}
                              analytics={analytics}
                              cardIndex={index}
                            />
                          )}
                        </Box>
                        <Box
                          className='CardBoxWp'
                          sx={{
                            display: { xs: "none", md: "none", em: "block" },
                          }}>
                          {em === 12 || em === 6 ? (
                            <DynamicPrelemCard2
                              content={cardArr[index]}
                              secondaryArgs={secondaryArgs}
                              analytics={analytics}
                              cardIndex={index}
                            />
                          ) : (
                            <DynamicPrelemCard
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
              <React.Fragment>
                <Box className='noDataFoundWrapper'>
                  <img
                    src='https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/3b8398a0-299a-4b4e-ad6f-2a5bbb306e9a/content'
                    alt='NoDataFound'
                  />
                </Box>
                <Typography variant='h2' className='noDataFound'>
                  No data found
                </Typography>
              </React.Fragment>
            )}
            <Box className='add-content-overlay'>
              <Box
                sx={{ cursor: "pointer" }}
                onClick={() => secondaryArgs?.multiSlot?.onToggleContentGallery()}>
                <AutorenewIcon className='autorenewIcon' />
                <Typography className='overLaytextgap' variant='h3regular' color='textColor'>
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

DynamicPrelem.defaultProps = {
  content: {
    Title: "Lorem ipsum dolor sit amet",
    Description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    QueryParam: {
      filter: "All",
      tags: [],
      searchTerm: "",
      pagination: { start: 0, rows: 4 },
    },
    Slots: [
      {
        Title: "New Gameplay Features Unveiled in FIFA Red's Latest Update",
        Banner:
          "https://stg.dam.hcl-x.com/server/api/core/bitstreams/34981c50-a864-49d0-8cb3-72905d768f63/content",
        Thumbnail: {
          Name: "new-gameplay-features-unveiled-in-fifa-red-s-latest-update",
          Url: "1694490277593/public/jpeg/1",
          Title: "New Gameplay Features Unveiled in FIFA Red's Latest Update",
          Description:
            "The excitement continues to build in the world of FIFA Red as the latest update unveils a series of groundbreaking gameplay features that are set to redefine the soccer gaming experience. Whether you're a casual player or a die-hard fan, these innovations are bound to leave you in awe.1. Hyper-Realistic Player MovementOne of the most anticipated enhancements in this update is the hyper-realistic player movement. FIFA Red now brings players to life like never before, with fluid animations and lifelike reactions.&nbsp;\u003Cdiv\u003E\u003Cbr\u003E\u003C/div\u003E\u003Cdiv\u003EEvery step, dribble, and pass is executed with astonishing authenticity, blurring the lines between virtual and real-world soccer.2. Dynamic Weather EffectsPrepare to face the elements with FIFA Red's dynamic weather effects. Rain-soaked pitches, swirling snow, and intense sunlight will challenge your skills and add a new layer of strategy to every match. Adapt to changing conditions and master the elements to secure victory.3. Enhanced Tactical DepthFIFA Red's latest update also introduces enhanced tactical depth.&nbsp;\u003C/div\u003E\u003Cdiv\u003E\u003Cbr\u003E\u003C/div\u003E\u003Cdiv\u003EExperience more control over your team's playstyle, with advanced tactics that allow you to dictate the tempo, press high, or defend resolutely. It's a game-changer for those who crave strategic depth in their soccer gaming experience.4. Smoother Skill MovesSkill moves have received an overhaul, making them smoother and more intuitive than ever. Dazzle your opponents with jaw-dropping tricks and flicks, and master the art of dribbling with precision. The revamped skill moves system promises to elevate your gameplay to new heights.\u003C/div\u003E",
          Attribution: false,
          AltText: "New Gameplay Features Unveiled in FIFA Red's Latest Update",
          ext: "jpg",
          visibility: "public",
        },
        Description:
          "The excitement continues to build in the world of FIFA Red as the latest update unveils a series of groundbreaking gameplay features that are set to redefine the soccer gaming experience. Whether you're a casual player or a die-hard fan, these innovations are bound to leave you in awe.1. Hyper-Realistic Player MovementOne of the most anticipated enhancements in this update is the hyper-realistic player movement. FIFA Red now brings players to life like never before, with fluid animations and lifelike reactions.&nbsp;\u003Cdiv\u003E\u003Cbr\u003E\u003C/div\u003E\u003Cdiv\u003EEvery step, dribble, and pass is executed with astonishing authenticity, blurring the lines between virtual and real-world soccer.2. Dynamic Weather EffectsPrepare to face the elements with FIFA Red's dynamic weather effects. Rain-soaked pitches, swirling snow, and intense sunlight will challenge your skills and add a new layer of strategy to every match. Adapt to changing conditions and master the elements to secure victory.3. Enhanced Tactical DepthFIFA Red's latest update also introduces enhanced tactical depth.&nbsp;\u003C/div\u003E\u003Cdiv\u003E\u003Cbr\u003E\u003C/div\u003E\u003Cdiv\u003EExperience more control over your team's playstyle, with advanced tactics that allow you to dictate the tempo, press high, or defend resolutely. It's a game-changer for those who crave strategic depth in their soccer gaming experience.4. Smoother Skill MovesSkill moves have received an overhaul, making them smoother and more intuitive than ever. Dazzle your opponents with jaw-dropping tricks and flicks, and master the art of dribbling with precision. The revamped skill moves system promises to elevate your gameplay to new heights.\u003C/div\u003E",
        PublishedDate: "2023-09-23T14:29:53Z",
        lastModifiedDate: "2023-09-23T14:29:44Z",
        ContentType: "Article",
        tags: '["Articles","Blogs"]',
        Author: "James Mallan",
        CurrentPageURL: "/new-gameplay-features-unveiled-in-fifa-red-s-latest-update",
        hclplatformx_EditorialTags: "new-gameplay-features-unveiled-in-fifa-red-s-latest-update",
        EditorialItemPath: "new-gameplay-features-unveiled-in-fifa-red-s-latest-update",
        PublishedBy: "James",
        Id: "new-gameplay-features-unveiled-in-fifa-red-s-latest-update",
      },
      {
        Title: "New Gameplay Features Unveiled in FIFA Red's Latest Update",
        Banner:
          "https://stg.dam.hcl-x.com/server/api/core/bitstreams/34981c50-a864-49d0-8cb3-72905d768f63/content",
        Thumbnail: {
          Name: "new-gameplay-features-unveiled-in-fifa-red-s-latest-update",
          Url: "1694490277593/public/jpeg/1",
          Title: "New Gameplay Features Unveiled in FIFA Red's Latest Update",
          Description:
            "The excitement continues to build in the world of FIFA Red as the latest update unveils a series of groundbreaking gameplay features that are set to redefine the soccer gaming experience. Whether you're a casual player or a die-hard fan, these innovations are bound to leave you in awe.1. Hyper-Realistic Player MovementOne of the most anticipated enhancements in this update is the hyper-realistic player movement. FIFA Red now brings players to life like never before, with fluid animations and lifelike reactions.&nbsp;\u003Cdiv\u003E\u003Cbr\u003E\u003C/div\u003E\u003Cdiv\u003EEvery step, dribble, and pass is executed with astonishing authenticity, blurring the lines between virtual and real-world soccer.2. Dynamic Weather EffectsPrepare to face the elements with FIFA Red's dynamic weather effects. Rain-soaked pitches, swirling snow, and intense sunlight will challenge your skills and add a new layer of strategy to every match. Adapt to changing conditions and master the elements to secure victory.3. Enhanced Tactical DepthFIFA Red's latest update also introduces enhanced tactical depth.&nbsp;\u003C/div\u003E\u003Cdiv\u003E\u003Cbr\u003E\u003C/div\u003E\u003Cdiv\u003EExperience more control over your team's playstyle, with advanced tactics that allow you to dictate the tempo, press high, or defend resolutely. It's a game-changer for those who crave strategic depth in their soccer gaming experience.4. Smoother Skill MovesSkill moves have received an overhaul, making them smoother and more intuitive than ever. Dazzle your opponents with jaw-dropping tricks and flicks, and master the art of dribbling with precision. The revamped skill moves system promises to elevate your gameplay to new heights.\u003C/div\u003E",
          Attribution: false,
          AltText: "New Gameplay Features Unveiled in FIFA Red's Latest Update",
          ext: "jpg",
          visibility: "public",
        },
        Description:
          "The excitement continues to build in the world of FIFA Red as the latest update unveils a series of groundbreaking gameplay features that are set to redefine the soccer gaming experience. Whether you're a casual player or a die-hard fan, these innovations are bound to leave you in awe.1. Hyper-Realistic Player MovementOne of the most anticipated enhancements in this update is the hyper-realistic player movement. FIFA Red now brings players to life like never before, with fluid animations and lifelike reactions.&nbsp;\u003Cdiv\u003E\u003Cbr\u003E\u003C/div\u003E\u003Cdiv\u003EEvery step, dribble, and pass is executed with astonishing authenticity, blurring the lines between virtual and real-world soccer.2. Dynamic Weather EffectsPrepare to face the elements with FIFA Red's dynamic weather effects. Rain-soaked pitches, swirling snow, and intense sunlight will challenge your skills and add a new layer of strategy to every match. Adapt to changing conditions and master the elements to secure victory.3. Enhanced Tactical DepthFIFA Red's latest update also introduces enhanced tactical depth.&nbsp;\u003C/div\u003E\u003Cdiv\u003E\u003Cbr\u003E\u003C/div\u003E\u003Cdiv\u003EExperience more control over your team's playstyle, with advanced tactics that allow you to dictate the tempo, press high, or defend resolutely. It's a game-changer for those who crave strategic depth in their soccer gaming experience.4. Smoother Skill MovesSkill moves have received an overhaul, making them smoother and more intuitive than ever. Dazzle your opponents with jaw-dropping tricks and flicks, and master the art of dribbling with precision. The revamped skill moves system promises to elevate your gameplay to new heights.\u003C/div\u003E",
        PublishedDate: "2023-09-23T14:29:53Z",
        lastModifiedDate: "2023-09-23T14:29:44Z",
        ContentType: "Article",
        tags: '["Articles","Blogs"]',
        Author: "James Mallan",
        CurrentPageURL: "/new-gameplay-features-unveiled-in-fifa-red-s-latest-update",
        hclplatformx_EditorialTags: "new-gameplay-features-unveiled-in-fifa-red-s-latest-update",
        EditorialItemPath: "new-gameplay-features-unveiled-in-fifa-red-s-latest-update",
        PublishedBy: "James",
        Id: "new-gameplay-features-unveiled-in-fifa-red-s-latest-update",
      },
      {
        Title: "New Gameplay Features Unveiled in FIFA Red's Latest Update",
        Banner:
          "https://stg.dam.hcl-x.com/server/api/core/bitstreams/34981c50-a864-49d0-8cb3-72905d768f63/content",
        Thumbnail: {
          Name: "new-gameplay-features-unveiled-in-fifa-red-s-latest-update",
          Url: "1694490277593/public/jpeg/1",
          Title: "New Gameplay Features Unveiled in FIFA Red's Latest Update",
          Description:
            "The excitement continues to build in the world of FIFA Red as the latest update unveils a series of groundbreaking gameplay features that are set to redefine the soccer gaming experience. Whether you're a casual player or a die-hard fan, these innovations are bound to leave you in awe.1. Hyper-Realistic Player MovementOne of the most anticipated enhancements in this update is the hyper-realistic player movement. FIFA Red now brings players to life like never before, with fluid animations and lifelike reactions.&nbsp;\u003Cdiv\u003E\u003Cbr\u003E\u003C/div\u003E\u003Cdiv\u003EEvery step, dribble, and pass is executed with astonishing authenticity, blurring the lines between virtual and real-world soccer.2. Dynamic Weather EffectsPrepare to face the elements with FIFA Red's dynamic weather effects. Rain-soaked pitches, swirling snow, and intense sunlight will challenge your skills and add a new layer of strategy to every match. Adapt to changing conditions and master the elements to secure victory.3. Enhanced Tactical DepthFIFA Red's latest update also introduces enhanced tactical depth.&nbsp;\u003C/div\u003E\u003Cdiv\u003E\u003Cbr\u003E\u003C/div\u003E\u003Cdiv\u003EExperience more control over your team's playstyle, with advanced tactics that allow you to dictate the tempo, press high, or defend resolutely. It's a game-changer for those who crave strategic depth in their soccer gaming experience.4. Smoother Skill MovesSkill moves have received an overhaul, making them smoother and more intuitive than ever. Dazzle your opponents with jaw-dropping tricks and flicks, and master the art of dribbling with precision. The revamped skill moves system promises to elevate your gameplay to new heights.\u003C/div\u003E",
          Attribution: false,
          AltText: "New Gameplay Features Unveiled in FIFA Red's Latest Update",
          ext: "jpg",
          visibility: "public",
        },
        Description:
          "The excitement continues to build in the world of FIFA Red as the latest update unveils a series of groundbreaking gameplay features that are set to redefine the soccer gaming experience. Whether you're a casual player or a die-hard fan, these innovations are bound to leave you in awe.1. Hyper-Realistic Player MovementOne of the most anticipated enhancements in this update is the hyper-realistic player movement. FIFA Red now brings players to life like never before, with fluid animations and lifelike reactions.&nbsp;\u003Cdiv\u003E\u003Cbr\u003E\u003C/div\u003E\u003Cdiv\u003EEvery step, dribble, and pass is executed with astonishing authenticity, blurring the lines between virtual and real-world soccer.2. Dynamic Weather EffectsPrepare to face the elements with FIFA Red's dynamic weather effects. Rain-soaked pitches, swirling snow, and intense sunlight will challenge your skills and add a new layer of strategy to every match. Adapt to changing conditions and master the elements to secure victory.3. Enhanced Tactical DepthFIFA Red's latest update also introduces enhanced tactical depth.&nbsp;\u003C/div\u003E\u003Cdiv\u003E\u003Cbr\u003E\u003C/div\u003E\u003Cdiv\u003EExperience more control over your team's playstyle, with advanced tactics that allow you to dictate the tempo, press high, or defend resolutely. It's a game-changer for those who crave strategic depth in their soccer gaming experience.4. Smoother Skill MovesSkill moves have received an overhaul, making them smoother and more intuitive than ever. Dazzle your opponents with jaw-dropping tricks and flicks, and master the art of dribbling with precision. The revamped skill moves system promises to elevate your gameplay to new heights.\u003C/div\u003E",
        PublishedDate: "2023-09-23T14:29:53Z",
        lastModifiedDate: "2023-09-23T14:29:44Z",
        ContentType: "Article",
        tags: '["Articles","Blogs"]',
        Author: "James Mallan",
        CurrentPageURL: "/new-gameplay-features-unveiled-in-fifa-red-s-latest-update",
        hclplatformx_EditorialTags: "new-gameplay-features-unveiled-in-fifa-red-s-latest-update",
        EditorialItemPath: "new-gameplay-features-unveiled-in-fifa-red-s-latest-update",
        PublishedBy: "James",
        Id: "new-gameplay-features-unveiled-in-fifa-red-s-latest-update",
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
    prelemTags: ["Content", "Dynamic", "Dynamic Prelem", "Article", "VOD"],
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
    bucketName: "cropped_image_public_x_site_stage",
  },
};

export default DynamicPrelem;
