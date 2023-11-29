import { Box, Typography, useTheme } from "@mui/material";
import arrowOutward from '../../../../assets/arrow_outward.svg';
import CountUp from "react-countup";


interface StatBoxProps {
  title: number;
  subtitle: string;
  icon: string;
  progress?: string;
  increase: string;
  heading: string;
  startIcon?: string;
  endIcon?: string;
}

const StatBox: React.FC<StatBoxProps> = ({ title, subtitle, icon, progress, increase, heading, startIcon, endIcon }) => {

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Box sx={{display: '-webkit-inline-flex'}}>
          {/* <Box> */}
            <img src={icon} alt="" />
          {/* </Box> */}
          <Typography variant="h6semibold" sx={{marginLeft: '10px'}}>
          {heading}
          </Typography>
          </Box>
          <Typography variant="h2bold">
            {startIcon}
            <CountUp
            enableScrollSpy={true}
            start={0}
            end={title}
            delay={0}
            >
            {({ countUpRef }) => <span ref={countUpRef} />}
            </CountUp>
            {endIcon}
          </Typography>
        </Box>
        {/* <Box>
          <ProgressCircle progress={progress} />
        </Box> */}
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Box display="flex">
          <img src={arrowOutward} alt="" />
          <Typography variant="h7regular" sx={{marginLeft: '10px'}}> {subtitle}</Typography>
        </Box>
        <Box>
        <Typography variant="h7regular"> {increase}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default StatBox;