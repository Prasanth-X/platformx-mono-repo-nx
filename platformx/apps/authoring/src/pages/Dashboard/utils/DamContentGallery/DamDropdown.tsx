import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box } from '@mui/system';
import './DamDropdown.css';

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 5,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function DamDropdown( {setTagArray}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    setTagArray(pre=> [...pre,event.target.innerText])
    setAnchorEl(null);
  };
 

  return (
    <>
    <Box sx={{
    }}>
          <Button className='dropdown-btn'
              id="demo-customized-button"
              aria-controls={open ? 'demo-customized-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              variant="contained"
              disableElevation
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
          >
              Content Type
          </Button>
          <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                  'aria-labelledby': 'demo-customized-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
          >
              <MenuItem onClick={handleClose} disableRipple defaultValue={'tag1'}>
                  Tag 1
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
                  Tag 2
              </MenuItem>
              {/* <Divider sx={{ my: 0.5 }} /> */}
              <MenuItem onClick={handleClose} disableRipple>
                  Tag 3
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
                  Tag 4
              </MenuItem>
          </StyledMenu>
      </Box>
      <Box sx={{
        marginLeft: '4px'
      }}>
              <Button className='dropdown-btn'
                  id="demo-customized-button"
                  aria-controls={open ? 'demo-customized-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  variant="contained"
                  disableElevation
                  onClick={handleClick}
                  endIcon={<KeyboardArrowDownIcon />}
              >
                  Sports
              </Button>
              <StyledMenu
                  id="demo-customized-menu"
                  MenuListProps={{
                      'aria-labelledby': 'demo-customized-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
              >
                  <MenuItem onClick={handleClose} disableRipple>
                      Tag 1
                  </MenuItem>
                  <MenuItem onClick={handleClose} disableRipple>
                      Tag 2
                  </MenuItem>
                  {/* <Divider sx={{ my: 0.5 }} /> */}
                  <MenuItem onClick={handleClose} disableRipple>
                      Tag 3
                  </MenuItem>
                  <MenuItem onClick={handleClose} disableRipple>
                      Tag 4
                  </MenuItem>
              </StyledMenu>
          </Box>
          <Box sx={{
            marginLeft: '8px'
          }}>
              <Button className='dropdown-btn'
                  id="demo-customized-button"
                  aria-controls={open ? 'demo-customized-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  variant="contained"
                  disableElevation
                  onClick={handleClick}
                  endIcon={<KeyboardArrowDownIcon />}
              >
                  Fashion
              </Button>
              <StyledMenu
                  id="demo-customized-menu"
                  MenuListProps={{
                      'aria-labelledby': 'demo-customized-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
              >
                  <MenuItem onClick={handleClose} disableRipple>
                      Tag 1
                  </MenuItem>
                  <MenuItem onClick={handleClose} disableRipple>
                      Tag 2
                  </MenuItem>
                  {/* <Divider sx={{ my: 0.5 }} /> */}
                  <MenuItem onClick={handleClose} disableRipple>
                      Tag 3
                  </MenuItem>
                  <MenuItem onClick={handleClose} disableRipple>
                      Tag 4
                  </MenuItem>
              </StyledMenu>
          </Box>
          <Box sx={{
            marginLeft: '8px'
          }}>
              <Button className='dropdown-btn'
                  id="demo-customized-button"
                  aria-controls={open ? 'demo-customized-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  variant="contained"
                  disableElevation
                  onClick={handleClick}
                  endIcon={<KeyboardArrowDownIcon />}
              >
                  LifeStyle
              </Button>
              <StyledMenu
                  id="demo-customized-menu"
                  MenuListProps={{
                      'aria-labelledby': 'demo-customized-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
              >
                  <MenuItem onClick={handleClose} disableRipple>
                     
                      Tag 1
                  </MenuItem>
                  <MenuItem onClick={handleClose} disableRipple>
                 
                      Tag 2
                  </MenuItem>
                  {/* <Divider sx={{ my: 0.5 }} /> */}
                  <MenuItem onClick={handleClose} disableRipple>
             
                      Tag 3
                  </MenuItem>
                  <MenuItem onClick={handleClose} disableRipple>
                  
                      Tag 4
                  </MenuItem>
              </StyledMenu>
          </Box>
          </>
  );
}