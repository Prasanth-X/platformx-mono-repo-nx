import { Container, Grid, Typography } from "@mui/material";
import DOMPurify from "isomorphic-dompurify";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import CommonDraftDescription from "../../components/CommonDraftDescription/CommonDraftDescription";
import "../../Style.css";
import { useCustomStyle } from "./FullWidthText.style";
import prelemTypes from "../../globalStyle";
import { handleHtmlTags, nullToObject, nullToString } from "@platformx/utilities";
import { usePrelemImpression } from "../../components/ImpressionHooks/PrelemImpressionHook";

const FullWidthText = ({
  content,
  analytics,
  authoringHelper,
  secondaryArgs,
}: FullWidthTextProp) => {
  const { editState = false } = nullToObject(secondaryArgs);
  const { Description = "" } = nullToObject(content);
  const firstRender = useRef(true);
  const { inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const [textHtml, setTextHtml] = useState("");

  /**
   * description html passing from child component
   * @param textHtmlData string
   */
  const passingToHtml = (textHtmlData = "") => {
    setTextHtml(textHtmlData);
  };

  const defaultStructureData = () => {
    let FullWidthTextStructureData;
    try {
      FullWidthTextStructureData = {
        "@context": "http://schema.org/",
        "@type": "service",
        name: content?.Title,
        description: handleHtmlTags(content?.Description),
      };
    } catch (e) {
      FullWidthTextStructureData = {};
    }
    return FullWidthTextStructureData;
  };

  const genrateStructureData = () => {
    let FullWidthTextStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current === true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        FullWidthTextStructureData = JSON.parse(tempSD);
      } else {
        FullWidthTextStructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      FullWidthTextStructureData = defaultStructureData();
    }
    return FullWidthTextStructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = genrateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content?.Title, content?.Description]);

  usePrelemImpression(analytics, inView, secondaryArgs);

  useEffect(() => {
    setTextHtml(nullToString(Description));
  }, [Description]);
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();

  return (
    <div
      ref={authoringHelper?.innerRef}
      className={`${classes.fullWidthWrapperPrelem} ${globalClasses.prelemType1} prelem prelemType1 fullWidthText fullWidthWrapperBg`}>
      <Container
        className={
          authoringHelper?.isEditPage ? "grid_full_width prelem-py" : "grid_container prelem-py"
        }>
        <Typography variant='h2semibold' id='Title'>
          {content.Title}
        </Typography>

        {editState ? (
          <CommonDraftDescription
            description={content.Description || ""}
            editState={editState}
            passingToHtml={passingToHtml}
          />
        ) : null}

        <Grid item xs={12} sm={12}>
          <Typography
            className='descriptionText ql-editor'
            variant='p3regular'
            id='Description'
            sx={{
              display: editState ? "none !important" : "block",
            }}
            data-Description-value={textHtml || nullToString(Description)} //this is mandatory don't remove
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(textHtml || nullToString(Description)),
            }}></Typography>
        </Grid>
      </Container>
    </div>
  );
};

interface FullWidthTextProp {
  content: Content;
  analytics: Analytics;
  authoringHelper?: AuthoringHelper;
  prelemEditState?: boolean;
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
  isEditPage?: boolean;
}

interface Content {
  Title?: string;
  Description?: string;
}

FullWidthText.defaultProps = {
  content: {
    Title: "Lorum ipsum dolor sit amet dolor sit amet ",
    Description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. <br/><br/>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
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
    isEditPage: false,
  },

  analytics: {
    isAnalyticsEnabled: true,
    isSeoEnabled: false,
    isAuthoring: false,
    position: 0,
    pageId: 1234,
    prelemId: 2345,
    pageTitle: "Full Width Text",
    pageDesc: "This prelem can be used to add full width text anywhere in the website. ",
    pageTags: "Text, Full Width, Full Width Text",
    prelemTags: "Text, Full Width, Full Width Text",
  },
};
export default FullWidthText;
