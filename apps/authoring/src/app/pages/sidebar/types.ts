export interface CreateEventType {
  name: string;
  url: string;
  icon?: any;
  chevronArray?: any;
}

export interface PostTypesType {
  name: string;
  url: string;
  icon?: any;
  chevronArray?: any;
}
export interface UserManagementTypesType {
  name: string;
  url: string;
  icon?: any;
  chevronArray?: any;
}

export type MenuBoxProps = {
  disabled?: boolean;
};

export type PageType = {
  type: string;
  name: string;
  icon?: any;
};
export type SiteSettingTypesType = {
  name: string;
  url: string;
  icon?: any;
  chevronArray?: any;
  id?: string;
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

export type MenuItem = {
  Type: 'Pages' | 'Tags' | 'Content' | 'User Management' | 'Post' | 'Site Setting' ;
};
