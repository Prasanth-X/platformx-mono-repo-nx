import { useMutation } from '@apollo/client';
import { Box, Divider } from '@mui/material';
import { Form, Formik } from 'formik';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCustomStyle } from '../../../../Common/DynamicForm.style';
import Loader from '../../../../Common/Loader';
import SectionWrapper from '../../../../CommonSchemaComponents/SectionWrapper/SectionWrapper';
import { CreateHeader } from '../../../../components/Common/CreateHeader';
import {
  showToastError,
  showToastSuccess,
} from '../../../../components/toastNotification/toastNotificationReactTostify';
import useDynamicForm from '../../../../hooks/useDynamicForm/useDynamicForm';
import useUserSession from '../../../../hooks/useUserSession/useUserSession';
import {
  createContentType,
  publishContentType,
} from '../../../../services/contentTypes/contentTypes.api';
import DynamicComponent from '../../DynamicComponent';
import { SectionProps } from '../../DynamicComponent.types';
import { AddQuestionData } from '../../schemas';
import GalleryWrapper from '../GalleryWrapper/GalleryWrapper';
import { addQuestionMapper } from '../Utils/Mapper';

export const AddQuestion = ({
  questionId = '',
  toggleAddQuestion,
  saveQuestionCallBack,
}) => {
  const { form_groups } = AddQuestionData;
  const { t, i18n } = useTranslation();
  const classes = useCustomStyle();
  const [createmutate] = useMutation(createContentType);
  // const [updatemutate] = useMutation(updateContentType);
  const [publishmutate] = useMutation(publishContentType);
  const [addImage, setAddImage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openPageExistModal, setOpenPageExistModal] = useState<boolean>(false);
  const [answers, setAnswers] = useState<any>([
    { id: '1', option: '', image: '', status: true },
    { id: '2', option: '', image: '', status: false },
  ]);
  const groupedFields = AddQuestionData.fields.reduce((result, field) => {
    const { index, ...rest } = field;
    const existingGroup = result.find((group) => group.index === index);
    if (existingGroup) {
      existingGroup.fields.push(rest);
    } else {
      result.push({
        index,
        title: form_groups.find((x) => x.index === index)?.title,
        description: form_groups.find((x) => x.index === index)?.description,
        fields: [rest],
      });
    }
    return result;
  }, []);
  const { initialValues, validationSchema } = useDynamicForm(
    AddQuestionData.fields
  );

  const [galleryState, setGalleryState] = useState<boolean>(false);
  const galleryType = useRef<string>('Images');
  const [keyType, setKeyType] = useState('');
  const [answerId, setAnswerId] = useState('');
  const [getSession] = useUserSession();
  const { userInfo, role } = getSession();

  const username = `${userInfo.first_name} ${userInfo.last_name}`;
  const PublishQuestion = (
    IsDuplicate = false,
    path = '',
    IsUpdate = false,
    qusObj = {}
  ) => {
    const questionToSend = {
      page: path,
    };
    publishmutate({
      variables: {
        contentType: 'Question',
        input: questionToSend,
      },
    })
      .then((resp) => {
        setIsLoading(false);
        if (IsDuplicate) {
          showToastSuccess(`${t('question')} ${t('duplicated_toast')}`);
        } else if (IsUpdate) {
          showToastSuccess(`${t('question')} ${t('updated_toast')}`);
        } else {
          showToastSuccess(`${t('question')} ${t('created_and_added_toast')}`);
        }
        saveQuestionCallBack({ ...qusObj, current_page_url: path });
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.graphQLErrors[0]) {
          showToastError(error.graphQLErrors[0].message);
        } else {
          showToastError(t('api_error_toast'));
        }
      });
  };

  const createQuestion = async (data) => {
    setIsLoading(true);
    const mapperData: any = addQuestionMapper(
      data,
      answers,
      username,
      addImage
    );
    createmutate({
      variables: mapperData,
    })
      .then((resp) => {
        if (resp?.data?.authoring_createContent?.isExist === true) {
          setOpenPageExistModal(true);
        } else {
          if (resp?.data?.authoring_createContent?.path) {
            const pathArr =
              resp?.data?.authoring_createContent?.path.split('/');
            const quesId = pathArr[pathArr.length - 1];
            if (resp?.data?.authoring_createContent?.isExist === null) {
              PublishQuestion(
                false,
                quesId,
                false,
                mapperData.input.ObjectFields
              );
            } else {
              setOpenPageExistModal(false);
              PublishQuestion(
                true,
                quesId,
                false,
                mapperData.input.ObjectFields
              );
            }
          } else {
            showToastError(t('qus_path_empty'));
          }
        }
      })
      .catch((error) => {
        if (error && error.graphQLErrors[0]) {
          showToastError(error.graphQLErrors[0].message);
        } else {
          showToastError(t('api_error_toast'));
        }
      });
  };
  const handleValidation = (values) => {
    const { question_type, qus_background_content, bg_color } = values;
    if (qus_background_content === '' && bg_color === '') {
      showToastError(
        `${t('question')} ${t('banner_image')} ${t('is_required')}`
      );
    } else if (answers.length === 0) {
      showToastError(`${t('answers')} ${t('is_required')}`);
    } else if (question_type === 'Single Choice' && answers.length < 2) {
      showToastError(`${t('one_option')} ${t('is_required')}`);
    } else if (question_type === 'Multi Choice' && answers.length < 3) {
      showToastError(`${t('two_option')} ${t('is_required')}`);
    } else if (addImage && answers.length > 10) {
      showToastError(`${t('max_option')} 10!`);
    } else if (!addImage && answers.length > 15) {
      showToastError(`${t('max_option')} 15!`);
    } else {
      const emptyAnswers = answers.filter((ans) => ans.option === '');
      const rightAnswers = answers.filter((ans) => ans.status === true);
      const emptyImageOptions = answers.filter((ans) => ans.image === '');
      const checkOptionsChars = answers.filter(
        (ans) => ans.option.length > 100
      );
      if (emptyAnswers.length > 0) {
        showToastError(t('answers_empty'));
      } else if (
        question_type === 'Single Choice' &&
        rightAnswers.length === 0
      ) {
        showToastError(t('sigle_choice_validation'));
      } else if (question_type === 'Single Choice' && rightAnswers.length > 1) {
        showToastError(t('one_correct_answer_toast'));
      } else if (question_type === 'Multi Choice' && rightAnswers.length < 2) {
        showToastError(t('multi_choice_validation'));
      } else if (addImage && emptyImageOptions.length > 0) {
        showToastError(t('empty_images'));
      } else if (checkOptionsChars.length > 0) {
        showToastError(`${t('max_char')} 100!`);
      } else {
        setIsLoading(true);
        if (questionId !== '') {
          // updateQuestion();
        } else {
          createQuestion(values);
        }
      }
    }
  };
  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      handleValidation(values);
      setSubmitting(false);
    }, 400);
  };

  const toggleGallery = (toggleState, type) => {
    setGalleryState(toggleState);
  };

  const showGallery = (gType, keyName, id?: any) => {
    window.scrollTo(0, 0);
    galleryType.current = gType;
    setGalleryState(true);
    setKeyType(keyName);
    if (id) {
      setAnswerId(id);
    }
  };

  const handleAddImage = () => {
    setAddImage(!addImage);
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values }) => (
        <Form>
          {isLoading && <Loader />}
          {galleryState && (
            <GalleryWrapper
              toggleGallery={toggleGallery}
              galleryType={galleryType.current}
              answerId={answerId}
              keyVal={keyType}
              fieldName={'qus_background_content'}
              setAnswers={setAnswers}
              answers={answers}
            />
          )}
          <Box mb={3}>
            <CreateHeader
              previewButton
              createText={
                questionId !== ''
                  ? `${t('add')} ${t('quiz_question_head')}`
                  : t('add_questions')
              }
              returnBack={toggleAddQuestion}
              isQuiz
              publishButton={false}
              saveButton={false}
              saveorPublish={handleSubmit}
              saveText={questionId !== '' ? t('update') : t('done')}
              previewText='Preview'
              showPreview={false}
              toolTipText='Unable to preview please add required details'
              saveVariant='contained'
              category='Content'
              subCategory='quiz'
            />
            <Divider></Divider>
          </Box>
          {groupedFields?.length > 0 &&
            groupedFields.map((section: SectionProps) => {
              return (
                <Box className={classes.mainStyleWrapper} key={section.index}>
                  <SectionWrapper
                    number={section.index}
                    title={section.title}
                    subTitle={section.description}
                    titleVariant={'h6'}
                    subTitleVariant={'caption'}
                  >
                    <DynamicComponent
                      fields={section.fields}
                      // formik={formik}
                      answers={answers}
                      setAnswers={setAnswers}
                      addImage={addImage}
                      setAddImage={setAddImage}
                      showGallery={showGallery}
                      handleAddImage={handleAddImage}
                    />
                  </SectionWrapper>
                </Box>
              );
            })}
        </Form>
      )}
    </Formik>
  );
};
