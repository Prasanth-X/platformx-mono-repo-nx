import usePlatformAnalytics from 'platform-x-utils/dist/analytics';
import React, { useContext, useEffect } from 'react';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import PlatformXLoader from '../components/Loader/loader';
import PrelemSearchLoader from '../components/Skeleton-loader/prelem-search-loader';
import { authInfo, authUrl } from '../utils/authConstants';

import PlatXLogoImage from '../assets/svg/PlatXWhite-logo.svg';
import useUserSession from '../hooks/useUserSession/useUserSession';
import ChangePassword from '../pages/changePassword';
import { multisiteApi } from '../services/MultisiteACL/multisite.api';
import { getGlobalDataWithHeader } from '../services/SiteSetting/SiteSetting.api';
import authAPI from '../services/auth/Auth.api';
import { Store } from '../store/ContextStore';
import { createSession } from '../utils/helper';
import { getSelectedSite } from '../utils/helperFunctions';
import routes from '../utils/routes';
const PlatXLogo = (
  <img src={PlatXLogoImage} style={{ width: '24px', cursor: 'pointer' }} />
);
const noLoaderArr = ['/prelem-search', '/content'];
const skeltonLoaderArr = [
  '/prelem-search/',
  '/layouts',
  '/prelem-search/about',
];

function RootRouter() {
  const [handleImpression] = usePlatformAnalytics();
  const location = useLocation();
  const { dispatch } = useContext(Store);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [getSession, updateSession] = useUserSession();
  const { userInfo } = getSession();
  const code = searchParams.get('code');
  const pages: Array<string> = ['About', 'Products', 'Contact', 'Account'];
  const [loader, setLoader] = React.useState(true);

  const verifySession = async () => {
    const response: any = await authAPI.verifySession('auth/verify-session');
    if (response && response?.data) {
      const { active } = response?.data || { userDetails: {} };
      if (getSelectedSite() === localStorage.getItem('selectedSite')) {
        updateSession({
          ...getSession(),
          isActive: active || false,
        });
      } else {
        const res = await multisiteApi.getPermissions(getSelectedSite());

        localStorage.setItem('selectedSite', getSelectedSite());
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
        if (
          !localStorage.getItem('imageUuid') ||
          (!localStorage.getItem('videoUuid') &&
            getSelectedSite()?.toLowerCase() !== 'system')
        ) {
          await getGlobalDataWithHeader(getSelectedSite());
        }
      }
    } else {
      localStorage.removeItem('selectedSite');
      updateSession(null);
    }
    setLoader(false);
  };

  const handleSignIn = async () => {
    setLoader(true);
    const payload = {
      code: code,
      client_id: authInfo.clientId,
      grant_type: authInfo.grantType,
      redirect_uri: authInfo.redirectUri,
      tenant_id: authInfo.realm,
    };
    const response: any = await authAPI.signIn('auth/session', payload);
    if (response && response.data) {
      const userDetails = { ...response.data, isActive: 'true' };
      const { roles, selected_site } = response.data;
      // const userRole =  roles && roles.length > 0 ? roles[0].name : 'admin';
      const userRole = roles?.find(
        (obj) => obj.site?.toLowerCase() === selected_site?.toLowerCase()
      )?.name;
      // const role: string = response.data?.roles.name;
      updateSession(createSession(response.data, true, userRole));

      // Send login user info to Analytics End
      handleImpression(userDetails.eventType, userDetails);
      await getGlobalDataWithHeader(selected_site);
      setLoader(false);
      // navigate('/dashboard');
      console.log('NX_BASE_URL:', process.env.NX_BASE_URL);
      console.log('NX_API_URI:', process.env.NX_API_URI);
      console.log('NX_ENVIRONMENT:', process.env.NX_ENVIRONMENT);
      console.log('NX_GCP_URL:', process.env.NX_GCP_URL);
      localStorage.setItem('selectedSite', response.data.selected_site);

      const defaultLang =
        response.data.preferred_sites_languages?.[selected_site] || 'en';
      if (selected_site?.toLowerCase() === 'system') {
        window.location.replace(
          `${process.env.NX_BASE_URL}/${selected_site}/${defaultLang}/sites/site-listing`
        );
      } else {
        window.location.replace(
          `${process.env.NX_BASE_URL}/${selected_site}/${defaultLang}/dashboard`
        );
      }
    } else {
      // navigate('/');
    }
    setLoader(false);
  };

  useEffect(() => {
    // Check if there is no active session and redirect to the login page
    if (!getSession()?.userInfo && !code) {
      localStorage.removeItem('selectedSite');
    }
    if (!code) {
      verifySession();
    }
  }, [location]);

  useEffect(() => {
    dispatch({ type: 'CLEAR_CONTENT' });
  }, [location]);

  useEffect(() => {
    if (code && Object.entries(userInfo || {}).length === 0) {
      setLoader(true);
      handleSignIn();
    }
    if (code && Object.entries(userInfo || {}).length !== 0) {
      const selected_site = userInfo.selected_site;
      const lang = userInfo.preferred_sites_languages?.[selected_site] || 'en';
      //navigate('/dashboard');
      if (selected_site?.toLowerCase() === 'system') {
        window.location.replace(
          `${process.env.NX_BASE_URL}/${selected_site}/${lang}/sites/site-listing`
        );
      } else {
        window.location.replace(
          `${process.env.NX_BASE_URL}/${selected_site}/${lang}/dashboard`
        );
      }
    }
    if (!code && location?.pathname === '/') {
      window.location.href = authUrl;
    }
  }, [code]);

  const handleLogin = () => {
    console.log('login', authUrl);
    const loginURL = authUrl;
    window.location.replace(loginURL);
  };

  return loader ? (
    <>
      {noLoaderArr.includes(location.pathname) ? (
        ''
      ) : skeltonLoaderArr.includes(location.pathname) ? (
        <PrelemSearchLoader />
      ) : (
        <PlatformXLoader />
      )}
    </>
  ) : (
    <>
      <Routes>
        <Route path="/change-password" element={<ChangePassword />} />
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </>
  );
}
export default RootRouter;
