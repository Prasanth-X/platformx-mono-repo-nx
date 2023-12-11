import React from "react";
import { useTranslation } from "react-i18next";
import { Grid, Typography, CardHeader, Chip, Box, Button } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import useTheme from "@mui/material/styles/useTheme";
import { capitalizeFirstLetter } from "../../utils/helperFns";
import Share from "../Share/Share";

const EventSummary = ({
  content,
  embedData,
  enablePreview,
  hideEventDetails,
  getEventUrl,
  showPublishedDate,
}: any) => {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <>
      <Grid
        xs={12}
        md={12}
        className='eventsummaryWrapper'
        sx={{
          height: { md: "100vh" },
        }}>
        <Grid item xs={12} className='headingWrapper'>
          <Box>
            <Typography className='headingWrapText' variant='h1semibold'>
              {content?.title}
            </Typography>
            <Typography variant='p3regular' className='descriptionSummary'>
              {content?.description}
            </Typography>
          </Box>
          <Box className='cardSummaryWrapper'>
            <Box className='cardHeaderWrapper'>
              <CardHeader
                sx={{ padding: "0" }}
                titleTypographyProps={{
                  variant: "h6bold",
                  sx: {
                    float: "left",
                    paddingRight: "5px",
                    width: "auto",
                  },
                }}
                title={`${capitalizeFirstLetter(content?.createdBy)} |`}
                subheaderTypographyProps={{
                  variant: "h6regular",
                  sx: {
                    color: theme.palette.prelemType1.TEXT,
                  },
                }}
                subheader={showPublishedDate()}
              />
              <Box sx={{ marginTop: "1%" }}>
                {content.PageTags?.map((tag: string) => {
                  return <Chip label={tag} key={tag} variant='outlined' className='badgeButton' />;
                })}
              </Box>
            </Box>
            <Box className='socialSharewrapper'>
              <Typography variant='h6regular'>{`${t("share")}`}</Typography>
              <Share
                domainUrl={getEventUrl()}
                shareUrl={content?.settings?.socialog_url}
                embedData={embedData}
                whiteIcon={false}
                border='1px solid black'
                enablePreview={enablePreview}
              />
            </Box>
          </Box>
          <Box
            sx={{
              textAlign: "center",
              bottom: "20px",
              width: "100%",
            }}>
            <Button
              variant='primaryButton2'
              className='eventsummaryButton'
              startIcon={<KeyboardArrowUpIcon />}
              onClick={hideEventDetails}>
              {`${t("hide_details")}`}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default EventSummary;
