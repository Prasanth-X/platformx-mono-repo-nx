import React, { useEffect, useState, useRef } from "react";
import usePlatformAnalytics from "platform-x-utils/dist/analytics";
import { useInView } from "react-intersection-observer";
import {
  Grid,
  Typography,
  CardContent,
  CardMedia,
  Card,
  IconButton,
  CardActions,
  Box,
  Divider,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { format } from "date-fns";
import AutorenewIcon from "@mui/icons-material/Autorenew";

const ArticleCard = ({ content, analytics, authoringHelper, secondaryArgs }: any) => {
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
  const [handleTrack, handleImpression] = usePlatformAnalytics();
  const [enableImpressionTracking, setEnableImpressionTracking] = useState(true);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const firstRender = useRef(true);

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
    let ArticleCardStructureData;
    try {
      ArticleCardStructureData = {
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
      ArticleCardStructureData = {};
    }

    return ArticleCardStructureData;
  };

  const generateStructureData = () => {
    let ArticleCardStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current == true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        ArticleCardStructureData = JSON.parse(tempSD);
      } else {
        ArticleCardStructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      ArticleCardStructureData = defaultStructureData();
    }
    return ArticleCardStructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content?.Slots]);

  const onClickCard = (id: string) => {
    if (typeof window !== "undefined")
      window.open(
        `${secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint}${secondaryArgs?.prelemBaseEndpoint?.language}/article/${id}`,
      );
  };

  return (
    <div ref={authoringHelper?.innerRef}>
      <Grid container ref={ref}>
        {content?.Articles.map((item: any, index: any) => {
          return (
            <Grid
              item
              xs={12}
              md={3}
              style={{
                paddingTop: "8px",
                paddingBottom: "8px",
                paddingLeft: parseInt(index) === 0 ? "0px" : "8px",
                paddingRight: parseInt(index) === 3 ? "0px" : "8px",
              }}>
              <Card
                style={{
                  border: "solid 1px #ced3d9",
                  boxShadow: "none",
                  cursor: "pointer",
                  borderRadius: "10px",
                }}
                onClick={() => onClickCard(item.ArticleID)}>
                <CardMedia
                  component='img'
                  height='208'
                  image={item?.Images.Image_1.Url}
                  alt='green iguana'
                  style={{
                    //objectFit: 'contain',
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                  }}
                />
                <CardContent style={{ padding: "16px 10px 16px 10px" }}>
                  <Typography
                    gutterBottom
                    variant='h6'
                    component='div'
                    style={{ fontWeight: "600" }}>
                    {item?.Title}
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    color='text.secondary'
                    style={{ fontWeight: "300" }}>
                    {item?.Description}
                  </Typography>
                </CardContent>
                <Divider style={{ marginLeft: "10px", marginRight: "10px" }} />
                <CardActions style={{ justifyContent: "space-between", padding: "10px" }}>
                  <Box style={{ display: "grid" }}>
                    <Typography
                      gutterBottom
                      variant='subtitle2'
                      component='div'
                      style={{ fontWeight: "600" }}>
                      {item?.Author}
                    </Typography>
                    <Typography
                      variant='subtitle2'
                      color='text.secondary'
                      style={{ fontWeight: "normal" }}>
                      {content?.PublishedDate
                        ? format(new Date(content?.PublishedDate), "MMM dd, yyyy | H:MM")
                        : "-"}
                    </Typography>
                  </Box>
                  <IconButton aria-label='share' style={{ color: "#2d2d39" }}>
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
        <Box
          className='add-content-overlay'
          sx={{
            background: "rgba(55,79,213,0.9)",
            position: "absolute",
            width: "100%",
            height: "100%",
            top: "0",
            left: "",
            display: "none",
            alignItems: "center",
            justifyContent: "center",
            zIndex: "1",
          }}>
          <Box
            sx={{ cursor: "pointer" }}
            onClick={() => secondaryArgs?.multiSlot?.onToggleContentGallery()}>
            <AutorenewIcon
              sx={{
                color: "#fff",
                width: { xs: "50px", md: "70px" },
                height: { xs: "50px", md: "70px" },
                marginBottom: "10px",
              }}
            />
            <Typography variant='h3regular' sx={{ color: "#fff" }}>
              Replace
            </Typography>
          </Box>
        </Box>
      </Grid>
    </div>
  );
};
interface ArticleCardProps {
  content: Content;
  analytics: Analytics;
  authoringHelper?: AuthoringHelper;
  secondaryArgs?: SecondaryArgs;
}
interface SecondaryArgs {
  prelemBaseEndpoint?: PrelemBaseEndpoint;
}
interface MultiSlot {
  onToggleContentGallery: () => void;
}
interface PrelemBaseEndpoint {
  PublishEndPoint?: string;
  device?: string;
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
  buttonRef?: React.Ref<HTMLButtonElement>;
  buttonContentEditable?: boolean;
  lastSavedStructuredData?: string;
  authoringHoverShow?: boolean;
}

interface Content {
  ContentType: string;
  Articles: ArticleCardProps[];
}

interface ArticleCardProps {
  Title: string;
  Description: string;
  ArticleID: string;
  PublishedDate: string;
  Author: string;
  Images: [];
}

ArticleCard.defaultProps = {
  content: {
    ContentType: "Article",
    Articles: [
      {
        Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        Title: "Lorem ipsum 1",
        ArticleID: "Link1",
        PublishedDate: "2022-10-04T12:47:02.924Z",
        Author: "Tom",
        Images: {
          Image_1: {
            Name: "Website Introduction",
            Url: "https://cdn.zeplin.io/60c3203b05dcf9bca374c4c0/assets/6CCB6664-1DD8-4FA9-BE57-251EB1752516.png",
            Title: "Website Introduction",
            Description: "This is for Website Introduction",
            AltText: "Website Introduction",
          },
        },
      },
      {
        Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        Title: "Lorem ipsum 2",
        ArticleID: "Link2",
        PublishedDate: "2022-10-04T12:47:02.924Z",
        Author: "Tom",
        Images: {
          Image_1: {
            Name: "Website Introduction",
            Url: "https://cdn.zeplin.io/60c3203b05dcf9bca374c4c0/assets/6CCB6664-1DD8-4FA9-BE57-251EB1752516.png",
            Title: "Website Introduction",
            Description: "This is for Website Introduction",
            AltText: "Website Introduction",
          },
        },
      },
      {
        Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        Title: "Lorem ipsum 3",
        ArticleID: "Link3",
        PublishedDate: "2022-10-04T12:47:02.924Z",
        Author: "Tom",
        Images: {
          Image_1: {
            Name: "Website Introduction",
            Url: "https://cdn.zeplin.io/60c3203b05dcf9bca374c4c0/assets/6CCB6664-1DD8-4FA9-BE57-251EB1752516.png",
            Title: "Website Introduction",
            Description: "This is for Website Introduction",
            AltText: "Website Introduction",
          },
        },
      },
      {
        Description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        Title: "Lorem ipsum 4",
        ArticleID: "Link4",
        PublishedDate: "2022-10-04T12:47:02.924Z",
        Author: "Tom",
        Images: {
          Image_1: {
            Name: "Website Introduction",
            Url: "https://cdn.zeplin.io/60c3203b05dcf9bca374c4c0/assets/6CCB6664-1DD8-4FA9-BE57-251EB1752516.png",
            Title: "Website Introduction",
            Description: "This is for Website Introduction",
            AltText: "Website Introduction",
          },
        },
      },
    ],
  },
};

export default ArticleCard;
