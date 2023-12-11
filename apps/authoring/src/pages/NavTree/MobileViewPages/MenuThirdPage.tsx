import { useMutation } from '@apollo/client';
import Step from '@material-ui/core/Step';
import StepConnector from '@material-ui/core/StepConnector';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { withStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import { Box, Button, Divider, Typography } from '@mui/material';
import { useContext, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Loader from '../../../Common/Loader';
import {
  showToastError,
  showToastSuccess,
} from '../../../components/toastNotification/toastNotificationReactTostify';
import useUserSession from '../../../hooks/useUserSession/useUserSession';
import { save_menu, update_menu } from '../../../services/navTree/navTree.api';
import { Store } from '../../../store/ContextStore';
import ThemeConstants from '../../../../../../libs/utilities/src/lib/themes/authoring/variable';
import { dateFormat } from '../../../utils/helperFunctions';
import { createMenu } from '../Actions';

const steps = ['Create', 'Add', 'Confirm'];
const styles = (theme) => ({
  stepIcon: {
    color: '#2d2d39 !important',
  },
});
function MenuThirdPage({
  setIsMenuThirdPg,
  setIsMenuSecondPg,
  handleBack,
  activeStep,
  setActiveStep,
  handleNext,
  pageName,
  menuItemName,
  menuDescription,
  selectedIcon,
  selectedItem,
  radioSelected,
  subMenuValue,
  setOpenFirstPage,
  setMenuItemName,
  setRadioSelected,
  setSubMenuValue,
  setAlignment,
  setPageName,
  classes,
  url,
  setUrl,
  isHomePage,
  leftSideBarContent,
  menuId,
  setCurrentButton,
  setIsDone,
  clickConfirm,
  setClickConfirm,
  editData,
}) {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(Store);
  const [getSession] = useUserSession();
  const { userInfo } = getSession();
  const [isLoading, setIsLoading] = useState(false);

  const username = `${userInfo.first_name} ${userInfo.last_name}`;
  const [updatemutate] = useMutation(update_menu);
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
  const onBack = () => {
    handleBack();
    setIsMenuSecondPg(true);
    setIsMenuThirdPg(false);
  };
  const createMenuItem = () => {
    const parentId = radioSelected === 'Main Menu' ? '0' : menuId;
    dispatch(
      createMenu(menuItemName, parentId, username, isHomePage, '', '', {})
    );
  };
  const [savedmutate] = useMutation(save_menu);
  const mainMenuLength = useRef(0);
  const onSave = () => {
    const parentId = radioSelected === 'Main Menu' ? '0' : menuId;
    const menuToSend = {
      ParentId: parentId,
      URL: url,
      Tagging: 'Navigation',
      Description: menuDescription,
      Label: menuItemName,
      Score: getHighestScore() + 1,
      Status: 'DRAFT',
      Internal: true,
      IsHidden: false,
      isCurrentTab: true,
      HomePage: isHomePage,
      menuicon: selectedIcon,
      content_type_value: { ...selectedItem },
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
          setIsLoading(false);
          handleNext();
          setIsMenuThirdPg(false);
          setIsMenuSecondPg(false);
          setOpenFirstPage(false);
          setActiveStep(0);
          setMenuItemName('');
          setRadioSelected('Main Menu');
          setSubMenuValue('');
          setAlignment('Page');
          setPageName('');
          setCurrentButton('');
          setIsDone(false);
          setClickConfirm(!clickConfirm);
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
  const onEdit = () => {
    const parentId = radioSelected === 'Main Menu' ? '0' : menuId;
    const menuToSend = {
      Tagging: 'Navigation',
      Description: menuDescription,
      ParentId: parentId ? parentId : editData?.ParentId,
      Label: menuItemName,
      Internal: true,
      Score: editData?.Score,
      IsHidden: false,
      Status: 'DRAFT',
      HomePage: isHomePage,
      isCurrentTab: true,
      URL: url,
      menuicon: selectedIcon,
      content_type_value: { ...selectedItem },
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
          handleNext();
          setClickConfirm(!clickConfirm);
          setIsMenuThirdPg(false);
          setIsMenuSecondPg(false);
          setOpenFirstPage(false);
          setActiveStep(0);
          setIsLoading(false);

          showToastSuccess(`${t('menu')} ${t('updated_toast')}`);
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
        if (leftSideBarContent[i].ParentId === menuId) {
          mainMenuLength.current++;
        }
      }
    }
    if (editData) {
      onEdit();
    } else {
      if (mainMenuLength.current < 10) {
        onSave();
      } else {
        showToastError(t('menu_length_toast'));
        mainMenuLength.current = 0;
        handleNext();
        setIsMenuThirdPg(false);
        setIsMenuSecondPg(false);
        setOpenFirstPage(false);
        setActiveStep(0);
        setMenuItemName('');
        setRadioSelected('Main Menu');
        setSubMenuValue('');
        setAlignment('Page');
        setPageName('');
        setCurrentButton('');
        setIsDone(false);
        // setIsLoading(false);
      }
      // handleNext();
      // setIsMenuThirdPg(false);
      // setIsMenuSecondPg(false);
      // setOpenFirstPage(false);
      // setActiveStep(0);
      // setMenuItemName('');
      // setRadioSelected('Main Menu');
      // setSubMenuValue('');
      // setAlignment('Page');
      // setPageName('');
      // setCurrentButton('');
      // setIsDone(false);
    }
  };

  return (
    <>
      {/* <Box sx={{ display: "flex", position: "relative" }}> */}
      {isLoading && <Loader />}

      <Box
        sx={{
          width: { xs: '100%' },
          display: { xs: 'block', sm: 'none' },
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
            onClick={onBack}
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
        <Box sx={{ width: '100%' }}>
          <Stepper
            activeStep={activeStep}
            alternativeLabel
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
                  style={{ marginTop: '0px' }}
                  StepIconProps={{
                    classes: {
                      root: classes.stepIcon,
                    },
                  }}
                >
                  {t(label.toLowerCase())}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Typography
          sx={{
            margin: '15px 0px 0px 20px',
            fontSize: ThemeConstants.FONTSIZE_MD,
          }}
        >
          {t('menu_item_details')}
        </Typography>
        <Box
          sx={{
            backgroundColor: '#fff', //margin: '-13px 20px 0px 12px',
            margin: '18px',
          }}
        >
          <Box sx={{ marginTop: '-16px' }}>
            <Box
              sx={{
                marginLeft: '17px',
                marginTop: '40px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box
                sx={{ display: 'flex', flexDirection: 'column', mt: '18px' }}
              >
                <Typography variant="h6medium">
                  {' '}
                  {t('menu_added_title')}
                </Typography>
                <Typography variant="h7regular" sx={{ color: '#89909a' }}>
                  {' '}
                  {t('menu_added_subtitle')}
                </Typography>
              </Box>
              <Box
                sx={{
                  marginTop: 1,
                  mr: 2,
                  color: '#89909a',
                  border: 'solid 1px #ced3d9',
                  backgroundColor: '#f5f6f8',
                  borderRadius: '3px',
                  display: 'flex',
                  alignItems: 'center',
                  height: '50px',
                }}
              >
                <Typography
                  sx={{
                    fontSize: ThemeConstants.FONTSIZE_DEFAULT,
                    p: 2,
                    color: '#89909a',
                  }}
                >
                  {pageName}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                marginLeft: '17px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box
                sx={{ display: 'flex', flexDirection: 'column', mt: '25px' }}
              >
                <Typography variant="h6medium">
                  {t('menu_item_name')}
                </Typography>
                <Typography
                  sx={{
                    fontSize: ThemeConstants.FONTSIZE_XS,
                    color: '#89909a',
                  }}
                >
                  {' '}
                  {t('menu_subname')}
                </Typography>
              </Box>
              <Box
                sx={{
                  marginTop: 1,
                  mr: 2,
                  color: '#89909a',
                  border: 'solid 1px #ced3d9',
                  backgroundColor: '#f5f6f8',
                  borderRadius: '3px',
                  display: 'flex',
                  alignItems: 'center',
                  height: '50px',
                }}
              >
                <Typography
                  sx={{
                    fontSize: ThemeConstants.FONTSIZE_DEFAULT,
                    p: 2,
                    color: '#89909a',
                  }}
                >
                  {menuItemName}
                </Typography>
              </Box>
            </Box>
            {menuDescription && (
              <Box
                sx={{
                  marginLeft: '17px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box
                  sx={{ display: 'flex', flexDirection: 'column', mt: '25px' }}
                >
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
                    {t('menu_subdes')}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    marginTop: 1,
                    mr: 2,
                    color: '#89909a',
                    border: 'solid 1px #ced3d9',
                    backgroundColor: '#f5f6f8',
                    borderRadius: '3px',
                    display: 'flex',
                    alignItems: 'center',
                    height: '75px',
                    overflowWrap: 'anywhere',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: ThemeConstants.FONTSIZE_DEFAULT,
                      p: 2,
                      color: '#89909a',
                    }}
                  >
                    {menuDescription}
                  </Typography>
                </Box>
              </Box>
            )}
            <Box
              sx={{
                marginLeft: '17px',
                display: 'flex',
                flexDirection: 'column',
                mt: '25px',
              }}
            >
              <Typography variant="h6medium">
                {' '}
                {t('menu_added_icon')}
              </Typography>
              <Box sx={{ marginTop: 1, mr: 2 }}>
                <img
                  src={selectedIcon}
                  style={{
                    width: '26px',
                    height: '26px',
                    objectFit: 'cover',
                    padding: '5px',
                    marginRight: '3px',
                    border: 'solid 1px #ced3d9',
                    backgroundColor: '#f5f6f8',
                    borderRadius: '5px',
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                marginLeft: '17px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box
                sx={{ display: 'flex', flexDirection: 'column', mt: '25px' }}
              >
                <Typography variant="h6medium">
                  {t('menu_item_type')}
                </Typography>
              </Box>
              <Box
                sx={{
                  marginTop: 1,
                  mr: 2,
                  color: '#89909a',
                  border: 'solid 1px #ced3d9',
                  backgroundColor: '#f5f6f8',
                  borderRadius: '3px',
                  display: 'flex',
                  alignItems: 'center',
                  height: '50px',
                }}
              >
                <Typography
                  sx={{
                    fontSize: ThemeConstants.FONTSIZE_DEFAULT,
                    p: 2,
                    color: '#89909a',
                  }}
                >
                  {radioSelected}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                marginLeft: '17px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box
                sx={{ display: 'flex', flexDirection: 'column', mt: '25px' }}
              >
                <Typography variant="h6medium">
                  {' '}
                  {t('menu_item_selected')}
                </Typography>
              </Box>
              <Box
                sx={{
                  marginTop: 1,
                  mr: 2,
                  color: '#89909a',
                  border: 'solid 1px #ced3d9',
                  backgroundColor: '#f5f6f8',
                  borderRadius: '3px',
                  display: 'flex',
                  alignItems: 'center',
                  height: '50px',
                  mb: '20px',
                }}
              >
                <Typography
                  sx={{
                    fontSize: ThemeConstants.FONTSIZE_DEFAULT,
                    p: 2,
                    color: '#89909a',
                  }}
                >
                  {subMenuValue}
                </Typography>
              </Box>
            </Box>
            {selectedItem.Title !== '' && (
              <Box
                sx={{
                  marginLeft: '17px',
                  display: 'flex',
                  flexDirection: 'column',
                  mt: '25px',
                }}
              >
                <Typography variant="h6medium"> Added content type</Typography>
                <Box
                  sx={{
                    marginTop: 1,
                    mr: 2,
                    mb: '10px',
                    cursor: 'pointer',
                    height: '227px',
                    width: { md: '356px', sm: '260px' },
                    position: 'relative',
                  }}
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
                  ></div>
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
              </Box>
            )}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: '18px' }}>
          <Button
            variant="contained"
            disableElevation
            onClick={onBack}
            sx={{
              width: '165px',
              height: '50px',
              fontSize: ThemeConstants.FONTSIZE_SM,
              backgroundColor: '#fff',
              color: '#2d2d39',
              textTransform: 'none',
              //   margin: '54px 20px 18px 20px',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '3px',
              '&:hover': {
                backgroundColor: ThemeConstants.WHITE_COLOR,
                color: ThemeConstants.BLACK_COLOR,
              },
            }}
            // onClick = {generateArticle}
            //  onClick={() => onDuplicatePage(false, undefined)}
          >
            <ChevronLeftIcon />

            {t('back')}
          </Button>
          <Button
            variant="contained"
            disableElevation
            sx={{
              width: '165px',
              height: '50px',
              fontSize: ThemeConstants.FONTSIZE_SM,
              backgroundColor: '#2d2d39',
              color: '#fff',
              textTransform: 'none',
              ml: '16px',
              //   margin: '54px 20px 18px 20px',
              borderRadius: '3px',
              '&:hover': {
                backgroundColor: ThemeConstants.BLACK_COLOR,
                color: ThemeConstants.WHITE_COLOR,
              },
            }}
            onClick={onConfirm}
            //  onClick={() => onDuplicatePage(false, undefined)}
          >
            <DoneOutlinedIcon sx={{ marginRight: '10px' }} />
            {t('confirm')}
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default withStyles(styles)(MenuThirdPage);
