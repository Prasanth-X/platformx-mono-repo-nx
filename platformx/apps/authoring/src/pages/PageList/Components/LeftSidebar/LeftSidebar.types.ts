export type PageType = {
  type: string;
  name: string;
  icon?: any;
};

export type LeftSidebarProps = {
  handleSelectedType: (data: PageType) => void;
};
