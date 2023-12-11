import MenuIcon from "@mui/icons-material/Menu";
// import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Box,
  Button,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { Fragment } from "react";
//import AccountCircle from '@mui/icons-material/AccountCircle';
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTranslation } from "react-i18next";
// import { formRelativeURL } from "../../utils/helperFunction";
import {
  getFlag,
  getHrefforAnchors,
  nullToObject,
  parseStringDetails,
  formRelativeURL,
} from "../helperFunction";
import "./Header.css";
import EcomHeader from "./EcomHeader";
import LanguageMobileView from "./LanguageHeader/LanguageMobileView";
import { useCustomStyle } from "./HeaderMobile.style";

const HeaderMobile = ({
  isLogin,
  data,
  handleIconRedirect,
  handleRedirect,
  // pageUrl,
  language,
  langCode,
  handleLanguageRedirect,
  logoutButtonHandle,
  isCartIconEnable = true,
  isProductUpdateCount = null,
  navigateToCartPage = () => {},
  gcpUrl,
  bucketName,
  isLoginEnabled,
}: any) => {
  const { data: userLoginData = {} } = nullToObject(parseStringDetails(isLogin));

  const classes = useCustomStyle();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [currentMenuID, setCurrentMenuID] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(false);
  const { t } = useTranslation();
  // const classes = useCustomStyle();

  const handleClick = (e: any, id: any) => {
    e.stopPropagation();
    if (currentMenuID === id) {
      setCurrentMenuID(0);
    } else {
      setCurrentMenuID(id);
    }
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} className={`${classes.xMobileheader} xMobileHeaderWrapper`}>
      <Box className='xMobileTopSection'>
        <img
          src={formRelativeURL(gcpUrl, bucketName, data?.header_logo)}
          onClick={handleIconRedirect}
          style={{ cursor: "pointer" }}
          alt='Logo'
          width='auto'
          height='30'
        />
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant='h4medium' className='menuCloseIcon'>
          {t("close_text")}
        </Typography>
      </Box>
      <Divider />
      <List>
        {/* {data?.userInfo && (
          <ListItem>
            <ListItemButton sx={{ p: 0 }}>
              <ListItemIcon sx={{ minWidth: "fit-content", mr: "10px" }}>
                <img
                  src={data?.userInfo?.img}
                  alt="Logo"
                  width="20"
                  height="20"
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="h4bold">
                    {data?.userInfo?.name}
                  </Typography>
                }
              ></ListItemText>
            </ListItemButton>
          </ListItem>
        )} */}
        {/* {authData?.code == "200" && authData?.data?.first_name ? (
          <ListItem style={{ justifyContent: "center" }}> */}
        {/* <ListItemButton sx={{ textAlign: 'center' }}> */}

        {/* <ListItemText primary={ */}
        {/* <>
          <Avatar src={AVATAR} />
          <Typography variant="h4medium" sx={{ paddingLeft: "10px" }}>
            {authData?.data?.first_name}
          </Typography>
        </> */}
        {/* } >
              </ListItemText> */}
        {/* { menu.Submenu.length > 0 && ( (currentMenuID > 0 && currentMenuID === menu.Menu_Id) ? <ExpandLess /> : <ExpandMore />)} */}
        {/* </ListItemButton> */}
        {/* </ListItem>
        ) : (
          <></>
        )} */}
        {data?.Menus.map((menu: any, key: any) => (
          <Fragment key={`${key}_parent`}>
            <ListItem
              className='menuListWrapper'
              key={key}
              disablePadding
              onClick={menu.Submenu.length > 0 ? (e) => handleClick(e, menu.Menu_Id) : () => {}}>
              <ListItemButton
                component='a'
                href={
                  menu?.Submenu.length > 0
                    ? "#"
                    : getHrefforAnchors(menu?.URL, langCode, menu?.Internal)
                }
                target={menu?.IsCurrentTab ? "_self" : "_blank"}
                className='listButtonItemGap'>
                <ListItemText
                  className='listButtonTextGap'
                  primary={
                    <Typography variant='h4medium' component='a'>
                      {menu.Label}
                    </Typography>
                  }></ListItemText>
                {menu.Submenu.length > 0 &&
                  (currentMenuID > 0 && currentMenuID === menu.Menu_Id ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  ))}
              </ListItemButton>
            </ListItem>
            {menu.Submenu.length > 0 && (
              <Collapse
                in={currentMenuID > 0 && currentMenuID === menu.Menu_Id}
                timeout='auto'
                unmountOnExit>
                <List component='div' disablePadding>
                  {menu.Submenu.map((submenu: any, subkey: any) => (
                    <ListItemButton
                      key={subkey}
                      component='a'
                      href={getHrefforAnchors(submenu?.URL, langCode, submenu?.Internal)}
                      target={submenu.IsCurrentTab ? "_self" : "_blank"}
                      className='menu-submenu-link alignSubMenuItem'
                      // onClick={() =>
                      //   handleRedirect(
                      //     submenu?.URL,
                      //     submenu?.Internal,
                      //     submenu.IsCurrentTab
                      //   )
                      // }
                    >
                      <ListItemText
                        className='alignSubMenuText'
                        primary={
                          <Typography variant='h5medium'>{submenu.Label}</Typography>
                        }></ListItemText>
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </Fragment>
        ))}
        <ListItem style={{ justifyContent: "center" }}>
          {Object.keys(nullToObject(userLoginData)).length > 0 ? (
            <Button variant='outlined' className='btnOutlined' onClick={logoutButtonHandle}>
              <Typography variant='h4medium'>{t("logout_text")}</Typography>
            </Button>
          ) : isLoginEnabled ? (
            <Button
              variant='outlined'
              sx={{
                whiteSpace: "nowrap",
                mr: "20px",
                color: "#000000",
                width: "200px",
                textTransform: "none",
              }}
              onClick={() => handleRedirect(data?.cta_url, true, true)}>
              <Typography variant='h4medium'>{data?.cta_title}</Typography>
            </Button>
          ) : null}
        </ListItem>
        {/* <ListItem style={{ justifyContent: 'center' }}>
          <Button variant="outlined" sx={{ whiteSpace: 'nowrap', mr: '20px', color: '#000000', width: '200px', textTransform: 'none' }} onClick={() => handleRedirect(data?.CTA_URL, true)}>
            <Typography variant='h4medium'>Login</Typography>
          </Button>
        </ListItem> */}
        {/* <ListItem style={{ justifyContent: 'center' }}>
          <Button variant="contained" sx={{ mr: '20px', width: '200px', backgroundColor: '#2d2d39' }} onClick={() => handleRedirect(data?.CTA_URL, true)}>
            <Typography variant='h4medium'>{data?.CTA_Text}</Typography>
          </Button>
        </ListItem> */}
      </List>
    </Box>
  );

  return (
    <Fragment>
      <AppBar
        position='static'
        className={`x-header-appbar mobile-header headerBackground ${classes.xMobileheaderTopSection} mobileHeaderTop`}>
        <Toolbar className='headerTopToolbar'>
          <img
            src={formRelativeURL(gcpUrl, bucketName, data?.header_logo)}
            onClick={handleIconRedirect}
            className='pointer'
            alt='Logo'
            width='auto'
            height='30'
          />
          <Box className='toolbarInnerWrapper' />
          {/* <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <SearchIcon />
          </IconButton> */}
          <Box onClick={() => setIsOpen(true)} className='ecommercePanel'>
            {/* ecom page header */}
            <EcomHeader
              isCartIconEnable={isCartIconEnable}
              navigateToCartPage={navigateToCartPage}
              isProductUpdateCount={isProductUpdateCount}
            />
          </Box>

          <Box onClick={() => setIsOpen(true)} className='headerFlagIcon'>
            <img src={getFlag()} alt='flagimage' width='24px' height='24px' />
          </Box>
          {/* <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Avatar src={UnitedImage} />
          </IconButton> */}
          <IconButton
            size='large'
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleDrawerToggle}
            className='menuIcon'>
            <MenuIcon />
          </IconButton>
        </Toolbar>

        {/* language choose */}
        <LanguageMobileView
          language={language}
          isOpen={isOpen}
          handleClose={handleClose}
          handleLanguageRedirect={handleLanguageRedirect}
        />
      </AppBar>
      <Drawer
        variant='temporary'
        anchor='top'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}>
        {drawer}
      </Drawer>
    </Fragment>
  );
};

export default HeaderMobile;
