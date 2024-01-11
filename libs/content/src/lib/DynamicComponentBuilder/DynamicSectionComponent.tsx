/* eslint-disable react/jsx-no-useless-fragment */
import { Container, Grid } from "@mui/material";
import { ErrorHandleAutoTextArea, ErrorHandleTextBox, TitleSubTitle, XCheckBox, XDatePicker, XFileUpload } from "@platformx/utilities";
import { useState } from "react";

const DynamicSectionComponent = ({
  fields,

  onUploadClick,
  showGallery,
  state,
  setState,
  handleAddImage,
  errors,
  register,
  clearErrors,
  getValues,
}: any) => {
  const [data, setData] = useState({});
  const handleDateChangeRaw = (e) => {
    e.preventDefault();
  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };
  const handleOnBlur = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
    console.log("data", event);
  };

  const updateField = (updatedPartialObj) => {
    // setState({ //TODO
    //   ...state,
    //   [localStorage.getItem("keyname")]: {
    //     ...state[localStorage.getItem("keyname")],
    //     original_image: updatedPartialObj?.original_image,
    //     published_images: updatedPartialObj?.published_images,
    //   },
    // });
    console.log("local", JSON.parse(JSON.stringify(localStorage.getItem("keyname"))));
  };
  console.log("shadow", state["background_image"]?.original_image);
  function builder(field: any) {
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
                  <ErrorHandleAutoTextArea
                    name={field?.name}
                    placeHolder={field?.placeholder}
                    handleChange={handleChange}
                    maxCharLength={
                      field?.validations.length > 0 &&
                        (field?.validations[0]?.type === "maxlength" ||
                          field?.validations[1]?.type === "maxlength")
                        ? field?.validations[1]?.value || field?.validations[0]?.value
                        : 1000
                    }
                    // state={state.description}
                    handleOnBlur={handleOnBlur}
                    register={register}
                    errors={
                      field?.validations.length > 0 && field?.validations[0]?.type === "required"
                        ? errors[field?.name]
                        : false
                    }
                    clearErrors={clearErrors}
                    getValues={getValues}
                    errMessage={
                      field?.validations.length > 0 && field?.validations[0]?.type === "required"
                        ? `${field.title} is ${field?.validations[0]?.message}`
                        : ""
                    }
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
                  <ErrorHandleTextBox
                    name={field?.name}
                    placeHolder={field?.placeholder}
                    error={
                      field?.validations.length > 0 && field?.validations[0]?.type === "required"
                        ? errors[field?.name]
                        : false
                    }
                    helperText={errors[field?.name]?.message}
                    maxCharLength={
                      field?.validations.length > 0 &&
                        (field?.validations[0]?.type === "maxlength" ||
                          field?.validations[1]?.type === "maxlength")
                        ? field?.validations[1]?.value || field?.validations[0]?.value
                        : 1000
                    }
                    register={register}
                    clearErrors={clearErrors}
                    getValues={getValues}
                    errMessage={
                      field?.validations.length > 0 && field?.validations[0]?.type === "required"
                        ? `${field.title} is ${field?.validations[0]?.message}`
                        : ""
                    }
                    handleChange={handleChange}
                    handleOnBlur={handleOnBlur}
                  // state={getValues('title')}
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
              <XFileUpload
                url={state[field?.name]?.Thumbnail}
                onUploadClick={onUploadClick}
                content={state[field?.name]}
                updateField={updateField}
                originalImage={state[field?.name]?.original_image}
                publishedImages={state[field?.name]?.published_images}
                isShowCrop={true}
                chooseText='Choose your image'
                chooseType='image'
                name={field?.name}
              />
            </Grid>
          </>
        );
      case "date":
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
              <XDatePicker
                disablePast={false}
                state={state}
                setState={setState}
                field={field}
                isValid={state[field.name]}
              />
            </Grid>
          </>
        );
      case "boolean":
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
              <XCheckBox
                label={field.title}
                handleChange={handleChange}
                name={field.name}
                checked={state[field?.name]}
              />
            </Grid>
          </>
        );
      // case "score":
      //   return (
      //     <>
      //       <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
      //         <TitleSubTitle
      //           titleVarient={"h6medium"}
      //           subTitleVarient={"h7regular"}
      //           title={field?.title}
      //           subTitle={field?.description}
      //         />
      //       </Grid>
      //       <Grid item xs={12} sm={7} md={7} lg={7} className='textFiled'>
      //         <RadioGroupWrapper field={field} />
      //       </Grid>
      //     </>
      //   );
      // case "quote":
      //   return (
      //     <>
      //       <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
      //         <TitleSubTitle
      //           titleVarient={"h6medium"}
      //           subTitleVarient={"h7regular"}
      //           title={field?.title}
      //           subTitle={field?.description}
      //         />
      //       </Grid>
      //       <Grid item xs={12} sm={7} md={7} lg={7} className='textFiled'>
      //         <Table data={data} handleInput={handleInputQuote} handleOnBlur={handleOnBlurQuote} />
      //       </Grid>
      //     </>
      //   );
      // case "tags":
      //   return (
      //     <>
      //       <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
      //         <TitleSubTitle
      //           titleVarient={"h6medium"}
      //           subTitleVarient={"h7regular"}
      //           title={field?.title}
      //           subTitle={field?.description}
      //         />
      //       </Grid>
      //       <Grid item xs={12} sm={7} md={7} lg={7} className='textFiled'>
      //         <Tags
      //           tagData={tagData}
      //           selectedTag={selectedTag}
      //           handleTagOnChange={handleTagOnChange}
      //         />
      //       </Grid>
      //     </>
      //   );
      // case "socialShareimage":
      //   return (
      //     <>
      //       <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
      //         <TitleSubTitle
      //           titleVarient={"h6medium"}
      //           subTitleVarient={"h7regular"}
      //           title={field?.title}
      //           subTitle={field?.description}
      //         />
      //       </Grid>
      //       <Grid item xs={12} sm={7} md={7} lg={7} className='textFiled'>
      //         <AddImage
      //           url={
      //             // backgroundContent?.value?.Thumbnail &&
      //             // imgURL?.value?.Thumbnail === ''
      //             //   ? backgroundContent?.value?.Thumbnail
      //             //   :
      //             // imgURL?.value?.Thumbnail
      //             ""
      //           }
      //           onUploadClick={onUploadClick}
      //           handleChange={handleChange}
      //           type='Images'
      //         />
      //       </Grid>
      //     </>
      //   );
      // case "socialShareTags":
      //   return (
      //     <>
      //       <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
      //         <TitleSubTitle
      //           titleVarient={"h6medium"}
      //           subTitleVarient={"h7regular"}
      //           title={field?.title}
      //           subTitle={field?.description}
      //         />
      //       </Grid>
      //       <Grid item xs={12} sm={7} md={7} lg={7} className='textFiled'>
      //         <AutoCompleteText socialShareInfo={quizState} setSocialShareInfo={setQuizState} />
      //       </Grid>
      //     </>
      //   );
      // case "question":
      //   return (
      //     <QuestionSection
      //       field={field}
      //       toggleAddQuestion={toggleAddQuestion}
      //       toggleQuestionListing={toggleQuestionListing}
      //       quizState={quizState}
      //       setQuizState={setQuizState}
      //     />
      //   );
      // case "switch":
      //   return (
      //     <>
      //       <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
      //         <TitleSubTitle
      //           titleVarient={"h6medium"}
      //           subTitleVarient={"h7regular"}
      //           title={field?.title}
      //           subTitle={field?.description}
      //         />
      //       </Grid>
      //       <Grid item xs={12} sm={7} md={7} lg={7} className='textFiled'>
      //         <SwitchWrapper field={field} />
      //         {/* <Switch
      //           disabled={false}
      //           color={'#000000'}
      //           onChange={() => handleSwitch(field)}
      //           // checked={field.value}
      //         /> */}
      //       </Grid>
      //     </>
      //   );
      // case "answer_content":
      //   return (
      //     <Answers
      //       showGallery={showGallery}
      //       answers={answers}
      //       setAnswers={setAnswers}
      //       addImage={addImage}
      //       setAddImage={setAddImage}
      //       questionType={"single"}
      //     />
      //   );
      // case "structured_data":
      //   return <Seo />;
      default:
        return null;
    }
  }
  return (
    <Container>
      <Grid container spacing={5} rowSpacing={2}>
        {fields?.map((field) => (
          <>{builder(field)}</>
        ))}
      </Grid>
    </Container>
  );
};

export default DynamicSectionComponent;
