
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, Divider, Fab, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Guideline_Img1 from '../../../assets/images/Guideline_Img1.png';
import Guideline_Img2 from '../../../assets/images/Guideline_Img2.png';

export default function Guideline({ setOpenGuideline }) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isCreate, setIsCreate] = useState(true);
  const [isPageList, setIsPageList] = useState(false);
  const [isPageFinal, setisPageFinal] = useState(false);
  const [openCreateMenu, setOpenCreateMenu] = useState(false);
  const [activeStep1, setActiveStep11] = useState(0);
  const [itemName, setItemName] = useState('');
  const [pageName, setPageName] = useState('');
  const navigate = useNavigate();
  const onclickGuideline = () => {
    setIsOpen(true);
    setIsCreate(false);
  };
  const onClose = (value) => {
    setIsOpen(false);
    setIsCreate(true);
  };
  const onclickCreateMenu = () => {
    setIsCreate(false);
    setOpenCreateMenu(true);
    setisPageFinal(false);
    setItemName('');
    setActiveStep11(0);
  };
  const handleOpenCreateMenu1 = (value) => {
    // setIsCreate(value);
    setIsPageList(value);
    // setOpenCreateMenu(false);
  };
  const handleOpenCreateMenu = (value) => {
    setIsCreate(value);
    setIsPageList(value);
    setOpenCreateMenu(false);
  };
  const setActiveStep1 = (val) => {
    setActiveStep11(val);
    console.log(activeStep1);
  };
  const handleDonePageList = (value) => {
    setIsCreate(false);
    setIsPageList(false);
    setOpenCreateMenu(value);
    if (activeStep1 === 0) {
      setisPageFinal(false);
      console.log(isPageFinal);
    } else {
      setisPageFinal(value);
      console.log(isPageFinal);
    }
  };
  const setMenuItemName1 = (val) => {
    setItemName(val);
  };
  return (
    <>
      <Box
        sx={{
          display: { xs: 'block', sm: 'none' },
          position: 'relative',
          overflow: 'none',
        }}
      >
        <Box
          sx={{
            width: { xs: '100%' },
          }}
        >
          <Box
            sx={{
              width: '100%',
              backgroundColor: '#fff',
              display: 'flex',
              alignItems: 'center',
              padding: '10px',
            }}
          >
            <ArrowBackIosIcon
              onClick={() => setOpenGuideline(false)}
              sx={{
                width: '20px',
                height: '20px',
                cursor: 'pointer',
                margin: 1,
              }}
            />

            <Typography
              variant='h3medium'
              sx={{
                width: '393px',
                height: '35px',
                display: 'flex',
                alignItems: 'center',
                color: '#2d2d39',
              }}
            >
              {t('menu_guide_button')}
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ margin: '20px', overflow: 'auto' }}>
            <Typography
              variant='h3medium'
              sx={{
                color: '#2d2d39',
              }}
            >
              {t('menu_creation_step1')}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Fab
                size='small'
                color='primary'
                aria-label='add'
                sx={{
                  boxShadow: 'none',
                  margin: '10px',
                  mt: '0px',
                  mb: '0px',
                }}
              >
                <AddIcon />
              </Fab>
              <Typography
                variant='h4regular'
                sx={{
                  color: '#2d2d39',
                }}
              >
                {t('cta_or_button')}{' '}
              </Typography>
            </Box>
            <Box>
              <Typography
                variant='h6regular'
                sx={{
                  color: '#89909a',
                  mt: '5px',
                }}
              >
                {t('menu_step1_details')}
              </Typography>
            </Box>
            <Box sx={{ margin: '15px 0px 0px 0px', objectFit: 'contain' }}>
              <img src={Guideline_Img1} width='335px' height='203px' />
            </Box>
            <Box
              sx={{
                margin: '2px 0px 0px 0px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Typography
                variant='h5regular'
                sx={{
                  color: '#2d2d39',
                }}
              >
                {' '}
                {t('menu_creation_step2')}{' '}
              </Typography>
            </Box>
            <Box>
              <Typography
                variant='h6regular'
                sx={{
                  color: '#89909a',
                  margin: '10px 0px 0px 0px',
                }}
              >
                {t('menu_step2_details')}
              </Typography>
            </Box>
            <Box sx={{ margin: '15px 0px 0px 0px', objectFit: 'contain' }}>
              <img src={Guideline_Img2} width='335px' height='203px' />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
