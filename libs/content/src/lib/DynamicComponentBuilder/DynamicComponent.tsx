/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-debugger */
import { Container, Grid } from "@mui/material";
import { useField, useFormikContext } from "formik";
import { t } from "i18next";
import { useEffect, useState } from "react";
import * as Yup from "yup";
// import Answers from "../../CommonSchemaComponents/Answers/Answers";
// import Seo from "../../CommonSchemaComponents/Seo/Seo";
// import Table from "../../CommonSchemaComponents/Table/Table";
// import { Tags } from "../../CommonSchemaComponents/Tags/Tags";
// import TextArea from "../../CommonSchemaComponents/TextArea/TextArea";
// import AddImage from "../../components/Common/AddImage";
// import AutoCompleteText from "../../components/Common/AutoCompleteText";
// import FormikField from "../../components/Common/FormikField";
// import TitleSubTitle from "../../components/Common/TitleSubTitle";
import FileUploadWrapper from "./Components/FilleUploadWrapper/FileUploadWrapper";
import QuestionSection from "./Components/QuestionsSection/QuestionSection";
import RadioGroupWrapper from "./Components/RadioGroupWrapper/RadioGroupWrapper";
import SwitchWrapper from "./Components/SwitchWrapper/SwitchWrapper";
import { TitleSubTitle, FormikField, AddImage, Answers, XTable, XTags, XTextArea, TextArea } from "@platformx/utilities";

const DynamicComponent = ({
  fields,
  formik,
  tagData,
  selectedTag,
  handleTagOnChange,
  handleClick,
  showGallery,
  toggleQuestionListing,
  toggleAddQuestion,
  onUploadClick,
  answers,
  setAnswers,
  addImage,
  setAddImage,
  quizState,
  setQuizState,
  handleAddImage,
}: any) => {

  const validationSchemaFields = {};
  const initialValues = {};
  const [meta] = useField("scoreBy");
  const [imgURL] = useField("socialShareImage");
  const [backgroundContent] = useField("background_content");

  const { setFieldValue } = useFormikContext();
  const [data, setData] = useState({});
  useEffect(() => {
    setData({
      result_range_1: { to: "0", from: "24", quotes: t("quiz_quotes_quote1") },
      result_range_2: { to: "25", from: "49", quotes: t("quiz_quotes_quote2") },
      result_range_3: { to: "50", from: "74", quotes: t("quiz_quotes_quote3") },
      result_range_4: {
        to: "75",
        from: "100",
        quotes: t("quiz_quotes_quote4"),
      },
    });
  }, [t]);
  const handleInputQuote = (event, key) => {
    setData({ ...data, [key]: { ...data[key], quotes: event.target.value } });
  };
  const handleOnBlurQuote = (event, key) => {
    setFieldValue(key, event.target.value);
  };
  const handleChange = (e) => {
    setFieldValue(e.target.name, e.target.value);
  };

  console.log("score", meta);
  fields.forEach((field) => {
    initialValues[field?.name] = "";
    const fieldValidations = field?.validations?.reduce((validations, validation) => {
      if (validation.type === "required") {
        validations = validations.required(`${field.title} is ${validation.message}`);
      } else if (validation.type === "maxLength") {
        validations = validations.max(validation.value, `${field.title} is ${validation.message}`);
      }
      return validations;
    }, Yup.string());

    if (field?.variant.includes("multiline")) {
      validationSchemaFields[field?.name] = fieldValidations?.label(field?.title);
    } else {
      validationSchemaFields[field?.name] = fieldValidations?.label(field?.title).trim();
    }
  });
  const handleSwitch = (field) => {
    console.log("field", field);
    setFieldValue(field.name, !field.value);
  };

  function builder(field: any, formik: any) {
    switch (field.type) {
      case "text":
        return (
          <>
            {field.variant === "multiline" ? (
              <>
                <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
                  <TitleSubTitle
                    titleVariant={"h6medium"}
                    subTitleVariant={"h7regular"}
                    title={field?.title}
                    subTitle={field?.description}
                  />
                </Grid>
                <Grid item xs={12} sm={7} md={7} lg={7} className='textFiled'>
                  <TextArea
                    minRows={6}
                    maxRows={8}
                    name={field?.name}
                    metadata={field}
                    formik={formik}
                  />
                </Grid>{" "}
              </>
            ) : (
              <>
                <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
                  <TitleSubTitle
                    titleVariant={"h6medium"}
                    subTitleVariant={"h7regular"}
                    title={field?.title}
                    subTitle={field?.description}
                  />
                </Grid>
                <Grid key={field?.name} item xs={12} sm={7} md={7} lg={7} className='textFiled'>
                  <FormikField
                    name={field?.name}
                    label={field?.title}
                    metadata={field}
                    formik={formik}
                  />
                </Grid>
              </>
            )}
          </>
        );
      case "image":
        return (
          <>
            <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
              <TitleSubTitle
                titleVariant={"h6medium"}
                subTitleVariant={"h7regular"}
                title={field?.title}
                subTitle={field?.description}
              />
            </Grid>
            <Grid item xs={12} sm={7} md={7} lg={7} className='textFiled'>
              <FileUploadWrapper
                chooseText='Choose your image'
                onUploadClick={showGallery}
                field={field}
                ifColorPallet={field?.ifColorPallet}
              />
            </Grid>
          </>
        );
      case "score":
        return (
          <>
            <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
              <TitleSubTitle
                titleVariant={"h6medium"}
                subTitleVariant={"h7regular"}
                title={field?.title}
                subTitle={field?.description}
              />
            </Grid>
            <Grid item xs={12} sm={7} md={7} lg={7} className='textFiled'>
              <RadioGroupWrapper field={field} />
            </Grid>
          </>
        );
      case "quote":
        return (
          <>
            <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
              <TitleSubTitle
                titleVariant={"h6medium"}
                subTitleVariant={"h7regular"}
                title={field?.title}
                subTitle={field?.description}
              />
            </Grid>
            <Grid item xs={12} sm={7} md={7} lg={7} className='textFiled'>
              <XTable data={data} handleInput={handleInputQuote} handleOnBlur={handleOnBlurQuote} />
            </Grid>
          </>
        );
      case "tags":
        return (
          <>
            <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
              <TitleSubTitle
                titleVariant={"h6medium"}
                subTitleVariant={"h7regular"}
                title={field?.title}
                subTitle={field?.description}
              />
            </Grid>
            <Grid item xs={12} sm={7} md={7} lg={7} className='textFiled'>
              <XTags
                tagData={tagData}
                selectedTag={selectedTag}
                handleTagOnChange={handleTagOnChange}
              />
            </Grid>
          </>
        );
      case "socialShareimage":
        return (
          <>
            <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
              <TitleSubTitle
                titleVariant={"h6medium"}
                subTitleVariant={"h7regular"}
                title={field?.title}
                subTitle={field?.description}
              />
            </Grid>
            <Grid item xs={12} sm={7} md={7} lg={7} className='textFiled'>
              <AddImage
                url={
                  // backgroundContent?.value?.Thumbnail &&
                  // imgURL?.value?.Thumbnail === ''
                  //   ? backgroundContent?.value?.Thumbnail
                  //   :
                  imgURL?.value?.Thumbnail
                }
                onUploadClick={onUploadClick}
                handleChange={handleChange}
                type='Images'
              />
            </Grid>
          </>
        );
      case "socialShareTags":
        return (
          <>
            <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
              <TitleSubTitle
                titleVariant={"h6medium"}
                subTitleVariant={"h7regular"}
                title={field?.title}
                subTitle={field?.description}
              />
            </Grid>
            <Grid item xs={12} sm={7} md={7} lg={7} className='textFiled'>
              {/* <AutoCompleteText socialShareInfo={quizState} setSocialShareInfo={setQuizState} /> */}
            </Grid>
          </>
        );
      case "question":
        return (
          <QuestionSection
            field={field}
            toggleAddQuestion={toggleAddQuestion}
            toggleQuestionListing={toggleQuestionListing}
            quizState={quizState}
            setQuizState={setQuizState}
          />
        );
      case "switch":
        return (
          <>
            <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
              <TitleSubTitle
                titleVariant={"h6medium"}
                subTitleVariant={"h7regular"}
                title={field?.title}
                subTitle={field?.description}
              />
            </Grid>
            <Grid item xs={12} sm={7} md={7} lg={7} className='textFiled'>
              <SwitchWrapper field={field} />
              {/* <Switch
                disabled={false}
                color={'#000000'}
                onChange={() => handleSwitch(field)}
                // checked={field.value}
              /> */}
            </Grid>
          </>
        );
      case "answer_content":
        return (
          <Answers
            showGallery={showGallery}
            answers={answers}
            setAnswers={setAnswers}
            addImage={addImage}
            setAddImage={setAddImage}
            questionType={"single"}
          />
        );
      // case "structured_data":
      //   return <Seo />;
      default:
        return null;
    }
  }
  return (
    <Container>
      <Grid container spacing={5} rowSpacing={2}>
        {fields.map((field) => (
          <>{builder(field, formik)}</>
        ))}
      </Grid>
    </Container>
  );
};

export default DynamicComponent;
