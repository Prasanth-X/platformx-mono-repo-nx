import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { MenuBoxProps } from "./types";

export const MenuBox = styled(Box)<MenuBoxProps>(({ disabled }) => ({
  opacity: disabled ? 0.5 : "inherit",
  pointerEvents: disabled ? "none" : "auto",
  boxShadow: "none",
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  position: "relative",
  justifyContent: "flex-start",
  cursor: "pointer",
  "&:hover svg, &:hover span": {
    color: "#5256b8",
  },
}));
export const MenuTypography = styled(Typography)({
  color: "#2d2d39",
  textTransform: "capitalize",
  margin: "0 0 20px 0",
});

export const mainStyle = `
.authorwp {
  border-top: 1px solid #e6eaed;
  padding: 13px 15px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.authorwp .authorpic {
  border: 1px solid #374fd5;
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #fff;
  min-width: 40px;
  min-height: 40px;
}
.activeLink span{
  color: #5256b8;
}
.activeLink svg  {
  color: #5256b8;
}
`;
