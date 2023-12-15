import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Box, Grid } from "@mui/material";
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import LanguageDropDown from "../../Common/LanguageDropDown";
import Logo from '../../assets/images/platform-x-logo.png';
import { Store } from "../../store/ContextStore";
import { capitalizeFirstLetter } from "../../utils/helperFunctions";
import SearchBox from "./SearchBox";
import { contentProp } from "./contentTypes/store/ContentAction";
const headerStyle = `
      .menuicon {
        width: 24px;
        flex-direction: column;
        justify-content: space-between;
        height: 16px;
        margin-right: 5px;
        cursor: pointer;
      }
      .menuicon .line {
        width: 100%;
        height: 2.5px;
        background: #89909a;
        border-radius: 3px;
      }
      .menuicon .line:nth-child(1) {
        width: 18px;
      }
      .menuicon .line:nth-child(3) {
        width: 16px;
      }
    `;
const ContentHeader = () => {
  const searchPageUrl = new URL(window.location.href);
  const [contentType, setContentType] = useState("");
  const { dispatch } = useContext(Store);
  useEffect(() => {
    setContentType(capitalizeFirstLetter(searchPageUrl?.pathname?.split('/')?.[4]))
  }, [searchPageUrl])
  const navigate = useNavigate();
  const onSearch = (inputValue) => {
    dispatch(contentProp(inputValue))
  }
  return (
    <>
      <style>{headerStyle}</style>
      <Grid
        container
        sx={{
          padding: '15px 20px',
          alignItems: 'center',
          borderBottom: '1px solid #e6eaed',
        }}
      >
        <Grid
          item
          xs={9}
          md={6}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: { xs: 'space-between', md: 'inherit' },
          }}
        >
          <Box
            className='menuicon'
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            <div className='line'></div>
            <div className='line'></div>
            <div className='line'></div>
          </Box>
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <Box
              sx={{
                display: { xs: 'flex', md: 'none' },
                marginRight: '15px !important',
              }}
              className='menuicon'
              onClick={() => {
                // setIsSideMenuOpen(true);
              }}
            >
              <div className='line'></div>
              <div className='line'></div>
              <div className='line'></div>
            </Box>
            <Box
              onClick={() => navigate('/dashboard')}
              sx={{ cursor: 'pointer', display: 'flex' }}
            >
              <img src={Logo} height='24px' />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: { xs: 'auto', md: '100%' },
            }}
          >
            <SearchBox
              contentType={contentType}
              onSearch={onSearch}
              style={{ height: '40px', minHeight: '40px', width: '100%' }}
            />
          </Box>
        </Grid>
        <Grid item xs={3} md={6}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <LanguageDropDown />
            <Box sx={{ position: 'relative', marginLeft: '10px' }}>
              <NotificationsNoneIcon />{' '}
              <Box
                sx={{
                  width: '20px',
                  height: '20px',
                  background: '#374fd5',
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                  fontSize: '12px',
                  display: 'none',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  borderRadius: '50%',
                }}
              >
                4
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
export default ContentHeader