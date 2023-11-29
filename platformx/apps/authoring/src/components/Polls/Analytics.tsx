import { Box } from '@mui/material';
import { useState } from 'react';
import TitleSubTitle from '../Common/TitleSubTitle';

import BasicSwitchText from '../Common/BasicSwitchText';

const Analytics = ({ state, setState }) => {
  const [isDisable, setIsDisable] = useState(false);
  const [state1, setState1] = useState({
    analytics: true,
    impression: true,
    contentInsight: false,
  });
  const handleChange = (event, keyName) => {
    // setState({ ...state, [keyName]: event.target.checked });
    setState1({ ...state1, [keyName]: event.target.checked });
  };
  return (
    <Box
      id='Analytics'
      sx={{
        backgroundColor: '#ffffff',
        padding: {
          xs: '15px 14px 13px 14px',
          sm: '40px 89px 40px 40px',
          md: '40px 89px 40px 40px',
        },
        marginBottom: '12px',
      }}
    >
      <TitleSubTitle
        title='Analytics'
        subTitle='Fields with * are mandatory'
        titleVarient='h3medium'
        subTitleVarient='h7regular'
      />
      <Box sx={{ marginTop: { sm: '40px', xs: '30px' } }}>
        <BasicSwitchText
          state={state1.analytics}
          isDisable={isDisable}
          handleChange={handleChange}
          title='Poll Analytics'
          subtitle='Subheading description'
          keyName='analytics'
        />
      </Box>
      <Box sx={{ marginTop: { sm: '40px', xs: '30px' } }}>
        <BasicSwitchText
          state={state1.impression}
          isDisable={isDisable}
          handleChange={handleChange}
          title='Impression'
          subtitle='Subheading description'
          keyName='impression'
        />
      </Box>
      <Box sx={{ marginTop: { sm: '40px', xs: '30px' } }}>
        <BasicSwitchText
          state={state1.contentInsight}
          isDisable={isDisable}
          handleChange={handleChange}
          title='Content Insight'
          subtitle='Subheading description'
          keyName='contentInsight'
        />
      </Box>
    </Box>
  );
};
export default Analytics;
