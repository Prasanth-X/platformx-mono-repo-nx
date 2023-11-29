import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Box, Typography } from '@mui/material';
import { useStyles } from './PageSetting.styles';
interface pageSettinginsting {
  title?: any;
  imgUrl?: any;
  setPageId?: any;
  id?: string;
}
export default function PageSettingMenu({
  title,
  imgUrl,
  setPageId,
  id,
}: pageSettinginsting) {
  const classes = useStyles();
  const handleClick = (val) => {
    setPageId(val);
  };

  return (
    <Box className={classes.listItem} onClick={() => handleClick(id)}>
      <Box className={classes.leftwp}>
        <Box className={classes.imgbox}>
          <img src={imgUrl} alt='title' />
        </Box>
        <Typography variant='p3regular'>{title}</Typography>
      </Box>
      <KeyboardArrowRightIcon />
    </Box>
  );
}
