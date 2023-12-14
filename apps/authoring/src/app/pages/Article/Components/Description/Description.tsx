/* eslint-disable no-irregular-whitespace */
import { makeStyles } from '@material-ui/core';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import LinkIcon from '@mui/icons-material/Link';
import { Box, ButtonGroup, Dialog, IconButton, Tooltip } from '@mui/material';

import DOMPurify from 'isomorphic-dompurify';
import React, { useEffect, useRef, useState } from 'react';
import ReactDomServer from 'react-dom/server';
import { useTranslation } from 'react-i18next';
import AiSvg from '../../../../assets/svg/ai.svg';
import AiSvgDisabled from '../../../../assets/svg/aiDisabled.svg';

import i18next from 'i18next';
import { createChatGptRequest } from '../../../../services/chatGpt/chatGpt.api';
import { handleHtmlTags, trimString } from '../../../../utils/helperFunctions';
import Gallery from '../../../Gallery/Gallery';
import ContentGallery from '../ContentGallery/ContentGallery';
import DescriptionContentCard from '../DescriptionContentCard';
import MediaTray from '../MediaTray/MediaTray';
import AddUrlDialog from '../url-dialog-box/AddUrlDialog';
import ChatGptLoader from './ChatGptLoader';
import './editor.css';
const useStyles = makeStyles({
  customTextArea: {
    '& input::placeholder': {
      fontSize: '16px',
      color: '#ced3d9',
    },
  },
});
function Description({
  title,
  showMediaOption,
  setShowMediaOption,
  state,
  setState,
  setCheckDesc,
}) {
  const { t } = useTranslation();
  const classes = useStyles();
  const currentLine = useRef<any>('');
  const galleryType = useRef<string>('Images');
  const contentTypes: string[] = ['Quiz', 'Poll', 'Article', 'Vod'];
  const contentType = useRef<string[]>();
  const desc = useRef<any>('');
  const [galleryState, setGalleryState] = useState<boolean>(false);
  const [showOutput, setShowOutput] = useState<any>(null);
  // const [showMediaOption, setShowMediaOption] = useState(true);
  const [confirmImageOrVideoDelete, setConfirmImageOrVideoDelete] =
    useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState({
    Thumbnail: '',
    Title: '',
    Description: '',
  });
  const [selectedVideo, setSelectedVideo] = useState({
    Thumbnail: '',
    Title: '',
    Description: '',
    Url: '',
  });
  const [data, setData] = useState('');
  const [showToolbar, setShowToolbar] = useState(false);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [isUrlDialog, setUrlDialog] = useState(false);
  const [description, setDescription] = useState<any>('');
  const updateTempObj = useRef<any>({});
  const [contentGalleryState, setContentGalleryState] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ifLink, setIfLink] = useState(false);

  const handlePlaceholder = (e) => {
    const ele = document.getElementById('desc');
    // Get the placeholder attribute
    const placeholder = ele?.getAttribute('data-placeholder');
    // Set the placeholder as initial content if it's empty
    if (ele?.innerHTML === '') {
      ele.innerHTML = placeholder || '';
    }
    const value = e.target.innerHTML;
    if (value === placeholder) {
      e.target.innerHTML = '';
    }
  };

  const handleTextSelection = (e) => {
    const selection = document.getSelection();
    const selectedText = selection?.toString();
    const { pageX } = e;
    const { pageY } = e;
    if (selectedText?.trim() != '') {
      const start = selection?.anchorOffset;
      const end = selection?.focusOffset;
      setTop(pageY - 60);
      setLeft(pageX - 55);
      setShowToolbar(true);
      updateTempObj.current = selection?.getRangeAt(0);
      if (selection.focusNode.parentElement.nodeName === 'A') {
        setIfLink(true);
      } else {
        setIfLink(false);
      }
    } else {
      setShowToolbar(false);
    }
  };

  useEffect(() => {
    const dataHolder = document.getElementById('desc');
    dataHolder?.addEventListener('focus', handlePlaceholder);
    dataHolder?.addEventListener('mouseup', handleTextSelection);
    return () => {
      dataHolder?.removeEventListener('mouseup', handleTextSelection);
      dataHolder?.removeEventListener('focus', handlePlaceholder);
    };
  }, []);
  useEffect(() => {
    const target = document.getElementById('desc');
    if (target) {
      target.addEventListener('paste', (event) => {
        event.preventDefault();
        const paste = event.clipboardData?.getData('text') || ''; //getData('text');
        console.log('paste', paste);
        const selection = window.getSelection();
        if (!selection?.rangeCount) return;
        selection.deleteFromDocument();
        selection
          .getRangeAt(0)
          .insertNode(
            document.createTextNode(paste.replace(/(\r\n|\n|\r)/gm, ''))
          );
      });
    }
  });
  const onUpdate = () => {
    const dataHolder = document?.getElementById('desc');
    let tempData = '';
    if (dataHolder) {
      tempData = dataHolder.innerHTML;
    }
    setData(tempData);
  };

  const onBoldClick = (e) => {
    document.execCommand('bold', false, undefined);
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
  const onClickDone = (url) => {
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(updateTempObj.current);
    if (url) {
      document.execCommand(
        'insertHTML',
        false,
        `<a href="${url}" target="_blank">${selection}</a>`
      );
    }
    setUrlDialog(false);
  };
  const onUrlDialogOpen = () => {
    if (ifLink) {
      document.execCommand('unLink', false, `${updateTempObj.current}`);
      setShowToolbar(false);
    } else {
      setUrlDialog(true);
      setShowToolbar(false);
    }
  };
  const onClickClose = () => {
    setUrlDialog(false);
  };
  const [desc11, setDesc11] = useState('');
  const onChange = (e) => {
    setCheckDesc(document?.getElementById('desc')?.innerHTML);
    // setState({
    //   ...state,
    //   CommonFields: {
    //     ...state.CommonFields,
    //     description: e.currentTarget.textContent,
    //   },
    // });
  };
  const handleDescriptionChange = (e) => {
    setShowOutput(document?.getElementById('desc')?.innerHTML);
    // updateField({ Description: document?.getElementById('desc')?.innerHTML });
    if (!showToolbar) {
      setState({
        ...state,
        CommonFields: {
          ...state.CommonFields,
          description: document?.getElementById('desc')?.innerHTML,
          settings: {
            ...state.CommonFields.settings,
            socialog_description: trimString(
              handleHtmlTags(document?.getElementById('desc')?.innerHTML),
              200
            ),
          },
          structure_data: '',
        },
      });
      onUpdate();
    }
  };
  const showMediaCheck = (e) => {
    if (showMediaOption && currentLine.current != '') {
      // setShowMediaOption(false);
    }
  };
  function whichTag(tagName) {
    let sel, containerNode;
    let tagFound = false;
    tagName = tagName.toUpperCase();
    if (window.getSelection) {
      sel = window.getSelection();
      if (sel.rangeCount > 0) {
        containerNode = sel.getRangeAt(0).commonAncestorContainer;
      }
    } else if ((sel = document.getSelection) && sel.type != 'Control') {
      containerNode = sel.createRange().parentElement();
    }
    while (containerNode) {
      if (containerNode.nodeType == 1 && containerNode.tagName == tagName) {
        tagFound = true;
        containerNode = null;
      } else {
        containerNode = containerNode.parentNode;
      }
    }
    return tagFound;
  }

  const printInput = (e) => {
    // handleEnableArticlePreview(
    //   'description',
    //   document.getElementById('desc')?.innerHTML
    // );
    setShowToolbar(false);
    if (e.key === 'Backspace' || e.key === 'Delete') {
      currentLine.current = currentLine.current.slice(
        0,
        currentLine.current.length - 1
      );
      if (currentLine.current == '') setShowMediaOption(true);
      return;
    }
    if (e.key === 'Enter') {
      setShowMediaOption(true);
      if (whichTag('blockquote')) {
        document.execCommand('Outdent');
      }
      if (whichTag('b')) {
        document.execCommand('bold', false, undefined);
      }
      if (whichTag('i')) {
        document.execCommand('italic', false, undefined);
      }
      if (whichTag('u')) {
        document.execCommand('underline', false, undefined);
      }
      if (desc.current == '') {
        desc.current = `<p>${currentLine.current}</p>`;
      } else {
        desc.current = `${desc.current}<br><br><p>${currentLine.current}</p>`;
      }
      currentLine.current = '';
    } else {
      currentLine.current = currentLine.current + e.key;
    }
  };

  const handleSelectedImage = (image) => {
    setSelectedImage(image);
    const el = document.getElementById('desc');
    if (el !== null) {
      el.innerHTML = `${el.innerHTML}<img src='${image.Thumbnail}' class='descAsset' style='display:block;object-fit:cover'/><br><br>`;
    }
    desc.current = `${desc.current}<img src='${image.Thumbnail}' class='descAsset' style='display:block;object-fit:cover'/><br><br>`;
    setShowOutput(document?.getElementById('desc')?.innerHTML);
    // setShowMediaOption(false);
    // updateField({ Description: document?.getElementById('desc')?.innerHTML });
    setState({
      ...state,
      CommonFields: {
        ...state.CommonFields,
        description: document?.getElementById('desc')?.innerHTML,
        settings: {
          ...state.CommonFields.settings,
          socialog_description: trimString(
            handleHtmlTags(document?.getElementById('desc')?.innerHTML),
            200
          ),
        },
      },
    });
  };

  const handleSelectedVideo = (video) => {
    setSelectedVideo(video);
    const el = document.getElementById('desc');
    if (el !== null) {
      el.innerHTML = `${el.innerHTML}<video class='descAsset' controls playsinline style="object-fit: cover; display: block" poster='${video.Thumbnail}'><source src='${video.Url}' type="video/mp4"></video><br><br>`;
    }
    desc.current = `${desc.current}<video class='descAsset' controls playsinline style="object-fit: cover; display: block" poster='${video.Thumbnail}'><source src='${video.Url}' type="video/mp4"></video><br><br>`;
    setShowOutput(document?.getElementById('desc')?.innerHTML);
    // setShowMediaOption(false);
    // updateField({ Description: document?.getElementById('desc')?.innerHTML });
    setState({
      ...state,
      CommonFields: {
        ...state.CommonFields,
        description: document?.getElementById('desc')?.innerHTML,
        settings: {
          ...state.CommonFields.settings,
          socialog_description: trimString(
            handleHtmlTags(document?.getElementById('desc')?.innerHTML),
            200
          ),
        },
      },
    });
  };

  const handleSelectedContent = async (item) => {
    const el = document.getElementById('desc');
    const contentAdded = ReactDomServer.renderToString(
      <DescriptionContentCard content={item}></DescriptionContentCard>
    );
    if (el !== null) {
      el.innerHTML = el.innerHTML + contentAdded;
    }
    desc.current = desc.current + contentAdded;
    setShowOutput(document?.getElementById('desc')?.innerHTML);
    setContentGalleryState(!contentGalleryState);
    // updateField({ Description: document?.getElementById('desc')?.innerHTML });
    setState({
      ...state,
      CommonFields: {
        ...state.CommonFields,
        description: document?.getElementById('desc')?.innerHTML,
        settings: {
          ...state.CommonFields.settings,
          socialog_description: trimString(
            handleHtmlTags(document?.getElementById('desc')?.innerHTML),
            200
          ),
        },
      },
    });
  };

  const onToggleContentGallery = () => {
    setContentGalleryState(!contentGalleryState);
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

  const showGallery = (gType) => {
    // window.scrollTo(0, 0);
    if (gType == 'content') {
      contentType.current = contentTypes;
      setContentGalleryState(true);
    } else {
      galleryType.current = gType;
      setGalleryState(true);
    }
  };

  const blockQuotes = `
      blockquote{ 
        margin: 0;
        border-left: 3px solid black;
        padding: 5px 10px;
        font-style:italic;
      }
      .placeholdertext[placeholder]:empty::before {
        content: attr(placeholder);
        color: #ced3d9; 
        font-size: 16px;
    }
    
    .placeholdertext[placeholder]:empty:focus::before {
        content: "";
    }
      `;
  const LanguageNameMapping = {
    en: 'English',
    fr: 'French',
    de: 'German',
  };
  //const chatUrl = `${process.env.NX_CHATGPT_API_URI}${i18n.language}/chatgpt`;
  const chatGptResponse = async (prompt) => {
    const requestParam = {
      input: {
        prompt: prompt,
      },
    };
    createChatGptRequest(requestParam)
      .then((result: any) => {
        const chatGptDataResponse = result?.authoring_getContentOpenai?.text;
        if (chatGptDataResponse) {
          setIsLoading(false);
          const el = document.getElementById('desc');
          const dataAdded = chatGptDataResponse.replace(/(\r\n|\n|\r)/gm, '');
          if (el !== null) {
            el.innerHTML = el.innerHTML + dataAdded;
          }
          desc.current = desc.current + dataAdded;
          // updateField({ Description: resp?.data?.data?.[0]?.text });
          setState({
            ...state,
            CommonFields: {
              ...state.CommonFields,
              description: document?.getElementById('desc')?.innerHTML,
              settings: {
                ...state.CommonFields.settings,
                socialog_description: trimString(
                  handleHtmlTags(
                    chatGptDataResponse.replace(/(\r\n|\n|\r)/gm, '')
                  ),
                  200
                ),
              },
            },
          });
          setDescription(document?.getElementById('desc')?.innerHTML);
          setCheckDesc(document?.getElementById('desc')?.innerHTML);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        throw err;
      });
  };

  const chatGPT = () => {
    setIsLoading(true);

    const chatGptPrompt = process.env.NX_CHAT_GPT_PROMPT
      ? process.env.NX_CHAT_GPT_PROMPT
      : 'Please write 3 paragraph article about';

    chatGptResponse(
      `${chatGptPrompt} ${title} in ${LanguageNameMapping[i18next.language]}`
    );

    // console.log('text', document?.getElementById('desc')?.innerHTML);
    // if (chatGptDataResponse?.data?.authoring_getContentOpenai?.text) {
    //   setIsLoading(false);
    //   const el = document.getElementById('desc');
    //   const dataAdded = resp?.data?.data?.[0]?.text;
    //   if (el !== null) {
    //     el.innerHTML = el.innerHTML + dataAdded;
    //   }
    //   desc.current = desc.current + dataAdded;
    //   // updateField({ Description: resp?.data?.data?.[0]?.text });
    //   setState({
    //     ...state,
    //     CommonFields: {
    //       ...state.CommonFields,
    //       description: document?.getElementById('desc')?.innerHTML,
    //       // +
    //       // resp?.data?.data?.[0]?.text,
    //       settings: {
    //         ...state.CommonFields.settings,
    //         socialog_description: trimString(
    //           handleHtmlTags(resp?.data?.data?.[0]?.text),
    //           200
    //         ),
    //       },
    //     },
    //   });
    //   setDescription(
    //     document?.getElementById('desc')?.innerHTML
    //     // +
    //     //   resp?.data?.data?.[0]?.text
    //   );
    // }
    // axios
    //   .post(chatUrl, {
    //     prompt: `write an article on the topic ${title}`,
    //     max_length: 1000,
    //     numbers: 1,
    //     temp: 1,
    //   })
    //   .then((resp) => {
    //     if (resp?.data?.data?.[0]?.text) {
    //       setIsLoading(false);
    //       const el = document.getElementById('desc');
    //       const dataAdded = resp?.data?.data?.[0]?.text;
    //       if (el !== null) {
    //         el.innerHTML = el.innerHTML + dataAdded;
    //       }
    //       desc.current = desc.current + dataAdded;
    //       // updateField({ Description: resp?.data?.data?.[0]?.text });
    //       setState({
    //         ...state,
    //         CommonFields: {
    //           ...state.CommonFields,
    //           description: document?.getElementById('desc')?.innerHTML,
    //           // +
    //           // resp?.data?.data?.[0]?.text,
    //           settings: {
    //             ...state.CommonFields.settings,
    //             socialog_description: trimString(
    //               handleHtmlTags(resp?.data?.data?.[0]?.text),
    //               200
    //             ),
    //           },
    //         },
    //       });
    //       setDescription(
    //         document?.getElementById('desc')?.innerHTML
    //         // +
    //         //   resp?.data?.data?.[0]?.text
    //       );
    //     }
    //   })
    //   .catch((error) => {
    //     setIsLoading(false);

    //     showToastError(t('api_error_toast'));
    //   });
  };
  useEffect(() => {
    if (Object.keys(state).length > 0) {
      setDescription(state?.CommonFields?.description);
    }
  }, [state]);

  return (
    <>
      {isLoading && <ChatGptLoader />}

      <Box
        sx={{
          backgroundColor: '#FFF',
        }}
      >
        <style>{blockQuotes}</style>
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
      </Box>
      <Box
        sx={{
          display: 'flex',
          // justifyContent: 'space-between',
          fontSize: '16px',
          backgroundColor: 'white',
          width: '100%',
          position: 'relative',
        }}
      >
        {/* <Box sx={{ position: 'relative' }}> */}
        <Box
          sx={{
            alignSelf: 'flex-end',
            position: 'absolute',
            left: { xs: '28px', md: '-40px' },
          }}
        >
          {showMediaOption && <MediaTray showGallery={showGallery} />}
        </Box>
        {/* </Box> */}
        <Box
          id="desc"
          sx={{
            width: { xs: '100%', md: '95%' },
          }}
          contentEditable
          onKeyUp={(e) => printInput(e)}
          onKeyDown={(e) => showMediaCheck(e)}
          onBlur={handleDescriptionChange}
          onInput={(e) => onChange(e)}
          onPaste={(e) => onChange(e)}
          // placeholder={t('des_placeholder')}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(description || '', {
              ADD_ATTR: ['target'],
            }),
          }}
          className="placeholdertext"
        ></Box>

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
        <Box
          sx={{
            height: '30px',
            width: '30px',
            paddingLeft: '24px',
            cursor: title?.length > 0 ? 'pointer' : 'initial',
            alignSelf: 'flex-end',
            position: 'absolute',
            right: { xs: '21px', md: '0px' },
            bottom: { xs: '-30px', md: '0px' },
          }}
          onClick={() => title?.length > 0 && chatGPT()}
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
            {title?.length > 0 ? (
              <img src={AiSvg} className="DivEnable" height="30px" width="30" />
            ) : (
              <img
                src={AiSvgDisabled}
                className="DivDisable"
                height="30px"
                width="30"
              />
            )}
          </Tooltip>
        </Box>
      </Box>
      {isUrlDialog ? (
        <AddUrlDialog
          titledata=""
          isDialogOpen={isUrlDialog}
          closeButtonHandle={onClickClose}
          doneButtonHandle={onClickDone}
        />
      ) : null}
    </>
  );
}
export default React.memo(Description);
