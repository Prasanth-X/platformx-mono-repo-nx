import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import AwardsWinnerCompanyIcon from "../../assets/svgIcon/AwardsWinnerCompany.svg";
import PrelemsDeployedIcon from "../../assets/svgIcon/PrelemsDeployed.svg";
import ProjectsCompletedIcon from "../../assets/svgIcon/ProjectsCompletedIcon.svg";
import { completeButtonUrl } from "../../utils/helperFns";
import BasicButton from "../BasicButton/BasicButton";
import { usePrelemImpression } from "Common/ImpressionHooks/PrelemImpressionHook";

const NewOne = ({ content, analytics, authoringHelper, secondaryArgs }: NewOneProps) => {
  const ButtonObj1 = {
    Button_Name: "Button1_Name",
    Button_RedirectURL: "Button1_RedirectURL",
    Button_Type: "Button1_Type",
    Button_Value: "Button1_Value",
    Button_Action: "Button1_Action",
  };
  const ButtonDataObj1 = {
    Button_Name: content?.Button1_Name,
    Button_RedirectURL: content?.Button1_RedirectURL,
    Button_Type: content?.Button1_Type,
    Button_Value: content?.Button1_Value,
    Button_Action: content?.Button1_Action,
  };
  // const ButtonObj2 = {
  //   Button_Name: "Button2_Name",
  //   Button_RedirectURL: "Button2_RedirectURL",
  //   Button_Type: "Button2_Type",
  //   Button_Value: "Button2_Value",
  //   Button_Action: "Button2_Action",
  // };
  // const ButtonDataObj2 = {
  //   Button_Name: content?.Button2_Name,
  //   Button_RedirectURL: content?.Button2_RedirectURL,
  //   Button_Type: content?.Button2_Type,
  //   Button_Value: content?.Button2_Value,
  //   Button_Action: content?.Button2_Action,
  // };
  const firstRender = useRef(true);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const defaultStructureData = () => {
    let NewOneStructureData;
    try {
      NewOneStructureData = {
        "@context": "http://schema.org/",
        "@type": "Service",
        name: content?.Title,
        image: content?.Images?.Image_1?.Url,
        description: content?.Description,
        url: completeButtonUrl(
          content?.Button1_Action,
          content?.Button1_RedirectURL,
          secondaryArgs.prelemBaseEndpoint.buttonBaseUrl,
        ),
      };
    } catch (e) {
      NewOneStructureData = {};
    }
    return NewOneStructureData;
  };
  const genrateStructureData = () => {
    let NewOneStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current === true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        NewOneStructureData = JSON.parse(tempSD);
      } else {
        NewOneStructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      NewOneStructureData = defaultStructureData();
    }
    return NewOneStructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = genrateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    content?.Description,
    content?.Images?.Image_1?.Url,
    content?.Title,
    content?.Button1_Value,
    content?.Button1_RedirectURL,
  ]);

  usePrelemImpression(analytics, inView);
  const mainStyle = `
  .text-truncated-3line {
    display: inline;
    -webkit-line-clamp: 3;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
  }
  .text-truncated-1line {
    display: inline;
    -webkit-line-clamp: 1;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
  }
  `;
  return (
    <div ref={authoringHelper?.innerRef}>
      <style>{mainStyle}</style>
      <Box sx={{ background: "#2d2d39" }} ref={ref}>
        <Container className={authoringHelper?.isEditPage ? "grid_full_width" : "grid_container"}>
          <Grid
            container
            ref={ref}
            sx={{
              color: "#fff",
              padding: {
                xs: "25px 0 10px",
                md: "35px 0 20px",
                lg: "80px 0 55px",
              },
            }}>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              em={6}
              lg={7}
              sx={{
                paddingRight: {
                  xs: 0,
                  md: "30px",
                  em: "65px",
                  lg: "120px",
                  xl: "160px",
                },
                marginBottom: {
                  xs: "30px",
                  sm: "35px",
                  md: "35px",
                  em: 0,
                  lg: "0",
                },
              }}>
              <Box sx={{ maxWidth: { xs: "80%", md: "350px", lg: "420px" } }}>
                <Box
                  sx={{
                    borderBottom: "1px solid #fff",
                    marginBottom: "15px",
                    paddingBottom: "15px",
                  }}>
                  <Typography
                    variant='h6medium'
                    sx={{ color: "#ced3d9", textTransform: "uppercase" }}>
                    Seo
                  </Typography>
                </Box>
                <Typography
                  variant='h2bold'
                  sx={{
                    margin: { xs: "0 0 20px", md: "0 0 35px", lg: "0 0 45px" },
                  }}
                  id='Title'>
                  {content.Title}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant='h5regular'
                  sx={{
                    margin: { xs: "0 0 20px", md: "0 0 20px", lg: "0px" },
                  }}
                  id='Description'>
                  {content.Description}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: { xs: "160px", sm: "160px" },
                  marginTop: { xs: "20px", sm: "25px", md: "35px", lg: "40px" },
                }}>
                <BasicButton
                  style={{ textTransform: "capitalize", minWidth: "100%" }}
                  openButtonEditWindow={authoringHelper?.openButtonEditWindowInAuthoringCB}
                  isAuthoring={analytics?.isAuthoring}
                  currentBtnEditing={authoringHelper?.selectedButtonNameForEditing}
                  //buttonRef={buttonRef}
                  //buttonContentEditable={buttonContentEditable}
                  variant='whitebutton'
                  analyticsEnabled={analytics?.isAnalyticsEnabled}
                  ButtonObj={ButtonObj1}
                  isEditing={authoringHelper?.isEditing}
                  buttonDataObj={ButtonDataObj1}
                  secondaryArgs={secondaryArgs}
                  analytics={analytics}
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              em={6}
              lg={5}
              sx={{ display: { xs: "block", md: "flex", em: "block" } }}>
              <Box
                sx={{
                  marginBottom: { xs: "20px", md: "25px", lg: "30px" },
                  paddingRight: { xs: "0", md: "20px", em: 0 },
                  display: { xs: "flex", md: "block", em: "flex" },
                }}>
                <Box
                  sx={{
                    minWidth: "42px",
                    maxWidth: "42px",
                    minHeight: "42px",
                    maxHeight: "42px",
                    marginBottom: { xs: "0", md: "15px", em: "0" },
                    display: "flex",
                    marginRight: { xs: "10px", md: "15px", lg: "25px" },
                  }}>
                  <img
                    alt='case3'
                    src={PrelemsDeployedIcon}
                    style={{ width: "100%", objectFit: "cover" }}
                  />
                </Box>
                <Box>
                  <Typography variant='h2bold'>500 +</Typography>
                  <Typography
                    variant='h3semibold'
                    className='text-truncated-1line'
                    sx={{ margin: "7px 0 12px" }}>
                    Prelems Deployed
                  </Typography>
                  <Typography variant='h5regular' className='text-truncated-3line'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum
                    laoreet.
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  marginBottom: { xs: "20px", md: "25px", lg: "30px" },
                  paddingRight: { xs: "0", md: "20px", em: 0 },
                  display: { xs: "flex", md: "block", em: "flex" },
                }}>
                <Box
                  sx={{
                    minWidth: "42px",
                    maxWidth: "42px",
                    minHeight: "42px",
                    maxHeight: "42px",
                    marginBottom: { xs: "0", md: "15px", em: "0" },
                    display: "flex",
                    marginRight: { xs: "10px", md: "15px", lg: "25px" },
                  }}>
                  <img
                    alt='case4'
                    src={ProjectsCompletedIcon}
                    style={{ width: "100%", objectFit: "cover" }}
                  />
                </Box>
                <Box>
                  <Typography variant='h2bold'>10 +</Typography>
                  <Typography
                    variant='h3semibold'
                    className='text-truncated-1line'
                    sx={{ margin: "7px 0 12px" }}>
                    Projects Completed
                  </Typography>
                  <Typography variant='h5regular' className='text-truncated-3line'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum
                    laoreet.
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  marginBottom: { xs: "20px", md: "25px", lg: "30px" },
                  paddingRight: { xs: "0", md: "20px", em: 0 },
                  display: { xs: "flex", md: "block", em: "flex" },
                }}>
                <Box
                  sx={{
                    minWidth: "42px",
                    maxWidth: "42px",
                    minHeight: "42px",
                    maxHeight: "42px",
                    marginBottom: { xs: "0", md: "15px", em: "0" },
                    display: "flex",
                    marginRight: { xs: "10px", md: "15px", lg: "25px" },
                  }}>
                  <img
                    alt='case5'
                    src={AwardsWinnerCompanyIcon}
                    style={{ width: "100%", objectFit: "cover" }}
                  />
                </Box>
                <Box>
                  <Typography variant='h2bold'>12 +</Typography>
                  <Typography
                    variant='h3semibold'
                    className='text-truncated-1line'
                    sx={{ margin: "7px 0 12px" }}>
                    Awards Winner Company
                  </Typography>
                  <Typography variant='h5regular' className='text-truncated-3line'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum
                    laoreet.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

interface NewOneProps {
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
  isEditPage?: boolean;
}

interface Content {
  Title?: string;
  Description?: string;
  Button1_Action?: string;
  Button1_Name?: string;
  Button1_RedirectURL?: string;
  Button1_RestEndPonit?: string;
  Button1_Type?: string;
  Button1_Value?: string;
  Button2_Action?: string;
  Button2_Name?: string;
  Button2_RedirectURL?: string;
  Button2_RestEndPonit?: string;
  Button2_Type?: string;
  Button2_Value?: string;
  Images?: {
    Image_1: {
      Name: string;
      Url: string;
      Title: string;
      Description: string;
      AltText: string;
    };
  };
  TagName?: string;
}

NewOne.defaultProps = {
  content: {
    Button1_Name: "ICT Certified Course",
    Button1_RedirectURL: "www.google.com", // relative page url | link url
    Button1_RestEndPonit: "RestEndPoint 1", // ?
    Button1_Action: "External", // Page |  Link

    Button1_Type: "Button1_Type", // current window | new window
    Button1_Value: "Learn More",

    Button2_Name: "DBE iCloud",
    Button2_RedirectURL: "https://www.google.com/", // relative page url | link url
    Button2_RestEndPonit: "RestEndPoint 2", // ?
    Button2_Action: "External", // Page |  Link

    Button2_Type: "Button2_Type", // current window | new window
    Button2_Value: "DBE iCloud",

    Title: "Deliver digital experiences like never before",
    Description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    Images: {
      Image_1: {
        Name: "New One",
        Url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/c8da887c-7d5e-457f-8539-ae30b5e7cb7c/content",
        Title: "New One",
        Description: "This is for New One",
        AltText: "Paragraph With Headline And CTA",
      },
    },
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
    isEditPage: false,
  },
  analytics: {
    isAnalyticsEnabled: true,
    isSeoEnabled: false,
    isAuthoring: false,
    position: 0,
    pageId: 12345,
    prelemId: 23456,
    pageTitle: "New One",
    pageDesc:
      "The Prelem ‘New One’ can be used to give an introduction to your website. It has an image, title, description & CTA which can be used to add the required information.",
    pageTags: "Website, Introduction, New One, Image, CTA, Title, Hero Banner",
    prelemTags: "Website, Introduction, New One, Image, CTA, Title, Hero Banner",
  },
  secondaryArgs: {
    prelemBaseEndpoint: {
      APIEndPoint: "https://platx-api-dev.fanuep.com/platform-x/",
      device: "window",
      buttonBaseUrl: "https://platx-publish-dev.fanuep.com/",
    },
    editState: false,
    multiSlot: {},
  },
};

export default NewOne;
