import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import ThemeConstants from '../../theme/variable';
import { BrightCoveProps } from './utils/editTypes';
const PrelemBrightcoveVideo: React.FC<BrightCoveProps> = ({
  index,
  videoObj,
  handleSave,
  sectionToUpdate = 'Livestream',
}) => {
  const [content, setContent] = useState(videoObj);
  const handleDataChange = (event, fieldType) => {
    const contentNew = { ...content };
    contentNew[fieldType] = event.target.value;
    setContent(contentNew);
  };
  const isDisabled = () =>
    JSON.stringify(content) === JSON.stringify(videoObj) ||
    Object.keys(content).find((ele) => content[ele].length === 0)
      ? true
      : false;
  return (
    <AccordionDetails>
      <>
        <Box key={`${index  }_content`}>
          <Typography
              variant='subtitle1'
              sx={{ display: 'flex', alignimageInstances: 'center' }}
              className='drawer-label'
            >
            Please enter Account id*
            <Tooltip
                title={
                  <Box m={1}>
                    <Typography
                      sx={{ fontSize: ThemeConstants.FONTSIZE_XS }}
                      mb={1}
                    >
                      Enter brightcove Account id
                    </Typography>
                  </Box>
                }
                placement='right'
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
              value={content?.AccountID}
              error={content?.AccountID?.length === 0}
              onChange={(e: any) => handleDataChange(e, 'AccountID')}
              variant='standard'
              placeholder='Account Id'
              inputProps={{ maxLength: 15 }}
              sx={{
                width: '100%',
                '.Platform-x-Input-root:after': {
                  borderBottom: `1px solid ${  ThemeConstants.BLACK_COLOR}`,
                },
                margin: '10px',
              }}
            />
          <Typography
              variant='subtitle1'
              sx={{ display: 'flex', alignimageInstances: 'center' }}
              className='drawer-label'
            >
            Please enter Player id*
            <Tooltip
                title={
                  <Box m={1}>
                    <Typography
                      sx={{ fontSize: ThemeConstants.FONTSIZE_XS }}
                      mb={1}
                    >
                      Enter brightcove Player id
                    </Typography>
                  </Box>
                }
                placement='right'
              >
              <Box>
                <InfoOutlinedIcon
                    sx={{
                      marginLeft: '10px',
                      '&:hover': {
                        color: ThemeConstants.RED_COLOR,
                      },
                    }}
                  />
              </Box>
            </Tooltip>
          </Typography>
          <TextField
              multiline
              value={content?.PlayerID}
              error={content?.PlayerID?.length === 0}
              onChange={(e: any) => handleDataChange(e, 'PlayerID')}
              variant='standard'
              placeholder='Player Id'
              inputProps={{ maxLength: 15 }}
              sx={{
                width: '100%',
                '.Platform-x-Input-root:after': {
                  borderBottom: `1px solid ${  ThemeConstants.BLACK_COLOR}`,
                },
                margin: '10px',
              }}
            />
          <Typography
              variant='subtitle1'
              sx={{ display: 'flex', alignimageInstances: 'center' }}
              className='drawer-label'
            >
            Please enter Video id*
            <Tooltip
                title={
                  <Box m={1}>
                    <Typography
                      sx={{ fontSize: ThemeConstants.FONTSIZE_XS }}
                      mb={1}
                    >
                      Enter brightcove Video id
                    </Typography>
                  </Box>
                }
                placement='right'
              >
              <Box>
                <InfoOutlinedIcon
                    sx={{
                      marginLeft: '10px',
                      '&:hover': {
                        color: ThemeConstants.RED_COLOR,
                      },
                    }}
                  />
              </Box>
            </Tooltip>
          </Typography>
          <TextField
              multiline
              value={content?.VideoID}
              error={content?.VideoID?.length === 0}
              onChange={(e: any) => handleDataChange(e, 'VideoID')}
              variant='standard'
              placeholder='Video Id'
              inputProps={{ maxLength: 15 }}
              sx={{
                width: '100%',
                '.Platform-x-Input-root:after': {
                  borderBottom: `1px solid ${  ThemeConstants.BLACK_COLOR}`,
                },
                margin: '10px',
              }}
            />
          <Button
              variant='contained'
              disabled={isDisabled()}
              sx={{
                backgroundColor: ThemeConstants.BLACK_COLOR,
                '&:hover': {
                  backgroundColor: ThemeConstants.BLACK_COLOR,
                },
              }}
              onClick={() => handleSave(sectionToUpdate, content, index)}
            >
            Done
          </Button>
        </Box>
      </>
    </AccordionDetails>
  );
};
export default PrelemBrightcoveVideo;
