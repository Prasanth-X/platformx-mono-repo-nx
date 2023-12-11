import AutorenewIcon from "@mui/icons-material/Autorenew";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import "../../Style.css";
import { formCroppedUrl } from "../../utils/helperFns";
import { prelemTypes } from "../../theme/globalStyle";
import { useCustomStyle } from "./TeamMembers.style";
import { usePrelemImpression } from "Common/ImpressionHooks/PrelemImpressionHook";

const TeamMembers = ({ content, analytics, authoringHelper, secondaryArgs }: TeamMembersProps) => {
  //const [contentType, setContentType] = useState("image");
  // const handleChange = (event: React.SyntheticEvent, newValue: string) => {
  // setContentType(newValue);
  // };
  const [cardArr, setCardArr] = useState(content?.Slots);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const firstRender = useRef(true);
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();

  usePrelemImpression(analytics, inView);

  useEffect(() => {
    if (content?.Slots) {
      setCardArr(content?.Slots);
    }
  }, [content?.Slots]);

  const defaultStructureData = () => {
    let ImageVideoCarouselStructureData;
    try {
      ImageVideoCarouselStructureData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: content?.Slots?.map((item: any, index: number) => {
          return {
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": item.Thumbnail ? "VideoObject" : "ImageObject",
              description: item?.Description,
              ...(!item.Thumbnail && {
                image: formCroppedUrl(
                  secondaryArgs?.gcpUrl,
                  secondaryArgs?.bucketName,
                  item.Url,
                  item?.ext,
                ),
              }),
              ...(item.Thumbnail && {
                thumbnailURL: item?.Thumbnail,
              }),
              contenturl: formCroppedUrl(
                secondaryArgs?.gcpUrl,
                secondaryArgs?.bucketName,
                item.Url,
                item?.ext,
              ),
            },
          };
        }),
      };
    } catch (e) {
      ImageVideoCarouselStructureData = {};
    }

    return ImageVideoCarouselStructureData;
  };

  const generateStructureData = () => {
    let ImageVideoCarouselStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current === true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        ImageVideoCarouselStructureData = JSON.parse(tempSD);
      } else {
        ImageVideoCarouselStructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      ImageVideoCarouselStructureData = defaultStructureData();
    }
    return ImageVideoCarouselStructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content?.Slots, content?.Title]);

  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.teamMembersWrapper} ${globalClasses.prelemType3} prelem prelemType3 teamMembersBG`}>
      <Box ref={ref}>
        <Container
          className={
            authoringHelper?.isEditPage
              ? "grid_full_width prelem-py"
              : "grid_container grid_container_nopadding prelem-py"
          }>
          <Grid container>
            <Grid item xs={12} md={10} em={9} lg={6}>
              <Grid item xs={12} className='itemGap'>
                <Typography variant='h2medium' id='Title' color='tertiaryTitle'>
                  {content.Title}
                </Typography>
                <Divider className='borderLine'></Divider>
              </Grid>
            </Grid>

            <Box
              className='overlayWrapper'
              sx={{
                "&:hover": {
                  ".add-content-overlay": {
                    display: authoringHelper?.authoringHoverShow ? "flex !important" : "none",
                  },
                },
              }}>
              <Grid container className='teamMemberContainer'>
                {cardArr.map((item, key) => {
                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={key}>
                      <Box className='imagecard'>
                        <Box className='imgbox'>
                          <img
                            alt='team1'
                            className='teamMemberImg'
                            src={formCroppedUrl(
                              secondaryArgs?.gcpUrl,
                              secondaryArgs?.bucketName,
                              item.Url,
                              item?.ext,
                            )}
                          />
                        </Box>
                        <Typography
                          variant='h4medium'
                          color='tertiaryTitle'
                          className='marginTopZero'>
                          {item.Name}
                        </Typography>
                        <Typography
                          variant='p3regular'
                          color='tertiaryParagraph'
                          className='marginZero'>
                          {item.Description}
                        </Typography>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>

              <Box className='add-content-overlay'>
                <Box
                  className='pointer'
                  onClick={() => secondaryArgs?.multiSlot?.onToggleContentGallery("gallery", true)}>
                  <AutorenewIcon className='autorenewIcon' />
                  <Typography className='overLaytextgap' variant='h3regular' color='textColor'>
                    Replace
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

interface TeamMembersProps {
  content: Content;
  secondaryArgs?: any;
  authoringHelper?: AuthoringHelper;
  analytics: Analytics;
}

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

interface AuthoringHelper {
  innerRef: React.Ref<HTMLDivElement>;
  sendStructureDataToAuthoringCB: (structureData: string) => void;
  sendDefaultStructureDataForResetToAuthoringCB: (structureData: string) => void;
  openButtonEditWindowInAuthoringCB: (buttonObj?: object, e?: object) => void;
  selectedButtonNameForEditing: string;
  isEditing: boolean;
  authoringHoverShow?: boolean;
  buttonRef?: React.Ref<HTMLButtonElement>;
  buttonContentEditable?: boolean;
  lastSavedStructuredData?: string;
  isEditPage?: boolean;
}

interface Content {
  Title?: string;
  TagName: string;
  Slots: Contentprops[];
}

interface Contentprops {
  AltText?: string;
  Attribution?: boolean;
  Description?: string;
  Name?: string;
  Title?: string;
  Url?: string;
  ext?: string;
}

TeamMembers.defaultProps = {
  content: {
    Title: "Team Members",
    Slots: [
      {
        Name: "barcelona",
        Url: "machine_assets/1691590748554/public/png/TeamMembers_Barcelona_Thumb",
        Title: "barcelona",
        Description: "This is for barcelona",
        Attribution: false,
        AltText: "Imagecard2",
        ext: "png",
        visibility: "public",
        bitStreamId: "",
      },
      {
        Name: "paris",
        Url: "machine_assets/1691591693438/public/png/TeamMembers_Paris_Thumb",
        Title: "paris",
        Description: "This is for paris",
        Attribution: false,
        AltText: "Imagecard2",
        ext: "png",
        visibility: "public",
        bitStreamId: "",
      },
      {
        Name: "Madeira Holidays",
        Url: "machine_assets/1691591497820/public/png/TeamMembers_MadeiraMosaic",
        Title: "Madeira Holidays",
        Description: "This is for Madeira Holidays",
        Attribution: false,
        AltText: "Imagecard2",
        ext: "png",
        visibility: "public",
        bitStreamId: "",
      },
      {
        Name: "spain",
        Url: "machine_assets/1691591240864/public/png/Spain_Tenerife_GettyImages",
        Title: "spain",
        Description: "This is for spain",
        Attribution: false,
        AltText: "Imagecard2",
        ext: "png",
        visibility: "public",
        bitStreamId: "",
      },
    ],
    TagName: "SiteComponents",
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
    pageTitle: "Team Members",
    pageDesc:
      "This prelem can be used to create a Team Members. It can have a min of 3 items & max of 6 items. It can be used to give a snippet of the service(s)/product(s) via image(s)/video(s).",
    pageTags: "Images, Team, Members",
    prelemTags: ["Images", "Team", "Members"],
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
  },
};

export default TeamMembers;
