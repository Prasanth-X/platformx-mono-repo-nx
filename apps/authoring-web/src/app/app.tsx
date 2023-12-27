/* eslint-disable no-debugger */
import { ApolloProvider } from '@apollo/client';
import { init as initApm } from '@elastic/apm-rum';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { unstable_ClassNameGenerator } from '@mui/material/utils';
import { makeStyles } from '@mui/styles';

import { Suspense, useEffect, useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import './App.css';
// import { client } from './apolloClient/client';
// import { CommentProvider } from './context/CommentsContext/CommentsContext';
// import { ActionProvider } from './context/actionContext/ActionProvider';
// import RootRouter from './router/rootRouter';
// import { StoreProvider } from './store/ContextStore';
// import LightTheme from './theme/lightTheme'; 
// import { DefaultLocale } from './utils/constants';
import { graphqlInstance } from "@platformx/authoring-apis";
import { store } from "@platformx/authoring-state";
import {
  LightTheme,
  getCurrentLang,
  getSelectedRoute
} from '@platformx/utilities';
import { Provider } from 'react-redux';
import { AnalyticsProvider } from 'use-analytics';
import RootRouter from './router/AppRouter';
import Analytics from './utils/analytics/analyticsData';
import { analyticsInstance } from './utils/analytics/dynamicAnalytics';
import { AUTH_URL } from './utils/authConstants';

unstable_ClassNameGenerator.configure((componentName) =>
  componentName.replace('Mui', 'Platform-x-')
);

initApm({
  // This will disable APM
  active: process.env?.NX_APM_TRACING === 'true' || false,
  // Set required service name
  serviceName: 'platormx-authoring-ui-service',
  // Set custom APM Server URL
  serverUrl: process.env.NX_APM_SERVER_URL,
  //The environment where the service being monitored is deployed (e.g. "production", "development")
  environment: process.env.NX_APM_ENVIRONMENT,
  distributedTracing: true,
  distributedTracingOrigins: (
    process.env?.NX_APM_TRACING_ORIGINS || ''
  ).split(','),
  logLevel: 'debug',
});

const useStyles = makeStyles((theme) => ({
  toastContainer: {
    width: '457px',
    '& .Toastify__toast': {
      border: `2px solid #D9DBE9`,
      '& .Toastify__toast-body': {
        paddingLeft: 0,
      },
    },
  },
}));

function App() {
  const { i18n } = useTranslation();

  const classes = useStyles();
  const [instances, setInstances] = useState<any>({});
  const routing = getSelectedRoute();
  const navigate = useNavigate();
  const location = useLocation()
  const { pathname } = location
  useEffect(() => {
    if (
      pathname === '/en' ||
      pathname === '/' ||
      pathname === `/${routing}/en`
    ) {
      navigate(AUTH_URL, { replace: true });
    }

    (async () => {
      const res = await analyticsInstance(Analytics);
      console.log('res', res);
      setInstances(res);
    })();

    const lang = getCurrentLang();
    if (lang) {
      i18n.changeLanguage(lang);
    }
  }, [i18n]);

  return (
    <Suspense fallback={<div>...Loading</div>}>
      <div className='App'>
        <I18nextProvider i18n={i18n}>
          <ApolloProvider client={graphqlInstance}>
            <AnalyticsProvider instance={instances}>
              <ThemeProvider theme={LightTheme}>
                <CssBaseline />
                <Provider store={store}>
                  <RootRouter />
                </Provider>
              </ThemeProvider>
            </AnalyticsProvider>
            <ToastContainer
              position='bottom-center'
              autoClose={4000}
              newestOnTop
              closeOnClick
              pauseOnFocusLoss
              pauseOnHover
              theme='colored'
              icon={false}
              className={classes.toastContainer}
            />
          </ApolloProvider>
        </I18nextProvider>
      </div>
    </Suspense>
  );
}

export default App;
