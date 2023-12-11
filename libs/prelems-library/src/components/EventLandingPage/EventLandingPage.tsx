import React, { useEffect } from "react";
import Events from "./Events";
import Blogs from "../Blogs/Blogs";
import { nullToObject } from "../../utils/helperFns";
import { useTranslation } from "react-i18next";
import "../../service/i18n";

const EventLandingPage = (props: any) => {
  const {
    content,
    analytics,
    authoringHelper = {},
    secondaryArgs = {},
    enablePreview = false,
  } = nullToObject(props);
  const { isAuthoring = false } = nullToObject(authoringHelper);
  const { i18n } = useTranslation();
  useEffect(() => {
    if (typeof window !== "undefined") {
      i18n.changeLanguage(secondaryArgs?.prelemBaseEndpoint?.language);
      // i18n.changeLanguage(url.pathname.split("/")[1]);
    }
  }, []);
  return (
    <>
      <Events
        content={content}
        secondaryArgs={secondaryArgs}
        authoringHelper={authoringHelper}
        analytics={analytics}
        enablePreview={enablePreview}
      />
      {/* <Blogs content={content} eventUrl={"covid-updates-in-india"} secondaryArgs={{ prelemBaseEndpoint: { blogEndPoint: "https://platx-blogging-dev.fanuep.com/platform-x/blogging/fetch" } }} /> */}
      {!isAuthoring && (
        <Blogs content={content} eventUrl={content?.page} secondaryArgs={secondaryArgs} />
      )}
    </>
  );
};
export default EventLandingPage;
