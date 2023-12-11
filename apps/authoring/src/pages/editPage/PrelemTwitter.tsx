import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import ThemeConstants from '../../../../../libs/utilities/src/lib/themes/authoring/variable';
import { TwitterProps } from './utils/editTypes';
const PrelemTwitter: React.FC<TwitterProps> = ({
  index,
  twitterHandle,
  handleSave,
  sectionToUpdate = 'TwitterHandle',
}) => {
  const [handle, setHandle] = useState(twitterHandle);
  return (
    <AccordionDetails>
      <>
        <Box key={`${index}_content`}>
          <Typography
            variant="subtitle1"
            sx={{ display: 'flex', alignimageInstances: 'center' }}
            className="drawer-label"
          >
            Please enter twitter handle to fetch tweets
            <Tooltip
              title={
                <Box m={1}>
                  <Typography
                    sx={{ fontSize: ThemeConstants.FONTSIZE_XS }}
                    mb={1}
                  >
                    Enter a handle to fetch latest tweets from
                  </Typography>
                </Box>
              }
              placement="right"
            >
              <Box>
                <InfoOutlinedIcon
                  sx={{
                    marginLeft: '10px',
                    '&:hover': {
                      color: '#fd0c0d',
                    },
                  }}
                />
              </Box>
            </Tooltip>
          </Typography>
          <TextField
            multiline
            value={handle}
            error={handle?.length === 0}
            onChange={(e: any) => setHandle(e.target.value)}
            variant="standard"
            placeholder="hcltech"
            inputProps={{ maxLength: 15 }}
            sx={{
              width: '100%',
              '.Platform-x-Input-root:after': {
                borderBottom: '1px solid #000000',
              },
              margin: '10px',
            }}
          />
          <Button
            variant="contained"
            disabled={handle?.length === 0}
            sx={{
              backgroundColor: ThemeConstants.BLACK_COLOR,
              '&:hover': {
                backgroundColor: ThemeConstants.BLACK_COLOR,
              },
            }}
            onClick={() => handleSave(sectionToUpdate, handle, index)}
          >
            Done
          </Button>
        </Box>
      </>
    </AccordionDetails>
  );
};
export default PrelemTwitter;
