import { Box, Typography, useTheme } from "@mui/material";
import arrowOutward from '../../../../assets/arrow_outward.svg';
import CountUp from "react-countup";


interface LmsStatBoxProps {
  title?: number;
  subtitle?: string;
  icon1?: string;
  icon2?: string;
  progress?: string;
  increase?: string;
  heading?: string;
}

const LmsStatBox: React.FC<LmsStatBoxProps> = ({ title, subtitle, icon1, icon2, progress, increase, heading }) => {

  return (
    <Box width="100%">
        <Box sx={{paddingBottom: '20px', borderBottom: '1px solid #D9DBE9'}}>
          <Typography variant="h6semibold">
          {heading}
          </Typography>
        </Box>
      <Box display="flex" justifyContent="space-between" mt="2px" sx={{paddingTop: '10px'}}>
       <Box>
          <Typography variant="h6semibold">Total</Typography>
          <Box display="flex">
            <img src={icon1} alt="" />
            <Typography variant="h7regular"> {subtitle}</Typography>
          </Box>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6semibold">New</Typography>
          <Box display="flex">
            <img src={icon2} alt="" />
            <Typography variant="h7regular"> {increase}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LmsStatBox;