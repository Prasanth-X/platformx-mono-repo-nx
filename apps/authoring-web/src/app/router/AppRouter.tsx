import { XLoader } from '@platformx/utilities';
import usePlatformAnalytics from 'platform-x-utils/dist/analytics';
import React, { useEffect } from 'react';
import {
    Route,
    Routes,
    useLocation,
    useNavigate,
    useSearchParams,
} from 'react-router-dom';
// import PrelemSearchLoader from '../components/Skeleton-loader/prelem-search-loader';
import { AUTH_INFO, AUTH_URL, useUserSession } from '@platformx/utilities';
import PlatXLogoImage from '../assets/svg/PlatXWhite-logo.svg';
 
// import ChangePassword from '../pages/changePassword';
import { authAPI, getGlobalDataWithHeader, multiSiteApi } from '@platformx/authoring-apis';
// import { Store } from '../store/ContextStore';
// import { createSession } from '../utils/helper';
import { getSelectedSite } from '@platformx/utilities';
import { createSession } from '../utils/helper';
import { routes } from './routes';
// import { multisiteApi } from '../services/MultisiteACL/multisite.api';
// import { fetchGlobalSettingData, getGlobalDataWithHeader } from '../services/SiteSetting/SiteSetting.api';
const PlatXLogo = (
  <img src={PlatXLogoImage} alt = "" style={{ width: '24px', cursor: 'pointer' }} />
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
//   const { dispatch } = useContext(Store);
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
        const res = await multiSiteApi.getPermissions(getSelectedSite()||"");

        localStorage.setItem('selectedSite', getSelectedSite()||"");
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
        if((!localStorage.getItem('imageUuid') || !localStorage.getItem('videoUuid') && getSelectedSite()?.toLowerCase() !== "system")){
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
      client_id: AUTH_INFO.clientId,
      grant_type: AUTH_INFO.grantType,
      redirect_uri: AUTH_INFO.redirectUri,
      tenant_id: AUTH_INFO.realm,
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

      localStorage.setItem('selectedSite', response.data.selected_site);

      const defaultLang =
        response.data.preferred_sites_languages?.[selected_site] || 'en';
      if (selected_site?.toLowerCase() === 'system') {
        window.location.replace(
          `${process.env.REACT_APP_BASE_URL}/${selected_site}/${defaultLang}/sites/site-listing`
        );
      } else {
        window.location.replace(
          `${process.env.REACT_APP_BASE_URL}/${selected_site}/${defaultLang}/dashboard`
        );
      }
    } else {
      navigate('/');
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
    // dispatch({ type: 'CLEAR_CONTENT' });
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
          `${process.env.REACT_APP_BASE_URL}/${selected_site}/${lang}/sites/site-listing`
        );
      } else {
        window.location.replace(
          `${process.env.REACT_APP_BASE_URL}/${selected_site}/${lang}/dashboard`
        );
      }
    }
    if (!code && location?.pathname === '/') {
      window.location.href = AUTH_URL;
    }
  }, [code]);

  const handleLogin = () => {
    console.log('login', AUTH_URL);
    const loginURL = AUTH_URL;
    window.location.replace(loginURL);
  };

  return loader ?  ( <XLoader type='linear' />
  ) : (
    <Routes>
        {/* <Route path='/change-password' element={<ChangePassword />} /> */}
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
  );
}
export default RootRouter;
