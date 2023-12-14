import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const ContentGridLoaderDesktop = () => {
  return (
    <React.Fragment>
      <Box sx={{ overflow: 'hidden' }}>
        {['1', '2'].map((ele, i) => {
          return (
            <React.Fragment key={i + 100}>
              <Grid
                xs={12}
                sm={12}
                lg={4}
                xl={4}
                container
                wrap='nowrap'
                sx={{
                  margin: '0 10px 0 10px',
                }}
              >
                {Array.from(new Array(5)).map((item, index: number) =>
                  (<Box key={index} sx={{ width: 230, margin: 2, my: 5 }}>
                    <Skeleton variant='rectangular' width={240} height={140} />
                    <Box sx={{ pt: 0 }}>
                      <Skeleton />
                      <Skeleton width='65%' />
                    </Box>
                  </Box>)
                )}
              </Grid>
            </React.Fragment>
          );
        })}
      </Box>
    </React.Fragment>
  );
};

export default ContentGridLoaderDesktop;
