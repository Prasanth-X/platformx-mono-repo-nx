import { Box } from '@mui/material';
import { memo } from 'react';
// import Header from '../Header/Header';
import Header from '../../../components/Header/Header';
// import { useStyles } from './RecentCard.styles';
import { useStyles } from './TaskCard.style';
// import { RecentCardProps } from './RecentCard.types';
import {TaskCardProps} from './TaskCard.types';

const TaskCard = ({
  title,
  titleVariant,
  linkText,
  children,
 
}: TaskCardProps) => {
  const classes = useStyles();
  return (
    <Box className={classes.head}>
      <Header title={title} titleVariant={titleVariant} linkText={linkText} />
      <Box className={classes.body} >{children}</Box>
    </Box>
  );
};

export default memo(TaskCard);
