import LoadingButton from "@mui/lab/LoadingButton";
import { ButtonProps, styled } from "@mui/material";
import React from "react";

type LoadingButtonPros = {
  loading?: boolean;
};
const StyledButton = styled(LoadingButton)(() => ({
  margin: "",
}));
export const XButton = ({
  variant = "primaryButton1",
  startIcon = "",
  loading = false,
  ...rest
}: ButtonProps & LoadingButtonPros) => (
  <StyledButton
    startIcon={startIcon}
    loading={loading}
    loadingPosition='end'
    variant={variant}
    {...rest}
  />
);
