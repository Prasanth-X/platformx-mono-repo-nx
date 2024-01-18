/* eslint-disable no-debugger */
/* eslint-disable no-empty */
import { useMutation } from '@apollo/client';
import { Box, Divider } from '@mui/material';
import { Form, Formik, useFormik } from 'formik';
import { memo, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
// import { useCustomStyle } from '../../Common/DynamicForm.style';
// import { SectionProps } from '../../CommonSchemaComponents/FormTextField/FormTextField.types';
// import SectionWrapper from '../../CommonSchemaComponents/SectionWrapper/SectionWrapper';
// import { CreateHeader } from '../../components/Common/CreateHeader';
// import PlateformXDialog from '../../components/Modal';
// import {
//   ShowToastError,
//   ShowToastSuccess,
// } from '../../components/toastNotification/toastNotificationReactTostify';
// import useDynamicForm from '../../hooks/useDynamicForm/useDynamicForm';
// import useUserSession from '../../hooks/useUserSession/useUserSession';
// import articleApi from '../../services/article/article.api';
// import {
//   createContentType,
//   publishContentType,
// } from '../../services/contentTypes/contentTypes.api';
// import { ContentType } from '../../utils/Enums/ContentType';
// import { authInfo } from '../../utils/authConstants';
// import { CATEGORY_CONTENT } from '../../utils/constants';
// import { handleHtmlTags, trimString } from '../../utils/helperFunctions';
// import { AddQuestion } from './Components/AddQuestions/AddQuestions';
import GalleryWrapper from './Components/GalleryWrapper/GalleryWrapper';
// import { QuestionListing } from './Components/QuestionListing/QuestionListing';
import DynamicComponent from './DynamicComponent';
import { Template } from './schemas/index';
import { AUTH_INFO, CATEGORY_CONTENT, PlateformXDialog, SectionWrapper, ShowToastError, ShowToastSuccess, XLoader, handleHtmlTags, trimString, useUserSession } from '@platformx/utilities';
import { useCustomStyle } from './DynamicForm.style';
import useDynamicForm from '../hooks/useDynamicForm/useDynamicForm';
import { articleApi, contentTypeAPIs } from '@platformx/authoring-apis';
import { ContentType } from '../enums/ContentType';
import { SectionProps } from './DynamicComponent.types';

const DynamicContent = ({ contentType }: { contentType: string }) => {

  const { form_groups, fields } = Template[contentType];
  const { t, i18n } = useTranslation();
  const classes = useCustomStyle();
  const [createquizmutate] = useMutation(contentTypeAPIs.createContentType);
  const [publishquizmutate] = useMutation(contentTypeAPIs.publishContentType);
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);

  const [quizState, setQuizState] = useState<any>({
    tagsSocialShare: [],
    questions: [],
  });
  const groupedFields: any = fields?.reduce((result, field) => {
    const { index, ...rest } = field;
    const existingGroup: any = result.find((group: any) => group.index === index);
    if (existingGroup) {
      existingGroup.fields.push(rest);
    } else {
      result.push({
        index,
        title: form_groups?.find((x) => x.index === index)?.title || "",
        description: form_groups?.find((x) => x.index === index)?.description,
        fields: [rest],
      });
    }
    return result;
  }, []);
  const { initialValues, validationSchema } = useDynamicForm(fields);
  const [tagData, setTagData] = useState<any>({});
  const [tagArr, setTagArr] = useState<any>([]);
  const [addQuestion, setAddQuestion] = useState(false);
  const [questionListing, setQuestionListing] = useState(false);

  const [galleryState, setGalleryState] = useState<boolean>(false);
  const galleryType = useRef<string>('Images');
  const [key, setKey] = useState('');
  const [answerId, setAnswerId] = useState('');
  const navigate = useNavigate();

  const handleTagOnChange = (event) => {
    let tagsArray = [...tagArr];

    if (event.target.checked && tagsArray?.length > 14) {
      event.target.checked = false;
      ShowToastError(t('allowed_tags_toast'));
    } else {
      if (event.target.checked) {
        tagsArray = [...tagArr, event.target.value];
      } else {
        tagsArray.splice(tagArr.indexOf(event.target.value), 1);
      }
      setTagArr(tagsArray);
      setQuizState({
        ...quizState,
        'tagsSocialShare': tagsArray,
      });
      // quizRef.current = {
      //   ...quizRef.current,
      //   ['tags']: tagsArray,
      //   ['tagsSocialShare']: isDraft ? tagsArray : tagsArray, //[...quizState.tagsSocialShare],
      // };
      // unsavedChanges.current = true;
    }
  };

  //
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const [getSession] = useUserSession();

  const { userInfo, role } = getSession();
  const username = `${userInfo.first_name} ${userInfo.last_name}`;
  const [isDraft, setIsDraft] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);
  const updateQuizSettings = (pageUrl = '', data) => {
    const {
      title,
      short_title,
      socialShareTitle,
      socialShareDesc,
      description,
      socialShareImage,
    } = data;
    const contentSettings = {
      socialog_url:
        `${AUTH_INFO.publishUri + i18n.language}/` + `quiz` + `/${pageUrl}`,
      socialog_type: 'quiz',
      socialog_sitename: title
        ? trimString(handleHtmlTags(title), 100)
        : 'quiz',
      seo_title: title ? trimString(handleHtmlTags(title), 100) : '',
      socialog_title: short_title
        ? trimString(handleHtmlTags(short_title), 100)
        : '',
      socialog_twitter_title: socialShareTitle
        ? trimString(handleHtmlTags(socialShareTitle), 100)
        : '',
      socialog_description: socialShareDesc
        ? trimString(handleHtmlTags(socialShareDesc), 163)
        : '',
      socialog_twitter_description: socialShareDesc
        ? trimString(handleHtmlTags(socialShareDesc), 163)
        : '',
      socialog_twitter_url:
        `${AUTH_INFO.publishUri + i18n.language}/` + `quiz` + `/${pageUrl}`,
      keywords: quizState?.tagsSocialShare,
      seo_keywords: tagArr,
      seo_description: description
        ? trimString(handleHtmlTags(description), 163)
        : '',
      socialog_image: socialShareImage?.Thumbnail,
      socialog_twitter_image: socialShareImage?.Thumbnail,
    };
    return contentSettings;
  };
  const publish = async (data) => {
    const {
      title,
      short_description,
      description,
      short_title,
      background_content,
    } = data || {};
    if (
      title === '' ||
      short_description === '' ||
      description === '' ||
      short_title === ''
    ) {
    } else if (background_content === '') {
      ShowToastError(`${t('banner_image')} ${t('is_required')}`);
    } else if (tagArr?.length === 0) {
      ShowToastError(t('tag_error'));
    } else {
      if (isDraft) {
        createQuiz(data, 'PUBLISHED');
      } else {
        // updateQUIZ('PUBLISHED', false);
      }
    }
  };
  const publishContent = (pageURL) => {
    const quizToSend = {
      page: pageURL,
    };
    publishquizmutate({
      variables: {
        contentType: 'Quiz',
        input: quizToSend,
      },
    })
      .then((resp) => {
        setIsLoading(false);

        setShowPublishConfirm(true);

        ShowToastSuccess(`${t('quiz')} ${t('published_toast')}`);
      })
      .catch((error) => {
        if (error.graphQLErrors[0]) {
          ShowToastError(error.graphQLErrors[0].message);
        } else {
          ShowToastError(t('api_error_toast'));
        }
      });
  };

  const createQuiz = async (data, pageState = 'DRAFT') => {
    setIsLoading(true);
    const {
      title,
      short_description,
      description,
      short_title,
      result_range_1,
      result_range_2,
      result_range_3,
      result_range_4,
      scoreBy,
      structured_data,
      published_images,
      original_image,
      background_content,
      analytics_enable,
      seo_enable,
    } = data;
    const quesArr = quizState.questions.map((value) => value.current_page_url);

    const quizToSend = {
      CommonFields: {
        title,
        short_description,
        description,
        page: title,
        short_title,

        creationDate: new Date().toISOString(),
        modificationDate: new Date().toISOString(),
        page_lastmodifiedby: username,
        createdBy: username,
        parent_page_url: '/',
        current_page_url: `/${title}`,
        tags: tagArr,
        page_state: pageState,
        settings: { ...updateQuizSettings(title, data) },
        structure_data: JSON.stringify(structured_data),
        seo_enable,
        analytics_enable,
      },
      ObjectFields: {
        questions: [...quesArr],
        background_content: {
          objectType: 'image',
          Url: background_content.Thumbnail,
          Title: background_content.Title,
          Thumbnail: background_content.Thumbnail,
          Color: '',
        },
        display_scores: scoreBy,
        result_range_1,
        result_range_2,
        result_range_3,
        result_range_4,
        published_images,
        original_image,
      },
    };

    createquizmutate({
      variables: {
        contenttype: 'Quiz',
        input: quizToSend,
      },
    })
      .then((resp) => {
        if (pageState !== 'PUBLISHED') {
          setIsLoading(false);
          if (resp?.data?.authoring_createContent?.isExist === true) {
            // setOpenPageExistModal(true);
          } else {
            // setOnSavedModal(true);
            setIsDraft(false);
            if (
              resp?.data?.authoring_createContent?.message ===
              'Successfully created!!!'
            ) {
              ShowToastSuccess(`${t('quiz')} ${t('saved_toast')}`);
            }
          }
        } else {
          if (resp?.data?.authoring_createContent?.isExist === true) {
            // setOpenPageExistModal(true);
          } else {
            publishContent(title.replace(/[^A-Z0-9]+/gi, '-').toLowerCase());
          }
        }
      })
      .catch((error) => {
        if (error?.graphQLErrors[0]) {
          ShowToastError(error.graphQLErrors[0].message);
        } else {
          ShowToastError(t('api_error_toast'));
        }
      });
  };
  const save = (data) => {
    const { title, short_description, description, short_title } = data || {};
    if (
      title === '' ||
      short_description === '' ||
      description === '' ||
      short_title === ''
    ) {
    } else {
      createQuiz(data);
    }
  };
  const getTags = async () => {
    try {
      const res: any = await articleApi.getTags({
        start: 0,
        rows: 1000,
      });
      if (res?.authoring_getTagsList) {
        setTagData(res?.authoring_getTagsList);
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
    }
  };

  useEffect(() => {
    getTags();
  }, []);
  const handleSubmit = (values) => {
    console.log('val', values);
  };
  const toggleAddQuestion = () => {
    setAddQuestion(!addQuestion);
  };

  const toggleQuestionListing = () => {
    setQuestionListing(!questionListing);
  };

  const toggleGallery = (toggleState, type) => {
    setGalleryState(toggleState);
  };

  const showGallery = (gType, keyName, id?: any) => {
    window.scrollTo(0, 0);
    galleryType.current = gType;
    setGalleryState(true);
    localStorage.setItem('socialShareKey', keyName);
    setKey(keyName);
    if (id) {
      setAnswerId(id);
    }
  };
  const onUploadClick = (type) => {
    showGallery('Images', 'socialShareImage');
  };
  const handleCloseDialog = () => {
    setShowPublishConfirm(false);
  };

  const saveQuestionCallBack = (questionInfo) => {
    setQuizState({
      ...quizState,
      questions: [...quizState.questions, questionInfo],
    });
    toggleAddQuestion();
  };

  return (
    <>
      {isLoading && <XLoader type="circular" />}
      {/* {addQuestion && (
        <AddQuestion
          toggleAddQuestion={toggleAddQuestion}
          saveQuestionCallBack={saveQuestionCallBack}
        />
      )} */}
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form>
            {galleryState && (
              <GalleryWrapper
                toggleGallery={toggleGallery}
                galleryType={galleryType.current}
                keyVal={key}
                answerId={answerId}
                fieldName={'background_content'}
              />
            )}
            {!addQuestion && !questionListing && (
              <Box mb={3}>
                {/* <CreateHeader
                  createText={
                    t('create_quiz')
                    // false ? `${t('edit')} ${t('quiz')}` : t('create_quiz') // TODO
                  }
                  publishText={t('publish')}
                  saveText={t('save_as_draft')}
                  previewText={t('preview')}
                  toolTipText={t('preview_tooltip')}
                  saveVariant='outlined'
                  category={CATEGORY_CONTENT}
                  subCategory={ContentType.Quiz}
                  id={''}
                  previewButton={''}
                  returnBack={''}
                  publish={() => {
                    handleSubmit(values);
                    publish(values);
                  }}
                  saveorPublish={() => {
                    handleSubmit(values);
                    save(values);
                  }}
                  handelPreview={''}
                  editText={''}
                  isQuiz={''}
                  publishButton={''}
                  saveButton={''}
                  showPreview={false}
                  className={''}
                  workflow={''}
                  timerState={''}
                  lastmodifiedDate={''}
                  setEnableWorkflowHistory={function (boolean: any): void {
                    throw new Error('Function not implemented.');
                  }}
                  createComment={''}
                /> */}
                <Divider></Divider>
              </Box>
            )}

            {/* {questionListing && (
              <QuestionListing
                quizState={quizState}
                setQuizState={setQuizState}
                toggleQuestionListing={toggleQuestionListing}
              />
            )} */}
            {groupedFields?.length > 0 &&
              !addQuestion &&
              !questionListing &&
              groupedFields.map((section: SectionProps) => {
                return (
                  <Box className={classes.mainStyleWrapper}>
                    <SectionWrapper
                      number={section.index}
                      title={section.title}
                      subTitle={section.description}
                      titleVariant={'h6'}
                      subTitleVariant={'caption'}
                    >
                      <DynamicComponent
                        fields={section.fields}
                        formik={formik}
                        tagData={tagData}
                        handleTagOnChange={handleTagOnChange}
                        selectedTag={tagArr}
                        toggleAddQuestion={toggleAddQuestion}
                        showGallery={showGallery}
                        toggleQuestionListing={toggleQuestionListing}
                        quizState={quizState}
                        setQuizState={setQuizState}
                        onUploadClick={onUploadClick}
                      />
                    </SectionWrapper>
                  </Box>
                );
              })}
          </Form>
        )}
      </Formik>
      {showPublishConfirm ? (
        <PlateformXDialog
          isDialogOpen={showPublishConfirm}
          title={t('congratulations')}
          subTitle={
            showPublishConfirm
              ? t('quiz_publish_popoup')
              : t('requested_action')
          }
          closeButtonHandle={handleCloseDialog}
          confirmButtonText={t('go_to_listing')}
          confirmButtonHandle={() => navigate('/content/quiz')}
          modalType='publish'
        />
      ) : null}
    </>
  );
};

export default memo(DynamicContent);