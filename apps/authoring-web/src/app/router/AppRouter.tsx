/* eslint-disable no-debugger */
import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { XLoader } from '@platformx/utilities';
import { AUTH_URL, useUserSession } from '@platformx/utilities';
import { routes } from './routes'; 
import { useAuthentication } from '../hooks/useAuthentication';

function RootRouter() {
  debugger;
  const location = useLocation();
  const [getSession] = useUserSession();
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
    if (location.search.includes('code') && Object.entries(getSession()?.userInfo || {}).length === 0) {
       handleSignIn(location.search.split('code=')[1]);
    } else if (location.search.includes('code') && Object.entries(getSession()?.userInfo || {}).length !== 0) {
       const selected_site = getSession()?.userInfo.selected_site;
      const lang = getSession()?.userInfo.preferred_sites_languages?.[selected_site] || 'en';

      if (selected_site?.toLowerCase() === 'system') {
        window.location.replace(`${process.env.NX_BASE_URL}/${selected_site}/${lang}/sites/site-listing`);
      } else {
        window.location.replace(`${process.env.NX_BASE_URL}/${selected_site}/${lang}/dashboard`);
      }
    } else if (!location.search && location.pathname === '/') { 
      window.location.href = AUTH_URL;
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
