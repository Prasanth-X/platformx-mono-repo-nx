import { Box, ButtonGroup, Dialog, IconButton } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
//import { TextArea } from '@mui/base';
import { makeStyles } from '@material-ui/core';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';

import { Store } from '../../store/ContextStore';
import Gallery from '../Gallery/Gallery';
import MediaTray from './MediaTray';
import './editor.css';
//import ItalicIcon from '../../../public/italic.png';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import LinkIcon from '@mui/icons-material/Link';
import axios from 'axios';
import DOMPurify from 'isomorphic-dompurify';
import ReactDomServer from 'react-dom/server';
import { useTranslation } from 'react-i18next';
import ChatGPTSvg from '../../assets/svg/chatgpt.svg';
import i18n from '../../service/i18n';
import ContentGallery from '../ContentGallery/ContentGallery';
import DescriptionContentCard from './DescriptionContentCard';
import AddUrlDialog from './url-dialog-box/AddUrlDialog';

const useStyles = makeStyles({
  customTextArea: {
    '& input::placeholder': {
      fontSize: '16px',
      color: '#ced3d9',
    },
  },
});
function Description({ title, updateField, handleEnableArticlePreview }) {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(Store);
  const { article } = state;
  const classes = useStyles();
  const currentLine = useRef<any>('');
  const galleryType = useRef<string>('Images');
  const contentTypes: string[] = ['Quiz', 'Poll', 'Article', 'Vod'];
  const contentType = useRef<string[]>();
  const desc = useRef<any>('');
  const [galleryState, setGalleryState] = useState<boolean>(false);
  const [showOutput, setShowOutput] = useState<any>(null);
  const [showMediaOption, setShowMediaOption] = useState(true);
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
    } else {
      setShowToolbar(false);
    }
  };
  useEffect(() => {
    if (Object.keys(article?.currentArticle).length > 0) {
      setDescription(article?.currentArticle?.Description);
    }
  }, [article]);
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
        const selection = window.getSelection();
        if (!selection?.rangeCount) return;
        selection.deleteFromDocument();
        selection.getRangeAt(0).insertNode(document.createTextNode(paste));
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
    setUrlDialog(true);
    setShowToolbar(false);
  };
  const onClickClose = () => {
    setUrlDialog(false);
  };
  const handleDescriptionChange = (e) => {
    setShowOutput(document?.getElementById('desc')?.innerHTML);
    updateField({ Description: document?.getElementById('desc')?.innerHTML });
    onUpdate();
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
    handleEnableArticlePreview(
      'description',
      document.getElementById('desc')?.innerHTML
    );
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
      // if (showMediaOption && currentLine.current != '') {
      //   setShowMediaOption(false);
      // }
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
    updateField({ Description: document?.getElementById('desc')?.innerHTML });
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
    updateField({ Description: document?.getElementById('desc')?.innerHTML });
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
    updateField({ Description: document?.getElementById('desc')?.innerHTML });
    console.log('item::', item);
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
  const chatUrl = `${process.env.NX_CHATGPT_API_URI}${i18n.language}/chatgpt`;

  const chatGPT = () => {
    axios
      .post(chatUrl, {
        prompt: `write an article on the topic ${title}`,
        max_length: 1000,
        numbers: 1,
        temp: 1,
      })
      .then((resp) => {
        if (resp?.data?.data?.[0]?.text) {
          updateField({ Description: resp?.data?.data?.[0]?.text });
          setDescription(resp?.data?.data?.[0]?.text);
        }
      });
  };

  return (
    <>
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
          justifyContent: 'space-between',
          fontSize: '16px',
          paddingTop: '14px',
          paddingLeft: { xs: '32px', md: '40px' },
          paddingRight: { xs: '32px', md: '50px' },
          backgroundColor: 'white',
        }}
      >
        <Box
          sx={{
            alignSelf: 'flex-end',
            position: 'absolute',
            left: { xs: '28px', md: '50px' },
          }}
        >
          {showMediaOption ? <MediaTray showGallery={showGallery} /> : null}
        </Box>
        <Box
          id="desc"
          sx={{
            width: { xs: '100%', md: '95%' },
            marginLeft: { xs: 0, md: '3%' },
          }}
          style={{ lineHeight: '25px', fontSize: '20px' }}
          contentEditable
          onKeyUp={(e) => printInput(e)}
          onKeyDown={(e) => showMediaCheck(e)}
          onBlur={handleDescriptionChange}
          placeholder={t('des_placeholder')}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(description || '', {
              ADD_ATTR: ['target'],
            }),
          }}
          className="placeholdertext"
        ></Box>
        {/* <ul className="tools" id='toolbar' style={{ display: showToolbar ? 'inline-flex' : 'none', left, top, position:'absolute' }}>
            <button key='B' onClick={onBoldClick}>B</button>
            <button key='I' onClick={onItalicClick}>I</button>
            <button key='U' onClick={onUnderlineClick}>U</button>
      </ul> */}
        <ButtonGroup
          className="tools"
          id="toolbar"
          style={{
            display: showToolbar ? 'inline-flex' : 'none',
            backgroundColor: 'black',
            left,
            top,
            position: 'absolute',
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
            cursor: title?.length > 0 ? 'pointer' : 'initial',
            alignSelf: 'flex-end',
            position: 'absolute',
            right: { xs: '21px', md: '50px' },
            rect: {
              fill: title?.length > 0 ? 'rgb(16, 163, 127)' : 'grey',
            },
          }}
          onClick={() => title?.length > 0 && chatGPT()}
        >
          <img src={ChatGPTSvg} />
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
      {/* <Box
      sx={{
        width: '100%',
        justifyContent: 'space-between',
        fontSize: '16px',
        paddingTop: '14px',
        paddingLeft: '50px',
        paddingRight: '50px',
        backgroundColor: 'white'
      }}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(showOutput || '') }}
    ></Box> */}
    </>
  );
}
export default React.memo(Description);
