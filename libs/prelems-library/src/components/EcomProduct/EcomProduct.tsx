import AutorenewIcon from "@mui/icons-material/Autorenew";
import { Box, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import "../../Style.css";
import EcomProductCard from "./EcomProductCard";
import { usePrelemImpression } from "Common/ImpressionHooks/PrelemImpressionHook";

const EcomProduct = ({ content, analytics, authoringHelper, secondaryArgs }: any) => {
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
  const firstRender = useRef(true);
  usePrelemImpression(analytics, inView);

  const getPrice = (priceArray: any[]) => {
    if (!priceArray.length) return 0;
    // eslint-disable-next-line prefer-destructuring
    const {
      value: { centAmount = 0, currencyCode = "" },
    } = priceArray[0];
    const usdPrice = centAmount / 100;
    return currencyCode === "USD" ? `$ ${usdPrice}` : `€ ${Math.round(usdPrice * 0.94)}`;
  };

  const getPropertyInArr = (Arr: any[], propertyName: string) => {
    const result = Arr.find((item) => item.name === propertyName);
    return result ? result.value : "";
  };

  const getExternalData = async () => {
    const { data: { access_token = "" } = {} } = await axios.post(
      content?.OauthEndPoint,
      new URLSearchParams({
        grant_type: "client_credentials",
      }),
      {
        auth: {
          username: content?.Username,
          password: content?.Password,
        },
      },
    );

    const { data: { results = {} } = {} } = await axios.get(content?.ApiEndPoint, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    // const filteredData = results.filter(
    //   (item: any) =>
    //     item?.productType?.id === "4e6d86a4-8e4c-47b4-8e3e-ff55e94fc6af"
    // );
    const filteredData = results;
    if (filteredData.length) {
      const formatData = filteredData.map((item: any) => {
        const {
          masterData: {
            current: { masterVariant: { attributes = [], images = [], prices = [] } = {} } = {},
            staged: { description = {} } = {},
          } = {},
        } = item;
        const title = getPropertyInArr(attributes, "Tourist-Destination");
        return {
          Description: description["en-US"] || "",
          Title: title,
          Thumbnail: {
            Name: title,
            Url: images.length
              ? images[0].url
              : "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/872d3f4d-4c57-425d-b98c-7ad2a8570641/content",
            Title: "ExpertiseShowcase2",
            Description: "This is for ExpertiseShowcase2",
            Attribution: false,
            AltText: "ExpertiseShowcase2",
          },
          Price: getPrice(prices),
          Duration: getPropertyInArr(attributes, "package-duration"),
          CtaUrl: getPropertyInArr(attributes, "CTA-URL"),
        };
      });
      const limitProduct = getCardArr(formatData);
      setCardArr(limitProduct);
    }
  };

  useEffect(() => {
    getExternalData();
  }, [content?.ApiEndPoint, content?.OauthEndPoint, content?.Username, content?.Password]);

  const getEntity = (item: any) => {
    if (item.ContentType === "Article") {
      return `${secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint}${
        secondaryArgs?.prelemBaseEndpoint?.language
      }/article/${item?.EditorialItemPath ? item?.EditorialItemPath : item?.CurrentPageURL}`;
    }
    if (item.ContentType === "VOD") {
      return `${secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint}${
        secondaryArgs?.prelemBaseEndpoint?.language
      }/video/${item?.EditorialItemPath ? item?.EditorialItemPath : item?.CurrentPageURL}`;
    }
  };

  const defaultStructureData = () => {
    let multiSlotStructureData;
    try {
      multiSlotStructureData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: content?.Title,
        description: content?.Description,
        itemListElement: cardArr?.map((i: any, index: number) => {
          return {
            "@type": "ListItem",
            position: index + 1,
            name: i.Title,
            mainEntityOfPage: getEntity(i),
          };
        }),
      };
    } catch (e) {
      multiSlotStructureData = {};
    }

    return multiSlotStructureData;
  };

  const getGridValues = (index: number) => {
    let md = 4,
      em = 3;
    if (cardArr.length === 1) {
      md = 12;
      em = 12;
    } else if (cardArr.length === 2) {
      md = 6;
      em = 6;
    } else if (cardArr.length === 3) {
      if (index === 0) {
        em = 6;
        md = 12;
      } else {
        em = 3;
        md = 6;
      }
    } else if (cardArr.length === 4) {
      md = 6;
      em = 3;
    }
    return { md, em };
  };

  const generateStructureData = () => {
    let multiSlotStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current === true) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        multiSlotStructureData = JSON.parse(tempSD);
      } else {
        multiSlotStructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      multiSlotStructureData = defaultStructureData();
    }
    return multiSlotStructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content?.Title, content?.Description, cardArr]);

  const styles = `.title button {
        height: 100%
    }
    .expertise-show-case button {
        padding: 0
    }
    .button-name button {
        width: 250px;
        height: 49px;
    }
    @media only screen and (min-width: 600px) {
        .button-name button {
            width: 100%;
        }
    }`;

  return (
    <div ref={authoringHelper?.innerRef}>
      <style>{styles}</style>
      <Container
        className={
          authoringHelper?.isEditPage ? "grid_full_width prelem-py" : "grid_container prelem-py"
        }>
        <Box ref={ref}>
          <Typography
            variant='h1bold'
            sx={{
              margin: "0 auto 20px",
              textAlign: "center",
              width: { xs: "100%", sm: "100%", md: "80%", lg: "80%" },
            }}
            id='Title'>
            {content?.Title}
          </Typography>
          <Typography
            variant='body1'
            sx={{
              margin: "0 auto",
              textAlign: "center",
              width: { xs: "100%", lg: "57%" },
            }}
            pb={2}
            id='Description'>
            {content?.Description}
          </Typography>
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
                const { md, em } = getGridValues(index);
                return (
                  <Grid item xs={12} md={md} em={em} rowSpacing={1} p={1} key={index}>
                    {cardArr && Object.keys(item).length !== 0 && (
                      <Fragment>
                        <Box
                          sx={{
                            height: {
                              xs: "405px",
                              sm: "410px",
                              md: "350px",
                              lg: "430px",
                            },
                            border: "solid 1px #ced3d9",
                            borderRadius: "10px",
                            display: { xs: "block", md: "none", em: "none" },
                          }}>
                          <EcomProductCard
                            content={cardArr[index]}
                            secondaryArgs={secondaryArgs}
                            analytics={analytics}
                            cardIndex={index}
                          />
                        </Box>
                        <Box
                          sx={{
                            height: {
                              xs: "405px",
                              sm: "410px",
                              md: "350px",
                              lg: "430px",
                            },
                            border: "solid 1px #ced3d9",
                            borderRadius: "10px",
                            display: { xs: "none", md: "block", em: "none" },
                          }}>
                          {/* {md === 12 ? (
                            <DynamicPrelemCard2
                              content={cardArr[index]}
                              secondaryArgs={secondaryArgs}
                              analytics={analytics}
                              cardIndex={index}
                            />
                          ) : ( */}
                          <EcomProductCard
                            content={cardArr[index]}
                            secondaryArgs={secondaryArgs}
                            analytics={analytics}
                            cardIndex={index}
                          />
                          {/* )} */}
                        </Box>
                        <Box
                          sx={{
                            height: {
                              xs: "405px",
                              sm: "410px",
                              md: "350px",
                              lg: "430px",
                            },
                            border: "solid 1px #ced3d9",
                            borderRadius: "10px",
                            display: { xs: "none", md: "none", em: "block" },
                          }}>
                          {/* {em === 12 || em === 6 ? (
                            <DynamicPrelemCard2
                              content={cardArr[index]}
                              secondaryArgs={secondaryArgs}
                              analytics={analytics}
                              cardIndex={index}
                            />
                          ) : ( */}
                          <EcomProductCard
                            content={cardArr[index]}
                            secondaryArgs={secondaryArgs}
                            analytics={analytics}
                            cardIndex={index}
                          />
                          {/* )} */}
                        </Box>
                      </Fragment>
                    )}
                  </Grid>
                );
              })
            ) : (
              <React.Fragment>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    height: { xs: "185px", sm: "100%" },
                  }}>
                  <img
                    src='https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/3b8398a0-299a-4b4e-ad6f-2a5bbb306e9a/content'
                    alt='NoDataFound'
                  />
                </Box>
                <Typography
                  variant='h2'
                  sx={{
                    margin: "0 auto 20px",
                    textAlign: "center",
                    width: { xs: "100%", sm: "100%", md: "80%", lg: "80%" },
                  }}>
                  No data found
                </Typography>
              </React.Fragment>
            )}
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
        </Box>
      </Container>
    </div>
  );
};

EcomProduct.defaultProps = {
  content: {
    Title: "Trending 2023",
    Description:
      "Pre-built Elements (we call them “Prelems”) are the “Lego Blocks” of X. Go to market fast with our rich library of Prelems. Each Prelem comes with out-of-box modern UX, analytics,accessibility & SEO support",
    ApiEndPoint: "https://api.us-central1.gcp.commercetools.com/easyjethospitality2/products/",
    OauthEndPoint: "https://auth.us-central1.gcp.commercetools.com/oauth/token",
    Username: "bogDlbqAF9aSDFew6eo8fu9W",
    Password: "g_Z7TlfPFnHR8gBy36Xdnnl4AIowjA4R",
    Slots: [
      {
        Title: "Lorem ipsum dolor sit amet",
        Thumbnail: {
          Name: "ExpertiseShowcase2",
          Url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/872d3f4d-4c57-425d-b98c-7ad2a8570641/content",
          Title: "ExpertiseShowcase2",
          Description: "This is for ExpertiseShowcase2",
          Attribution: false,
          AltText: "ExpertiseShowcase2",
        },
        EditorialItemPath:
          "/content/documents/hclplatformx/siteeditorial/imagegallery/xeroxgallery",
        Description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        Id: "Article_01",
        ContentType: "Article",
        PublishedBy: "Admin",
        PublishedDate: "2022-12-21T12:47:02.924Z",
      },
      {
        Title: "Lorem ipsum dolor sit amet",
        Thumbnail: {
          Name: "ExpertiseShowcase2",
          Url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/872d3f4d-4c57-425d-b98c-7ad2a8570641/content",
          Title: "ExpertiseShowcase2",
          Description: "This is for ExpertiseShowcase2",
          Attribution: false,
          AltText: "ExpertiseShowcase2",
        },
        EditorialItemPath:
          "/content/documents/hclplatformx/siteeditorial/imagegallery/xeroxgallery",
        Description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        Id: "Article_02",
        ContentType: "Article",
        PublishedBy: "Admin",
        PublishedDate: "2022-12-21T12:47:02.924Z",
      },
      {
        Title: "Lorem ipsum dolor sit amet",
        Thumbnail: {
          Name: "ExpertiseShowcase2",
          Url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/872d3f4d-4c57-425d-b98c-7ad2a8570641/content",
          Title: "ExpertiseShowcase2",
          Description: "This is for ExpertiseShowcase2",
          Attribution: false,
          AltText: "ExpertiseShowcase2",
        },
        EditorialItemPath:
          "/content/documents/hclplatformx/siteeditorial/imagegallery/xeroxgallery",
        Description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        Id: "VOD_01",
        ContentType: "VOD",
        PublishedBy: "Admin",
        PublishedDate: "2022-12-21T12:47:02.924Z",
      },
      {
        Title: "Lorem ipsum dolor sit amet",
        Thumbnail: {
          Name: "ExpertiseShowcase2",
          Url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/872d3f4d-4c57-425d-b98c-7ad2a8570641/content",
          Title: "ExpertiseShowcase2",
          Description: "This is for ExpertiseShowcase2",
          Attribution: false,
          AltText: "ExpertiseShowcase2",
        },
        EditorialItemPath:
          "/content/documents/hclplatformx/siteeditorial/imagegallery/xeroxgallery",
        Description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        Id: "VOD_02",
        ContentType: "VOD",
        PublishedBy: "Admin",
        PublishedDate: "2022-12-21T12:47:02.924Z",
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
    apiUrl: "https://api.us-central1.gcp.commercetools.com/easyjethospitality2/products/",
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

export default EcomProduct;
