import LaunchIcon from "@mui/icons-material/Launch";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import { AVATAR, PLATFORMXLOGO, XEROXAVATAR } from "../../../assets/header";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../../../service/i18n";
import {
  getCurrentLang,
  getCurrentPathName,
  getFlag,
  getHrefforAnchors,
  formRelativeURL,
  nullToObject,
  parseStringDetails,
} from "../helperFunction";
import "./Header.css";
import { useCustomStyle } from "./Header.style";
import HeaderMobile from "./HeaderMobile";
import EcomHeader from "./EcomHeader";
import LanguageDesktopView from "./LanguageHeader/LanguageDesktopView";

interface Menus {
  Label: string;
  Description: string;
  URL: string;
  Submenu: [];
  content_type_value: {
    Image: string;
    Title: string;
    Description?: string;
    RedirectionUrl?: string;
    ContentType: string;
    Internal: boolean;
    CreatedDate: string;
    Author: string;
  };
  MegaMenu?: boolean;
  Menu_Id: number;
  Internal: boolean;
  IsCurrentTab: boolean;
  menuicon: string;
}

interface IHeader {
  search: string;
  language: string;
  // HeaderLogo: string;
  userInfo: { name: string; img: string };
  Menus: Menus[];
  cta_title: string;
  cta_url: string;
  header_logo: string;
}

interface Props {
  data?: IHeader;
  homePageUrl?: string;
  logoutButtonHandle?: any;
  langCode?: string;
  isCartIconEnable?: boolean;
  isProductUpdateCount?: any;
  navigateToCartPage?: any;
  gcpUrl?: string;
  bucketName?: string;
  onLogin: () => void;
  handleChangePassword?: () => void;
  handleMyProfile?: () => void;
  isLoginEnabled: boolean;
  userData?: any;
}

const Header = ({
  homePageUrl,
  data,
  logoutButtonHandle,
  langCode,
  isCartIconEnable = true,
  isProductUpdateCount = null,
  navigateToCartPage = () => {},
  gcpUrl,
  bucketName,
  onLogin,
  isLoginEnabled = true,
  handleChangePassword,
  handleMyProfile,
  userData,
}: Props) => {
  const theme = useTheme();
  const isLogin = userData || localStorage.getItem("userLoginDetails");
  const { data: userLoginData = {} } = nullToObject(parseStringDetails(isLogin));
  const { name = "" } = nullToObject(userLoginData);

  const [currentMenu, setCurrentMenu] = useState(null);
  const [currentAnchorEl, setCurrentAnchorEl] = useState(null);
  const classes = useCustomStyle();
  // const [pageUrl, setPageUrl] = useState<any>();
  const { t, i18n } = useTranslation();
  // const url = new URL(window.location.href);
  useEffect(() => {
    if (typeof window !== "undefined") {
      i18n.changeLanguage(langCode);
    }
  }, []);
  // const language = [
  //   { text: "English (UK)", code: "en" },
  //   { text: "German", code: "de" },
  //   { text: "French", code: "fr" },
  // ];
  const langCodes = data.language.split("|");

  const language = langCodes.map((code) => {
    if (code === "en") {
      return { text: "English (UK)", code: code };
    } else if (code === "de") {
      return { text: "German", code: code };
    } else if (code === "fr") {
      return { text: "French", code: code };
    }
    return { text: "English (UK)", code: "en" };
  });

  const [anchorE2, setAnchorE2] = React.useState<null | HTMLElement>(null);

  const handleSubMenuOpen = (e: any, id: any) => {
    setCurrentMenu(id);
    setCurrentAnchorEl(e.currentTarget);
  };

  const handleSubMenuClose = () => {
    setCurrentMenu(null);
    setCurrentAnchorEl(null);
  };

  const handleOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorE2(event.currentTarget);
  };

  const openMenu = Boolean(anchorE2);
  const handleCloseMenu = () => {
    setAnchorE2(null);
  };

  const handleRedirect = (id: any, internal = false, IsCurrentTab = false) => {
    if (id && typeof window !== "undefined") {
      if (internal && IsCurrentTab) {
        window.open(homePageUrl + langCode + id, "_self");
      } else if (!internal && IsCurrentTab) {
        window.open(id, "_self");
      } else if (internal && !IsCurrentTab) {
        window.open(homePageUrl + langCode + id, "_blank");
      } else {
        const url = id.match(/^https?:/) ? id : "//" + id;
        window.open(url, "_blank");
      }
    }
  };
  const handleLanguageRedirect = (id: any) => {
    if (typeof window !== "undefined") {
      if (id !== getCurrentLang())
        location.replace(`${location.origin}/${id}${getCurrentPathName()}`);
    }
  };

  const handleContentRedirect = (urldata: any, content_type: any) => {
    if (typeof window !== "undefined") {
      const type = content_type === "VOD" ? "video" : "article/";
      if (homePageUrl) {
        window.open(`${homePageUrl}${langCode}/${type}${urldata}`);
      } else {
        window.open(`/${type}${urldata}`);
      }
    }
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleIconRedirect = () => {
    window.open(`/${getCurrentLang()}`, "_self");
  };

  return (
    <Box className={`${classes.xheader} xHeaderSectionWrapper`}>
      {/* <Fragment> */}
      <Hidden lgUp>
        <HeaderMobile
          data={data}
          isLogin={isLogin}
          handleIconRedirect={handleIconRedirect}
          handleRedirect={handleRedirect}
          // pageUrl={homePageUrl}
          language={language}
          langCode={langCode}
          handleLanguageRedirect={handleLanguageRedirect}
          logoutButtonHandle={logoutButtonHandle}
          isLoginEnabled={isLoginEnabled}
          isCartIconEnable={isCartIconEnable}
          isProductUpdateCount={isProductUpdateCount}
          navigateToCartPage={navigateToCartPage}
          gcpUrl={gcpUrl}
          bucketName={bucketName}
        />
      </Hidden>
      <Hidden lgDown>
        <AppBar position='static' className='x-header-appbar headerBackground'>
          <Box component='nav'>
            <Box className='logo'>
              <img
                src={formRelativeURL(gcpUrl, bucketName, data?.header_logo)}
                onClick={handleIconRedirect}
                alt='Logo'
                width='40px'
                height='40px'
              />
            </Box>
            <Box className='rightMenuWarp'>
              <List className='menuList'>
                {data?.Menus.map((menu: Menus, key: number) => (
                  <ListItem key={`${key}_${menu.Menu_Id}_parent`} className='menuItemList'>
                    <Button
                      href={
                        menu?.Submenu.length > 0
                          ? "#"
                          : getHrefforAnchors(menu?.URL, langCode, menu?.Internal)
                      }
                      target={menu?.IsCurrentTab ? "_self" : "_blank"}
                      component='a'
                      key={`${key}_${menu.Menu_Id}`}
                      id={`menu_${menu.Menu_Id}`}
                      className={`x-app-menu ${
                        (currentMenu ? currentMenu === menu?.Menu_Id : false) ? "active" : ""
                      }`}
                      aria-controls={
                        (currentMenu ? currentMenu === menu?.Menu_Id : false)
                          ? `submenu_${menu.Menu_Id}`
                          : undefined
                      }
                      aria-haspopup='true'
                      aria-expanded={
                        (currentMenu ? currentMenu === menu?.Menu_Id : false) ? "true" : undefined
                      }
                      endIcon={
                        menu?.Submenu.length > 0 ? (
                          (currentMenu ? currentMenu === menu?.Menu_Id : false) ? (
                            <KeyboardArrowUp />
                          ) : (
                            <KeyboardArrowDown />
                          )
                        ) : null
                      }
                      onClick={
                        menu?.Submenu.length > 0
                          ? (e) => handleSubMenuOpen(e, menu?.Menu_Id)
                          : () => {}
                      }
                      //onMouseOver={menu?.Submenu.length > 0 ? (e) => handleSubMenuOpen(e, menu?.Menu_Id) : () => {}}
                    >
                      <Typography component='span' variant='h6regular' className='my0'>
                        {menu?.Label}
                      </Typography>
                    </Button>

                    {menu.Submenu.length > 0 && (
                      <Menu
                        id={`submenu_${menu.Menu_Id}`}
                        className={`menu_class ${classes.headerPopupMenu} xHeaderPopupMenuWrapper`}
                        anchorEl={currentAnchorEl}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                        open={Boolean(currentMenu && currentMenu === menu?.Menu_Id)}
                        onClose={handleSubMenuClose}
                        MenuListProps={{
                          "aria-labelledby": `menu_${menu.Menu_Id}`,
                          className: "firstUlWrapper",
                        }}
                        PaperProps={{
                          className: "xHeaderPopupCardWrapper",
                          elevation: 0,
                        }}>
                        <List className='popupMenuList'>
                          {menu.Submenu.length > 0 &&
                            menu.Submenu.map((submenu: Menus, subkey: number) => (
                              <ListItem
                                className='popupMenuListItems'
                                sx={{
                                  margin: menu.Submenu.length === subkey + 1 ? "0" : "0 0 10px 0",
                                }}
                                key={subkey}
                                // onClick={() =>
                                //   handleRedirect(
                                //     submenu?.URL,
                                //     submenu?.Internal,
                                //     submenu.IsCurrentTab
                                //   )
                                // }
                              >
                                <ListItemButton
                                  component='a'
                                  href={getHrefforAnchors(
                                    submenu?.URL,
                                    langCode,
                                    submenu?.Internal,
                                  )}
                                  target={submenu.IsCurrentTab ? "_self" : "_blank"}>
                                  <ListItemAvatar className='iconGapRight'>
                                    <Avatar className='avatarbox'>
                                      <img
                                        src={submenu.menuicon}
                                        alt='menuicon'
                                        width='24px'
                                        height='24px'
                                      />
                                    </Avatar>
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={
                                      <Fragment>
                                        <Typography
                                          variant='h6medium'
                                          className={`menu-submenu-link submenuTitle`}>
                                          {submenu.Label}
                                        </Typography>
                                        {!submenu.Internal && (
                                          <IconButton
                                            edge='end'
                                            aria-label='launch'
                                            className='externalLinkIcon'>
                                            <LaunchIcon className='iconLaunch' />
                                          </IconButton>
                                        )}
                                      </Fragment>
                                    }
                                    secondary={submenu.Description}
                                    secondaryTypographyProps={{
                                      variant: "h6medium",
                                      color: theme.palette.prelemType1.TITLE,
                                    }}
                                  />
                                </ListItemButton>
                              </ListItem>
                            ))}
                        </List>
                        {menu.content_type_value &&
                          menu.content_type_value.Title &&
                          menu.content_type_value.Image &&
                          menu.content_type_value.RedirectionUrl &&
                          Object.keys(menu.content_type_value).length !== 0 && (
                            <Fragment>
                              <Divider orientation='vertical' className='menuVerticalDivider' />
                              <Card
                                className='subMenuCards'
                                onClick={() =>
                                  handleContentRedirect(
                                    menu.content_type_value.RedirectionUrl,
                                    menu.content_type_value.ContentType,
                                  )
                                }>
                                <CardMedia
                                  image={menu.content_type_value?.Image}
                                  title='card'
                                  className='subMenuCardsMedia'
                                />
                                <CardContent
                                  style={{
                                    paddingBottom: menu.content_type_value?.Description
                                      ? "16px"
                                      : "11px",
                                  }}>
                                  <Typography
                                    gutterBottom
                                    variant='h6medium'
                                    component='div'
                                    className='doublebr'>
                                    {menu.content_type_value?.Title}
                                  </Typography>
                                  {menu.content_type_value?.Description && (
                                    <Typography
                                      variant='p3regular'
                                      color='headerParagraphColor'
                                      className='singlebr single-item'
                                      dangerouslySetInnerHTML={{
                                        __html: menu.content_type_value?.Description || "",
                                      }}></Typography>
                                  )}
                                </CardContent>
                              </Card>
                            </Fragment>
                          )}
                      </Menu>
                    )}
                  </ListItem>
                ))}
              </List>
              <Box className='rightMenuButtonWrapper'>
                {data?.search === "true" && (
                  <IconButton
                    size='large'
                    className='hovernone'
                    aria-label='show 4 new mails'
                    color='inherit'>
                    <SearchIcon />
                  </IconButton>
                )}
                {/* ecom page header */}
                <EcomHeader
                  isCartIconEnable={isCartIconEnable}
                  navigateToCartPage={navigateToCartPage}
                  isProductUpdateCount={isProductUpdateCount}
                />

                <IconButton
                  onClick={handleClick}
                  size='large'
                  className='hovernone iconFlag header-space-between-items'
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup='true'
                  aria-expanded={open ? "true" : undefined}>
                  <Box className='headerFlagIcon'>
                    <img alt='flagicon' src={getFlag()} width='24px' height='24px' />
                  </Box>
                </IconButton>

                {Object.keys(nullToObject(userLoginData)).length > 0 ? (
                  <>
                    <Box className='authWrapper'>
                      <img
                        alt='loginavatar'
                        src={AVATAR}
                        width='30'
                        height='30'
                        onClick={handleOpen}
                      />
                      <Typography
                        style={{ whiteSpace: "nowrap" }}
                        color='headerParagraphColor'
                        ml={2}>
                        {name}
                      </Typography>

                      <Menu anchorEl={anchorE2} open={openMenu} onClose={handleCloseMenu}>
                        <MenuItem disableRipple onClick={handleChangePassword}>
                          {t("change_password")}
                        </MenuItem>
                        <MenuItem disableRipple onClick={handleMyProfile}>
                          {t("my_profile")}
                        </MenuItem>
                        <MenuItem disableRipple onClick={logoutButtonHandle}>
                          {t("logout_text")}
                        </MenuItem>
                      </Menu>
                    </Box>
                  </>
                ) : isLoginEnabled ? (
                  <Button
                    variant='primaryButton2'
                    className='header-button primaryButton2 sm'
                    onClick={onLogin}>
                    {data?.cta_title}
                  </Button>
                ) : null}
              </Box>
              <LanguageDesktopView
                open={open}
                language={language}
                anchorEl={anchorEl}
                handleClose={handleClose}
                handleLanguageRedirect={handleLanguageRedirect}
              />
            </Box>
          </Box>
        </AppBar>
      </Hidden>
      {/* </Fragment> */}
    </Box>
  );
};

Header.defaultProps = {
  isAuthoring: false,
  data: {
    HeaderLogo: PLATFORMXLOGO,
    cta_title: "Enquire Now",
    cta_url: "/request-demo", //"/get-started",
    userInfo: {
      name: "Natasha Jones",
      img: XEROXAVATAR,
    },
    language: "en|fr|de",
    search: "false",
    header_logo: PLATFORMXLOGO,
    Menus: [
      {
        Menu_Id: 1,
        Label: "About",
        URL: "/Prelem1",
        Internal: true,
        Submenu: [],
        content_type_value: {},
        IsCurrentTab: true,
      },
      {
        Menu_Id: 2,
        Label: "Product",
        URL: "/Prelem2",
        Internal: true,
        IsCurrentTab: true,
        Submenu: [
          {
            Menu_Id: 1,
            Label: "SubMenu 1",
            URL: "/Prelem3",
            Internal: true,
            Submenu: [],
            menuicon:
              "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/d3741c24-050a-41c5-8732-02aa7fafe06b/content",
          },
          {
            Menu_Id: 2,
            Label: "SubMenu 2",
            URL: "/Prelem4",
            Internal: true,
            Submenu: [],
            content_type_value: {
              Author: "nancy",
              ContentType: "VOD",
              CreatedDate: "2022-12-27",
              Description: "It will be checked Weather he is using right raw materials.",
              Image:
                "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/0d907872-85b2-4e63-9b5c-1eff2d278af5/content",
              Title: "WHY IT'S NOT ALL ABOUT NUMBERS FOR BRUNO",
              RedirectionUrl: "/gulf21222",
            },
            menuicon:
              "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/d3741c24-050a-41c5-8732-02aa7fafe06b/content",
          },
        ],
        content_type_value: {},
      },
      {
        Menu_Id: 3,
        Label: "Features",
        URL: "/Prelem3",
        Internal: false,
        IsCurrentTab: true,
        content_type_value: {
          Author: "nancy",
          ContentType: "Article",
          CreatedDate: "2022-12-27",
          Description: `The tech industry has grown ever more rich off big ideas that were developed more than a decade ago. New things like quantum computing and self-driving cars could take a while.`,
          Image:
            "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/4757a006-bc2e-46c3-8c76-ed3e75d84cd3/content",
          Title: "Tata Tiago EV electric car",
          RedirectionUrl: "article-2-for-delete",
        },
        Submenu: [
          {
            Menu_Id: 1,
            Label: "Feature Detail",
            URL: "/Prelem3",
            Submenu: [],
            Internal: true,
            Title: "Lorem ipsum dolor sit amet 6",
            Description: "",
            menuicon:
              "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/593c5178-70ce-435c-8e1d-9794bb22d9ac/content",
          },
          {
            Menu_Id: 2,
            Label: "SubMenu 4",
            URL: "/Prelem4",
            Submenu: [],
            Internal: true,
            Title: "Lorem ipsum dolor sit amet 6",
            Description: "",
            menuicon:
              "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/593c5178-70ce-435c-8e1d-9794bb22d9ac/content",
          },
        ],
      },
      {
        Menu_Id: 4,
        Label: "Testimonials",
        URL: "Prelem4",
        Internal: true,
        Submenu: [],
        content_type_value: {},
      },
      {
        Menu_Id: 5,
        Label: "Pricing",
        URL: "Prelem5",
        Internal: true,
        content_type_value: {
          Author: "nancy",
          ContentType: "VOD",
          CreatedDate: "2022-12-27",
          Description: "It will be checked Weather he is using right raw materials.",
          Image:
            "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/0d907872-85b2-4e63-9b5c-1eff2d278af5/content",
          Title: "WHY IT'S NOT ALL ABOUT NUMBERS FOR BRUNO",
          RedirectionUrl: "/gulf21222",
        },
        Submenu: [
          {
            Menu_Id: 1,
            Label: "SubMenu 3",
            URL: "/Prelem3",
            Submenu: [],
            Internal: false,
            Title: "Lorem ipsum dolor sit amet 6",
            Description: "Lorem ipsum dolor sit amet, consectetur adipiscing",
            menuicon:
              "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/593c5178-70ce-435c-8e1d-9794bb22d9ac/content",
          },
          {
            Menu_Id: 2,
            Label: "SubMenu 4",
            URL: "/Prelem4",
            Submenu: [],
            Internal: false,
            Title: "Lorem ipsum dolor sit amet 6",
            Description: "Lorem ipsum dolor sit amet, consectetur adipiscing",
            menuicon:
              "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/593c5178-70ce-435c-8e1d-9794bb22d9ac/content",
          },
          {
            Menu_Id: 3,
            Label: "SubMenu 5",
            URL: "/Prelem5",
            Submenu: [],
            Internal: true,
            Title: "Lorem ipsum dolor sit amet 6",
            Description: "Lorem ipsum dolor sit amet, consectetur adipiscing",
            menuicon:
              "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/593c5178-70ce-435c-8e1d-9794bb22d9ac/content",
          },
        ],
      },
      {
        Menu_Id: 6,
        Label: "Support",
        Internal: true,
        URL: "Prelem6",
        content_type_value: {
          Author: "nancy",
          ContentType: "Article",
          CreatedDate: "2022-12-27",
          Description: `The Tata Tiago EV hatchback is India's<blockquote>The Tata Tiago EV comes with two battery pack options i.e., 19.2 kWh and 24 kWh. The smaller of the two battery packs is available with the XE and XT&nbsp;</blockquote><div><br></div><img style="display:block;object-fit:cover" alt="descItem" class="descAsset" src="https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/a56b5f69-17ad-433d-a350-5f184e77cdb3/content"><br>t is available in five&nbsp;<a target="_blank" href="https://www.google.com">colour</a>&nbsp;options <br>`,
          Image:
            "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/4757a006-bc2e-46c3-8c76-ed3e75d84cd3/content",
          Title: "Tata Tiago EV electric car",
          RedirectionUrl: "article-2-for-delete",
        },
        Submenu: [
          {
            Menu_Id: 1,
            Label: "SubMenu 3",
            URL: "/Prelem3",
            Submenu: [],
            Internal: true,
            Title: "Lorem ipsum dolor sit amet 6",
            Description: "",
            menuicon:
              "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/593c5178-70ce-435c-8e1d-9794bb22d9ac/content",
          },
          {
            Menu_Id: 2,
            Label: "SubMenu 4",
            URL: "/Prelem4",
            Submenu: [],
            Internal: true,
            Title: "Lorem ipsum dolor sit amet 6",
            Description: "",
            menuicon:
              "https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/593c5178-70ce-435c-8e1d-9794bb22d9ac/content",
          },
        ],
      },
    ],
  },
};

export default Header;
