import React, { useState, useEffect } from "react";
import usePlatformAnalytics from "platform-x-utils/dist/analytics";
import { useInView } from "react-intersection-observer";
import { Grid, Box, Paper, useTheme, useMediaQuery } from "@mui/material";
import { dateTimeFormat, nullToObject, relativeImageURL } from "../../utils/helperFns";
import { addMinutes } from "date-fns";
import EventSummary from "./EventSummary";
import EventDetails from "./EventDetails";
import { breakpoints } from "../../Common/ConstantData";
import { useCustomStyle } from "./Events.style";

const Events = (props: any) => {
  const {
    content,
    analytics,
    authoringHelper = {},
    secondaryArgs = {},
    enablePreview = false,
  } = nullToObject(props);
  const classes = useCustomStyle();
  const { isAuthoring = false } = nullToObject(authoringHelper);
  const theme = useTheme();
  const less_than_320 = useMediaQuery(theme.breakpoints.only("xs"));
  const less_than_600 = useMediaQuery(theme.breakpoints.only("sm"));
  const less_than_768 = useMediaQuery(theme.breakpoints.only("md"));
  const less_than_1024 = useMediaQuery(theme.breakpoints.only("em"));
  const less_than_1280 = useMediaQuery(theme.breakpoints.only("lg"));
  const less_than_1440 = useMediaQuery(theme.breakpoints.only("xl"));

  const getEventUrl = () => {
    const id = content?.current_page_url;
    if (secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint) {
      return `${secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint}${secondaryArgs?.prelemBaseEndpoint?.language}/event${id}`;
    } else {
      return `/event${id}`;
    }
  };
  const [, handleImpression] = usePlatformAnalytics();
  const { ref } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const [showDetails, setshowDetails] = useState(false);
  const getEventStatus = (startDate: any, endDate: any) => {
    const currentDateTime = addMinutes(new Date(), 1);
    const event_start_date = new Date(startDate);
    const event_end_date = new Date(endDate);
    if (currentDateTime > event_end_date) {
      return "completed";
    } else if (currentDateTime > event_start_date && currentDateTime < event_end_date) {
      return "live";
    } else if (event_start_date > currentDateTime) {
      return "tobestart";
    } else {
      return "error";
    }
  };
  const [eventState] = useState(getEventStatus(content?.event_start_date, content?.event_end_date));

  useEffect(() => {
    if (!analytics?.isAuthoring && content?.AnalyticsEnable) {
      const prelemImpressionObj = {
        eventType: "Event Impression",
        contentType: "Event",
        EventTitle: content?.title,
        EventUrl: getEventUrl(),
      };
      handleImpression("Event Impression", prelemImpressionObj);
    }
  }, []);

  const showPublishedDate = () => {
    let showDate = "";
    showDate = (!isAuthoring ? content?.published_date : content?.modificationDate) || new Date();
    if (!showDate) return "";
    return ` ${dateTimeFormat(showDate)}`;
  };

  const publishUrl = secondaryArgs?.prelemBaseEndpoint?.buttonBaseUrl;
  const language = secondaryArgs?.prelemBaseEndpoint?.language;
  // const pageURL = publishUrl + "embed/event" + content?.current_page_url;
  const embedPageURL = publishUrl + language + "/embed/event" + content?.current_page_url;
  const landingPageURL = publishUrl + language + "/event" + content?.current_page_url;
  const embedData = {
    Title: content?.title,
    Description: content?.description,
    Thumbnail: relativeImageURL(
      secondaryArgs?.gcpUrl,
      secondaryArgs?.bucketName,
      content?.original_image?.original_image_relative_path,
      content?.original_image?.ext,
    ),
    Author: content?.createdBy,
    creationDate: content?.creationDate,
    Page: embedPageURL,
    LandingPage: landingPageURL,
    ContentURL: content?.PageSettings?.SocialOgURL,
  };

  const showEventDetails = () => {
    setshowDetails(!showDetails);
  };

  const hideEventDetails = () => {
    setshowDetails(!showDetails);
  };

  const getDefaultCroppedImage = (
    publishedImages: [],
    originalImage: any,
    defaultRatio = "landscape",
  ) => {
    const landscapeImg = publishedImages.find(
      ({ aspect_ratio }: any) => aspect_ratio === defaultRatio,
    );
    const { folder_path: imgUrl = "" } = landscapeImg || {};
    const { gcpUrl, bucketName } = nullToObject(secondaryArgs);
    return `url('${gcpUrl}/${bucketName}/${imgUrl}.webp'), url('${gcpUrl}/${bucketName}/${imgUrl}.${originalImage.ext}'), rgba(0, 0, 0, 0.6)`;
  };

  const fetchCroppedUrl = (Url: string, publishedImages: [], imgOrder = {}, originalImage = {}) => {
    let returnUrl = "";
    if (publishedImages && publishedImages.length > 0) {
      if (less_than_320) {
        returnUrl = getDefaultCroppedImage(
          publishedImages,
          originalImage,
          imgOrder?.["320"] || breakpoints["320"],
        );
      } else if (less_than_600) {
        returnUrl = getDefaultCroppedImage(
          publishedImages,
          originalImage,
          imgOrder?.["600"] || breakpoints["600"],
        );
      } else if (less_than_768) {
        returnUrl = getDefaultCroppedImage(
          publishedImages,
          originalImage,
          imgOrder?.["768"] || breakpoints["768"],
        );
      } else if (less_than_1024) {
        returnUrl = getDefaultCroppedImage(
          publishedImages,
          originalImage,
          imgOrder?.["1024"] || breakpoints["1024"],
        );
      } else if (less_than_1280) {
        returnUrl = getDefaultCroppedImage(
          publishedImages,
          originalImage,
          imgOrder?.["1280"] || breakpoints["1280"],
        );
      } else if (less_than_1440) {
        returnUrl = getDefaultCroppedImage(
          publishedImages,
          originalImage,
          imgOrder?.["1440"] || breakpoints["1440"],
        );
      } else {
        returnUrl = getDefaultCroppedImage(
          publishedImages,
          originalImage,
          imgOrder?.["1440"] || breakpoints["1440"],
        );
      }
    } else {
      if (Url.search("dspace") !== -1) {
        //normal dspace url
        returnUrl = Url;
      }
    }
    return returnUrl;
  };

  return (
    <div ref={authoringHelper?.innerRef}>
      <div ref={ref} className={`${classes.eventPageWrapper} eventPageContent`}>
        <Paper
          className='eventsParent'
          sx={{
            background:
              //"url(" + content.thumbnail_image + ") rgba(0, 0, 0, 0.6)",
              fetchCroppedUrl(
                content?.thumbnail_image,
                content?.published_images,
                {
                  1440: "hero",
                  1280: "landscape",
                  1024: "card2",
                  768: "square",
                  600: "card1",
                  320: "portrait",
                },
                content?.original_image,
              ),
            backgroundBlendMode: "multiply",
            backgroundSize: "cover",
            borderRadius: "0px",
            boxShadow: "none",
          }}>
          <Box className='overlay' sx={{ height: "inherit" }}>
            <Grid
              container
              ref={ref}
              rowSpacing={1}
              sx={{
                flex: 1,
                width: "100%",
                height: "inherit",
                marginTop: "0px",
              }}>
              {showDetails ? (
                <EventSummary
                  content={content}
                  embedData={embedData}
                  enablePreview={enablePreview}
                  hideEventDetails={hideEventDetails}
                  getEventUrl={getEventUrl}
                  showPublishedDate={showPublishedDate}
                />
              ) : (
                <EventDetails
                  content={content}
                  eventState={eventState}
                  embedData={embedData}
                  enablePreview={enablePreview}
                  getEventUrl={getEventUrl}
                  showPublishedDate={showPublishedDate}
                  showEventDetails={showEventDetails}
                />
              )}
            </Grid>
          </Box>
        </Paper>
      </div>
    </div>
  );
};

Events.defaultProps = {
  content: {
    user_action_info: {
      publishByDetails: {
        name: "Dheeraj",
        email: "",
        timeZone: "Asia/Kolkata",
        pubUnpubDateTime: "2023-08-25T04:55:01.047Z",
      },
      unpublishByDetails: {
        email: "",
        name: "",
        timeZone: "Asia/Kolkata",
        pubUnpubDateTime: "",
      },
    },
    seo_enable: true,
    locality:
      "Kennington Kennington Kennington Kennington Kennington Kennington Kennington Kennington Kennington",
    postal_code: "SE 11 5SS",
    region_state:
      "London London London London London London London London London London London London London London London London London London London London London London London London London London London London Lond",
    country:
      "England England England England England England England England England England England England England England England England England England England England England England England England England ",
    blog_settings:
      '"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"LiveBlogPosting\\",\\"@id\\":\\"/live-event-with-all-data-present\\",\\"about\\":{\\"@type\\":\\"Event\\",\\"startDate\\":\\"2023-08-01T09:30:00Z\\",\\"name\\":\\"live event with all data present\\"},\\"coverageStartTime\\":\\"2023-08-01T09:30:00Z\\",\\"coverageEndTime\\":\\"2023-09-30T09:30:00Z\\",\\"headline\\":\\"live event with all data present\\",\\"description\\":\\"A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the cha\\",\\"liveBlogUpdate\\":[]}"',
    PageTags: [
      "Cristiano Ronaldo",
      "Mesut Özil",
      "Maria Sharapova",
      "MS Dhoni",
      "LeBron James",
      "Kobe Bryant",
      "Kevin Durant",
      "James Rodriguez",
      "Andorra",
      "Azerbaijan",
      "Armenia",
      "Antigua and Barbuda",
      "Argentina",
      "Angola",
      "Algeria",
    ],
    actual_address:
      "The Oval Cricket Ground The Oval Cricket Ground The Oval Cricket Ground The Oval Cricket Ground The Oval Cricket Ground The Oval Cricket Ground The Oval Cricket Ground The Oval Cricket Ground The Oval",
    event_end_date: "2023-09-30T09:30:00Z",
    event_start_date: "2023-08-01T09:30:00Z",
    google_api_address: "www.google.com",
    title: "live event with all data present",
    tagging: "Event",
    tag_name: "Event",
    structure_data:
      '{"@context":"https://schema.org","@type":"Event","name":"A wonderful serenity has taken possession of my entire soul","startDate":"2023-08-01T09:30:00.000Z","endDate":"2023-09-30T09:30:00.000Z","eventAttendanceMode":"Mixed","eventStatus":"Live","location":[{"@type":"VirtualLocation","url":"https://www.google.com"},{"@type":"Place","name":"The Oval Cricket Ground The Oval Cricket Ground The Oval Cricket Ground The Oval Cricket Ground The Oval Cricket Ground The Oval Cricket Ground The Oval Cricket Ground The Oval Cricket Ground The Oval","address":{"@type":"PostalAddress","addressLocality":"Kennington Kennington Kennington Kennington Kennington Kennington Kennington Kennington Kennington","postalCode":"SE 11 5SS","addressRegion":"London London London London London London London London London London London London London London London London London London London London London London London London London London London London Lond","addressCountry":"England England England England England England England England England England England England England England England England England England England England England England England England England "}}],"image":["https://dev.dam.hcl-x.com/server/api/core/bitstreams/4440f86b-b945-42d7-be13-11f100b320f5/content"],"description":"A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the cha"}',
    sitemap: false,
    short_description:
      "A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the cha",
    robot_txt: "false",
    thumbnail_image:
      "https://dev.dam.hcl-x.com/server/api/core/bitstreams/4440f86b-b945-42d7-be13-11f100b320f5/content",
    url: null,
    published_date: "2023-08-25T04:55:19Z",
    parent_page_url: "/",
    page_state: "PUBLISHED",
    page_publishedby: "Dheeraj",
    page_name: null,
    page_lastmodifiedby: "Dheeraj Chandra",
    page_createdby: "Dheeraj Chandra",
    page: "live-event-with-all-data-present",
    others: null,
    is_softdelete: false,
    is_edit: false,
    virtual_address: "https://www.google.com",
    description:
      "A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now. When, while the lovely valley teems with vapour around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees, and but a few stray gleams steal into the inner sanctuary, I throw myself down among the tall grass by the trickling stream; and, as I lie close to the earth, a thousand unknown plants are noticed by me: when I hear the buzz of the little world among the stalks, and grow familiar with the countless indescribable forms of the insects and flies, then I feel t",
    current_page_url: "/live-event-with-all-data-present",
    document_path: "/content/documents/hclplatformx/{lang}/event/live-event-with-all-data-present",
    createdBy: "Dheeraj Chandra",
    category: null,
    analytics_enable: true,
    analytics: null,
    settings: {
      keywords: [
        "Cristiano Ronaldo",
        "Mesut Özil",
        "Maria Sharapova",
        "MS Dhoni",
        "LeBron James",
        "Kobe Bryant",
        "Kevin Durant",
        "James Rodriguez",
        "Andorra",
        "Azerbaijan",
        "Armenia",
        "Antigua and Barbuda",
        "Argentina",
        "Angola",
        "Algeria",
      ],
      page_caching: false,
      page_mobile_friendly: false,
      is_schedule_publish: false,
      is_schedule_unpublish: false,
      seo_title: "live event with all data present",
      seo_description:
        "A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the cha...",
      seo_keywords: [
        "Cristiano Ronaldo",
        "Mesut Özil",
        "Maria Sharapova",
        "MS Dhoni",
        "LeBron James",
        "Kobe Bryant",
        "Kevin Durant",
        "James Rodriguez",
        "Andorra",
        "Azerbaijan",
        "Armenia",
        "Antigua and Barbuda",
        "Argentina",
        "Angola",
        "Algeria",
      ],
      seo_blockIndexing: false,
      socialog_title: "A wonderful serenity has taken possession of my entire soul",
      socialog_description:
        "A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the cha",
      socialog_sitename: "live event with all data present",
      socialog_type: "event",
      socialog_url: "https://dev.hcl-x.com/en/event/live-event-with-all-data-present",
      socialog_image:
        "https://dev.dam.hcl-x.com/server/api/core/bitstreams/4440f86b-b945-42d7-be13-11f100b320f5/content",
      socialog_twitter_title: "A wonderful serenity has taken possession of my entire soul",
      socialog_twitter_description:
        "A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the cha",
      socialog_twitter_image:
        "https://dev.dam.hcl-x.com/server/api/core/bitstreams/4440f86b-b945-42d7-be13-11f100b320f5/content",
      socialog_twitter_url: "https://dev.hcl-x.com/en/event/live-event-with-all-data-present",
    },
    content_type: "Event",
    creationDate: "2023-08-25T04:54:59Z",
    keywords: [
      "Cristiano Ronaldo",
      "Mesut Özil",
      "Maria Sharapova",
      "MS Dhoni",
      "LeBron James",
      "Kobe Bryant",
      "Kevin Durant",
      "James Rodriguez",
      "Andorra",
      "Azerbaijan",
      "Armenia",
      "Antigua and Barbuda",
      "Argentina",
      "Angola",
      "Algeria",
    ],
    modificationDate: "2023-08-25T04:54:59.269Z",
    site_name: null,
    last_modification_date: "2023-08-25T04:54:59Z",
    last_modified_by: "Dheeraj Chandra",
    original_image: {
      original_image_relative_path: "1691944249144/public/jpeg/alexander-kumar-1440-620-image",
      bitStreamId: "4440f86b-b945-42d7-be13-11f100b320f5",
      auto: true,
      ext: "jpg",
      visibility: "public",
    },
    published_images: [
      {
        aspect_ratio: "landscape",
        folder_path: "1691944249144/public/jpeg/alexander-kumar-1440-620-image-landscape",
      },
      {
        aspect_ratio: "square",
        folder_path: "1691944249144/public/jpeg/alexander-kumar-1440-620-image-square",
      },
      {
        aspect_ratio: "portrait",
        folder_path: "1691944249144/public/jpeg/alexander-kumar-1440-620-image-portrait",
      },
      {
        aspect_ratio: "hero",
        folder_path: "1691944249144/public/jpeg/alexander-kumar-1440-620-image-hero",
      },
      {
        aspect_ratio: "card1",
        folder_path: "1691944249144/public/jpeg/alexander-kumar-1440-620-image-card1",
      },
      {
        aspect_ratio: "card2",
        folder_path: "1691944249144/public/jpeg/alexander-kumar-1440-620-image-card2",
      },
    ],
  },
  content2: {
    user_action_info: {
      publishByDetails: {
        name: "Dheeraj",
        email: "",
        timeZone: "Asia/Kolkata",
        pubUnpubDateTime: "2023-08-16T09:48:50.200Z",
      },
      unpublishByDetails: {
        email: "",
        name: "",
        timeZone: "Asia/Kolkata",
        pubUnpubDateTime: "",
      },
    },
    seo_enable: true,
    locality: "Online",
    postal_code: null,
    region_state: "Online",
    country: "Online",
    blog_settings:
      '"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"LiveBlogPosting\\",\\"@id\\":\\"/new-event\\",\\"about\\":{\\"@type\\":\\"Event\\",\\"startDate\\":\\"2023-08-15T18:30:00Z\\",\\"name\\":\\"New Event\\"},\\"coverageStartTime\\":\\"2023-08-15T18:30:00Z\\",\\"coverageEndTime\\":\\"2023-08-17T06:31:00Z\\",\\"headline\\":\\"New Event\\",\\"description\\":\\"New Event New Event\\",\\"liveBlogUpdate\\":[]}"',
    PageTags: ["Live Stream", "Events", "41 to 60", "26 to 40", "61 to 80", "19 -25", "None"],
    actual_address: "Online",
    event_end_date: "2023-12-17T06:31:00Z",
    event_start_date: "2023-08-15T18:30:00Z",
    google_api_address: "www.google.com",
    title: "New Event",
    tagging: "Event",
    tag_name: "Event",
    structure_data:
      '{"@context":"https://schema.org","@type":"Event","name":"New Event","startDate":"2023-08-15T18:30:00.000Z","endDate":"2023-08-17T06:31:00.000Z","eventAttendanceMode":"Mixed","eventStatus":"Live","location":[{"@type":"VirtualLocation","url":"https://google.com/"},{"@type":"Place","name":"Online","address":{"@type":"PostalAddress","addressLocality":"Online","postalCode":"","addressRegion":"Online","addressCountry":"Online"}}],"image":["https://dev.dam.hcl-x.com/server/api/core/bitstreams/db15d043-ca9e-49c5-86cb-2600009746d8/content"],"description":"New Event New Event"}',
    sitemap: false,
    short_description: "New Event New Event",
    robot_txt: "false",
    thumbnail_image:
      "https://dev.dam.hcl-x.com/server/api/core/bitstreams/db15d043-ca9e-49c5-86cb-2600009746d8/content",
    url: null,
    published_date: "2023-08-16T09:49:16Z",
    parent_page_url: "/",
    page_state: "PUBLISHED",
    page_publishedby: "Dheeraj",
    page_name: null,
    page_lastmodifiedby: "Dheeraj Chandra",
    page_createdby: "Dheeraj Chandra",
    page: "new-event",
    others: null,
    is_softdelete: false,
    is_edit: false,
    virtual_address: "https://google.com/",
    description: "New Event New Event",
    current_page_url: "/new-event",
    document_path: "/content/documents/hclplatformx/{lang}/event/new-event",
    createdBy: "Dheeraj Chandra",
    category: null,
    analytics_enable: true,
    analytics: null,
    settings: {
      keywords: ["Live Stream", "Events", "41 to 60", "26 to 40", "61 to 80", "19 -25", "None"],
      page_caching: false,
      page_mobile_friendly: false,
      is_schedule_publish: false,
      is_schedule_unpublish: false,
      seo_title: "New Event",
      seo_description: "New Event New Event",
      seo_keywords: ["Live Stream", "Events", "41 to 60", "26 to 40", "61 to 80", "19 -25", "None"],
      seo_blockIndexing: false,
      socialog_title: "New Event",
      socialog_description: "New Event New Event",
      socialog_sitename: "New Event",
      socialog_type: "event",
      socialog_url: "https://dev.hcl-x.com/en/event/new-event",
      socialog_image:
        "https://dev.dam.hcl-x.com/server/api/core/bitstreams/db15d043-ca9e-49c5-86cb-2600009746d8/content",
      socialog_twitter_title: "New Event",
      socialog_twitter_description: "New Event New Event",
      socialog_twitter_image:
        "https://dev.dam.hcl-x.com/server/api/core/bitstreams/db15d043-ca9e-49c5-86cb-2600009746d8/content",
      socialog_twitter_url: "https://dev.hcl-x.com/en/event/new-event",
    },
    content_type: "Event",
    creationDate: "2023-08-16T09:48:48Z",
    keywords: ["Live Stream", "Events", "41 to 60", "26 to 40", "61 to 80", "19 -25", "None"],
    modificationDate: "2023-08-16T09:48:48.511Z",
    site_name: null,
    last_modification_date: "2023-08-16T09:48:48Z",
    last_modified_by: "Dheeraj Chandra",
    original_image: {
      original_image_relative_path:
        "1691419161633/public/jpeg/young-family-in-ulaanbaatar-1440x620-image",
      bitStreamId: "db15d043-ca9e-49c5-86cb-2600009746d8",
      auto: true,
      ext: "jpeg",
      visibility: "public",
    },
    published_images: [
      {
        aspect_ratio: "square",
        folder_path: "1691419161633/public/jpeg/young-family-in-ulaanbaatar-1440x620-image-square",
      },
      {
        aspect_ratio: "portrait",
        folder_path:
          "1691419161633/public/jpeg/young-family-in-ulaanbaatar-1440x620-image-portrait",
      },
      {
        aspect_ratio: "landscape",
        folder_path:
          "1691419161633/public/jpeg/young-family-in-ulaanbaatar-1440x620-image-landscape",
      },
      {
        aspect_ratio: "card1",
        folder_path: "1691419161633/public/jpeg/young-family-in-ulaanbaatar-1440x620-image-card1",
      },
      {
        aspect_ratio: "hero",
        folder_path: "1691419161633/public/jpeg/young-family-in-ulaanbaatar-1440x620-image-hero",
      },
      {
        aspect_ratio: "card2",
        folder_path: "1691419161633/public/jpeg/young-family-in-ulaanbaatar-1440x620-image-card2",
      },
    ],
  },
  content1: {
    user_action_info: {
      publishByDetails: {
        name: "Dheeraj",
        email: "",
        timeZone: "Asia/Kolkata",
        pubUnpubDateTime: "2023-08-18T06:59:07.165Z",
      },
      unpublishByDetails: {
        email: "",
        name: "",
        timeZone: "Asia/Kolkata",
        pubUnpubDateTime: "",
      },
    },
    seo_enable: true,
    locality: "Kennington",
    postal_code: "SE 11 5SS",
    region_state: "London",
    country: "England",
    blog_settings:
      '"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"LiveBlogPosting\\",\\"@id\\":\\"/scheduled-event-title\\",\\"about\\":{\\"@type\\":\\"Event\\",\\"startDate\\":\\"2023-08-23T09:30:00Z\\",\\"name\\":\\"Scheduled event titless\\"},\\"coverageStartTime\\":\\"2023-08-23T09:30:00Z\\",\\"coverageEndTime\\":\\"2023-08-31T09:30:00Z\\",\\"headline\\":\\"Scheduled event titless\\",\\"description\\":\\"Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues\\",\\"liveBlogUpdate\\":[]}"',
    PageTags: [
      "Gareth Bale",
      "Cristiano Ronaldo",
      "Lionel Messi",
      "LeBron James",
      "Kobe Bryant",
      "Kevin Durant",
      "James Rodriguez",
      "Mesut Özil",
      "Blogs",
      "Articles",
      "News Letter",
      "Live Stream",
      "Image Gallery",
      "Gallery",
      "Customer Testimonial",
    ],
    actual_address: "The Oval Cricket Ground",
    event_end_date: "2023-12-31T09:30:00Z",
    event_start_date: "2023-12-23T09:30:00Z",
    google_api_address: "www.google.com",
    title: "Scheduled event titless",
    tagging: "Event",
    tag_name: "Event",
    structure_data:
      '{"@context":"https://schema.org","@type":"Event","name":"Scheduled event srt title","startDate":"2023-08-23T09:30:00.000Z","endDate":"2023-08-31T09:30:00.000Z","eventAttendanceMode":"Mixed","eventStatus":"Scheduled","location":[{"@type":"VirtualLocation","url":"https://www.google.com"},{"@type":"Place","name":"The Oval Cricket Ground","address":{"@type":"PostalAddress","addressLocality":"Kennington","postalCode":"SE 11 5SS","addressRegion":"London","addressCountry":"England"}}],"image":["https://dev.dam.hcl-x.com/server/api/core/bitstreams/e2496dfb-06a6-4f8e-b4ab-689e50b871eb/content"],"description":"Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues"}',
    sitemap: false,
    short_description:
      "Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues",
    robot_txt: "false",
    thumbnail_image:
      "https://dev.dam.hcl-x.com/server/api/core/bitstreams/e2496dfb-06a6-4f8e-b4ab-689e50b871eb/content",
    url: null,
    published_date: "2023-08-18T06:59:21Z",
    parent_page_url: "/",
    page_state: "PUBLISHED",
    page_publishedby: "Dheeraj",
    page_name: null,
    page_lastmodifiedby: "Dheeraj Chandra",
    page_createdby: "Dheeraj Chandra",
    page: "scheduled-event-title",
    others: null,
    is_softdelete: false,
    is_edit: false,
    virtual_address: "https://www.google.com",
    description:
      "Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores. At solmen va esser necessi far uniform grammatica, pronunciation e plu sommun paroles. Ma quande lingues coalesce, li grammatica del resultant lingue es plu simplic e regulari quam ti del coalescent lingues. Li nov lingua franca va esser plu simplic e regulari quam li existent Europan lingues. It va esser tam simplic quam Occidental in fact, it va esser Occidental. A un Angleso it va semblar un simplificat Angles, quam un skeptic Cambridge amico dit me que Occidental es. Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li.",
    current_page_url: "/scheduled-event-title",
    document_path: "/content/documents/hclplatformx/{lang}/event/scheduled-event-title",
    createdBy: "Dheeraj Chandra",
    category: null,
    analytics_enable: true,
    analytics: null,
    settings: {
      keywords: [
        "Gareth Bale",
        "Cristiano Ronaldo",
        "Lionel Messi",
        "LeBron James",
        "Kobe Bryant",
        "Kevin Durant",
        "James Rodriguez",
        "Mesut Özil",
        "Blogs",
        "Articles",
        "News Letter",
        "Live Stream",
        "Image Gallery",
        "Gallery",
        "Customer Testimonial",
      ],
      page_caching: false,
      page_mobile_friendly: false,
      is_schedule_publish: false,
      is_schedule_unpublish: false,
      seo_title: "Scheduled event titless",
      seo_description:
        "Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues...",
      seo_keywords: [
        "Gareth Bale",
        "Cristiano Ronaldo",
        "Lionel Messi",
        "LeBron James",
        "Kobe Bryant",
        "Kevin Durant",
        "James Rodriguez",
        "Mesut Özil",
        "Blogs",
        "Articles",
        "News Letter",
        "Live Stream",
        "Image Gallery",
        "Gallery",
        "Customer Testimonial",
      ],
      seo_blockIndexing: false,
      socialog_title: "Scheduled event srt title",
      socialog_description:
        "Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues",
      socialog_sitename: "Scheduled event titless",
      socialog_type: "event",
      socialog_url: "https://dev.hcl-x.com/en/event/scheduled-event-titless",
      socialog_image:
        "https://dev.dam.hcl-x.com/server/api/core/bitstreams/e2496dfb-06a6-4f8e-b4ab-689e50b871eb/content",
      socialog_twitter_title: "Scheduled event srt title",
      socialog_twitter_description:
        "Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues",
      socialog_twitter_image:
        "https://dev.dam.hcl-x.com/server/api/core/bitstreams/e2496dfb-06a6-4f8e-b4ab-689e50b871eb/content",
      socialog_twitter_url: "https://dev.hcl-x.com/en/event/scheduled-event-titless",
    },
    content_type: "Event",
    creationDate: "2023-08-18T06:59:03Z",
    keywords: [
      "Gareth Bale",
      "Cristiano Ronaldo",
      "Lionel Messi",
      "LeBron James",
      "Kobe Bryant",
      "Kevin Durant",
      "James Rodriguez",
      "Mesut Özil",
      "Blogs",
      "Articles",
      "News Letter",
      "Live Stream",
      "Image Gallery",
      "Gallery",
      "Customer Testimonial",
    ],
    modificationDate: "2023-08-18T06:59:03.363Z",
    site_name: null,
    last_modification_date: "2023-08-18T06:59:03Z",
    last_modified_by: "Dheeraj Chandra",
    original_image: {
      original_image_relative_path: "1691746781046/public/jpeg/d",
      bitStreamId: "e2496dfb-06a6-4f8e-b4ab-689e50b871eb",
      auto: true,
      ext: "jpg",
      visibility: "public",
    },
    published_images: [
      {
        aspect_ratio: "landscape",
        folder_path: "1691746781046/public/jpeg/d-landscape",
      },
      {
        aspect_ratio: "square",
        folder_path: "1691746781046/public/jpeg/d-square",
      },
      {
        aspect_ratio: "portrait",
        folder_path: "1691746781046/public/jpeg/d-portrait",
      },
      {
        aspect_ratio: "hero",
        folder_path: "1691746781046/public/jpeg/d-hero",
      },
      {
        aspect_ratio: "card1",
        folder_path: "1691746781046/public/jpeg/d-card1",
      },
      {
        aspect_ratio: "card2",
        folder_path: "1691746781046/public/jpeg/d-card2",
      },
    ],
  },
  secondaryArgs: {
    gcpUrl: "https://storage.googleapis.com",
    bucketName: "cropped_image_public",
  },
};

export default Events;
