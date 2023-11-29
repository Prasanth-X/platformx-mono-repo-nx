import DoneIcon from "@mui/icons-material/Done";
import { Box, ListItemIcon, Menu, MenuItem } from "@mui/material";
import React from "react";
import { getCurrentLang, getFlag } from "../../helperFunction";
import { useCustomStyle } from "./LanguageView.style";

interface LanguageDesktopViewProps {
  open: boolean;
  language: Array<any>;
  anchorEl: any;
  handleClose: any;
  handleLanguageRedirect: any;
}

const LanguageDesktopView = (props: LanguageDesktopViewProps) => {
  const classes = useCustomStyle();
  const {
    open = false,
    language = [],
    anchorEl = null,
    handleClose = () => {},
    handleLanguageRedirect = () => {},
  } = props;

  return (
    <Menu
      anchorEl={anchorEl}
      id='account-menu'
      open={open}
      onClose={handleClose}
      className={`languageMenu_class ${classes.languageViewWrapper} languageViewWrapperDesktop`}
      // onClick={handleClose}
      PaperProps={{
        className: "languageDesktopView",
        elevation: 0,
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
      {language.map((value, index) => {
        return (
          <MenuItem onClick={() => handleLanguageRedirect(value?.code)} key={index}>
            <ListItemIcon>
              <Box className='headerFlagIcon'>
                <img alt='flagnew' src={getFlag(value?.code)} width='24px' height='24px' />
              </Box>
            </ListItemIcon>
            {value?.text}
            {value?.code === getCurrentLang() ? ( //pageUrl?.pathname.split("/")[1]
              <ListItemIcon>
                <DoneIcon fontSize='small' className='gapLeft' />
              </ListItemIcon>
            ) : null}
          </MenuItem>
        );
      })}
    </Menu>
  );
};

export default LanguageDesktopView;
