import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  RootState,
  handleCancel,
  handleConfirm,
} from '@platformx/authoring-state';
import { XDialog } from '@platformx/utilities';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Header from './Header/Header';
import LeftSideBar from './LeftSidebar/LeftSideBar';
import RightLayout from './RightLayout/RightLayout';

type LayoutWrapperProps = {
  children: React.ReactNode;
  isHeader?: boolean;
  isSideBar?: boolean;
  hasSearch?: boolean;
  hasLogo?: boolean;
};

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({
  children,
  isHeader = true,
  isSideBar = true,
  hasSearch = true,
  hasLogo = false,
}: LayoutWrapperProps) => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const theme = useTheme();
  const pageUrl = new URL(window.location.href);
  const [menuItemSelected, setMenuItemSelected] = useState('menu');
  const { isOpen, dialogProps } = useSelector(
    (state: RootState) => state.dialog
  );
  const { t } = useTranslation();
  const handleDrawerOpen = () => {
    isSideBar && setOpen(!open);
  };

  const ifTab = useMediaQuery(theme.breakpoints.up('md'));

  const getBreakPoint = () => {
    return pageUrl.pathname.split('/')[3] === 'navtree' ? ifTab : isHeader;
  };

  const handleMenuAction = (menu) => {
    setMenuItemSelected(menu);
  };

  const noLayoutRoute = ['site-setting'];

  if (
    !noLayoutRoute.some((routeName) => location.pathname.includes(routeName))
  ) {
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
        <RightLayout open={isSideBar ? open : isSideBar} isSideBar={isSideBar}>
          {children}
        </RightLayout>
        {isOpen && (
          <XDialog
            handleClose={handleCancel}
            handleConfirm={handleConfirm}
            open={isOpen}
            imageIcon={dialogProps.imageIcon}
            title={t(dialogProps.title)}
            leftButtonText={t(dialogProps.leftButtonText)}
            rightButtonText={t(dialogProps.rightButtonText)}
            subTitle={t(dialogProps.subTitle)}
            subTitle2={t(dialogProps.subTitle2)}
          />
        )}
      </>
    );
  }

  return <>{children}</>;
};

export default LayoutWrapper;
