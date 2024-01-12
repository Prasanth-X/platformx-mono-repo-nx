import { Box } from '@mui/material';
import { useStyles } from './MarkFeatured.styles';
import MarkFeaturedIcon from '../../assets/svg/StarFeatured.svg';
import StarFeaturedSelected from '../../assets/svg/StarFeaturedSelected.svg';
import ToolTipMessage from './ToolTipMessage';
import { XToolTip } from '../XToolTip/XToolTip';
export default function MarkFeatured({ setIsFeatured, isFeatured }) {
  const classes = useStyles();
  return (
    <Box
      sx={{ padding: '0px 8px' }}
      onClick={() => setIsFeatured((prev) => !prev)}
    >
      {isFeatured ? (
        <Box className={classes.BoxImage} sx={{ border: '1px solid #4B9EF9' }}>
          <img src={StarFeaturedSelected} />
        </Box>
      ) : (
        <XToolTip
          component={
            <Box
              className={classes.BoxImage}
              sx={{ border: '1px solid #14142B' }}
            >
              <img src={MarkFeaturedIcon} />
            </Box>
          }
          Title={<ToolTipMessage />}
          position='bottom'
        />
      )}
    </Box>
  );
}
