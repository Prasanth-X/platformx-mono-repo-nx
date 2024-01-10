export type RecentContents = {
  Id: string;
  Title: string;
  CurrentPageURL: string;
  ContentType: string;
};

export type RecentContentProps = {
  recentContent: RecentContents[];
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
  edit?: (content: any) => void;
  fetchContentDetails?: (content: any) => void;
};
