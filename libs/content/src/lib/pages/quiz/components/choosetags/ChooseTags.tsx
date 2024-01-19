import { Box } from '@mui/material';

import { useTranslation } from 'react-i18next';
import { useCustomStyle } from '../../quiz.style';
import { CommonBoxWithNumber, XTags } from '@platformx/utilities';

const ChooseTags = ({ isEdit, tagData, selectedTag, handleTagOnChange }) => {
  const { t } = useTranslation();
  const classes = useCustomStyle();
  return (

    <Box id='tags' className={`${classes.chooseTagsWp}`}>
      <CommonBoxWithNumber
        number='05'
        title={t('choose_tags')}
        titleVarient='p3semibold'
        subTitleVarient='p4regular'
        subTitle={t('subhead')}
      >
        <Box className='noSpacWp'>
          <XTags
            isEdit={isEdit}
            tagData={tagData}
            selectedTag={selectedTag}
            handleTagOnChange={handleTagOnChange}
          />
        </Box>
      </CommonBoxWithNumber>
    </Box>
  );
};
export default ChooseTags;
