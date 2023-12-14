import { ArrowBack } from '@mui/icons-material';
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded';
import TelegramIcon from '@mui/icons-material/Telegram';
import { Button, Grid, Typography } from '@mui/material';
import { useStyles } from './Header.styles';

export default function Header({
  type,
  createUpdateHandler = () => {},
  returnBack = () => {},
  disableButton = false,
}) {
  // const navigate = useNavigate();
  const classes = useStyles();

  return (
    <Grid container className={`${classes.container} main-container`}>
      <Grid item xs={7} md={4} sm={12} className='gridItemTitle'>
        <Button
          variant='text'
          disableRipple
          disableFocusRipple
          startIcon={<ArrowBack />}
          className='gridItemTitleButton'
          onClick={returnBack}
        >
          <Typography variant='h4bold'>{type}</Typography>
        </Button>
      </Grid>
      <Grid
        item
        xs={6}
        md={8}
        sm={12}
        className='desktopSubmitButton'
        direction='row-reverse'
        container
        alignItems='flex-end'
      >
        <Button
          disabled={disableButton}
          variant='outlined'
          size='small'
          className='desktopsaveButton'
          onClick={createUpdateHandler}
        >
          Submit
        </Button>
      </Grid>
      <Grid
        item
        xs={5}
        md={7}
        sm={7}
        className='mobileSubmitButton'
        direction='row-reverse'
        container
        alignItems='flex-end'
      >
        <Button
          startIcon={<TelegramIcon />}
          className='individualButton'
          onClick={() => {}}
        ></Button>

        <Button
          startIcon={<SaveAsRoundedIcon />}
          className='individualButton'
          onClick={() => {}}
        ></Button>
      </Grid>
    </Grid>
  );
}
