import { useLocation } from 'react-router'; 
import MainLayout from '../layouts/Dashboardlayout/component/MainLayout';
import { NEW_LOGOUT_URL, useAccess,useUserSession } from '@platformx/utilities';
import { getCurrentLang, getSelectedSite } from '@platformx/utilities'; 
import { ReactNode } from 'react';
type ProtectedRouteProps = {
  children: ReactNode;
  category: string;
  subCategory: string;
  isHeader?: boolean;
  isSideBar?: boolean;
  hasSearch?: boolean;
  hasLogo?: boolean;
  name?: string;
};

export const ProtectedRoute =({
  children,
  category,
  subCategory,
  isHeader = true,
  isSideBar = true,
  hasSearch = true,
  name = '',
  hasLogo = false,
}:ProtectedRouteProps ) =>   {
  const [getSession, updateSession] = useUserSession();
  const location = useLocation();
  const { isActive, permissions } = getSession();
  const { canAccessContent } = useAccess();
  if (!isActive || permissions?.length === 0) {
    updateSession(null);
    const pathName =
      location.pathname.charAt(0) === '/'
        ? location.pathname.slice(1)
        : location.pathname;
    // window.location.href = `${REDIRECT_AUTH_URL}${pathName}`;
    window.location.href = NEW_LOGOUT_URL;
  }
  if (isActive && !canAccessContent(category, subCategory)) {
    
    const selectedSite = getSelectedSite();
    window.location.replace(
      `/${selectedSite}/${getCurrentLang()}/access-denied`
    );
    return null;
  }

  return (
    <MainLayout
      hasSearch={name === 'navigation' ? false : hasSearch}  
      isHeader={isHeader}
      isSideBar={isSideBar}
      hasLogo={hasLogo}
    >
      {children}
    </MainLayout>
  );
}; 
