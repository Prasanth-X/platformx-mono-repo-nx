import {
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
  BorderColorOutlined,
  DeleteOutlineOutlined,
  FolderCopyOutlined,
  InfoOutlined,
  RefreshOutlined,
  RemoveRedEyeOutlined,
  SettingsOutlined,
  ContentCopyOutlined,
} from '@mui/icons-material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ThemeConstants from '../../../../../../libs/utilities/src/lib/themes/authoring/variable';
export const iconsSet = [
  {
    id: 'prelemInfo',
    tooltipId: 'Prelem Info',
    Icon: () => <InfoOutlined style={{ color: ThemeConstants.WHITE_COLOR }} />,
    disabledIcon: () => (
      <InfoOutlined style={{ color: ThemeConstants.LIGHT_GREY_COLOR }} />
    ),
  },
  {
    id: 'edit',
    tooltipId: 'Edit',
    Icon: () => (
      <BorderColorOutlined style={{ color: ThemeConstants.WHITE_COLOR }} />
    ),
    disabledIcon: () => (
      <BorderColorOutlined style={{ color: ThemeConstants.LIGHT_GREY_COLOR }} />
    ),
  },
  {
    id: 'show',
    tooltipId: 'Show',
    Icon: () => (
      <RemoveRedEyeOutlined style={{ color: ThemeConstants.WHITE_COLOR }} />
    ),
    disabledIcon: () => (
      <RemoveRedEyeOutlined
        style={{ color: ThemeConstants.LIGHT_GREY_COLOR }}
      />
    ),
  },
  {
    id: 'hide',
    tooltipId: 'Hide',
    Icon: () => (
      <VisibilityOffIcon style={{ color: ThemeConstants.WHITE_COLOR }} />
    ),
    disabledIcon: () => (
      <VisibilityOffIcon style={{ color: ThemeConstants.LIGHT_GREY_COLOR }} />
    ),
  },
  {
    id: 'prelemSetting',
    tooltipId: 'Settings',
    Icon: () => (
      <SettingsOutlined style={{ color: ThemeConstants.WHITE_COLOR }} />
    ),
    disabledIcon: () => (
      <SettingsOutlined style={{ color: ThemeConstants.LIGHT_GREY_COLOR }} />
    ),
  },
  {
    id: 'copy',
    tooltipId: 'Duplicate',
    Icon: () => (
      <ContentCopyOutlined style={{ color: ThemeConstants.WHITE_COLOR }} />
    ),
    disabledIcon: () => (
      <ContentCopyOutlined style={{ color: ThemeConstants.LIGHT_GREY_COLOR }} />
    ),
  },
  {
    id: 'up',
    tooltipId: 'Move Up',
    Icon: () => (
      <ArrowUpwardOutlined style={{ color: ThemeConstants.WHITE_COLOR }} />
    ),
    disabledIcon: () => (
      <ArrowUpwardOutlined style={{ color: ThemeConstants.LIGHT_GREY_COLOR }} />
    ),
  },
  {
    id: 'down',
    tooltipId: 'Move Down',
    Icon: () => (
      <ArrowDownwardOutlined style={{ color: ThemeConstants.WHITE_COLOR }} />
    ),
    disabledIcon: () => (
      <ArrowDownwardOutlined
        style={{ color: ThemeConstants.LIGHT_GREY_COLOR }}
      />
    ),
  },
  {
    id: 'reset',
    tooltipId: 'Undo',
    Icon: () => (
      <RefreshOutlined style={{ color: ThemeConstants.WHITE_COLOR }} />
    ),
    disabledIcon: () => (
      <RefreshOutlined style={{ color: ThemeConstants.LIGHT_GREY_COLOR }} />
    ),
  },
  {
    id: 'delete',
    tooltipId: 'Delete',
    Icon: () => (
      <DeleteOutlineOutlined style={{ color: ThemeConstants.WHITE_COLOR }} />
    ),
    disabledIcon: () => (
      <DeleteOutlineOutlined
        style={{ color: ThemeConstants.LIGHT_GREY_COLOR }}
      />
    ),
  },
];
