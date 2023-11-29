import { Box, Button, Typography } from "@mui/material";
import * as React from "react";
import { useTranslation } from "react-i18next";
import "service/i18n";
import "../../../../Style.css";
import { useCustomStyle } from "./RightCard.style";

const RightCard = ({ content, setIsCourseFrame }: any) => {
  const classes = useCustomStyle();
  const { t } = useTranslation();

  return (
    <div className={`${classes.RightCardWrapper} RightCard`}>
      <Box className='BoxWp'>
        <Box className='videoWrapper'>
          <img src={content?.teaser_image} alt='' />
        </Box>
        <Box className='BottomWrapper'>
          <Typography variant='h4bold'>
            {t("course_timing")} : {content?.teaser}
          </Typography>
          <Typography variant='h4bold'>
            {t("course_type")} : {content?.location}
          </Typography>
          <Box className='bottomWp'>
            <Button variant='primaryButton1' onClick={() => setIsCourseFrame(true)}>
              {t("start_now")}
            </Button>
            <Button variant='primaryButton2'> {t("add_to_playlist")} </Button>
          </Box>
          <Typography variant='p3bold'>{t("add_to_playlist")}</Typography>
          <ul className='itemsList'>
            <li>
              <Typography variant='p3regular'>{t("demand_video")}</Typography>
            </li>
            <li>
              <Typography variant='p3regular'>{t("download_resources")}</Typography>
            </li>
            <li>
              <Typography variant='p3regular'>{t("access_tv")}</Typography>
            </li>
            <li>
              <Typography variant='p3regular'>{t("full_time_access")}</Typography>
            </li>
            <li>
              <Typography variant='p3regular'>{t("certificate")}</Typography>
            </li>
          </ul>
        </Box>
      </Box>
    </div>
  );
};

export default RightCard;
