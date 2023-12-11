import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DescriptionIcon from "@mui/icons-material/Description";
import { format } from "date-fns";

interface ContentProp {
  content: Content;
}

interface Content {
  Title?: string;
  Description?: string;
  Thumbnail?: string;
  creationDate?: string;
  Author?: string;
}

const DesktopCard = ({ content }: ContentProp) => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${content?.Thumbnail})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: { xs: "100%", md: "100vh" },
        margin: "0 -5px",
        display: "flex",
      }}>
      <Box sx={{ display: "flex", alignSelf: "end" }}>
        <Grid
          sx={{
            padding: { xs: "70px 8px 0px", md: "0 0 61px 63px" },
            color: "#ffffff",
            display: "flex",
            flexDirection: "column",
          }}>
          <Typography variant='h4medium'>
            <DescriptionIcon />
          </Typography>
          <Typography variant='h4medium'>{content?.Title}</Typography>
          <Typography variant='h6medium' sx={{ margin: "6px 0 20px 0" }}>
            {content?.Description}
          </Typography>
          <Typography variant='h7medium'>{content?.Author}</Typography>
          <Typography variant='h7medium'>
            {content?.creationDate
              ? format(new Date(content?.creationDate), "LLL dd, yyyy | H:mm")
              : "-"}
          </Typography>
        </Grid>
      </Box>
    </Box>
  );
};

export default DesktopCard;
