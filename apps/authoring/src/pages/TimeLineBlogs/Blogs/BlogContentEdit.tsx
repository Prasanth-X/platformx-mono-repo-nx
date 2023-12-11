import React, { useEffect, useState } from "react";
import DOMPurify from 'isomorphic-dompurify';
import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";
import ThemeConstants from "../../../theme/variable";
import { convertToLowerCase, handleHtmlTags } from "../../../utils/helperFunctions";

type BlogContentEditProps = {
  desc: any
  blogData: any
  maxCharLength: any
  handleDescriptionChange: any
}

const restOfLengthCall = (ch) => {
  if (ch < 0) {
    return 0
  }
  return ch
};

const BlogContentEdit = (_props: BlogContentEditProps) => {
  const {
    desc = "",
    blogData = {},
    maxCharLength = 0,
    handleDescriptionChange = () => { },
  } = _props;

  const { t } = useTranslation();

  const [restOfChar, setRestOfChar] = useState({
    lengthOfState: 0,
    restOfLength: 0,
    reachLimit: false,
  });
  const { restOfLength = 0, reachLimit = false } = restOfChar;

  const handleLength = (valueData = "") => {
    if (maxCharLength) {
      const lengthOfChar = convertToLowerCase(handleHtmlTags(valueData)).length;
      const rest = valueData ? maxCharLength - lengthOfChar : 0;

      setRestOfChar({
        ...restOfChar,
        restOfLength: rest,
        lengthOfState: lengthOfChar,
        reachLimit: maxCharLength === lengthOfChar ? true : false,
      });
    }
  };

  const keyPressEvent = (e) => {
    if ((e.keyCode !== 8 && e.keyCode !== 46) && desc.current?.textContent?.length >= maxCharLength) {
      e.preventDefault()
    }
  }

  const onPaste = (ev: any) => {
    ev.preventDefault();
    const text = ev.clipboardData.getData("text");
    document.execCommand('insertText', false, text);
  };

  const getTextForFirefox = (el: any) => {
    let text = "";
    if (typeof window.getSelection != "undefined") {
      const sel: any = window.getSelection();
      const tempRange = sel.getRangeAt(0);
      sel.removeAllRanges();
      const range = document.createRange();
      range.selectNodeContents(el);
      sel.addRange(range);
      text = sel.toString();
      sel.removeAllRanges();
      sel.addRange(tempRange);
    }
    return text;
  };

  const getText = (el: any) => {
    return el.innerText || getTextForFirefox(el);
  };

  const onTextChange = (ev) => {
    const text = getText(ev.target);
    handleLength(handleHtmlTags(text));
  }

  useEffect(() => {
    if (blogData?.BlogTextArea !== undefined && blogData?.BlogTextArea !== null) {
      handleLength(handleHtmlTags(blogData?.BlogTextArea));
    }
  }, [blogData?.BlogTextArea]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
      <Box
        id='desc'
        ref={desc}
        sx={{
          paddingLeft: '0px',
          width: { xs: '100%', md: '100%' },
          marginLeft: { xs: '0%', md: '0%' },
        }}
        style={{
          lineHeight: '25px',
          fontSize: '14px',
          color: '#5c6574',
        }}
        onPaste={onPaste}
        contentEditable
        onInput={onTextChange}
        onKeyDown={keyPressEvent}
        onBlur={handleDescriptionChange}
        placeholder={t('blog_des_placeholder')}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(
            blogData?.BlogTextArea,
            { ADD_ATTR: ['target'] } || ''
          ),
        }}
        className='placeholdertext'
      />

      {
        maxCharLength ?
          <Typography
            variant="h7regular"
            sx={{ color: ThemeConstants.BLACK_COLOR_VARIANT1, marginTop: "15px !important" }}
          >
            {reachLimit ?
              <>0</>
              :
              <>{restOfLength ? `${restOfLengthCall(restOfLength)}` : `${maxCharLength}`}</>}
          </Typography>
          : null
      }
    </Box >
  );
};
export default React.memo(BlogContentEdit);
