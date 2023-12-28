/* eslint-disable no-debugger */
// useAuthentication.js
import { authAPI, getGlobalDataWithHeader, multiSiteApi } from '@platformx/authoring-apis';
import { AUTH_INFO, AUTH_URL, getSelectedSite, usePlatformAnalytics, useUserSession } from '@platformx/utilities';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { createSession } from '../utils/helper';

export const useAuthentication = () => {
  const [handleImpression] = usePlatformAnalytics();
  const [getSession, updateSession] = useUserSession();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  const handleSignIn = async (authCode) => {
    setLoader(true);
    const payload = {
      code: authCode,
      client_id: AUTH_INFO.clientId,
      grant_type: AUTH_INFO.grantType,
      redirect_uri: AUTH_INFO.redirectUri,
      tenant_id: AUTH_INFO.realm,
    };
    console.log('payload', payload);

    try {
      const response = await authAPI.signIn('auth/session', payload);

      if (response && response.data) {
        const userDetails = { ...response.data, isActive: 'true' };
        const { roles, selected_site } = response.data;
        const userRole = roles?.find(
          (obj) => obj.site?.toLowerCase() === selected_site?.toLowerCase()
        )?.name;

        updateSession(createSession(response.data, true, userRole));

        // Send login user info to Analytics End
        handleImpression(userDetails.eventType, userDetails);

        await getGlobalDataWithHeader(selected_site);

        localStorage.setItem('selectedSite', response.data.selected_site);

        // const defaultLang =
        //   response.data.preferred_sites_languages?.[selected_site] || 'en';

        // const redirectPath =
        //   selected_site?.toLowerCase() === 'system'
        // ?`/sites/site-listing`
        // : `/dashboard`;

        // navigate(
        //   `/${selected_site}/${defaultLang}${redirectPath}`, 
        //   { replace: true }
        // );
        debugger
        navigate(
          "/dashboard",

        );
      } else {
        console.error('Error signing in:', response);
        navigate('/error', { state: { errorCode: 500, errorMessage: 'Internal Server Error' } });
      }
    } catch (error: any) {
      setError(error);
    } finally {
      setLoader(false);
    }
  };

  const handleLogin = () => {
    debugger
    const loginURL = AUTH_URL;
    navigate(loginURL);
  };

  const verifySession = async () => {
    try {
      const response = await authAPI.verifySession('auth/verify-session');

      if (response?.data) {
        const { active } = response.data || { userDetails: {} };

        const currentSelectedSite = getSelectedSite();
        const storedSelectedSite = localStorage.getItem('selectedSite');

        if (currentSelectedSite === storedSelectedSite) {
          updateSession({
            ...getSession(),
            isActive: active || false,
          });
        } else {
          const res = await multiSiteApi.getPermissions(currentSelectedSite);

          localStorage.setItem('selectedSite', currentSelectedSite);
          updateSession({
            ...getSession(),
            isActive: active || false,
            permissions: res.data?.data?.permissions,
            userInfo: res.data?.data,
            role: res.data?.data?.roles?.find(
              (obj) =>
                obj.site?.toLowerCase() ===
                res.data?.data?.selected_site?.toLowerCase()
            )?.name,
          });

          const isSystemSite = currentSelectedSite.toLowerCase() === 'system';
          const hasUuidValues =
            !localStorage.getItem('imageUuid') ||
            !localStorage.getItem('videoUuid');

          if (hasUuidValues && !isSystemSite) {
            await getGlobalDataWithHeader(currentSelectedSite);
          }
        }
      } else {
        localStorage.removeItem('selectedSite');
        updateSession(null);
      }
    } catch (error) {
      // Handle errors as needed
      console.error('Error verifying session:', error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (!getSession()?.userInfo && !code) {
      localStorage.removeItem('selectedSite');
    }
    if (!code) {
      verifySession();
    }
  }, [location, code, getSession]);

  return { handleSignIn, handleLogin, verifySession, loader, error };
};
