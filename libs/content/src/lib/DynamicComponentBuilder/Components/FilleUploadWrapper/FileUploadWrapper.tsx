import { Box } from '@mui/material';
import { ColorPallet, XFileUpload } from '@platformx/utilities';
import { useField, useFormikContext } from 'formik';
import { useState } from 'react';

const FileUploadWrapper = ({
  chooseText,
  onUploadClick,
  field,
  ifColorPallet = false,
}) => {
  const [meta] = useField(field.name);
  const { setFieldValue } = useFormikContext();
  const [color, setColor] = useState('');
  const updateField = (updatedPartialObj) => {
    console.log('updatedPartialObj', updatedPartialObj);
    setColor('');
    setFieldValue('original_image', updatedPartialObj?.original_image);
    setFieldValue('published_images', updatedPartialObj?.published_images);
  };
  const handleRefresh = () => {
    setColor('');
    setFieldValue(field.name, '');
    setFieldValue('bg_color', '');
    setFieldValue('original_image', {});
    setFieldValue('published_images', []);
    setFieldValue('qus_background_content', {});
  };
  const handleColorPallet = (val) => {
    setColor(val);
    setFieldValue('bg_color', val);
    setFieldValue('original_image', {});
    setFieldValue('published_images', []);
    setFieldValue('qus_background_content', {});
  };
  const colorCodes = [
    '#b29a53',
    '#ba8b78',
    '#ae6958',
    '#d86057',
    '#b75c8d',
    '#68669a',
    '#5c98ba',
    '#334075',
    '#246d73',
    '#806a71',
    '#514146',
  ];

  return (
    <>
      {color === '' ? (
        <XFileUpload
          url={meta?.value?.Thumbnail}
          onUploadClick={onUploadClick}
          content={meta.value}
          updateField={updateField}
          originalImage={meta?.value?.original_image}
          publishedImages={meta?.value?.published_images}
          isShowCrop
          chooseText={chooseText}
          chooseType='image'
        />
      ) : (
        <Box
          sx={{
            width: '100%',
            height: '206px',
            aspectRatio: {
              xs: '4 / 3',
              sm: '4 / 3',
              md: '1 / 1',
              em: '4 / 3',
              lg: '16 / 9',
              xl: '3 / 1',
            },
            backgroundColor: color,
            borderRadius: '15px',
          }}
        ></Box>
      )}
      {ifColorPallet && (
        <ColorPallet
          colorCodes={colorCodes}
          handleColorPallet={handleColorPallet}
          handleRefresh={handleRefresh}
          onUploadClick={onUploadClick}
          updateField={updateField}
        />
      )}
    </>
  );
};

export default FileUploadWrapper;
