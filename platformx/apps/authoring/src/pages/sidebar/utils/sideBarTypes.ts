export type createEventType = {
  name: string;
  url: string;
  icon?: any;
  chevronArray?: any;
};

export type postTypesType = {
  name: string;
  url: string;
  icon?: any;
  chevronArray?: any;
};
export type PageType = {
  type: string;
  name: string;
  icon?: any;
};
export type ContentType = {
  name: string;
  url: string;
  icon?: any;
  chevronArray?: any;
  id?: string;
};
export type PageTypesList = {
  handleSelectedType?: (data: PageType) => void;
  setIsSideMenuOpen;
};
