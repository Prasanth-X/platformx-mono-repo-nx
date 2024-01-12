import { ArrowBack } from '@mui/icons-material';
import { Box, Button, Grid, Typography } from '@mui/material';
import { HeaderProps } from './common.types';
import Submit from './Submit';
import { PreviewNewIcon } from '@platformx/utilities';
import WorkflowIcon from '../../assets/svg/WorkflowHistory/timer.svg';
import { useStyles } from './CommonHeader.styles';

export const ContentTopHeader = ({
  Title,
  Button1,
  Button2,
  Tab1,
  Tab2,
}: HeaderProps) => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.parentGrid}
      container //spacing={2}
      sx={{
        // backgroundColor: '#ffffff',
        // padding: '10px',
        // margin: '0px',
        // display: 'flex',
        // alignItems: 'center',
        // minHeight: '62px',
      }}
    >
      <Grid
        className={classes.secondGrid}
        item
        xs={2}
        md={5}
        em={4}
        sm={12}
      // sx={{ display: 'flex', alignItems: 'center' }}
      >
        <Button
          className={classes.divButtonTitle}
          variant='text'
          disableRipple
          disableFocusRipple
          startIcon={<ArrowBack />}
        // sx={{
        //   minWidth: '0px',
        //   textTransform: 'capitalize',
        //   '&:hover': { backgroundColor: 'transparent' },
        // }}
        >
          <Typography variant='h4bold'> {Title}</Typography>
        </Button>
      </Grid>
      <Grid
        //  className={classes.thirdGrid}
        item
        xs={6}
        md={7}
        em={8}
        sm={12}
        sx={{ display: { xs: 'none', em: 'flex' }, alignItems: 'center' }}
        direction='row-reverse'
        container
        alignItems='flex-end'
      >
        <Submit Button2={Button2} Tab1={Tab1} Tab2={Tab2} />

        <Button
          variant='secondaryButton'
          className='sm'
          sx={{ marginRight: '10px' }}
        >
          {Button1}
        </Button>

        <span
          className={classes.divSpan}
          style={{
            // cursor: 'pointer',
            // width: '32px',
            // height: '32px',
            // display: 'flex',
            // marginRight: '10px',
          }}
        >
          <Button
            className={classes.secondButtonDiv}
            sx={{
              // display: 'flex',
              // padding: '10px',
              // minWidth: 'auto',
              // '& span': {
              //   margin: 0,
              // },
            }}
          >
            <img
              src={PreviewNewIcon}
              alt='history'
            />
          </Button>
        </span>

        <Box
          className={classes.divThirdButton}
        // sx={{ display: 'flex', padding: '10px' }}
        >
          <img
            style={{ filter: 'brightness(0) invert(50%)', height: '16px' }}
            src={WorkflowIcon}
            alt='history'
          />
        </Box>
      </Grid>
    </Grid>

  );
};

export default ContentTopHeader;
