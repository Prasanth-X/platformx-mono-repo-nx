import { Grid } from '@mui/material';
import TitleSubTitle from '../TitleSubtitle/TitleSubTitle';
import XTextBox from '../XTextField/XTextField';
import React from 'react';
import { TitleSubTitleType } from './FormTextField.types';
import { Box } from '@mui/system';

export const FormTextField = ({
  titleVariant,
  subTitleVariant,
  title,
  subTitle,
}: TitleSubTitleType) => {
  return (
    <Box
      key={'formTextField'}
      display='flex'
      flexDirection={{ xs: 'column', md: 'row' }}
      justifyContent='space-between'
      paddingBottom={2}
    >
      <Box width={{ xs: '100%', md: '40%' }}>
        <TitleSubTitle
          titleVariant={titleVariant}
          subTitleVariant={subTitleVariant}
          title={title}
          subTitle={subTitle}
        />
      </Box>
      <Box width={{ xs: '100%', md: '60%' }}>
        <XTextBox variant={'outlined'} />
      </Box>
    </Box>
  );
};
