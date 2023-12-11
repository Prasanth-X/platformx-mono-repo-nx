import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Box } from "@mui/material";
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
  LandingPage?: string;
  ContentURL?: string;
  colorCode?: string;
}
const inlineCss = `
.tabcard {
    box-shadow: none;
}
.doticon .Platform-x-SvgIcon-root{
  font-size: 6px;
}
.doticon svg.MuiSvgIcon-root {
font-size: 6px;
}
.embededtitle {
  display: -webkit-box;
  -webkit-box-orient: vertical;  
  // overflow: hidden;
  word-wrap: break-word;
}
.embededdesc {
  display: -webkit-box;
  -webkit-box-orient: vertical;  
  // overflow: hidden;
  word-wrap: break-word;
}
`;
// .card-content-area{height :100% ;}
// .cardmediaimg{height :100% ;}
// .card-container{height :100% ;}
const DesktopTabCard = ({ content }: ContentProp) => {
  const regEx = /(<([^>]+)>)/gi;
  const desc = content?.Description ? content.Description.replace(regEx, "") : "";
  const secondRegEx = /((&nbsp;))*/gim;
  const finalDesc = desc?.replace(secondRegEx, "");

  return (
    <Card
      sx={{
        borderRadius: "5px",
        border: "solid 1px #ced3d9",
        background: "#fff",
        cursor: "pointer",
        margin: { xs: "8px 8px 30px 0", sm: "0" },
        overflow: { xs: "initial", sm: "hidden" },
        width: { xs: "360px", sm: "480px" },
        height: { sm: "270px" },
      }}
      className='tabcard'
      onClick={() => window.open(content?.LandingPage, "_blank")}>
      <Grid
        container
        className='testing'
        sx={{
          width: { xs: "360px", sm: "480px" },
          height: { xs: "203px", sm: "270px" },
        }}>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            height: { sm: "270px" },
            width: "100%",
            overflow: "hidden",
          }}
          className='card-container'>
          <style>{inlineCss}</style>
          {content?.colorCode !== undefined && content?.colorCode !== "" ? (
            <Box
              sx={{
                height: "100%",
                width: "100%",
                background: content?.colorCode,
              }}
            />
          ) : (
            <CardMedia
              component='img'
              image={content?.Thumbnail}
              sx={{
                overflow: "hidden",
                height: "100%",
              }}
              alt='Image'
              className='cardmediaimg'
            />
          )}
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            overflow: { xs: "hidden", sm: "hidden" },
            display: "flex",
            flexDirection: "column",
            background: { xs: "#ffffff" },
          }}
          className='card-content-area'>
          <CardContent
            sx={{
              flex: "1 0 auto",
              padding: "12px 12px 12px 12px",
              overflow: { xs: "initial", sm: "hidden" },
            }}>
            <Typography
              gutterBottom
              variant='h7bold'
              className='embededtitle'
              component='div'
              sx={{
                color: "#2d2d39",
                WebkitLineClamp: { xs: "2" },
                overflow: "hidden",
              }}>
              {content?.Title}
            </Typography>
            <Typography
              variant='h7medium'
              sx={{
                color: "#89909a",
                WebkitLineClamp: { xs: "3" },
                overflow: { xs: "hidden", sm: "hidden" },
              }}
              className='embededdesc'>
              {finalDesc}
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              borderTop: "1px solid #ced3d9",
              padding: { xs: "8px 15px", sm: "0" },
              display: "flex",
              justifyContent: "start",
              alignItems: { xs: "baseline" },
              flexDirection: { xs: "row", sm: "column" },
            }}>
            <Typography variant='h7medium' sx={{ color: "#000" }}>
              {content?.Author}
            </Typography>
            <Typography
              variant='h7medium'
              sx={{
                color: "#89909a",
                display: { xs: "block", sm: "none" },
                marginLeft: "8px !important",
              }}
              className='doticon'>
              <FiberManualRecordIcon />
            </Typography>
            <Typography
              variant='h7medium'
              sx={{
                color: "#89909a",
                marginLeft: { xs: "5px !important", sm: "8px !important" },
              }}>
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

export default DesktopTabCard;
