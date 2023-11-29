import { Box, Grid } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import AutoTextArea from '../../../../components/Common/AutoTextArea';
import TextBox from '../../../../components/Common/TextBox';
import TitleSubTitle from '../../../../components/Common/TitleSubTitle';
import { useCustomStyle } from '../../CreateEvent.styles';
import CommonBoxWithNumber from '../../../../Common/CommonBoxWithNumber/CommonBoxWithNumber';
import { ComponentProp } from './TitleDescription.types';

const EventTitleDescription = ({
  state,
  setState,
  eventWholeRef,
  setSaveButton,
  setPreviewButton,
  unsavedChanges,
  setPublishButton,
}: ComponentProp) => {
  const { t } = useTranslation();

  const removeMatchingElement = (arr: any, element: any) => {
    const index = arr.indexOf(element);
    if (index === -1) {
      return arr;
    }
    const newArray = arr.slice(0, index).concat(arr.slice(index + 1));
    return newArray;
  };

  const checkValuesNotNull = (object: any, array: any) => {
    for (let i = 0; i < array.length; i++) {
      const key = array[i];
      if (!object[key]) {
        return false;
      }
    }
    return true;
  };

  const handlePublishButton = (name: string, value: string) => {
    const fieldsArray = [
      'title',
      'short_title',
      'description',
      'short_description',
    ];
    const filteredArray = removeMatchingElement(fieldsArray, name);
    if (
      value &&
      checkValuesNotNull(state, filteredArray) &&
      state?.imageUrl &&
      state?.tags.length !== 0
    ) {
      setPublishButton((prevValue: boolean) => {
        if (prevValue) {
          return false;
        }
      });
    } else {
      setPublishButton(true);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { name = '', value = '' } = {} } = event;
    switch (name) {
      case 'title':
        handlePublishButton(name, value);
        if (value) {
          setSaveButton((prevValue) => {
            if (prevValue) {
              return false;
            }
          });
          setPreviewButton((prevValue) => {
            if (prevValue) {
              return false;
            }
          });
        } else {
          setPreviewButton(true);
          setSaveButton(true);
        }
        break;
      case 'short_title':
        handlePublishButton(name, value);
        break;
      case 'description':
        handlePublishButton(name, value);
        break;
      case 'short_description':
        handlePublishButton(name, value);
        break;
      default:
        break;
    }
    unsavedChanges.current = true;
  };
  const handleOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const key = event.target.name + 'SocialShare';
    setState({
      ...state,
      [event.target.name]: event.target.value,
      [key]: event.target.value,
    });
    eventWholeRef.current = {
      ...eventWholeRef.current,
      [event.target.name]: event.target.value,
      [key]: event.target.value,
    };
    unsavedChanges.current = true;
  };
  const classes = useCustomStyle();

  return (
    <>
      <Box id='titleDescription' className={classes.mainStyleWrapper}>
        <CommonBoxWithNumber
          number='02'
          title={t('title_head')}
          titleVarient='p3semibold'
          subTitleVarient='p4regular'
          subTitle={t('subhead')}
        >
          <Grid container>
            {/* Title*/}
            <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
              <TitleSubTitle
                title={`${t('title')}*`}
                subTitle={t('event_subtitle')}
                titleVarient='h6medium'
                subTitleVarient='h7regular'
              />
            </Grid>
            <Grid item xs={12} sm={7} md={7} lg={7} className='textFiled'>
              <TextBox
                name='title'
                placeHolder={t('event_title_placeholder')}
                handleChange={handleChange}
                maxCharLength={100}
                state={state.title}
                handleOnBlur={handleOnBlur}
              />
            </Grid>

            {/* Short Title*/}
            <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
              <TitleSubTitle
                title={t('short_title')}
                subTitle={t('event_subshorttitle')}
                titleVarient='h6medium'
                subTitleVarient='h7regular'
              />
            </Grid>
            <Grid item xs={12} sm={7} md={7} lg={7} className='textFiled'>
              <TextBox
                name='short_title'
                placeHolder={t('event_short_title_placeholder')}
                handleChange={handleChange}
                maxCharLength={60}
                state={state.short_title}
                handleOnBlur={handleOnBlur}
              />
            </Grid>

            {/* description*/}
            <Grid item xs={12} sm={5} md={5} className='leftFiled'>
              <TitleSubTitle
                title={`${t('description')}*`}
                subTitle={t('event_subdescription')}
                titleVarient='h6medium'
                subTitleVarient='h7regular'
              />
            </Grid>
            <Grid item xs={12} sm={7} md={7} className='textFiled'>
              <AutoTextArea
                name='description'
                placeHolder={t('event_desciption_placeholder')}
                handleChange={handleChange}
                maxCharLength={1000}
                state={state.description}
                handleOnBlur={handleOnBlur}
              />
            </Grid>

            {/* short  description*/}
            <Grid item xs={12} sm={5} md={5} className='leftFiledLast'>
              <TitleSubTitle
                title={t('short_description')}
                subTitle={t('event_subshort_des')}
                titleVarient='h6medium'
                subTitleVarient='h7regular'
              />
            </Grid>
            <Grid item xs={12} sm={7} md={7} className='textFiledLast'>
              <AutoTextArea
                name='short_description'
                placeHolder={t('short_des_placeholder')}
                handleChange={handleChange}
                maxCharLength={160}
                state={state.short_description}
                handleOnBlur={handleOnBlur}
              />
            </Grid>
          </Grid>
        </CommonBoxWithNumber>
      </Box>
    </>
  );
};

export default React.memo(EventTitleDescription);
