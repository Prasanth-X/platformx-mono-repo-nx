import { useLazyQuery } from '@apollo/client';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tags } from '../../../../components/Common/tags/Tags';
import TitleSubTitle from '../../../../components/Common/TitleSubTitle';
import { showToastError } from '../../../../components/toastNotification/toastNotificationReactTostify';
import { fetchTagList } from '../../../../services/common/tags.aps';
import { useCustomStyle } from '../../CreateEvent.styles';
import CommonBoxWithNumber from '../../../../Common/CommonBoxWithNumber/CommonBoxWithNumber';
import { ComponentProp } from './ChooseTags.types';

const EventChooseTags = ({
  state,
  setState,
  eventWholeRef,
  content = {},
  isEdit = false,
  unsavedChanges,
  setScrollToView,
  socialShareExpanded,
}: ComponentProp) => {
  const { t } = useTranslation();
  const classes = useCustomStyle();

  const { currentContent = {} } = content;
  const [runFetchTagList] = useLazyQuery(fetchTagList);
  const [tagData, setTagData] = useState([]);
  const [tagArr, setTagArr] = useState([]);

  const handleTagOnChange = (event) => {
    let tagsArray = [...tagArr] || [];
    if (event.target.checked && tagsArray?.length > 14) {
      event.target.checked = false;
      showToastError(t('allowed_tags_toast'));
    } else {
      if (event.target.checked) {
        tagsArray = [...tagArr, event.target.value];
      } else {
        tagsArray.splice(tagArr.indexOf(event.target.value), 1);
      }
      setTagArr(tagsArray);
      setState({
        ...state,
        ['tags']: tagsArray,
        ['tagsSocialShare']: tagsArray,
      });
      eventWholeRef.current = {
        ...eventWholeRef.current,
        ['tags']: tagsArray,
        ['tagsSocialShare']: tagsArray,
      };
      unsavedChanges.current = true;
    }
  };

  useEffect(() => {
    if (Object.keys(tagData).length == 0) {
      runFetchTagList({
        variables: { start: 0, rows: 1000 },
      })
        .then((res) => {
          if (res?.data?.authoring_getTagsList) {
            const { data: { authoring_getTagsList: tagArray = [] } = {} } =
              res || {};
            setTagData(tagArray);
            socialShareExpanded && setScrollToView('socialShare');
          }
        })
        .catch((err) => {
          setTagData([]);
          console.log(JSON.stringify(err, null, 2));
        });
    }
  }, []);

  useEffect(() => {
    if (Object.keys(currentContent).length > 0) {
      setTagArr(currentContent?.PageTags);
    }
  }, [currentContent]);
  useEffect(() => {
    if (isEdit && state?.tags) {
      setTagArr(state?.tags);
    }
  }, [state]);

  useEffect(() => {
    if (!isEdit && state?.tags?.length === 0 && tagData?.length > 0) {
      handleTagOnChange({
        target: {
          checked: true,
          value: "Events",
        },
      });
    }
  }, [tagData?.length > 0]);

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
          <Tags
            tagData={tagData}
            selectedTag={tagArr}
            handleTagOnChange={handleTagOnChange}
            isEdit={
              isEdit && state?.tags?.length > 0
                ? isEdit
                : Object.keys(currentContent).length > 0
                ? true
                : false
            }
          />
        </Box>
      </CommonBoxWithNumber>
    </Box>
  );
};
export default React.memo(EventChooseTags);
