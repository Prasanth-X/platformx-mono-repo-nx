import { ArrowRightAlt } from '@mui/icons-material';
import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import usePlatformAnalytics from 'platform-x-utils/dist/analytics';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { breakpoints } from '../../Common/ConstantData';
import loadergif from '../../assets/holi-loader.gif';
import CloseIcon from '../../assets/svgIcon/Cross.svg';
import '../../service/i18n';
import {
  nullToObject,
  relativeImageURL,
  triggerAnalytics,
} from '../../utils/helperFns';
import Share from '../Share/Share';
import PollContext from './PollContext';
import QuestionIndex from './QuestionIndex';
import Result from './Result';

const Poll = ({
  content,
  onSubmit,
  results = [],
  showLoading = false,
  analytics,
  authoringHelper,
  secondaryArgs,
  enablePreview = false,
}: PollProps) => {
  const [showQuestion, setShowQuestion] = useState<boolean>(false);
  const [pollData, setPollData] = useState<any>({});
  const [showResult, setShowResult] = useState<boolean>(false);
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const less_than_320 = useMediaQuery(theme.breakpoints.only('xs'));
  const less_than_600 = useMediaQuery(theme.breakpoints.only('sm'));
  const less_than_768 = useMediaQuery(theme.breakpoints.only('md'));
  const less_than_1024 = useMediaQuery(theme.breakpoints.only('em'));
  const less_than_1280 = useMediaQuery(theme.breakpoints.only('lg'));
  const less_than_1440 = useMediaQuery(theme.breakpoints.only('xl'));

  const getPollUrl = () => {
    const id = content?.current_page_url;
    if (secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint) {
      return `${secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint}${secondaryArgs?.prelemBaseEndpoint?.language}/poll${id}`;
    } else {
      return `/poll${id}`;
    }
  };

  const publishUrl = secondaryArgs?.prelemBaseEndpoint?.buttonBaseUrl || '';
  const language = secondaryArgs?.prelemBaseEndpoint?.language || '';
  const embedPageURL =
    publishUrl + language + '/embed/poll' + content?.current_page_url;
  const landingPageURL =
    publishUrl + language + '/poll' + content?.current_page_url;
  const embedData = {
    Title: content?.title,
    Description: content?.description,
    Thumbnail: relativeImageURL(
      secondaryArgs?.gcpUrl,
      secondaryArgs?.bucketName,
      content?.original_image?.original_image_relative_path,
      content?.original_image?.ext
    ),
    Author: content?.createdBy,
    creationDate: content?.creationDate,
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
  // const url = new URL(window.location.href);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      i18n.changeLanguage(secondaryArgs?.prelemBaseEndpoint?.language);
      // i18n.changeLanguage(url.pathname.split("/")[1]);
    }
  }, []);
  const defaultStructureData = () => {
    let PollStructureData;
    try {
      PollStructureData = {
        '@context': 'https://schema.org',
        '@type': 'Poll',
        name: content.title,
        description: content.description,
        hasPart:
          content.questions.length > 0 &&
          content?.questions.map(({ question }: any) => {
            return {
              '@type': 'Question',
              name: question,
              suggestedAnswer:
                question.options_compound_fields.length > 0 &&
                question.options_compound_fields.map(
                  ({ option_id, option_text }: any) => {
                    return {
                      '@type': 'Answer',
                      position: option_id,
                      text: option_text,
                    };
                  }
                ),
            };
          }),
      };
    } catch (e) {
      PollStructureData = {};
    }

    return PollStructureData;
  };

  const generateStructureData = () => {
    let PollStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(
        stringifyStructureData || ''
      );

      if (String(tempSD).length > 0) {
        PollStructureData = JSON.parse(tempSD);
      } else {
        PollStructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      PollStructureData = defaultStructureData();
    }
    return PollStructureData;
  };

  const setPollDataHandle = (item: any = {}) => {
    setPollData(item);
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = generateStructureData();
      const stringifyStructureData =
        structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(
        stringifyStructureData || ''
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content.questions]);

  const onClickStart = (e: any) => {
    setShowQuestion(true);
    triggerAnalytics({ e, analytics, defaultObj, handleTrack });
  };

  const onClickClose = () => {
    if (typeof window !== 'undefined')
      window.open(secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint, '_self');
  };

  const callBackFromResult = (e: any) => {
    triggerAnalytics({ e, analytics, defaultObj, handleTrack });
    setShowResult(false);
  };

  const {
    title = '',
    description = '',
    background_content: background = {},
    options_compound_fields: options = [],
    createdBy = '',
    published_images = [],
    original_image = {},
  } = content || {};
  const { objectType = 'color', Url = '', Color = 'black' } = background || {};

  const getDefaultCroppedImage = (
    publishedImages: [],
    originalImage: any | {} = {},
    defaultRatio: any = 'landscape'
  ) => {
    const landscapeImg = publishedImages.find(
      ({ aspect_ratio }: any) => aspect_ratio === defaultRatio
    );
    const { folder_path: imgUrl = '' } = landscapeImg || {};
    const { gcpUrl, bucketName } = nullToObject(secondaryArgs);
    return `url('${gcpUrl}/${bucketName}/${imgUrl}.webp'), url('${gcpUrl}/${bucketName}/${imgUrl}.${originalImage.ext}')`;
  };

  const makePollData = () => {
    return {
      document_path: content.document_path,
      title,
      options: options.map((option: any) => {
        return {
          option_id: option.option_id,
          option_image: { url: option.option_image.url },
          option_text: option.option_text,
          count: '',
          percentage: '',
        };
      }),
      status: true,
      total_vote: 0,
      start_date: content.start_date,
      end_date: content.end_date,
      created_by: createdBy,
    };
  };

  useEffect(() => {
    const formatData = makePollData();
    setPollData(formatData);
  }, [content]);

  const fetchCroppedUrl = (
    imageUrl: string,
    publishedImages: [],
    imgOrder = {},
    originalImage = {}
  ) => {
    let returnUrl = '';
    if (publishedImages && publishedImages.length > 0) {
      if (less_than_320) {
        returnUrl = getDefaultCroppedImage(
          publishedImages,
          originalImage,
          imgOrder?.['320'] || breakpoints['320']
        );
      } else if (less_than_600) {
        returnUrl = getDefaultCroppedImage(
          publishedImages,
          originalImage,
          imgOrder?.['600'] || breakpoints['600']
        );
      } else if (less_than_768) {
        returnUrl = getDefaultCroppedImage(
          publishedImages,
          originalImage,
          imgOrder?.['768'] || breakpoints['768']
        );
      } else if (less_than_1024) {
        returnUrl = getDefaultCroppedImage(
          publishedImages,
          originalImage,
          imgOrder?.['1024'] || breakpoints['1024']
        );
      } else if (less_than_1280) {
        returnUrl = getDefaultCroppedImage(
          publishedImages,
          originalImage,
          imgOrder?.['1280'] || breakpoints['1280']
        );
      } else if (less_than_1440) {
        returnUrl = getDefaultCroppedImage(
          publishedImages,
          originalImage,
          imgOrder?.['1440'] || breakpoints['1440']
        );
      } else {
        returnUrl = getDefaultCroppedImage(
          publishedImages,
          originalImage,
          imgOrder?.['1440'] || breakpoints['1440']
        );
      }
    } else {
      if (imageUrl.search('dspace') !== -1) {
        //normal dspace url
        returnUrl = imageUrl;
      }
    }
    return returnUrl;
  };

  const onStaticSubmit = () => {
    if (results.length > 0 && Object.keys(pollData).length !== 0) {
      const tempOptions = pollData.options.map((option: any) => {
        const currentOpt = results.find(
          (x: any) => x.option_id === option.option_id
        );
        return {
          ...option,
          count: currentOpt.count,
          percentage: currentOpt.percentage,
        };
      });
      setPollData({
        ...pollData,
        options: tempOptions.sort((a: any, b: any) => b.count - a.count),
      });
      setShowQuestion(false);
      setShowResult(true);
    }
  };

  useEffect(() => {
    const formatData = makePollData();
    const takenPoles = JSON.parse(localStorage.getItem('TakenPoles') || '[]');
    const isResultPopup = takenPoles?.includes(content.page);
    if (results.length > 0) {
      if (isResultPopup) {
        const tempOptions = formatData.options.map((option: any) => {
          const currentOpt = results.find(
            (x: any) => x.option_id === option.option_id
          );
          return {
            ...option,
            count: currentOpt.count,
            percentage: currentOpt.percentage,
          };
        });
        setPollData({
          ...formatData,
          options: tempOptions.sort((a: any, b: any) => b.count - a.count),
        });
        setShowQuestion(false);
        setShowResult(true);
      }
    }
  }, [results]);

  return (
    <div ref={authoringHelper?.innerRef}>
      <div ref={ref}>
        <PollContext.Provider value={pollData}>
          {showResult ? (
            <Result
              data={content}
              callBack={callBackFromResult}
              onClickClose={onClickClose}
              fetchCroppedUrl={fetchCroppedUrl}
            />
          ) : showQuestion ? (
            <QuestionIndex
              data={content}
              onSubmit={onSubmit || onStaticSubmit}
              setShowQuestion={setShowQuestion}
              setPollDataHandle={setPollDataHandle}
              analytics={analytics}
              defaultObj={defaultObj}
              showLoading={showLoading}
              enablePreview={enablePreview}
              fetchCroppedUrl={fetchCroppedUrl}
            />
          ) : (
            <Box
              sx={{
                backgroundImage:
                  objectType === 'image'
                    ? fetchCroppedUrl(
                        Url,
                        published_images,
                        {
                          1440: 'hero',
                          1280: 'landscape',
                          1024: 'card2',
                          768: 'square',
                          600: 'card1',
                          320: 'portrait',
                        },
                        original_image
                      )
                    : '',
                backgroundColor: objectType === 'image' ? 'black' : Color,
                position: 'relative',
                alignItems: 'flex-end',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                height: '100vh',
                margin: '0',
                display: 'flex',
              }}
            >
              {!enablePreview && (
                <Button
                  sx={{
                    minWidth: { xs: '34px' },
                    height: '34px',
                    width: '34px',
                    padding: '0px !important',
                    marginRight: '7px',
                    position: 'absolute',
                    right: { xs: '8px', md: '63px' },
                    top: { xs: '20px', md: '53px' },
                  }}
                  onClick={onClickClose}
                >
                  <img
                    src={CloseIcon}
                    style={{ width: '100%' }}
                    alt="Close Icon"
                  />
                </Button>
              )}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  width: '100%',
                  height: '100vh',
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                }}
              >
                {!showLoading ? (
                  <Grid
                    sx={{
                      padding: { xs: '0 15px 72px', md: '0 0 61px 63px' },
                      maxWidth: { xs: '100%', md: '700px', lg: '900px' },
                      color: '#fff',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography variant="h1bold" color="textColor">
                      {title}
                    </Typography>
                    <Typography
                      variant="h5medium"
                      color="textColor"
                      sx={{ margin: '12px 0 12px 0' }}
                    >
                      {description}
                    </Typography>
                    <Button
                      variant="defaultButton1"
                      sx={{ maxWidth: 'fit-content', marginTop: '12px' }}
                      endIcon={<ArrowRightAlt />}
                      onClick={onClickStart}
                      className="sm"
                    >
                      {t('start_poll_text')}
                    </Button>

                    <Box sx={{ marginTop: '32px' }}>
                      <Typography variant="subtitle2" color="textColor">
                        {t('share_text')}
                      </Typography>
                      <Share
                        domainUrl={getPollUrl()}
                        shareUrl={content?.settings?.socialog_url}
                        embedData={embedData}
                        whiteIcon={true}
                        border="1px solid #fff"
                      />
                    </Box>
                  </Grid>
                ) : (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <img
                      alt="Poll1"
                      src={loadergif}
                      style={{ width: '80px', borderRadius: '5px' }}
                    />
                  </Box>
                )}
              </Box>
            </Box>
          )}
        </PollContext.Provider>
      </div>
    </div>
  );
};

interface PollProps {
  content: any;
  showLoading: boolean;
  onSubmit: (a: any) => void;
  results: any;
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
// Poll.defaultProps = {
//   content: {
//     "structure_data": "{\"@context\":\"https://schema.org\",\"@type\":\"VoteAction\",\"name\":\"Best option for DS\",\"description\":\"Best option for DS\",\"url\":\"https://dev.hcl-x.com/en/poll/algorithm\",\"startTime\":\"2023-08-17T09:35:47.309Z\",\"option\":[\"Big o notation\",\"Quadratic equation\",\"Binary search\"]}",
//     "seo_enable": true,
//     "is_image_option": false,
//     "user_action_info": {
//       "publishByDetails": {
//         "name": "vikalp",
//         "email": "",
//         "timeZone": "Asia/Kolkata",
//         "pubUnpubDateTime": "2023-08-17T09:35:49.397Z"
//       },
//       "unpublishByDetails": {
//         "email": "",
//         "name": "",
//         "timeZone": "Asia/Kolkata",
//         "pubUnpubDateTime": ""
//       }
//     },
//     "title": "Algorithms",
//     "tagging": "Poll",
//     "tag_name": "Poll",
//     "sitemap": false,
//     "short_description": "Algorithm",
//     "robot_txt": false,
//     "parent_page_url": "/",
//     "page_state": "PUBLISHED",
//     "page_lastmodifiedby": "vikalp rai saxena",
//     "page_createdby": "Sunil s",
//     "page": "algorithm",
//     "is_softdelete": false,
//     "is_edit": false,
//     "display_scores": "Count",
//     "description": "Algorithm",
//     "current_page_url": "/algorithm",
//     "createdBy": "Sunil s",
//     "creationDate": "2023-08-17T09:35:47Z",
//     "category": null,
//     "question_background_content": {
//       "objectType": "color",
//       "Url": "",
//       "Title": "",
//       "Thumbnail": "",
//       "Color": "#5c98ba",
//       "original_image": {},
//       "published_images": []
//     },
//     "background_content": {
//       "objectType": "image",
//       "Url": "1691500572542/public/jpeg/about-us-1440x620-image",
//       "Title": "",
//       "Thumbnail": "1691500572542/public/jpeg/about-us-1440x620-image",
//       "Color": "",
//       "ext": "jpeg"
//     },
//     "analytics_enable": true,
//     "poll_answer_image": null,
//     "poll_description": "Best option for DS",
//     "poll_result": null,
//     "poll_title": "Best option for DS",
//     "background_color": null,
//     "settings": {
//       "keywords": [
//         "Cristiano Ronaldo"
//       ],
//       "page_caching": false,
//       "page_mobile_friendly": false,
//       "is_schedule_publish": false,
//       "is_schedule_unpublish": false,
//       "seo_title": "Algorithm",
//       "seo_description": "Algorithm",
//       "seo_keywords": [
//         "Cristiano Ronaldo"
//       ],
//       "seo_blockIndexing": false,
//       "socialog_title": "Algorithms",
//       "socialog_description": "Algorithm",
//       "socialog_sitename": "Algorithms",
//       "socialog_type": "poll",
//       "socialog_url": "https://dev.hcl-x.com/en/poll/algorithm",
//       "socialog_image": "https://dev.dam.hcl-x.com/server/api/core/bitstreams/d2b99e79-0d11-4d6d-b115-257910810b54/content",
//       "socialog_twitter_title": "Algorithms",
//       "socialog_twitter_description": "Algorithm",
//       "socialog_twitter_image": "https://dev.dam.hcl-x.com/server/api/core/bitstreams/d2b99e79-0d11-4d6d-b115-257910810b54/content",
//       "socialog_twitter_url": "https://dev.hcl-x.com/en/poll/algorithm"
//     },
//     "poll_question": "Best option for DS",
//     "options_compound_fields": [
//       {
//         "option_image": {
//           "url": "",
//           "title": "Option Image"
//         },
//         "option_text": "Big o notation",
//         "option_id": "1"
//       },
//       {
//         "option_image": {
//           "url": "",
//           "title": "Option Image"
//         },
//         "option_text": "Quadratic equation",
//         "option_id": "2"
//       },
//       {
//         "option_image": {
//           "url": "",
//           "title": "Option Image"
//         },
//         "option_text": "Binary search",
//         "option_id": "3"
//       }
//     ],
//     "start_date": null,
//     "end_date": null,
//     "content_type": "Poll",
//     "last_modification_date": "2023-08-17T09:35:47Z",
//     "last_modified_by": "vikalp rai saxena",
//     "modificationDate": "2023-08-17T09:35:47.309Z",
//     "site_name": null,
//     "document_path": "/content/documents/hclplatformx/en/poll/algorithm",
//     "original_image": {
//       "original_image_relative_path": "1691500572542/public/jpeg/about-us-1440x620-image",
//       "bitStreamId": "d2b99e79-0d11-4d6d-b115-257910810b54",
//       "auto": true,
//       "ext": "jpeg",
//       "visibility": "public"
//     },
//     "published_images": [
//       {
//         "aspect_ratio": "hero",
//         "folder_path": "1691500572542/public/jpeg/about-us-1440x620-image-hero"
//       },
//       {
//         "aspect_ratio": "landscape",
//         "folder_path": "1691500572542/public/jpeg/about-us-1440x620-image-landscape"
//       },
//       {
//         "aspect_ratio": "portrait",
//         "folder_path": "1691500572542/public/jpeg/about-us-1440x620-image-portrait"
//       },
//       {
//         "aspect_ratio": "card1",
//         "folder_path": "1691500572542/public/jpeg/about-us-1440x620-image-card1"
//       },
//       {
//         "aspect_ratio": "square",
//         "folder_path": "1691500572542/public/jpeg/about-us-1440x620-image-square"
//       },
//       {
//         "aspect_ratio": "card2",
//         "folder_path": "1691500572542/public/jpeg/about-us-1440x620-image-card2"
//       }
//     ]
//   }
// };

Poll.defaultProps = {
  content: {
    structure_data:
      '{"@context":"https://schema.org","@type":"VoteAction","name":"question 1","description":"quest desc","url":"https://dev.hcl-x.com/en/poll/poll","startTime":"2023-08-11T14:08:44.370Z","option":["new","new1"]}',
    seo_enable: true,
    is_image_option: true,
    user_action_info: {
      publishByDetails: {
        name: 'vikalp',
        email: '',
        timeZone: 'Asia/Kolkata',
        pubUnpubDateTime: '2023-08-11T14:08:21.384Z',
      },
      unpublishByDetails: {
        email: '',
        name: '',
        timeZone: 'Asia/Kolkata',
        pubUnpubDateTime: '',
      },
    },
    title: 'poll',
    tagging: 'Poll',
    tag_name: 'Poll',
    sitemap: false,
    short_description: 'poll desc',
    robot_txt: false,
    parent_page_url: '/',
    page_state: 'PUBLISHED',
    page_lastmodifiedby: 'vikalp rai saxena',
    page_createdby: 'vikalp rai saxena',
    page: 'poll',
    is_softdelete: false,
    is_edit: false,
    display_scores: 'Percentage',
    description: 'poll desc',
    current_page_url: '/poll',
    createdBy: 'vikalp rai saxena',
    creationDate: '2023-08-11T14:08:44Z',
    category: null,
    question_background_content: {
      objectType: 'image',
      Url: 'https://dev.dam.hcl-x.com/server/api/core/bitstreams/fb5fef92-c906-4000-b311-9d098498d21e/content',
      Title: '',
      Thumbnail:
        'https://dev.dam.hcl-x.com/server/api/core/bitstreams/fb5fef92-c906-4000-b311-9d098498d21e/content',
      Color: '',
      original_image: {
        original_image_relative_path:
          '1691408200703/public/jpeg/broadband-commission-hero',
        bitStreamId: 'fb5fef92-c906-4000-b311-9d098498d21e',
        auto: true,
        ext: 'jpeg',
        visibility: 'public',
      },
      published_images: [
        {
          aspect_ratio: 'portrait',
          folder_path:
            '1691408200703/public/jpeg/broadband-commission-hero-portrait',
        },
        {
          aspect_ratio: 'card1',
          folder_path:
            '1691408200703/public/jpeg/broadband-commission-hero-card1',
        },
        {
          aspect_ratio: 'landscape',
          folder_path:
            '1691408200703/public/jpeg/broadband-commission-hero-landscape',
        },
        {
          aspect_ratio: 'hero',
          folder_path:
            '1691408200703/public/jpeg/broadband-commission-hero-hero',
        },
        {
          aspect_ratio: 'card2',
          folder_path:
            '1691408200703/public/jpeg/broadband-commission-hero-card2',
        },
        {
          aspect_ratio: 'square',
          folder_path:
            '1691408200703/public/jpeg/broadband-commission-hero-square',
        },
      ],
    },
    background_content: {
      objectType: 'image',
      Url: 'https://dev.dam.hcl-x.com/server/api/core/bitstreams/36d7680e-15f8-431e-b06f-c8b22949e10d/content',
      Title: '',
      Thumbnail:
        'https://dev.dam.hcl-x.com/server/api/core/bitstreams/36d7680e-15f8-431e-b06f-c8b22949e10d/content',
      Color: '',
    },
    analytics_enable: true,
    poll_answer_image: null,
    poll_description: 'quest desc',
    poll_result: null,
    poll_title: 'question 1',
    background_color: null,
    settings: {
      keywords: ['Cristiano Ronaldo'],
      page_caching: false,
      page_mobile_friendly: false,
      is_schedule_publish: false,
      is_schedule_unpublish: false,
      seo_title: 'poll desc',
      seo_description: 'poll desc',
      seo_keywords: ['Cristiano Ronaldo'],
      seo_blockIndexing: false,
      socialog_title: 'poll',
      socialog_description: 'poll desc',
      socialog_sitename: 'poll',
      socialog_type: 'poll',
      socialog_url: 'https://dev.hcl-x.com/en/poll/poll',
      socialog_image:
        'https://dev.dam.hcl-x.com/server/api/core/bitstreams/36d7680e-15f8-431e-b06f-c8b22949e10d/content',
      socialog_twitter_title: 'poll',
      socialog_twitter_description: 'poll desc',
      socialog_twitter_image:
        'https://dev.dam.hcl-x.com/server/api/core/bitstreams/36d7680e-15f8-431e-b06f-c8b22949e10d/content',
      socialog_twitter_url: 'https://dev.hcl-x.com/en/poll/poll',
    },
    poll_question: 'question 1',
    options_compound_fields: [
      {
        option_image: {
          url: 'https://dev.dam.hcl-x.com/server/api/core/bitstreams/ccb876e5-3720-4909-8c16-3aa2175831f7/content',
          title: 'Option Image',
        },
        option_text: 'new',
        option_id: '1',
      },
      {
        option_image: {
          url: 'https://dev.dam.hcl-x.com/server/api/core/bitstreams/667a9527-37ec-4528-be78-6d3f3b9f7f96/content',
          title: 'Option Image',
        },
        option_text: 'new1',
        option_id: '2',
      },
    ],
    start_date: null,
    end_date: null,
    content_type: 'Poll',
    last_modification_date: '2023-08-11T14:08:44Z',
    last_modified_by: 'vikalp rai saxena',
    modificationDate: '2023-08-11T14:08:44.370Z',
    site_name: null,
    document_path: '/content/documents/hclplatformx/en/poll/poll',
    original_image: {
      original_image_relative_path:
        '1691425177739/public/jpeg/biome-ssa-1440x620',
      bitStreamId: '36d7680e-15f8-431e-b06f-c8b22949e10d',
      auto: true,
      ext: 'jpeg',
      visibility: 'public',
    },
    published_images: [
      {
        aspect_ratio: 'landscape',
        folder_path: '1691425177739/public/jpeg/biome-ssa-1440x620-landscape',
      },
      {
        aspect_ratio: 'square',
        folder_path: '1691425177739/public/jpeg/biome-ssa-1440x620-square',
      },
      {
        aspect_ratio: 'portrait',
        folder_path: '1691425177739/public/jpeg/biome-ssa-1440x620-portrait',
      },
      {
        aspect_ratio: 'hero',
        folder_path: '1691425177739/public/jpeg/biome-ssa-1440x620-hero',
      },
      {
        aspect_ratio: 'card1',
        folder_path: '1691425177739/public/jpeg/biome-ssa-1440x620-card1',
      },
      {
        aspect_ratio: 'card2',
        folder_path: '1691425177739/public/jpeg/biome-ssa-1440x620-card2',
      },
    ],
  },
  results: [
    {
      option_id: '1',
      option_text: 'Labrador',
      count: 20,
      percentage: '77.78%',
    },
    {
      option_id: '2',
      option_text: 'Golden Retriever',
      count: 10,
      percentage: '10%',
    },
    {
      option_id: '3',
      option_text: 'Siberian Husky',
      count: 10,
      percentage: '10%',
    },
    {
      option_id: '4',
      option_text: 'German Shepherd',
      count: 0,
      percentage: '0%',
    },
  ],
  secondaryArgs: {
    gcpUrl: 'https://storage.googleapis.com',
    bucketName: 'cropped_image_public',
  },
};

export default Poll;
