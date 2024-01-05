/* eslint-disable no-debugger */

import { authAPI, getGlobalDataWithHeader, multiSiteApi } from '@platformx/authoring-apis';
import { AUTH_INFO, AUTH_URL, getSelectedSite, usePlatformAnalytics, useUserSession } from '@platformx/utilities';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { createSession } from '../utils/helper';

export const useAuthentication = () => {

  const [handleImpression] = usePlatformAnalytics();
  const [getSession, updateSession] = useUserSession();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const location = useLocation();

  const handleSignIn = async (authCode) => {
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

        // await getGlobalDataWithHeader(selected_site);

        localStorage.setItem('selectedSite', response.data.selected_site);

        const defaultLang =
          response.data.preferred_sites_languages?.[selected_site] || 'en';

        const redirectPath =
          selected_site?.toLowerCase() === 'system'
            ? `/sites/site-listing`
            : `/dashboard`;
        ///${selected_site}/${defaultLang}${redirectPath}
        navigate(
          `${redirectPath}`,
          { replace: true }
        );

      }
      // else {
      //   console.error('Error signing in:', response);
      //   navigate('/error', { state: { errorCode: 500, errorMessage: 'Internal Server Error' } });
      // }
    } catch (error: any) {
      console.error('Error signing in:', error);

    }
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

          localStorage.setItem('selectedSite', currentSelectedSite);
          const res = await multiSiteApi.getPermissions(currentSelectedSite);

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
    }
  };




  // useEffect(() => {
  //   debugger
  //   if (Object.entries(getSession()?.userInfo || {}).length < 1 && !location.search.includes('code')) {
  //     localStorage.removeItem('selectedSite');
  //   }
  //   if (location.search.includes('code') && Object.entries(getSession()?.userInfo || {}).length === 0) {
  //     handleSignIn(location.search.split('code=')[1]);
  //   } else if (location.search.includes('code') && Object.entries(getSession()?.userInfo || {}).length !== 0) {
  //     const selected_site = getSession()?.userInfo.selected_site;
  //     const lang = getSession()?.userInfo.preferred_sites_languages?.[selected_site] || 'en';

  //     if (selected_site?.toLowerCase() === 'system') {
  //       navigate(`/${selected_site}/${lang}/sites/site-listing`);
  //     } else {

  //       navigate(`/dashboard`);// TODO `/${selected_site}/${lang}/dashboard`);
  //     }
  //   } else if (!location.search && location.pathname === '/' || location.pathname === '/error') {
  //     console.log('AUTH_URL', AUTH_URL);
  //     window.location.replace(AUTH_URL);
  //   }
  // }, [location, getSession, navigate, code]);



  return { handleSignIn, verifySession };
};
