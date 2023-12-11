import { Delete, ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import React, { memo, useState } from 'react';
import ThemeConstants from '../../../../theme/variable';
import { TestimonialProps } from '../../utils/editTypes';
import BackButton from '../BackButton/BackButton';
import '../PageSettings/PageSettings.css';
import { showToastSuccess } from '../../../../components/toastNotification/toastNotificationReactTostify';
import { useTranslation } from 'react-i18next';

const PrelemTestimonials: React.FC<TestimonialProps> = ({
  data,
  sectionToUpdate = 'Testimonials',
  handleSave,
  setPageId,
}) => {
  const {t} = useTranslation();
  const [content, setContent] = useState(data);
  const [submitDisable, setSubmitDisable] = useState(true);
  const addTestimonial = () => {
    setSubmitDisable(false);
    setContent((old) => [
      ...old,
      {
        TestimonialText: '',
        AuthorName: '',
        AuthorDesignation: '',
      },
    ]);
  };

  const getDisabledState = () => {
    if (submitDisable) {
      return true;
    } else if (
      content.some((check) => check?.TestimonialText?.length === 0) ||
      content.some((check) => check?.AuthorName?.length === 0)
    ) {
      return true;
    } else return false;
  };

  const saveTestimonialInfo = () => {
    setSubmitDisable(true);
    handleSave(sectionToUpdate, content);
    showToastSuccess(`${t('prelem_testimonial_info_toast')} ${t('saved_toast')}`);
  };

  const deleteTestimonial = (key: string) => {
    setSubmitDisable(false);
    const temp = [...content];
    temp.splice(parseInt(key), 1);
    setContent(temp);
  };

  const handleDataChange = (event, key: string, fieldType: string) => {
    setSubmitDisable(false);
    const contentNew = [...content];
    contentNew[key][fieldType] = event.target.value;
    setContent(contentNew);
  };
  return (
    <Box className='pageSettingmainWp'>
      <Box className='rowBox'>
        <BackButton
          setPageId={setPageId}
          Title='Testimonials'
          backTo='prelemSetting'
        />
      </Box>
      {Object.entries(content).map(([key, value]) => {
        return (
          <Accordion
            key={key}
            sx={{
              boxShadow: 'none',
              padding: 0,
              margin: '0px',
              '&.Mui-expanded': {
                margin: '0px',
              },
            }}
          >
            <AccordionSummary
              sx={{
                padding: 0,
                '&.Mui-expanded': {
                  minHeight: '51px',
                },
              }}
              expandIcon={
                <ExpandMore sx={{ color: ThemeConstants.BLACK_COLOR }} />
              }
              aria-controls='images-content'
              id='images-header'
            >
              {Object.entries(content).length > 1 && (
                <Delete onClick={() => deleteTestimonial(key)} />
              )}
              <Typography className='labelbox' variant='p4regular'>
                {`Testimonial ${parseInt(key) + 1}`}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 0 }}>
              <Box className='rowBox'>
                <Typography className='labelbox' variant='p4regular'>
                  Description
                </Typography>
                <TextField
                  size='small'
                  variant='outlined'
                  id='outlined-textarea'
                  placeholder='description'
                  multiline
                  error={value?.TestimonialText?.length === 0}
                  value={value.TestimonialText}
                  inputProps={{ maxLength: 250 }}
                  onChange={(e) => handleDataChange(e, key, 'TestimonialText')}
                />
              </Box>
              <Box className='rowBox'>
                <Typography className='labelbox' variant='p4regular'>
                  Name
                </Typography>
                <TextField
                  size='small'
                  variant='outlined'
                  id='outlined-textarea'
                  placeholder='name'
                  error={value?.AuthorName?.length === 0}
                  value={value.AuthorName}
                  inputProps={{ maxLength: 25 }}
                  onChange={(e) => handleDataChange(e, key, 'AuthorName')}
                />
              </Box>
              <Box className='rowBox'>
                <Typography className='labelbox' variant='p4regular'>
                  Designation
                </Typography>
                <TextField
                  size='small'
                  variant='outlined'
                  id='outlined-textarea'
                  placeholder='designation'
                  value={value.AuthorDesignation}
                  inputProps={{ maxLength: 20 }}
                  onChange={(e) =>
                    handleDataChange(e, key, 'AuthorDesignation')
                  }
                />
              </Box>
            </AccordionDetails>
          </Accordion>
        );
      })}
      <Box className='rowBox'>
        <Button variant='contained' onClick={addTestimonial}>
          Add More
        </Button>
      </Box>
      <Box className='rowBox'>
        <Button
          variant='contained'
          disabled={getDisabledState()}
          onClick={saveTestimonialInfo}
          sx={{ width: '100%' }}
        >
          Done
        </Button>
      </Box>
    </Box>
  );
};
export default memo(PrelemTestimonials);
