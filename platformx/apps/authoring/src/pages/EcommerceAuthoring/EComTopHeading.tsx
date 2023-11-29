import { useState } from 'react';
import './EComTopHeading.css';
import { Box } from '@mui/system';
import EcomSearchBox from './EcomSearchBox';
import { useTranslation } from 'react-i18next';
import DoneIcon from '@mui/icons-material/Done';
import ThemeConstants from '../../theme/variable';
import { Drawer, Grid, Typography, Fab, Grow } from '@mui/material';
import MobileMenuIconSvg from '../../assets/svg/mobileMenuIconSvg.svg';
import SearchBlackSvg from '../../assets/svg/SearchBlack.svg';
import CloseSearchSvg from '../../assets/svg/closeSearch.svg';
import CtaEditAndDone from '../../ecommerceComponents/CtaEditAndDone/CtaEditAndDone';
import EcomLeftSidebar from '../../ecommerceComponents/EcomLeftSidebar/EcomLeftSidebar';

type eComTopHeadingprops = {
  loading?: boolean;
  onSearch?: any;
  doneClick?: any;
  cancelClick?: any;
  inputValue?: string;
  onNodeIdHandle?: any;
  categoriesFilter?: any;
  setInputValueHandle?: any;
};

const EComTopHeading = (_props: eComTopHeadingprops) => {
  const {
    inputValue = '',
    loading = false,
    onSearch = () => {},
    categoriesFilter = [],
    doneClick = () => {},
    cancelClick = () => {},
    onNodeIdHandle = () => {},
    setInputValueHandle = () => {},
  } = _props;

  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const searchToggle = () => {
    setShowSearch(!showSearch);
  };

  const searchCloseToggle = () => {
    onSearch('');
    setInputValueHandle('');
    setShowSearch(!showSearch);
  };

  /**
   * only for mobile view
   * result is come back to search header
   */
  const mobileonSearch = (e) => {
    onSearch(e);
    setTimeout(() => {
      setShowSearch(!showSearch);
    }, 3000);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box
      className='ecommerce-topbar'
      sx={{ background: ThemeConstants.WHITE_COLOR }}
    >
      {/* {Large view design} */}
      <Grid
        container
        pt={2}
        pb={0}
        pl={4}
        pr={4}
        sx={{
          display: {
            xs: 'none',
            em: 'flex',
            padding: '15px',
            borderBottom: '1px solid #d9dbe9',
          },
        }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          em={3}
          lg={3}
          sx={{
            margin: 'auto 0',
          }}
        >
          <Typography variant='h4bold'>{t('prelem_choose_content')}</Typography>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          em={5}
          lg={6}
          sx={{
            padding: {
              xs: '10px 0',
              sm: '0',
              display: 'flex',
              justifyContent: 'center',
            },
          }}
        >
          <Grid item xs={12} sm={12} em={12} lg={9} className='searchWrapper'>
            <EcomSearchBox
              onSearch={onSearch}
              inputValue={inputValue}
              setInputValueHandle={setInputValueHandle}
            />
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          em={4}
          lg={3}
          container
          spacing={0}
          direction='column'
          alignItems='end'
          justifyContent='center'
          sx={{ display: 'flex' }}
        >
          <CtaEditAndDone cancelClick={cancelClick} doneClick={doneClick} />
        </Grid>
      </Grid>

      {/* {small view design} */}
      <Grid
        container
        pt={1}
        pb={1}
        pl={2}
        pr={6}
        sx={{
          display: {
            xs: 'flex',
            em: 'none',
            borderBottom: '1px solid',
            borderColor: ThemeConstants.DIVIDER_COLOR,
            padding: '16px 16px 4px 16px',
            height: '60px',
          },
        }}
      >
        <Box
          className='fixed-screen-inner'
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            fontSize: ThemeConstants.FONTSIZE_H4,
          }}
        >
          {!showSearch ? (
            <>
              <Grow
                in={!showSearch}
                style={{ transformOrigin: '0 0 0' }}
                {...(!showSearch ? { timeout: 1000 } : {})}
              >
                <Box>
                  <Grid item>
                    <Typography variant='h4medium'>
                      {t('prelem_choose_content')}
                    </Typography>
                  </Grid>
                </Box>
              </Grow>

              <Grid item className='icon-container'>
                <Typography
                  className='top-icons right-search-icon'
                  sx={{
                    fontSize: ThemeConstants.FONTSIZE_LG,
                  }}
                  onClick={searchToggle}
                >
                  <img src={SearchBlackSvg} alt='Search Black Icon' />
                </Typography>

                <Typography
                  className='top-icons'
                  sx={{
                    fontSize: ThemeConstants.FONTSIZE_LG,
                  }}
                  onClick={toggleDrawer}
                >
                  <img src={MobileMenuIconSvg} alt='Mobile Menu Icon' />
                </Typography>
              </Grid>
            </>
          ) : (
            <Grid item className='search-item-container small-device'>
              <Grow
                in={showSearch}
                style={{ transformOrigin: '0 0 0' }}
                {...(showSearch ? { timeout: 1000 } : {})}
              >
                <Box>
                  <EcomSearchBox
                    inputValue={inputValue}
                    onSearch={mobileonSearch}
                    setInputValueHandle={setInputValueHandle}
                    style={{
                      height: '47px',
                      minHeight: '47px',
                      width: '97%',
                      marginLeft: '10px',
                      backgroundColor: ThemeConstants.LIGHT_GRAY_COLOR,
                      borderRadius: '8px',
                    }}
                  />
                </Box>
              </Grow>
              <Typography
                className='icon-inside-search'
                sx={{
                  fontSize: ThemeConstants.FONTSIZE_LG,
                }}
                onClick={searchCloseToggle}
              >
                <img src={CloseSearchSvg} alt='Close Search Icon' />
              </Typography>
            </Grid>
          )}
        </Box>

        <Box
          sx={{
            display: { xs: 'block', em: 'none' },
            position: 'fixed',
            bottom: 0,
            right: 0,
            zIndex: '9999999',
          }}
        >
          <Box sx={{ margin: '0 25px 25px 0' }} onClick={doneClick}>
            <Fab size='large' color='primary' aria-label='add'>
              <DoneIcon style={{ color: '#fff' }} />
            </Fab>
          </Box>
        </Box>
      </Grid>

      <Grid
        container
        item
        xs={12}
        em={3}
        xl={2}
        lg={2}
        sx={{
          display: { xs: 'block', em: 'none' },
          background: ThemeConstants.WHITE_COLOR,
          padding: { lg: '14px 32px 10px 15px' },
          top: { lg: '50px !important' },
        }}
      >
        <Drawer anchor='right' open={open} sx={{ zIndex: 10000 }}>
          <Box role='presentation'>
            <EcomLeftSidebar
              loading={loading}
              toggleDrawer={toggleDrawer}
              onNodeIdHandle={onNodeIdHandle}
              categoriesFilter={categoriesFilter}
            />
          </Box>
        </Drawer>
      </Grid>
    </Box>
  );
};

export default EComTopHeading;
