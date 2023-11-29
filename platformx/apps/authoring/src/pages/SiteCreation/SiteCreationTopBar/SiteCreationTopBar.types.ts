export type SiteCreationTopBarProps = {
  returnBack: () => void;
  siteLabel: string;
  iconList?: Array<any>;
  isShowPreview?: boolean;
  onBreadscumClick?: (event) => void;
  activeForm?: string;
  buttonStyle?: any;
  isFormValid?: boolean;
  formValue?: any;
  onSave?: () => void;
  onIconClick?: () => void;
  isSaved?: boolean;
};
