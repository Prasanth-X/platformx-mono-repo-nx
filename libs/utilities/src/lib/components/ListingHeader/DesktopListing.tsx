import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import { dateFormat, handleHtmlTags } from '../../utils/helperFns';
import ThemeConstants from '../../themes/authoring/lightTheme/lightThemeVariable';

interface DesktopListingProps {
  index?: any;
  title?: string;
  description?: string;
  author?: string;
  time?: any;
  onClickSelect?: any;
  item?: any;
  isSelected?: any;
}
const DesktopListing = ({
  index,
  title,
  description,
  author,
  time,
  onClickSelect,
  item,
  isSelected,
}: DesktopListingProps) => {
  const { t } = useTranslation();
  return (
    <Box>
      <Grid
        key={index}
        container
        sx={{
          background: '#ffffff',
          // height: "60px",
          display: {
            sm: 'flex',
            xs: 'none',
          },
          alignItems: 'center',
          // padding: "0 25px",
          padding: '10px 20px 10px 20px',
          marginBottom: '10px',
          borderRadius: '3px',
          //   border: isSelected() ? "solid 1px #2d2d39" : "none",
        }}
      >
        <Grid
          item
          lg={4.4}
          sm={3.8}
          sx={{
            // marginRight: "2%",
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginRight: '1%',
          }}
        >
          <Typography
            variant='h6medium'
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {title}
          </Typography>
        </Grid>
        <Grid
          item
          sm={2}
          sx={{ display: 'flex', justifyContent: 'flex-start' }}
        >
          <Typography
            variant='h6regular'
            sx={{
              color: '#b3b3b3',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {handleHtmlTags(description)}
          </Typography>
        </Grid>
        <Grid
          item
          sm={2}
          sx={{ display: 'flex', justifyContent: 'flex-start' }}
        >
          <Typography
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '1',
              WebkitBoxOrient: 'vertical',
              textTransform: 'capitalize',
            }}
            variant='h6regular'
          >
            {author}
          </Typography>
        </Grid>
        <Grid
          item
          sm={2.4}
          sx={{ display: 'flex', justifyContent: 'flex-start' }}
        >
          <Typography variant='h6regular'>{dateFormat(time)}</Typography>
        </Grid>
        <Grid
          item
          sm={1} //sx={{ marginRight: "3.1%" }}
        >
          <Button
            variant='secondaryButton'
            className='sm'
            sx={{
              backgroundColor: isSelected(item)
                ? ThemeConstants.BLACK_COLOR
                : ThemeConstants.WHITE_COLOR,
              color: isSelected(item)
                ? ThemeConstants.WHITE_COLOR
                : ThemeConstants.BLACK_COLOR,
              '&:hover': {
                backgroundColor: !isSelected(item)
                  ? ThemeConstants.WHITE_COLOR
                  : '',
                color: !isSelected(item) ? ThemeConstants.BLACK_COLOR : '',
              },
            }}
            disableElevation
            onClick={() => onClickSelect(item)}
          >
            {isSelected(item) ? t('selected') : t('select')}
            {/* {btnText} */}
          </Button>
          {/* // } */}
        </Grid>
      </Grid>
    </Box>
  );
};
export default DesktopListing;
