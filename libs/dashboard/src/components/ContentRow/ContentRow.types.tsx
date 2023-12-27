export type ContentRowProps = {
  item: any;
  deleteContent?: (content) => void;
  duplicate?: (
    content,
    isDuplicate: boolean,
    title: string,
    language: string
  ) => void;
  preview?: (content) => void;
  unPublish?: (content) => void;
  view?: (content) => void;
  edit?: (content) => void;
  fetchContentDetails?: (content) => void;
};
