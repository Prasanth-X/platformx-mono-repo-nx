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
.mobilecard {
    box-shadow: none;
}
`;

const MobileCard = ({ content }: ContentProp) => {
  return (
    <Card
      sx={{
        boxShadow: "none",
      }}
      className='mobilecard'>
      <style>{inlineCss}</style>
      <Box>
        <CardMedia component='img' alt='green iguana' height='140' image={content?.Thumbnail} />
        <Typography
          variant='h4medium'
          sx={{
            position: "absolute",
            top: "175px",
            left: "17px",
            color: "#fff",
          }}>
          <DescriptionIcon />
        </Typography>
      </Box>
      <CardContent
        sx={{
          padding: "20px",
        }}>
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
          paddingLeft: "12px",
          paddingRight: "12px",
        }}>
        <Typography variant='h7medium'>{content?.Author}</Typography>
        <Typography variant='h7medium'>
          {content?.creationDate
            ? format(new Date(content?.creationDate), "LLL dd, yyyy | H:mm")
            : "-"}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default MobileCard;
