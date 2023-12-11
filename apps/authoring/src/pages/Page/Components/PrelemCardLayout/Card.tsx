import { Box, Typography } from '@mui/material';
import { log } from 'console';
import ThemeConstants from '../../../../../../../libs/utilities/src/lib/themes/authoring/variable';
import { createImageURL } from '../../../../utils/helperFunctions';
import { useStyles } from './CardList.styles';

const Card = ({ key, layout, handleLayoutFilter }) => {
  const classes = useStyles();
  console.log('layout', layout);
  const LayoutThumbnailURL = createImageURL(
    layout?.thumbnail?.ImageCropUrl,
    layout?.thumbnail?.ext
  );
  return (
    <Box
      key={key}
      className={classes.cardwp}
      sx={{
        backgroundColor: `${
          layout?.selectedValue ? ThemeConstants.LAVENDER_COLOR : ''
        }`,
      }}
      onClick={() => handleLayoutFilter(layout?.mapping, layout?.id)}
      data-testid="layout-image-item"
    >
      <Box className={classes.img}>
        <img
          src={`${LayoutThumbnailURL}`}
          srcSet={`${LayoutThumbnailURL}`}
          alt={`${layout?.title}`}
          loading="lazy"
        />
      </Box>
      <Typography
        className={classes.textTypo}
        component="p"
        variant="h7regular"
      >
        {layout.title}
      </Typography>
    </Box>
  );
};

export default Card;
