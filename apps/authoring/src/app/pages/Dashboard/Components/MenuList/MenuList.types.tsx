import { SvgIconComponent } from '@mui/icons-material';

type menuItem = {
  label: string;
  icon: SvgIconComponent;
  handler: () => void;
};
export type MenuListProps = {
  menuItems: menuItem[];
};
