import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import { CSSObject, styled, Theme } from '@mui/material/styles';
import { MiniHeader, PlatXLogo } from '@platformx/utilities';
import { useNavigate } from 'react-router-dom';
import './LeftSideBar.css';
import { useStyles } from './LeftSidebar.styles';
import MenuList from './MenuList';
const DrawerWidth = 250;
const openedMixin = (theme: Theme): CSSObject => ({
  width: DrawerWidth,
  [theme.breakpoints.down('sm')]: {
    width: '0px',
  },
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: DrawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .Platform-x-Drawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .Platform-x-Drawer-paper': closedMixin(theme),
  }),
}));

export default function LeftSideBar({
  open,
  handleDrawerOpen,
  handleMenuAction,
  className,
}) {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <Box sx={{ display: 'flex' }} className={className}>
      <Drawer variant="permanent" open={open}>
        <Box className="mainBox">
          <Box>
            <Box className={classes.logoContainer}>
              <img
                src={PlatXLogo}
                alt="logo"
                className={classes.logo}
                onClick={() => navigate('/dashboard')}
              />
              <Box className={classes.closeIcon}>
                <CloseIcon onClick={handleDrawerOpen} />
              </Box>
            </Box>
            <MenuList
              open={open}
              handleMenuclose={handleDrawerOpen}
              handleMenuAction={handleMenuAction}
            />
          </Box>
          <Box className="auth">
            <MiniHeader />
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
