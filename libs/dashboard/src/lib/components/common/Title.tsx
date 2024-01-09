import { Typography } from '@mui/material';
import { memo } from 'react';

const Title = ({
  title = '',
  titleVarient,
  titleColor = '',
  textTransform = '',
  margin = '',
  padding= '',
}: any) => {
  return (
    <Typography
      variant={titleVarient}
      sx={{ color: titleColor, textTransform: textTransform, margin: margin, padding: padding }}
    >
      {title}
    </Typography>
  );
};
export default memo(Title);
