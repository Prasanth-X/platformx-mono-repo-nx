import { Box, Grid } from '@mui/material';
import { FC } from 'react';
import { useStyles } from './GridRowWrap.styles';
import { GridRowWrapProps } from './GridRowWrap.types';

export const GridRowWrap: FC<GridRowWrapProps> = ({
  left: left,
  right: right,
  mt: marginTop,
}) => {
  const classes = useStyles();
  return (
    <Box mt={marginTop}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={5} md={5} className={classes.gridWrapRight}>
          {left}
        </Grid>
        <Grid item xs={12} sm={7} md={7}>
          {right}
        </Grid>
      </Grid>
    </Box>
  );
};
