import { useMutation } from '@apollo/client';
import { withStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Box, Button, Grid, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import * as React from 'react';
import { useContext, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Loader from '../../Common/Loader';
import iconMapping from '../../assets/iconMapping';
import {
  showToastError,
  showToastSuccess,
} from '../../components/toastNotification/toastNotificationReactTostify';
import useUserSession from '../../hooks/useUserSession/useUserSession';
import { save_menu, update_menu } from '../../services/navTree/navTree.api';
import { Store } from '../../store/ContextStore';
import ThemeConstants from '../../theme/variable';
import { dateFormat } from '../../utils/helperFunctions';
import ContentGallery from '../ContentGallery/ContentGallery';
import BasicSwitch from '../editPage/Switch';
import { createMenu } from './Actions';
import SelectPageList from './SelectPageList';

import { ContentProps } from './utils/types';
const styles = (theme) => ({
  notchedOutline: {
    borderWidth: '1px',
    borderColor: 'rgb(211,47,47) !important',
  },
});
function CreateMenuPage({
  openCreateMenu,
  handleOpenCreateMenu,
  isPageFinal,
  setPageListOpen,
  editData,
  setIsCreate,
  editDone,
  setEditDone,
  setEditData,
  setisedit,
  isedit,
  isConfirm,
  setisConfirm,
  classes,
}) {
  const { t } = useTranslation();
  const minCss = `
  .singlebr {
   display: -webkit-box;
   -webkit-box-orient: vertical;
   -webkit-line-clamp: 1;
   overflow: hidden;
  }`;
  const steps = [t('create'), t('add'), t('confirm')];
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [alignment, setAlignment] = React.useState('Page');
  const [radioSelected, setRadioSelected] = useState('Main Menu');
  const [radioSelectedLink, setRadioSelectedLink] = useState(t('current_tab'));
  const { state, dispatch } = useContext(Store);
  const [leftSideBarContent, setLeftSideContent] = useState(
    state.navTree?.navTreeArray
  );
  const [menuItemName, setMenuItemName] = useState('');
  const [menuDescription, setMenuDescription] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(iconMapping[0].url);
  const [linkMenuItemName, setLinkMenuItemName] = useState('');
  const [isContinueLink, setIsContinueLink] = useState(false);
  const [hover, setHover] = useState(false);
  const [menu, setMenu] = React.useState('No Menu Item Selected');
  const [menuName, setMenuName] = React.useState('');
  const [linkFinalPage, setLinkFinalPage] = React.useState(false);
  const [PageFinalPage, setPageFinalPage] = React.useState(isPageFinal);
  const [isPageList, setIsPageList] = useState(false);
  const [pageName1, setPageName1] = useState('');
  const [url, setUrl] = useState('');
  const [isHomePage, setIsHomePage] = useState(false);
  const [updatemutate] = useMutation(update_menu);
  const [isPageListCall, setIsPageListCall] = useState(false);
  const [savedmutate] = useMutation(save_menu);
  const [getSession] = useUserSession();
  const { userInfo } = getSession();
  const [currentButton, setCurrentButton] = React.useState(null);
  const [isDisableDone, setisIsDisableDone] = useState(true);
  let count = 0;
  const [disableHome, setdisableHome] = useState(false);
  const [checkIsHome, setCheckIsHome] = useState(false);
  const mainMenuLength = useRef(0);
  const [isLoading, setIsLoading] = useState(false);
  const username = `${userInfo.first_name} ${userInfo.last_name}`;
  const [galleryState, setGalleryState] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<ContentProps>({
    Title: '',
    Description: '',
    Image: '',
    RedirectionUrl: '',
    Internal: false,
    ContentType: '',
    CreatedDate: '',
    Author: '',
  });

  const createMenuItem = () => {
    const parentId = radioSelected === 'Main Menu' ? '0' : menu;
    dispatch(
      createMenu(
        menuItemName,
        parentId,
        username,
        isHomePage,
        menuDescription,
        selectedIcon,
        selectedItem
      )
    );
  };

  const onClickIcon = (icon) => {
    setSelectedIcon(icon);
  };

  const onUploadClick = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
    setGalleryState(true);
  };

  const handleHomePage = (event) => {
    leftSideBarContent.map((val) => {
      if (val.HomePage === true) {
        count++;
      }
    });
    setIsHomePage(event.target.checked);
    // if (count == 0) {
    //   setdisableHome(false);
    //   setIsHomePage(event.target.checked);
    // } else if (isedit === false) {
    //   setdisableHome(true);
    //   setIsHomePage(false);
    //   showToastError(t('menu_home_error_toast'));
    // } else if (editData && editData?.HomePage) {
    //   setIsHomePage(event.target.checked);
    // } else {
    //   setdisableHome(true);
    //   setIsHomePage(false);
    //   showToastError(t('menu_home_error_toast'));
    // }
  };
  React.useEffect(() => {
    if (editData?.Internal) {
      setCurrentButton(editData?.URL);
      setisIsDisableDone(false);
    } else {
      setisIsDisableDone(true);
      setCurrentButton(null);
    }
  }, [editData]);

  const onHover = () => {
    setHover(true);
  };
  const onLeave = () => {
    setHover(false);
  };

  const copyText = () => {
    navigator.clipboard.writeText(linkMenuItemName);
  };
  const handleChangeMenu = (event) => {
    setMenu(event.target.value);
    leftSideBarContent.map((val) => {
      if (val.Menu_Id === event.target.value) {
        setMenuName(val.Label);
      }
    });
  };
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };
  const getHighestScore = () => {
    const temp =
      (leftSideBarContent?.length !== 0 &&
        leftSideBarContent.map((val) => {
          return Number(val.Score);
        })) ||
      [];
    const max =
      (temp?.length !== 0 &&
        temp.reduce((acc, val) => {
          return acc > val ? acc : val;
        })) ||
      0;
    return max;
  };
  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (alignment == 'Link' || alignment == 'Page') {
      setIsContinueLink(true);
    }
    if (alignment == 'Link' && activeStep == 1) {
      setLinkFinalPage(true);
      setIsContinueLink(false);
    }
    if (alignment == 'Link' && activeStep == 2) {
      setLinkFinalPage(false);
      handleOpenCreateMenu(true);
    }
    if (alignment == 'Page' && activeStep == 0) {
      setIsPageList(true);
      setPageListOpen(true);
      setIsPageListCall(!isPageListCall);
    }
    if (alignment == 'Page' && activeStep == 2) {
      console.log('13');

      handleOpenCreateMenu(true);
    }
    if (editData) {
      setIsCreate(false);
    }
  };

  React.useEffect(() => {
    if (isedit) {
      setMenuItemName(editData?.Label);
      setMenuDescription(editData?.Description);
      setSelectedIcon(editData?.menuicon);
      setSelectedItem({ ...editData?.content_type_value });
      setIsHomePage(editData?.HomePage);
      if (editData?.Internal) {
        setAlignment('Page');
        setLinkMenuItemName('');
      } else {
        setAlignment('Link');
        setLinkMenuItemName(editData?.URL);
      }
      if (editData?.ParentId == '0') {
        setRadioSelected('Main Menu');
        setMenu('No Menu Item Selected');
      } else {
        setRadioSelected('Sub Menu');
      }
      for (let i = 0; i < leftSideBarContent.length; i++) {
        if (leftSideBarContent[i].Menu_Id === editData.ParentId) {
          setMenuName(leftSideBarContent[i].Label);
          setMenu(leftSideBarContent[i].Menu_Id);
        }
      }
      setUrl(editData?.URL);
      if (editData?.isCurrentTab) {
        setRadioSelectedLink(t('current_tab'));
      } else {
        setRadioSelectedLink(t('new_tab'));
      }
    }
  }, [editData]);

  const onEdit = () => {
    const menuval = menu === 'No Menu Item Selected' ? '' : menu;
    const parentId = radioSelected === 'Main Menu' ? '0' : menuval;
    const currentTab =
      alignment === 'Page'
        ? true
        : radioSelectedLink === t('current_tab')
          ? true
          : false;
    const menuToSend = {
      Tagging: 'Navigation',
      Description: menuDescription,
      ParentId: parentId ? parentId : editData?.ParentId,
      Label: menuItemName,
      Internal: alignment === 'Page' ? true : false,
      Score: editData?.Score,
      IsHidden: false,
      HomePage: isHomePage,
      URL: alignment === 'Page' ? url : linkMenuItemName,
      isCurrentTab: currentTab,
      menuicon: selectedIcon,
      content_type_value: { ...selectedItem },
      Status: 'DRAFT',
      Menu_Id: editData?.Menu_Id,
    };
    const tempArr: any = JSON.parse(JSON.stringify(leftSideBarContent));
    isHomePage &&
      tempArr.forEach((value, i) => {
        if (value.HomePage === true) {
          tempArr[i].HomePage = false;
        }
      });
    const isItemExist = tempArr.find((val) => {
      return val
        ? val.Label.toLowerCase() === menuItemName.toLowerCase() &&
        val.Menu_Id !== editData.Menu_Id
        : '';
    });
    if (isItemExist) {
      showToastError(t('menu_exist'));
    } else {
      tempArr.forEach((value, i) => {
        if (value.Menu_Id === editData?.Menu_Id) {
          tempArr[i] = menuToSend;
        }
      });
      const menuToCreate = {
        lastModifiedBy: username,
        createdBy: username,
        menu_content: tempArr,
        // menu_state: 'draft',
      };
      setIsLoading(true);

      updatemutate({
        variables: {
          input: menuToCreate,
        },
      })
        .then((resp) => {
          setIsLoading(false);
          handleNext();
          setIsCreate(true);
          setEditDone(!editDone);
          setIsCreate(true);
          setEditData({});
          setisedit(false);
          showToastSuccess(t('menu_success_toast'));
        })
        .catch((error) => {
          setIsLoading(false);
          if (error.graphQLErrors[0]) {
            showToastError(error.graphQLErrors[0].message);
          } else {
            showToastError(t('api_error_toast'));
          }
        });
    }
  };

  const onSave = () => {
    const menuval = menu === 'No Menu Item Selected' ? '' : menu;
    const parentId = radioSelected === 'Main Menu' ? '0' : menuval;
    const currentTab =
      alignment === 'Page'
        ? true
        : radioSelectedLink === t('current_tab')
          ? true
          : false;

    const menuToSend = {
      ParentId: parentId,
      URL: alignment === 'Page' ? url : linkMenuItemName,
      Tagging: 'Navigation',
      Description: menuDescription,
      Label: menuItemName,
      Score: getHighestScore() + 1,
      Internal: alignment === 'Page' ? true : false,
      IsHidden: false,
      isCurrentTab: currentTab,
      HomePage: isHomePage,
      menuicon: selectedIcon,
      content_type_value: { ...selectedItem },
      Status: 'DRAFT',
    };
    const tempArr: any = JSON.parse(JSON.stringify(leftSideBarContent));
    isHomePage &&
      tempArr.forEach((value, i) => {
        if (value.HomePage === true) {
          tempArr[i].HomePage = false;
        }
      });
    const isItemExist = tempArr.find((val) => {
      return val ? val.Label.toLowerCase() === menuItemName.toLowerCase() : '';
    });
    if (isItemExist) {
      showToastError(t('menu_exist'));
    } else {
      tempArr.push(menuToSend);
      const menuToCreate = {
        lastModifiedBy: username,
        createdBy: username,
        menu_content: tempArr,
        // menu_state: 'draft',
      };
      setIsLoading(true);
      savedmutate({
        variables: {
          input: menuToCreate,
        },
      })
        .then((resp) => {
          createMenuItem();
          setisConfirm(!isConfirm);
          handleNext();
          setIsCreate(true);
          setIsLoading(false);
          if (
            resp.data.authoring_createOrUpdateNavigation.message === 'Success'
          ) {
            showToastSuccess(t('menu_toast_added'));
          } else {
            showToastSuccess(t('api_error_toast'));
          }
        })
        .catch((error) => {
          setIsLoading(false);
          if (error.graphQLErrors[0]) {
            showToastError(error.graphQLErrors[0].message);
          } else {
            showToastError(t('api_error_toast'));
          }
        });
    }
  };

  const onConfirm = () => {
    if (radioSelected === 'Main Menu') {
      for (let i = 0; i < leftSideBarContent.length; i++) {
        if (leftSideBarContent[i].ParentId === '0') {
          mainMenuLength.current++;
        }
      }
    } else {
      for (let i = 0; i < leftSideBarContent.length; i++) {
        if (leftSideBarContent[i].ParentId === menu) {
          mainMenuLength.current++;
        }
      }
    }
    if (activeStep === 2 && isedit == false) {
      if (mainMenuLength.current < 10) {
        onSave();
      } else {
        showToastError(t('menu_length_toast'));
        mainMenuLength.current = 0;
        handleNext();
        setIsCreate(true);
      }
      // handleNext();
      // setIsCreate(true);
    } else if (activeStep === 2 && isedit) {
      onEdit();
      // handleNext();
      // setIsCreate(true);
    } else {
      handleNext();
    }
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    if (activeStep == 0) {
      handleOpenCreateMenu(true);
    } else if (alignment === 'Link' && activeStep == 1) {
      setIsContinueLink(false);
    } else if (alignment === 'Link' && activeStep == 2) {
      setIsContinueLink(true);
      setLinkFinalPage(false);
    } else if (alignment === 'Page' && activeStep == 2) {
      setPageFinalPage(false);
      setIsPageList(true);
      setPageListOpen(true);
    }
  };
  const disableHomeHandle = (val) => {
    if (val === 'Sub Menu') {
      setCheckIsHome(true);
      setIsHomePage(false);
    } else {
      setCheckIsHome(false);
    }
  };
  const handleMenuChange = (evnt) => {
    setRadioSelected(evnt.target.value);
    setMenu('No Menu Item Selected');
    disableHomeHandle(evnt.target.value);
  };
  const handleMenuItemName = (evnt) => {
    setMenuItemName(evnt.target.value);
  };
  const handleMenuDescription = (evnt) => {
    setMenuDescription(evnt.target.value);
  };
  const handleLinkTabChange = (evnt) => {
    setRadioSelectedLink(evnt.target.value);
  };
  const handleLinkMenuItemName = (evnt) => {
    setLinkMenuItemName(evnt.target.value);
  };
  const checkUrl = (event) => {
    const res = event.target.value.match(
      /(https?:\/\/|www)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
    );
    if (res == null && event.target.value) {
      setLinkMenuItemName('');
      showToastError(t('invalid_url_toast'));
    } else setLinkMenuItemName(event.target.value);
  };
  const checkContinue = () => {
    return menuItemName
      ? radioSelected === 'Sub Menu'
        ? menu !== 'No Menu Item Selected'
          ? false
          : true
        : false
      : true;
  };

  const handleSelectedContent = async (item) => {
    if (item.ContentType === 'Article' || item.ContentType === 'VOD') {
      setSelectedItem({
        Title: item.Title,
        Description: item.Description,
        Image: item.Banner,
        RedirectionUrl: item.CurrentPageURL,
        Internal: true,
        ContentType: item.ContentType,
        CreatedDate: item.PublishedDate,
        Author: item.Author,
      });
    }
    setGalleryState(false);
  };
  const onToggleContentGallery = () => {
    setGalleryState(false);
  };
  const [itemExist, setItemExist] = useState(false);
  const isMenuExist = () => {
    const tempArr: any = JSON.parse(JSON.stringify(leftSideBarContent));
    const isItemExist = tempArr.find((val) => {
      return val ? val.Label.toLowerCase() === menuItemName.toLowerCase() : '';
    });
    if (isItemExist) {
      // showToastError(t('menu_exist'));
      setItemExist(true);
    } else {
      setItemExist(false);
    }
  };
  return (
    <>
      {isLoading && <Loader />}
      <style>{minCss}</style>
      {galleryState && (
        <ContentGallery
          handleSelectedContent={handleSelectedContent}
          onToggleContentGallery={onToggleContentGallery}
          contentType={['Article']}
        />
      )}
      {!isPageList && (
        <Box
          sx={{
            width: { sm: '77%', xs: '100%', md: '77%', lg: '81%' },
            display: { xs: 'none', sm: 'block' },
          }}
        >
          <Box
            sx={{
              width: '100%',
              backgroundColor: '#fff',
              display: 'flex',
              alignItems: 'center',
              padding: '15px',
            }}
          >
            <ArrowBackIosIcon
              onClick={handleBack}
              sx={{ width: '20px', height: '20px', cursor: 'pointer' }}
            />
            {activeStep === 0 ? (
              <Typography variant='h4medium' sx={{ color: '#2d2d38' }}>
                {t('menu_create_button')}
              </Typography>
            ) : (
              <Typography variant='h4medium' sx={{ color: '#2d2d38' }}>
                {t('menu_item_details')}
              </Typography>
            )}
            <Box
              sx={{
                width: '397px',
                height: '32px',
                position: 'absolute',
                right: 2,
              }}
            >
              <Stepper
                activeStep={activeStep}
                sx={{
                  padding: 0.5,
                  '& .MuiStepIcon-active': { color: '#2d2d39' },
                  '& .MuiStepIcon-completed': { color: '#2d2d39' },
                  '& .Mui-disabled .css-1cgu0y9-MuiSvgIcon-root-MuiStepIcon-root':
                    { color: '#ced3d9' },
                  '& .Mui-disabled .css-s07em9-MuiStepIcon-text': {
                    fill: '#89909a',
                  },
                }}
              >
                {steps.map((label, index) => {
                  const stepProps: { completed?: boolean } = {};
                  const labelProps: {
                    optional?: React.ReactNode;
                  } = {};
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
            </Box>
          </Box>
          <Box sx={{ overflowX: 'hidden' }}>
            {activeStep == 0 && (
              <Box
                sx={{
                  backgroundColor: '#fff',
                  minHeight: 'calc(100vh - 194px)',
                  maxHeight: 'calc(100vh - 194px)',
                  overflowY: 'auto',
                  margin: '0',
                  padding: '15px',
                  position: 'relative',
                }}
              >
                <ToggleButtonGroup
                  value={alignment}
                  exclusive
                  onChange={handleChange}
                  sx={{
                    margin: '10px 0px 30px 0px',
                    backgroundColor: '#f5f6f8',
                    borderRadius: '21px',
                  }}
                >
                  <ToggleButton
                    value='Page'
                    sx={{
                      '&.Mui-selected, &.Mui-selected:hover': {
                        color: '#fff',
                        backgroundColor: '#2d2d39',
                        borderRadius: '21px',
                      },
                      textTransform: 'capitalize',
                      borderRadius: '21px 0 0 21px',
                      width: '100px',
                      height: '37px',
                      border: 'none',
                      backgroundColor: '#f5f6f8',
                      fontSize: ThemeConstants.FONTSIZE_SM,
                      borderRight: 'none',
                      ':hover': {
                        backgroundColor: '#f5f6f8',
                      },
                    }}
                  >
                    {t('page')}
                  </ToggleButton>
                  <ToggleButton
                    value='Link'
                    sx={{
                      '&.Mui-selected, &.Mui-selected:hover': {
                        color: '#fff',
                        backgroundColor: '#2d2d39',
                        borderRadius: '21px',
                      },
                      ':hover': {
                        backgroundColor: '#f5f6f8',
                      },
                      textTransform: 'capitalize',
                      borderRadius: '0 21px 21px 0',
                      width: '100px',
                      height: '37px',
                      backgroundColor: '#f5f6f8',
                      fontSize: ThemeConstants.FONTSIZE_SM,
                      borderLeft: 'none',
                      border: 'none',
                    }}
                  >
                    {t('link')}
                  </ToggleButton>
                </ToggleButtonGroup>
                <Box>
                  <Grid container sx={{ mb: 5 }}>
                    <Grid sx={{ px: 1 }} xs={12} md={5} lg={4}>
                      <Typography
                        component='div'
                        variant='h6medium'
                        sx={{ color: '#2d2d37', textTransform: 'capitalize' }}
                      >
                        {' '}
                        {t('menu_name')}
                      </Typography>
                      <Typography
                        component='div'
                        variant='h7regular'
                        sx={{ color: '#89909a' }}
                      >
                        {' '}
                        {t('menu_subname')}
                      </Typography>
                    </Grid>
                    <Grid
                      sx={{ px: 1, display: 'flex', flexDirection: 'column' }}
                      xs={12}
                      md={7}
                      lg={8}
                    >
                      <TextField
                        variant='outlined'
                        size='small'
                        placeholder={t('menu_name_placeholder')}
                        value={menuItemName}
                        onChange={handleMenuItemName}
                        onBlur={isMenuExist}
                        inputProps={{ maxLength: 15 }}
                        sx={{
                          maxWidth: { md: '500px', sm: '260px' },
                          // borderColor: 'rgb(211,47,47) !important',
                        }}
                        error={itemExist}
                      // InputProps={{
                      //   classes: {
                      //     notchedOutline: itemExist
                      //       ? classes.notchedOutline
                      //       : null,
                      //   },
                      // }}
                      ></TextField>
                      {itemExist ? (
                        <Typography
                          variant='h7regular'
                          sx={{
                            color: 'rgb(211,47,47)',
                            marginTop: '10px',
                            fontSize: { md: '14px', sm: '12px' },
                            marginLeft: '14px',
                          }}
                        >
                          {t('menu_exist')}
                        </Typography>
                      ) : null}
                    </Grid>
                  </Grid>
                  <Grid container sx={{ mb: 5 }}>
                    <Grid sx={{ px: 1 }} xs={12} md={5} lg={4}>
                      <Typography
                        component='div'
                        variant='h6medium'
                        sx={{ color: '#2d2d37', textTransform: 'capitalize' }}
                      >
                        {' '}
                        {t('menu_description')}
                      </Typography>
                      <Typography
                        component='div'
                        variant='h7regular'
                        sx={{ color: '#89909a' }}
                      >
                        {t('menu_subdes')}
                      </Typography>
                    </Grid>
                    <Grid sx={{ px: 1 }} xs={12} md={7} lg={8}>
                      <TextField
                        multiline
                        rows={3}
                        placeholder={t('menu_des_placeholder')}
                        value={menuDescription}
                        onChange={handleMenuDescription}
                        inputProps={{ maxLength: 40 }}
                        sx={{
                          maxWidth: { md: '500px', sm: '260px' },
                        }}
                      ></TextField>
                    </Grid>
                  </Grid>
                  <Grid container sx={{ mb: 5 }}>
                    <Grid sx={{ px: 1 }} xs={12} md={5} lg={4}>
                      <Typography
                        variant='h6medium'
                        sx={{ color: '#2d2d37', textTransform: 'capitalize' }}
                      >
                        {t('menu_add_icon')}
                      </Typography>
                    </Grid>
                    <Grid sx={{ px: 1 }} xs={12} md={7} lg={8}>
                      {iconMapping.map((icon, index) => {
                        return (
                          <img
                            key={index}
                            src={icon.url}
                            onClick={() => onClickIcon(icon.url)}
                            style={{
                              width: '26px',
                              height: '26px',
                              objectFit: 'cover',
                              cursor: 'pointer',
                              padding: '5px',
                              marginRight: '3px',
                              border:
                                selectedIcon == icon.url
                                  ? 'solid 1px #ced3d9'
                                  : 'none',
                              backgroundColor:
                                selectedIcon == icon.url ? '#f5f6f8' : '#fff',
                              borderRadius: '5px',
                            }}
                          />
                        );
                      })}
                    </Grid>
                  </Grid>
                  {alignment == 'Page' && (
                    <Grid container sx={{ mb: 5 }}>
                      <Grid sx={{ px: 1 }} xs={12} md={5} lg={4}>
                        <Typography
                          variant='h6medium'
                          sx={{
                            color: '#2d2d37',
                            textTransform: 'capitalize',
                          }}
                        >
                          {t('menu_set')}
                        </Typography>
                      </Grid>
                      <Grid sx={{ px: 1 }} xs={12} md={7} lg={8}>
                        <Box sx={{ display: 'flex', alignSelf: 'center' }}>
                          <BasicSwitch
                            onChange={(e: any) => handleHomePage(e)}
                            checked={isHomePage}
                            disabled={checkIsHome}
                            color={ThemeConstants.BLACK_COLOR}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  )}
                  <Grid container sx={{ mb: 5 }}>
                    <Grid sx={{ px: 1 }} xs={12} md={5} lg={4}>
                      <Typography
                        variant='h6medium'
                        sx={{
                          color: '#2d2d37',
                          textTransform: 'capitalize',
                        }}
                      >
                        {t('make_menu_as')}
                      </Typography>
                    </Grid>
                    <Grid sx={{ px: 1 }} xs={12} md={7} lg={8}>
                      <RadioGroup
                        name='page-radio-buttons-group'
                        value={radioSelected}
                        onChange={handleMenuChange}
                        row
                      >
                        <FormControlLabel
                          sx={{
                            '.Platform-x-FormControlLabel-label': {
                              fontSize: ThemeConstants.FONTSIZE_SM,
                            },
                            marginRight: '40px',
                          }}
                          value='Main Menu'
                          control={<Radio />}
                          label={t('main_menu')}
                        />
                        <FormControlLabel
                          sx={{
                            '.Platform-x-FormControlLabel-label': {
                              fontSize: ThemeConstants.FONTSIZE_SM,
                            },
                            marginRight: '40px',
                          }}
                          value='Sub Menu'
                          control={<Radio />}
                          label={t('sub_menu')}
                        />
                      </RadioGroup>
                    </Grid>
                  </Grid>
                  <Grid container sx={{ mb: 5 }}>
                    <Grid sx={{ px: 1 }} xs={12} md={5} lg={4}></Grid>
                    <Grid sx={{ px: 1 }} xs={12} md={7} lg={8}>
                      <Typography
                        variant='h6regular'
                        sx={{
                          height: '20px',
                          color:
                            radioSelected == 'Main Menu'
                              ? '#ced3d9'
                              : '#2d2d39',
                        }}
                      >
                        {t('menu_drop_title')}
                      </Typography>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                          <Select
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            disabled={
                              radioSelected == 'Main Menu' ? true : false
                            }
                            size='small'
                            sx={{
                              maxWidth: { md: '500px', sm: '260px' },
                              height: '48px',
                              mt: '5px',
                              mb: alignment === 'Page' ? '20px' : '30px',
                              fontSize: ThemeConstants.FONTSIZE_SM,
                              color:
                                menu === 'No Menu Item Selected'
                                  ? '#ced3d9'
                                  : '#2d2d39',
                            }}
                            value={menu}
                            onChange={handleChangeMenu}
                            IconComponent={ExpandMoreIcon}
                          // IconComponent={() => (
                          //   <ExpandMoreIcon
                          //   sx={{ mr: '10px', color: '#ced3d9' }}
                          //   />
                          // )}
                          >
                            <MenuItem value='No Menu Item Selected' disabled>
                              {t('menu_drop_placeholder')}
                            </MenuItem>
                            {leftSideBarContent.map(
                              (val, i) =>
                                val.ParentId === '0' && (
                                  <MenuItem value={val.Menu_Id} key={i}>
                                    {val.Label}
                                  </MenuItem>
                                )
                            )}
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container sx={{ mb: 5 }}>
                    <Grid sx={{ px: 1 }} xs={12} md={5} lg={4}>
                      <Typography
                        variant='h6medium'
                        sx={{ textTransform: 'capitalize' }}
                      >
                        {' '}
                        {t('menu_content')}
                      </Typography>
                    </Grid>
                    <Grid sx={{ px: 1 }} xs={12} md={7} lg={8}>
                      {selectedItem.Title !== '' ? (
                        <Box
                          sx={{
                            cursor: 'pointer',
                            height: '227px',
                            width: { md: '356px', sm: '260px' },
                            position: 'relative',
                          }}
                          onClick={() => onUploadClick()}
                        >
                          <img
                            src={selectedItem.Image}
                            width='100%'
                            height='100%'
                            style={{ borderRadius: '5px', objectFit: 'cover' }}
                          />
                          <div
                            style={{
                              position: 'absolute',
                              width: '100%',
                              height: '100%',
                              background:
                                'linear-gradient(180deg, rgba(0,0,0,0.0001) 0%, #000000 100%)',
                              mixBlendMode: 'normal',
                              opacity: '0.5',
                              top: 0,
                              borderRadius: '5px',
                            }}
                          >
                            <RestartAltIcon
                              style={{
                                width: '35px',
                                height: '40px',
                                color: '#fff',
                                position: 'relative',
                                left: '45%',
                                top: '30%',
                              }}
                            />
                          </div>
                          <Box
                            sx={{
                              position: 'relative',
                              marginTop: '-85px',
                              marginLeft: '21px',
                            }}
                          >
                            <Typography
                              variant='h5medium'
                              component='div'
                              sx={{ color: '#fff', marginBottom: '5px' }}
                              className='singlebr'
                            >
                              {selectedItem.Title}
                            </Typography>
                            <Typography
                              variant='h7medium'
                              component='div'
                              sx={{ color: '#ced3d9' }}
                            >
                              {selectedItem.Author}
                            </Typography>
                            <Typography
                              variant='h7medium'
                              component='div'
                              sx={{ color: '#ced3d9' }}
                            >
                              {' '}
                              {selectedItem?.CreatedDate
                                ? dateFormat(selectedItem?.CreatedDate)
                                : ''}
                            </Typography>
                          </Box>
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            borderRadius: '5px',
                            border: 'dashed 2px #707070',
                            cursor: 'pointer',
                            height: '227px',
                            backgroundColor: '#f5f6f8',
                            display: 'flex',
                            alignItems: 'center',
                            width: { md: '356px', sm: '260px' },
                          }}
                          onClick={() => onUploadClick()}
                        >
                          <Box
                            sx={{
                              marginLeft: '45px',
                              borderRadius: '50%',
                              backgroundColor: '#000',
                              width: '40px',
                              height: '40px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                            mr={2}
                          >
                            <ArrowUpwardIcon style={{ color: '#fff' }} />
                          </Box>
                          <Box
                            sx={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              color: ThemeConstants.PRIMARY_MAIN_COLOR,
                            }}
                          >
                            <Typography
                              variant='h5medium'
                              component='h5'
                              sx={{ color: '#000000' }}
                            >
                              {t('menu_content_placeholder')}
                            </Typography>
                          </Box>
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            )}
            {alignment == 'Link' && activeStep == 1 && (
              <Box
                sx={{
                  backgroundColor: '#fff',
                  minHeight: 'calc(100vh - 194px)',
                  maxHeight: 'calc(100vh - 194px)',
                  overflowY: 'auto',
                  margin: '0',
                  padding: '15px',
                }}
              >
                <Grid container sx={{ mb: 5 }}>
                  <Grid sx={{ px: 1 }} xs={12} md={5} lg={4}>
                    <Typography component='div' variant='h6medium'>
                      {' '}
                      {t('insert_url')}{' '}
                    </Typography>
                    <Typography
                      component='div'
                      variant='h7regular'
                      sx={{ color: '#89909a' }}
                    >
                      {' '}
                      {t('menu_subname')}
                    </Typography>
                  </Grid>
                  <Grid sx={{ px: 1 }} xs={12} md={7} lg={8}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TextField
                        size='small'
                        type='url'
                        placeholder='http://www.google.com'
                        value={linkMenuItemName}
                        onChange={handleLinkMenuItemName}
                        onBlur={checkUrl}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <CancelOutlinedIcon
                                onClick={() => setLinkMenuItemName('')}
                                sx={{
                                  cursor: 'pointer',
                                  width: '16px',
                                  height: '16px',
                                }}
                              />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          maxWidth: '450px',
                          fontSize: ThemeConstants.FONTSIZE_XXS,
                          '.Platform-x-InputBase-root': {
                            height: '50px',
                            fontSize: ThemeConstants.FONTSIZE_XS,
                            color: '#6d6dff',
                          },
                          '.css-19qh8xo-MuiInputBase-input-MuiOutlinedInput-input':
                          {
                            color: '#6d6dff',
                          },
                          mt: '5px',
                        }}
                      ></TextField>
                      <ContentCopyIcon
                        onClick={copyText}
                        onMouseEnter={onHover}
                        onMouseLeave={onLeave}
                        sx={{
                          cursor: 'pointer',
                          width: '20.7px',
                          height: '23.9px',
                          margin: 1,
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Grid container sx={{ mb: 5 }}>
                  <Grid sx={{ px: 1 }} xs={12} md={5} lg={4}>
                    <Typography variant='h6medium'>
                      {t('select_tab')}
                    </Typography>
                  </Grid>
                  <Grid sx={{ px: 1 }} xs={12} md={7} lg={8}>
                    <RadioGroup
                      name='page-radio-buttons-group'
                      value={radioSelectedLink}
                      onChange={handleLinkTabChange}
                      row
                    >
                      <FormControlLabel
                        sx={{
                          '.Platform-x-FormControlLabel-label': {
                            fontSize: ThemeConstants.FONTSIZE_SM,
                          },
                        }}
                        value={t('current_tab')}
                        control={<Radio />}
                        label={t('current_tab')}
                      />
                      <FormControlLabel
                        sx={{
                          '.Platform-x-FormControlLabel-label': {
                            fontSize: ThemeConstants.FONTSIZE_SM,
                          },
                        }}
                        value={t('new_tab')}
                        control={<Radio />}
                        label={t('new_tab')}
                      />
                    </RadioGroup>
                  </Grid>
                </Grid>
              </Box>
            )}
            {alignment == 'Link' && linkFinalPage && (
              <Box
                sx={{
                  backgroundColor: '#fff',
                  minHeight: 'calc(100vh - 194px)',
                  maxHeight: 'calc(100vh - 194px)',
                  overflowY: 'auto',
                  margin: '0',
                  padding: '15px',
                  position: 'relative',
                }}
              >
                <Grid container sx={{ mb: 5, alignItems: 'center' }}>
                  <Grid sx={{ px: 1 }} xs={12} md={5} lg={4}>
                    <Typography variant='h6medium'>
                      {' '}
                      {t('insert_url')}{' '}
                    </Typography>
                  </Grid>
                  <Grid sx={{ px: 1 }} xs={12} md={7} lg={8}>
                    <Typography variant='h6bold' sx={{ color: '#6d6dff' }}>
                      {linkMenuItemName}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container sx={{ mb: 5, alignItems: 'center' }}>
                  <Grid sx={{ px: 1 }} xs={12} md={5} lg={4}>
                    <Typography variant='h6medium'>
                      {' '}
                      {t('menu_item_name')}
                    </Typography>
                  </Grid>
                  <Grid sx={{ px: 1 }} xs={12} md={7} lg={8}>
                    <Typography variant='h6bold'>{menuItemName}</Typography>
                  </Grid>
                </Grid>
                {menuDescription && (
                  <Grid container sx={{ mb: 5, alignItems: 'center' }}>
                    <Grid sx={{ px: 1 }} xs={12} md={5} lg={4}>
                      <Typography variant='h6medium'>
                        {' '}
                        {t('menu_description')}{' '}
                      </Typography>
                    </Grid>
                    <Grid sx={{ px: 1 }} xs={12} md={7} lg={8}>
                      <Typography variant='h6bold'>
                        {menuDescription}
                      </Typography>
                    </Grid>
                  </Grid>
                )}
                {selectedIcon && (
                  <Grid container sx={{ mb: 5, alignItems: 'center' }}>
                    <Grid sx={{ px: 1 }} xs={12} md={5} lg={4}>
                      <Typography variant='h6medium'>
                        {t('menu_added_icon')}
                      </Typography>
                    </Grid>
                    <Grid sx={{ px: 1 }} xs={12} md={7} lg={8}>
                      <img
                        src={selectedIcon}
                        style={{
                          width: '44px',
                          height: '40px',
                          objectFit: 'cover',
                          padding: '10px',
                          border: 'solid 1px #ced3d9',
                          backgroundColor: '#f5f6f8',
                          borderRadius: '5px',
                        }}
                      />
                    </Grid>
                  </Grid>
                )}
                <Grid container sx={{ mb: 5, alignItems: 'center' }}>
                  <Grid sx={{ px: 1 }} xs={12} md={5} lg={4}>
                    <Typography variant='h6medium'>
                      {' '}
                      {t('menu_item_type')}
                    </Typography>
                  </Grid>
                  <Grid sx={{ px: 1 }} xs={12} md={7} lg={8}>
                    <Typography variant='h6bold'>{radioSelected}</Typography>
                  </Grid>
                </Grid>
                <Grid container sx={{ mb: 5, alignItems: 'center' }}>
                  <Grid sx={{ px: 1 }} xs={12} md={5} lg={4}>
                    <Typography variant='h6medium'>
                      {' '}
                      {t('menu_item_selected')}
                    </Typography>
                  </Grid>
                  <Grid sx={{ px: 1 }} xs={12} md={7} lg={8}>
                    <Typography variant='h6bold'>
                      {menu && menu !== 'No Menu Item Selected'
                        ? menuName
                        : t('no_menu_selected')}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container sx={{ mb: 5, alignItems: 'center' }}>
                  <Grid sx={{ px: 1 }} xs={12} md={5} lg={4}>
                    <Typography variant='h6medium'>
                      {t('selected_tab')}
                    </Typography>
                  </Grid>
                  <Grid sx={{ px: 1 }} xs={12} md={7} lg={8}>
                    <Typography variant='h6bold'>
                      {radioSelectedLink}
                    </Typography>
                  </Grid>
                </Grid>
                {selectedItem.Title !== '' && (
                  <Grid container>
                    <Grid sx={{ px: 1 }} xs={12} md={5} lg={4}>
                      <Typography variant='h6medium'>
                        {' '}
                        Added content type
                      </Typography>
                    </Grid>
                    <Grid sx={{ px: 1 }} xs={12} md={7} lg={8}>
                      <Box
                        sx={{
                          height: '227px',
                          width: { md: '356px', sm: '260px' },
                          position: 'relative',
                          borderRadius: '5px',
                        }}
                      >
                        <img
                          src={selectedItem.Image}
                          width='100%'
                          height='100%'
                          style={{ borderRadius: '5px' }}
                        />
                        <div
                          style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            background:
                              'linear-gradient(180deg, rgba(0,0,0,0.0001) 0%, #000000 100%)',
                            mixBlendMode: 'normal',
                            opacity: '0.5',
                            top: 0,
                            borderRadius: '5px',
                          }}
                        ></div>
                        <Box
                          sx={{
                            position: 'relative',
                            marginTop: '-85px',
                            marginLeft: '21px',
                          }}
                        >
                          <Typography
                            variant='h5medium'
                            component='div'
                            sx={{ color: '#fff', marginBottom: '5px' }}
                            className='singlebr'
                          >
                            {selectedItem.Title}
                          </Typography>
                          <Typography
                            variant='h7medium'
                            component='div'
                            sx={{ color: '#ced3d9' }}
                          >
                            {selectedItem.Author}
                          </Typography>
                          <Typography
                            variant='h7medium'
                            component='div'
                            sx={{ color: '#ced3d9' }}
                          >
                            {selectedItem.CreatedDate
                              ? dateFormat(selectedItem.CreatedDate)
                              : ''}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                )}
              </Box>
            )}
            {alignment == 'Page' && (PageFinalPage || activeStep == 2) && (
              <Box
                sx={{
                  backgroundColor: '#fff',
                  minHeight: 'calc(100vh - 194px)',
                  maxHeight: 'calc(100vh - 194px)',
                  overflowY: 'auto',
                  margin: '0',
                  padding: '15px',
                  position: 'relative',
                }}
              >
                <Grid container sx={{ mb: 5, alignItems: 'center' }}>
                  <Grid sx={{ px: 1 }} xs={12} md={5} lg={4}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography
                        variant='h6medium'
                        sx={{ textTransform: 'capitalize' }}
                      >
                        {' '}
                        {t('menu_added_title')}
                      </Typography>
                      <Typography variant='h7regular' sx={{ color: '#89909a' }}>
                        {' '}
                        {t('menu_added_subtitle')}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid sx={{ px: 1 }} xs={12} md={7} lg={8}>
                    <Typography variant='h6bold'>{pageName1}</Typography>
                  </Grid>
                </Grid>
                <Grid container sx={{ mb: 5, alignItems: 'center' }}>
                  <Grid sx={{ px: 1 }} xs={12} md={5} lg={4}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography
                        variant='h6medium'
                        sx={{ textTransform: 'capitalize' }}
                      >
                        {' '}
                        {t('menu_item_name')}
                      </Typography>
                      <Typography variant='h7regular' sx={{ color: '#89909a' }}>
                        {' '}
                        {t('menu_item_subname')}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid sx={{ px: 1 }} xs={12} md={7} lg={8}>
                    <Typography variant='h6bold'>{menuItemName}</Typography>
                  </Grid>
                </Grid>
                {menuDescription && (
                  <Grid container sx={{ mb: 5, alignItems: 'center' }}>
                    <Grid sx={{ px: 1 }} xs={12} md={5} lg={4}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='h6medium'>
                          {' '}
                          {t('menu_description')}
                        </Typography>
                        <Typography
                          variant='h7regular'
                          sx={{ color: '#89909a' }}
                        >
                          {' '}
                          {t('menu_subdes')}{' '}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid sx={{ px: 1 }} xs={12} md={7} lg={8}>
                      <Typography variant='h6bold'>
                        {menuDescription}
                      </Typography>
                    </Grid>
                  </Grid>
                )}
                {selectedIcon && (
                  <Grid container sx={{ mb: 5, alignItems: 'center' }}>
                    <Grid sx={{ px: 1 }} xs={12} md={5} lg={4}>
                      <Typography
                        variant='h6medium'
                        sx={{ color: '#2d2d37', textTransform: 'capitalize' }}
                      >
                        {t('menu_added_icon')}
                      </Typography>
                    </Grid>
                    <Grid sx={{ px: 1 }} xs={12} md={7} lg={8}>
                      <img
                        src={selectedIcon}
                        style={{
                          width: '44px',
                          height: '40px',
                          objectFit: 'cover',
                          padding: '10px',
                          border: 'solid 1px #ced3d9',
                          backgroundColor: '#f5f6f8',
                          borderRadius: '5px',
                        }}
                      />
                    </Grid>
                  </Grid>
                )}
                <Grid container sx={{ mb: 5, alignItems: 'center' }}>
                  <Grid sx={{ px: 1 }} xs={12} md={5} lg={4}>
                    <Typography
                      variant='h6medium'
                      sx={{ textTransform: 'capitalize' }}
                    >
                      {' '}
                      {t('menu_item_type')}
                    </Typography>
                  </Grid>
                  <Grid sx={{ px: 1 }} xs={12} md={7} lg={8}>
                    <Typography variant='h6bold'>{radioSelected}</Typography>
                  </Grid>
                </Grid>
                <Grid container sx={{ mb: 5, alignItems: 'center' }}>
                  <Grid sx={{ px: 1 }} xs={12} md={5} lg={4}>
                    <Typography
                      variant='h6medium'
                      sx={{ textTransform: 'capitalize' }}
                    >
                      {t('menu_item_selected')}
                    </Typography>
                  </Grid>
                  <Grid sx={{ px: 1 }} xs={12} md={7} lg={8}>
                    <Typography variant='h6bold'>
                      {menu && menu !== 'No Menu Item Selected'
                        ? menuName
                        : t('no_menu_selected')}
                    </Typography>
                  </Grid>
                </Grid>
                {selectedItem.Title !== '' && (
                  <Grid container>
                    <Grid sx={{ px: 1 }} xs={12} md={5} lg={4}>
                      <Typography variant='h6medium'>
                        {' '}
                        Added content type
                      </Typography>
                    </Grid>
                    <Grid sx={{ px: 1 }} xs={12} md={7} lg={8}>
                      <Box
                        sx={{
                          height: '227px',
                          width: { md: '356px', sm: '260px' },
                          position: 'relative',
                          borderRadius: '5px',
                        }}
                      >
                        <img
                          src={selectedItem.Image}
                          width='100%'
                          height='100%'
                          style={{ borderRadius: '5px' }}
                        />
                        <div
                          style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            background:
                              'linear-gradient(180deg, rgba(0,0,0,0.0001) 0%, #000000 100%)',
                            mixBlendMode: 'normal',
                            opacity: '0.5',
                            top: 0,
                            borderRadius: '5px',
                          }}
                        ></div>
                        <Box
                          sx={{
                            position: 'relative',
                            marginTop: '-85px',
                            marginLeft: '21px',
                          }}
                        >
                          <Typography
                            variant='h5medium'
                            component='div'
                            sx={{ color: '#fff', marginBottom: '5px' }}
                            className='singlebr'
                          >
                            {selectedItem.Title}
                          </Typography>
                          <Typography
                            variant='h7medium'
                            component='div'
                            sx={{ color: '#ced3d9' }}
                          >
                            {selectedItem.Author}
                          </Typography>
                          <Typography
                            variant='h7medium'
                            component='div'
                            sx={{ color: '#ced3d9' }}
                          >
                            {selectedItem.CreatedDate
                              ? dateFormat(selectedItem.CreatedDate)
                              : ''}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                )}
              </Box>
            )}
            {activeStep == 1 || activeStep == 2 ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  margin: '15px',
                }}
              >
                <Button
                  disableElevation
                  variant='outlined'
                  sx={{
                    height: '46px',
                    marginRight: '12px',
                  }}
                  onClick={handleBack}
                >
                  <ChevronLeftIcon sx={{ width: '20px', height: '20px' }} />
                  {t('back')}
                </Button>
                <Button
                  disableElevation
                  disabled={
                    (linkMenuItemName && menuItemName) || pageName1
                      ? false
                      : true
                  }
                  onClick={() => {
                    onConfirm();
                  }}
                  variant='contained'
                >
                  {activeStep == 2 ? (
                    <DoneOutlinedIcon
                      sx={{ marginRight: '5px', width: '14px', height: '14px' }}
                    />
                  ) : null}
                  {activeStep == 2 ? t('confirm') : t('continue')}
                  {activeStep == 2 ? null : (
                    <ArrowForwardIosIcon
                      sx={{ width: '10.6px', height: '10.6px', ml: '5px' }}
                    />
                  )}
                </Button>
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  padding: alignment === 'Page' ? '15px' : '15px',
                }}
              >
                <Button
                  disableElevation
                  disabled={checkContinue() || itemExist}
                  onClick={handleNext}
                  variant='contained'
                >
                  {t('continue')}
                  <ArrowForwardIosIcon
                    sx={{ width: '10.6px', height: '10.6px', ml: '5px' }}
                  />
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      )}
      {isPageList && (
        <SelectPageList
          isedit={isedit}
          handleBack={handleBack}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          handleNext={handleNext}
          setPageFinalPage={setPageFinalPage}
          setPageName1={setPageName1}
          setIsPageList={setIsPageList}
          setPageListOpen={setPageListOpen}
          isPageListCall={isPageListCall}
          setUrl={setUrl}
          currentButton={currentButton}
          setCurrentButton={setCurrentButton}
          isDisableDone={isDisableDone}
          setisIsDisableDone={setisIsDisableDone}
          editData={editData}
        />
      )}
    </>
  );
}
export default withStyles(styles)(CreateMenuPage);
