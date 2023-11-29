import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import * as React from "react";

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
.doticon .Platform-x-SvgIcon-root{
    font-size: 6px;
}
.doticon svg.MuiSvgIcon-root {
  font-size: 6px;
}
`;

const MediumCard = ({ content }: ContentProp) => {
  return (
    <Card
      sx={{
        boxShadow: "none",
        background: "#fff",
        borderRadius: "5px",
      }}
      className='mobilecard'>
      <style>{inlineCss}</style>
      <Grid container>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            minHeight: "225px",
          }}>
          <CardMedia
            component='img'
            alt='green iguana'
            image={content?.Thumbnail}
            sx={{
              minHeight: "225px",
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            minHeight: "225px",
          }}>
          <CardContent
            sx={{
              padding: "15px",
            }}>
            <Typography
              gutterBottom
              variant='h5bold'
              component='div'
              sx={{
                color: "#2d2d39",
              }}>
              {content?.Title}
            </Typography>
            <Typography
              variant='h6medium'
              sx={{
                color: "#5c6574",
              }}>
              {content?.Description}
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              borderTop: "1px solid #ced3d9",
              display: "flex",
              justifyContent: "start",
              marginTop: "20px",
              margin: "15px",
              padding: "10px 0px 10px 0px",
            }}>
            <Typography variant='h7medium' sx={{ color: "#000" }}>
              {content?.Author}
            </Typography>
            <Typography variant='h7medium' sx={{ color: "#89909a" }} className='doticon'>
              <FiberManualRecordIcon />
            </Typography>
            <Typography variant='h7medium' sx={{ color: "#89909a" }}>
              {content?.creationDate
                ? format(new Date(content?.creationDate), "LLL dd, yyyy | H:mm")
                : "-"}
            </Typography>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};

export default MediumCard;
