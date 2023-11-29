import { Box } from "@mui/material";
import usePlatformAnalytics from "platform-x-utils/dist/analytics";
import React, { useEffect, useMemo, useState } from "react";
import BrightcoveClass from "./Brightcove";

const BrightcovePlayer = ({
  VideoData,
  setVideoContent,
  options,
  analytics,
  prelemTitle,
  analyticsEnable,
}: BrightcovePlayerProp) => {
  const Brightcove = useMemo(() => new BrightcoveClass(), []);
  const getRandomId = () => "elm-" + Math.random().toString(36).substring(7);
  const [vidId] = useState(getRandomId());
  const [, handleImpression] = usePlatformAnalytics();
  const videoObj = {
    "VOD Title": "VOD Title",
    "Video Length": 0,
  };
  const minCss = `
       .bc-player-default_default .vjs-play-progress, .bc-player-default_default .vjs-volume-level{
        background-color:#1e0d16;
       }

       .vjs-mouse.bc-player-default_default .vjs-progress-control:hover{
        height: 0.5em; 
        top: -0.5em;
       }
       `;

  const sendAnalytics = (eventName: string) => {
    const obj = {
      "Page Title": analytics?.pageTitle,
      "Prelem Title": analytics?.prelemTitle ? analytics?.prelemTitle : prelemTitle,
      "Slot number": analytics?.prelemPosition,
      "Event Name": eventName,
      "Content Type": "VOD",
      "VOD Title": videoObj["VOD Title"],
      "VOD URL": "VOD URL",
      "Video Length": videoObj["Video Length"],
    };
    handleImpression("VOD Impression", obj);
  };

  const analyticsTrigger = (playerObj: any) => {
    let lastTriggerPos: any;
    playerObj.on("playing", function () {
      if (videoObj["Video Length"] === 0) {
        videoObj["VOD Title"] = playerObj?.mediainfo?.name;
        videoObj["Video Length"] = parseInt(playerObj.duration());
      }
      sendAnalytics("video_start");
    });
    playerObj.on("pause", function () {
      sendAnalytics("video_pause");
    });
    playerObj.on("ended", function () {
      sendAnalytics("video_complete");
    });
    playerObj.on("timeupdate", function () {
      const dur: any = parseInt(playerObj.duration());
      const phPos: any = parseInt(playerObj.currentTime());
      if (phPos === Math.floor(dur * 0.25) && phPos !== lastTriggerPos) {
        lastTriggerPos = phPos;
        sendAnalytics("video_25%");
      }
      if (phPos === Math.floor(dur * 0.5) && phPos !== lastTriggerPos) {
        lastTriggerPos = phPos;
        sendAnalytics("video_50%");
      }
      if (phPos === Math.floor(dur * 0.75) && phPos !== lastTriggerPos) {
        lastTriggerPos = phPos;
        sendAnalytics("video_75%");
      }
    });
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      Brightcove.brightCoveWebPlayer(vidId, VideoData, options, (playerObj: any) => {
        playerObj.on("loadstart", () => {
          if (setVideoContent) setVideoContent(playerObj?.mediainfo);
        });
        if (!analytics?.isAuthoring && analyticsEnable) {
          analyticsTrigger(playerObj);
        }
      });
    }, 100);
    return () => {
      clearTimeout(timer);
      Brightcove.closeVideo();
      if (!analytics?.isAuthoring && analyticsEnable) {
        sendAnalytics("video_stop");
      }
    };
  }, [
    Brightcove,
    VideoData?.VideoID,
    VideoData?.PlayerID,
    VideoData?.AccountID,
    VideoData?.PlaylistID,
  ]);

  return (
    <Box style={{ height: "100%", width: "100%" }}>
      <style>{minCss}</style>
      <div id={vidId} style={{ height: "100%", width: "100%" }} />
    </Box>
  );
};

interface BrightcovePlayerProp {
  VideoData: {
    AccountID: string;
    PlayerID: string;
    VideoID: string;
    PlaylistID?: string;
  };
  setVideoContent?: ({ name }: any) => void;
  options?: any;
  analytics?: Analytics;
  prelemTitle?: string;
  analyticsEnable?: boolean;
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
  isAuthoring?: boolean;
  isSeoEnabled?: boolean;
}
BrightcovePlayer.defaultProps = {
  analyticsEnable: true,
  VideoData: {
    AccountID: "6312397989001",
    PlayerID: "default",
    VideoID: "6340658248112",
    PlaylistID: "PlaylistID",
  },

  analytics: {
    isAnalyticsEnabled: true,
    isSeoEnabled: false,
    isAuthoring: false,
    position: 0,
    pageId: 1234,
    prelemId: 2345,
    pageTitle: "Prelem Title",
    pageDesc: "Prelem Description",
    pageTags: "Page Tags1, page tagg2",
    prelemTags: "Prelem Tags1, Prelem tagg2",
  },
  prelemTitle: "",
};

export default BrightcovePlayer;
