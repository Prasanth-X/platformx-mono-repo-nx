import { useLazyQuery, useMutation } from '@apollo/client';
import { contentTypeAPIs } from '@platformx/authoring-apis';
import { ShowToastError, ShowToastSuccess, useUserSession } from '@platformx/utilities';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export type UseQuestion = {
    setAnswers: any,
    setAddImage: any,
    setAddQuestionInfo: any,
    saveQuestionCallBack: any,
    setOpenPageExistModal: any,
    addQuestionInfo: any,
    answers: any,
    addImage: any,
    setExitPopUp: any,
    questionId: string
}
const useQuestion = (
    setAnswers,
    setAddImage,
    setAddQuestionInfo,
    saveQuestionCallBack,
    setOpenPageExistModal,
    addQuestionInfo,
    answers,
    addImage,
    setExitPopUp,
    questionId
) => {
    const { t } = useTranslation();

    const [originalImage, setOriginalImage] = useState({});
    const [publishedImages, setPublishedImages] = useState([]);
    const [questionData, setQuestionData] = useState({
        createdBy: "",
        creationDate: "",
    });
    const [getSession] = useUserSession();
    const { userInfo } = getSession();
    const username = `${userInfo.first_name} ${userInfo.last_name}`;
    const [isLoading, setIsLoading] = useState(false);
    const [createmutate] = useMutation(contentTypeAPIs.createContentType);
    const [updatemutate] = useMutation(contentTypeAPIs.updateContentType);
    const [publishmutate] = useMutation(contentTypeAPIs.publishContentType);
    const [runFetchContentByPath] = useLazyQuery(contentTypeAPIs.fetchContentByPath);

    const handleErrors = (error) => {
        setIsLoading(false);
        if (error && error.graphQLErrors[0]) {
            ShowToastError(error.graphQLErrors[0].message);
        } else {
            ShowToastError(t("api_error_toast"));
        }
    };

    const publishQuestion = (IsDuplicate = false, path = "", IsUpdate = false, qusObj = {}) => {
        const questionToSend = {
            page: path,
        };
        publishmutate({
            variables: {
                contentType: "Question",
                input: questionToSend,
            },
        })
            .then((resp) => {
                setIsLoading(false);
                if (IsDuplicate) {
                    ShowToastSuccess(`${t("question")} ${t("duplicated_toast")}`);
                } else if (IsUpdate) {
                    ShowToastSuccess(`${t("question")} ${t("updated_toast")}`);
                } else {
                    ShowToastSuccess(`${t("question")} ${t("created_and_added_toast")}`);
                }
                saveQuestionCallBack({ ...qusObj, current_page_url: path });
            })
            .catch((error) => {
                handleErrors(error);
            });
    };

    const createQuestion = async (IsDuplicate) => {
        try {
            const { question, questionType, queBackgroundImg, shortDesc, isImg, backgroundColor } =
                addQuestionInfo;

            const questionToSend = {
                CommonFields: {
                    page: question,
                    short_description: shortDesc,
                    category: "Question",
                    createdBy: username,
                    page_lastmodifiedby: username,
                    IsConfirm: IsDuplicate,
                    creationDate: new Date().toISOString(),
                    modificationDate: new Date().toISOString(),
                },
                ObjectFields: {
                    is_image_option: addImage,
                    options_compound_fields: answers.map((ans) => {
                        return {
                            option_image: {
                                url: ans.image,
                                title: "Option Image",
                            },
                            is_correct: ans.status,
                            option_text: ans.option,
                            option_id: ans.id,
                        };
                    }),
                    background_content: {
                        Url: isImg ? queBackgroundImg : "",
                        IsImage: isImg,
                        Title: "Question Background Image",
                        Description: "Question Background Image",
                        ColorCode: !isImg ? backgroundColor : "",
                    },
                    question: question,
                    question_type: questionType,
                    original_image: originalImage,
                    published_images: publishedImages,
                },
            };

            const resp = await createmutate({
                variables: {
                    contenttype: "Question",
                    input: questionToSend,
                },
            });

            if (resp?.data?.authoring_createContent?.isExist === true) {
                setOpenPageExistModal(true);
            } else {
                if (resp?.data?.authoring_createContent?.path) {
                    const pathArr = resp?.data?.authoring_createContent?.path.split("/");
                    const quesId = pathArr[pathArr.length - 1];

                    if (resp?.data?.authoring_createContent?.isExist === null) {
                        await publishQuestion(false, quesId, false, questionToSend.ObjectFields);
                    } else {
                        setOpenPageExistModal(false);
                        await publishQuestion(true, quesId, false, questionToSend.ObjectFields);
                    }
                } else {
                    ShowToastError(t("qus_path_empty"));
                }
            }
        } catch (error) {
            handleErrors(error);
        }
    };

    const updateQuestion = () => {
        const { question, questionType, queBackgroundImg, shortDesc, isImg, backgroundColor } =
            addQuestionInfo;
        const { createdBy, creationDate } = questionData;
        const questionToSend = {
            CommonFields: {
                page: questionId,
                current_page_url: questionId,
                short_description: shortDesc,
                category: "Question",
                page_lastmodifiedby: username,
                modificationDate: new Date().toISOString(),
                createdBy,
                creationDate,
            },
            ObjectFields: {
                is_image_option: addImage,
                options_compound_fields: answers.map((ans) => {
                    return {
                        option_image: {
                            url: ans.image,
                            title: "Option Image",
                        },
                        is_correct: ans.status,
                        option_text: ans.option,
                        option_id: ans.id,
                    };
                }),
                background_content: {
                    Url: isImg ? queBackgroundImg : "",
                    IsImage: isImg,
                    Title: "Question Background Image",
                    Description: "Question Background Image",
                    ColorCode: !isImg ? backgroundColor : "",
                },
                question: question,
                question_type: questionType,
                original_image: originalImage,
                published_images: publishedImages,
            },
        };
        updatemutate({
            variables: {
                contenttype: "Question",
                input: questionToSend,
            },
        })
            .then((resp) => {
                setIsLoading(false);
                publishQuestion(false, questionId, true, questionToSend.ObjectFields);
            })
            .catch((error) => {
                handleErrors(error);
            });
    };

    const onSaveQuestion = (IsDuplicate = false) => {
        setExitPopUp(false);
        const { question, questionType, queBackgroundImg, backgroundColor } = addQuestionInfo;
        if (question === "") {
            ShowToastError(`${t("question")} ${t("is_required")}`);
        } else if (backgroundColor === "" && queBackgroundImg === "") {
            ShowToastError(`${t("question")} ${t("banner_image")} ${t("is_required")}`);
        } else if (answers.length === 0) {
            ShowToastError(`${t("answers")} ${t("is_required")}`);
        } else if (questionType === "Single" && answers.length < 2) {
            ShowToastError(`${t("one_option")} ${t("is_required")}`);
        } else if (questionType === "Multiple" && answers.length < 3) {
            ShowToastError(`${t("two_option")} ${t("is_required")}`);
        } else if (addImage && answers.length > 10) {
            ShowToastError(`${t("max_option")} 10!`);
        } else if (!addImage && answers.length > 15) {
            ShowToastError(`${t("max_option")} 15!`);
        } else {
            const emptyAnswers = answers.filter((ans) => ans.option === "");
            const rightAnswers = answers.filter((ans) => ans.status === true);
            const emptyImageOptions = answers.filter((ans) => ans.image === "");
            const checkOptionsChars = answers.filter((ans) => ans.option.length > 100);
            if (emptyAnswers.length > 0) {
                ShowToastError(t("answers_empty"));
            } else if (questionType === "Single" && rightAnswers.length === 0) {
                ShowToastError(t("sigle_choice_validation"));
            } else if (questionType === "Single" && rightAnswers.length > 1) {
                ShowToastError(t("one_correct_answer_toast"));
            } else if (questionType === "Multiple" && rightAnswers.length < 2) {
                ShowToastError(t("multi_choice_validation"));
            } else if (addImage && emptyImageOptions.length > 0) {
                ShowToastError(t("empty_images"));
            } else if (checkOptionsChars.length > 0) {
                ShowToastError(`${t("max_char")} 100!`);
            } else {
                setIsLoading(true);
                if (questionId !== "") {
                    updateQuestion();
                } else {
                    createQuestion(IsDuplicate);
                }
            }
        }
    };
    const fetchDataByPath = async () => {
        try {
            setIsLoading(true);
            const res = await runFetchContentByPath({
                variables: { contentType: "Question", path: questionId },
            });

            setIsLoading(false);

            if (res?.data?.authoring_getCmsContentByPath) {
                const contentObj = res?.data?.authoring_getCmsContentByPath;
                const {
                    page,
                    question,
                    question_type: questionType,
                    is_image_option: isImgOpt,
                    background_content: backgroundContent,
                    short_description: shortDescription,
                    options_compound_fields: options,
                    createdBy,
                    creationDate,
                    original_image,
                    published_images,
                } = contentObj;
                const { Url, IsImage, ColorCode } = backgroundContent;
                setOriginalImage(original_image);
                setPublishedImages(published_images);
                setAddQuestionInfo({
                    questionId: page,
                    questionType: questionType,
                    queBackgroundImg: IsImage ? Url : "",
                    question: question,
                    shortDesc: shortDescription,
                    isImg: IsImage,
                    backgroundColor: IsImage ? "" : ColorCode,
                });
                setAddImage(isImgOpt === "true");
                const temp = options.map((x) => {
                    return {
                        id: x.option_id,
                        option: x.option_text,
                        image: x.option_image.url,
                        status: x.is_correct,
                    };
                });
                setAnswers([...temp]);
                setQuestionData({ createdBy, creationDate });
            } else {
                ShowToastError(t("api_error_toast"));
            }
        } catch (error: any) {
            setIsLoading(false);
            if (error.graphQLErrors[0]) {
                ShowToastError(error.graphQLErrors[0].message);
            } else {
                ShowToastError(t("api_error_toast"));
            }
        }
    };
    useEffect(() => {
        if (questionId !== "") {
            fetchDataByPath();
        }
    }, [questionId]);
    return {
        isLoading,
        publishQuestion,
        createQuestion,
        updateQuestion,
        onSaveQuestion,
    };
};

export default useQuestion;
