import React from "react";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { Box, Typography } from "@mui/material";

const ContentReplace = ({ onReplaceClick }: any) => {
  return (
    <Box
      className='add-content-overlay'
      sx={{
        background: "rgba(55,79,213,0.9)",
        position: "absolute",
        minHeight: "150px",
        width: "100%",
        height: "100%",
        top: "0",
        left: "",
        display: "none",
        alignItems: "center",
        justifyContent: "center",
        zIndex: "1",
      }}>
      <Box
        sx={{
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
        onClick={onReplaceClick}>
        <AutorenewIcon
          sx={{
            color: "#fff",
            width: { xs: "50px", md: "70px" },
            height: { xs: "50px", md: "70px" },
            marginBottom: "10px",
          }}
        />
        <Typography variant='h3regular' sx={{ color: "#fff" }}>
          Replace
        </Typography>
      </Box>
    </Box>
  );
};

export default ContentReplace;
