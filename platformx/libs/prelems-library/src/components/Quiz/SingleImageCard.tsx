import * as React from "react";
import { Typography, Box } from "@mui/material";

const SingleImageCard = ({ option, activeItem, setSelectedItem }: any) => {
  return (
    <>
      <Box
        onClick={() => setSelectedItem(option.option_id)}
        className={`${activeItem == option.option_id && "activeClass"}`}
        sx={{
          padding: { xs: "10px", md: "13px 14px" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          "&.activeClass": {
            background: "#fff",
            color: "#000",
          },
          margin: { xs: "5px", md: "15px" },
          borderRadius: "3px",
          border: "solid 1px #fff",
          minWidth: { xs: "150px", md: "180px" },
          maxWidth: { xs: "150px", md: "180px" },
          cursor: "pointer",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        }}>
        <Box
          sx={{
            maxWidth: { xs: "144px", md: "152px" },
            minHeight: { xs: "114px", md: "120px" },
            maxHeight: { xs: "114px", md: "120px" },
            display: "flex",
          }}>
          <img
            src={option.option_image.url}
            alt={option.option_image.title}
            style={{ width: "100%", objectFit: "cover" }}
          />
        </Box>
        <Typography
          variant='h5medium'
          color={activeItem === option.option_id ? "textColor1" : "textColor"}
          sx={{ mt: "8.4px", textAlign: "center" }}>
          {option.option_text}
        </Typography>
      </Box>
    </>
  );
};

export default SingleImageCard;
