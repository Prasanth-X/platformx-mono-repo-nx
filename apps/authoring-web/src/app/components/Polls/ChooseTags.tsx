import { Box } from '@mui/material';

import { useTranslation } from 'react-i18next';
import { Tags } from '../Common/tags/Tags';
import { useCustomStyle } from './Poll.style';
import CommonBoxWithNumber from '../../Common/CommonBoxWithNumber/CommonBoxWithNumber';

const ChooseTags = ({ isEdit, tagData, selectedTag, handleTagOnChange }) => {
  const { t } = useTranslation();
  const classes = useCustomStyle();
  return (
    <Box id='tags' className={`${classes.chooseTagsWp}`}>
      <CommonBoxWithNumber
        number='06'
        title={t('choose_tags')}
        titleVarient='p3semibold'
        subTitleVarient='p4regular'
        subTitle={t('subhead')}
      >
        <Box className='noSpacWp'>
          <Tags
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
