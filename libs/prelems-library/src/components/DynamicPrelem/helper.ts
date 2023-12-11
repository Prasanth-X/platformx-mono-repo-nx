import { formCroppedUrl } from "utils/helperFns";

export const formImageUrl = (content: Content, Url: string, secondaryArgs: SecondaryArgs) => {
  if (
    content.ContentType === "Event" ||
    content.ContentType === "Quiz" ||
    content.ContentType === "Poll"
  ) {
    return formCroppedUrl(
      secondaryArgs?.gcpUrl,
      secondaryArgs?.bucketName,
      content.background_content?.Url,
      content.background_content?.ext,
      content.ContentType,
    );
  } else {
    return (
      Url ||
      formCroppedUrl(
        secondaryArgs?.gcpUrl,
        secondaryArgs?.bucketName,
        content.Thumbnail?.Url,
        content.Thumbnail?.ext,
        content.ContentType,
      )
    );
  }
};

interface SecondaryArgs {
  prelemBaseEndpoint?: PrelemBaseEndpoint;
  editState: boolean;
  gcpUrl?: string;
  bucketName?: string;
  sitename?: string;
}
interface PrelemBaseEndpoint {
  PublishEndPoint?: string;
  APIEndPoint?: string;
  deliveryEndPoint?: string;
  language?: string;
}
interface Content {
  Description?: string;
  Title?: string;
  EditorialItemPath: string;
  ImageDescription: string;
  Thumbnail: {
    Description?: string;
    Title?: string;
    AltText: string;
    Attribution: boolean;
    Url: string;
    Name: string;
    ObjectType?: string;
    Color?: string;
    ext?: string;
  };
  ContentType: string;
  PublishedBy: string;
  PublishedDate: string;
  background_content: any;
}
