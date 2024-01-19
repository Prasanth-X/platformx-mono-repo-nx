export interface SecondaryArgs {
  prelemBaseEndpoint?: PrelemBaseEndpoint;
  editState?: boolean;
  gcpUrl?: string;
  bucketName?: string;
  sitename?: string;
}
export interface PrelemBaseEndpoint {
  PublishEndPoint?: string;
  APIEndPoint?: string;
  deliveryEndPoint?: string;
  language?: string;
}
export interface Content {
  Description?: string;
  Title?: string;
  EditorialItemPath?: string;
  ImageDescription?: string;
  Thumbnail?: {
    Description?: string;
    Title?: string;
    AltText?: string;
    Attribution?: boolean;
    Url?: string;
    Name?: string;
    ObjectType?: string;
    Color?: string;
    ext?: string;
  };
  tags?: string;
  ContentType?: string;
  PublishedBy?: string;
  PublishedDate?: string;
  background_content?: any;
}
