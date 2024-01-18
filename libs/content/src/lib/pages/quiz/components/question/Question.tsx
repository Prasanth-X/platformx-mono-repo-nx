import AddIcon from "@mui/icons-material/Add";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { DraggableQuestions } from "./DragableQuestions";
// import CommonBoxWithNumber from "../../Common/CommonBoxWithNumber/CommonBoxWithNumber";
import { useCustomStyle } from "../../quiz.style";
import { CommentWrapper } from "@platformx/comment-review";
import { CommonBoxWithNumber, TitleSubTitle } from "@platformx/utilities";
import { useComment } from "@platformx/authoring-apis";
// import TitleSubTitle from "../Common/TitleSubTitle";

export const Question = ({
  quizState,
  setQuizState,
  onClickAddQuestion,
  setIsClickedQueList,
  onClickEditQuestion,
}) => {
  const onClickQueList = () => {
    setIsClickedQueList(true);
  };
  const { t } = useTranslation();
  const { comments, handleCommentClick, scrollToRef, selectedElementId } = useComment();
  const classes = useCustomStyle();
  return (
    <Box id='questions' className={classes.mainStyleWrapper}>
      <CommentWrapper elementId='3' scrollRef={scrollToRef}  >
        <CommonBoxWithNumber
          number='03'
          title={t("quiz_question_head")}
          titleVarient='p3semibold'
          subTitleVarient='p4regular'
          subTitle={t("subhead")}>
          <Grid container>
            <Grid item xs={12} sm={12} md={5} em={5} className='leftFiledLast'>
              <TitleSubTitle
                title={`${t("quiz_question_head")}*`}
                subTitle={t("quiz_question_subtitle")}
                titleVariant='h6medium'
                subTitleVariant='h7regular'
              />
            </Grid>
            <Grid item xs={12} sm={12} md={7} em={7}>
              <Box
                sx={{
                  ".draggable-category": {
                    paddingRight: "0",
                  },
                }}>
                <DraggableQuestions
                  quizState={quizState}
                  setQuizState={setQuizState}
                  onClickEditQuestion={onClickEditQuestion}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { sm: "row", xs: "column" },
                  justifyContent: "flex-end",
                  padding: {
                    xs: quizState?.questions?.length > 0 ? "20px 0px 20px 0px" : "none",
                  },
                  // justifyContent:'space-evenly'
                }}>
                <Button
                  variant='primaryButton'
                  sx={{
                    margin: { xs: "0 0 10px 0", md: "0 12px 0 0" },
                  }}
                  onClick={onClickAddQuestion}>
                  {t("add_questions")}
                </Button>

                <Button variant='secondaryButton' onClick={onClickQueList}>
                  {t("choose_from_list")}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CommonBoxWithNumber>
      </CommentWrapper>
    </Box>
  );
};
