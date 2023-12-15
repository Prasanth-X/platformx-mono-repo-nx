import Step from '@material-ui/core/Step';
import StepConnector from '@material-ui/core/StepConnector';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { withStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Button, Divider, Slide, Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import * as React from 'react';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { showToastError } from '../../../components/toastNotification/toastNotificationReactTostify';
import { Store } from '../../../store/ContextStore';
import { ThemeConstants } from '@platformx/utilities';
import LinkThirdPg from './LinkThirdPg';

const steps = ['Create', 'Add', 'Confirm'];
const styles = () => ({
  stepIcon: {
    color: '#2d2d39 !important',
  },
  root: {
    '& .MuiStepIcon-active': { color: ThemeConstants.PRIMARY_MAIN_COLOR },
    '& .MuiStepIcon-completed': { color: ThemeConstants.PRIMARY_MAIN_COLOR },
    '& .Mui-disabled .MuiStepIcon-root': { color: '#ced3d9' },
    '& .Mui-disabled .MuiStepIcon-text': { fill: '#89909a' },
  },
});
function LinkSecondPg({
  setIsLinkSecondPg,
  setOpenFirstPage,
  handleBack,
  activeStep,
  setActiveStep,
  handleNext,
  menuItemName,
  menuDescription,
  selectedItem,
  selectedIcon,
  radioSelected,
  subMenuValue,
  alignment,
  setMenuItemName,
  setRadioSelected,
  setSubMenuValue,
  setAlignment,
  classes,
  menuId,
  isHomePage,
  leftSideBarContent,
  editData,
  clickConfirm,
  setClickConfirm,
}) {
  const { t } = useTranslation();
  const [skipped, setSkipped] = useState(new Set<number>());
  const [radioSelectedLink, setRadioSelectedLink] = useState('Current Tab');
  const { state, dispatch } = useContext(Store);
  const [isContinueLink, setIsContinueLink] = useState(false);
  const [hover, setHover] = useState(false);
  const [menu, setMenu] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [linkFinalPage, setLinkFinalPage] = React.useState(false);
  const [isMenuSecondPg, setIsMenuSecondPg] = React.useState(false);
  const [linkMenuItemName, setLinkMenuItemName] = useState('');
  const [isLinkThirdPg, setIsLinkThirdPg] = React.useState(false);

  const onHover = () => {
    setHover(true);
  };
  const onLeave = () => {
    setHover(false);
  };
  const copyText = () => {
    navigator.clipboard.writeText(linkMenuItemName);
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
  const handleLinkTabChange = (evnt) => {
    setRadioSelectedLink(evnt.target.value);
  };
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  React.useEffect(() => {
    if (editData) {
      if (editData?.Internal) {
        setAlignment('Page');
        setLinkMenuItemName('');
      } else {
        setAlignment('Link');
        setLinkMenuItemName(editData?.URL);
        if (editData?.isCurrentTab) {
          setRadioSelectedLink('Current Tab');
        } else {
          setRadioSelectedLink('New Tab');
        }
      }
    }
  }, [editData]);
  return (
    <Box
      sx={{
        width: { xs: '100%' },
        display: { xs: 'block', sm: 'none' },
        height: '100%',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          width: '100%',
          backgroundColor: ThemeConstants.WHITE_COLOR,
          display: 'flex',
          alignItems: 'center',
          padding: '13px',
        }}
      >
        <ArrowBackIosIcon
          onClick={() => {
            handleBack();
            setActiveStep(0);
            setIsLinkSecondPg(false);
            setOpenFirstPage(true);
          }}
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
            display: 'flex',
            alignItems: 'center',
            color: ThemeConstants.PRIMARY_MAIN_COLOR,
          }}
        >
          {t('menu_create_button')}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ width: '100%', backgroundColor: ThemeConstants.WHITE_COLOR }}>
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
                backgroundColor: ThemeConstants.PRIMARY_MAIN_COLOR,
              }}
            />
          }
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel style={{ marginTop: '0px' }}>
                {t(label.toLowerCase())}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Box
        sx={{
          backgroundColor: ThemeConstants.WHITE_COLOR,
          margin: '18px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleChange}
            sx={{
              width: '-webkit-fill-available',
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
                  backgroundColor: ThemeConstants.PRIMARY_MAIN_COLOR,
                  borderRadius: '21px',
                },
                textTransform: 'none',
                borderRadius: '21px 0 0 21px',
                width: '149px',
                height: '42px',
                border: 'none',
                backgroundColor: '#f5f6f8',
                padding: '11px 56px 11px 57px',
                borderRight: 'none',
                ':hover': {
                  backgroundColor: '#f5f6f8',
                },
                fontSize: ThemeConstants.FONTSIZE_SM,
              }}
            >
              {t('page')}
            </ToggleButton>
            <ToggleButton
              value="Link"
              sx={{
                '&.Mui-selected, &.Mui-selected:hover': {
                  color: ThemeConstants.WHITE_COLOR,
                  backgroundColor: ThemeConstants.PRIMARY_MAIN_COLOR,
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
              Link
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
              <Typography variant="h6medium">{t('insert_url')}</Typography>
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
                paddingTop: 1,
                pr: 1,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <TextField
                size="small"
                type="url"
                placeholder="http://www.google.com"
                value={linkMenuItemName}
                onChange={handleLinkMenuItemName}
                onBlur={checkUrl}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CancelOutlinedIcon
                        onClick={() => setLinkMenuItemName('')}
                        sx={{
                          cursor: 'pointer',
                          width: '16px',
                          height: '16px',
                          color: ThemeConstants.PRIMARY_MAIN_COLOR,
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  color: '#6d6dff',
                  width: '267px',
                  '.Platform-x-InputBase-root': {
                    height: '50px',
                    fontSize: ThemeConstants.FONTSIZE_XS,
                    color: '#6d6dff',
                  },
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
                  marginLeft: '31.2px',
                }}
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '11px',
              marginTop: '25px',
            }}
          >
            <Typography variant="h6medium">{t('select_tab')}</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', mb: '23px' }}>
              <RadioGroup
                name="page-radio-buttons-group"
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
                  value="Current Tab"
                  control={<Radio />}
                  label="Current Tab"
                />
                <FormControlLabel
                  sx={{
                    '.Platform-x-FormControlLabel-label': {
                      fontSize: ThemeConstants.FONTSIZE_SM,
                    },
                  }}
                  value="New Tab"
                  control={<Radio />}
                  label="New Tab"
                />
              </RadioGroup>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          position: 'absolute',
          bottom: '20px',
          width: '100%',
        }}
      >
        <Button
          variant="contained"
          disableElevation
          sx={{
            width: '163px',
            height: '50px',
            fontSize: ThemeConstants.FONTSIZE_SM,
            backgroundColor: ThemeConstants.WHITE_COLOR,
            color: ThemeConstants.PRIMARY_MAIN_COLOR,
            textTransform: 'none',
            borderRadius: '3px',
            '&:hover': {
              backgroundColor: ThemeConstants.WHITE_COLOR,
              color: ThemeConstants.BLACK_COLOR,
            },
            display: 'flex',
            alignItems: 'center',
          }}
          onClick={() => {
            handleBack();
            setActiveStep(0);
            setIsLinkSecondPg(false);
            setOpenFirstPage(true);
          }}
        >
          <ChevronLeftIcon sx={{ mr: '5px' }} />

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mr: '5px',
            }}
          >
            {t('back')}
          </Box>
        </Button>
        <Button
          variant="contained"
          disableElevation
          disabled={linkMenuItemName ? false : true}
          sx={{
            width: '163px',
            height: '50px',
            fontSize: ThemeConstants.FONTSIZE_SM,
            backgroundColor: ThemeConstants.PRIMARY_MAIN_COLOR,
            color: '#fff',
            textTransform: 'none',
            ml: '16px',
            borderRadius: '3px',

            '&:hover': {
              backgroundColor: ThemeConstants.BLACK_COLOR,
              color: ThemeConstants.WHITE_COLOR,
            },
            '&:disabled': {
              backgroundColor: '#ced3d9',
              color: '#89909a',
              fontSize: ThemeConstants.FONTSIZE_SM,
            },
          }}
          onClick={() => {
            handleNext();
            setIsLinkThirdPg(true);
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              ml: '3px',
            }}
          >
            {t('continue')}
          </Box>

          <ArrowForwardIosIcon
            sx={{ ml: '10px', width: '15px', height: '15px' }}
          />
        </Button>
      </Box>
      <Slide direction="right" in={isLinkThirdPg} timeout={300}>
        <Box
          sx={{
            backgroundColor: ThemeConstants.WHITE_COLOR,
            zIndex: 100,
            position: 'fixed',
            width: '100%',
            height: '100%',
            top: 0,
          }}
        >
          <LinkThirdPg
            setIsLinkThirdPg={setIsLinkThirdPg}
            setIsLinkSecondPg={setIsLinkSecondPg}
            setOpenFirstPage={setOpenFirstPage}
            handleBack={handleBack}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            handleNext={handleNext}
            linkMenuItemName={linkMenuItemName}
            menuItemName={menuItemName}
            menuDescription={menuDescription}
            selectedIcon={selectedIcon}
            selectedItem={selectedItem}
            radioSelected={radioSelected}
            subMenuValue={subMenuValue}
            radioSelectedLink={radioSelectedLink}
            setLinkMenuItemName={setLinkMenuItemName}
            setMenuItemName={setMenuItemName}
            setRadioSelected={setRadioSelected}
            setSubMenuValue={setSubMenuValue}
            setRadioSelectedLink={setRadioSelectedLink}
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
    </Box>
  );
}
export default withStyles(styles)(LinkSecondPg);
