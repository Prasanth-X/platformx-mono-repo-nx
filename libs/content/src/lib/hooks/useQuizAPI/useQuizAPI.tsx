import { useMutation } from '@apollo/client';
import { contentTypeAPIs } from '@platformx/authoring-apis';
import { ShowToastError, dateFormat, getSubDomain, handleHtmlTags, trimString } from '@platformx/utilities';
import { useTranslation } from 'react-i18next';
import { updateStructureData } from '../../utils/Helper';

const useQuizAPI = () => {
    const { t, i18n } = useTranslation();
    const [publishquizmutate] = useMutation(contentTypeAPIs.publishContentType);
    const [createquizmutate] = useMutation(contentTypeAPIs.createContentType);
    const createQuiz = async (pageState, IsDuplicate, isWorkflow, quizState, editedSD, quizInstance, updateTempObj, isFeatured) => {

        try {
            const structureData = editedSD ? editedSD : JSON.stringify(updateStructureData(quizState));
            const newTempData = JSON.parse(JSON.stringify(quizInstance));
            const quesArr = quizState.questions.map((value) => value.current_page_url);
            const tempObjField = {
                questions: [...quesArr],
                background_content: {
                    objectType: "image",
                    Url: quizState?.original_image.original_image_relative_path,
                    Title: "",
                    Thumbnail: quizState?.original_image.original_image_relative_path,
                    Color: "",
                    ext: quizState?.original_image.ext,
                },
                display_scores: quizState?.scoreBy,
                result_range_1: quizState?.result_range_1,
                result_range_2: quizState?.result_range_2,
                result_range_3: quizState?.result_range_3,
                result_range_4: quizState?.result_range_4,
                published_images: quizState?.published_images,
                original_image: quizState?.original_image,
            };
            const quizToSend = {
                ...newTempData,
                CommonFields: {
                    ...newTempData.CommonFields,
                    ...updateTempObj.current,
                    page_state: pageState,
                    structure_data: structureData,
                    IsConfirm: IsDuplicate,
                    seo_enable: quizState?.seo_enable,
                    analytics_enable: quizState?.analytics_enable,
                    is_featured: isFeatured,
                },
                ObjectFields: {
                    ...newTempData.ObjectFields,
                    ...tempObjField,
                },
            };

            const resp = await createquizmutate({
                variables: {
                    contenttype: "Quiz",
                    input: quizToSend,
                },
            });

            return resp;
        } catch (e: any) {
            if (e.graphQLErrors[0]) {
                ShowToastError(e.graphQLErrors[0].message);
            } else {
                ShowToastError(t("api_error_toast"));
            }
        }
    };
    const updateQuizSettings = (quizRef, quizState, pageUrl = "") => {
        const QuizSettings = {
            socialog_url: `${getSubDomain()}/${i18n.language}/quiz/${pageUrl}`,

            socialog_type: "quiz",
            socialog_sitename: quizRef.current?.title
                ? trimString(handleHtmlTags(quizRef.current?.title), 100)
                : "quiz",
            seo_title: quizRef.current?.title
                ? trimString(handleHtmlTags(quizRef.current?.title), 100)
                : "",
            socialog_title: quizRef.current?.short_title
                ? trimString(handleHtmlTags(quizRef.current?.short_title), 100)
                : "",
            socialog_twitter_title: quizRef.current?.titleSocialShare
                ? trimString(handleHtmlTags(quizRef.current?.titleSocialShare), 100)
                : "",
            socialog_description: quizRef.current?.short_description
                ? trimString(handleHtmlTags(quizRef.current?.short_description), 163)
                : "",
            socialog_twitter_description: quizRef.current?.descriptionSocialShare
                ? trimString(handleHtmlTags(quizRef.current?.descriptionSocialShare), 163)
                : "",
                socialog_twitter_url: `${getSubDomain()}/${i18n.language}/quiz/${pageUrl}`,

            keywords: quizState?.tagsSocialShare, //quizRef.current.tags,
            seo_keywords: quizRef.current.tags,
            seo_description: quizRef.current?.description
                ? trimString(handleHtmlTags(quizRef.current?.description), 163)
                : "",
            socialog_image: quizRef.current?.socialShareImgURL,
            socialog_twitter_image: quizRef.current?.socialShareImgURL,
            is_schedule_publish: quizState?.is_schedule_publish,
            schedule_publish_datetime: quizState?.schedule_publish_datetime,
            is_schedule_unpublish: quizState?.is_schedule_unpublish,
            schedule_unpublish_datetime: quizState?.schedule_unpublish_datetime,
        };
        return QuizSettings;
    };

    const publishQuiz = async (pageURL, quizState, publishPopup) => {
        try {
            const quizToSend = {
                page: pageURL,
            };

            const resp = await publishquizmutate({
                variables: {
                    contentType: "Quiz",
                    input: quizToSend,
                },
            });

            let showPublishConfirm = false;
            let publishUrl = '';

            if (
                quizState?.is_schedule_publish &&
                quizState?.schedule_publish_datetime &&
                !quizState?.is_schedule_unpublish
            ) {
                publishPopup.current = {
                    ...publishPopup.current,
                    publishDescription: `Your Quiz has been scheduled to publish at ${dateFormat(
                        new Date(quizState?.schedule_publish_datetime),
                    )}`,
                };
                showPublishConfirm = true;
            } else if (
                quizState?.is_schedule_unpublish &&
                quizState?.schedule_unpublish_datetime &&
                !quizState?.is_schedule_publish
            ) {
                publishPopup.current = {
                    ...publishPopup.current,
                    publishDescription: `Your Quiz has been scheduled to unpublish at ${dateFormat(
                        new Date(quizState?.schedule_unpublish_datetime),
                    )}`,
                };
                showPublishConfirm = true;
            } else if (
                quizState?.is_schedule_unpublish &&
                quizState?.schedule_unpublish_datetime &&
                quizState?.is_schedule_publish &&
                quizState?.schedule_publish_datetime
            ) {
                publishPopup.current = {
                    ...publishPopup.current,
                    publishDescription: `Your Quiz has been scheduled to publish at ${dateFormat(
                        new Date(quizState?.schedule_publish_datetime),
                    )} & scheduled to unpublish at ${dateFormat(
                        new Date(quizState?.schedule_unpublish_datetime),
                    )}`,
                };
                showPublishConfirm = true;
            } else {
                showPublishConfirm = true;
            }

            publishUrl = resp?.data?.authoring_publishContent?.current_page_url;

            return { showPublishConfirm, publishUrl };
        } catch (error: any) {
            if (error.graphQLErrors[0]) {
                ShowToastError(error.graphQLErrors[0].message);
            } else {
                ShowToastError(t("api_error_toast"));
            }
            return { showPublishConfirm: false, publishUrl: '' };
        }
    };

    return {
        publishQuiz,
        createQuiz,
        updateQuizSettings
    };
};

export default useQuizAPI;
