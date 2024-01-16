export type SiteTopBarProps = {
  returnBack: () => void;
  siteLabel: string;
  iconList?: Array<any>;
  isShowPreview?: boolean;
  onPreviewClick?: (event) => void;
  onBreadscumClick?: (event) => void;
  onSaveClick?: () => void;
  activeForm?: string;
  buttonStyle?: any;
};
