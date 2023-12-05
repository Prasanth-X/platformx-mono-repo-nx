import React, { useRef, useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "quill-paste-smart";

type CommonDraftProps = {
  optionEditor?: any;
  passingToHtml?: any;
  description?: string;
  editState?: boolean;
};

const CommonDraftDescription = (props: CommonDraftProps) => {
  const {
    description = "",
    editState = false,
    passingToHtml = () => {},
    // optionEditor = [
    //     [{ list: "ordered" }, { list: "bullet" }],
    //     [{ indent: "-1" }, { indent: "+1" },],
    // ]
  } = props;

  const styleHandle = `.ql-editor {
        padding-left: 0 !important;
    }.ql-container.ql-snow {
        border: none !important;
        font-size: 18px;
    }.rdw-editor-toolbar {
        display: ${!editState ? "none !important" : "block"};
    }.border-none .public-DraftEditor-content{
        border: 2px dashed transparent;
    }`;

  const [value, setValue] = useState<string>("");
  const reactQuillRef = useRef<ReactQuill>(null);

  const editorText = (e: string) => {
    setValue(e);
    passingToHtml(e);
  };

  const isHTML = (str: any) =>
    !(str || "")
      // replace html tag with content
      .replace(/<([^>]+?)([^>]*?)>(.*?)<\/\1>/gi, "")
      // remove remaining self closing tags
      .replace(/(<([^>]+)>)/gi, "")
      // remove extra space at start and end
      .trim();

  useEffect(() => {
    if (description) {
      if (isHTML(description)) {
        setValue(description);
        passingToHtml(description);
      } else {
        setValue(`<p>${description}</p>`);
        passingToHtml(`<p>${description}</p>`);
      }
    }
  }, [description]);

  return (
    <>
      <style>{styleHandle}</style>
      <ReactQuill
        modules={{
          toolbar: false,
        }}
        ref={reactQuillRef}
        theme='snow'
        value={value}
        onChange={editorText}
      />
    </>
  );
};
export default React.memo(CommonDraftDescription);
