import { useLocation } from 'react-router';
import useAccess from '../hooks/usePermissions/useAccess';
import useUserSession from '../hooks/useUserSession/useUserSession';
import MainLayout from '../layouts/Dashboardlayout/component/MainLayout';
import { NEW_LOGOUT_URL } from '../utils/authConstants';
import { getCurrentLang, getSelectedSite } from '../utils/helperFunctions';

const ProtectedRoute = ({
  children,
  allowedRoles,
  category,
  subCategory,
  isHeader = true,
  isSideBar = true,
  hasSearch = true,
  name = '',
  hasLogo = false,
}: {
  children: JSX.Element;
  allowedRoles?: any[];
  category: string;
  subCategory: string;

  isHeader?: boolean;
  isSideBar?: boolean;
  hasSearch?: boolean;
  hasLogo?: boolean;
  name?: string;
}) => {
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
    // if (category.toLowerCase() === 'dashboard') {
    //   window.location.replace(`/${getCurrentLang()}/page-list`);
    // } else {
    //   window.location.replace(`/${getCurrentLang()}/access-denied`);
    // }
    const selectedSite = getSelectedSite();
    window.location.replace(
      `/${selectedSite}/${getCurrentLang()}/access-denied`
    );
    return null;
  }

  return (
    <MainLayout
      hasSearch={name === 'navigation' ? false : hasSearch} //{name === 'navigation' ? false : name !== 'user'}
      isHeader={isHeader}
      isSideBar={isSideBar}
      hasLogo={hasLogo}
    >
      {children}
    </MainLayout>
  );
};

export default ProtectedRoute;
