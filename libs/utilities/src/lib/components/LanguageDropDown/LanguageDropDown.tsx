import { Check } from '@mui/icons-material';
import {
  Box,
  Fade,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import React from 'react';
import { useLanguageDropDownStyle } from './LanguageDropDown.style';
import { useNavigate } from 'react-router-dom';
import English from "../../assets/images/en_flag.png"
import German from "../../assets/images/de_flag.png"
import French from "../../assets/images/fr_flag.png"
import {
  getCurrentLang,
  getCurrentPathName,
  getSelectedSite,
} from '../../utils/helperFns';
import { LanguageList } from '../../utils/helperConstants';

const LanguageDropDown = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const classes = useLanguageDropDownStyle();
  const language =getCurrentLang()
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (val:any) => {
    handleClose();
    const selectedSite = getSelectedSite();
    if (val !== getCurrentLang()) {
      // const newPath = `${
      //   location.origin
      // }/${selectedSite}/${val}${getCurrentPathName()}`;
      // location.replace(
      //   `${location.origin}/${selectedSite}/${val}${getCurrentPathName()}`
      // );
    }
  };

  return (
    <>
      <Box className={classes.languageDropdownmenuWrapper}>
        <img
       src={
        language === 'en'
          ? English
          : language === 'de'
          ? German
          : language === 'fr'
          ? French
          : English  
      }
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          className={classes.languageDropdownmenuImg}
          onClick={handleClick}
        />
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
          className={classes.dropdownmenu1}
          PaperProps={{
            className: 'dropdownmenu',
          }}
        >
          {LanguageList().map((l: any) => {
            return (
              <MenuItem
                key={l.id}
                className={classes.dropdownmenuItem}
                onClick={() => handleLanguageChange(l.id)}
              >
                <Box className={classes.dropdownmenuItemImgWrap}>
                  <Box className={classes.dropdownmenuItemImgWrap1}>
                    <img
                      className={classes.dropdownmenuItemImg}
                      src={
                        language === 'en'
                          ? English
                          : language === 'de'
                          ? German
                          : language === 'fr'
                          ? French
                          : English  
                      }
                    />
                    
                  </Box>
                  <Typography variant="h6regular">{l.value}</Typography>
                </Box>
                <Box className={classes.dropdownmenuItemIconWrap}>
                  {getCurrentLang() === l.id && (
                    <ListItemIcon className={classes.dropdownmenuItemIcon}>
                      <Check />
                    </ListItemIcon>
                  )}
                </Box>
              </MenuItem>
            );
          })}
        </Menu>
      </Box>
    </>
  );
};
export default LanguageDropDown;
