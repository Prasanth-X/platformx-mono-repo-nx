import { Box, Typography } from "@mui/material";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import SouthWestIcon from "@mui/icons-material/SouthWest";
import "./CustomBoxForDemo.css";

export default function CustomBoxForDemo({ item }: any) {
  const { title = "", value = "", increment = "", decrement = "", change = "", CustomIcon } = item;
  return (
    <>
      <Box className='custom-box'>
        <Typography className='textIcon'>
          <Typography variant='p4regular'>{title}</Typography>
          <CustomIcon />
        </Typography>
        <Typography variant='h3semibold'>{value}</Typography>
        <Typography className='textIcon'>
          {increment ? (
            <Typography className='green-text d-flex' variant='p4regular'>
              <NorthEastIcon color='success' />
              <Typography variant='p4regular'>{increment}</Typography>
            </Typography>
          ) : decrement ? (
            <Typography className='red-text d-flex' variant='p4regular'>
              <SouthWestIcon color='error' />
              <Typography variant='p4regular'>{decrement}</Typography>
            </Typography>
          ) : null}

          <Typography variant='p4regular'>{change}</Typography>
        </Typography>
      </Box>
    </>
  );
}
