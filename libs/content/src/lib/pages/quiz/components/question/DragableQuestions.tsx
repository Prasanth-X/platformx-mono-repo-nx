import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Drag, DragAndDrop, Drop, EditIcon, IconAndLabel, MoreHorizIcon, TitleSubTitle } from "@platformx/utilities";
import React, { useState } from "react";

const MIN_QUESTIONS = 4;

export const DraggableQuestions = ({ quizState, setQuizState, onClickEditQuestion }) => {
  const [showAll, setShowAll] = useState(false);

  const questions = quizState?.questions;
  const renderQuestions = showAll ? questions : questions?.slice(0, MIN_QUESTIONS);
  const [items, setItems] = useState("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, val) => {
    setAnchorEl(event.currentTarget);
    setItems(val);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  const handleDragEnd = (result) => {
    const { type, source, destination } = result;
    if (!destination) return;
    if (type === "droppable-category") {
      const updatedAnswers = reorder(questions, source.index, destination.index);
      setQuizState({ ...quizState, questions: updatedAnswers as [] });
    }
  };

  const onDeleteOption = (id) => {
    const tempQue = quizState?.questions.filter((item) => item.current_page_url !== id);
    setQuizState({ ...quizState, questions: tempQue });
    setAnchorEl(null);
  };
  const onEditOption = () => {
    setAnchorEl(null);
    console.info(items);
    onClickEditQuestion(items);
  };

  return (
    <>
      <DragAndDrop onDragEnd={handleDragEnd}>
        <Drop id='droppable' type='droppable-category'>
          {renderQuestions.map((question, questionIndex) => {
            return (
              <Drag
                className='draggable-category'
                key={question?.current_page_url}
                id={question?.current_page_url}
                index={questionIndex}>
                <Box
                  className='category-container'
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    border: "solid 1px #ced3d9",
                    borderRadius: "5px",
                    padding: "13px 14px",
                    width: "100%",
                  }}>
                  <Box>
                    <TitleSubTitle
                      title={`${question?.question_type} • ${question?.options_compound_fields?.length} Options`}
                      subTitle={question?.question}
                      titleVariant='h7regular'
                      subTitleVariant='h6regular'
                      titleColor='#89909a'
                      subTitleColor='#00000'
                    />
                  </Box>
                  <Box>
                    <IconButton
                      onClick={(e) => handleClick(e, question?.current_page_url)}
                      sx={{ width: "32px", height: "32px" }}>
                      <img
                        src={MoreHorizIcon}
                        style={{ objectFit: "cover", transform: "rotate(90deg)" }}
                        alt=''
                      />
                    </IconButton>
                  </Box>
                </Box>
              </Drag>
            );
          })}
        </Drop>
        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          sx={{
            ".Platform-x-Menu-paper": {
              boxShadow: "0 10px 25px 0 rgba(0, 0, 0, 0.12);",
              borderRadius: "5px",
              paddingLeft: "0px",
              paddingRight: "0px",
            },
          }}>
          <MenuItem onClick={onEditOption}>
            <Box sx={{ width: "24px", height: "24px", padding: "3px", marginRight: "5px" }}>
              <img src={EditIcon} style={{ objectFit: "cover" }} alt='' />
            </Box>
            Edit
          </MenuItem>
          <MenuItem onClick={() => onDeleteOption(items)}>
            <CloseOutlinedIcon sx={{ marginRight: "5px", color: "#6e7191" }} />
            Remove
          </MenuItem>
        </Menu>
      </DragAndDrop>
      {questions?.length > MIN_QUESTIONS && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {showAll ? (
            <IconAndLabel
              icon={<VisibilityIcon />}
              label='View less'
              handelClick={setShowAll}
              funcProp={false}
            />
          ) : (
            <IconAndLabel
              icon={<VisibilityIcon />}
              label='View all'
              handelClick={setShowAll}
              funcProp
            />
          )}
        </Box>
      )}
    </>
  );
};
