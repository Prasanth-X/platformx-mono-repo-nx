import Step from '@material-ui/core/Step';
import StepConnector from '@material-ui/core/StepConnector';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { withStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Box, Button, Divider, Slide, Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import * as React from 'react';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import iconMapping from '../../../assets/iconMapping';
import { Store } from '../../../store/ContextStore';
import { ThemeConstants } from '@platformx/utilities';
import { dateFormat } from '../../../utils/helperFunctions';
import ContentGallery from '../../ContentGallery/ContentGallery';
import BasicSwitch from '../../editPage/Switch';
import LinkSecondPg from './LinkSecondPg';
import MainMenuDialog from './MainMenuDialog';
import MenuSecondPage from './MenuSecondPage';

const styles = (theme) => ({
  stepIcon: {
    color: '#2d2d39 !important',
  },
  root: {
    '& .MuiStepIcon-active': { color: '#2d2d39' },
    '& .MuiStepIcon-completed': { color: '#2d2d39' },
    '& .Mui-disabled .MuiStepIcon-root': { color: '#ced3d9' },
    '& .Mui-disabled .MuiStepIcon-text': { fill: '#89909a' },
  },
  notchedOutline: {
    borderWidth: '1px',
    borderColor: 'rgb(211,47,47) !important',
  },
});
const steps = ['Create', 'Add', 'Confirm'];
interface ContentProps {
  Image: string;
  Title: string;
  Description?: string;
  RedirectionUrl?: string;
  ContentType: string;
  Internal: boolean;
  CreatedDate: string;
  Author: string;
}
function MenuCreationFirstPage({
  setOpenFirstPage,
  classes,
  editData,
  clickConfirm,
  setClickConfirm,
}) {
  const { t } = useTranslation();
  const minCss = `
  .singlebr {
   display: -webkit-box;
   -webkit-box-orient: vertical;
   -webkit-line-clamp: 1;
   overflow: hidden;
  }`;
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [alignment, setAlignment] = React.useState('Page');
  const [radioSelected, setRadioSelected] = useState('Main Menu');
  const [radioSelectedLink, setRadioSelectedLink] = useState('Current Tab');
  const { state, dispatch } = useContext(Store);
  const [leftSideBarContent, setLeftSideContent] = useState(
    state.navTree?.navTreeArray
  );
  const [menuItemName, setMenuItemName] = useState('');
  const [linkMenuItemName, setLinkMenuItemName] = useState('');
  const [isContinueLink, setIsContinueLink] = useState(false);
  const [hover, setHover] = useState(false);
  const [menu, setMenu] = React.useState('');
  const [subMenuValue, setSubMenuValue] = React.useState(
    'No Menu Item Selected'
  );
  const [open, setOpen] = React.useState(false);
  const [linkFinalPage, setLinkFinalPage] = React.useState(false);
  const [isMenuSecondPg, setIsMenuSecondPg] = React.useState(false);
  const [isLinkSecondPg, setIsLinkSecondPg] = React.useState(false);
  const [isHomePage, setIsHomePage] = useState(false);
  const [menuId, setMenuId] = useState('');
  let count = 0;
  const [disableHome, setdisableHome] = useState(false);
  const [checkIsHome, setCheckIsHome] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(iconMapping[0].url);
  const navigate = useNavigate();
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
  const [menuDescription, setMenuDescription] = useState('');
  const [galleryState, setGalleryState] = useState<boolean>(false);
  const onHover = () => {
    setHover(true);
  };
  const onLeave = () => {
    setHover(false);
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
    // } else if (!editData) {
    //   setdisableHome(true);
    //   setIsHomePage(false);
    //   showToastError(t('menu_home_error_toast'));
    // } else if (editData && editData?.HomePage) {
    //   setIsHomePage(event.target.checked);
    // } else {
    //   // setIsHomePage(event.target.checked);
    //   setdisableHome(true);
    //   setIsHomePage(false);
    //   showToastError(t('menu_home_error_toast'));
    // }
  };
  React.useEffect(() => {
    if (editData) {
      setMenuItemName(editData?.Label);
      setIsHomePage(editData?.HomePage);
      setMenuDescription(editData?.Description);

      setSelectedIcon(editData?.menuicon);
      setSelectedItem({ ...editData?.content_type_value });
      if (editData?.Internal) {
        setAlignment('Page');
        // setPageName1(editData?.URL);
        // setLinkMenuItemName('');
      } else {
        setAlignment('Link');
        // setLinkMenuItemName(editData?.URL);
      }
      if (editData?.ParentId == '0') {
        setRadioSelected('Main Menu');
        // setMenu('')
      } else {
        setRadioSelected('Sub Menu');
      }
      for (let i = 0; i < leftSideBarContent.length; i++) {
        if (leftSideBarContent[i].Menu_Id === editData.ParentId) {
          setSubMenuValue(leftSideBarContent[i].Label);
          // setMenu(leftSideBarContent[i].Menu_Id);
        }
      }
      setLinkMenuItemName(editData?.URL);
      // setUrl(editData?.URL);
    }
  }, [editData]);
  const copyText = () => {
    navigator.clipboard.writeText(linkMenuItemName);
  };
  const handleChangeMenu = (event) => {
    setMenu(event.target.value);
  };
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
    // setMenuItemName('');
    // setRadioSelected('Main Menu');
    // setMenu('');
  };
  const isStepOptional = (step: number) => {
    return step === 1;
  };
  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    // if (alignment == 'Link' && activeStep == 1) {
    //   setLinkFinalPage(true);
    //   setIsContinueLink(false);
    // }
    // if(alignment=='Link' && activeStep==1) {
    //   setLinkFinalPage(true);
    //   setIsContinueLink(false);
    // }
    // if (alignment == 'Link' && activeStep == 2) {
    //   setLinkFinalPage(false);
    //   handleOpenCreateMenu(true)
    //   handleOpenCreateMenu1(false)
    // }
    if (alignment == 'Page' && activeStep == 0) {
      setIsMenuSecondPg(true);
    }
    if (alignment == 'Link' && activeStep == 0) {
      setIsLinkSecondPg(true);
    }
    // if (alignment == 'Page' && activeStep == 2) {
    //   setPageFinalPage(false);
    //   handleOpenCreateMenu(true)
    //   handleOpenCreateMenu1(false)
    // }
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    if (activeStep == 0) {
      setOpenFirstPage(false);
      setActiveStep(0);
    }
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
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
    setMenu('');
    disableHomeHandle(evnt.target.value);
    if (evnt.target.value === 'Main Menu')
      setSubMenuValue('No Menu Item Selected');
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
  const checkValidation = () => {
    if (menuItemName) {
      if (radioSelected === 'Sub Menu') {
        if (subMenuValue === 'No Menu Item Selected') {
          return true;
        }
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  const onClickIcon = (icon) => {
    setSelectedIcon(icon);
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

  const onUploadClick = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
    setGalleryState(true);
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
      <style>{minCss}</style>
      {galleryState && (
        <ContentGallery
          handleSelectedContent={handleSelectedContent}
          onToggleContentGallery={onToggleContentGallery}
        />
      )}
      {/* <Box sx={{ display: "flex", position: "relative" }}> */}
      <Box
        sx={{
          width: { xs: '100%', sm: '100%', md: '100%', em: '0%', lg: '0%' },
          display: {
            xs: 'block',
            sm: 'block',
            md: 'block',
            em: 'none',
            lg: 'none',
          },
          height: '100%',
          overflowY: 'scroll',
          // height: activeStep==1|| activeStep===2?'550px':null
        }}
      >
        <Box
          sx={{
            width: '100%',
            backgroundColor: '#fff',
            display: 'flex',
            alignItems: 'center',
            padding: '13px',
          }}
        >
          <ArrowBackIosIcon
            onClick={handleBack}
            sx={{
              width: '20px',
              height: '20px',
              cursor: 'pointer',
              margin: 1,
            }}
          />

          <Typography
            variant="h4medium"
            sx={{
              width: '393px',
              height: '35px',
              // margin: '5px 0px 0px 0px',
              display: 'flex',
              alignItems: 'center',
              color: '#2d2d39',
            }}
          >
            {t('menu_create_button')}
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ width: '100%', backgroundColor: '#fff' }}>
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            className={classes.root}
            style={{
              padding: '15px',
            }}
            connector={
              <StepConnector
                style={{
                  width: '40px',
                  margin: '0px 19.5px 0px 13.5px',
                  backgroundColor: '#2d2d39',
                }}
              />
            }
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel
                  //  StepIconProps={{
                  //   classes: {
                  //     root: classes.stepIcon,

                  //   }              }}
                  style={{ marginTop: '0px' }}
                >
                  {t(label.toLowerCase())}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Box
          sx={{
            backgroundColor: '#fff', //margin: '18px 18px 0px 12px',
            margin: '18px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ToggleButtonGroup
              // color="info"
              value={alignment}
              exclusive
              onChange={handleChange}
              // aria-label="Platform"
              sx={{
                width: '-webkit-fill-available',
                // height: '42px',
                margin: '33px 30px 0px 30px',
                padding: '0 66px 0 0',
                backgroundColor: '#f5f6f8',
                borderRadius: '21px',
              }}
            >
              <ToggleButton
                value="Page"
                sx={{
                  '&.Mui-selected, &.Mui-selected:hover': {
                    color: '#fff',
                    backgroundColor: '#2d2d39',
                    borderRadius: '21px',
                  },
                  textTransform: 'none',
                  width: '149px',
                  height: '42px',
                  border: 'none',
                  backgroundColor: '#f5f6f8',
                  padding: '11px 56px 11px 57px',
                  borderRadius: '21px 0 0 21px',
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
                value="Link"
                sx={{
                  '&.Mui-selected, &.Mui-selected:hover': {
                    color: '#fff',
                    backgroundColor: '#2d2d39',
                    borderRadius: '21px',
                  },
                  ':hover': {
                    backgroundColor: '#f5f6f8',
                  },
                  textTransform: 'none',
                  borderRadius: '0 21px 21px 0',
                  width: '149px',
                  height: '42px',
                  backgroundColor: '#f5f6f8',
                  fontSize: ThemeConstants.FONTSIZE_SM,
                  padding: '11px 56px 11px 57px',
                  borderLeft: 'none',
                  border: 'none',
                }}
              >
                {t('link')}
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box>
            <Box
              sx={{
                marginLeft: '11px',
                marginTop: '40px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6medium">
                  {t('menu_item_name')}
                </Typography>
                <Typography
                  sx={{
                    fontSize: ThemeConstants.FONTSIZE_XS,
                    color: '#89909a',
                  }}
                >
                  {t('menu_subname')}
                </Typography>
              </Box>
              <Box
                sx={{
                  paddingTop: 1,
                  pr: 1,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <TextField
                  size="small"
                  variant="outlined"
                  placeholder={t('menu_name_placeholder')}
                  value={menuItemName}
                  onChange={handleMenuItemName}
                  onBlur={isMenuExist}
                  inputProps={{ maxLength: 15 }}
                  sx={{ fontSize: ThemeConstants.FONTSIZE_XS }}
                  error={itemExist}
                  // InputProps={{
                  //   classes: {
                  //     notchedOutline: itemExist ? classes.notchedOutline : null,
                  //   },
                  // }}
                ></TextField>
                {itemExist ? (
                  <Typography
                    variant="h7regular"
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
              </Box>
            </Box>
            <Box
              sx={{
                marginLeft: '11px',
                marginTop: '40px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6medium">
                  {' '}
                  {t('menu_description')}
                </Typography>
                <Typography
                  sx={{
                    fontSize: ThemeConstants.FONTSIZE_XS,
                    color: '#89909a',
                  }}
                >
                  {' '}
                  {t('menu_added_subdes')}
                </Typography>
              </Box>
              <Box sx={{ paddingTop: 1, pr: 1 }}>
                <TextField
                  multiline
                  rows={3}
                  placeholder={t('menu_des_placeholder')}
                  value={menuDescription}
                  onChange={handleMenuDescription}
                  inputProps={{ maxLength: 40 }}
                  sx={{ fontSize: ThemeConstants.FONTSIZE_XS }}
                ></TextField>
              </Box>
            </Box>
            <Box
              sx={{
                marginLeft: '11px',
                marginTop: '40px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography variant="h6medium" sx={{ color: '#2d2d37' }}>
                {t('menu_add_icon')}
              </Typography>
              <Box sx={{ paddingTop: 1, pr: 1 }}>
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
              </Box>
            </Box>
            {alignment === 'Page' && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: '11px',
                  marginTop: '32px',
                }}
              >
                <Typography variant="h6medium">{t('menu_set')}</Typography>
                <Box sx={{ marginLeft: '129px' }}>
                  <BasicSwitch
                    onChange={(e: any) => handleHomePage(e)}
                    checked={isHomePage}
                    disabled={checkIsHome}
                    color={ThemeConstants.BLACK_COLOR}
                  />
                </Box>
              </Box>
            )}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: '11px',
                marginTop: '25px',
              }}
            >
              <Typography variant="h6medium">{t('make_menu_as')}</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <RadioGroup
                  name="page-radio-buttons-group"
                  value={radioSelected}
                  onChange={handleMenuChange}
                  row
                  // sx={{ marginBottom: '25px' }}
                >
                  <FormControlLabel
                    sx={{
                      '.Platform-x-FormControlLabel-label': {
                        fontSize: ThemeConstants.FONTSIZE_SM,
                      },
                      marginRight: '30px',
                    }}
                    value="Main Menu"
                    control={<Radio />}
                    label={t('main_menu')}
                  />
                  <FormControlLabel
                    sx={{
                      '.Platform-x-FormControlLabel-label': {
                        fontSize: ThemeConstants.FONTSIZE_SM,
                      },
                      //   marginRight: '40px',
                    }}
                    value="Sub Menu"
                    control={<Radio />}
                    label={t('sub_menu')}
                  />
                </RadioGroup>
              </Box>
            </Box>
            <Box sx={{ ml: '11px', marginTop: '25px' }}>
              <Typography
                variant="h6medium"
                sx={{
                  // width: '164px',
                  height: '20px',
                  color: radioSelected == 'Main Menu' ? '#ced3d9' : '#2d2d39',
                }}
              >
                Select main menu item
              </Typography>
              <Box sx={{ pr: 1, pb: '17px' }}>
                <Typography
                  onClick={() =>
                    radioSelected == 'Sub Menu' ? setOpen(true) : null
                  }
                  sx={{
                    fontSize: ThemeConstants.FONTSIZE_DEFAULT,
                    // width: '299px',
                    height: '50px',
                    margin: '10px 0 0',
                    padding: '14px 96px 13px 17px',
                    borderRadius: '3px',
                    border: 'solid 1px #ced3d9',
                    color:
                      radioSelected == 'Main Menu' ||
                      subMenuValue === 'No Menu Item Selected'
                        ? '#ced3d9'
                        : '#2d2d39',
                  }}
                >
                  {subMenuValue}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                marginLeft: '11px',
                marginTop: '40px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography variant="h6medium" sx={{ color: '#2d2d37' }}>
                {t('menu_content')}
              </Typography>
              {selectedItem.Title !== '' ? (
                <Box
                  sx={{
                    cursor: 'pointer',
                    height: '227px',
                    width: { md: '356px', sm: '260px' },
                    position: 'relative',
                    mt: '10px',
                    mr: '10px',
                    mb: '10px',
                  }}
                  onClick={() => onUploadClick()}
                >
                  <img
                    src={selectedItem.Image}
                    width="100%"
                    height="100%"
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
                      variant="h5medium"
                      component="div"
                      sx={{ color: '#fff', marginBottom: '5px' }}
                      className="singlebr"
                    >
                      {selectedItem.Title}
                    </Typography>
                    <Typography
                      variant="h7medium"
                      component="div"
                      sx={{ color: '#ced3d9' }}
                    >
                      {selectedItem.Author}
                    </Typography>
                    <Typography
                      variant="h7medium"
                      component="div"
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
                    mt: '10px',
                    mr: '10px',
                    mb: '10px',
                  }}
                  onClick={() => onUploadClick()}
                >
                  <Box
                    sx={{
                      marginLeft: '24px',
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
                      variant="h5medium"
                      component="h5"
                      sx={{ color: '#000000' }}
                    >
                      {t('menu_content_placeholder')}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
        {open && (
          <MainMenuDialog
            open={open}
            setOpen={setOpen}
            setSubMenuValue={setSubMenuValue}
            setMenuId={setMenuId}
          />
        )}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            //  margin: alignment==='Page'? '25px 5px 10px 0px':'15px 5px 10px 0px',
            margin: '18px',
          }}
        >
          <Button
            variant="contained"
            disableElevation
            disabled={checkValidation() || itemExist}
            onClick={handleNext}
            sx={{
              height: '47px',
              fontSize: ThemeConstants.FONTSIZE_SM,
              backgroundColor: !checkValidation() ? '#2d2d39' : '#ced3d9',
              color: !checkValidation() ? '#fff' : '#89909a',
              width: '-webkit-fill-available',
            }}
          >
            {t('continue')}
            <ArrowForwardIosIcon
              sx={{ ml: '10px', width: '15px', height: '15px' }}
            />
          </Button>
        </Box>
        {isMenuSecondPg && (
          <Slide direction="right" in={isMenuSecondPg} timeout={300}>
            <Box
              sx={{
                backgroundColor: '#fff',
                zIndex: 100,
                position: 'fixed',
                width: '100%',
                height: '100%',
                top: 0,
                display: {
                  xs: 'block',
                  sm: 'block',
                  md: 'block',
                  em: 'none',
                  lg: 'none',
                },
              }}
            >
              <MenuSecondPage
                setIsMenuSecondPg={setIsMenuSecondPg}
                setOpenFirstPage={setOpenFirstPage}
                handleBack={handleBack}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                handleNext={handleNext}
                menuItemName={menuItemName}
                menuDescription={menuDescription}
                selectedIcon={selectedIcon}
                selectedItem={selectedItem}
                radioSelected={radioSelected}
                subMenuValue={subMenuValue}
                setMenuItemName={setMenuItemName}
                setRadioSelected={setRadioSelected}
                setSubMenuValue={setSubMenuValue}
                setAlignment={setAlignment}
                isHomePage={isHomePage}
                leftSideBarContent={leftSideBarContent}
                menuId={menuId}
                clickConfirm={clickConfirm}
                setClickConfirm={setClickConfirm}
                editData={editData}
              />
            </Box>
          </Slide>
        )}
        {isLinkSecondPg && (
          <Slide direction="right" in={isLinkSecondPg} timeout={300}>
            <Box
              sx={{
                backgroundColor: '#fff',
                zIndex: 100,
                position: 'fixed',
                width: '100%',
                height: '100%',
                top: 0,
              }}
            >
              <LinkSecondPg
                setIsLinkSecondPg={setIsLinkSecondPg}
                setOpenFirstPage={setOpenFirstPage}
                handleBack={handleBack}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                handleNext={handleNext}
                menuItemName={menuItemName}
                menuDescription={menuDescription}
                selectedIcon={selectedIcon}
                selectedItem={selectedItem}
                radioSelected={radioSelected}
                subMenuValue={subMenuValue}
                alignment={alignment}
                setMenuItemName={setMenuItemName}
                setRadioSelected={setRadioSelected}
                setSubMenuValue={setSubMenuValue}
                setAlignment={setAlignment}
                menuId={menuId}
                isHomePage={isHomePage}
                leftSideBarContent={leftSideBarContent}
                editData={editData}
                clickConfirm={clickConfirm}
                setClickConfirm={setClickConfirm}
              />
            </Box>
          </Slide>
        )}
      </Box>
    </>
  );
}

// export default MenuCreationFirstPage;
export default withStyles(styles)(MenuCreationFirstPage);
