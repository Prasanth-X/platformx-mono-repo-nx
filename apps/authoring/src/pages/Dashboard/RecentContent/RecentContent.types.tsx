export type RecentContents = {
  Id: string;
  Title: string;
  CurrentPageURL: string;
  ContentType: string;
};

export type RecentContentProps = {
  recentContent: RecentContents[];
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
