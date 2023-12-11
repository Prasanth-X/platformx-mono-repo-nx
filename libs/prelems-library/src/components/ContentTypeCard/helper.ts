import { formCroppedUrl, nullToObject } from "utils/helperFns";
import { CONTENT_TYPE_WITH_ABSOLUTEURL } from "../../Common/ConstantData";
import { commonImageUrlConstruct } from "Common/Utils/helperFns";
import { defaultImages } from "./constants";

interface SecondaryArgs {
  gcpUrl?: string;
  bucketName?: string;
}

const getCommunityFallBackImageBasedOnContentType = (
  contentType: string,
  secondaryArgs: SecondaryArgs,
) => {
  switch (contentType) {
    case "event":
      return formCroppedUrl(
        secondaryArgs?.gcpUrl,
        secondaryArgs?.bucketName,
        defaultImages?.event,
        defaultImages?.ext,
      );
    case "challenges-announcement":
      return formCroppedUrl(
        secondaryArgs?.gcpUrl,
        secondaryArgs?.bucketName,
        defaultImages?.challenges,
        defaultImages?.ext,
      );
    case "exokudos:activity":
      return formCroppedUrl(
        secondaryArgs?.gcpUrl,
        secondaryArgs?.bucketName,
        defaultImages?.kudos,
        defaultImages?.ext,
      );
    case "poll":
      return formCroppedUrl(
        secondaryArgs?.gcpUrl,
        secondaryArgs?.bucketName,
        defaultImages?.poll,
        defaultImages?.ext,
      );
    case "news":
      return formCroppedUrl(
        secondaryArgs?.gcpUrl,
        secondaryArgs?.bucketName,
        defaultImages?.news,
        defaultImages?.ext,
      );
    case "quiz":
      return formCroppedUrl(
        secondaryArgs?.gcpUrl,
        secondaryArgs?.bucketName,
        defaultImages?.quiz,
        defaultImages?.ext,
      );
    case "general":
      return formCroppedUrl(
        secondaryArgs?.gcpUrl,
        secondaryArgs?.bucketName,
        defaultImages?.event,
        defaultImages?.ext,
      );
    default:
      return formCroppedUrl(
        secondaryArgs?.gcpUrl,
        secondaryArgs?.bucketName,
        defaultImages?.event,
        defaultImages?.ext,
      );
  }
};

export const getImagebasedontagandcontenttype = (
  content: any,
  secondaryArgs: SecondaryArgs,
): string => {
  const { ContentType = "" } = nullToObject(content);
  if (content?.tags?.includes("Community")) {
    if (content?.Thumbnail?.Url) {
      return content?.Thumbnail?.Url;
    } else {
      return getCommunityFallBackImageBasedOnContentType(ContentType, secondaryArgs);
    }
  } else {
    return CONTENT_TYPE_WITH_ABSOLUTEURL.includes(content?.ContentType)
      ? content?.Thumbnail?.Url
      : commonImageUrlConstruct(content, secondaryArgs);
  }
};
