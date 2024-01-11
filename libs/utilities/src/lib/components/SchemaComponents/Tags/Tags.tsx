import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { nullToArray, nullToObject } from '../../../utils/helperFns';
import { tagInlineCss } from './TagCommonCss';
import TagListing from './TagListing';
import { ShowToastError } from '../../ToastNotification/ToastNotification';

interface TagsProps {
  isEdit?: boolean;
  tagData?: any;
  selectedTag?: any;
  handleTagOnChange?: any;
  isPublishModal?: boolean;
}

export const XTags = (props: TagsProps) => {
  const { t } = useTranslation();
  const {
    tagData = [],
    isEdit = false,
    selectedTag = [],
    handleTagOnChange,
    isPublishModal,
  } = nullToObject(props);

  const [tagArray, setTagArray] = useState<any>([]);

  /**
   * sort letter alphabetically
   * @param users array
   * @returns array
   */
  const nameSort = (users) => {
    if (nullToArray(users).length) {
      return [...users].sort(function (a, b) {
        return a.localeCompare(b);
      });
    }
    return [];
  };

  const updateTagFieldCheck = (e: any, tagsData: any) => {
    const { target: { value = '', checked = false } = {} } = e;
    const { newTag: newTagsArray = [] } = tagsData;
    let countArray: any = [];
    const oldArray: any = [...tagArray];
    oldArray.forEach((ele: any) => {
      const getValue = ele.newTag.filter(
        (eleFilter: any) => eleFilter.isCheck === true
      );
      countArray = [...countArray, ...getValue];
    });

    if (nullToArray(countArray).length > 14 && checked) {
      ShowToastError(t('allowed_tags_toast'));
    } else {
      handleTagOnChange(e);
      //PASS CATEGORY NAME AND FIND INDEX
      const findIndexMainArray = oldArray.findIndex(
        (ele: any) => ele.category === tagsData.category
      );
      //PASS TAG'S NAME AND FIND INDEX
      const findIndexNestedArray = newTagsArray.findIndex(
        (ele: any) => ele.name === value
      );

      const findObj = tagArray[findIndexMainArray].newTag[findIndexNestedArray];
      const newObj = {
        //CHANGE THE ISCHECK STATUS (TOGGLE)
        ...findObj,
        isCheck: !findObj.isCheck,
      };
      //ASSIGN TO OLD ARRAY AND SORT
      oldArray[findIndexMainArray].newTag[findIndexNestedArray] = newObj || {};
      const checkedArray =
        oldArray[findIndexMainArray].newTag
          .filter((ele) => ele.isCheck === true)
          .map((ele: any) => ele.name) || [];
      const unCheckedArray =
        oldArray[findIndexMainArray].newTag
          .filter((ele) => ele.isCheck === false)
          .map((ele: any) => ele.name) || [];

      const concatArray = [
        ...nameSort(checkedArray),
        ...nameSort(unCheckedArray),
      ];
      oldArray[findIndexMainArray].tags = concatArray;
      setTagArray(oldArray);
    }
  };
  useEffect(() => {
    if (nullToArray(tagData).length) {
      if (!isEdit) {
        //create
        const newArr = nullToArray(tagData).map((eleTag: any) => {
          return {
            ...eleTag,
            tags: nullToArray(eleTag.tags).length ? nameSort(eleTag.tags) : [],
            newTag: nullToArray(eleTag.tags).map((ele) => {
              return {
                name: ele,
                isCheck: false,
              };
            }),
          };
        });
        setTagArray(newArr);
      } else {
        //edit

        const newArr = nullToArray(tagData).map((eleTag: any) => {
          const newObj = {
            ...eleTag,
            tags: nullToArray(eleTag.tags).length ? nameSort(eleTag.tags) : [],
            newTag: nullToArray(eleTag.tags).map((ele) => {
              return {
                name: ele,
                isCheck: selectedTag.some(
                  (selectedEle: any) => selectedEle === ele
                )
                  ? true
                  : false,
              };
            }),
          };

          const filterIsChecked: any = nullToArray(newObj.newTag)
            .filter((filter: any) => filter.isCheck === true)
            .map((ele: any) => ele.name);
          const filterIsNotChecked: any = nullToArray(newObj.newTag)
            .filter((filter: any) => filter.isCheck === false)
            .map((ele: any) => ele.name);
          return {
            ...newObj,
            tags: [...filterIsChecked, ...nameSort(filterIsNotChecked)],
          };
        });

        setTagArray(newArr);
      }
    } else {
      setTagArray([]);
    }
  }, [nullToArray(tagData).length]);

  return (
    <Box
      className='noSpace'
      sx={{
        backgroundColor: '#ffffff',
        // padding: isPublishModal
        //   ? '0px'
        //   : {
        //       xs: '15px 14px 13px 14px',
        //       sm: '40px 98px 40px 40px',
        //       md: '40px 98px 0px 40px',
        //     },
        marginBottom: '12px',
      }}
    >
      <style>{tagInlineCss}</style>
      <Box>
        {/* <Grid container rowSpacing={1}>
          <Grid
            item
            xs={12}
            sm={isPublishModal ? 12 : 5}
            md={isPublishModal ? 12 : 5}
            sx={{
              paddingRight: isPublishModal
                ? '0px'
                : {
                    xs: '10px',
                    sm: '10px',
                    md: '55px',
                  },
              paddingBottom: isPublishModal && '20px',
            }}
          >
            <TitleSubTitle
              title={`${t('tags')}*`}
              subTitle={t('choose_your_tags')}
              titleVariant='h6medium'
              subTitleVariant='h7regular'
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={isPublishModal ? 12 : 7}
            md={isPublishModal ? 12 : 7}
          > */}
        <Box className='vod-cat-tag'>
          {tagArray &&
            tagArray.length > 0 &&
            tagArray.map((categories, index) => {
              return (
                <TagListing
                  key={index}
                  categories={categories}
                  updateTagField={updateTagFieldCheck}
                  selectedTags={selectedTag}
                  isPublishModal={isPublishModal}
                />
              );
            })}
        </Box>
        {/* </Grid>
        </Grid> */}
      </Box>
    </Box>
  );
};

React.memo(XTags);
