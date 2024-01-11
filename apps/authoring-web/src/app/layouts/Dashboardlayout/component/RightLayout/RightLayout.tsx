import { styled } from '@mui/material/styles';
const DrawerWidth = 250;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
  isSideBar?: boolean;
}>(({ theme, open, isSideBar }) => ({
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(!open && {
    ...(isSideBar
      ? {
          [theme.breakpoints.up('sm')]: {
            marginLeft: '65px',
            width: 'calc(100% - 65px)',
          },
        }
      : {
          [theme.breakpoints.up('sm')]: {
            marginLeft: '0',
            width: '100%',
          },
        }),
  }),
  ...(open && {
    marginLeft: DrawerWidth,
    width: `calc(100% - ${DrawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    // [theme.breakpoints.down('sm')]: {
    //   width: '100%',
    //   marginLeft: '0px',
    // },
  }),
}));

const RightLayout = ({ open, children, isSideBar }) => {
  return (
    <Main open={open} isSideBar={isSideBar}>
      {children}
    </Main>
  );
};

export default RightLayout;
