import React, { useState } from 'react';
import useSitesMenuStyle from './SitesMenu.style';
import { Box } from '@mui/system';
import { Avatar, Typography } from '@mui/material';
import SiteDialog from './SitesPopup';
import { getFirstTwoletters } from '../../utils/helperFunctions';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const MenuSitesListdropdown = () => {
  const [isVisible, setIsVisible] = useState(false);
  const mySite = () => {
    setIsVisible(true);
  };
  let selectedSite = localStorage.getItem('selectedSite');
  if (localStorage.getItem('selectedSite')?.toLowerCase() === 'system') {
    selectedSite = 'Administrator';
  } else {
    selectedSite = localStorage.getItem('selectedSite');
  }
  const classes = useSitesMenuStyle();
  return (
    <Box>
      <Box className={`${classes.dropdowncontain} ddmenu`} onClick={mySite}>
        <Box className={classes.dropNewTypo}>
          <Avatar className={classes.UserAvatar}>
            <Typography variant='h7regular'>
              {getFirstTwoletters(selectedSite)}
            </Typography>
          </Avatar>
          <Typography
            variant='h6medium'
            className={`${classes.dropdowntypo} ddmenutex`}
          >
            {selectedSite}
          </Typography>
        </Box>
        <KeyboardArrowRightIcon sx={{ color: '#6E7191' }} />
      </Box>
      {isVisible && (
        <SiteDialog isVisible={isVisible} setIsVisible={setIsVisible} />
      )}
    </Box>
  );
};

export default MenuSitesListdropdown;
