/* eslint-disable no-debugger */

import { XLoader, useUserSession } from '@platformx/utilities';
import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useAuthentication } from '../hooks/useAuthentication';
import { AUTH_URL } from '../utils/authConstants';
import { routes } from './routes';
import { useDynamicRoutes } from '../hooks/useDynamicRoutes/useDynamicRoutes';
import { ContentRoutes } from '../hooks/useDynamicRoutes/contentRoutes';

function AppRouter() {
  const location = useLocation();
  const [getSession] = useUserSession();
  const navigate = useNavigate();
  const { handleSignIn, verifySession, loader } = useAuthentication();

  const generatedRoutes = useDynamicRoutes(ContentRoutes, routes);
  useEffect(() => {

    // Check if there is no active session and redirect to the login page
    if (!getSession()?.userInfo && !location.search.includes('code')) {
      localStorage.removeItem('selectedSite');
    }

    verifySession();
  }, [location, getSession, verifySession]);



  useEffect(() => {

    if (location.search.includes('code') && Object.entries(getSession()?.userInfo || {}).length === 0) {
      handleSignIn(location.search.split('code=')[1]);
    } else if (location.search.includes('code') && Object.entries(getSession()?.userInfo || {}).length !== 0) {
      const selected_site = getSession()?.userInfo.selected_site;
      const lang = getSession()?.userInfo.preferred_sites_languages?.[selected_site] || 'en';

      if (selected_site?.toLowerCase() === 'system') {
        navigate(`/${selected_site}/${lang}/sites/site-listing`);
      } else {

        navigate(`/dashboard`);// TODO `/${selected_site}/${lang}/dashboard`);
      }
    } else if (!location.search && location.pathname === '/' || location.pathname === '/error') {
      console.log('AUTH_URL', AUTH_URL);
      window.location.replace(AUTH_URL);
    }
  }, [location, getSession, handleSignIn, navigate]);
  return loader ? (
    <XLoader type='linear' />
  ) : (
    <Routes>
      {generatedRoutes?.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
}

export default AppRouter;
