import { Box, Divider } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCustomStyle } from "./DynamicForm.style";
// import { SectionProps } from "../../CommonSchemaComponents/FormTextField/FormTextField.types";
// import SectionWrapper from "../../CommonSchemaComponents/SectionWrapper/SectionWrapper";
// import { CreateHeader } from "../../components/Common/CreateHeader";
// import PlateformXDialog from "../../components/Modal";
// import {
//   ShowToastError,
//   ShowToastSuccess,
// } from "../../components/toastNotification/toastNotificationReactTostify";
// import useDynamicForm from "../../hooks/useDynamicForm/useDynamicForm";
// import useUserSession from "../../hooks/useUserSession/useUserSession";
// import useWorkflow from "../../hooks/useWorkflow/useWorkflow";
// import contentTypeSchemaApi from "../../services/contentTypeSchema/contentTypeSchema.api";
// import { ContentType } from "../../utils/Enums/ContentType";
// import { authInfo } from "../../utils/authConstants";
// import { CATEGORY_CONTENT } from "../../utils/constants";
// import { capitalizeFirstLetter, handleHtmlTags, trimString } from "../../utils/helperFunctions";
// import Gallery from "../Gallery/Gallery";
import DynamicSectionComponent from "./DynamicSectionComponent";
import { contentTypeSchemaApi } from "@platformx/authoring-apis";
import { useUserSession, trimString, handleHtmlTags, capitalizeFirstLetter, XLoader, CATEGORY_CONTENT, PlateformXDialog, ShowToastSuccess, ShowToastError, AUTH_INFO, SectionWrapper } from "@platformx/utilities";
import { ContentType } from "../enums/ContentType";
import useDynamicForm from "../hooks/useDynamicForm/useDynamicForm";
import { SectionProps } from "./DynamicComponent.types";

export const DynamicContentType = ({ contentType }: { contentType: string }) => {
  const [Template, setTemplate] = useState<any>();
  const { t, i18n } = useTranslation();
  const classes = useCustomStyle();
  const [images, setImages] = useState({});
  const pageUrl = new URL(window.location.href);
  const arr = pageUrl.pathname.split("/");
  const length = arr[arr.length - 1];
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  //   const [path, setPath] = useState("");
  const path = useRef("");
  const groupedFields = Template?.fields?.reduce((result, field) => {
    const { index, ...rest } = field;
    const existingGroup = result.find((group) => group.index === index);
    if (existingGroup) {
      existingGroup.fields.push(rest);
    } else {
      result.push({
        index,
        title: Template?.form_groups.find((x) => x.index === index)?.title,
        description: Template?.form_groups.find((x) => x.index === index)?.description,
        fields: [rest],
      });
    }
    return result;
  }, []);
  const { initialValues } = useDynamicForm(Template?.fields);
  const [contentInstance, setContentInstance] = useState<any>(initialValues);

  const [galleryState, setGalleryState] = useState<boolean>(false);
  const galleryType = useRef<string>("Images");
  const [key, setKey] = useState("");
  const [answerId, setAnswerId] = useState("");
  const navigate = useNavigate();
  const [siteName, setSiteName] = useState("");
  const [getSession] = useUserSession();

  const { userInfo, role } = getSession();
  const login_user_id = userInfo?.user_id;
  // const { getWorkflowDetails } = useWorkflow(); // TODO: need to change
  const [workflow, setWorkflow] = useState({});
  const username = `${userInfo.first_name} ${userInfo.last_name}`;
  const [isDraft, setIsDraft] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);

  const toggleGallery = (toggleState, type) => {
    setGalleryState(toggleState);
  };
  const showGallery = (gType, keyName, id?: any) => {
    window.scrollTo(0, 0);
    galleryType.current = gType;
    setGalleryState(true);

    setKey(keyName);
    if (id) {
      setAnswerId(id);
    }
  };
  const onUploadClick = (name) => {
    showGallery("Images", name);
  };
  const handleCloseDialog = () => {
    setShowPublishConfirm(false);
  };
  const form = useForm({
    defaultValues: initialValues,
    mode: "onBlur",
  });
  const { register, handleSubmit, formState, clearErrors, getValues, reset } = form;
  const { errors } = formState;
  const [pageState, setPageState] = useState("DRAFT");
  const updateQuizSettings = (pageUrl = "") => {
    const {
      full_name: title,
      full_name: short_title,
      background_image: socialShareImage,
    } = contentInstance;
    const contentSettings = {
      socialog_url: `${AUTH_INFO.publishUri + i18n.language}/` + `${contentType}` + `/${pageUrl}`,
      socialog_type: contentType,
      socialog_sitename: title ? trimString(handleHtmlTags(title), 100) : contentType,
      seo_title: title ? trimString(handleHtmlTags(title), 100) : "",
      socialog_title: short_title ? trimString(handleHtmlTags(short_title), 100) : "",
      socialog_twitter_title: title ? trimString(handleHtmlTags(title), 100) : "",
      socialog_description: title ? trimString(handleHtmlTags(title), 163) : "",
      socialog_twitter_description: title ? trimString(handleHtmlTags(title), 163) : "",
      socialog_twitter_url: `${AUTH_INFO.publishUri + i18n.language}/` + `quiz` + `/${pageUrl}`,
      keywords: ["Profile"],
      seo_keywords: ["Profile"],
      seo_description: title ? trimString(handleHtmlTags(title), 163) : "",
      socialog_image: socialShareImage?.Thumbnail,
      socialog_twitter_image: socialShareImage?.Thumbnail,
    };
    return contentSettings;
  };
  const createContentType = async () => {
    const { full_name: title, bio, teaser, profile_image, birth_date } = contentInstance || {};
    const contentRequest = {
      CommonFields: {
        page: title.replace(/[^A-Z0-9]+/gi, "-").toLowerCase(),
        title,
        short_title: title,
        description: bio,
        short_description: bio,
        category: "",
        site_name: siteName,
        page_state: pageState,
        is_edit: false,
        seo_enable: true,
        analytics_enable: true,
        robot_txt: false,
        sitemap: false,
        analytics: "",
        others: "",
        structure_data: "",
        creationDate: new Date().toISOString(),
        modificationDate: new Date().toISOString(),
        tags: ["Profiles"],
        createdBy: username,
        parent_page_url: "/",
        current_page_url: `/${title.replace(/[^A-Z0-9]+/gi, "-").toLowerCase()}`,
        page_lastmodifiedby: username,
        settings: { ...updateQuizSettings(title.replace(/[^A-Z0-9]+/gi, "-").toLowerCase()) },
        IsConfirm: false,
      },
      ObjectFields: {
        ...contentInstance,
        structure_data: "Structured Data",
        //: new Date(birth_date).toISOString(),
        background_content: {
          objectType: "image",
          Url: profile_image?.Thumbnail,
          Title: profile_image?.Title,
          Thumbnail: profile_image?.Thumbnail,
          Color: "",
          ext: profile_image?.original_image?.ext,
        },
        published_images: profile_image?.published_images,
        original_image: profile_image?.original_image,
      },
    };
    return contentTypeSchemaApi.createContent({
      input: contentRequest,
      contenttype: Template?.title,
    });
  };

  const saveContent = async () => {
    setIsLoading(true);
    try {
      const detailsRes: any = await createContentType();
      if (detailsRes?.authoring_createContent?.message === "Successfully created!!!") {
        setIsLoading(false);
        setIsDraft(false);
        const pageName = detailsRes?.authoring_createContent?.path;
        const temp = pageName.split("/");
        console.log("path", temp[temp.length - 1]);
        path.current = temp[temp.length - 1];
        if (pageState == "DRAFT") {
          ShowToastSuccess(`${contentType} ${t("created_toast")}`);
        } else {
          try {
            setIsLoading(true);
            const response: any = await publishContentType();
            if (response?.authoring_publishContent?.message === "Profile published successfully") {
              setIsLoading(false);

              setShowPublishConfirm(true);
            }
          } catch (err: any) {
            console.log("err", err);
            setIsLoading(false);

            ShowToastError(
              err.graphQLErrors.length > 0 ? err.graphQLErrors[0].message : t("api_error_toast"),
            );
          }
        }
      } else {
        ShowToastSuccess(detailsRes.authoring_createContent.message);
      }
    } catch (err: any) {
      console.log("err", err);
      setIsLoading(false);

      ShowToastError(t("api_error_toast"));
    }
  };
  const publishContentType = async () => {
    const { full_name: title } = contentInstance || {};
    const pageURL = path.current; //title.replace(/[^A-Z0-9]+/gi, "-").toLowerCase();
    const requestToSend = {
      page: pageURL,
    };
    return contentTypeSchemaApi.publishContent({
      contentType: Template?.title,

      input: requestToSend,
    });
  };
  const handlePublish = async () => {
    setIsLoading(true);
    try {
      const response: any = await publishContentType();
      if (response?.authoring_publishContent?.message === "Profile published successfully") {
        setIsLoading(false);

        setShowPublishConfirm(true);
      }
    } catch (err: any) {
      console.log("err", err);
      setIsLoading(false);

      ShowToastError(
        err.graphQLErrors.length > 0 ? err.graphQLErrors[0].message : t("api_error_toast"),
      );
      // updateQUIZ('PUBLISHED', false);
    }
    // }
    // }
  };

  const onSubmit: SubmitHandler<any> = (data) => {
    const {
      background_image,
      profile_image,
      debut_image,
      international_debut_image,
      birth_date,
      debut_date,
      joined_date,
      left_date,
      international_debut_date,
    } = contentInstance || {};
    if (birth_date === "0") {
      setContentInstance({
        ...contentInstance,
        "birth_date": "",
      });
      ShowToastError("Birth Date is required");
    } else if (debut_date === "0") {
      setContentInstance({
        ...contentInstance,
        "debut_date": "",
      });
      ShowToastError("Debut Date is required");
    } else if (joined_date === "0") {
      setContentInstance({
        ...contentInstance,
        "joined_date": "",
      });
      ShowToastError("Joined Date is required");
    } else if (left_date === "0") {
      setContentInstance({
        ...contentInstance,
        "left_date": "",
      });
      ShowToastError("Left Date is required");
    } else if (international_debut_date === "0") {
      setContentInstance({
        ...contentInstance,
        "international_debut_date": "",
      });
      ShowToastError("International Debut Date is required");
    } else if (Object.keys(profile_image).length === 0) {
      ShowToastError("Profile Image is required");
    } else if (Object.keys(background_image).length === 0) {
      ShowToastError("Background Image is required");
    } else if (Object.keys(debut_image).length === 0) {
      ShowToastError("Debut Image is required");
    } else if (Object.keys(international_debut_image).length === 0) {
      ShowToastError("International Debut Image is required");
    } else {
      if (isDraft) {
        saveContent();
      } else {
        handlePublish();
      }
    }
  };

  const handleSelectedImage = (image, keyName, id) => {
    localStorage.setItem("keyname", keyName);
    setContentInstance({ ...contentInstance, [keyName]: image });
  };
  const fetchSchema = async () => {
    return contentTypeSchemaApi.getSchema();
  };
  const getSchema = async () => {
    try {
      const detailsRes: any = await fetchSchema();
      const schema = detailsRes?.authoring_getDocument?.filter((val, i) => {
        return contentType === val?.name;
      });
      setSiteName(schema[0]?.sitename);
      setTemplate(schema[0]?.schema);

      setIsLoading(false);
    } catch (err: any) {
      ShowToastError(t("api_error_toast"));
    }
  };
  useEffect(() => {
    setIsLoading(true);
    getSchema();
    // getWorkflowDetails(role, login_user_id, setWorkflow, capitalizeFirstLetter("profile")); //TODO: need to change
  }, [contentType]);

  return (
    <>
      {isLoading ? (
        <XLoader type={"circular"} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* {galleryState && (
            <Gallery
              handleImageSelected={handleSelectedImage}
              toggleGallery={toggleGallery}
              galleryMode={galleryType.current}
              keyName={key}
              id={answerId}
            />
          )} */}
          <Box mb={3}>
            {/* <CreateHeader
              createText={false ? `${t("edit")} ${t("quiz")}` : Template?.title}
              publishText={t("publish")}
              saveText={t("save_as_draft")}
              previewText={t("preview")}
              toolTipText={t("preview_tooltip")}
              saveVariant='outlined'
              category={CATEGORY_CONTENT}
              subCategory={ContentType.Quiz}
              id={""}
              previewButton={""}
              returnBack={() => {
                navigate(`/content/${contentType}`);
              }}
              publish={() => {
                setPageState("PUBLISHED");
                handleSubmit(onSubmit);
              }}
              saveorPublish={() => {
                handleSubmit(onSubmit);
              }}
              handelPreview={""}
              editText={""}
              isQuiz={""}
              publishButton={""}
              saveButton={true}
              showPreview={false}
              className={""}
              workflow={workflow}
              timerState={""}
              lastmodifiedDate={""}
              setEnableWorkflowHistory={function (boolean: any): void {
                throw new Error("Function not implemented.");
              }}
              createComment={""}
            /> */}
            <Divider></Divider>
          </Box>

          {groupedFields?.length > 0 &&
            groupedFields.map((section: SectionProps) => {
              return (
                <Box className={classes.mainStyleWrapper}>
                  <SectionWrapper
                    number={section.index}
                    title={section.title}
                    subTitle={section.description}
                    titleVariant={"h6"}
                    subTitleVariant={"caption"}>
                    <DynamicSectionComponent
                      fields={section.fields}
                      showGallery={showGallery}
                      state={contentInstance}
                      setState={setContentInstance}
                      onUploadClick={onUploadClick}
                      errors={errors}
                      register={register}
                      clearErrors={clearErrors}
                      getValues={getValues}
                    />
                  </SectionWrapper>
                </Box>
              );
            })}
        </form>
      )}
      {showPublishConfirm ? (
        <PlateformXDialog
          isDialogOpen={showPublishConfirm}
          title={t("congratulations")}
          subTitle={
            showPublishConfirm
              ? `Your ${contentType} has been sent for publishing & will be published in a few seconds`
              : t("requested_action")
          }
          closeButtonHandle={handleCloseDialog}
          confirmButtonText={t("go_to_listing")}
          confirmButtonHandle={() => navigate(`/content/${contentType}`)}
          modalType='publish'
        />
      ) : null}
    </>
  );
};
