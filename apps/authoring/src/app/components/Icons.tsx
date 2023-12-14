import React, { ReactNode } from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import ExpandRoundedIcon from '@mui/icons-material/ExpandRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import ComputerRoundedIcon from '@mui/icons-material/ComputerRounded';
import TabletAndroidRoundedIcon from '@mui/icons-material/TabletAndroidRounded';
import PhoneAndroidRoundedIcon from '@mui/icons-material/PhoneAndroidRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded';
import UndoRoundedIcon from '@mui/icons-material/UndoRounded';
import RedoRoundedIcon from '@mui/icons-material/RedoRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import PreviewRoundedIcon from '@mui/icons-material/PreviewRounded';
import TelegramIcon from '@mui/icons-material/Telegram';
import { CircularProgress } from '@mui/material';

interface Props {
  nameIcon: string;
  enable: boolean;
  loader?: boolean;
  listIndx: string;
  handleClick(prelemIndex: string, operation: string): void;
  styleObject?: object;
}
const Icons: React.FC<Props> = ({
  nameIcon,
  enable = false,
  loader = false,
  listIndx,
  styleObject,
  handleClick,
}) => {
  let show: ReactNode;
  switch (nameIcon) {
    case 'edit':
      show = <CreateRoundedIcon />;
      break;
    case 'expand':
      show = <ExpandRoundedIcon />;
      break;
    case 'visibility':
      show = <VisibilityRoundedIcon />;
      break;
    case 'visibilityOff':
      show = <VisibilityOffRoundedIcon />;
      break;
    case 'copy':
      show = <ContentCopyRoundedIcon />;
      break;
    case 'up':
      show = <ArrowUpwardRoundedIcon />;
      break;
    case 'down':
      show = <ArrowDownwardRoundedIcon />;
      break;
    case 'delete':
      show = <DeleteRoundedIcon />;
      break;
    case 'settings':
      show = <SettingsRoundedIcon />;
      break;
    case 'add':
      show = <AddCircleRoundedIcon />;
      break;
    case 'desktop':
      show = <ComputerRoundedIcon />;
      break;
    case 'tablet':
      show = <TabletAndroidRoundedIcon />;
      break;
    case 'mobile':
      show = <PhoneAndroidRoundedIcon />;
      break;
    case 'publish':
      show = <TelegramIcon />;
      break;
    case 'save':
      show = <SaveAsRoundedIcon />;
      break;
    case 'undo':
      show = <UndoRoundedIcon />;
      break;
    case 'redo':
      show = <RedoRoundedIcon />;
      break;
    case 'reset':
      show = <RestartAltRoundedIcon />;
      break;
    case 'preview':
      show = <VisibilityRoundedIcon />;
      break;
    case 'back':
      show = <ArrowBackIosNewRoundedIcon />;
      break;
    default:
      break;
  }
  // Generating container of icon as Icon button(MUI internal feature)
  return (
    <IconButton
      size='medium'
      onClick={() => handleClick(listIndx, nameIcon)}
      name={nameIcon}
      key={`${nameIcon  }_${  listIndx}`}
      data-testid={`${nameIcon  }_${  listIndx}`}
      aria-label={nameIcon}
      disabled={!enable}
      sx={{ ...styleObject }}
    >
      {loader && !enable ? <CircularProgress color="inherit" size={20} /> : show }
    </IconButton>
  );
};
export default Icons;
