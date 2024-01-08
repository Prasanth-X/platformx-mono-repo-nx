import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { categoryData } from '../../../Utils/Constant';

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    {...props}
  />
))(() => ({
  '& .Platform-x-Paper-root': {
    borderRadius: 8,
    minWidth: 285,
    padding: 5,
    boxShadow: 'none',
    marginTop: '17px',
    marginLeft: '-12px',
    '& .Platform-x-MenuItem-root': {
      borderRadius: '5px',
      '&:hover': {
        backgroundColor: '#F7F7FC',
      },
    },
  },
}));

export default function AllCatCta({ setCategory }) {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [selectedCategory, setSelectedCategory] = React.useState({
    Icon: categoryData[0].icon,
    title: categoryData[0].title,
    category: categoryData[0].category,
    id: categoryData[0].id,
  });
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSelectedCategory = (category) => {
    setSelectedCategory(category);
    setCategory(category);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    setSelectedCategory(selectedCategory);
  }, [selectedCategory]);

  return (
    <div>
      <Button
        className="allCatBtn"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        <Box className="allcatctabox">
          <Box className="icon">{selectedCategory.Icon}</Box>
          <Typography variant="h6regular">
            {typeof selectedCategory.Icon === 'function' &&
              t(selectedCategory.id)}
          </Typography>
        </Box>
      </Button>
      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {categoryData.map((val, index) => {
          return (
            <MenuItem
              onClick={() => {
                handleSelectedCategory(val);
                handleClose();
              }}
              key={index}
            >
              <Box className="allcatctabox">
                <Box className="icon">{val.icon}</Box>
                <Typography variant="h6regular">{t(val.id)}</Typography>
              </Box>
            </MenuItem>
          );
        })}
      </StyledMenu>
    </div>
  );
}
