import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { useInView } from "react-intersection-observer";
import DesktopTabCard from "../EmbedDesktopTabCard/EmbedDesktopTabCard";
import { usePrelemImpression } from "Common/ImpressionHooks/PrelemImpressionHook";

const EmbedCard = ({ content, analytics, authoringHelper }: EmbedCardProp) => {
  const firstRender = useRef(true);
  const { inView } = useInView({
    threshold: 0.3,
  });

  const defaultStructureData = () => {
    let socialShareStructureData;
    try {
      socialShareStructureData = {};
    } catch (e) {
      socialShareStructureData = {};
    }

    return socialShareStructureData;
  };
  const generateStructureData = () => {
    let socialShareStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        socialShareStructureData = JSON.parse(tempSD);
      } else {
        socialShareStructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      socialShareStructureData = defaultStructureData();
    }
    return socialShareStructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
  }, [content?.Description, content?.Title]);

  usePrelemImpression(analytics, inView);
  /* AnalyticsEnabled dependency added as many times we are not getting analytics provider*async call)
  1. we are first checking in publish app if analytics provider is avaiable or not
  2. if its available we are setting AnalyticsEnabled to true
  3. if its not available we are setting false
  */
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
      }}>
      <DesktopTabCard content={content} />
    </Box>
  );
};

interface EmbedCardProp {
  content: Content;
  analytics: Analytics;
  authoringHelper?: AuthoringHelper;
  secondaryArgs?: any;
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
}

interface Content {
  Title?: string;
  Description?: string;
  Thumbnail?: string;
  creationDate?: string;
  Author?: string;
}

EmbedCard.defaultProps = {
  content: {
    Title:
      "Snow, Chai and a Crackling Bonfire: Places You Must Visit to Experience White Winter in India",
    Description:
      "Its sometimes her behaviour are contented. Do listening am eagerness oh objection collected.Its sometimes her behaviour are contented. Do listening am eagerness oh objection collected.Its sometimes her behaviour are contented. Do listening am eagerness oh objection collected.",
    Thumbnail:
      "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/50b3388d-6a19-44b6-af63-1c57c8365a2d/content",

    Author: "Peter Parker",
    creationDate: "2023-01-20T12:56:21Z",
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
  },

  analytics: {
    isAnalyticsEnabled: true,
    isSeoEnabled: false,
    isAuthoring: false,
    position: 0,
    pageId: 1234,
    prelemId: 2345,
    pageTitle: "Services 1",
    pageDesc:
      "This prelem can be used to show features or services. It has title, description & 6 rows that we want to show here which can used to write about the features or services.This prelem can be used to show features or services.",
    pageTags: "Services, Features, Product, Products, Service, Feature",
    prelemTags: "Services, Features, Product, Products, Service, Feature",
  },
  secondaryArgs: {
    prelemBaseEndpoint: {
      device: "",
    },
  },
};

export default EmbedCard;
