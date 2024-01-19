import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Grid,
  Typography
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface ListSubHeaderProps {
  Title?: string;
  Description?: string;
  Author?: string;
  Time?: string;
  Action?: string;
  BtnText?: string;
  onButtonClick?: () => void;
}
const ListSubHeader = ({
  Title,
  Description,
  Author,
  Time,
  Action,
  BtnText,
  onButtonClick,
}: ListSubHeaderProps) => {
 const { t }= useTranslation();
  return (
    <Grid
      container
      sx={{
        display: { sm: 'flex', xs: 'none' },
        alignItems: 'center',
        // justifyContent: "space-between",
        backgroundColor: '#f7f7f7',
        padding: { sm: '10px 20px 10px 20px', xs: '10px 10px 10px 10px' },
        margin: '0px',
      }}
    >
      {/* <Grid item xs={12} sm={7} sx={{ display: { sm: 'flex', xs: 'none' } }}>
        <Box
          sx={{
            display: { sm: 'flex', xs: 'none' },
            alignItems: 'center',
            margin: '10px 0',
            //   padding:{xs:'10px 0px 10px 10px',sm:'10px 0'}
          }}
        > */}
          {/* <Typography variant='h3medium'>{t('recently_added')} </Typography> */}
          {/* <FiberManualRecordIcon
            sx={{
              fontSize: { xs: "7px", sm: "10px" },
              margin: "0 5px",
              color: "#b3b3b3",
            }}
          />
          <Typography
            variant="h4"
            sx={{ color: "#b3b3b3", fontSize: { xs: "20px", sm: "20px" } }}
          >
           {arr?.length}
          </Typography> */}
        {/* </Box>
      </Grid> */}
      {/* <Grid
        item
        xs={12}
        sm={5}
        sx={{ display: { sm: 'flex', xs: 'none' } }}
        alignItems='flex-end'
        justifyContent='flex-end'
      >
        <Box sx={{ display: 'flex' }}>
          <Button
            variant='contained'
            // disabled={true}
            sx={{
              display: { xs: 'none', sm: 'flex' },
              marginLeft: '20px',
              fontSize: '14px',
            }}
            onClick={onButtonClick}
          >
            <AddIcon
              sx={{ marginRight: '5px', width: '15px', height: '15px' }}
            />{' '}
            {BtnText}
          </Button>
        </Box>
      </Grid> */}
      <Grid
        container
        // sm={12}
        sx={{
          display: {
            sm: 'flex',
            xs: 'none',
            alignItems: 'center',
            padding: '20px 15px 0px 15px',
            // marginBottom: "14px",
          },
        }}
      >
        <Grid item lg={4.45} sm={3.8}>
          <Typography
            variant='h6regular'
            sx={{ color: '#b3b3b3', textTransform: 'capitalize' }}
          >
            {Title}
          </Typography>
        </Grid>
        <Grid item sm={2}>
          <Typography
            variant='h6regular'
            sx={{ color: '#b3b3b3', textTransform: 'capitalize' }}
          >
            {Description}
          </Typography>
        </Grid>
        <Grid item sm={1.95}>
          <Typography
            variant='h6regular'
            sx={{ color: '#b3b3b3', textTransform: 'capitalize' }}
          >
            {Author}
          </Typography>
        </Grid>
        <Grid item sm={2.6}>
          <Typography
            variant='h6regular'
            sx={{ color: '#b3b3b3', textTransform: 'capitalize' }}
          >
            {Time}
          </Typography>
        </Grid>
        <Grid item sm={1}>
          <Typography
            variant='h6regular'
            sx={{ color: '#b3b3b3', textTransform: 'capitalize' }}
          >
            {Action}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default ListSubHeader;
