import { convertToLowerCase, nullToObject } from '../../utils/helperFunctions';
import QuizIcon from "@mui/icons-material/Quiz";
import BarChartIcon from "@mui/icons-material/BarChart";
import CampaignIcon from "@mui/icons-material/Campaign";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import DescriptionIcon from "@mui/icons-material/Description";
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

export const iconReplaceBasedCondition = (ele = {}) => {
  const { ContentType: contentTypeValue = "" } = nullToObject(ele);
  const styleObj = {
    top: "50%",
    zIndex: 1,
    transform: "translateY(-50%)",
    position: "absolute", left: "10px",
    width: '20px', height: '20px', cursor: 'pointer'
  };

  switch (convertToLowerCase(contentTypeValue)) {
    case "quiz":
      return (
        <>
          <QuizIcon
            sx={{
              ...styleObj
            }}
          />
        </>
      );
    case "videogallery":
      return (
        <>
          <PlayCircleIcon
            sx={{
              ...styleObj
            }}
          />
        </>
      );
    case "imagegallery":
      return (
        <>
          <PhotoLibraryIcon
            sx={{
              ...styleObj
            }}
          />
        </>
      );
    case "gallery":
      return (
        <>
          <PlayCircleIcon
            sx={{
              ...styleObj
            }}
          />
        </>
      );
    case "article":
      return (
        <>
          <DescriptionIcon
            sx={{
              ...styleObj
            }}
          />
        </>
      );
    case "vod":
      return (
        <>
          <PlayCircleOutlineIcon
            sx={{
              ...styleObj
            }}
          />
        </>
      );
    case "video":
      return (
        <>
          <PlayCircleOutlineIcon
            sx={{
              ...styleObj
            }}
          />
        </>
      );
    case "events":
      return (
        <>
          <CampaignIcon
            sx={{
              ...styleObj
            }}
          />
        </>
      );

    case "event":
      return (
        <>
          <CampaignIcon
            sx={{
              ...styleObj
            }}
          />
        </>
      );
    case "polls":
      return (
        <>
          <BarChartIcon
            sx={{
              ...styleObj
            }}
          />
        </>
      );
    case "poll":
      return (
        <>
          <BarChartIcon
            sx={{
              ...styleObj
            }}
          />
        </>
      );
    default:
      return (
        <>
          <DescriptionIcon
            sx={{
              ...styleObj
            }}
          />
        </>
      );
  }
};
