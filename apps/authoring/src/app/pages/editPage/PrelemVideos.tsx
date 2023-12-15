import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CachedIcon from '@mui/icons-material/Cached';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { ThemeConstants } from '@platformx/utilities';
import BasicSwitch from './Switch';
import { PrelemVideoProps } from './utils/editTypes';
const PrelemVideos: React.FC<PrelemVideoProps> = ({
  index,
  playerFlow,
  videoInstance,
  handleSave,
  sectionToUpdate = 'Videos',
  handleGallery,
  selectedVideo,
  selectedIndex,
}) => {
  const [content, setContent] = useState(videoInstance);
  const [operationType, setOperationType] = useState<string>('replace');
  const UpdatePrelemInfo = () => {
    if (JSON.stringify(videoInstance) != JSON.stringify(content)) {
      if (content.Title != '' && content.Url != '') {
        handleSave(sectionToUpdate, content, index);
      }
    }
  };
  const handleAttribution = (event, fieldType) => {
    const contentNew = { ...content };
    contentNew[fieldType] = event.target.checked;
    setContent(contentNew);
  };
  const handleDataChange = (event, fieldType) => {
    const contentNew = { ...content };
    contentNew[fieldType] = event.target.value;
    setContent(contentNew);
  };

  useEffect(() => {
    setContent(videoInstance);
  }, [videoInstance]);

  const onUploadClick = (videoIndex, type) => {
    handleGallery(true, 'Videos', videoIndex, type);
    setOperationType(type);
  };
  useEffect(() => {
    if (
      (operationType == 'choose' || operationType == 'replace') &&
      selectedIndex == index &&
      selectedVideo.Thumbnail != ''
    ) {
      const contentNew = {
        ...content,
        Url: selectedVideo.Url,
        Thumbnail: selectedVideo.Thumbnail,
        Title: selectedVideo.Title,
        Description: selectedVideo.Description,
      };
      setContent(contentNew);
    }
  }, [selectedVideo]);

  const getDisabledState = () => {
    if (
      JSON.stringify(videoInstance) === JSON.stringify(content) ||
      content.Title == '' ||
      content.Title.trim().length == 0 ||
      content.Url == ''
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <AccordionDetails key={`${index}_video`}>
      {playerFlow == 'dspace' ? (
        content.Url ? (
          <Box sx={{ position: 'relative' }} mb={2}>
            <video
              style={{ width: '100%', height: '100%' }}
              src={content.Url}
              controls
            ></video>
            <Box
              sx={{
                position: 'absolute',
                top: '0',
                width: '100%',
                height: '99%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#7470708a',
              }}
            >
              <Box sx={{ display: 'flex' }}>
                <Box
                  sx={{ cursor: 'pointer' }}
                  onClick={() => onUploadClick(index, 'replace')}
                >
                  <Box
                    sx={{
                      borderRadius: '50%',
                      backgroundColor: ThemeConstants.WHITE_COLOR,
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: 'auto',
                    }}
                  >
                    <CachedIcon sx={{ color: ThemeConstants.LIGHT_BG_COLOR }} />
                  </Box>
                  <Typography
                    mt={1}
                    sx={{
                      fontSize: ThemeConstants.FONTSIZE_XS,
                      color: ThemeConstants.WHITE_COLOR,
                    }}
                  >
                    Replace
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              borderRadius: '5px',
              border: `dashed 2px ${ThemeConstants.LIGHT_GREY_COLOR}`,
              padding: '20px',
              cursor: 'pointer',
              height: '147px',
              backgroundColor: ThemeConstants.LIGHT_BG_COLOR,
              display: 'flex',
              justifyContent: 'center',
            }}
            onClick={() => onUploadClick(index, 'choose')}
            mb={2}
          >
            <Typography
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: ThemeConstants.FONTSIZE_DEFAULT,
                color: ThemeConstants.PRIMARY_MAIN_COLOR,
              }}
            >
              <Box
                sx={{
                  borderRadius: '50%',
                  backgroundColor: ThemeConstants.BLACK_COLOR,
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                mr={2}
              >
                <ArrowUpwardIcon
                  style={{ color: ThemeConstants.WHITE_COLOR }}
                />
              </Box>
              Choose your video
            </Typography>
          </Box>
        )
      ) : null}
      {playerFlow == 'youtube' ? (
        <>
          <Typography
            variant="subtitle1"
            sx={{ display: 'flex', alignimageInstances: 'center' }}
            mt={2}
            mb={1}
            className="drawer-label"
          >
            Video URL*
            <Tooltip
              title={
                <Box m={1}>
                  <Typography
                    sx={{ fontSize: ThemeConstants.FONTSIZE_XS }}
                    mb={1}
                  >
                    Add a URL to change this Video.
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
                      color: ThemeConstants.NOTIFICATION_ERROR,
                    },
                  }}
                />
              </Box>
            </Tooltip>
          </Typography>
          <TextField
            multiline
            value={content.Url}
            onChange={(e) => handleDataChange(e, 'Url')}
            variant="outlined"
            placeholder="write a Url here"
          />
        </>
      ) : null}
      <Typography
        variant="subtitle1"
        sx={{ display: 'flex', alignItems: 'center' }}
        className="drawer-label"
      >
        What is the title of the Video?*
        <Tooltip
          title={
            <Box m={1}>
              <Typography sx={{ fontSize: ThemeConstants.FONTSIZE_XS }} mb={1}>
                Add a title to improve your sites SEO and accessibility.
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
                  color: ThemeConstants.NOTIFICATION_ERROR,
                },
              }}
            />
          </Box>
        </Tooltip>
      </Typography>
      <TextField
        multiline
        value={content.Title}
        onChange={(e) => handleDataChange(e, 'Title')}
        variant="outlined"
        placeholder="write a title here"
      />
      <Typography
        variant="subtitle1"
        sx={{ display: 'flex', alignItems: 'center' }}
        mt={2}
        mb={1}
        className="drawer-label"
      >
        What is this Video about?
        <Tooltip
          title={
            <Box m={1}>
              <Typography sx={{ fontSize: ThemeConstants.FONTSIZE_XS }} mb={1}>
                Add a description to improve your sites SEO and accessibility.
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
                  color: ThemeConstants.NOTIFICATION_ERROR,
                },
              }}
            />
          </Box>
        </Tooltip>
      </Typography>
      <TextField
        multiline
        value={content.Description}
        onChange={(e) => handleDataChange(e, 'Description')}
        variant="outlined"
        placeholder="write a description here"
      />
      <Typography
        variant="subtitle1"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        mt={2}
        mb={1}
      >
        Attribution
        <BasicSwitch
          color={ThemeConstants.BLACK_COLOR}
          checked={content.Attribution}
          onChange={(e: any) => handleAttribution(e, 'Attribution')}
        />
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        mt={2}
        mb={1}
      >
        CC
        <BasicSwitch
          color={ThemeConstants.BLACK_COLOR}
          checked={content.CC}
          onChange={(e: any) => handleAttribution(e, 'CC')}
        />
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        mt={2}
        mb={1}
      >
        Transcript
        <BasicSwitch
          color={ThemeConstants.BLACK_COLOR}
          checked={content.Transcript}
          onChange={(e: any) => handleAttribution(e, 'Transcript')}
        />
      </Typography>
      {(content.Title == '' ||
        content.Title.trim().length == 0 ||
        content.Url == '') && (
        <Typography
          variant="subtitle2"
          p={1}
          sx={{
            color: ThemeConstants.NOTIFICATION_ERROR,
            textAlign: 'center',
          }}
        >
          *Please fill the mandatory fields
        </Typography>
      )}
      <Box sx={{ textAlign: 'right' }} mb={2}>
        <Button
          disabled={getDisabledState()}
          variant="contained"
          sx={{
            backgroundColor: ThemeConstants.BLACK_COLOR,
            '&:hover': {
              backgroundColor: ThemeConstants.BLACK_COLOR,
            },
          }}
          onClick={UpdatePrelemInfo}
        >
          Done
        </Button>
      </Box>
    </AccordionDetails>
  );
};
export default PrelemVideos;
