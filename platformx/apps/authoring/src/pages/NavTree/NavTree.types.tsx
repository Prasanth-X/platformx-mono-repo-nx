export type MenulistProps = {
  Title?: any;
  Tagging?: any;
  Text?: any;
  Menu_Id?: any;
  ParentId?: any;
  Menu_State?: any;
  URL?: any;
  Label?: any;
  Internal?: any;
  Status?: any;
  Score?: any;
  IsHidden?: any;
  LastModificationDate?: any;
  LastModifiedBy?: any;
  Menu_PublishedBy?: any;
  Author?: any;
  Menu_PublishedDate?: any;
  LastPublishedDate?: any;
  createdBy?: any;
  UserActionInfo?: any;
  HomePage?: any;
};
export type NavTreeProps = {
  handleSelectedType: (menuItems: any) => void;
  setEditData: (menuItems: MenulistProps) => void;
  setOpenCreateMenu: (isOpen: boolean) => void;
  editDone: boolean;
  setisedit: (isEdit: boolean) => void;
  isConfirm: boolean;
  setIsCreate: (isCreate: boolean) => void;
};

export type NavMenu = {
  Title: string;
  Score: string;
  ParentId: string;
};
