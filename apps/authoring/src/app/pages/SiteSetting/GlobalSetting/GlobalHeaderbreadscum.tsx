import { makeStyles } from '@material-ui/core';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { capitalizeFirstLetter } from '../../../utils/helperFunctions';


function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}
const useBreadCumStyle = makeStyles(() => ({
  breadcumColor: {
    "&:hover": {
      color: '#4B9EF9',
    }
  }
}));

const GlobalHeaderbreadscum = ({ value }) => {
  const classes = useBreadCumStyle()
  const breadcrumbValue = value?.breadcrumb?.split('|');
  const scopeId =  value?.ScopeId?.split('|')?.pop();


  return (
    <Stack spacing={3}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Link sx={{ display: { xs: 'block', sm: 'none' } }} className={classes.breadcumColor} underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
          :
        </Link>
        {
          breadcrumbValue?.map((val, key) => {
            return val && (
              <Link className={classes.breadcumColor}
                underline="hover"
                key={key}
                color="inherit"
                href="/material-ui/getting-started/installation/"
                onClick={handleClick}
              >
                {capitalizeFirstLetter(val.trimStart().trimEnd())}
              </Link>
            )
          })
        }
      </Breadcrumbs>
    </Stack>
  );
}
export default GlobalHeaderbreadscum