import React, { useState } from "react";
import { Box, Button, Grid, useTheme, Typography } from "@mui/material";
import EmbedDesktopTabCard from "../EmbedDesktopTabCard/EmbedDesktopTabCard";
import { useTranslation } from "react-i18next";
import SkeltonLoader from "../skeleton/skeleton";

const CardContent = ({ selectedItem }: any) => {
  const [copyStatus, setICopyStatus] = useState<boolean>(false);
  const { t } = useTranslation();

  const content = {
    Title: selectedItem?.Title,
    Description: selectedItem?.Description,
    Thumbnail: selectedItem?.Thumbnail,
    Author: selectedItem?.Author,
    creationDate: selectedItem?.creationDate,
    Page: selectedItem?.Page,
    LandingPage: selectedItem?.LandingPage,
    ContentURL: selectedItem?.ContentURL,
  };

  const mobileEmbededCode = `
  <iframe src="${content?.Page}" width="360" height="203" style="border:none;overflow:hidden"></iframe>
`;
  const desktopEmbededCode = `
  <iframe src="${content?.Page}" width="480" height="270" style="border:none;overflow:hidden"></iframe>
`;

  const copyEmbededCode = (code: any) => {
    navigator.clipboard.writeText(code);
    setICopyStatus(true);
  };
  const theme = useTheme();
  return (
    <Box
      sx={{
        overflowY: "auto",
      }}>
      <Grid container>
        <Grid
          item
          xs={12}
          em={7}
          sx={{
            background: "#f5f6f8",
            display: "flex",
            alignItems: { xs: "start", md: "center" },
            height: { xs: "520px", sm: "initial", md: "initial", em: "480px" },
          }}>
          <Box
            sx={{
              width: { xs: "100%", md: "100%", lg: "100%" },
              padding: {
                xs: "56px 10px 0px 10px",
                md: "65px 0px",
                // lg: "82px 20px",
              },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className='card'>
            {selectedItem && selectedItem?.Thumbnail ? (
              <EmbedDesktopTabCard content={content} />
            ) : (
              <SkeltonLoader maxWidth={480} maxHeight={500} />
            )}
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          em={5}
          sx={{
            padding: {
              xs: "30px 10px 0px 10px",
              sm: "30px 20px 0px 20px",
              md: "35px 25px",
              lg: "45px 20px",
            },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Box
            sx={{
              padding: {
                xs: "15px",
                sm: "0",
                md: "0",
                // lg: "20px 0px 0 0",
              },
              background: "#fff",
              marginTop: { xs: "0px", sm: "20px", em: "0" },
              width: { xs: "360px", sm: "480px" },
            }}>
            {selectedItem && selectedItem?.Thumbnail ? (
              <>
                <Box
                  sx={{
                    marginBottom: { md: "25px", lg: "0" },
                    padding: { xs: "0 0 10px 0", md: "0" },
                  }}>
                  <Box>
                    <Typography
                      variant='h3bold'
                      color='textColor1'
                      sx={{ textTransform: "capitalize" }}>
                      {t("social_embed_link")}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant='h7regular' sx={{ color: "#89909a" }}>
                      {t("social_emded_link_desc")}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    height: { lg: "295px", xl: "225px" },
                    // height: "auto",
                    overflowY: "auto",
                    borderRadius: "5px",
                    border: "solid 1px #ced3d9",
                    flexGrow: " 0",
                    margin: { lg: "18px 0 34px" },
                    padding: "16px 20px 24px 25px",
                    overflowWrap: "break-word",
                    display: { xs: "block", md: "none" },
                    fontFamily: "Roboto Mono",
                    wordBreak: "break-word",
                  }}>
                  {mobileEmbededCode}
                </Box>
                <Box
                  sx={{
                    height: { md: "215px", lg: "215px" },
                    // height: "auto",
                    overflowY: "auto",
                    borderRadius: "5px",
                    border: "solid 1px #ced3d9",
                    flexGrow: " 0",
                    margin: { md: "18px 0" },
                    padding: "16px 20px 24px 25px",
                    overflowWrap: "break-word",
                    display: { xs: "none", md: "block" },
                    fontFamily: "Roboto Mono",
                    wordBreak: "break-word",
                  }}>
                  {desktopEmbededCode}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    paddingBottom: { xs: "25px", md: "25px", lg: "0" },
                  }}>
                  <Button
                    variant='secondaryButton1'
                    sx={{
                      display: { xs: "none", md: "flex" },
                      margin: "25px 0 0 0",
                      background: theme.palette.textColor1,
                      color: theme.palette.textColor,
                      "&:hover": {
                        background: theme.palette.textColor1,
                      },
                    }}
                    onClick={() => copyEmbededCode(desktopEmbededCode)}>
                    {copyStatus ? t("copied") : t("copy_code")}
                  </Button>
                  <Button
                    variant='secondaryButton1'
                    sx={{
                      minWidth: { xs: "100%" },
                      display: { xs: "flex", md: "none" },
                      margin: { xs: "20px 0 0 0", md: 0 },
                      background: theme.palette.textColor1,
                      color: theme.palette.textColor,
                      "&:hover": {
                        background: theme.palette.textColor1,
                      },
                    }}
                    onClick={() => copyEmbededCode(mobileEmbededCode)}>
                    {copyStatus ? t("copied") : t("copy_code")}
                  </Button>
                </Box>
              </>
            ) : (
              <SkeltonLoader maxWidth={480} maxHeight={500} />
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default CardContent;
