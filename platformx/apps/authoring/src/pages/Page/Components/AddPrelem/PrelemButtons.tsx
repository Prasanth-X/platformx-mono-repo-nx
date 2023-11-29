import { IconButton, Tooltip } from '@mui/material';
const PrelemButtons = ({
  Icon,
  Id,
  tooltipId,
  handleClick,
  index,
  showIconsState,
  DisabledIcon,
}) => {
  return (
    <li>
      {(Id === 'up' && !showIconsState.showUp) ||
      (Id === 'down' && !showIconsState.showDown) ||
      (Id === 'reset' && !showIconsState.showReset) ? (
        <Tooltip title={tooltipId}>
          <IconButton disabled>
            <DisabledIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title={tooltipId}>
          <IconButton onClick={() => handleClick(Id)}>
            <Icon />
          </IconButton>
        </Tooltip>
      )}
    </li>
  );
};

export default PrelemButtons;
