import { ArrowUpward, Cached } from '@mui/icons-material';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { showToastSuccess } from '../../../../components/toastNotification/toastNotificationReactTostify';
import ThemeConstants from '../../../../theme/variable';
import { PrelemVideoProps } from '../../utils/editTypes';
import BackButton from '../BackButton/BackButton';
import '../PageSettings/PageSettings.css';
import BasicSwitch from '../Switch';
import { useStyles } from './PrelemSettings.styles';

const PrelemVideos: React.FC<PrelemVideoProps> = ({
  index,
  playerFlow,
  videoInstance,
  handleSave,
  sectionToUpdate = 'Videos',
  handleGallery,
  selectedVideo,
  selectedIndex,
  setPageId,
}) => {
  const [content, setContent] = useState(videoInstance);
  const { t } = useTranslation();
  const [operationType, setOperationType] = useState<string>('replace');
  const UpdatePrelemInfo = () => {
    if (JSON.stringify(videoInstance) != JSON.stringify(content)) {
      if (content.Title != '' && content.Url != '') {
        handleSave(sectionToUpdate, content, index);
        showToastSuccess(`${t('prelem_video_info_toast')} ${t('saved_toast')}`);
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
  const classes = useStyles()();

  return (
    <Box className='pageSettingmainWp' key={`${index}_video`}>
      <BackButton setPageId={setPageId} Title='Videos' backTo='prelemSetting' />
      <Box className='rowBox'>
        {playerFlow == 'dspace' ? (
          content.Url ? (
            <Box className={classes.imageBox}>
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
                      <Cached sx={{ color: '#626060' }} />
                    </Box>
                    <Typography
                      mt={1}
                      sx={{
                        fontSize: ThemeConstants.FONTSIZE_XS,
                        color: ThemeConstants.WHITE_COLOR,
                      }}
                    >
                      {t('replace')}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box
              className={classes.uploadImageBox}
              onClick={() => onUploadClick(index, 'choose')}
            >
              <Typography className='switchbox' variant='p4regular'>
                <Box className={classes.blackRoundIcon}>
                  <ArrowUpward />
                </Box>
                Choose your video
              </Typography>
            </Box>
          )
        ) : null}
        {playerFlow == 'youtube' ? (
          <Box className='rowBox'>
            <Typography className='labelbox' variant='p4regular'>
              Video URL*
            </Typography>
            <TextField
              multiline
              value={content.Url}
              onChange={(e) => handleDataChange(e, 'Url')}
              variant='outlined'
              size='small'
              placeholder='write a Url here'
            />
          </Box>
        ) : null}
      </Box>
      <Box className='rowBox'>
        <Typography className='labelbox' variant='p4regular'>
          What is the title of the Video?*
        </Typography>
        <TextField
          multiline
          value={content.Title}
          onChange={(e) => handleDataChange(e, 'Title')}
          variant='outlined'
          size='small'
          placeholder='write a title here'
        />
      </Box>
      <Box className='rowBox'>
        <Typography className='labelbox' variant='p4regular'>
          What is this Video about?
        </Typography>
        <TextField
          multiline
          value={content.Description}
          onChange={(e) => handleDataChange(e, 'Description')}
          variant='outlined'
          size='small'
          placeholder='write a description here'
        />
      </Box>
      <Box className='rowBox'>
        <Typography className='switchbox' variant='p4regular'>
          Attribution
          <BasicSwitch
            color={ThemeConstants.BLACK_COLOR}
            checked={content.Attribution}
            onChange={(e: any) => handleAttribution(e, 'Attribution')}
          />
        </Typography>
      </Box>
      <Box className='rowBox'>
        <Typography className='switchbox' variant='p4regular'>
          CC
          <BasicSwitch
            color={ThemeConstants.BLACK_COLOR}
            checked={content.CC}
            onChange={(e: any) => handleAttribution(e, 'CC')}
          />
        </Typography>
      </Box>
      <Box className='rowBox'>
        <Typography className='switchbox' variant='p4regular'>
          Transcript
          <BasicSwitch
            color={ThemeConstants.BLACK_COLOR}
            checked={content.Transcript}
            onChange={(e: any) => handleAttribution(e, 'Transcript')}
          />
        </Typography>
      </Box>
      {(content.Title == '' ||
        content.Title.trim().length == 0 ||
        content.Url == '') && (
        <Box className='rowBox'>
          <Typography className='labelbox' variant='p4regular'>
            *Please fill the mandatory fields
          </Typography>
        </Box>
      )}
      <Box className='rowBox'>
        <Button
          disabled={getDisabledState()}
          variant='contained'
          sx={{ width: '100%' }}
          onClick={UpdatePrelemInfo}
        >
          Done
        </Button>
      </Box>
    </Box>
  );
};
export default PrelemVideos;
