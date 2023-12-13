import { useLazyQuery } from '@apollo/client';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import React, { KeyboardEvent, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ThemeConstants from '../../../../../libs/utilities/src/lib/themes/authoring/variable';
import { showToastError } from '../../components/toastNotification/toastNotificationReactTostify';
import {
  fetchAllPageList,
  fetchPageListAll,
} from '../../services/page/page.api';
import { setPublishedpages } from '../../store/Actions';
import { Store } from '../../store/ContextStore';
import { MenuItemProp } from './types';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export const PageLinkPopover = ({
  handleClose,
  openPageModal,
  updateMenuItems,
}) => {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(Store);
  const { page } = state;
  const [runAllFetchPageList] = useLazyQuery(fetchAllPageList);
  const [runFetchPageList] = useLazyQuery(fetchPageListAll);
  const [menuItemName, setMenuItemName] = useState('');
  const [selectedPage, setSelectedPage] = useState<MenuItemProp | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [publishedpgs, setPublishedpgs] = useState<[MenuItemProp] | []>([]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const createMenuItem = () => {
    if (menuItemName.trim().length != 0 && selectedPage != null) {
      const seletedPgDetails = {
        ...selectedPage,
        CurrentPageUrl: `${process.env.NX_PUBLISH_URI + selectedPage.Page}`,
      };
      updateMenuItems(menuItemName, seletedPgDetails, false);
      handleClose();
    }
  };

  //Page Search functionlity Start
  const handlePageSearch = async (pageSearchName) => {
    await runFetchPageList({
      variables: {
        obj: { start: 0, rows: 100 },
        type: 'PUBLISHED',
        sort: 'DESC',
        searchTerm: pageSearchName,
      },
    })
      .then((resp) => {
        const pageList = resp?.data?.authoring_pageList;
        setPublishedpgs(pageList);
      })
      .catch((err) => {
        console.log(JSON.stringify(err, null, 2));
      });
  };
  //Page Search functionlity End
  const handleKeyPress = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      const button = e.target as HTMLButtonElement;
      await handlePageSearch(button.value);
    }
  };
  useEffect(() => {
    runAllFetchPageList({
      variables: {
        obj: { start: 0, rows: 2147483647 },
        type: 'PUBLISHED',
      },
    })
      .then((resp) => {
        const pageList = resp?.data?.authoring_pageList;
        if (pageList && pageList.length) {
          dispatch(setPublishedpages(pageList));
          setPublishedpgs(pageList);
        }
      })
      .catch((err) => {
        showToastError(t('api_error_toast'));
      });
  }, []);
  return (
    <>
      <Modal
        open={openPageModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: '75%',
            padding: '10px',
            maxHeight: '100%',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <TextField
              variant="standard"
              placeholder="Search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="start">
                    {searchTerm && (
                      <CloseRoundedIcon
                        sx={{
                          cursor: 'pointer',
                          position: 'absolute',
                          right: '18px',
                          backgroundColor: '#fff',
                        }}
                        onClick={() => {
                          setPublishedpgs(page?.publishedPages);
                          setSearchTerm('');
                        }}
                      />
                    )}
                  </InputAdornment>
                ),
              }}
              value={searchTerm}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              sx={{
                width: { xs: '80%', sm: '80%', md: '50%', lg: '50%' },
                '.Platform-x-InputBase-root': {
                  height: '50px',
                  fontSize: ThemeConstants.FONTSIZE_MD,
                },
                '.Platform-x-Input-root:before': {
                  borderBottom: '2px solid #2d2d39',
                },
                '.Platform-x-Input-root:after': {
                  borderBottom: '2px solid #000000',
                },
                '.Platform-x-Input-root.Mui-disabled:before': {
                  borderBottom: '2px solid #c3c3cb',
                },
              }}
            />
            <Button
              variant="contained"
              sx={{
                marginTop: '-10px',
                alignSelf: 'flex-end',
                backgroundColor: ThemeConstants.BLACK_COLOR,
                color: ThemeConstants.WHITE_COLOR,
                '&:hover': {
                  backgroundColor: ThemeConstants.BLACK_COLOR,
                  color: ThemeConstants.WHITE_COLOR,
                },
                minWidth: '130px',
              }}
              disableElevation
              disabled
            >
              Add New
            </Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexFlow: 'row wrap',
              padding: '10px',
              overflowY: 'scroll',
              height: '400px',
            }}
          >
            {publishedpgs.length > 0
              ? publishedpgs?.map((publishedPg: MenuItemProp, index) => (
                  <Box
                    sx={{
                      maxHeight: '5rem',
                      width: '10rem',
                      border: '1px solid',
                      m: 2,
                      p: 1,
                      backgroundColor:
                        selectedPage?.Page == publishedPg.Page
                          ? 'aliceblue'
                          : 'white',
                    }}
                    key={index}
                    onClick={() => {
                      setSelectedPage(publishedPg);
                      setMenuItemName(publishedPg.Title);
                    }}
                  >
                    <Typography
                      noWrap
                      sx={{ padding: '29px 0 29px 0', textAlign: 'center' }}
                    >
                      {publishedPg.Page}
                    </Typography>
                  </Box>
                ))
              : null}
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
            }}
          >
            <p
              style={{
                backgroundColor: '#e0e0e0',
                alignSelf: 'flex-end',
                marginRight: '10px',
              }}
            >
              Only Published Page list will show
            </p>
            <TextField
              value={menuItemName}
              error={menuItemName?.length === 0}
              onChange={(e: any) => setMenuItemName(e.target.value)}
              variant="standard"
              placeholder={t('menu_item_name')}
              inputProps={{ maxLength: 15 }}
              sx={{
                padding: '0 0 5px',
                width: '40%',
                height: '1rem',
                margin: '25px',
                '.Platform-x-Input-root:after': {
                  borderBottom: '1px solid #000000',
                },
              }}
            />
            <Button
              variant="contained"
              sx={{
                marginRight: '10px',
                marginTop: '-10px',
                alignSelf: 'flex-end',
                backgroundColor: ThemeConstants.BLACK_COLOR,
                color: ThemeConstants.WHITE_COLOR,
                '&:hover': {
                  backgroundColor: ThemeConstants.BLACK_COLOR,
                  color: ThemeConstants.WHITE_COLOR,
                },
                minWidth: '130px',
              }}
              disableElevation
              onClick={createMenuItem}
            >
              Done
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
