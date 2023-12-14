export type Item = {
  name: string;
  status?: string;
  path: string;
  title?: string;
  description?: string;
  lastModificationDate: string;
  lastModifiedBy?: string;
};
export type PageStatusButtonProps = {
  filterItem: (text: string) => void;
  activeItem?: string;
  onDuplicatePage: (duplicate: boolean, pageDetails?: Item) => void;
};
