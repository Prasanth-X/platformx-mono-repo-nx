import DoneIcon from '@mui/icons-material/Done';
import { Drawer, Fab, Grid, Grow, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ThemeConstants from '../../../../../../../libs/utilities/src/lib/themes/authoring/variable';
import EcomSearchBox from '../../../EcommerceAuthoring/EcomSearchBox';
const MobileMenuIconSvg = require('../../../../assets/svg') as string;
const SearchBlackSvg = require('../../../../assets/svg') as string;
const CloseSearchSvg = require('../../../../assets/svg') as string;

import CtaEditAndDone from '../../../../ecommerceComponents/CtaEditAndDone/CtaEditAndDone';
import DamContentLeftSidebar from './DamContentLeftSidebar';
import DamContentSearchBox from './DamContentSearchBox';
import './DamContentTopHeading.css';

type damcontentTopHeadingprops = {
  loading?: boolean;
  onSearch?: any;
  doneClick?: any;
  cancelClick?: any;
  inputValue?: string;
  onNodeIdHandle?: any;
  categoriesFilter?: any;
  setInputValueHandle?: any;
};

const DamContentTopHeading = (_props: damcontentTopHeadingprops) => {
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
      className="damcontent-topbar"
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
            borderBottom: '1px solid',
            borderColor: ThemeConstants.DIVIDER_COLOR,
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
            paddingBottom: { xs: '10px', sm: '10px', lg: '5px' },
          }}
        >
          <Typography
            variant="h4bold"
            sx={{
              fontSize: ThemeConstants.FONTSIZE_H3,
              fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
              fontFamily: ThemeConstants.PRIMARY_FONT_FAMILY,
              color: ThemeConstants.BLACK_COLOR,
              padding: '0 0 10px 0px',
              textTransform: 'capitalize',
            }}
          >
            {t('prelem_choose_content')}
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          em={6}
          lg={6}
          sx={{
            paddingTop: '5px',
            paddingBottom: { xs: '20px', sm: '20px', display: 'flex' },
          }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            em={8}
            lg={8}
            sx={{ margin: '0px auto' }}
            className="searchWrapper"
          >
            <DamContentSearchBox
              onSearch={onSearch}
              inputValue={inputValue}
              setInputValueHandle={setInputValueHandle}
              style={{
                height: '47px',
                minHeight: '47px',
                width: '100%',
                backgroundColor: ThemeConstants.LIGHT_GRAY_COLOR,
                borderRadius: '8px',
              }}
            />
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          em={3}
          lg={3}
          container
          spacing={0}
          direction="column"
          alignItems="end"
          justifyContent="end"
          sx={{ margin: '0 0 1.25rem 0', display: 'flex' }}
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
          className="fixed-screen-inner"
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
                    <Typography variant="h4medium">
                      {t('prelem_choose_content')}
                    </Typography>
                  </Grid>
                </Box>
              </Grow>

              <Grid item className="icon-container">
                <Typography
                  className="top-icons right-search-icon"
                  sx={{
                    fontSize: ThemeConstants.FONTSIZE_LG,
                  }}
                  onClick={searchToggle}
                >
                  <SearchBlackSvg />
                </Typography>

                <Typography
                  className="top-icons"
                  sx={{
                    fontSize: ThemeConstants.FONTSIZE_LG,
                  }}
                  onClick={toggleDrawer}
                >
                  <MobileMenuIconSvg />
                </Typography>
              </Grid>
            </>
          ) : (
            <Grid item className="search-item-container small-device">
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
                className="icon-inside-search"
                sx={{
                  fontSize: ThemeConstants.FONTSIZE_LG,
                }}
                onClick={searchCloseToggle}
              >
                <CloseSearchSvg />
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
            <Fab size="large" color="primary" aria-label="add">
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
        <Drawer anchor="right" open={open}>
          <Box role="presentation">
            <DamContentLeftSidebar
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

export default DamContentTopHeading;
