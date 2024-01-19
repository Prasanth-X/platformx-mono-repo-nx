import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { dateFormat } from "../../utils/helperFns";

interface MobileListingProps {
  index?: any;
  title?: string;
  description?: string;
  author?: string;
  time?: any;
  onClickHandle?: any;
  item?: any;
  isSelected?: any;
}
const MobileListing = ({
  index,
  title,
  description,
  author,
  time,
  onClickHandle,
  item,
  isSelected,
}: MobileListingProps) => {
  return (
    <Box>
      <Grid
        container
        onClick={() => onClickHandle(item)}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#fff',
          borderRadius: '3px',
          padding: '10px 14px 0px 14px',
          marginBottom: '10px',
          // height: "74px",
            border: isSelected(item) ? 'solid 1px #2d2d39' : 'none'
        }}
      >
        <Grid
          item
          xs={12} //sx={{ paddingLeft: "14px", width: "85%" }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical',
              }}
              variant='h6medium'
            >
              {title}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: '#89909a',
              padding: '4px 0px 9px 0px',
            }}
          >
            <Typography variant='h7regular'>{`By ${author}`}</Typography>
            <span style={{ margin: '0 2px', fontSize: '12px' }}>|</span>
            <Typography variant='h7regular'>{dateFormat(time)}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default MobileListing;
