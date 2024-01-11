import { Box } from '@mui/material';
import Icon from '../../../assets/svg/Icon.svg';
import Refresh from '../../../assets/svg/Refresh.svg';
import { useStyle } from './ColorPattet.styles';

const ColorPallet = ({
  colorCodes,
  onUploadClick,
  handleColorPallet,
  handleRefresh,
  updateField,
}) => {
  const classes = useStyle();
  return (
    <Box className={classes.container}>
      <Box
        onClick={() => {
          onUploadClick('Images');
          updateField();
        }}
        className={classes.innerContainer}
      >
        <img src={Icon} alt='Icon' />
      </Box>

      {colorCodes.map((val, index) => {
        return (
          <Box
            key={index}
            onClick={() => handleColorPallet(val)}
            sx={{
              width: '27px',
              height: '27px',
              flexGrow: '0',
              borderRadius: '20px',
              backgroundColor: val,
              margin: '0px 8px 8px 0px',
              border: val === '#fff' ? 'solid 1px #e6eaed' : null,
              cursor: 'pointer',
            }}
          ></Box>
        );
      })}
      <Box onClick={handleRefresh} className={classes.innerContainer}>
        <img src={Refresh} alt='Refresh' />

      </Box>
    </Box>
  );
};

export default ColorPallet;
