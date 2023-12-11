import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Box, Button, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import usePlatformAnalytics from "platform-x-utils/dist/analytics";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { breakpoints } from "../../Common/ConstantData";
import CloseIcon from "../../assets/svgIcon/Cross.svg";
import "../../service/i18n";
import { nullToObject, relativeImageURL, triggerAnalytics } from "../../utils/helperFns";
import Share from "../Share/Share";
import QuestionIndex from "./QuestionIndex";
import QuizContext from "./QuizContext";
import ScoreScreen from "./ScoreScreen";
import ViewAnswers from "./ViewAnswers";

const Quiz = ({
  content,
  analytics,
  authoringHelper,
  secondaryArgs,
  enablePreview = false,
}: QuizProps) => {
  const theme = useTheme();
  const less_than_320 = useMediaQuery(theme.breakpoints.only("xs"));
  const less_than_600 = useMediaQuery(theme.breakpoints.only("sm"));
  const less_than_768 = useMediaQuery(theme.breakpoints.only("md"));
  const less_than_1024 = useMediaQuery(theme.breakpoints.only("em"));
  const less_than_1280 = useMediaQuery(theme.breakpoints.only("lg"));
  const less_than_1440 = useMediaQuery(theme.breakpoints.only("xl"));

  // const mediaQuery = (query: any) => {
  //   return useMediaQuery(query)
  // }
  const [showQuestions, setShowQuestions] = useState<boolean>(false);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [viewAnswers, setViewAnswers] = useState<boolean>(false);
  const [quizData, setQuizData] = useState([]);
  const [takenQuiz, setTakenQuiz] = useState(false);
  const { t, i18n } = useTranslation();

  // const checkFetchCroppedUrl = (
  //     Url: string,
  //     publishedImages: [],
  //     imgOrder = {}
  //   ) => {
  //     return fetchCroppedUrl(theme, Url, publishedImages, imgOrder, {less_than_320, less_than_600, less_than_768, less_than_1024, less_than_1280, less_than_1440});
  //   };

  const getQuizUrl = () => {
    const id = content?.current_page_url;
    if (secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint) {
      return `${secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint}${secondaryArgs?.prelemBaseEndpoint?.language}/quiz${id}`;
    } else {
      return `/quiz${id}`;
    }
  };

  const publishUrl = secondaryArgs?.prelemBaseEndpoint?.buttonBaseUrl || "";
  const language = secondaryArgs?.prelemBaseEndpoint?.language || "";
  const embedPageURL = publishUrl + language + "/embed/quiz" + content?.current_page_url;
  const landingPageURL = publishUrl + language + "/quiz" + content?.current_page_url;
  const embedData = {
    Title: content?.title,
    Description: content?.description,
    Thumbnail: relativeImageURL(
      secondaryArgs?.gcpUrl,
      secondaryArgs?.bucketName,
      content?.original_image?.original_image_relative_path,
      content?.original_image?.ext,
    ),
    Author: content?.page_createdby,
    creationDate: content?.created_date,
    Page: embedPageURL,
    LandingPage: landingPageURL,
    ContentURL: content?.settings?.seo_keywords?.socialog_url,
  };

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
  const [handleTrack] = usePlatformAnalytics();
  const { ref } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const firstRender = useRef(true);
  // useEffect(() => {
  //     if (
  //         !analytics?.isAuthoring &&
  //         analytics?.isAnalyticsEnabled &&
  //         enableImpressionTracking &&
  //         inView
  //     ) {
  //         const prelemImpressionObj = {
  //             eventType: 'Prelem Impression',
  //             ...defaultObj,
  //         };
  //         handleImpression('Prelem Impression', prelemImpressionObj);
  //         setEnableImpressionTracking(false);
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [inView, analytics?.isAnalyticsEnabled]);
  // const url = new URL(window.location.href);
  useEffect(() => {
    if (typeof window !== "undefined") {
      i18n.changeLanguage(secondaryArgs?.prelemBaseEndpoint?.language);
      // i18n.changeLanguage(url.pathname.split("/")[1]);
    }
  }, []);
  const defaultStructureData = () => {
    let QuizStructureData;
    try {
      QuizStructureData = {
        "@context": "https://schema.org",
        "@type": "Quiz",
        name: content.title,
        description: content.description,
        hasPart:
          content.questions.length > 0 &&
          content?.questions.map(({ question }: any) => {
            return {
              "@type": "Question",
              name: question,
              suggestedAnswer:
                question.options_compound_fields.length > 0 &&
                question.options_compound_fields.map(({ option_id, option_text }: any) => {
                  return {
                    "@type": "Answer",
                    position: option_id,
                    text: option_text,
                  };
                }),
            };
          }),
      };
    } catch (e) {
      QuizStructureData = {};
    }

    return QuizStructureData;
  };

  const generateStructureData = () => {
    let QuizStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        QuizStructureData = JSON.parse(tempSD);
      } else {
        QuizStructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      QuizStructureData = defaultStructureData();
    }
    return QuizStructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content.questions]);

  const OnClickStart = (e: any) => {
    setShowQuestions(true);
    triggerAnalytics({ e, analytics, defaultObj, handleTrack });
  };

  const questionCallBack = (isQuit = false) => {
    if (isQuit) {
      setTakenQuiz(true);
      setShowQuestions(false);
    } else {
      setShowQuestions(false);
      setShowScore(true);
    }
  };

  const backToHome = () => {
    setTakenQuiz(true);
    setShowScore(false);
    setViewAnswers(false);
  };

  const showAnswers = (e: any) => {
    triggerAnalytics({ e, analytics, defaultObj, handleTrack });
    setShowScore(false);
    setViewAnswers(true);
  };

  useEffect(() => {
    if (content.questions.length > 0) {
      const formatData = content.questions.map((question: any, key: number) => {
        return {
          question_key: key + 1,
          question: question.question,
          question_type: question.question_type,
          options: question.options_compound_fields.map((option: any) => {
            return {
              option_id: option.option_id,
              option_image: option.option_image.url,
              is_correct: option.is_correct,
              option_text: option.option_text,
            };
          }),
          answers: "",
          is_correct: false,
          is_image_option: question.is_image_option,
        };
      });
      setQuizData(formatData);
    }
  }, [content.questions]);

  const getDefaultCroppedImage = (
    publishedImages: [],
    originalImage: any,
    defaultRatio = "landscape",
  ) => {
    const landscapeImg = publishedImages.find(
      ({ aspect_ratio }: any) => aspect_ratio === defaultRatio,
    );
    const { folder_path: imgUrl = "" } = landscapeImg || {};
    // const { gcpUrl, bucketName } = secondaryArgs;
    const { gcpUrl, bucketName } = nullToObject(secondaryArgs);
    return `url('${gcpUrl}/${bucketName}/${imgUrl}.webp'), url('${gcpUrl}/${bucketName}/${imgUrl}.${originalImage.ext}')`;
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

  useEffect(() => {
    const takenQuizes = JSON.parse(localStorage.getItem("TakenQuizes") || "[]");
    if (takenQuizes?.includes(content.page)) {
      setTakenQuiz(true);
    }
  }, [content]);

  const retakeQuiz = (e: any) => {
    // const takenQuizes = JSON.parse(localStorage.getItem('TakenQuizes') || '[]');
    // if (takenQuizes?.includes(content.page)) {
    //     const removeItem = takenQuizes.filter((x: string) => x !== content.page);
    //     if (removeItem.length === 0) {
    //         localStorage.removeItem('TakenQuizes');
    //     } else {
    //         localStorage.setItem('TakenQuizes', JSON.stringify([...removeItem]));
    //     }
    setTakenQuiz(false);
    setShowQuestions(true);
    // }
    triggerAnalytics({ e, analytics, defaultObj, handleTrack });
  };

  const onClickClose = () => {
    if (typeof window !== "undefined")
      window.open(secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint, "_self");
  };

  /**
   * reTake and start social share component
   * @returns component
   */
  const shareComponentRender = () => {
    return (
      <Box sx={{ marginTop: "32px" }}>
        <Typography variant='subtitle2' color='textColor'>
          {t("share_text")}
        </Typography>
        <Share
          domainUrl={getQuizUrl()}
          shareUrl={content?.settings?.socialog_url}
          embedData={embedData}
          whiteIcon={true}
          border='1px solid #fff'
        />
      </Box>
    );
  };

  return (
    <div ref={authoringHelper?.innerRef}>
      <div ref={ref}>
        <QuizContext.Provider value={quizData}>
          {showQuestions ? (
            <QuestionIndex
              data={content.questions}
              callBack={questionCallBack}
              setQuizData={setQuizData}
              analytics={analytics}
              defaultObj={defaultObj}
              enablePreview={enablePreview}
              fetchCroppedUrl={fetchCroppedUrl}
            />
          ) : showScore ? (
            <ScoreScreen
              data={content}
              backToHome={backToHome}
              showAnswers={showAnswers}
              fetchCroppedUrl={fetchCroppedUrl}
            />
          ) : viewAnswers ? (
            <ViewAnswers
              backToHome={backToHome}
              background={content.background_content}
              publishedImages={content.published_images}
              fetchCroppedUrl={fetchCroppedUrl}
            />
          ) : (
            <Box
              sx={{
                position: "relative",
                backgroundImage:
                  content.background_content.objectType === "image"
                    ? // ? `url(${content.background_content.Url})`
                      fetchCroppedUrl(
                        content.background_content.Url,
                        content.published_images,
                        {
                          1440: "hero",
                          1280: "landscape",
                          1024: "card2",
                          768: "square",
                          600: "card1",
                          320: "portrait",
                        },
                        content.original_image,
                      )
                    : "",
                backgroundColor:
                  content.background_content.objectType === "image"
                    ? "black"
                    : content.background_content.Color,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: "100vh",
              }}>
              {!enablePreview && (
                <Button
                  sx={{
                    minWidth: { xs: "34px" },
                    height: "34px",
                    width: "34px",
                    padding: { xs: "0px" },
                    marginRight: "7px",
                    position: "absolute",
                    right: { xs: "8px", md: "63px" },
                    top: { xs: "20px", md: "53px" },
                  }}
                  onClick={onClickClose}>
                  <img src={CloseIcon} alt='Close Icon' />
                </Button>
              )}
              <Box
                sx={{
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  width: "100%",
                  height: "100vh",
                  display: "flex",
                }}>
                <Box
                  sx={{
                    maxWidth: { xs: "100%", md: "700px", lg: "800px" },
                    display: "flex",
                    alignSelf: "flex-end",
                  }}>
                  <Grid
                    sx={{
                      padding: { xs: "0 15px 72px", md: "0 0 61px 63px" },
                      display: "flex",
                      flexDirection: "column",
                    }}>
                    <Typography variant='h1bold' color='textColor'>
                      {content.title}
                    </Typography>
                    <Typography
                      variant='h5medium'
                      color='textColor'
                      sx={{ margin: "12px 0 12px 0" }}>
                      {content.description}
                    </Typography>
                    {takenQuiz ? (
                      <>
                        <Typography
                          variant='h5medium'
                          color='textColor'
                          sx={{
                            width: "100%",
                            display: "inline-block",
                            marginBottom: "10px",
                          }}>
                          {t("already_taken_quiz")}
                        </Typography>

                        <Button
                          variant='defaultButton1'
                          sx={{ maxWidth: "fit-content", marginTop: "12px" }}
                          onClick={retakeQuiz}
                          className='sm'>
                          {t("retake_quiz")}
                        </Button>

                        {shareComponentRender()}
                      </>
                    ) : (
                      <>
                        <Button
                          variant='defaultButton1'
                          sx={{ maxWidth: "fit-content", marginTop: "12px" }}
                          endIcon={<ArrowRightAltIcon />}
                          onClick={OnClickStart}
                          className='sm'>
                          {t("start_quiz_test")}
                        </Button>

                        {shareComponentRender()}
                      </>
                    )}
                  </Grid>
                </Box>
              </Box>
            </Box>
          )}
        </QuizContext.Provider>
      </div>
    </div>
  );
};

interface QuizProps {
  content: any;
  analytics: Analytics;
  authoringHelper?: any;
  secondaryArgs?: SecondaryArgs;
  enablePreview?: boolean;
}
interface SecondaryArgs {
  prelemBaseEndpoint?: PrelemBaseEndpoint;
  gcpUrl: string;
  bucketName: string;
}
interface PrelemBaseEndpoint {
  PublishEndPoint?: string;
  language?: string;
  buttonBaseUrl?: ButtonBaseUrl;
}
interface ButtonBaseUrl {
  buttonBaseUrl?: string;
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

Quiz.defaultProps = {
  content: {
    page: "quiz-rendering",
    title: "EARTH DAY QUIZ",
    description: "How much do you know about our earth? Test your knowledge!",
    background_content: {
      objectType: "image",
      Url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/4f9583d9-775a-46a1-ac21-8244434c09fc/content",
      Color: "", //[ "#b29a53", "#ba8b78", "#ae6958", "#d86057", "#b75c8d"]
    },
    display_scores: "Percentage",
    result_range_1: "The way to get started is to quit talking and begin doing 1-24",
    result_range_2: "The way to get started is to quit talking and begin doing 25-49",
    result_range_3: "The way to get started is to quit talking and begin doing 50-74",
    result_range_4: "The way to get started is to quit talking and begin doing 75-100",
    questions: [
      {
        question_type: "Single",
        question: "What two  metals make up Earth’s core?",
        short_description: "What is the term that signifies the shape of the earth?",
        background_content: {
          Url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/1989d63f-ee02-4cc5-946d-059b362637ea/content",
          IsImage: true,
          Title: "Question Background Image",
          Description: "Question Background Image",
          ColorCode: "",
        },
        is_image_option: false,
        options_compound_fields: [
          {
            option_id: 1,
            option_image: {
              url: "",
              title: "Option Image",
            },
            is_correct: true,
            option_text: "Iron and Silver",
          },
          {
            option_id: 2,
            option_image: {
              url: "",
              title: "Option Image",
            },
            is_correct: false,
            option_text: "Lead and Platinum",
          },
          {
            option_id: 3,
            option_image: {
              url: "",
              title: "Option Image",
            },
            is_correct: false,
            option_text: "Iron and Nickel",
          },
          {
            option_id: 4,
            option_image: {
              url: "",
              title: "Option Image",
            },
            is_correct: false,
            option_text: "Gold and Copper",
          },
        ],
        published_images: [
          {
            aspect_ratio: "landscape",
            bucket_path:
              "https://storage.googleapis.com/cropped_image_public/1684736901611/public/jpg/pic_lineup-landscape",
            folder_path: "cropped_image_public/1684736901611/public/jpg/pic_lineup",
            visibility: "public",
            ext: "jpg",
          },
          {
            aspect_ratio: "square",
            bucket_path:
              "https://storage.googleapis.com/cropped_image_public/1684736901611/public/jpg/pic_lineup-square",
            folder_path: "cropped_image_public/1684736901611/public/jpg/pic_lineup",
            visibility: "public",
            ext: "jpg",
          },
          {
            aspect_ratio: "portrait",
            bucket_path:
              "https://storage.googleapis.com/cropped_image_public/1684736901611/public/jpg/pic_lineup-portrait",
            folder_path: "cropped_image_public/1684736901611/public/jpg/pic_lineup",
            visibility: "public",
            ext: "jpg",
          },
          {
            aspect_ratio: "hero",
            bucket_path:
              "https://storage.googleapis.com/cropped_image_public/1684736901611/public/jpg/pic_lineup-hero",
            folder_path: "cropped_image_public/1684736901611/public/jpg/pic_lineup",
            visibility: "public",
            ext: "jpg",
          },
          {
            aspect_ratio: "card1",
            bucket_path:
              "https://storage.googleapis.com/cropped_image_public/1684736901611/public/jpg/pic_lineup-card1",
            folder_path: "cropped_image_public/1684736901611/public/jpg/pic_lineup",
            visibility: "public",
            ext: "jpg",
          },
          {
            aspect_ratio: "card2",
            bucket_path:
              "https://storage.googleapis.com/cropped_image_public/1684736901611/public/jpg/pic_lineup-card2",
            folder_path: "cropped_image_public/1684736901611/public/jpg/pic_lineup",
            visibility: "public",
            ext: "jpg",
          },
        ],
      },
      {
        question_type: "Multiple",
        question: "What words describes the bend of a river?",
        short_description: "",
        background_content: {
          Url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/7e2088c7-0a04-4743-8243-f3340d64dcd5/content",
          IsImage: true,
          Title: "Question Background Image",
          Description: "Question Background Image",
          ColorCode: "",
        },
        is_image_option: false,
        options_compound_fields: [
          {
            option_id: 1,
            option_image: {
              url: "",
              title: "Option Image",
            },
            is_correct: true,
            option_text: "Manger",
          },
          {
            option_id: 2,
            option_image: {
              url: "",
              title: "Option Image",
            },
            is_correct: true,
            option_text: "Meander",
          },
          {
            option_id: 3,
            option_image: {
              url: "",
              title: "Option Image",
            },
            is_correct: false,
            option_text: "Maraud",
          },
          {
            option_id: 4,
            option_image: {
              url: "",
              title: "Option Image",
            },
            is_correct: false,
            option_text: "Mendicate",
          },
        ],
        published_images: [
          {
            aspect_ratio: "landscape",
            bucket_path:
              "https://storage.googleapis.com/cropped_image_public/1684736901611/public/jpg/pic_lineup-landscape",
            folder_path: "cropped_image_public/1684736901611/public/jpg/pic_lineup",
            visibility: "public",
            ext: "jpg",
          },
          {
            aspect_ratio: "square",
            bucket_path:
              "https://storage.googleapis.com/cropped_image_public/1684736901611/public/jpg/pic_lineup-square",
            folder_path: "cropped_image_public/1684736901611/public/jpg/pic_lineup",
            visibility: "public",
            ext: "jpg",
          },
          {
            aspect_ratio: "portrait",
            bucket_path:
              "https://storage.googleapis.com/cropped_image_public/1684736901611/public/jpg/pic_lineup-portrait",
            folder_path: "cropped_image_public/1684736901611/public/jpg/pic_lineup",
            visibility: "public",
            ext: "jpg",
          },
          {
            aspect_ratio: "hero",
            bucket_path:
              "https://storage.googleapis.com/cropped_image_public/1684736901611/public/jpg/pic_lineup-hero",
            folder_path: "cropped_image_public/1684736901611/public/jpg/pic_lineup",
            visibility: "public",
            ext: "jpg",
          },
          {
            aspect_ratio: "card1",
            bucket_path:
              "https://storage.googleapis.com/cropped_image_public/1684736901611/public/jpg/pic_lineup-card1",
            folder_path: "cropped_image_public/1684736901611/public/jpg/pic_lineup",
            visibility: "public",
            ext: "jpg",
          },
          {
            aspect_ratio: "card2",
            bucket_path:
              "https://storage.googleapis.com/cropped_image_public/1684736901611/public/jpg/pic_lineup-card2",
            folder_path: "cropped_image_public/1684736901611/public/jpg/pic_lineup",
            visibility: "public",
            ext: "jpg",
          },
        ],
      },
      {
        question_type: "Single",
        question: "What word describe hot molten rock found inside the Earth?",
        short_description: "",
        background_content: {
          Url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/e6f5e4eb-5576-4c6a-b3c3-60a7cf62af22/content",
          IsImage: true,
          Title: "Question Background Image",
          Description: "Question Background Image",
          ColorCode: "",
        },
        is_image_option: true,
        options_compound_fields: [
          {
            option_id: 1,
            option_image: {
              url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/ebfc4d5c-5bfd-498c-b6af-04ed2b6a7ebb/content",
              title: "Option Image",
            },
            is_correct: true,
            option_text: "Magma",
          },
          {
            option_id: 2,
            option_image: {
              url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/3b01f39f-ce35-4b66-839e-482f151442e7/content",
              title: "Option Image",
            },
            is_correct: false,
            option_text: "Crust",
          },
          {
            option_id: 3,
            option_image: {
              url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/cd6f440d-9310-445d-81a6-f20712f25a1c/content",
              title: "Option Image",
            },
            is_correct: false,
            option_text: "Lava",
          },
          {
            option_id: 4,
            option_image: {
              url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/84eaa66f-8c89-4f37-8517-8e0d0fbb7ec4/content",
              title: "Option Image",
            },
            is_correct: false,
            option_text: "Mantle",
          },
        ],
        published_images: [
          {
            aspect_ratio: "landscape",
            bucket_path:
              "https://storage.googleapis.com/cropped_image_public/1684736901611/public/jpg/pic_lineup-landscape",
            folder_path: "cropped_image_public/1684736901611/public/jpg/pic_lineup",
            visibility: "public",
            ext: "jpg",
          },
          {
            aspect_ratio: "square",
            bucket_path:
              "https://storage.googleapis.com/cropped_image_public/1684736901611/public/jpg/pic_lineup-square",
            folder_path: "cropped_image_public/1684736901611/public/jpg/pic_lineup",
            visibility: "public",
            ext: "jpg",
          },
          {
            aspect_ratio: "portrait",
            bucket_path:
              "https://storage.googleapis.com/cropped_image_public/1684736901611/public/jpg/pic_lineup-portrait",
            folder_path: "cropped_image_public/1684736901611/public/jpg/pic_lineup",
            visibility: "public",
            ext: "jpg",
          },
          {
            aspect_ratio: "hero",
            bucket_path:
              "https://storage.googleapis.com/cropped_image_public/1684736901611/public/jpg/pic_lineup-hero",
            folder_path: "cropped_image_public/1684736901611/public/jpg/pic_lineup",
            visibility: "public",
            ext: "jpg",
          },
          {
            aspect_ratio: "card1",
            bucket_path:
              "https://storage.googleapis.com/cropped_image_public/1684736901611/public/jpg/pic_lineup-card1",
            folder_path: "cropped_image_public/1684736901611/public/jpg/pic_lineup",
            visibility: "public",
            ext: "jpg",
          },
          {
            aspect_ratio: "card2",
            bucket_path:
              "https://storage.googleapis.com/cropped_image_public/1684736901611/public/jpg/pic_lineup-card2",
            folder_path: "cropped_image_public/1684736901611/public/jpg/pic_lineup",
            visibility: "public",
            ext: "jpg",
          },
        ],
      },
      {
        question_type: "Single",
        question: "What word describe hot molten rock found inside the Earth?",
        short_description: "",
        background_content: {
          Url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/e6f5e4eb-5576-4c6a-b3c3-60a7cf62af22/content",
          IsImage: true,
          Title: "Question Background Image",
          Description: "Question Background Image",
          ColorCode: "",
        },
        is_image_option: true,
        options_compound_fields: [
          {
            option_id: 1,
            option_image: {
              url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/ebfc4d5c-5bfd-498c-b6af-04ed2b6a7ebb/content",
              title: "Option Image",
            },
            is_correct: true,
            option_text: "Magma",
          },
          {
            option_id: 2,
            option_image: {
              url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/3b01f39f-ce35-4b66-839e-482f151442e7/content",
              title: "Option Image",
            },
            is_correct: false,
            option_text: "Crust",
          },
          {
            option_id: 3,
            option_image: {
              url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/cd6f440d-9310-445d-81a6-f20712f25a1c/content",
              title: "Option Image",
            },
            is_correct: false,
            option_text: "Lava",
          },
          {
            option_id: 4,
            option_image: {
              url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/84eaa66f-8c89-4f37-8517-8e0d0fbb7ec4/content",
              title: "Option Image",
            },
            is_correct: false,
            option_text: "Mantle",
          },
          {
            option_id: 5,
            option_image: {
              url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/3b01f39f-ce35-4b66-839e-482f151442e7/content",
              title: "Option Image",
            },
            is_correct: false,
            option_text: "Crust",
          },
          {
            option_id: 6,
            option_image: {
              url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/cd6f440d-9310-445d-81a6-f20712f25a1c/content",
              title: "Option Image",
            },
            is_correct: false,
            option_text: "Lava",
          },
          {
            option_id: 7,
            option_image: {
              url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/84eaa66f-8c89-4f37-8517-8e0d0fbb7ec4/content",
              title: "Option Image",
            },
            is_correct: false,
            option_text: "Mantle",
          },
          {
            option_id: 8,
            option_image: {
              url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/3b01f39f-ce35-4b66-839e-482f151442e7/content",
              title: "Option Image",
            },
            is_correct: false,
            option_text: "Crust",
          },
          {
            option_id: 9,
            option_image: {
              url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/cd6f440d-9310-445d-81a6-f20712f25a1c/content",
              title: "Option Image",
            },
            is_correct: false,
            option_text: "Lava",
          },
          {
            option_id: 10,
            option_image: {
              url: " https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/84eaa66f-8c89-4f37-8517-8e0d0fbb7ec4/content",
              title: "Option Image",
            },
            is_correct: false,
            option_text: "Mantle",
          },
        ],
        published_images: [
          {
            aspect_ratio: "landscape",
            bucket_path:
              "https://storage.googleapis.com/cropped_image_public/1684736901611/public/jpg/pic_lineup-landscape",
            folder_path: "cropped_image_public/1684736901611/public/jpg/pic_lineup",
            visibility: "public",
            ext: "jpg",
          },
          {
            aspect_ratio: "square",
            bucket_path:
              "https://storage.googleapis.com/cropped_image_public/1684736901611/public/jpg/pic_lineup-square",
            folder_path: "cropped_image_public/1684736901611/public/jpg/pic_lineup",
            visibility: "public",
            ext: "jpg",
          },
          {
            aspect_ratio: "portrait",
            bucket_path:
              "https://storage.googleapis.com/cropped_image_public/1684736901611/public/jpg/pic_lineup-portrait",
            folder_path: "cropped_image_public/1684736901611/public/jpg/pic_lineup",
            visibility: "public",
            ext: "jpg",
          },
          {
            aspect_ratio: "hero",
            bucket_path:
              "https://storage.googleapis.com/cropped_image_public/1684736901611/public/jpg/pic_lineup-hero",
            folder_path: "cropped_image_public/1684736901611/public/jpg/pic_lineup",
            visibility: "public",
            ext: "jpg",
          },
          {
            aspect_ratio: "card1",
            bucket_path:
              "https://storage.googleapis.com/cropped_image_public/1684736901611/public/jpg/pic_lineup-card1",
            folder_path: "cropped_image_public/1684736901611/public/jpg/pic_lineup",
            visibility: "public",
            ext: "jpg",
          },
          {
            aspect_ratio: "card2",
            bucket_path:
              "https://storage.googleapis.com/cropped_image_public/1684736901611/public/jpg/pic_lineup-card2",
            folder_path: "cropped_image_public/1684736901611/public/jpg/pic_lineup",
            visibility: "public",
            ext: "jpg",
          },
        ],
      },
      {
        question_type: "Single",
        question: "Which is the closest star to Earth?",
        short_description: "",
        background_content: {
          Url: "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/d0f2224b-b294-46d6-961a-c306808329fb/content",
          //https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/7e2088c7-0a04-4743-8243-f3340d64dcd5/content',
          IsImage: true,
          Title: "Question Background Image",
          Description: "Question Background Image",
          ColorCode: "",
        },
        is_image_option: false,
        options_compound_fields: [
          {
            option_id: 1,
            option_image: {
              url: "",
              title: "Option Image",
            },
            is_correct: true,
            option_text: "Alpha Centauri A",
          },
          {
            option_id: 2,
            option_image: {
              url: "",
              title: "Option Image",
            },
            is_correct: false,
            option_text: "Moon",
          },
          {
            option_id: 3,
            option_image: {
              url: "",
              title: "Option Image",
            },
            is_correct: false,
            option_text: "Proxima Centauri",
          },
          {
            option_id: 4,
            option_image: {
              url: "",
              title: "Option Image",
            },
            is_correct: false,
            option_text: "Alpha Centauri B",
          },
          {
            option_id: 5,
            option_image: {
              url: "",
              title: "Option Image",
            },
            is_correct: false,
            option_text: "Sun",
          },
          {
            option_id: 6,
            option_image: {
              url: "",
              title: "Option Image",
            },
            is_correct: false,
            option_text: "Milky Way",
          },
          {
            option_id: 7,
            option_image: {
              url: "",
              title: "Option Image",
            },
            is_correct: false,
            option_text: "Sirius",
          },
          {
            option_id: 8,
            option_image: {
              url: "",
              title: "Option Image",
            },
            is_correct: false,
            option_text: "Luhman 16",
          },
          {
            option_id: 9,
            option_image: {
              url: "",
              title: "Option Image",
            },
            is_correct: false,
            option_text: "Proxima Centaur",
          },
          {
            option_id: 10,
            option_image: {
              url: "",
              title: "Option Image",
            },
            is_correct: false,
            option_text: "Wolf 359",
          },
          {
            option_id: 11,
            option_image: {
              url: "",
              title: "Option Image",
            },
            is_correct: false,
            option_text: "Epsilon Eridani",
          },
          {
            option_id: 12,
            option_image: {
              url: "",
              title: "Option Image",
            },
            is_correct: false,
            option_text: "Epsilon Indi",
          },
          {
            option_id: 13,
            option_image: {
              url: "",
              title: "Option Image",
            },
            is_correct: false,
            option_text: "Sigma Draconis",
          },
          {
            option_id: 14,
            option_image: {
              url: "",
              title: "Option Image",
            },
            is_correct: false,
            option_text: "36 Ophiuchi",
          },
          {
            option_id: 15,
            option_image: {
              url: "",
              title: "Option Image",
            },
            is_correct: false,
            option_text: "Delta Pavonis",
          },
        ],
        published_images: [
          {
            aspect_ratio: "landscape",
            bucket_path:
              "https://storage.googleapis.com/cropped_image_public/1684736901611/public/jpg/pic_lineup-landscape",
            folder_path: "cropped_image_public/1684736901611/public/jpg/pic_lineup",
            visibility: "public",
            ext: "jpg",
          },
          {
            aspect_ratio: "square",
            bucket_path:
              "https://storage.googleapis.com/cropped_image_public/1684736901611/public/jpg/pic_lineup-square",
            folder_path: "cropped_image_public/1684736901611/public/jpg/pic_lineup",
            visibility: "public",
            ext: "jpg",
          },
          {
            aspect_ratio: "portrait",
            bucket_path:
              "https://storage.googleapis.com/cropped_image_public/1684736901611/public/jpg/pic_lineup-portrait",
            folder_path: "cropped_image_public/1684736901611/public/jpg/pic_lineup",
            visibility: "public",
            ext: "jpg",
          },
          {
            aspect_ratio: "hero",
            bucket_path:
              "https://storage.googleapis.com/cropped_image_public/1684736901611/public/jpg/pic_lineup-hero",
            folder_path: "cropped_image_public/1684736901611/public/jpg/pic_lineup",
            visibility: "public",
            ext: "jpg",
          },
          {
            aspect_ratio: "card1",
            bucket_path:
              "https://storage.googleapis.com/cropped_image_public/1684736901611/public/jpg/pic_lineup-card1",
            folder_path: "cropped_image_public/1684736901611/public/jpg/pic_lineup",
            visibility: "public",
            ext: "jpg",
          },
          {
            aspect_ratio: "card2",
            bucket_path:
              "https://storage.googleapis.com/cropped_image_public/1684736901611/public/jpg/pic_lineup-card2",
            folder_path: "cropped_image_public/1684736901611/public/jpg/pic_lineup",
            visibility: "public",
            ext: "jpg",
          },
        ],
      },
    ],

    created_date: "2023-04-10T05:45:50Z",
    last_modified_date: "2023-04-10T05:45:50Z",
    last_modified_by: "Medha Gupta",
    current_page_url: "which-nintendo-game-involes-fighting-and-nintendo-characters",
    published_images: [
      {
        aspect_ratio: "landscape",
        bucket_path:
          "https://storage.googleapis.com/cropped_image_public/1684736901611/public/jpg/pic_lineup-landscape",
        folder_path: "cropped_image_public/1684736901611/public/jpg/pic_lineup",
        visibility: "public",
        ext: "jpg",
      },
      {
        aspect_ratio: "square",
        bucket_path:
          "https://storage.googleapis.com/cropped_image_public/1684736901611/public/jpg/pic_lineup-square",
        folder_path: "cropped_image_public/1684736901611/public/jpg/pic_lineup",
        visibility: "public",
        ext: "jpg",
      },
      {
        aspect_ratio: "portrait",
        bucket_path:
          "https://storage.googleapis.com/cropped_image_public/1684736901611/public/jpg/pic_lineup-portrait",
        folder_path: "cropped_image_public/1684736901611/public/jpg/pic_lineup",
        visibility: "public",
        ext: "jpg",
      },
      {
        aspect_ratio: "hero",
        bucket_path:
          "https://storage.googleapis.com/cropped_image_public/1684736901611/public/jpg/pic_lineup-hero",
        folder_path: "cropped_image_public/1684736901611/public/jpg/pic_lineup",
        visibility: "public",
        ext: "jpg",
      },
      {
        aspect_ratio: "card1",
        bucket_path:
          "https://storage.googleapis.com/cropped_image_public/1684736901611/public/jpg/pic_lineup-card1",
        folder_path: "cropped_image_public/1684736901611/public/jpg/pic_lineup",
        visibility: "public",
        ext: "jpg",
      },
      {
        aspect_ratio: "card2",
        bucket_path:
          "https://storage.googleapis.com/cropped_image_public/1684736901611/public/jpg/pic_lineup-card2",
        folder_path: "cropped_image_public/1684736901611/public/jpg/pic_lineup",
        visibility: "public",
        ext: "jpg",
      },
    ],
  },
};

export default Quiz;
