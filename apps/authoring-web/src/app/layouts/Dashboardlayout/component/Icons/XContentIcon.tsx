import { SvgIcon } from '@mui/material';
const XContentIcon = ({ svgComponent: SvgComponent, ...props }) => {
  return (
    <SvgIcon {...props}>
      <SvgComponent></SvgComponent>
    </SvgIcon>
  );
};
export default XContentIcon;
