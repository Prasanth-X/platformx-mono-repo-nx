import React from "react";
import { Typography, Box } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { dateFormat, timeFormat } from "../../utils/helperFns";

const CompletionList = ({ content = {} }: any) => (
  <Box className='completionList' sx={{ display: "flex" }}>
    <Box sx={{ display: "flex" }}>
      <Typography
        variant='h2semibold'
        className='widthAuto'
        color='textColor'
        sx={{ paddingLeft: { xs: "20px", md: "0" } }}>
        <CalendarMonthOutlinedIcon sx={{ marginTop: "5px" }} />
      </Typography>
      <Typography variant='h2semibold' color='textColor' sx={{ marginLeft: "10px" }}>
        {dateFormat(content?.event_end_date)}
      </Typography>
    </Box>
    <Box sx={{ paddingLeft: "30px", display: "flex" }}>
      <Typography variant='h2semibold' sx={{ paddingLeft: "20px" }}>
        <AccessTimeIcon sx={{ marginTop: "5px" }} />
      </Typography>
      <Typography variant='h2semibold' color='textColor' sx={{ marginLeft: "10px" }}>
        {timeFormat(content?.event_end_date)}
      </Typography>
    </Box>
  </Box>
);

export default CompletionList;
