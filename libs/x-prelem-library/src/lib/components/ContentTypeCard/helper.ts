import { formCroppedUrl } from "@platformx/utilities";
import { defaultImages } from "./constants";

interface SecondaryArgs {
  gcpUrl?: string;
  bucketName?: string;
}

export const getCommunityFallBackImageBasedOnContentType = (
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
