import { Checkbox, FormControlLabel } from "@mui/material";

// import InterRegular from "../../fonts/Inter/Inter-Regular.ttf";

import ThemeConstants from "../../../themes/authoring/lightTheme/lightThemeVariable";

const fontStyle = `
@font-face {
  font-family: ${ThemeConstants.FONTNAMEPRIMARY};
  src: url(${"InterRegular"}) format("truetype");
  font-display: block;
}`;
export interface CheckBoxProps {
  labelPlacement?: "top" | "start" | "bottom" | "end";
  size?: "small" | "medium";
  label?: string;
  value?: boolean;
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning" | "default";
  handleChange?: any;
  checked?: boolean;
  name?: string;
}
export const CheckBox = ({
  labelPlacement,
  label,
  value,
  size,
  color,
  handleChange,
  checked = false,
  name,
}: CheckBoxProps) => {
  return (
    <>
      <style>{fontStyle}</style>
      <FormControlLabel
        value={checked}
        control={
          <Checkbox
            size={size}
            color={color}
            onChange={handleChange}
            checked={checked}
            name={name}
          />
        }
        label={label}
        labelPlacement={labelPlacement}
      />
    </>
  );
};
