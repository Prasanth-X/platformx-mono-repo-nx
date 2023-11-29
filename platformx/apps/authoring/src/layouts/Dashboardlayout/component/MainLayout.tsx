import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header/Header';
import LeftSideBar from './LeftSidebar/LeftSideBar';
import RightLayout from './RightLayout/RightLayout';

type MainLayoutProps = {
  children: React.ReactNode;
  isHeader?: boolean;
  isSideBar?: boolean;
  hasSearch?: boolean;
  hasLogo?: boolean;
};
export default function MainLayout({
  children,
  isHeader = true,
  isSideBar = true,
  hasSearch = true,
  hasLogo = false,
}: MainLayoutProps) {
  const [open, setOpen] = React.useState(true);
  const location = useLocation();
  const theme = useTheme();
  const pageUrl = new URL(window.location.href);
  const [menuItemSelected, setMenuItemSelected] = React.useState('menu');
  const handleDrawerOpen = () => {
    isSideBar && setOpen(!open);
  };
  const ifTab = useMediaQuery(theme.breakpoints.up('md'));

  const getBreakPoint = () => {
    return pageUrl.pathname.split('/')[3] === 'navtree' ? ifTab : isHeader;

    // return ifTab && true && isHeader;
  };
  const handleMenuAction = (menu) => {
    setMenuItemSelected(menu);
  };
  const renderLayout = () => {
    const noLayoutRoute = ['site-setting'];
    if (
      noLayoutRoute.some((routeName) => location.pathname.includes(routeName))
    ) {
      return <>{children}</>;
    } else {
      return (
        <>
          {getBreakPoint() && (
            <Header
              open={isSideBar ? open : isSideBar}
              handleDrawerOpen={handleDrawerOpen}
              isSideBar={isSideBar}
              hasSearch={hasSearch}
              hasLogo={hasLogo}
              menuItemSelected={menuItemSelected}
            />
          )}
          {isSideBar && (
            <LeftSideBar
              className={open ? '' : 'openSideBar'}
              open={open}
              handleDrawerOpen={handleDrawerOpen}
              handleMenuAction={handleMenuAction}
            />
          )}
          <RightLayout
            open={isSideBar ? open : isSideBar}
            isSideBar={isSideBar}
          >
            {children}
          </RightLayout>
        </>
      );
    }
  };

  return renderLayout();

  {
    /* {isHeader && (
        <Header
          open={isSideBar ? open : isSideBar}
          handleDrawerOpen={handleDrawerOpen}
          isSideBar={isSideBar}
        />
      )}
      {isSideBar && (
        <LeftSideBar open={open} handleDrawerOpen={handleDrawerOpen} />
      )}
      <RightLayout open={isSideBar ? open : isSideBar} isSideBar={isSideBar}>
        {children}
      </RightLayout> */
  }
}
