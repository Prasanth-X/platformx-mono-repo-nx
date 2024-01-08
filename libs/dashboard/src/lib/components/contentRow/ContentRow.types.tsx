export type ContentRowProps = {
  item: any;
  deleteContent?: (content: any) => void;
  duplicate?: (
    content: any,
    isDuplicate: boolean,
    title: string,
    language: string
  ) => void;
  preview?: (content: any) => void;
  unPublish?: (content: any) => void;
  view?: (content: any) => void;
  edit?: (contentm: any) => void;
  fetchContentDetails?: (content: any) => void;
};
