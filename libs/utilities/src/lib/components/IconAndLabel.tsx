import { Box, Typography } from '@mui/material';

const IconAndLabel = ({
  icon,
  label,
  handelClick,
  funcProp,
  labelColor = 'black',
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        margin: '10px',
      }}
      onClick={() => handelClick(funcProp)}
    >
      {icon}
      <Typography variant="h7regular" sx={{ color: labelColor, marginLeft: "8px" }}>
        {label}
      </Typography>
    </Box>
  );
};

export default IconAndLabel;
