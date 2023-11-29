import AutorenewIcon from "@mui/icons-material/Autorenew";
import { Box, Typography } from "@mui/material";
import React from "react";
// import { useTranslation } from "react-i18next";

const ReplaceComponent = ({ secondaryArgs }: any) => {
  // const { t } = useTranslation();

  return (
    <Box
      sx={{
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "column",
      }}
      onClick={() => secondaryArgs?.multiSlot?.onToggleContentGallery()}>
      <AutorenewIcon
        sx={{
          color: "#fff",
          width: "40px",
          height: "40px",
        }}
      />
      <Typography variant='h4regular' sx={{ color: "#fff", margin: 0 }}>
        {/* {t("replace")} */}
        Replace
      </Typography>
    </Box>
  );
};
export default ReplaceComponent;
