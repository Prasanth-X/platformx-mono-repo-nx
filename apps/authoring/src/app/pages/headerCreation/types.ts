export type MenuItemLinkProp = {
  menuExternalLink: string;
  linkTarget: string;
  linkLevel?: string;
};
export type MenuItemProp = {
  Page: string;
  Status?: string;
  CurrentPageUrl: string;
  Title: string;
  Description?: string;
  LastModificationDate?: string;
  LastModifiedBy?: string;
  PublishedBy?: string;
  Path?: string;
  SchduledPublishTriggerDateTime?: string;
  SchduledUnPublishTriggerDateTime?: string;
};
export type NavItemDef = {
  Heading: string;
  URL: string;
  Internal: boolean;
  Rank: string;
  HomePage: boolean;
  IsHidden: boolean;
  name?: string;
};
