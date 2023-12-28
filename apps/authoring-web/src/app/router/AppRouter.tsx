
import { XLoader, useUserSession } from '@platformx/utilities';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useAuthentication } from '../hooks/useAuthentication';
import { AUTH_URL } from '../utils/authConstants';
import { routes } from './routes';

function RootRouter() {
  const location = useLocation();
  const [getSession] = useUserSession();
  const navigate = useNavigate();
  const { handleSignIn, verifySession, loader } = useAuthentication(); // Use the useAuthentication hook

  useEffect(() => {

    // Check if there is no active session and redirect to the login page
    if (!getSession()?.userInfo && !location.search.includes('code')) {
      localStorage.removeItem('selectedSite');
    }

    // Verify session
    verifySession();
  }, [location, getSession, verifySession]);



  useEffect(() => {
    // eslint-disable-next-line no-debugger
    debugger
    if (location.search.includes('code') && Object.entries(getSession()?.userInfo || {}).length === 0) {
      handleSignIn(location.search.split('code=')[1]);
    } else if (location.search.includes('code') && Object.entries(getSession()?.userInfo || {}).length !== 0) {
      const selected_site = getSession()?.userInfo.selected_site;
      const lang = getSession()?.userInfo.preferred_sites_languages?.[selected_site] || 'en';

      if (selected_site?.toLowerCase() === 'system') {
        window.location.replace(`${process.env.NX_BASE_URL}/${selected_site}/${lang}/sites/site-listing`);
      } else {
        // window.location.replace(`${process.env.NX_BASE_URL}/${selected_site}/${lang}/dashboard`);
        navigate('/dashboard')
      }
    } else if (!location.search && location.pathname === '/' || location.pathname === '/error') {
      console.log('AUTH_URL', AUTH_URL);
      window.location.replace(AUTH_URL);
    }
  }, [location, getSession, handleSignIn]);

  return loader ? (
    <XLoader type='linear' />
  ) : (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
}

export default RootRouter;
