import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionSummary,
  Box,
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import React, { memo, useState } from 'react';
import ThemeConstants from '../../theme/variable';
import { TestimonialProps } from './utils/editTypes';
const PrelemTestimonials: React.FC<TestimonialProps> = ({
  data,
  sectionToUpdate = 'Testimonials',
  handleSave,
}) => {
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
    <AccordionDetails>
      {Object.entries(content).map(([key, value]) => {
        return (
          <Accordion
            key={key}
            sx={{
              boxShadow: 'none',
              '&.Mui-expanded': {
                margin: '0px',
              },
            }}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon sx={{ color: ThemeConstants.BLACK_COLOR }} />
              }
              aria-controls='images-content'
              id='images-header'
            >
              {Object.entries(content).length > 1 && (
                <IconButton
                  color='primary'
                  aria-label='delete testimonial'
                  component='span'
                  onClick={() => deleteTestimonial(key)}
                >
                  <DeleteIcon />
                </IconButton>
              )}
              <Typography
                variant='h6'
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: {
                    xs: ThemeConstants.FONTSIZE_DEFAULT,
                    xl: ThemeConstants.FONTSIZE_MD,
                  },
                  color:
                    value?.TestimonialText?.length === 0 ||
                    value?.AuthorName?.length === 0
                      ? ThemeConstants.RED_COLOR
                      : '',
                }}
              >
                {`Testimonial ${parseInt(key) + 1}`}
              </Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              <Typography>Description</Typography>
              <TextField
                id='outlined-textarea'
                placeholder='description'
                multiline
                error={value?.TestimonialText?.length === 0}
                value={value.TestimonialText}
                inputProps={{ maxLength: 250 }}
                onChange={(e) => handleDataChange(e, key, 'TestimonialText')}
              />
              <Typography>Name</Typography>
              <TextField
                id='outlined-textarea'
                placeholder='name'
                error={value?.AuthorName?.length === 0}
                value={value.AuthorName}
                inputProps={{ maxLength: 25 }}
                onChange={(e) => handleDataChange(e, key, 'AuthorName')}
              />
              <Typography>Designation</Typography>
              <TextField
                id='outlined-textarea'
                placeholder='designation'
                value={value.AuthorDesignation}
                inputProps={{ maxLength: 20 }}
                onChange={(e) => handleDataChange(e, key, 'AuthorDesignation')}
              />
            </AccordionDetails>
          </Accordion>
        );
      })}
      <Box sx={{ textAlign: 'center' }} mb={2} mt={2}>
        <Button
          variant='contained'
          sx={{
            backgroundColor: ThemeConstants.BLACK_COLOR,
            '&:hover': {
              backgroundColor: ThemeConstants.BLACK_COLOR,
            },
          }}
          onClick={addTestimonial}
        >
          Add More
        </Button>
      </Box>
      <Box sx={{ textAlign: 'right' }} mb={2} mt={2}>
        <Button
          variant='contained'
          disabled={getDisabledState()}
          sx={{
            backgroundColor: ThemeConstants.BLACK_COLOR,
            '&:hover': {
              backgroundColor: ThemeConstants.BLACK_COLOR,
            },
          }}
          onClick={saveTestimonialInfo}
        >
          Done
        </Button>
      </Box>
    </AccordionDetails>
  );
};
export default memo(PrelemTestimonials);
