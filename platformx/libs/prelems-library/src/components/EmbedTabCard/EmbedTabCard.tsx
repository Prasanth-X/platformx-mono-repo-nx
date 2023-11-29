import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DescriptionIcon from "@mui/icons-material/Description";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
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
const inlineCss = `
.tabcard {
    box-shadow: none;
}
`;
const TabCard = ({ content }: ContentProp) => {
  return (
    <Card sx={{ display: "flex", height: 380 }} className='tabcard'>
      <Box
        sx={{
          width: "50%",
        }}>
        <style>{inlineCss}</style>
        <CardMedia
          component='img'
          sx={{ width: "100%", height: 380 }}
          image={content?.Thumbnail}
          alt='Image'
        />
        <Typography
          variant='h4medium'
          sx={{
            position: "absolute",
            top: "420px",
            left: "15px",
            color: "#fff",
          }}>
          <DescriptionIcon />
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
        <CardContent sx={{ flex: "1 0 auto", padding: "30px 15px 15px 15px" }}>
          <Typography
            gutterBottom
            variant='h5medium'
            component='div'
            sx={{
              color: "#2d2d39",
            }}>
            {content?.Title}
          </Typography>
          <Typography
            variant='h6medium'
            color='text.secondary'
            sx={{
              color: "#2d2d39",
            }}>
            {content?.Description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            backgroundColor: "rgb(181 175 175 / 5%)",
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
            paddingLeft: "15px",
            paddingRight: "15px",
          }}>
          <Typography variant='h7medium'>{content?.Author}</Typography>
          <Typography variant='h7medium'>
            {content?.creationDate
              ? format(new Date(content?.creationDate), "LLL dd, yyyy | H:mm")
              : "-"}
          </Typography>
        </CardActions>
      </Box>
    </Card>
  );
};

export default TabCard;
