import { Box } from '@mui/material';
import { memo } from 'react';
import Header from '../header/Header';
import { useStyles } from './RecentCard.styles';
import { RecentCardProps } from './RecentCard.types';

const RecentCard = ({
  title,
  titleVariant,
  linkText,
  children,
}: RecentCardProps) => {
  const classes = useStyles();
  return (
    <Box className={classes.head}>
      <Header title={title} titleVariant={titleVariant} linkText={linkText} />
      <Box className={classes.body}>{children}</Box>
    </Box>
  );
};

export default memo(RecentCard);
