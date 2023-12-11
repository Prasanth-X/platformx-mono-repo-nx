import React from "react";
// import usePlatformAnalytics from "platform-x-utils/dist/analytics";
import { useInView } from "react-intersection-observer";
import { Grid, Typography, Box } from "@mui/material";
import VideoCard from "./VideoCard";

const RelatedVideos = ({ content, authoringHelper }: any) => {
  // const defaultObj = {
  //   pageId: analytics?.pageId,
  //   pageTitle: analytics?.pageTitle,
  //   pageDesc: analytics?.pageDesc,
  //   pageTags: analytics?.pageTags,
  //   prelemID: analytics?.prelemId,
  //   prelemTitle: analytics?.prelemTitle,
  //   prelemTags: analytics?.prelemTags,
  //   prelemPosition: analytics?.prelemPosition,
  // };
  // const [handleTrack, handleImpression] = usePlatformAnalytics();
  // const [enableImpressionTracking, setEnableImpressionTracking] = useState(true);
  const { ref } = useInView({
    /* Optional options */
    threshold: 0,
  });
  // const firstRender = useRef(true);

  // useEffect(() => {
  //   if (
  //     !analytics?.isAuthoring &&
  //     analytics?.isAnalyticsEnabled &&
  //     enableImpressionTracking &&
  //     inView
  //   ) {
  //     const prelemImpressionObj = {
  //       eventType: 'Prelem Impression',
  //       ...defaultObj,
  //     };
  //     handleImpression('Prelem Impression', prelemImpressionObj);
  //     setEnableImpressionTracking(false);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [inView, analytics?.isAnalyticsEnabled]);

  // const defaultStructureData = () => {
  //   let VideoCardStructureData;
  //   try {
  //     VideoCardStructureData = {
  //       "@context": "https://schema.org",
  //       "@type": "ItemList",
  //       "itemListElement": [
  //         {
  //           "@type": "ListItem",
  //           "position": 1,
  //           "url": content?.Button1_RedirectURL,
  //           "name": content?.Button1_Value,
  //         },
  //         {
  //           "@type": "ListItem",
  //           "position": 2,
  //           "url": content?.Slots[0].EditorialItemPath,
  //           "name": content?.Slots[0].Title,
  //         },
  //         {
  //           "@type": "ListItem",
  //           "position": 3,
  //           "url": content?.Slots[1].EditorialItemPath,
  //           "name": content?.Slots[1].Title,
  //         },
  //         {
  //           "@type": "ListItem",
  //           "position": 4,
  //           "url": content?.Slots[2].EditorialItemPath,
  //           "name": content?.Slots[2].Title,
  //         },
  //       ]
  //     }
  //   } catch (e) {
  //     VideoCardStructureData = {};
  //   }

  //   return VideoCardStructureData;
  // };

  // const generateStructureData = () => {
  //   let VideoCardStructureData;
  //   const tempSD = String(authoringHelper?.lastSavedStructuredData);

  //   if (firstRender.current == true) {
  //     const defaultSD = defaultStructureData();
  //     const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
  //     authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(
  //       stringifyStructureData || ''
  //     );

  //     if (String(tempSD).length > 0) {
  //       VideoCardStructureData = JSON.parse(tempSD);
  //     } else {
  //       VideoCardStructureData = defaultStructureData();
  //     }
  //     firstRender.current = false;
  //   } else {
  //     VideoCardStructureData = defaultStructureData();
  //   }
  //   return VideoCardStructureData;
  // };

  // useEffect(() => {
  //   if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
  //     const structureData = generateStructureData();
  //     const stringifyStructureData =
  //       structureData && JSON.stringify(structureData);
  //     authoringHelper?.sendStructureDataToAuthoringCB(
  //       stringifyStructureData || ''
  //     );
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [content?.Slots]);

  return (
    <Box
      sx={{
        margin: { xs: "5% 4% 0", sm: "3% auto 1%" },
        width: { sm: "700px" },
      }}>
      <Typography variant='body1' component='h4' sx={{ fontWeight: "500" }}>
        Related Videos
      </Typography>
      <div ref={authoringHelper?.innerRef} style={{ paddingTop: "5px" }}>
        <Grid container ref={ref}>
          {content?.map((item: any, index: any) => (
            <VideoCard key={index} item={item} index={index} />
          ))}
        </Grid>
      </div>
    </Box>
  );
};

export default RelatedVideos;
