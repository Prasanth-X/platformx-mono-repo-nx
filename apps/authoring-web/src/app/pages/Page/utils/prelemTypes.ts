export type EmptyStateProps = {
  searchCategoryKeyword: string | null;
  searchInputKeyword: string | null;
};
type LayoutListObjectType = {
  id: string;
  mapping: string;
  thumbnail: string;
  title: string;
  selectedValue?: boolean;
};
export type LayoutList = {
  layoutList: LayoutListObjectType[];
  handleLayoutFilter: (arg: string, index: string) => void;
  layoutState: { layoutIndex: string; layoutValue: string };
  searchValue: string;
  categoryState: { categoryIndex: number; categoryValue: string };
};
export type SearchCardObjecType = {
  AnalyticsEnabled: boolean;
  DocumentCreationPath: string;
  DocumentPath: string;
  DocumentType: string;
  PrelemId: string;
  PrelemName: string;
  SeoEnabled: boolean;
  Description: string;
  DevelopedBy: string;
  DevelopedDate: string;
  PreviewThumbnail: string;
  Tags: [];
  Thumbnails: any;
};
export type SearchCardListProps = {
  searchCardList: SearchCardObjecType[];
};
type CategoryListObjectType = {
  tag: string;
  score: number;
  title: string;
  selectedValue?: boolean;
};
export type FilterProps = {
  categoryList: CategoryListObjectType[];
  setValue: (text: string) => void;
  setInputValue: (text: string) => void;
  handleResetInputFilter: () => void;
  inputValue: string;
  suggestiveSearchList: [];
  handleCategoryFilter: (arg: string, index: number) => void;
};
export type Layout = {
  id: string;
  thumbnail: string;
};
export type LocationData = {
  searchValue: string;
  categoryState: { categoryIndex: number; categoryValue: string };
};
export type PrelemPreviewFrameType = {
  children: React.ReactNode;
  device: string;
  prelemid: string;
};
export type CategoryStateProps = {
  categoryIndex: any;
  categoryValue: any;
};
export type LayoutStateProps = {
  layoutIndex: any;
  layoutValue: any;
};
export type PrelemInstance = {
  PrelemId: string;
  PrelemName: string;
  TagName?: [];
  Tags: [];
  PreviewThumbnail: string;
  Description: string;
  DocumentType: string;
  DocumentPath: string;
  DocumentCreationPath: null;
  DevelopedBy: string;
  DevelopedDate: string;
  SeoEnabled: boolean;
  AnalyticsEnabled: boolean;
  IsHidden: boolean;
  content?: object;
};
