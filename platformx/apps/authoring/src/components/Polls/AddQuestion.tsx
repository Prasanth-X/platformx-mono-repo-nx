import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useComment } from '../../hooks/useComment/useComment';
import { AddImageBackgroundColor } from '../Common/AddImageBackgroundColor';
import AutoTextArea from '../Common/AutoTextArea';
import TextBox from '../Common/TextBox';
import TitleSubTitle from '../Common/TitleSubTitle';
import CommentWrapper from '../ContentRewiew/CommentWrapper';
import AnswerContent from './AnswerContent';
import { useCustomStyle } from './Poll.style';
import CommonBoxWithNumber from '../../Common/CommonBoxWithNumber/CommonBoxWithNumber';

const AddQuestion = ({
  saveQuestionCallBack,
  qusUnsavedChanges,
  showGallery,
  state,
  setState,
  answers,
  setAnswers,
  addImage,
  setAddImage,
  setFieldChanges,
  selectedImage,
}) => {
  const { t } = useTranslation();

  // const [answers, setAnswers] = useState<any>([
  //   { id: "1", option: "", image: "", status: true },
  //   { id: "2", option: "", image: "", status: false },
  //   // { id: "3", option: "", image: "", status: false },
  // ]);

  const [backgroundColor, setBackgroundColor] = useState('');
  const [isImg, setImg] = useState(true);

  const [operationType, setOperationType] = useState<string>('choose');
  const { comments, handleCommentClick, scrollToRef, selectedElementId } =
    useComment();
  const handleRefresh = () => {
    setBackgroundColor('');
    setImg(false);
    setState({
      ...state,
      ['queBackgroundImg']: '',
      ['queBackgroundColor']: '',
    });
  };
  const handleColorPallete = (color) => {
    qusUnsavedChanges.current = true;
    setBackgroundColor(color);
    setImg(false);
    setState({
      ...state,
      ['queBackgroundImg']: '',
      ['queBackgroundColor']: color,
    });
  };
  const handleChange = () => {
    setFieldChanges(true);
    qusUnsavedChanges.current = true;
  };
  const handleOnBlur = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  useEffect(() => {
    if (state.queBackgroundColor !== '') {
      setImg(false);
      setBackgroundColor(state.queBackgroundColor);
    }
  }, [state.queBackgroundColor]);

  const onUploadClick = (type) => {
    showGallery('Images', 'queBackgroundImg');
    setOperationType(type);
    setImg(true);
    setState({
      ...state,
      ['queBackgroundColor']: '',
    });
  };

  const updateField = (updatedPartialObj) => {
    console.info(updatedPartialObj, 'checkobj');
    const { original_image, published_images } = updatedPartialObj || {};
    const modifiedData = {
      ...JSON.parse(JSON.stringify(state)),
      ...{
        question_original_image: original_image,
        question_published_images: published_images,
      },
    };
    setState(modifiedData);
  };
  const classes = useCustomStyle();
  return (
    <Box id='questions' className={classes.mainStyleWrapper}>
      <Box>
        <CommentWrapper
          elementId='3'
          scrollRef={scrollToRef}
          comments={comments}
        >
          <CommonBoxWithNumber
            number='03'
            title={t('poll_qus_header')}
            titleVarient='p3semibold'
            subTitleVarient='p4regular'
            subTitle={t('subhead')}
          >
            <Grid container>
              <Grid item xs={12} sm={5} md={5} className='leftFiled'>
                <TitleSubTitle
                  title={`${t('title')}*`}
                  subTitle={t('poll_subtitle')}
                  titleVarient='h6medium'
                  subTitleVarient='h7regular'
                />
              </Grid>
              <Grid item xs={12} sm={7} md={7} lg={7} className='textFiled'>
                <TextBox
                  name='poll_title'
                  placeHolder={t('qus_placeholder')}
                  handleChange={handleChange}
                  handleOnBlur={handleOnBlur}
                  maxCharLength={120}
                  state={state.poll_title}
                />
              </Grid>
              <Grid item xs={12} sm={5} md={5} className='leftFiled'>
                <TitleSubTitle
                  title={`${t('description')}*`}
                  subTitle={t('poll_short_subdes')}
                  titleVarient='h6medium'
                  subTitleVarient='h7regular'
                />
              </Grid>
              <Grid item xs={12} sm={7} md={7} className='textFiled'>
                <AutoTextArea
                  name='poll_description'
                  placeHolder={t('quiz_description_placeholder')}
                  handleChange={handleChange}
                  handleOnBlur={handleOnBlur}
                  maxCharLength={400}
                  state={state.poll_description}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} sm={5} md={5} className='leftFiledLast'>
                <TitleSubTitle
                  title={t('quiz_addqus_image_title')}
                  subTitle={t('poll_bg_subtitle')}
                  titleVarient='h6medium'
                  subTitleVarient='h7regular'
                />
              </Grid>
              <Grid item xs={12} sm={7} md={7} className='textFiledLast'>
                <AddImageBackgroundColor
                  state={state.queBackgroundImg}
                  isImg={isImg}
                  onUploadClick={onUploadClick}
                  backgroundColor={backgroundColor}
                  handleColorPallete={handleColorPallete}
                  handleRefresh={handleRefresh}
                  label={t('page_choose_image')}
                  operationType={operationType}
                  content={selectedImage}
                  updateField={updateField}
                  originalImage={state?.question_original_image}
                  publishedImages={state?.question_published_images}
                  isShowCrop={true}
                />
                {/* {addQuestionInfo.queBackgroundImg && isImg ? (
                    <Box
                      sx={{
                        position: "relative",
                        borderRadius: "4px",
                        // height: "91%"
                      }}
                      mb={2}
                    >
                      <img
                        style={{
                          width: "100%",
                          height: "206px",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                        src={addQuestionInfo.queBackgroundImg}
                      //   controls
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          top: "0",
                          width: "100%",
                          height: "206px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#7470708a",
                          borderRadius: "4px",
                        }}
                      >
                        <Box sx={{ display: "flex" }}>
                          <Box
                            sx={{ cursor: "pointer" }}
                            onClick={() => onUploadClick("Images")}
                          >
                            <Box
                              sx={{
                                borderRadius: "50%",
                                backgroundColor: "#fff",
                                width: "25px",
                                height: "25px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "auto",
                              }}
                            >
                              <CachedIcon sx={{ color: "#626060" }} />
                            </Box>
                            <Typography
                              mt={1}
                              sx={{
                                fontSize: ThemeConstants.FONTSIZE_XS,
                                color: ThemeConstants.WHITE_COLOR,
                              }}
                            >
                              Replace
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  ) : addQuestionInfo.queBackgroundImg && !isImg ? (
                    <Box
                      sx={{
                        width: "100%",
                        height: "206px",
                        backgroundColor: backgroundColor,
                        borderRadius: "4px",
                      }}
                    ></Box>
                  ) : (
                    <>
                      <Box></Box>
                      <Box
                        sx={{
                          borderRadius: "5px",
                          border: "dashed 2px #707070",
                          paddingLeft: {
                            xs: "30px",
                            sm: "30px",
                            md: "100px",
                          },
                          cursor: "pointer",
                          height: "206px",
                          backgroundColor: "#f5f6f8",
                          display: "flex",
                          alignItems: "center",
                        }}
                        onClick={() => onUploadClick("Images")}
                      >
                        <Box
                          sx={{
                            borderRadius: "50%",
                            backgroundColor: "#000",
                            width: "40px",
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          mr={2}
                        >
                          <ArrowUpwardIcon style={{ color: "#fff" }} />
                        </Box>
                        <Box
                          sx={{
                            justifyContent: "center",
                            alignItems: "center",
                            color: ThemeConstants.PRIMARY_MAIN_COLOR,
                          }}
                        >
                          <Typography
                            variant="h5medium"
                            component="h5"
                            sx={{ color: "#000000" }}
                          >
                            Choose your Asset
                          </Typography>
                        </Box>
                      </Box>
                    </>
                  )}

                  <Box
                    sx={{
                      marginTop: "10px",
                      display: "flex",
                      flexDirection: "row",
                      flexFlow: { xs: "wrap", lg: "nowrap" },
                    }}
                  >
                    <Box
                      onClick={() => onUploadClick("Images")}
                      sx={{
                        width: "30px",
                        height: "30px",
                        flexGrow: "0",
                        borderRadius: "20px",
                        backgroundColor: "#fff",
                        margin: {
                          xs: "0px 8px 8px 0px",
                          lg: "0px 8px 8px 0px",
                        },
                        border: "solid 1px #2d2d39",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      <Icon />
                    </Box>

                    {colorCode.map((val) => {
                      return (
                        <Box
                          onClick={() => handleColorPallete(val)}
                          sx={{
                            width: "30px",
                            height: "30px",
                            flexGrow: "0",
                            borderRadius: "20px",
                            backgroundColor: val,
                            margin: {
                              xs: "0px 8px 8px 0px",
                              lg: "0px 8px 8px 0px",
                            },
                            border: val === "#fff" ? "solid 1px #e6eaed" : null,
                            cursor: "pointer",
                          }}
                        ></Box>
                      );
                    })}
                    <Box
                      onClick={handleRefresh}
                      sx={{
                        width: "30px",
                        height: "30px",
                        flexGrow: "0",
                        borderRadius: "20px",
                        backgroundColor: "#fff",
                        border: "solid 1px #2d2d39",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        margin: {
                          xs: "0px 8px 8px 0px",
                          lg: "0px 0px 8px 0px",
                        },
                      }}
                    >
                      <Refresh/>
                    </Box>
                  </Box> */}
              </Grid>
            </Grid>
          </CommonBoxWithNumber>
        </CommentWrapper>
      </Box>
      <AnswerContent
        showGallery={showGallery}
        answers={answers}
        setAnswers={setAnswers}
        addImage={addImage}
        setAddImage={setAddImage}
        qusUnsavedChanges={qusUnsavedChanges}
      />
    </Box>
  );
};
export default AddQuestion;
