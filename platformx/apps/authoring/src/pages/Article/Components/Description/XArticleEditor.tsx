import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import LinkIcon from '@mui/icons-material/Link';
import {
  Box,
  ButtonGroup,
  Dialog,
  Grid,
  IconButton,
  Tooltip,
} from '@mui/material';
import { makeStyles } from '@material-ui/core';

import i18next from 'i18next';
import DOMPurify from 'isomorphic-dompurify';
import React, { useEffect, useRef, useState } from 'react';
import ReactDomServer from 'react-dom/server';
import { useTranslation } from 'react-i18next';
import AiSvgDisabled from '../../../../assets/svg/AiSvgDisabled.svg';
import AiSvg from '../../../../assets/svg/AiSvg.svg';
import { createChatGptRequest } from '../../../../services/chatGpt/chatGpt.api';
import { handleHtmlTags, trimString } from '../../../../utils/helperFunctions';
import Gallery from '../../../Gallery/Gallery';
import ContentGallery from '../ContentGallery/ContentGallery';
import DescriptionContentCard from '../DescriptionContentCard';
import MediaTray from '../MediaTray/MediaTray';
import AddUrlDialog from '../url-dialog-box/AddUrlDialog';
import ChatGptLoader from './ChatGptLoader';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 3,
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 2,
  },
  iconButton: {
    marginLeft: 1,
    marginRight: 1,
  },
  borderlessInputRoot: {
    '& .MuiOutlinedInput-root': {
      border: 'none',
      boxShadow: 'none',
    },

    '& .MuiInputBase-input': {
      fontSize: '2rem',
      fontWeight: '600',
    },
  },
  borderlessBox: {
    border: 'none',
  },
}));

const XArticleEditor = ({ title, state, setState, setCheckDesc }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [isContentEditable, setIsContentEditable] = useState(true);

  const rows = useRef<string[]>(['']);
  const [currentRow, setCurrentRow] = useState<number | null>(0);
  const inputRefs = useRef<Array<any | null>>([]);
  const [isChatGptLoading, setIsChatGptLoading] = useState(false);
  //popup states
  const contentTypes: string[] = ['Quiz', 'Poll', 'Article', 'Vod'];
  const contentType = useRef<string[]>();
  const [galleryState, setGalleryState] = useState<boolean>(false);
  const [contentGalleryState, setContentGalleryState] =
    useState<boolean>(false);
  const galleryType = useRef<string>('Images');
  const [showToolbar, setShowToolbar] = useState(false);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const updateTempObj = useRef<any>({});
  const [isUrlDialog, setUrlDialog] = useState(false);
  const [, setSelectedImage] = useState({
    Thumbnail: '',
    Title: '',
    Description: '',
  });
  const [, setSelectedVideo] = useState({
    Thumbnail: '',
    Title: '',
    Description: '',
    Url: '',
  });

  useEffect(() => {
    if (Object.keys(state).length > 0) {
      rows.current = state?.CommonFields?.description.split('<br><br>');
    }
  }, [state]);

  const isRowEmpty = (rowText: string) => {
    return rowText.trim() === '';
  };

  const showGallery = (type: string) => {
    if (type == 'content') {
      contentType.current = contentTypes;
      setContentGalleryState(true);
    } else {
      galleryType.current = type;
      setGalleryState(true);
    }
  };

  const getFinalDescription = () => {
    setCheckDesc(rows.current.join('<br><br>'));
    setState({
      ...state,
      CommonFields: {
        ...state.CommonFields,
        description: rows.current.join('<br><br>'),
        settings: {
          ...state.CommonFields.settings,
          socialog_description: trimString(
            handleHtmlTags(rows.current.join('<br><br>')),
            200
          ),
        },
        structure_data: '',
      },
    });
  };

  //adding a new row after adding content types/image/video
  const addNewRow = () => {
    const newRows = [...rows.current];
    newRows.splice(currentRow + 1, 0, '');
    rows.current = newRows;
    setCurrentRow(currentRow + 1);
  };

  //adding image to row
  const handleSelectedImage = (image) => {
    const newRows = [...rows.current];
    newRows[
      currentRow
    ] = `<img class="content" src='${image.Thumbnail}' style='width: 100%; height: auto'/><br /><br />`;
    rows.current = newRows;
    addNewRow();
    setState({
      ...state,
      CommonFields: {
        ...state.CommonFields,
        description: rows.current.join('<br><br>'),
        settings: {
          ...state.CommonFields.settings,
          socialog_description: trimString(
            handleHtmlTags(rows.current.join('<br><br>')),
            200
          ),
        },
        structure_data: '',
      },
    });
  };

  //adding video to row
  const handleSelectedVideo = (video) => {
    const newRows = [...rows.current];
    newRows[
      currentRow
    ] = `<video class="content" controls playsinline style="object-fit: cover; display: block" poster='${video.Thumbnail}'><source src='${video.Url}' type="video/mp4"></video><br /><br />`;
    rows.current = newRows;
    addNewRow();
    setState({
      ...state,
      CommonFields: {
        ...state.CommonFields,
        description: rows.current.join('<br><br>'),
        settings: {
          ...state.CommonFields.settings,
          socialog_description: trimString(
            handleHtmlTags(rows.current.join('<br><br>')),
            200
          ),
        },
        structure_data: '',
      },
    });
  };

  //adding content types to row
  const handleSelectedContent = async (item) => {
    const el = document.getElementById('desc');
    const contentAdded = ReactDomServer.renderToString(
      <DescriptionContentCard content={item}></DescriptionContentCard>
    );
    const newRows = [...rows.current];
    newRows[currentRow] = contentAdded;
    rows.current = newRows;
    addNewRow();
    setContentGalleryState(!contentGalleryState);
    setState({
      ...state,
      CommonFields: {
        ...state.CommonFields,
        description: rows.current.join('<br><br>'),
        settings: {
          ...state.CommonFields.settings,
          socialog_description: trimString(
            handleHtmlTags(rows.current.join('<br><br>')),
            200
          ),
        },
        structure_data: '',
      },
    });
  };

  const setImageOrVideoToDefault = () => {
    setSelectedImage({
      Title: '',
      Thumbnail: '',
      Description: '',
    });
    setSelectedVideo({
      Title: '',
      Thumbnail: '',
      Description: '',
      Url: '',
    });
  };

  const toggleGallery = (toggleState, type) => {
    setGalleryState(toggleState);
    if (type == 'cancel') {
      setImageOrVideoToDefault();
    }
  };

  const onToggleContentGallery = () => {
    setContentGalleryState(!contentGalleryState);
  };

  const onPasteContent = (index, event) => {
    event.preventDefault();
    const paste = event.clipboardData.getData('text');
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    selection.deleteFromDocument();
    selection.getRangeAt(0).insertNode(document.createTextNode(paste));
    selection.collapseToEnd();
    const newRows = [...rows.current];
    newRows[index] = paste;
    rows.current = newRows;
  };

  const handleContentTypeInputChange = (index: number, event) => {
    const newRows = [...rows.current];
    newRows[index] = event.target.innerText;
    rows.current = newRows;

    // Check if the current row is empty or has only one character
    if (isRowEmpty(newRows[index]) && index !== currentRow) {
      setCurrentRow(index);

      if (index > 0) {
        const previousRow = inputRefs.current[index - 1];
        if (previousRow) {
          // Focus on the previous row
          previousRow.focus();
          const textLength = previousRow.innerText.length;
          const range = document.createRange();
          const selection = window.getSelection();
          range.setStart(previousRow.firstChild, textLength);
          range.setEnd(previousRow.firstChild, textLength);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    }
  };

  const handleBackspacePress = (
    event: React.KeyboardEvent<any>,
    index: number
  ) => {
    if (event.key === 'Backspace') {
      const newRows = [...rows.current];
      const currentRowText = newRows[index];

      if (currentRowText === '' && index > 0) {
        // If the current row is empty and not the first row, remove it
        newRows.splice(index, 1);
        rows.current = newRows;
        const previousRow = inputRefs.current[index - 1];
        if (previousRow) {
          // Save the cursor position
          const selection = window.getSelection();
          const cursorOffset = selection.anchorOffset;

          setCurrentRow(index - 1);
          setTimeout(() => {
            // Focus on the previous row
            previousRow.focus();

            const lastCharIndex = previousRow.innerText.length;
            const range = document.createRange();
            const selectionAfterFocus = window.getSelection();
            range.setStart(previousRow.firstChild, lastCharIndex);
            range.setEnd(previousRow.firstChild, lastCharIndex);
            selectionAfterFocus.removeAllRanges();
            selectionAfterFocus.addRange(range);
          }, 0);
        }
      } else if (currentRowText.length === 1 && currentRowText !== '<') {
        // If the current row has only one character (excluding '<'), remove it
        const selection = window.getSelection();
        const cursorOffset = selection.anchorOffset;

        newRows[index] = '';
        rows.current = newRows;

        // Restore the cursor position
        setTimeout(() => {
          const lastCharIndex = cursorOffset - 1;
          const range = document.createRange();
          const selectionAfterDelete = window.getSelection();
          range.setStart(inputRefs.current[index]?.firstChild, lastCharIndex);
          range.setEnd(inputRefs.current[index]?.firstChild, lastCharIndex);
          selectionAfterDelete.removeAllRanges();
          selectionAfterDelete.addRange(range);
        }, 0);
      } else if (currentRowText.includes('<img')) {
        // If the current row contains an image, remove it
        newRows[index] = '';
        rows.current = newRows;
      }
    } else if (event.key === 'Enter') {
      const newRows = [...rows.current];
      newRows.splice(index + 1, 0, '');
      rows.current = newRows;
      setCurrentRow(index + 1);
      event.preventDefault();
    }
  };

  const handleMouseLeave = () => {
    setCurrentRow(null);
  };

  const handleMouseEnter = (index: number) => {
    if (isRowEmpty(rows.current[index])) {
      setCurrentRow(index);
    }
  };

  const handleInputKeyPress = (
    event: React.KeyboardEvent<any>,
    index: number
  ) => {
    if (event.key === 'Enter') {
      // let currentRowData = rows.current[index];
      // let cursorPos = document.getSelection().anchorOffset;
      // if(currentRowData.slice(cursorPos, currentRowData.length).length) {
      //   const newRows = [...rows.current];
      //   newRows[index] = currentRowData.slice(0,cursorPos);
      //   newRows.splice(index + 1, 0, currentRowData.slice(cursorPos, currentRowData.length));
      //   rows.current = (newRows);
      //   setCurrentRow(index + 1);
      // } else {
      const newRows = [...rows.current];
      newRows.splice(index + 1, 0, '');
      rows.current = newRows;
      setCurrentRow(index + 1);
      // }
      event.preventDefault();
    }
  };

  useEffect(() => {
    if (currentRow !== null && inputRefs.current[currentRow]) {
      inputRefs.current[currentRow]?.focus();
    }
  }, [currentRow]);

  const LanguageNameMapping = {
    en: 'English',
    fr: 'French',
    de: 'German',
  };

  const chatGptResponse = async (prompt, index) => {
    const requestParam = {
      input: {
        prompt: prompt,
      },
    };
    createChatGptRequest(requestParam)
      .then((result: any) => {
        const chatGptDataResponse = result?.authoring_getContentOpenai?.text;
        if (chatGptDataResponse) {
          setIsChatGptLoading(false);
          let arrIndex = 0;
          chatGptDataResponse
            .replace(/(\r<br>|<br>|\r)/gm, '')
            .split('\n\n')
            .map((item, key) => {
              console.log('items', item.length);
              if (item.length != 0) {
                console.log('items', item.length, index + key);
                const newRows = [...rows.current];
                newRows.splice(
                  index + arrIndex,
                  0,
                  item.replace(/(\r<br>|<br>|\r)/gm, '')
                );
                rows.current = newRows;
                setCurrentRow(index + arrIndex + 1);
                arrIndex++;
              }
            });
        }
        setIsChatGptLoading(false);
        setState({
          ...state,
          CommonFields: {
            ...state.CommonFields,
            description: rows.current.join('<br><br>'),
            settings: {
              ...state.CommonFields.settings,
              socialog_description: trimString(
                handleHtmlTags(rows.current.join('<br><br>')),
                200
              ),
            },
            structure_data: '',
          },
        });
      })
      .catch((err) => {
        throw err;
      });
  };

  const chatGPT = (index) => {
    setIsChatGptLoading(true);
    const chatGptPrompt = process.env.REACT_APP_CHAT_GPT_PROMPT
      ? process.env.REACT_APP_CHAT_GPT_PROMPT
      : 'Please write 3 paragraph article about';
    chatGptResponse(
      `${chatGptPrompt} ${title} in ${LanguageNameMapping[i18next.language]}`,
      index
    );
  };

  const handleTextSelection = (e, index) => {
    const selection = document.getSelection();
    const selectedText = selection?.toString();
    setIsContentEditable(selectedText === '');
    console.log('selectedText', selectedText);
    const { pageX } = e;
    const { pageY } = e;
    if (selectedText?.trim() != '') {
      const start = selection?.anchorOffset;
      const end = selection?.focusOffset;
      console.log('start', start, selectedText, selection);
      console.log('end', end);
      setTop(pageY - 60);
      setLeft(pageX - 55);
      setShowToolbar(true);
      updateTempObj.current = selection?.getRangeAt(0);
    } else {
      setShowToolbar(false);
    }
  };

  const onBoldClick = (e) => {
    document.execCommand('bold', false, null);
    console.log('bold temp', updateTempObj.current);
    setShowToolbar(false);
  };
  const onItalicClick = (e) => {
    document.execCommand('italic', false, undefined);
    setShowToolbar(false);
  };
  const onUnderlineClick = (e) => {
    document.execCommand('underline', false, undefined);
    setShowToolbar(false);
  };
  const onBlockquoteClick = () => {
    if (document.queryCommandValue('FormatBlock') === 'blockquote') {
      document.execCommand('FormatBlock', false, '<div>');
    } else {
      document.execCommand('FormatBlock', false, '<blockquote>');
    }
    setShowToolbar(false);
  };

  const onUrlDialogOpen = () => {
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(updateTempObj.current);
    const ifUrl = window.getSelection().getRangeAt(0);
    if (ifUrl.startContainer.parentNode.nodeName === 'A') {
      document.execCommand('unLink', false, `${selection}`);
    } else {
      setUrlDialog(true);
      setShowToolbar(false);
    }
  };

  const onClickDone = (url) => {
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(updateTempObj.current);
    if (url) {
      document.execCommand(
        'insertHTML',
        false,
        `<a href="${
          url.includes('http') ? url : `//${url}`
        }" rel="noreferrer" target="_blank">${selection}</a>`
      );
    }
    setUrlDialog(false);
  };

  return (
    <>
      {isChatGptLoading && <ChatGptLoader />}
      {isUrlDialog ? (
        <AddUrlDialog
          titledata=""
          isDialogOpen={isUrlDialog}
          closeButtonHandle={() => setUrlDialog(false)}
          doneButtonHandle={onClickDone}
        />
      ) : null}
      <Dialog fullScreen open={galleryState}>
        <Gallery
          handleImageSelected={handleSelectedImage}
          toggleGallery={toggleGallery}
          galleryMode={galleryType.current}
          handleVideoSelected={handleSelectedVideo}
        />
      </Dialog>
      <Dialog fullScreen open={contentGalleryState}>
        <ContentGallery
          handleSelectedContent={handleSelectedContent}
          onToggleContentGallery={onToggleContentGallery}
          contentType={contentType.current}
        />
      </Dialog>
      <ButtonGroup
        className="tools"
        id="toolbar"
        style={{
          display: showToolbar ? 'inline-flex' : 'none',
          backgroundColor: 'black',
          left,
          top,
          position: 'fixed',
        }}
      >
        <IconButton onClick={onBoldClick} sx={{ color: 'white' }}>
          <FormatBoldIcon />
        </IconButton>
        <IconButton onClick={onItalicClick} sx={{ color: 'white' }}>
          <FormatItalicIcon />
        </IconButton>
        <IconButton onClick={onUnderlineClick} sx={{ color: 'white' }}>
          <FormatUnderlinedIcon />
        </IconButton>
        <IconButton onClick={onUrlDialogOpen} sx={{ color: 'white' }}>
          <LinkIcon />
        </IconButton>
        <IconButton onClick={onBlockquoteClick} sx={{ color: 'white' }}>
          <FormatQuoteIcon />
        </IconButton>
      </ButtonGroup>
      {rows.current.map((row, index) => (
        <Box key={`${index}editor`} onClick={() => handleMouseEnter(index)}>
          <Grid
            my={2}
            container
            onClick={() => handleMouseEnter(index)}
            alignItems={'center'}
          >
            <Grid item xs={2} md={0.5}>
              {currentRow === index ? (
                <MediaTray showGallery={showGallery} />
              ) : null}
            </Grid>
            <Grid item xs={8} md={10} key={index}>
              <Box
                contentEditable={true}
                sx={{ backgroundColor: '#fff', color: '#000' }}
                ref={(ref) => (inputRefs.current[index] = ref)}
                className={classes.borderlessBox}
                placeholder={t('des_placeholder')}
                onPaste={(e) => onPasteContent(index, e)}
                onBlur={getFinalDescription}
                onKeyDown={(e: any) => handleBackspacePress(e, index)}
                onInput={(e) => handleContentTypeInputChange(index, e)}
                onMouseUp={(e) => handleTextSelection(e, index)}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    row,
                    { ADD_ATTR: ['target'] } || ''
                  ),
                }}
              ></Box>
            </Grid>
            <Grid
              item
              xs={2}
              md={0.5}
              sx={{
                display: currentRow === index ? 'block' : 'none',
              }}
            >
              <Tooltip
                className="divTooltip"
                placement="left"
                componentsProps={{
                  tooltip: {
                    sx: {
                      background: title?.length > 0 ? '#D7ECFD' : '#D9DBE9',
                      color: title?.length > 0 ? '#14142B' : '#6E7191',
                      fontSize: '12px',
                      minHeight: '30px',
                      lineHeight: '30px',
                      paddingTop: '0px',
                      paddingBottom: '0px',
                      marginRight: '10px',
                    },
                  },
                }}
                title="Generate AI Content"
              >
                <Box onClick={() => title?.length > 0 && chatGPT(index)}>
                  {title?.length > 0 ? (
                    <AiSvg className="DivEnable" height="30px" width="30" />
                  ) : (
                    <AiSvgDisabled
                      className="DivDisable"
                      height="30px"
                      width="30"
                    />
                  )}
                </Box>
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
      ))}
    </>
  );
};

export default XArticleEditor;
